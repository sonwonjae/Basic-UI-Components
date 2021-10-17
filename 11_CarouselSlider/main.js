(() => {
  const DURATION_TIME = 500;
  let onTransition = false;
  // DOM nodes
  const $carousel = document.querySelector('.carousel');

  /**
   * Get width for set silde's
   * @param {string} imgPath : image path string
   */
  const getMaxSize = imgPath => {
    const img = new Image();
    img.src = imgPath;
    img.onload = () => {
      [$carousel.style.maxWidth, $carousel.style.maxHeight] = [
        `${img.naturalWidth}px`,
        `${img.naturalHeight}px`,
      ];
    };
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

  /**
   * Set slide's css variables
   * @param { Element } $slides - target slides element
   * @param { number } duration - for changed '--duration'
   * @param { number } newSlideNum - for changed '--currentSlide'
   */
  const setSlideProperty = ($slides, duration, newSlideNum) => {
    $slides.style.setProperty('--duration', duration);
    $slides.style.setProperty('--currentSlide', newSlideNum);
  };

  /**
   * Control silde's button, left or right
   * @param { Element } $slides - slide element
   * @param { boolean } isPrev - prev: true, next: false
   */
  const slideControl = ($slides, isPrev) => {
    const currentSlide = $slides.style.getPropertyValue('--currentSlide');
    setSlideProperty($slides, DURATION_TIME, +currentSlide + (isPrev ? -1 : 1));
  };

  // Event bindings
  $carousel.onclick = e => {
    if (onTransition) return;
    if (!e.target.matches('.carousel-control')) return;
    slideControl(e.target.parentNode.firstElementChild, e.target.classList.contains('prev'));
  };

  $carousel.ontransitionstart = () => {
    onTransition = true;
  };

  $carousel.ontransitionend = e => {
    onTransition = false;

    if (!e.target.matches('.carousel-slides')) return;
    const $slides = e.target;
    const currentSlide = $slides.style.getPropertyValue('--currentSlide');

    if (+currentSlide === 0) setSlideProperty($slides, 0, $slides.children.length - 2);
    if (+currentSlide === $slides.children.length - 1) setSlideProperty($slides, 0, 1);
  };

  // initial function
  const carousel = images => {
    getMaxSize(images[0]);
    render(images);
  };

  carousel([
    'movies/movie-1.jpg',
    'movies/movie-2.jpg',
    'movies/movie-3.jpg',
    'movies/movie-4.jpg',
  ]);
})();
