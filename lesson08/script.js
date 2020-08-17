'use strict';

//checking for a numeric value
let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);    
    };

//checking money for a numeric value
let money,
    start = function(){
        do{
            money = prompt('Ваш месячный доход?', 50000);
        }
        while (!isNumber(money));
    };

start();

let appData = {
    budget : money,
    budgetDay : 0,
    budgetMonth  : 0,
    expensesMonth : 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 6,
    asking: function(){

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome,
                cashIncome;

            do{
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            }
            while (isNumber(itemIncome));

            do{
               cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }
            while (!isNumber(cashIncome));
            
            appData.income[itemIncome] = cashIncome;
        } 


        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?',
                                'Коммуналка,Интернет,Продукты');

            appData.addExpenses = addExpenses.toLowerCase().split(', ');

            //addExpenses first simbol replaced on the capital letter
            appData.addExpenses = addExpenses.split(', ').map(function(word){
                return word.charAt(0).toUpperCase() + word.slice(1);
            });

            //output in console addExpenses as a string with commas and spaces
            console.log(appData.addExpenses = addExpenses.replace(/,(?=[^\s])/g, ", "));

            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let sum = 0;
            let result = 0;
            let expensesArr = [];
            for (let i = 0; i < 2; i++) {

                do{
                    expensesArr[i] = prompt('Введите обязательную статью расходов?', 'Дети');
                }
                while (isNumber(expensesArr[i]));
        
                do{
                    sum = +prompt('Во сколько это обойдется?', 5000 );

                    if (isNumber(sum)) {
                        result += +sum;
                    }
                    
                } while (!isNumber(sum));

                appData.expenses[expensesArr[i]] = sum;
            }
            return appData.expenses;
    },

    //sum expenses   
    getExpensesMonth: function(){

        for (let key in appData.expenses) {

            appData.expensesMonth += appData.expenses[key];
            
        }
        return appData.expensesMonth;
    },

    //calculation capital(appData.budgetMonth), calculation budget for the day(appData.budgetDay)
    getBudget: function(){ 

        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
        return appData.budgetMonth;
    },

    //calculation period for purpose 
    getTargetMonth: function() {

        let res = Math.ceil(appData.mission/appData.getBudget());
        
        return res;
    },
    //evaluation budgetDay
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if(appData.budgetDay >= 600 && appData.budgetDay < 1200){
            return ('У вас средний уровень дохода');
        } else if(appData.budgetDay < 600 && appData.budgetDay === 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else{
            return ('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if (appData.deposit) {
            do{
                appData.percentDeposit = +prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(appData.percentDeposit));
            do{
                appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
            return appData.budgetMonth * appData.period;
    }

};
appData.asking();
appData.getExpensesMonth();

console.log('Сумма расходов ' + appData.expensesMonth);

appData.getBudget();

if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за ' + appData.getTargetMonth()+ ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());
   
for (let key in appData) {

    console.log('Наша программа включает в себя данные:\n Ключ: ' + key +' Значение: ' + appData[key]);
    
}
