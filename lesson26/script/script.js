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
            menu = document.querySelector('menu');
        btnMenu.addEventListener('click', () =>{
            menu.classList.toggle('active-menu');         
        });

        menu.addEventListener('click', ()=>{
            let target = event.target;

            if (target.classList.contains('close-btn') || target !== menu) {
                target = target.closest('.close-btn');
                menu.classList.toggle('active-menu');
            }
        });     
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

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        btn = document.querySelectorAll('.portfolio-btn'),
        ul = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dot;
            
        const createDots = () =>{
            
            for (let i = 0; i < slide.length; i++) {

                dot = document.createElement("li");
                dot.classList.add('dot');
                ul.append(dot);
            }

            let ulList = ul.querySelectorAll('li');
            
            ulList[0].classList.add('dot-active');
            
            dot = document.querySelectorAll('.dot');

            return dot;
        };

        createDots();
       
        const prevSlide = (elem, index, strClass) =>{
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) =>{
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
            
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active'); 

            if (target.matches('#arrow-right')){
                currentSlide++;
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active'); 

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);

    };

    slider();

    //input only number in calculator's inputs 
    const inpNumberCalc = () =>{
        const calcBlock = document.querySelector('.calc-block');

        calcBlock.addEventListener('input', (e) =>{
            let target = e.target;
            if (target.closest('.calc-square') || target.closest('.calc-count') || target.closest('.calc-day') ) {
                target.value = target.value.replace(/\D/g, '');
            }
        });
    };

    inpNumberCalc();

    //photos changes when mouse hover over them
    const team = () => {

        const command = document.getElementById('command'),
        row = command.querySelector('.row');

        row.addEventListener('mouseover', (event)=>{
            let target = event.target;

            if(target.closest('.command__photo')){
                target.src = target.dataset.img;
            }
        });

        row.addEventListener('mouseout', (event) => {
            let target = event.target;
            if(target.closest('.command__photo')){
                target.src = target.src.substring(0,  target.src.length-5);
                target.src += '.jpg';
            }
        });
    };

    team();

    //calculator
    const calc = (price = 100) =>{
        const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

                if (calcCount.value > 1) {
                    countValue += (calcCount.value - 1) / 10;
                }

                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            function animateNumbers(val, el, timeout, step){
                let i = 0;
                const animation = function(){
                    if ( i <= val ){
                        setTimeout(animation, timeout);
                        document.getElementById(el).textContent = i;
                        i += step;
                    } 
                };
                animation();
            }
            animateNumbers(total, totalValue.id, 1, 10); 
        };

        calcBlock.addEventListener('change', (event) => {
            let target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });


    };
    
    calc(100);

    //send-ajax-form
    const sendForm  = () => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById('form1');
        const form2 = document.getElementById('form2');
        const form3 = document.getElementById('form3');
        const input = form.querySelectorAll('input');
        const input2 = form2.querySelectorAll('input');
        const input3 = form3.querySelectorAll('input');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white';

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
            // for (let val of formData.entries()){
            //     body[val[0]] = val[1];
            // }
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body, 
                () =>{
                    statusMessage.textContent = successMessage;
                }, 
                (error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            input.forEach((item) =>{
               item.value = '';
            });
        });

        form2.addEventListener('submit', (event) => {
            event.preventDefault();
            form2.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form2);
            let body = {};
            // for (let val of formData.entries()){
            //     body[val[0]] = val[1];
            // }
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body, 
                () =>{
                    statusMessage.textContent = successMessage;
                }, 
                (error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            input2.forEach((item) =>{
               item.value = '';
            });
        });

        form3.addEventListener('submit', (event) => {
            event.preventDefault();
            form3.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form3);
            let body = {};
            // for (let val of formData.entries()){
            //     body[val[0]] = val[1];
            // }
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body, 
                () =>{
                    statusMessage.textContent = successMessage;
                }, 
                (error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            input3.forEach((item) =>{
               item.value = '';
            });
        });

        document.addEventListener('input', (event) =>{
            let target = event.target;
            if (target === target.closest('.form-name') || target === target.closest('#form2-name'))
            {
                target.value = target.value.replace(/[^а-я ]/gi, '');
            } 
            if(target === target.closest('.mess')){
                target.value = target.value.replace(/[^а-я0-9.,!-? ]/gi, '');
            }
            if (target === target.closest('.form-phone')) {
                target.value = target.value.replace(/[^\+\d]/g, '');
            }
        });

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
               
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };
    };
    sendForm();
});
