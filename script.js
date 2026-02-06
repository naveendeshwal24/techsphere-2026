// Redirect to Google Maps with exact location
function openGoogleMaps() {
    const latitude = 28.468936575748564;
    const longitude = 77.32582047549934;
    const locationName = 'MVN University, 74th KM Stone, NH-2 Delhi-Agra Highway, Aurangabad, Haryana 121105';
    
    // Create Google Maps URL with coordinates and location name
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&t=m`;
    
    // Open in new tab
    window.open(googleMapsUrl, '_blank');
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Event Location Button Handler
    const eventLocationBtn = document.getElementById('eventLocationBtn');
    if (eventLocationBtn) {
        eventLocationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openGoogleMaps();
        });
    }

    // Custom Cursor with Random Icons
    const cursorIcons = ['fa-star', 'fa-heart', 'fa-rocket', 'fa-fire', 'fa-code', 'fa-lightbulb', 'fa-gem', 'fa-crown', 'fa-bolt', 'fa-sparkles'];
    let customCursor = null;
    let lastIconChange = 0;
    const iconChangeInterval = 200; // Change icon every 200ms

    // Create custom cursor element
    customCursor = document.createElement('div');
    customCursor.id = 'custom-cursor';
    customCursor.innerHTML = '<i class="fas fa-star"></i>';
    document.body.appendChild(customCursor);

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    // Update cursor position and icon on mouse move
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = (e.clientX - 15) + 'px';
        customCursor.style.top = (e.clientY - 15) + 'px';

        const now = Date.now();
        if (now - lastIconChange > iconChangeInterval) {
            const randomIcon = cursorIcons[Math.floor(Math.random() * cursorIcons.length)];
            customCursor.innerHTML = `<i class="fas ${randomIcon}"></i>`;
            lastIconChange = now;
        }
    });

    // Show default cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        customCursor.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
    });

    // Hide custom cursor when entering the window
    document.addEventListener('mouseenter', () => {
        customCursor.style.display = 'block';
        document.documentElement.style.cursor = 'none';
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

// Brochure Data
const brochureData = {
    'gaming-arena': {
        title: 'Gaming Arena',
        icon: '🎮',
        category: 'Competition',
        date: '19 Feb 2026',
        time: '10:00 AM Onwards',
        description: 'Battle it out in the ultimate gaming competition and show your gaming prowess! Compete against fellow gamers in an exciting tournament with amazing prizes. Are you ready to prove you\'re the ultimate gaming champion?',
        venue: 'SOET Department, MVN University, Palwal',
        highlights: ['Trophy', 'Intense Battles', 'Team & Solo', 'Recognition'],
        details: 'Participants will compete in fast-paced gaming matches. Both team and solo categories are available. Winners will receive exciting prizes and certificates of recognition.'
    },
    'mvn-pitch-arena': {
        title: 'MVN Pitch Arena',
        icon: '💡',
        category: 'Innovation',
        date: '19 Feb 2026',
        time: '10:00 AM Onwards',
        description: 'Present your innovative ideas and pitch your projects to industry experts! Turn your vision into reality with expert feedback and mentorship. This is your chance to showcase your entrepreneurial spirit.',
        venue: 'SOET Department, MVN University, Palwal',
        highlights: ['Expert Judges', 'Funding Opportunity', 'Networking', 'Mentorship'],
        details: 'Startup ideas and project pitches are welcome. Get valuable feedback from industry professionals. Winners may receive funding opportunities and networking with investors.'
    },
    'ai-automation': {
        title: 'AI Automation Workflows',
        icon: '🤖',
        category: 'AI/ML',
        date: '19 Feb 2026',
        time: '10:00 AM Onwards',
        description: 'Dive into the world of AI and automation! Create intelligent workflows that solve real-world problems. Learn, build, and compete in this cutting-edge challenge.',
        venue: 'SOET Department, MVN University, Palwal',
        highlights: ['AI/ML Focus', 'Real-world Problems', 'Coding Challenge', 'Expert Guidance'],
        details: 'Participants will work with AI/ML models to create automation solutions. This is a hands-on workshop combined with a competition. All skill levels welcome.'
    },
    'iot-robotics': {
        title: 'IoT + Robotics Project',
        icon: '🔧',
        category: 'Hardware',
        date: '19 Feb 2026',
        time: '10:00 AM Onwards',
        description: 'Build smart IoT solutions and robotics projects! Showcase your hardware and software integration skills in this comprehensive challenge.',
        venue: 'SOET Department, MVN University, Palwal',
        highlights: ['Hardware Integration', 'DIY Projects', 'Innovation', 'Hands-on Learning'],
        details: 'Create your own IoT or robotics project. Bring your own hardware or use provided components. This is a showcase event where creativity meets technology.'
    },
    'hackathon': {
        title: 'Hackathon',
        icon: '💻',
        category: 'Coding',
        date: '19 Feb 2026',
        time: '10:00 AM Onwards',
        description: '24-hour coding marathon! Team up, code, and create innovative solutions. The ultimate test of your programming skills and creativity!',
        venue: 'SOET Department, MVN University, Palwal',
        highlights: ['24 Hours', 'Prizes', 'Team Event', 'Open Theme'],
        details: 'Non-stop coding for 24 hours. Teams of 2-4 members are welcome. Meals and refreshments provided. First, second, and third prizes awarded to winning teams.'
    }
};

// Modal Functions
function openBrochure(eventId) {
    const modal = document.getElementById('brochureModal');
    const container = document.getElementById('brochureContainer');
    const data = brochureData[eventId];

    if (!data) return;

    const highlights = data.highlights.map(h => `
        <div class="brochure-highlight">
            <i class="fas fa-star"></i>
            <p>${h}</p>
        </div>
    `).join('');

    const brochureHTML = `
        <div class="brochure-header">
            <div class="event-icon">${data.icon}</div>
            <h2>${data.title}</h2>
            <p>${data.category}</p>
        </div>

        <div class="brochure-details">
            <div class="brochure-detail-item">
                <div class="brochure-detail-label">📅 Date</div>
                <div class="brochure-detail-value">${data.date}</div>
            </div>
            <div class="brochure-detail-item">
                <div class="brochure-detail-label">⏰ Time</div>
                <div class="brochure-detail-value">${data.time}</div>
            </div>
        </div>

        <div class="brochure-description">
            ${data.description}
        </div>

        <div class="brochure-highlights">
            ${highlights}
        </div>

        <div class="brochure-venue">
            <h3><i class="fas fa-map-marker-alt"></i> Venue</h3>
            <p>${data.venue}</p>
        </div>

        <div class="brochure-description">
            <strong>About This Event:</strong><br>
            ${data.details}
        </div>

        <div class="brochure-actions">
            <button class="brochure-btn" onclick="alert('Registration opening soon! Stay tuned!')">
                <i class="fas fa-rocket"></i> Register Now
            </button>
            <button class="brochure-btn brochure-btn-secondary" onclick="window.print()">
                <i class="fas fa-download"></i> Download PDF
            </button>
        </div>

        <div class="brochure-social-section">
            <h3>Connect With Us</h3>
            <div class="brochure-social-links">
                <a href="https://www.instagram.com/mvn.techsphere?igsh=cDZucnYwOHJ5Y29w" target="_blank" class="social-link instagram-link" title="Follow on Instagram">
                    <i class="fab fa-instagram"></i>
                    <span>Instagram</span>
                </a>
                <a href="https://www.youtube.com" target="_blank" class="social-link youtube-link" title="Subscribe on YouTube">
                    <i class="fab fa-youtube"></i>
                    <span>YouTube</span>
                </a>
                <a href="mailto:techsphere@mvn.edu.in" class="social-link mail-link" title="Send us an Email">
                    <i class="fas fa-envelope"></i>
                    <span>Email</span>
                </a>
            </div>
        </div>
    `;

    container.innerHTML = brochureHTML;
    modal.classList.add('active');
}

function closeBrochure() {
    const modal = document.getElementById('brochureModal');
    modal.classList.remove('active');
}

// Modal close button event listener
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('brochureModal');
    const closeBtn = document.querySelector('.modal-close');

    closeBtn.addEventListener('click', closeBrochure);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBrochure();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBrochure();
        }
    });

    // Add click functionality to event cards view details buttons
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        const brochurePlaceholder = card.querySelector('.event-brochure-placeholder');
        if (brochurePlaceholder) {
            brochurePlaceholder.addEventListener('click', (e) => {
                e.preventDefault();
                const eventId = brochurePlaceholder.getAttribute('onclick').match(/'([^']+)'/)[1];
                openBrochure(eventId);
            });
        }
    });
});

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
