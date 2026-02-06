// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('February 19, 2026 10:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.querySelector('.countdown-container').innerHTML = '<h2 class="event-live">🔥 EVENT IS LIVE! 🔥</h2>';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth scroll behavior
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
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

// Observe all cards
document.querySelectorAll('.event-card, .info-card, .detail-card, .registration-card, .coordinator-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add ripple effect to buttons
document.querySelectorAll('.register-btn, .social-icons a').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .event-live {
        font-size: 3rem;
        color: #ff006e;
        text-align: center;
        animation: pulse 1.5s infinite;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add particle effect on mouse move (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = e.pageX + 'px';
    particle.style.top = e.pageY + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
});

// Add particle CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particle {
        position: absolute;
        width: 5px;
        height: 5px;
        background: rgba(0, 217, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particle-fade 1s ease-out;
        z-index: 9999;
    }
    
    @keyframes particle-fade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Console Easter Egg
console.log('%c🚀 TECHNOTSAV 2K26 🚀', 'font-size: 30px; color: #00d9ff; font-weight: bold;');
console.log('%cLet the Tech Take Over! 🔥', 'font-size: 20px; color: #ffbe0b;');
console.log('%cOrganized by TechSphere Club ✨', 'font-size: 16px; color: #ff006e;');
console.log('%c\nInterested in the code? Join us at the event!', 'font-size: 14px; color: #b8c1ec;');

// Registration button click handler (when registration link is available)
const registerBtn = document.getElementById('registerBtn');
if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your registration link here
        alert('Registration will open soon! Stay tuned! 🚀');
        // window.location.href = 'YOUR_REGISTRATION_LINK_HERE';
    });
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Add active class on load
document.body.classList.add('loaded');

// Floating Robots/AI Bots Animation
function createFloatingBots() {
    const botsContainer = document.getElementById('floatingBots');
    const botIcons = ['🤖', '🦾', '🛸', '👾', '🚀'];
    
    botIcons.forEach((icon, index) => {
        const bot = document.createElement('div');
        bot.className = `floating-bot bot-${index + 1}`;
        bot.textContent = icon;
        bot.style.left = Math.random() * 100 + '%';
        bot.style.top = Math.random() * 100 + '%';
        botsContainer.appendChild(bot);
    });
    
    // Add extra random bots
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const bot = document.createElement('div');
            const randomIcon = botIcons[Math.floor(Math.random() * botIcons.length)];
            const randomClass = `bot-${Math.floor(Math.random() * 5) + 1}`;
            bot.className = `floating-bot ${randomClass}`;
            bot.textContent = randomIcon;
            bot.style.left = Math.random() * 100 + '%';
            bot.style.top = Math.random() * 100 + '%';
            bot.style.animationDelay = Math.random() * 5 + 's';
            botsContainer.appendChild(bot);
        }, i * 3000);
    }
}

// Initialize floating bots
createFloatingBots();

// Add interaction - bots react to mouse
document.addEventListener('mousemove', (e) => {
    const bots = document.querySelectorAll('.floating-bot');
    bots.forEach(bot => {
        const rect = bot.getBoundingClientRect();
        const botX = rect.left + rect.width / 2;
        const botY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distance = Math.sqrt(Math.pow(mouseX - botX, 2) + Math.pow(mouseY - botY, 2));
        
        if (distance < 150) {
            const angle = Math.atan2(mouseY - botY, mouseX - botX);
            const pushX = Math.cos(angle + Math.PI) * 20;
            const pushY = Math.sin(angle + Math.PI) * 20;
            bot.style.transform = `translate(${pushX}px, ${pushY}px) scale(1.2) rotate(${angle * 180 / Math.PI}deg)`;
        } else {
            bot.style.transform = '';
        }
    });
});
