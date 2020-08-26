'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus= btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],  
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-items .income-title'),
      incomeAmount = document.querySelector('.income-items .income-amount'),
      expensesTitle = document.querySelector('.expenses-items .expenses-title'),
      expensesAmount = document.querySelector('.expenses-items .expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
      periodSelect = document.querySelector('.period-select'),
      main = document.querySelector('.main'); 

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items');

start.disabled = true;

class AppData  {

    constructor(){
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth  = 0;
        this.expensesMonth = 0;
        this.income= {};
        this.incomeMonth= 0;
        this.addIncome= [];
        this.expenses= {};
        this.addExpenses= [];
        this.deposit= false;
        this.percentDeposit= 0;
        this.moneyDeposit= 0;
        this.period = 0;
    }

    //checking numeric for a numeric value
    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);    
    }

    start(){
        //checking money for a numeric value
        // do{
        //     money = prompt('Ваш месячный доход?', 50000);
        // }
        // while (!isNumber(money));
        
        this.budget = +salaryAmount.value; 

        this.getExpenses();
        this.getIncome(); 
        this.getExpensesMonth(); 
        this.getAddExpenses(); 
        this.getAddIncome();
        this.getBudget(); 

        this.showResult();
        this.showResetButton();
        
    }

    //output on screen
    showResult(){
         
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        
        periodSelect.addEventListener('input', () =>{
            incomePeriodValue.value = this.calcPeriod();
        });
    }

    //All inputs have been disabled
    toDisabled(isDisabled = false){
    
        salaryAmount.disabled = isDisabled;
        additionalIncomeItem[0].disabled = isDisabled;
        additionalIncomeItem[1].disabled = isDisabled;
        
        incomeItem.forEach(function(item) {
            item.querySelectorAll('input').forEach((input) =>{
                input.disabled = isDisabled;
            });
        });

        expensesItems.forEach(function(item) {
            item.querySelectorAll('input').forEach((input) =>{
                input.disabled = isDisabled;
            });
        });
        additionalExpensesItem.disabled = isDisabled;
        targetAmount.disabled = isDisabled;   

    }

    //button change and call toDisabled function
    showResetButton(){
        this.toDisabled(true);

        start.style.display = 'none';
        cancel.style.display = 'block';
    }

    //reset the original state of the object
    reset(){

        //inputs have been empty value
        const inputs = main.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        periodSelect.value = 0;
        periodAmount.textContent= 1;

        this.toDisabled(false);

        //remove the last two elements
        for (let i = 0; i < incomeItem.length; i++) {
            if (i !== 0) {
                incomeItem[i].remove();
            }
        }
        incomePlus.style.display = 'block';
        for (let i = 0; i < expensesItems.length; i++) {
            if (i !== 0) {
                expensesItems[i].remove();
            }
        }
        expensesPlus.style.display = 'block';

        start.style.display = 'block';
        cancel.style.display = 'none';

        start.disabled = true;

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth  = 0;
        this.expensesMonth = 0;
        this.income= {};
        this.incomeMonth= 0;
        this.addIncome= [];
        this.expenses= {};
        this.addExpenses= [];
        this.deposit= false;
        this.percentDeposit= 0;
        this.moneyDeposit= 0;
        this.period = 0;
        
    }

    //add inputs in block 'Обязательные расходы'
    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    
    }

    //add expenses in object 'expenses'
    getExpenses(){
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    //add inputs in block 'Дополнительный доход'
    addIncomeBlock(){
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    //add income in object 'income'
    getIncome(){
       
        incomeItem.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
        
        for (let key in this.income) { 
            this.incomeMonth += +this.income[key];  
        }
    }

    //add expenses in arrray 'addExpenses'
    getAddExpenses(){
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== ''){
                this.addExpenses.push(item); 
            }
        });
    }

    //add income in arrray 'addIncome'
    getAddIncome(){
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue); 
            }
        });
    }

    //sum expenses   
    getExpensesMonth(){

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    }

    //calculation capital(appData.budgetMonth), calculation budget for the day(appData.budgetDay)
    getBudget(){ 

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
        return this.budgetMonth;
    }

    //calculation period for purpose 
    getTargetMonth() {
        return targetAmount.value/this.getBudget();
    }

    //evaluation budgetDay
    getStatusIncome(){
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if(this.budgetDay >= 600 && this.budgetDay < 1200){
            return ('У вас средний уровень дохода');
        } else if(this.budgetDay < 600 && this.budgetDay === 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else{
            return ('Что то пошло не так');
        }
    }

    getInfoDeposit(){
        if (this.deposit) {
            do{
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!(this.isNumber(this.percentDeposit)) ||  this.percentDeposit === '');
            do{
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!(this.isNumber(this.moneyDeposit)) || this.moneyDeposit === '');
        }
    }

    //calculation budgetMonth for period
    calcPeriod(){
            return this.budgetMonth * periodSelect.value;
    }

    eventListeners() {
        // checking for symbols
        salaryAmount.addEventListener('input',  () => {
            if (salaryAmount.value === '') {
                start.disabled = true;
            } else{
                start.disabled = false;
            }
        });

        //bind function 'start' with object 'appData' 
        start.addEventListener('click', this.start.bind(appData)); 

        //bind function 'start' with object 'appData' 
        cancel.addEventListener('click', this.reset.bind(appData));

        incomePlus.addEventListener('click', this.addIncomeBlock);  
        expensesPlus.addEventListener('click', this.addExpensesBlock);  

        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });

        }
}

const appData = new AppData();
appData.eventListeners();



// if (appData.getTargetMonth() > 0) {
//     console.log('Цель будет достигнута за ' + appData.getTargetMonth()+ ' месяцев');
// } else {
//     console.log('Цель не будет достигнута');
// }

   
// for (let key in appData) {

//     console.log('Наша программа включает в себя данные:\n Ключ: ' + key +' Значение: ' + appData[key]);
    
// }