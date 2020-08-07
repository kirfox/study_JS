//declare variables
let money = 50000, 
    income = 20000, 
    addExpenses ='Коммуналка, Интернет, Продукты', 
    deposit = false, 
    mission = 1000000, 
    period = 6,
    budgetDay = money/30;

//output in console
    console.log(typeof money,
                typeof income,
                typeof deposit);
    console.log(addExpenses.length);
    console.log('Период равен ' + period + ' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log(addExpenses.toLowerCase().split(', '));
    console.log(budgetDay);