'use strict'

 //declare variables
let money = +prompt('Ваш месячный доход?', '50000'),
    income = 'Фриланс', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?',
    'Коммуналка, Интернет, Продукты'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000, 
    period = 6,
    budgetDay,
    expenses1,
    expenses2,
    amount1,
    amount2,
    accumulatedMonth;

//use prompt
    expenses1 = prompt('Введите обязательную статью расходов?', 'Дети');
    expenses2 = prompt('Введите обязательную статью расходов?', 'Пиво');
    amount1 = +prompt('Во сколько это обойдется?', '5000');
    amount2 = +prompt('Во сколько это обойдется?', '5000');
    
//show type variables    
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

    showTypeOf(money);
    showTypeOf(income);
    showTypeOf(deposit);

//output in console
    console.log(addExpenses.toLowerCase().split(', '));

//sum expenses   
let getExpensesMonth = function(amount1, amount2){
        return amount1 + amount2;
    };

    console.log('Расходы: ' + getExpensesMonth(amount1, amount2));
    
//calculation capital  
let getAccumulatedMonth = function(money, getExpensesMonth){ 
        return money - getExpensesMonth;
    };

    accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
    
//calculation period for purpose 
let getTargetMonth = function(mission, accumulatedMonth) {
        return Math.ceil(mission/accumulatedMonth);
    };

    console.log('Период равен ' + getTargetMonth(mission, accumulatedMonth)+ ' месяцев');

//calculation period    
    budgetDay = Math.floor(accumulatedMonth/30);

    console.log('Бюджет на день ' + budgetDay + ' рублей');
    
//evaluation budgetDay
    let getStatusIncome = function(){
        if (budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if(budgetDay >= 600 && budgetDay < 1200){
            return ('У вас средний уровень дохода');
        } else if(budgetDay < 600 && budgetDay === 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else{
            return ('Что то пошло не так');
        }
    };

    console.log(getStatusIncome());
   
    



   