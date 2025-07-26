// Function to load fonts dynamically
function loadFonts() {
    // Load Google Fonts
    const googleFonts = document.createElement('link');
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
    googleFonts.rel = 'stylesheet';
    document.head.appendChild(googleFonts);

    // Load Font Awesome
    const fontAwesome = document.createElement('link');
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    fontAwesome.rel = 'stylesheet';
    document.head.appendChild(fontAwesome);
}

// Load fonts when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFonts);
} else {
    loadFonts();
}
