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

    // Initialize counter
    updateCounter();
}); 