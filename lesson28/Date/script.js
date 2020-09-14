'use strict';

let date = new Date(),
    day=new Array("Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота");

    if (date.getHours()>= 4 && date.getHours() < 12) {
        out.innerHTML ='Доброе утро';
    } else if(date.getHours()>= 12 && date.getHours() < 18){
        out.innerHTML ='Добрый день';
    }else if(date.getHours()>= 18 && date.getHours() < 24){
        out.innerHTML ='Добрый вечер';
    }else if(date.getHours()>= 0 && date.getHours() < 4){
        out.innerHTML ='Ночь добрая';
    }

    function countNewYear(deadLine){
        let newYear = new Date(deadLine).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = Math.floor((newYear - dateNow) / 1000 / 60 / 60 / 24);
            return timeRemaining;
    }

    out1.innerHTML ='Сегодня: ' + day[date.getDay()];
    out2.innerHTML ='Текущая время: ' + date.toLocaleTimeString('en');
    out3.innerHTML ='До нового года осталось ' + countNewYear('1 January 2021') + ' дня';



