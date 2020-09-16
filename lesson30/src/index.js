'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import smoothScrolling from './modules/smoothScrolling';
import tabs from './modules/tabs';
import slider from './modules/slider';
import inpNumberCalc from './modules/inpNumberCalc';
import team from './modules/team';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
countTimer('29, september, 2020');
// Menu
toggleMenu();
// popup
togglePopUp();
//smooth scrolling
smoothScrolling();
//tabs
tabs();
//slider
slider();
//input only number in calculator's inputs 
inpNumberCalc();
//photos changes when mouse hover over them
team();
//calculator  
calc(100);
//send-ajax-form
sendForm();