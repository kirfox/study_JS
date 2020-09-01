window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // Timer
    function countTimer(deadLine){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                
                return{timeRemaining, hours, minutes, seconds};
               
        }
        
        function updateClock() {
            let timer = getTimeRemaining();

            //add zero
            let addZero = function(num){
                if (num >= 0 && num < 10) { 
                      return '0' + num;
                  } else {
                      return num;
                  }
              };
            
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if(timer.timeRemaining < 0){
                clearInterval(idInterval);

                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
          
        }
        
        let idInterval = setInterval(updateClock, 1000);
        
    }
    countTimer('13, september, 2020');

    // Menu
    const toggleMenu = () =>{

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () =>{
            menu.classList.toggle('active-menu');   
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    // popup
    const togglePopUp = () =>{

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            width = document.documentElement.clientWidth;

        let internal;
        let count = -10;   
        const animateModal = () =>{
            popup.style.display = 'block';
            internal = requestAnimationFrame(animateModal);
            count+= 2;
            
            if(width <= 768){
                popup.style.display = 'block';
                cancelAnimationFrame(internal);
            }else if (count < 20) {
                popupContent.style.top = count + '%'; 
            } else {
                cancelAnimationFrame(internal);
            }    
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', animateModal);
        });

        popUpClose.addEventListener('click', ()=> {
            popup.style.display = 'none';
            count = -10;
        });
    };

    togglePopUp();
    
    
});