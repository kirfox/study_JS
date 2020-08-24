'use strict';

let start = document.getElementById('start'),
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
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items'),
    main = document.querySelector('.main'); 

start.disabled = true;

//checking numeric for a numeric value
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);    
};

let appData = {
    budget : 0,
    budgetDay : 0,
    budgetMonth  : 0,
    expensesMonth : 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 0,
    start: function(){
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
        
        // this.reset(); 
    },

    //output on screen
    showResult: function(){
       
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();  //-------------------------------------------------
         });

      console.log(appData);
    },

    //All inputs have been disabled
    toDisabled: function(isDisabled = false){
       
        salaryAmount.disabled = isDisabled;
        additionalIncomeItem[0].disabled = isDisabled;
        additionalIncomeItem[1].disabled = isDisabled;
        
        incomeItem.forEach(function(item) {
            item.querySelectorAll('input').forEach(function(input){
                input.disabled = isDisabled;
            });
        });

        expensesItems.forEach(function(item) {
            item.querySelectorAll('input').forEach(function(input){
                input.disabled = isDisabled;
            });
        });
        additionalExpensesItem.disabled = isDisabled;
        targetAmount.disabled = isDisabled;   

    },

    //button change and call toDisabled function
    showResetButton: function(){
        this.toDisabled(true);

        start.style.display = 'none';
        cancel.style.display = 'block';
    },

    //reset the original state of the object
    reset: function(){

        //inputs have been empty value
        let inputs = main.querySelectorAll('input');
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
        
    },

    //add inputs in block 'Обязательные расходы'
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
      
    },

    //add expenses in object 'expenses'
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

     //add inputs in block 'Дополнительный доход'
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },

    //add income in object 'income'
    getIncome: function(){
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
        
        for (let key in appData.income) { 
            appData.incomeMonth += +appData.income[key];  
        }
    },

    //add expenses in arrray 'addExpenses'
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item); 
            }
        });
    },

    //add income in arrray 'addIncome'
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue); 
            }
        });
    },
   
    //sum expenses   
    getExpensesMonth: function(){

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    },

    //calculation capital(appData.budgetMonth), calculation budget for the day(appData.budgetDay)
    getBudget: function(){ 

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(appData.budgetMonth/30);
        return this.budgetMonth;
    },

    //calculation period for purpose 
    getTargetMonth: function() {
        return targetAmount.value/this.getBudget();
    },

    //evaluation budgetDay
    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if(this.budgetDay >= 600 && this.budgetDay < 1200){
            return ('У вас средний уровень дохода');
        } else if(this.budgetDay < 600 && this.budgetDay === 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else{
            return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function(){
        if (this.deposit) {
            do{
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(this.percentDeposit) ||  this.percentDeposit === '');
            do{
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(this.moneyDeposit) || this.moneyDeposit === '');
        }
    },

    //calculation budgetMonth for period
    calcPeriod: function(){
            return this.budgetMonth * periodSelect.value;
    }

};

// checking for symbols
salaryAmount.addEventListener('input', function () {
    if (salaryAmount.value === '') {
        start.disabled = true;
    } else{
        start.disabled = false;
    }
});
//bind function 'start' with object 'appData' 
start.addEventListener('click', appData.start.bind(appData)); 

//bind function 'start' with object 'appData' 
cancel.addEventListener('click', appData.reset.bind(appData));

incomePlus.addEventListener('click', appData.addIncomeBlock);  
expensesPlus.addEventListener('click', appData.addExpensesBlock);  

periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});


