"use strict";
const inpNumberCalc = () =>{
    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', (e) =>{
        let target = e.target;
        if (target.closest('.calc-square') || target.closest('.calc-count') || target.closest('.calc-day') ) {
            target.value = target.value.replace(/\D/g, '');
        }
    });
};

export default inpNumberCalc;