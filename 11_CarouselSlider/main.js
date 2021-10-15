const DURATION_TIME = 500;
let onTransition = false;
// DOM nodes
const $carousel = document.querySelector('.carousel');

const getMaxSize = imgPath => {
  const img = new Image();
  img.addEventListener(
    'load',
    () => {
      [$carousel.style.maxWidth, $carousel.style.maxHeight] = [
        `${img.naturalWidth}px`,
        `${img.naturalHeight}px`,
      ];
    },
    false,
  );
  img.src = imgPath;
};

// render image nodes
const render = images => {
  const $slides = document.createElement('div');
  $slides.classList.add('carousel-slides');
  $slides.style.setProperty('--currentSlide', 1);

  const _images = [images[images.length - 1], ...images, images[0]];
  _images.forEach(path => {
    const $img = new Image();
    $img.src = path;
    $img.style.width = '100%'; // for responsive
    $slides.appendChild($img);
  });
  $carousel.appendChild($slides);

  ['prev', 'next'].forEach(text => {
    const $button = document.createElement('button');
    $button.classList.add('carousel-control', text);
    $button.innerHTML = text === 'prev' ? '&laquo;' : '&raquo;';
    $carousel.appendChild($button);
  });
};

const carousel = images => {
  getMaxSize(images[0]);
  render(images);
};

carousel(['movies/movie-1.jpg', 'movies/movie-2.jpg', 'movies/movie-3.jpg', 'movies/movie-4.jpg']);

/**
 * @TODO control logic 합치기
 */
const prevControl = $slides => {
  const currentSlide = $slides.style.getPropertyValue('--currentSlide');
  $slides.style.setProperty('--duration', DURATION_TIME);
  $slides.style.setProperty('--currentSlide', +currentSlide - 1);
};

const nextControl = $slides => {
  const currentSlide = $slides.style.getPropertyValue('--currentSlide');
  $slides.style.setProperty('--duration', DURATION_TIME);
  $slides.style.setProperty('--currentSlide', +currentSlide + 1);
};

// Event bindings
$carousel.onclick = e => {
  if (onTransition) return;
  if (!e.target.matches('.carousel-control')) return;
  e.target.classList.contains('prev')
    ? prevControl(e.target.parentNode.firstElementChild)
    : nextControl(e.target.parentNode.firstElementChild);
};

$carousel.ontransitionstart = () => {
  onTransition = true;
};

$carousel.ontransitionend = e => {
  onTransition = false;

  if (!e.target.matches('.carousel-slides')) return;
  const $slides = e.target;
  const currentSlide = $slides.style.getPropertyValue('--currentSlide');

  if (+currentSlide === 0) {
    $slides.style.setProperty('--duration', 0);
    $slides.style.setProperty('--currentSlide', $slides.children.length - 2);
  }
  if (+currentSlide === $slides.children.length - 1) {
    $slides.style.setProperty('--duration', 0);
    $slides.style.setProperty('--currentSlide', 1);
  }
};
