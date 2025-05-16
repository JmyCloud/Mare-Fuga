// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    
    // Check for saved theme preference or use preferred color scheme
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the current theme
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Create fade overlay for theme transition
    const fadeOverlay = document.createElement('div');
    fadeOverlay.classList.add('theme-transition-overlay');
    document.body.appendChild(fadeOverlay);
    
    // Add necessary styles for the overlay
    const style = document.createElement('style');
    style.textContent = `
        .theme-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 119, 182, 0.15);
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-out;
        }
        
        .theme-transition-overlay.active {
            opacity: 1;
        }
        
        body {
            transition: background-color 0.3s ease-out, color 0.3s ease-out;
        }
        
        body * {
            transition: background-color 0.3s ease-out, color 0.3s ease-out, border-color 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced function to toggle theme with faster fade effect
    function toggleTheme() {
        // Activate fade overlay
        fadeOverlay.classList.add('active');
        
        setTimeout(() => {
            let isDark = document.documentElement.classList.contains('dark');
            let newTheme = isDark ? 'light' : 'dark';
            
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
                // No need to replace icons since we're using CSS transitions in our design
            } else {
                document.documentElement.classList.remove('dark');
                // No need to replace icons since we're using CSS transitions in our design
            }
            
            localStorage.setItem('theme', newTheme);
            
            // Remove the overlay after theme change is complete
            setTimeout(() => {
                fadeOverlay.classList.remove('active');
            }, 200);
        }, 100); // Shorter delay before actual theme change
    }
    
    // Toggle theme when desktop button is clicked
    themeToggle.addEventListener('click', toggleTheme);
    
    // Toggle theme when mobile button is clicked
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show back to top button when user scrolls down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = "1";
            backToTopButton.style.transform = "translateY(0)";
        } else {
            backToTopButton.style.opacity = "0.5";
            backToTopButton.style.transform = "translateY(10px)";
        }
    });
    
    // Initialize back to top button with reduced opacity when page loads
    backToTopButton.style.opacity = "0.5";
    backToTopButton.style.transform = "translateY(10px)";
    
    // Scroll to top when back to top button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Enhanced Mobile Menu Toggle with Animation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        // Apply animation class before toggling hidden
        if (mobileMenu.classList.contains('hidden')) {
            // If menu is currently hidden and about to be shown
            mobileMenu.style.display = 'block'; // Ensure it's visible for animation
            // Short delay to allow display:block to take effect
            setTimeout(() => {
                mobileMenu.classList.remove('hidden');
            }, 10);
        } else {
            // If menu is currently visible and about to be hidden
            mobileMenu.classList.add('hidden');
            // Wait for animation to complete before actually hiding
            setTimeout(() => {
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.style.display = '';
                }
            }, 500); // Match with CSS transition duration
        }
        
        // Update aria-expanded attribute for accessibility
        const isExpanded = !mobileMenu.classList.contains('hidden');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scrolling when menu is open
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking outside with animation
    document.addEventListener('click', function(event) {
        if (!mobileMenu.classList.contains('hidden') && 
            !mobileMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            // Add hidden class for animation
            mobileMenu.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
            
            // Wait for animation to complete before actually hiding
            setTimeout(() => {
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.style.display = '';
                }
            }, 500); // Match with CSS transition duration
        }
    });
    
    // Close mobile menu when a link is clicked with animation
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            // Add hidden class for animation
            mobileMenu.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
            
            // Wait for animation to complete before actually hiding
            setTimeout(() => {
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.style.display = '';
                }
            }, 500); // Match with CSS transition duration
        }
    });
    
    // Add scrolled class to header when scrolled
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Navigation functionality
    // Set document language to English
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if link is just #
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
