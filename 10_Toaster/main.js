const toastHeight = document.body.style.getPropertyValue('--toast-height');
console.log(toastHeight);

const toaster = {
  state: [],
  time: 0,
  height: 0,
  createToast({ type, title, message }) {
    const template = document.createElement('template');
    template.innerHTML = `<div class="toast toast-${type}"">
    <h4 class="toast-heading">${title} ${this.state.length}</h4>
    <div class="toast-message">
      <svg width="24" height="24">
        <use xlink:href="#${type}" />
      </svg>
      <p>${message}</p>
    </div>
    <a class="close">&times;</a>
  </div>`;

    return template.content.firstElementChild;
  },
  add({ type, title, message }) {
    const newToast = this.createToast({ type, title, message });

    this.state.push(newToast);
    document.body.appendChild(newToast);

    const toastHeight = +getComputedStyle(newToast)
      .getPropertyValue('--toast-height')
      .replace(/[^0-9]/g, '');

    this.state.forEach($el => {
      $el.style.bottom = `${+$el.style.bottom.replace(/[^0-9]/g, '') + toastHeight}px`;
    });

    newToast.style.bottom = 0;

    setTimeout(() => {
      document.body.removeChild(this.state.shift());
    }, 3000);
  },
};

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
