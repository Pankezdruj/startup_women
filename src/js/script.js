function JSON_to_URLEncoded(element,key,list = []){
    if(typeof(element)=='object'){
      for (var idx in element)
        JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
    } else {
      list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
  }

const btnsReservation = document.querySelectorAll('.button_book'),
    btnCofirmation = document.querySelector('.form__button'),
    forms = document.querySelectorAll('.form'),
    modalReservation = document.querySelector('.overlay__modal-reservation'),
    modalConfirmation = document.querySelector('.overlay__modal-confirmation'),
    overlay = document.querySelector('.overlay'),
    crosses = document.querySelectorAll('.overlay__cross'),
    body = document.getElementsByTagName('body')[0];


window.addEventListener('DOMContentLoaded', () => {
    new WOW().init();
    for(let i = 0; i < btnsReservation.length; i++){
        btnsReservation[i].addEventListener('click', () => {
            modalReservation.classList.add('overlay__modal_active');
            overlay.classList.add('overlay_active');
            body.style.overflow = 'hidden';
        });
    }
    for (let i = 0; i < forms.length; i++){
        forms[i].addEventListener('submit', e => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target).entries());
            const nameJSON = JSON.stringify(formData.name);
            const nameURL = JSON_to_URLEncoded(nameJSON, 'name');
            const emailJSON = JSON.stringify(formData.email);
            const emailURL = JSON_to_URLEncoded(emailJSON, 'email');
            const phoneJSON = JSON.stringify(formData.phone);
            const phoneURL = JSON_to_URLEncoded(phoneJSON, 'phone');
            const data = `${nameURL}&${emailURL}&${phoneURL}`;
            fetch('../mailer/smart.php', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .then((response) => {
                console.log(response);
                modalConfirmation.classList.add('overlay__modal_active');
                overlay.classList.add('overlay_active');
                modalReservation.classList.remove('overlay__modal_active');
                body.style.overflow = 'hidden';
            })
            modalConfirmation.classList.add('overlay__modal_active');
            overlay.classList.add('overlay_active');
            modalReservation.classList.remove('overlay__modal_active');
            body.style.overflow = 'hidden';
            fetch('mailer/smart.php', {
                method: 'POST',
                body: form.serialize(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( response => response.json())
            .then( myJSON => console.log(myJSON))
            .catch( e => console.error(e));
        });
    }
    for(let i = 0; i < crosses.length; i++){
        crosses[i].addEventListener('click', () => {
            body.style.overflow = 'visible';
            overlay.classList.remove('overlay_active');
            modalReservation.classList.remove('overlay__modal_active');
            modalConfirmation.classList.remove('overlay__modal_active');
        });
    }

    const burger = document.getElementsByClassName('burger')[0],
    menuOverlay = document.getElementsByClassName('menu')[0],
    menuOverlay = document.getElementsByClassName('window')[0],
    menuItems = document.getElementsByClassName('menu__item');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menuOverlay.classList.toggle('menu_active');
        menuOverlay.classList.toggle('window_active');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burger.classList.remove('burger_active');
            menuOverlay.classList.remove('menu_active'); 
            menuOverlay.classList.remove('window_active'); 
        });
    });
});