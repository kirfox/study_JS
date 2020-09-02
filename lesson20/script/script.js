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


        btnMenu.addEventListener('click', (event) =>{
            menu.classList.add('active-menu');  
            
            let target = event.target;

            target = target.closest('ul>li');
            console.log(target);

            // if (target) {
            //     menuItems.forEach((item, i) =>{
            //         if (item === target) {
            //             console.log(menuItems[i]);
            //         }
            //     });
            // }

           
        });
       
        // const handlerMenu = () =>{
        //     menu.classList.toggle('active-menu');   
        // };
        // btnMenu.addEventListener('click', handlerMenu);
        // closeBtn.addEventListener('click', handlerMenu);

        // menuItems.forEach((elem) => elem.addEventListener('click', ()=> {
        //     console.log(event.target);
        // }));
        
    };

    toggleMenu();

    // popup
    const togglePopUp = () =>{

        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');
            

        let internal;
        let count = -10;   
        const animateModal = () =>{
            const width = document.documentElement.clientWidth;
            
            popUp.style.display = 'block';
            internal = requestAnimationFrame(animateModal);
            count+= 2;
            
            if(width <= 768){
                popUp.style.display = 'block';
                cancelAnimationFrame(internal);
            }else if (count < 20) {
                popupContent.style.top = count + '%'; 
            } else {
                cancelAnimationFrame(internal);
            }    
        };

        popUpBtn.forEach((elem) => {
            elem.addEventListener('click', animateModal);
        });

        popUp.addEventListener('click', () => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
                count = -10;
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popUp.style.display = 'none';
                    count = -10;
                }
            }
        });

    };

    togglePopUp();
    
    //smooth scrolling
    const smoothScrolling = () =>{
        const menu = document.querySelector('menu');
        const anchors = menu.querySelectorAll('li a[href*="#"]');
        const btn= document.querySelector('a');
 
        for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href').substr(1);
            
            document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
            });
        });
        }
        btn.addEventListener('click',(e) => {
            e.preventDefault();
            const blockID = btn.getAttribute('href').substr(1);
            
            document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
            });
        });
    };

    smoothScrolling();
    
    //tabs
    const tabs = () => {

        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) => {

            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;

            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) =>{
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});