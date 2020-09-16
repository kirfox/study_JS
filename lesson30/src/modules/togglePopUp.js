"use strict";
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

export default togglePopUp;