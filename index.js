const form = document.querySelector('.signup');

const inputs = document.querySelectorAll('input');
const inputEmail = document.querySelector('#email');
const inputCountry = document.querySelector('#country');
const inputZip = document.querySelector('#zip');
const inputPassword = document.querySelector('#password');
const inputConfirm = document.querySelector('#pass-confirm');
const submitButton = document.querySelector('#submit-button');

const errorEmail = document.querySelector('#error-email');
const errorCountry = document.querySelector('#error-country');
const errorZip = document.querySelector('#error-zip');
const errorPassword = document.querySelector('#error-password');
const errorConfirm = document.querySelector('#error-pass-confirm');

function attachBlurListener() {
  inputs.forEach((input) => {
    input.addEventListener('blur', () => {
      if (input.value !== '') {
        input.classList.add('interacted');
        showError();
      }
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('interacted')) {
        showError();
      }
    });
  });
}

function showError() {
  console.log('Show error called');
  // Email
  if (inputEmail.validity.valueMissing) {
    errorEmail.textContent = 'You need to enter an email address.';
  } else if (inputEmail.validity.typeMismatch) {
    errorEmail.textContent = 'Entered value needs to be an email address.';
  } else if (inputEmail.validity.valid) {
    errorEmail.textContent = '';
  }
}

function clearErrors() {
  errorEmail.textContent = '';
  errorCountry.textContent = '';
  errorZip.textContent = '';
  errorPassword.textContent = '';
  errorConfirm.textContent = '';
}

form.addEventListener('submit', (e) => {
  clearErrors();

  let isFormValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      isFormValid = false;
      if (input.dataset.isListenerAttached === false) {
        input.classList.add('interacted');
        attachInputListener(input);
      }
    }
  });

  if (inputPassword.value !== inputConfirm.value) {
    isFormValid = false;
  }

  if (!isFormValid) {
    e.preventDefault();
    showError();
    return;
  }

  submitButton.classList.add('green');
});

attachBlurListener();

// inputEmail.addEventListener('input', () => {
//   if (inputEmail.validity.valid) {
//     errorEmail.classList.remove('active');
//     errorEmail.textContent = '';
//   } else {
//     showError();
//   }
// });

// inputCountry.addEventListener('input', () => {
//   if (inputCountry.validity.valid) {
//     errorCountry.classList.remove('active');
//     errorCountry.textContent = '';
//   } else {
//     showError();
//   }
// });

// inputZip.addEventListener('input', () => {
//   if (inputZip.validity.valid) {
//     errorZip.classList.remove('active');
//     errorZip.textContent = '';
//   } else {
//     showError();
//   }
// });

// inputPassword.addEventListener('input', () => {
//   if (inputPassword.validity.valid) {
//     errorPassword.classList.remove('active');
//     errorPassword.textContent = '';
//   } else {
//     showError();
//   }
// });

// inputConfirm.addEventListener('input', () => {
//   if (inputConfirm.validity.valid && inputPassword.value === inputConfirm.value) {
//     errorConfirm.classList.remove('active');
//     errorConfirm.textContent = '';
//   } else {
//     showError();
//   }
// });
