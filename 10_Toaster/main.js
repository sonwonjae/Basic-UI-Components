const toaster = (() => {
  const toasts = [];

  const createToast = ({ type, title, message }) => {
    const template = document.createElement('template');
    template.innerHTML = `<div class="toast toast-${type}"">
     <h4 class="toast-heading">${title} ${toasts.length}</h4>
     <div class="toast-message">
       <svg width="24" height="24">
         <use xlink:href="#${type}" />
       </svg>
       <p>${message}</p>
     </div>
     <a class="close">&times;</a>
   </div>`;

    return template.content.firstElementChild;
  };

  const liftupToasts = toast => {
    const toastHeight = +getComputedStyle(toast)
      .getPropertyValue('--toast-height')
      .replace(/[^0-9]/g, '');

    toasts.forEach($el => {
      $el.style.bottom = `${+$el.style.bottom.replace(/[^0-9]/g, '') + toastHeight}px`;
    });
  };

  return {
    add(toastInfo) {
      const newToast = createToast(toastInfo);
      toasts.push(newToast);
      document.body.appendChild(newToast);

      liftupToasts(newToast);
      newToast.style.bottom = 0;

      setTimeout(() => {
        document.body.removeChild(toasts.shift());
      }, 3000);
    },
  };
})();

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

const createToastAction = (type, title, message) => ({
  type,
  title,
  message,
});

// Button click Event Handlers
document.querySelector('.show-success').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'This is a success alert'));

document.querySelector('.show-error').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.ERROR, 'Check it out!', 'This is a error alert'));

document.querySelector('.show-warning').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.WARNING, 'Check it out!', 'This is a warning alert'));
