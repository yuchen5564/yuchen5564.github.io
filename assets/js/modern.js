// Modern Personal Portfolio JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initScrollSpy();
    initProjectModal();
    
    // Initialize parallax after a small delay to ensure styles are applied
    setTimeout(() => {
        initParallax();
    }, 100);
    
    // Delay scroll animations slightly to ensure DOM is fully ready
    requestAnimationFrame(() => {
        setTimeout(() => {
            initScrollAnimations();
        }, 200);
    });
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '100px 0px 100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const sections = document.querySelectorAll('.section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    const interestItems = document.querySelectorAll('.interest-item');
    const projectCards = document.querySelectorAll('.project-card');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Animate sections with faster timing
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        section.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(section);
    });

    // Animate timeline items immediately when timeline is visible
    const timelines = document.querySelectorAll('.timeline');
    timelines.forEach(timeline => {
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px 50px 0px'
        });
        
        timelineObserver.observe(timeline);
    });

    // Pre-add animation classes to timeline items
    timelineItems.forEach((item, index) => {
        item.classList.add('fade-in');
        // Fallback: make visible after 2 seconds if animation doesn't trigger
        setTimeout(() => {
            if (!item.classList.contains('visible')) {
                item.classList.add('visible');
            }
        }, 2000);
    });

    // Other elements with optimized timing
    skillItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.03}s`;
        observer.observe(item);
    });

    interestItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.03}s`;
        observer.observe(item);
    });

    projectCards.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(item);
    });

    socialLinks.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.02}s`;
        observer.observe(item);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll spy for active navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        console.log('Hero element found, initializing parallax');
        
        // Ensure the hero has the background image
        const backgroundImage = `
            linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.4)),
            url('images/bg.jpg')
        `;
        hero.style.backgroundImage = backgroundImage;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundRepeat = 'no-repeat';
        hero.style.backgroundPosition = 'center center';
        
        // Parallax scroll effect
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled <= heroHeight) {
                // Calculate parallax offset - start from center, move down with scroll
                const parallaxSpeed = 0.5;
                const yPos = scrolled * parallaxSpeed;
                hero.style.backgroundPosition = `center calc(50% + ${yPos}px)`;
            }
        }
        
        // Initial call
        updateParallax();
        
        // Add scroll listener
        window.addEventListener('scroll', updateParallax, { passive: true });
        
        console.log('Parallax effect initialized successfully');
    } else {
        console.log('Hero element not found');
    }
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Theme switcher (optional - can be enabled later)
function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (themeToggle) {
        // Get saved theme from localStorage or use system preference
        const currentTheme = localStorage.getItem('theme') || 
                           (prefersDarkScheme.matches ? 'dark' : 'light');
        
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
}

// Form handling (if contact form is added later)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formProps = Object.fromEntries(formData);
            
            // Add form submission logic here
            console.log('Form submitted:', formProps);
            
            // Show success message
            showMessage('Message sent successfully!', 'success');
        });
    }
}

// Message display utility
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--primary-color);
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Loading animation
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner"></div>
    `;
    spinner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    const spinnerCSS = `
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--border-color);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = spinnerCSS;
    document.head.appendChild(style);
    
    document.body.appendChild(spinner);
    
    return spinner;
}

function hideLoadingSpinner(spinner) {
    if (spinner && spinner.parentNode) {
        spinner.parentNode.removeChild(spinner);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading if needed
// initLazyLoading();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA features if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Analytics integration placeholder
function trackEvent(eventName, properties = {}) {
    // Google Analytics or other analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Track navigation clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_click', {
            section: e.target.textContent,
            href: e.target.getAttribute('href')
        });
    }
    
    if (e.target.matches('.project-link')) {
        trackEvent('project_click', {
            project: e.target.closest('.project-card').querySelector('h3').textContent,
            link_type: e.target.textContent.includes('GitHub') ? 'github' : 'visit'
        });
    }
    
    if (e.target.matches('.social-link')) {
        trackEvent('social_click', {
            platform: e.target.querySelector('span').textContent
        });
    }
});

// Horizontal Timeline functionality
function initHorizontalTimeline() {
    const timelines = document.querySelectorAll('.timeline');
    
    timelines.forEach(timeline => {
        initTimelineDragScroll(timeline);
        initTimelineNavButtons(timeline);
    });
}

// Drag to scroll functionality
function initTimelineDragScroll(timeline) {
    let isDown = false;
    let startX;
    let scrollLeft;

    timeline.addEventListener('mousedown', (e) => {
        isDown = true;
        timeline.style.cursor = 'grabbing';
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
        e.preventDefault();
    });

    timeline.addEventListener('mouseleave', () => {
        isDown = false;
        timeline.style.cursor = 'grab';
    });

    timeline.addEventListener('mouseup', () => {
        isDown = false;
        timeline.style.cursor = 'grab';
    });

    timeline.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2;
        timeline.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    timeline.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });

    timeline.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2;
        timeline.scrollLeft = scrollLeft - walk;
    });

    timeline.addEventListener('touchend', () => {
        isDown = false;
    });

    // Mouse wheel horizontal scrolling
    timeline.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            timeline.scrollLeft += e.deltaY;
        }
    });
}

// Navigation buttons functionality
function initTimelineNavButtons(timeline) {
    const timelineId = timeline.id;
    let prevBtn, nextBtn;
    
    if (timelineId === 'education-timeline') {
        prevBtn = document.getElementById('edu-prev');
        nextBtn = document.getElementById('edu-next');
    } else if (timelineId === 'experience-timeline') {
        prevBtn = document.getElementById('exp-prev');
        nextBtn = document.getElementById('exp-next');
    }

    if (prevBtn && nextBtn) {
        const scrollAmount = 320; // Width of one timeline item + margin

        prevBtn.addEventListener('click', () => {
            timeline.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            timeline.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states based on scroll position
        function updateButtonStates() {
            const isAtStart = timeline.scrollLeft <= 0;
            const isAtEnd = timeline.scrollLeft >= timeline.scrollWidth - timeline.clientWidth - 1;
            
            prevBtn.disabled = isAtStart;
            nextBtn.disabled = isAtEnd;
        }

        // Initial state
        updateButtonStates();

        // Update on scroll
        timeline.addEventListener('scroll', debounce(updateButtonStates, 100));
    }
}

// Keyboard navigation for timeline
document.addEventListener('keydown', function(e) {
    const activeTimeline = document.querySelector('.timeline:hover');
    
    if (activeTimeline) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            activeTimeline.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            activeTimeline.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    }
    
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Auto-scroll timeline items into view
function scrollTimelineItemIntoView(timeline, index) {
    const items = timeline.querySelectorAll('.timeline-item');
    if (items[index]) {
        const item = items[index];
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const timelineLeft = timeline.scrollLeft;
        const timelineWidth = timeline.clientWidth;
        
        // Calculate the position to center the item
        const targetScroll = itemLeft - (timelineWidth / 2) + (itemWidth / 2);
        
        timeline.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: 'smooth'
        });
    }
}

// Timeline item click to center
function initTimelineItemClick() {
    const timelines = document.querySelectorAll('.timeline');
    
    timelines.forEach(timeline => {
        const items = timeline.querySelectorAll('.timeline-item');
        
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                scrollTimelineItemIntoView(timeline, index);
                
                // Add active state
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    });
}

// Initialize timeline item clicks
document.addEventListener('DOMContentLoaded', function() {
    initTimelineItemClick();
});

// Project Modal functionality
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-project-content');
    const closeBtn = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.project-details-btn');

    // Note: Project data is now loaded from projectData.js

    // Open modal
    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        modalTitle.textContent = project.title;
        
        // Build modal content
        modalContent.innerHTML = `
            <div class="project-detail">
                <h3><i class="fas fa-info-circle"></i> Overview</h3>
                <p>${project.details}</p>
            </div>
            
            <div class="project-detail">
                <h3><i class="fas fa-star"></i> Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-detail">
                <h3><i class="fas fa-code"></i> Tech Stack</h3>
                <div class="project-tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-detail">
                <h3><i class="fas fa-link"></i> Links</h3>
                <div class="project-links-modal">
                    ${project.links.map(link => `
                        <a href="${link.url}" target="_blank" class="project-link-modal">
                            <i class="${link.icon}"></i> ${link.type === 'visit' ? 'Visit Site' : 'GitHub'}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Track modal open event
        trackEvent('project_modal_open', { project: project.title });
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Event listeners
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #718096; font-size: 14px;');