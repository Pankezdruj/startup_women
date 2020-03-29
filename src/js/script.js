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


const constraints = {
    Email: {
        email: {
            message: "is not valid"
        },
        presence: {
            allowEmpty: false
        }
    },
    phone: {
        numericality: {
            onlyInteger: true,
            greaterThan: 100000000,
            notValid: "is not valid"
        },
        presence: {
            allowEmpty: false
        }
    },
    name: {
        length: {
            minimum: 2,
            tooShort: "is too short, must be minimum %{count} characters"
        },
        presence: {
            allowEmpty: false
        }
    }
}

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
            //inputs 
            const emailInput = e.target.querySelector('.form__input-email'),
                nameInput = e.target.querySelector('.form__input-name'),
                phoneInput = e.target.querySelector('.form__input-phone');
            //get form data
            let formData = Object.fromEntries(new FormData(e.target).entries());
            formData = {
                name: validate.prettify(formData.name),
                Email: formData.email,
                phone: formData.phone
            }
            if (!validate(formData, constraints)) {
                //all valid
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
                    modalConfirmation.classList.add('overlay__modal_active');
                    overlay.classList.add('overlay_active');
                    modalReservation.classList.remove('overlay__modal_active');
                    body.style.overflow = 'hidden';
                })
            } else {
                //error fields in form
                const emailErrorField = e.target.getElementsByClassName('error-email')[0],
                nameErrorField = e.target.getElementsByClassName('error-name')[0],
                phoneErrorField = e.target.getElementsByClassName('error-phone')[0];
                
                //smth not valid

                const notValid = validate(formData, constraints);
                if (notValid.Email) {
                    emailErrorField.textContent = notValid.Email[1] ? notValid.Email[1] : notValid.Email[0];
                    emailInput.classList.add('form__error');
                } 
                if (notValid.phone) {
                    phoneErrorField.textContent = notValid.phone[1] ? notValid.phone[1] : notValid.phone[0];
                    phoneInput.classList.add('form__error');
                } 
                if (notValid.name){
                    nameErrorField.textContent = notValid.name[1] ? notValid.name[1] : notValid.name[0];
                    nameInput.classList.add('form__error');
                } 
            }
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
    menuItems = document.getElementsByClassName('menu__item');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menuOverlay.classList.toggle('menu_active');
        menuOverlay.classList.toggle('window_active');
    });

    for (let i = 0; i < menuItems.length; i++){
        menuItems[i].addEventListener('click', () => {
            burger.classList.remove('burger_active');
            menuOverlay.classList.remove('menu_active'); 
            menuOverlay.classList.remove('window_active'); 
        });
    }
});