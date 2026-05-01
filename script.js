// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced smooth scrolling with custom easing
function smoothScrollTo(target, duration = 1000) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 70; // Account for navbar height
    let startTime = null;

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);
}

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target);
            
            // Add fade effect to target section
            target.style.opacity = '0.7';
            setTimeout(() => {
                target.style.transition = 'opacity 0.5s ease';
                target.style.opacity = '1';
            }, 100);
        }
    });
});

// Enhanced navbar background on scroll with fade effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.transition = 'all 0.3s ease';
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
    } else {
        navbar.style.transition = 'all 0.3s ease';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
    }
});

// Enhanced Scroll Reveal Animation with multiple effects
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            if (!element.classList.contains('active')) {
                element.classList.add('active');
                
                // Add staggered animation delay
                const delay = index * 0.1;
                element.style.animationDelay = `${delay}s`;
                
                // Apply different animation types based on element
                if (element.classList.contains('project-card')) {
                    element.style.animation = 'slideInLeft 0.8s ease-out forwards';
                } else if (element.classList.contains('skill-item')) {
                    element.style.animation = 'fadeInScale 0.6s ease-out forwards';
                } else if (element.classList.contains('stat-item')) {
                    element.style.animation = 'slideUp 0.8s ease-out forwards';
                } else {
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            }
        }
    });
};

// Initial check on page load
setTimeout(revealOnScroll, 100);

// Check on scroll with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(revealOnScroll);
});

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll('section, .project-card, .skill-item, .stat-item');
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Enhanced Notification System with smooth fade effects
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.style.transition = 'all 0.3s ease';
        existingNotification.style.opacity = '0';
        existingNotification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => existingNotification.remove(), 300);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add enhanced styles with neon effects
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    `;
    
    // Set background color based on type with neon glow
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00FF00, #00CC00)';
        notification.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5), 0 10px 25px rgba(0, 0, 0, 0.2)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #FF0066, #CC0052)';
        notification.style.boxShadow = '0 0 20px rgba(255, 0, 102, 0.5), 0 10px 25px rgba(0, 0, 0, 0.2)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #00FFFF, #00CCCC)';
        notification.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5), 0 10px 25px rgba(0, 0, 0, 0.2)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in with smooth effect
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds with smooth fade
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 70);
        }, 500);
    }
});

// Enhanced Parallax Effects for multiple elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = [
        { selector: '.hero', speed: 0.5, fade: true },
        { selector: '.hero-content', speed: 0.3, fade: true },
        { selector: '.hero-image', speed: 0.7, fade: false },
        { selector: '.about', speed: 0.2, fade: false },
        { selector: '.projects', speed: 0.1, fade: false }
    ];
    
    parallaxElements.forEach(({ selector, speed, fade }) => {
        const element = document.querySelector(selector);
        if (element) {
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
            element.style.transition = 'transform 0.1s ease-out';
            
            if (fade) {
                const opacity = Math.max(0, 1 - scrolled / 800);
                element.style.opacity = opacity;
            }
        }
    });
    
    // Parallax for background elements
    const heroBefore = document.querySelector('.hero::before');
    if (heroBefore) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.setProperty('--parallax-y', `${scrolled * 0.3}px`);
        }
    }
});

// Enhanced Active Navigation Link with smooth transitions
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

let currentSection = '';

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
            if (currentSection !== sectionId) {
                currentSection = sectionId;
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.style.transition = 'all 0.3s ease';
                });
                
                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Enhanced Project Card Hover Effects with smooth transitions
document.querySelectorAll('.project-card').forEach((card, index) => {
    // Add initial staggered animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 200);
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
        this.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.6)';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'var(--shadow-md)';
        this.style.transition = 'all 0.3s ease';
    });
});

// Enhanced Skill Item Animation with staggered fade-in
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.9)';
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                observer.unobserve(item);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(item);
});

// Enhanced Counter Animation for Stats with smooth fade-in
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    // Fade in the element first
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.ceil(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            }
        }
        
        updateCounter();
    }, 300);
}

// Enhanced Intersection Observer for stats with fade effect
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            const statLabels = entry.target.querySelectorAll('.stat-label');
            
            // Fade in stat items first
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Then animate counters
                statNumbers.forEach((stat, index) => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    setTimeout(() => {
                        animateCounter(stat, number);
                    }, index * 200);
                });
                
                // Fade in labels
                statLabels.forEach((label, index) => {
                    label.style.opacity = '0';
                    setTimeout(() => {
                        label.style.transition = 'opacity 0.6s ease';
                        label.style.opacity = '0.9';
                    }, 800 + index * 100);
                });
            }, 200);
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Enhanced loading animation with smooth fade-in
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Smooth fade-in for all elements
    const fadeElements = document.querySelectorAll('.hero-content, .hero-image, section');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add loaded styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body.loaded .reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Console welcome message
console.log('%c Welcome to my Portfolio! 🚀', 'font-size: 20px; color: #4F46E5; font-weight: bold;');
console.log('%c Built with HTML, CSS, and JavaScript', 'font-size: 14px; color: #10B981;');
console.log('%c Feel free to explore and connect!', 'font-size: 14px; color: #F59E0B;');
