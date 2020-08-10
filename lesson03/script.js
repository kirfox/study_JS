'use strict'

 //declare variables
let money = prompt('Ваш месячный доход?', '50000'),
    income = 20000, 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?',
    'Коммуналка, Интернет, Продукты'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000, 
    period = 6,
    budgetDay = money/30,
    expenses1,
    expenses2,
    amount1,
    amount2,
    budgetMonth;

//output in console
    console.log(typeof money,
                typeof income,
                typeof deposit);
    console.log(addExpenses.length);
    console.log('Период равен ' + period + ' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log(addExpenses.toLowerCase().split(', '));
    console.log(budgetDay);

//use prompt
    expenses1 = prompt('Введите обязательную статью расходов?', 'Дети');
    expenses2 = prompt('Введите обязательную статью расходов?', 'Пиво');
    amount1 = prompt('Во сколько это обойдется?', '5000');
    amount2 = prompt('Во сколько это обойдется?', '5000');
    
//calculation budgetMonth, budgetDay
    budgetMonth = money - (+amount1 + +amount2);
    console.log('Бюджет на месяц ' + budgetMonth);
    console.log('Цель будет достигнута за ' + Math.ceil(mission/budgetMonth) + ' месяцев'); 
    budgetDay = Math.floor(budgetMonth/30);
    console.log('Бюджет на день ' + budgetDay);
    
//evaluation budgetDay
    if (budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if(budgetDay >= 600 && budgetDay < 1200){
        console.log('У вас средний уровень дохода');
    }
    else if(budgetDay < 600 && budgetDay === 0){
        console.log('К сожалению у вас уровень дохода ниже среднего');
    }
    else{
        console.log('Что то пошло не так');
    }
