'use strict';


const form = document.querySelector(`.setup-wizard-form`);

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  window.backend.save(formData, window.dialog.close, window.util.errorHandler);
};

form.addEventListener(`submit`, formSubmitHandler);

