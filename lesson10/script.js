'use strict';

const book = document.querySelectorAll('.book'),
      a = document.querySelectorAll('a'),
      adv = document.querySelector('.adv'),
      li0 = book[0].querySelectorAll('li'),
      li5 = book[5].querySelectorAll('li'), 
      li2 = book[2].querySelectorAll('li'),
      newElem = document.createElement('li');

//The book order has been restored
book[1].after(book[0]);
book[4].after(book[2]);
book[4].after(book[3]);
book[5].after(book[2]);

//Background is changed
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//Header is changed in book 3
a[4].textContent = '"Книга 3. this и Прототипы Объектов"';

//delete advertising
adv.remove();

//Order of the chapters has been restored in book № 2
li0[10].prepend(li0[2]);
li0[3].append(li0[6]);
li0[4].prepend(li0[8]);

//Order of the chapters has been restored in book № 5
li5[1].append(li5[9]);
li5[1].append(li5[3]);
li5[2].prepend (li5[4]);
li5[7].append(li5[5]);

//New elem created and added in book № 6
newElem.textContent = 'Глава 8: За пределами ES6';
li2[8].insertAdjacentElement('beforeend', newElem);

