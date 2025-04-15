// -------- Project Filtering -------- //
function filterProjects(category) {
    const cards = document.querySelectorAll('.projects-grid .project-card');
    const buttons = document.querySelectorAll('.filter-buttons .filter-btn');

    // Update button active state
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Check dataset or onclick attribute for matching category
        if (btn.getAttribute('onclick') === `filterProjects('${category}')`) {
            btn.classList.add('active');
        }
    });

    // Filter cards
    cards.forEach(card => {
        const cardCategory = card.dataset.category || card.classList.contains(category); // Use data-category if available, fallback to class
        const cardMatches = category === 'all' || card.classList.contains(category); // Simpler check using class directly


        // Use a class for hiding/showing for better CSS control (optional)
        if (cardMatches) {
            // card.classList.remove('hidden');
            card.style.display = 'block'; // Keep using display for simplicity now
            // Optional: Add fade-in animation class here if desired
        } else {
            // card.classList.add('hidden');
            card.style.display = 'none'; // Keep using display
            // Optional: Add fade-out animation class here if desired
        }
    });
}


// -------- Sticky Navbar -------- //
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header'); // Or use a specific offset value

// Function to handle sticky state
function handleScroll() {
    if (!navbar || !header) return; // Exit if elements not found

    const navbarHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY;
    // Stick when scroll is past the header height (adjust offset if needed)
    const stickyThreshold = header.offsetHeight - navbarHeight; // Stick just before header fully disappears

    if (scrollPosition > stickyThreshold) {
        if (!navbar.classList.contains('sticky')) {
            navbar.classList.add('sticky');
            // Add padding to body to prevent content jump
            document.body.style.paddingTop = `${navbarHeight}px`;
            document.body.classList.add('navbar-sticky'); // Add class for potential body styling
        }
    } else {
        if (navbar.classList.contains('sticky')) {
            navbar.classList.remove('sticky');
            // Remove padding from body
            document.body.style.paddingTop = '0';
            document.body.classList.remove('navbar-sticky');
        }
    }
}

// -------- Smooth Scrolling for internal links -------- //
function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    if (!targetId || targetId === "#") return; // Exit if href is missing or just #

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const navbarStickyHeight = navbar.classList.contains('sticky') ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarStickyHeight - 10; // Adjusted offset (10px extra space)

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }
}


// -------- Event Listeners -------- //

// Initial project filter load
window.addEventListener('load', () => {
    filterProjects('all');
    handleScroll(); // Check sticky state on load
});

// Handle sticky navbar on scroll
window.addEventListener('scroll', handleScroll);

// Attach smooth scroll to links with class 'scroll-link'
document.querySelectorAll('a.scroll-link').forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// -------- Add data-category attribute to project cards -------- //
// This makes filtering slightly more robust if classes change
// Run this once on load to ensure cards have the attribute if they don't already
window.addEventListener('load', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        if (!card.dataset.category) {
            if (card.classList.contains('python')) card.dataset.category = 'python';
            else if (card.classList.contains('java')) card.dataset.category = 'java';
            else if (card.classList.contains('ml')) card.dataset.category = 'ml';
        }
    });
});