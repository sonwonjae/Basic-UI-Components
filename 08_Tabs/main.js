// fetch fake data
const fetchTabsData = () =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
          },
        ]),
      1000,
    );
  });

/**
 * @returns {object} tab's methods
 */
const tab = (() => {
  // state
  /** @type {number} */
  let currentTab = 0;

  /** @type {number} */
  let tabLength = 0;

  // DOM Nodes
  const $tabs = document.querySelector('.tabs');
  const $spinner = document.querySelector('.spinner');

  const shiftGlider = index => {
    const $glider = document.querySelector('.glider');
    $glider.style.left = index * $tabs.style.getPropertyValue('--tab-width') + 'px';
  };

  const toggleActiveAll = () => {
    const tabsContentsNodes = $tabs.querySelectorAll('.tab-content');
    [...tabsContentsNodes].forEach(($contentNode, i) =>
      $contentNode.classList.toggle('active', i === currentTab),
    );
  };

  const switchTabHandler = e => {
    if (!e.target.closest('nav')) return;

    currentTab = +e.target.dataset.index;
    shiftGlider(e.target.dataset.index);
    toggleActiveAll();
  };

  // render function
  const renderHTML = resolve => {
    const { titles, contents } = resolve.reduce(
      (html, { title, content }, i) => {
        html.titles += `<div class="tab" data-index="${i}">${title}</div>`;
        html.contents += `<div class="tab-content ${
          i === currentTab ? 'active' : ''
        }">${content}</div>`;
        return html;
      },
      { titles: '', contents: '' },
    );

    return `<nav>${titles}<span class="glider"></span></nav>${contents}`;
  };

  return {
    resizeTabs(length = tabLength) {
      $tabs.style.setProperty('--tab-width', (window.innerWidth * 0.8) / length);
      $tabs.style.setProperty('--tabs-length', length);
    },
    postProcess(resolve) {
      $spinner.style.display = 'none';
      tabLength = resolve.length;
      $tabs.innerHTML = renderHTML(resolve);
      $tabs.onclick = switchTabHandler;
    },
  };
})();

// Event binding
window.addEventListener('DOMContentLoaded', () => {
  fetchTabsData().then(resolve => {
    tab.resizeTabs(resolve.length);
    tab.postProcess(resolve);
  });
});

window.onresize = _.throttle(() => {
  tab.resizeTabs();
}, 200);
