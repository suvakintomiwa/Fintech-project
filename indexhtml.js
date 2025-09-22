     // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuButton = document.querySelector('button.md\\:hidden');
        const navigation = document.querySelector('nav .hidden.md\\:flex');
        
        if (mobileMenuButton && navigation) {
            mobileMenuButton.addEventListener('click', function() {
                navigation.classList.toggle('hidden');
                navigation.classList.toggle('flex');
                navigation.classList.toggle('flex-col');
                navigation.classList.toggle('absolute');
                navigation.classList.toggle('top-full');
                navigation.classList.toggle('left-0');
                navigation.classList.toggle('right-0');
                navigation.classList.toggle('bg-medium-purple');
                navigation.classList.toggle('p-4');
                navigation.classList.toggle('space-y-4');
            });
        }

        // Demo functionality
        function showDemo() {
            alert('🎬 Demo coming soon! Our team is preparing an amazing walkthrough of Molada Pay features. Stay tuned!');
        }

        // Contact sales functionality
        function contactSales() {
            const email = 'sales@moladapay.com';
            const subject = 'Sales Inquiry - Molada Pay';
            const body = 'Hi Molada Pay team,\n\nI\'m interested in learning more about your payment platform for my business.\n\nPlease contact me to discuss:\n- Pricing options\n- Integration requirements\n- Custom solutions\n\nThank you!';
            
            // Try to open email client
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }

        // Create account functionality for mobile
        function createAccount() {
            window.location.href = 'signup.html';
        }

        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all feature cards and sections
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.card-hover, section');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });