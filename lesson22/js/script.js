'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form  = document.querySelector(form);
        this.input  = document.querySelector(input);
        this.todoList  = document.querySelector(todoList);
        this.todoCompleted  = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
     
    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render(){
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
        `);
    
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
       
    }


    addTodo(e){
        e.preventDefault();
        if (this.input.value.trim()&& this.input.value !== '') {
            this.input.placeholder = 'Какие планы?';
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
            
        }else{
            this.input.placeholder = 'Ну скажи какие планы????';
        }
       
    }

    generateKey(){
        return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
    }

    deleteItem(target){ 
        const key = target.closest('.todo-item').key;
        this.todoData.delete(key);
        this.render();
    }

    completedItem(target){
        const key = target.closest('.todo-item').key;
        const findKey = this.todoData.get(key);
        
        findKey.completed = !findKey.completed;

        this.render();
    }

    handler(e){
            let target = e.target;
            if (target.closest('.todo-remove')) {
                this.deleteItem(target);
            } 
            if (target.classList.contains('todo-complete')) {
                this.completedItem(target);
            } 
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.todoContainer.addEventListener('click', this.handler.bind(this));
        this.render();

    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();