document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');
    const backToTopButton = document.getElementById('backToTop');

    // Mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
            document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('active', window.pageYOffset > 300);
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .testimonial-card, .gallery-item, .feature-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animations
    const elements = document.querySelectorAll('.product-card, .testimonial-card, .gallery-item, .feature-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Initial animation
    setTimeout(animateOnScroll, 500);
    window.addEventListener('scroll', animateOnScroll);

    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.pageX - card.getBoundingClientRect().left;
            const y = e.pageY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px) scale(1.02)';
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const serviceSelect = document.getElementById('service');
            const messageInput = document.getElementById('message');
            
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                service: serviceSelect.value,
                message: messageInput.value.trim()
            };
            
            // Get submit button and status message elements
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            let statusMessage = document.getElementById('form-status');
            
            // Create status message element if it doesn't exist
            if (!statusMessage) {
                statusMessage = document.createElement('div');
                statusMessage.id = 'form-status';
                statusMessage.style.padding = '12px 15px';
                statusMessage.style.margin = '15px 0';
                statusMessage.style.borderRadius = '4px';
                statusMessage.style.fontSize = '0.95rem';
                contactForm.insertBefore(statusMessage, submitBtn);
            }
            
            // Client-side validation
            if (!formData.name) {
                showError('Please enter your name', nameInput);
                return;
            }
            
            if (!formData.phone) {
                showError('Please enter your phone number', phoneInput);
                return;
            } else if (!/^[0-9\+\-\s\(\)]{10,}$/.test(formData.phone)) {
                showError('Please enter a valid phone number', phoneInput);
                return;
            }
            
            if (!formData.service) {
                showError('Please select a service', serviceSelect);
                return;
            }
            
            if (!formData.message) {
                showError('Please enter your message', messageInput);
                return;
            }
            
            // Disable submit button and show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            statusMessage.textContent = '';
            statusMessage.style.display = 'none';
            
            // Remove any existing error highlights
            document.querySelectorAll('.form-control').forEach(el => {
                el.style.borderColor = '';
            });
            
            try {
                // Send data to the server
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                // Show status message
                statusMessage.style.display = 'block';
                
                if (response.ok) {
                    // Show success message
                    statusMessage.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-check-circle" style="font-size: 1.2em;"></i>
                            <span>${data.message || 'Message sent successfully! We\'ll get back to you soon.'}</span>
                        </div>
                    `;
                    statusMessage.style.backgroundColor = '#d4edda';
                    statusMessage.style.color = '#155724';
                    contactForm.reset();
                    
                    // Scroll to the top of the form
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // Show validation errors or server error
                    let errorMsg = data.errors ? 
                        data.errors.map(err => `• ${err.msg}`).join('<br>') : 
                        (data.message || 'Failed to send message. Please try again.');
                    
                    statusMessage.innerHTML = `
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <i class="fas fa-exclamation-circle" style="font-size: 1.2em; margin-top: 2px;"></i>
                            <div>${errorMsg}</div>
                        </div>
                    `;
                    statusMessage.style.backgroundColor = '#f8d7da';
                    statusMessage.style.color = '#721c24';
                    
                    // Highlight problematic fields if server returns field-specific errors
                    if (data.errors) {
                        data.errors.forEach(error => {
                            const field = error.param;
                            const input = document.getElementById(field);
                            if (input) {
                                input.style.borderColor = '#dc3545';
                                input.focus();
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                statusMessage.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 1.2em;"></i>
                        <span>An error occurred. Please try again later or contact us directly.</span>
                    </div>
                `;
                statusMessage.style.backgroundColor = '#fff3cd';
                statusMessage.style.color = '#856404';
                statusMessage.style.display = 'block';
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
            
            // Helper function to show error messages
            function showError(message, element) {
                statusMessage.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-exclamation-circle" style="font-size: 1.2em;"></i>
                        <span>${message}</span>
                    </div>
                `;
                statusMessage.style.backgroundColor = '#f8d7da';
                statusMessage.style.color = '#721c24';
                statusMessage.style.display = 'block';
                
                if (element) {
                    element.style.borderColor = '#dc3545';
                    element.focus();
                    
                    // Remove error highlight when user starts typing
                    const removeHighlight = () => {
                        element.style.borderColor = '';
                        element.removeEventListener('input', removeHighlight);
                        element.removeEventListener('change', removeHighlight);
                    };
                    element.addEventListener('input', removeHighlight);
                    element.addEventListener('change', removeHighlight);
                }
                
                // Scroll to the error message
                statusMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});