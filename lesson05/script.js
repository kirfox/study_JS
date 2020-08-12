'use strict'

//checking for a numeric value
    let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);    
    };

//declare variables
let money,
    income = 'Фриланс', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?',
    'Коммуналка, Интернет, Продукты'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000, 
    period = 6,
    budgetDay,
    // expenses1 = prompt('Введите обязательную статью расходов?', 'Дети'),
    // expenses2 = prompt('Введите обязательную статью расходов?', 'Пиво'),
    // amount1 = +prompt('Во сколько это обойдется?', '5000'),
    // amount2 = +prompt('Во сколько это обойдется?', '5000'),
    accumulatedMonth;
    
//checking money for a numeric value
    let start = function(){
        do{
            money = prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));
    };
    start();

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
    let expenses = []; 

    let getExpensesMonth = function(){
        let sum = 0;
        let result = 0;
        
        for (let i = 0; i < 2; i++) {
            
            expenses[i] = prompt('Введите обязательную статью расходов?', 'Дети');

            do{
                sum = prompt('Во сколько это обойдется?' );
                if (isNumber(sum)) {
                    result += +sum;
                }
            } while (!isNumber(sum));
        }
        return result;
    };
    let expensesMonth = getExpensesMonth();

    console.log('Расходы: ' + expensesMonth);
    
//calculation capital  
    let getAccumulatedMonth = function(){ 
        return money - expensesMonth;
    };

    accumulatedMonth = getAccumulatedMonth();
    
//calculation period for purpose 
    let getTargetMonth = function() {
        return Math.ceil(mission/accumulatedMonth);
    };

    if (getTargetMonth() < 0) {
        console.log('Цель не будет достигнута');
    } else{
        console.log('Цель будет достигнута');
    }
    
    console.log('Период равен ' + getTargetMonth()+ ' месяцев');

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
   
    



   