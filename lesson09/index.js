'use strict';

const CalculateBtn = document.getElementById('start'),
      incomeBtn = document.getElementsByTagName('button')[0],
      expensesBtn = document.getElementsByTagName('button')[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item')[0],
      additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[1],
      budgetMonthValue = document.getElementsByClassName('result-total')[0],  //????????????????????
      budgetDayValue = document.getElementsByClassName('result-total')[1],
      expensesMonthValue = document.getElementsByClassName('result-total')[2],
      additionalIncomeValue = document.getElementsByClassName('result-total')[3],
      additionalExpensesValue = document.getElementsByClassName('result-total')[4],
      incomePeriodValue = document.getElementsByClassName('result-total')[5],
      targetMonthValue = document.getElementsByClassName('result-total')[6],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-items .income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-items .expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');








