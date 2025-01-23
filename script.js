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

    // Enhanced Navigation
    const nav = document.querySelector('.nav-container');
    const menuButton = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Handle mobile menu
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('menu-open');
            mobileMenu.classList.remove('active');
        });
    });

    // Handle scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
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

    // Smooth Scroll for Contact Button
    const contactButton = document.querySelector('.contact-button');
    contactButton.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });

    // Holographic Effect Enhancement
    const developerEmoji = document.querySelector('.developer-emoji');
    if (developerEmoji) {
        developerEmoji.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = developerEmoji.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            developerEmoji.style.setProperty('--x', `${x * 100}%`);
            developerEmoji.style.setProperty('--y', `${y * 100}%`);
        });
    }

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

    // Download Button Animation
    const downloadButton = document.querySelector('.download-button');
    
    function createParticles() {
        const particles = 12;
        const colors = ['#7CFFD0', '#FFFFFF'];
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            
            // Random particle styling - increased size for more visibility
            const size = Math.random() * 8 + 4; // Increased from 4+2 to 8+4
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Random particle animation - increased distance
            const angle = (i / particles) * 360;
            const distance = Math.random() * 80 + 60; // Increased from 60+40 to 80+60
            const tx = Math.cos(angle * Math.PI / 180) * distance;
            const ty = Math.sin(angle * Math.PI / 180) * distance;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            downloadButton.appendChild(particle);
            
            // Animate and remove particle - increased duration
            requestAnimationFrame(() => {
                particle.style.animation = 'particleAnimation 1s ease-out forwards'; // Increased from 0.7s to 1s
                setTimeout(() => particle.remove(), 1000);
            });
        }
    }

    async function startDownload() {
        // Return a promise that resolves after both the animation and download are complete
        return new Promise(async (resolve) => {
            // Wait for 2 seconds for the loader animation
            await new Promise(r => setTimeout(r, 2000));
            
            try {
                const response = await fetch('/Sourabh-Beniwal-Software Engineer Full Stack copy.pdf');
                if (!response.ok) throw new Error('Download failed');
                
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'Sourabh-Beniwal-Resume.pdf';
                
                document.body.appendChild(a);
                a.click();
                
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                
                resolve(true);
            } catch (error) {
                console.error('Download error:', error);
                resolve(false);
            }
        });
    }

    if (downloadButton) {
        downloadButton.addEventListener('click', async () => {
            if (downloadButton.classList.contains('downloading')) return;
            
            downloadButton.classList.add('downloading');
            
            try {
                const success = await startDownload();
                
                downloadButton.classList.remove('downloading');
                if (success) {
                    downloadButton.classList.add('success');
                    createParticles();
                    setTimeout(() => {
                        downloadButton.classList.remove('success');
                    }, 2000);
                } else {
                    downloadButton.classList.add('error');
                    setTimeout(() => {
                        downloadButton.classList.remove('error');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error:', error);
                downloadButton.classList.remove('downloading');
                downloadButton.classList.add('error');
                setTimeout(() => {
                    downloadButton.classList.remove('error');
                }, 2000);
            }
        });
    }

    // Enhanced Testimonial Cards with Infinite Scroll
    const testimonialColumns = document.querySelectorAll('.testimonial-column');

    testimonialColumns.forEach(column => {
        // Clone testimonials for infinite scroll
        const originalCards = column.innerHTML;
        column.innerHTML = originalCards + originalCards;

        column.addEventListener('mouseover', () => {
            column.style.animationPlayState = 'paused';
        });

        column.addEventListener('mouseout', () => {
            column.style.animationPlayState = 'running';
        });
    });

    // Enhanced card interaction
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            // Calculate rotation values
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;

            // Apply transform
            card.style.transform = `
                perspective(1000px) 
                rotateX(${tiltX}deg) 
                rotateY(${tiltY}deg) 
                scale(1.1)
            `;

            // Add shine effect
            const shine = card.querySelector('.testimonial-content');
            if (shine) {
                shine.style.background = `
                    radial-gradient(
                        circle at ${x * 100}% ${y * 100}%,
                        rgba(124, 255, 208, 0.2) 0%,
                        rgba(124, 255, 208, 0.05) 50%
                    )
                `;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            const shine = card.querySelector('.testimonial-content');
            if (shine) {
                shine.style.background = 'rgba(124, 255, 208, 0.05)';
            }
        });
    });
}); 