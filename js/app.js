/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const nav = document.createElement("nav");
const nav_ul = document.createElement("ul");
const sections = document.querySelectorAll("section");
const fragment = document.createDocumentFragment();
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Helper function to build the navigation menu
function buildNav() {
    nav.setAttribute('id', 'navbar__list');
    nav.style.position = 'fixed';
    nav.style.top = '0';
    nav.style.width = '100%';
    nav.style.backgroundColor = '#333';
    nav.style.color = 'white';
    nav.style.textAlign = 'center';
    nav.style.padding = '10px 0';
    nav.style.zIndex = '1000';
    nav.style.transition = 'top 0.3s';

    sections.forEach(section => {
        const nav_item = document.createElement('li');
        const nav_link = document.createElement('a');
        nav_link.textContent = section.getAttribute('data-nav');
        nav_link.setAttribute('href', `#${section.id}`);
        nav_link.style.color = 'white';
        nav_link.style.textDecoration = 'none';
        nav_link.style.fontSize = '18px';
        nav_link.style.margin = '0 15px';

        // Add smooth scrolling
        nav_link.addEventListener('click', (event) => {
            event.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });

        nav_item.style.display = 'inline';
        nav_item.appendChild(nav_link);
        fragment.appendChild(nav_item);
    });
    nav_ul.appendChild(fragment);
    nav.appendChild(nav_ul);
    document.body.prepend(nav);
}

// Helper function to handle scroll event
function handleScroll() {
    // Show the nav bar while scrolling
    nav.style.top = '0';

    // Clear the timer when scrolling
    clearTimeout(isScrolling);

    // Set a timer to hide the nav bar after scrolling stops
    isScrolling = setTimeout(() => {
        nav.style.top = '-100px'; // Adjust to be the negative height of the nav bar
    }, 2000); // Adjust the timeout duration as needed (e.g., 2 seconds)
}

// Helper function to add 'active' class to section when near top of viewport
function activeSection() {
    sections.forEach(section => {
        const box = section.getBoundingClientRect();
        const nav_link = document.querySelector(`a[href="#${section.id}"]`);
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('active');
            nav_link.classList.add('active');
        } else {
            section.classList.remove('active');
            nav_link.classList.remove('active');
        }
    });
}

// Helper function to create scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.textContent = 'Top';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.display = 'none';
    button.style.zIndex = '1000';
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}

// Helper function to make sections collapsible
function makeSectionsCollapsible() {
    sections.forEach(section => {
        const header = section.querySelector('h2');
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            section.classList.toggle('collapsed');
        });
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Main function to initialize the page
function init() {
    buildNav();
    createScrollToTopButton();
    makeSectionsCollapsible();
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Attach the scroll event listener to add 'active' class to section
window.addEventListener('scroll', activeSection);

// Initialize the page
document.addEventListener('DOMContentLoaded', init);



