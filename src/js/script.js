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
});