'use strict';
const people = document.getElementsByClassName('people')[0],
    photos = document.querySelectorAll('.people__photo'),
    photosWrapper = document.querySelector('.people__photos'),
    overlay = document.createElement('div'),
    name = document.createElement('h6'),
    descr = document.createElement('p');

overlay.classList.add('people__overlay');
name.classList.add('people__name');
descr.classList.add('people__descr');

window.addEventListener('DOMContentLoaded', () => {
    photosWrapper.addEventListener('hover', () => {
        photos.forEach( element => {
            if(element.matches())
        });
    });
});