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

function attachListeners() {
  inputs.forEach((input) => {
    input.addEventListener('blur', () => {
      if (input.value !== '') {
        input.classList.add('interacted');
        showError(input);
      }
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('interacted')) {
        showError(input);
      }
    });
  });
}

function showError(input) {
  // Get input's error div
  const inputError = input.parentElement.querySelector('.error');

  if (input.name === 'password') {
    validatePassword(input);
    if (input.validity.valueMissing) {
      errorPassword.textContent = '* This field is required.';
    } else if (input.validity.typeMismatch) {
      errorPassword.textContent = `Entered value needs to be a valid ${input.name}.`;
    } else if (input.validity.patternMismatch) {
      errorPassword.textContent = 'Password must meet requirements.';
    } else if (input.validity.valid) {
      errorPassword.textContent = '';
    }
    return;
  }

  if (input.name === 'pass-confirm') {
    if (input.validity.valueMissing) {
      inputError.textContent = '* This field is required.';
    } else if (inputPassword.value !== inputConfirm.value) {
      inputError.textContent = 'Confirmation password does not match password.';
    } else {
      inputError.textContent = '';
    }
    return;
  }

  if (input.validity.valueMissing) {
    inputError.textContent = '* This field is required.';
  } else if (input.validity.typeMismatch) {
    inputError.textContent = `Entered value needs to be a valid ${input.name}.`;
  } else if (input.validity.patternMismatch) {
    inputError.textContent = 'Entered value needs to be 5 digits only.';
  } else if (input.validity.valid) {
    inputError.textContent = '';
  }
}

function validatePassword(input) {
  const atLeastEight = /.{8,}/;
  const upperCase = /[A-Z]/;
  const digit = /\d/;

  const passReqEight = document.querySelector('#pass-eight');
  const passReqUpper = document.querySelector('#pass-upper');
  const passReqDigit = document.querySelector('#pass-digit');

  if (atLeastEight.test(input.value)) {
    passReqEight.classList.add('green');
  } else {
    passReqEight.classList.remove('green');
  }

  if (upperCase.test(input.value)) {
    passReqUpper.classList.add('green');
  } else {
    passReqUpper.classList.remove('green');
  }

  if (digit.test(input.value)) {
    passReqDigit.classList.add('green');
  } else {
    passReqDigit.classList.remove('green');
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
  e.preventDefault();

  clearErrors();

  let isFormValid = true;

  inputs.forEach((input) => {
    input.classList.add('interacted');

    if (!input.validity.valid) {
      showError(input);
      isFormValid = false;
    }
  });

  if (inputPassword.value !== inputConfirm.value) {
    isFormValid = false;
    showError(inputConfirm);
  }

  if (!isFormValid) {
    e.preventDefault();
    return;
  }

  submitButton.classList.add('green-bg');
});

attachListeners();
