"use strict";
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

export default smoothScrolling;