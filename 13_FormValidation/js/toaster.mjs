const createToastAction = (type, title, message) => ({
  type,
  title,
  message,
});

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

export { createToastAction, toaster };
