// Scroll Animation System
// Uses Intersection Observer for performance-optimized scroll animations

document.addEventListener('DOMContentLoaded', function () {
    // Configuration
    const config = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in view
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the animation class from data attribute
                const animationClass = entry.target.dataset.animation || 'fade-in-up';
                const delay = entry.target.dataset.delay || '0';

                // Remove hidden class and add animation class
                entry.target.classList.remove('scroll-hidden');
                entry.target.classList.add(animationClass);

                // Apply delay if specified
                if (delay !== '0') {
                    entry.target.style.animationDelay = delay + 's';
                }

                // Stop observing this element after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, config);

    // Observe all elements with scroll-hidden class
    const animatedElements = document.querySelectorAll('.scroll-hidden');
    animatedElements.forEach(el => observer.observe(el));

    // Auto-add scroll animations to common elements if they don't have them
    const autoElements = document.querySelectorAll('h1, h2, h3, .card, .btn, .serve-card, .methodology-card, .value-card, p');
    autoElements.forEach((el, index) => {
        // Skip if already has animation class or is in nav/footer
        if (el.classList.contains('scroll-hidden') ||
            el.closest('nav') ||
            el.closest('footer') ||
            el.closest('.impact-marquee-container')) {
            return;
        }

        // Determine animation type based on element
        let animationType = 'fade-in-up';
        if (el.tagName === 'H1' || el.tagName === 'H2') {
            animationType = 'fade-in-up';
        } else if (el.classList.contains('card') || el.classList.contains('serve-card')) {
            animationType = 'scale-in';
        } else if (el.classList.contains('btn')) {
            animationType = 'scale-in';
        }

        // Add animation classes
        el.classList.add('scroll-hidden');
        el.dataset.animation = animationType;

        // Observe the element
        observer.observe(el);
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card, .serve-card, .methodology-card, .value-card, .support-card, .community-card');
    cards.forEach(card => {
        card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn, .serve-btn');
    buttons.forEach(btn => {
        btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
