document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contact-form');
    
    // 1. Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // 2. Active Section Highlighting & Dynamic Navbar Styling
    // We want the navigation bar to adapt to the dark/light background of sections
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -60% 0px', // Trigger when section occupies the top portion of viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Highlight active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });

                // Update Header Visual Theme (Dark/Light)
                // Sections with dark backgrounds: hero, contact
                // Sections with light backgrounds: about, why-us, services, process, tech
                if (activeId === 'hero' || activeId === 'contact') {
                    header.classList.remove('nav-light');
                    header.classList.add('nav-dark');
                } else {
                    header.classList.remove('nav-dark');
                    header.classList.add('nav-light');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Header Scroll Effect (Scrolled Class)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Contact Form Handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            // Simple Validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, Message).');
                return;
            }
            
            // Premium Submission Success feedback
            const formPanel = document.querySelector('.contact-form-panel');
            const originalHTML = formPanel.innerHTML;
            
            // Show custom success message
            formPanel.style.opacity = '0';
            setTimeout(() => {
                formPanel.innerHTML = `
                    <div style="text-align: center; padding: 40px 10px; animation: fadeIn 0.6s ease forwards;">
                        <div style="width: 80px; height: 80px; background-color: var(--primary-cyan-light); border: 2px solid var(--primary-cyan); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
                            <i class="fa-solid fa-circle-check" style="font-size: 2.5rem; color: var(--primary-cyan);"></i>
                        </div>
                        <h3 style="margin-bottom: 12px; font-size: 1.8rem; font-weight: 800; color: var(--text-white);">Thank You, ${name}!</h3>
                        <p style="color: var(--text-muted-light); font-size: 1rem; line-height: 1.6; margin-bottom: 30px;">Your message has been received. Our team will contact you at <strong>${email}</strong> or <strong>${phone || 'your phone number'}</strong> shortly.</p>
                        <button id="form-reset-btn" class="btn btn-primary" style="margin-top: 10px; width: auto; padding: 12px 28px;">Send Another Message</button>
                    </div>
                `;
                formPanel.style.opacity = '1';
                
                // Add listener to reset button
                document.getElementById('form-reset-btn').addEventListener('click', () => {
                    formPanel.style.opacity = '0';
                    setTimeout(() => {
                        formPanel.innerHTML = originalHTML;
                        formPanel.style.opacity = '1';
                        // Re-bind submit listener
                        bindSubmitListener();
                    }, 300);
                });
            }, 300);
        });
    }

    function bindSubmitListener() {
        // Simple function to re-bind form submit if user resets form
        const newForm = document.getElementById('contact-form');
        if (newForm) {
            newForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('form-name').value.trim();
                const email = document.getElementById('form-email').value.trim();
                const phone = document.getElementById('form-phone').value.trim();
                const formPanel = document.querySelector('.contact-form-panel');
                
                formPanel.style.opacity = '0';
                setTimeout(() => {
                    formPanel.innerHTML = `
                        <div style="text-align: center; padding: 40px 10px;">
                            <div style="width: 80px; height: 80px; background-color: var(--primary-cyan-light); border: 2px solid var(--primary-cyan); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
                                <i class="fa-solid fa-circle-check" style="font-size: 2.5rem; color: var(--primary-cyan);"></i>
                            </div>
                            <h3 style="margin-bottom: 12px; font-size: 1.8rem; font-weight: 800; color: var(--text-white);">Thank You, ${name}!</h3>
                            <p style="color: var(--text-muted-light); font-size: 1rem; line-height: 1.6; margin-bottom: 30px;">Your message has been received. Our team will contact you at <strong>${email}</strong> or <strong>${phone || 'your phone number'}</strong> shortly.</p>
                            <button id="form-reset-btn" class="btn btn-primary" style="margin-top: 10px; width: auto; padding: 12px 28px;">Send Another Message</button>
                        </div>
                    `;
                    formPanel.style.opacity = '1';
                    
                    document.getElementById('form-reset-btn').addEventListener('click', () => {
                        formPanel.style.opacity = '0';
                        setTimeout(() => {
                            location.reload(); // Simple reload on second reset
                        }, 300);
                    });
                }, 300);
            });
        }
    }
});
