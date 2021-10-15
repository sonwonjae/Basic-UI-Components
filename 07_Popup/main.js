(() => {
  // DOM nodes
  const $popupButton = document.querySelector('.toggle-popup');
  const $modal = document.querySelector('.dialog-outer');
  const $message = document.querySelector('.popup-message');
  const $form = document.querySelector('.dialog-form');
  const $input = document.querySelector('.dialog-input');
  const $cancel = document.querySelector('.cancel');
  const $closeButton = document.querySelector('.dialog-close-button');

  // modal control function
  const openModal = () => {
    $modal.classList.add('is-active');
    $input.focus();
  };

  const closeModal = () => {
    $modal.classList.remove('is-active');
    $input.value = '';
  };

  // Event bindings
  $popupButton.onclick = openModal;
  [$cancel.onclick, $closeButton.onclick] = [closeModal, closeModal];

  $modal.onclick = e => {
    if (e.target !== $modal) return;
    closeModal();
  };

  $form.onsubmit = e => {
    e.preventDefault();
    $message.textContent = `from popup: ${$input.value}`;
    closeModal();
  };
})();
