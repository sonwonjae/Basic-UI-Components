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

// state
let currentTab = 0;

// DOM Nodes
const $tabs = document.querySelector('.tabs');
const $spinner = document.querySelector('.spinner');
let $glider;

// render function
const render = resolve => {
  let tabsHTML = '';
  let tabsTitles = '';
  let tabsContents = '';

  $tabs.style.setProperty('--tab-width', (window.innerWidth * 0.8) / resolve.length);
  $tabs.style.setProperty('--tabs-length', resolve.length);

  resolve.forEach(({ title, content }, i) => {
    tabsTitles += `<div class="tab" data-index="${i}">${title}</div>`;
    tabsContents += `<div class="tab-content ${i === currentTab ? 'active' : ''}">${content}</div>`;
  });

  tabsHTML = `<nav>${tabsTitles}<span class="glider"></span></nav>${tabsContents}`;

  // render 완료
  $tabs.innerHTML = tabsHTML;

  $glider = document.querySelector('.glider');

  $spinner.style.display = 'none';
};

// Event binding
window.addEventListener('DOMContentLoaded', () => {
  fetchTabsData().then(render);
});

$tabs.onclick = e => {
  if (!e.target.closest('nav')) return;

  $glider.style.left = e.target.dataset.index * $tabs.style.getPropertyValue('--tab-width') + 'px';
  currentTab = +e.target.dataset.index;

  const tabsContentsNodes = $tabs.querySelectorAll('.tab-content');

  [...tabsContentsNodes].forEach(($contentNode, i) =>
    $contentNode.classList.toggle('active', i === currentTab),
  );
};
