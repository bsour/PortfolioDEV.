document.addEventListener('DOMContentLoaded', () => {
    // Projects Counter
    const countdownElement = document.getElementById('countdown');
    const targetProjects = 42;
    let currentCount = 0;
    let countInterval;

    const updateCounter = () => {
        countdownElement.textContent = currentCount;
    };

    const animateCounter = () => {
        if (countInterval) return;

        countInterval = setInterval(() => {
            if (currentCount < targetProjects) {
                currentCount++;
                updateCounter();
            } else {
                clearInterval(countInterval);
                countInterval = null;
            }
        }, 50);
    };

    const playButton = document.querySelector('.play-button');
    playButton.addEventListener('click', animateCounter);

    // Interactive Elements
    const mainTitle = document.querySelector('.main-title');
    mainTitle.querySelectorAll('span').forEach(span => {
        span.addEventListener('mouseover', () => {
            span.style.transform = 'translateX(1rem)';
        });
        span.addEventListener('mouseout', () => {
            span.style.transform = 'translateX(0)';
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            root.style.setProperty('--color-space-dark', '#0A0A0B');
            root.style.setProperty('--color-space-light', '#FFFFFF');
        } else {
            root.style.setProperty('--color-space-dark', '#FFFFFF');
            root.style.setProperty('--color-space-light', '#0A0A0B');
        }
        document.body.style.backgroundColor = isDark ? '#0A0A0B' : '#FFFFFF';
        document.body.style.color = isDark ? '#FFFFFF' : '#0A0A0B';
    });

    // Mobile Menu
    const menuButton = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav-container');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
    });

    // Smooth Scroll for Contact Button
    const contactButton = document.querySelector('.contact-button');
    contactButton.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });

    // Holographic Effect Enhancement
    const developerImage = document.querySelector('.astronaut-image');
    developerImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = developerImage.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        developerImage.style.setProperty('--x', `${x * 100}%`);
        developerImage.style.setProperty('--y', `${y * 100}%`);
    });

    // Enhanced Project Cards Animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate code lines
                const codeLines = entry.target.querySelectorAll('.code-line');
                codeLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, index * 200);
                });

                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        projectObserver.observe(card);

        // Enhanced hover effect
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            // Tilt effect
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;

            // Dynamic shadow
            card.style.boxShadow = `
                ${-tiltY}px ${-tiltX}px 20px rgba(124, 255, 208, 0.1),
                0 10px 30px rgba(0, 0, 0, 0.1)
            `;

            // Holographic shine effect
            const shine = card.querySelector('.project-content');
            if (shine) {
                shine.style.background = `
                    radial-gradient(
                        circle at ${x * 100}% ${y * 100}%,
                        rgba(124, 255, 208, 0.1) 0%,
                        rgba(124, 255, 208, 0) 50%
                    )
                `;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
            
            const shine = card.querySelector('.project-content');
            if (shine) {
                shine.style.background = 'none';
            }
        });
    });

    // Enhanced Skill Bars Animation
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target;
                const targetWidth = level.style.width;
                
                // Reset width for animation
                level.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    level.style.width = targetWidth;
                    level.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)';
                    
                    // Add shimmer effect
                    level.classList.add('animate-shimmer');
                }, 100);

                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillLevels.forEach(skill => {
        skillObserver.observe(skill);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Add floating label effect
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;

            // Simulate sending
            submitButton.innerHTML = '<i class="ri-loader-4-line"></i> SENDING...';
            submitButton.disabled = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success state
                submitButton.innerHTML = '<i class="ri-check-line"></i> SENT!';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            } catch (error) {
                // Error state
                submitButton.innerHTML = '<i class="ri-error-warning-line"></i> FAILED';
                submitButton.style.backgroundColor = '#f44336';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }
        });
    }

    // Initialize counter
    updateCounter();
}); 