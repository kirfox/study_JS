"use strict";
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

export default team;