// Scroll Progress Indicator
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Enhanced Back to Top Button with Progress
function enhanceBackToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) return;

    const progressPath = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    progressPath.setAttribute('class', 'progress-circle');
    progressPath.innerHTML = `
        <path d="M50,10 a40,40 0 1,1 -0.1,0" />
        <path class="progress" d="M50,10 a40,40 0 1,1 -0.1,0" />
    `;
    button.appendChild(progressPath);

    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.pageYOffset * 283.185) / totalScroll; // SVG path length
        
        const progressPath = button.querySelector('.progress');
        if (progressPath) {
            progressPath.style.strokeDashoffset = 283.185 - progress;
        }
        
        button.classList.toggle('active', window.pageYOffset > 300);
    });
}

// Optimized Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in, .product-card, .testimonial-card, .gallery-item, .feature-item, .partnership-card')
        .forEach(element => observer.observe(element));
}

// Smooth Anchor Navigation
function setupSmoothAnchorNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all scroll-related features
document.addEventListener('DOMContentLoaded', function() {
    createScrollProgressBar();
    enhanceBackToTop();
    setupScrollAnimations();
    setupSmoothAnchorNavigation();
});