import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const formData = {};

populateTextarea();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(formData);
  e.target.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const saveMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveMessage) {
    refs.email.value = saveMessage['email'] || '';
    refs.textarea.value = saveMessage['message'] || '';
  }
}
