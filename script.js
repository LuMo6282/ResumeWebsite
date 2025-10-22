// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
// Add smooth scrolling behavior to internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .skill-item, .education-item, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// ===== CONTACT FORM HANDLING =====
// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handler)
        showNotification('Thank you! Your message has been sent.', 'success');
        this.reset(); // Clear the form
        
        // In a real application, you would send the data to your server here
        // Example: submitToServer(formData);
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
// Show success/error notifications
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
// Add a typing effect to the hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        // Start typing effect after a short delay
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }
});

// ===== SKILL ITEMS HOVER EFFECT =====
// Add enhanced hover effects to skill items
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
// Add subtle parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== COUNTER ANIMATION FOR STATS =====
// Animate numbers in the stats section
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(num => {
                const target = parseInt(num.textContent);
                animateCounter(num, target);
            });
            statsObserver.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ===== KEYBOARD NAVIGATION SUPPORT =====
// Improve accessibility with keyboard navigation
document.addEventListener('keydown', (e) => {
    // General keyboard shortcuts can be added here if needed
});

// ===== LAZY LOADING FOR IMAGES =====
// Implement lazy loading for better performance
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ===== DARK MODE TOGGLE (BONUS FEATURE) =====
// Add dark mode functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load saved dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Use throttled scroll events for better performance
const throttledScrollHandler = throttle(() => {
    // Handle scroll events here if needed
}, 16); // ~60 FPS

window.addEventListener('scroll', throttledScrollHandler);

// ===== CONSOLE WELCOME MESSAGE =====
// Fun easter egg for developers who check the console
console.log(`
🚀 Welcome to my resume website!
👨‍💻 Built with HTML, CSS, and JavaScript
🎨 Designed to be responsive and accessible
📧 Feel free to reach out if you have any questions!

Thanks for checking out the code! 🎉
`);

// ===== ERROR HANDLING =====
// Global error handler for better user experience
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Optionally show user-friendly error message
    // showNotification('Something went wrong. Please refresh the page.', 'error');
});

// ===== INITIALIZATION =====
// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Resume website loaded successfully! 🎉');
    
    // Add any additional initialization code here
    // For example, initialize third-party libraries, analytics, etc.
});