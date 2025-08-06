// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
        }
    }
    
    updateCounter();
}

// Intersection Observer for counter animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe problem section for counter animation
document.addEventListener('DOMContentLoaded', () => {
    const problemSection = document.querySelector('.problem');
    if (problemSection) {
        observer.observe(problemSection);
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Voice animation control
function startVoiceAnimation() {
    const voiceWaves = document.querySelectorAll('.voice-wave');
    voiceWaves.forEach((wave, index) => {
        wave.style.animationDelay = `${index * 0.1}s`;
        wave.style.animationDuration = '1.5s';
    });
}

// Start voice animation when page loads
document.addEventListener('DOMContentLoaded', startVoiceAnimation);

// Add hover effects to cards
document.querySelectorAll('.feature-card, .point-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF6B35, #FFD700);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-icon">
                <i class="fas fa-microphone-alt"></i>
            </div>
            <div class="loader-text">Loading VoiceBank Africa...</div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FF6B35 0%, #2E8B57 50%, #FFD700 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        font-family: 'Inter', sans-serif;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loader-content {
            text-align: center;
        }
        .loader-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: pulse 1.5s ease-in-out infinite;
        }
        .loader-text {
            font-size: 1.2rem;
            font-weight: 500;
            margin-bottom: 30px;
        }
        .loader-bar {
            width: 300px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
        }
        .loader-progress {
            height: 100%;
            background: white;
            border-radius: 2px;
            animation: loading 2s ease-in-out;
        }
        @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(loader);
            document.head.removeChild(style);
        }, 500);
    }, 2000);
}

// Show loading animation on page load
window.addEventListener('load', showLoadingAnimation);

// Add click effects to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .print-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        konamiCode = [];
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Demo functionality
function simulateCommand(type, command, response) {
    const demoStatus = document.getElementById('demoStatus');
    const demoWaveform = document.getElementById('demoWaveform');
    const demoResponse = document.getElementById('demoResponse');
    const demoBalance = document.getElementById('demoBalance');

    // Reset previous state
    demoResponse.textContent = '';
    demoBalance.textContent = '';

    // Show listening state
    demoStatus.textContent = 'Listening...';
    demoWaveform.style.opacity = '1';

    // Simulate voice input
    setTimeout(() => {
        demoStatus.textContent = `"${command}"`;
        demoWaveform.style.opacity = '0.5';

        // Show processing
        setTimeout(() => {
            demoStatus.textContent = 'Processing...';

            // Show response
            setTimeout(() => {
                demoStatus.textContent = 'Response:';
                demoResponse.textContent = response;

                // Show specific data based on command type
                if (type === 'balance') {
                    demoBalance.textContent = 'R1,250.50';
                } else if (type === 'transfer') {
                    demoBalance.textContent = 'Transfer Complete ✓';
                } else if (type === 'history') {
                    demoBalance.innerHTML = `
                        <div style="font-size: 0.9rem; text-align: left;">
                            <div>• Grocery Store - R150</div>
                            <div>• Fuel Station - R500</div>
                            <div>• Transfer from Mom - R200</div>
                        </div>
                    `;
                }

                // Reset after delay
                setTimeout(() => {
                    demoStatus.textContent = 'Ready to listen...';
                    demoResponse.textContent = '';
                    demoBalance.textContent = '';
                    demoWaveform.style.opacity = '1';
                }, 4000);
            }, 1500);
        }, 1000);
    }, 1000);
}

// User journey step animation
function animateJourneySteps() {
    const steps = document.querySelectorAll('.step-item');
    let currentStep = 0;

    function showNextStep() {
        // Remove active class from all steps
        steps.forEach(step => step.classList.remove('active'));

        // Add active class to current step
        if (steps[currentStep]) {
            steps[currentStep].classList.add('active');
        }

        // Move to next step
        currentStep = (currentStep + 1) % steps.length;
    }

    // Start animation
    showNextStep();
    setInterval(showNextStep, 3000);
}

// Initialize journey animation when section is visible
const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateJourneySteps();
            journeyObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const journeySection = document.querySelector('.journey');
    if (journeySection) {
        journeyObserver.observe(journeySection);
    }
});

// Language selector functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            const langNames = {
                'en': 'English',
                'zu': 'isiZulu',
                'xh': 'isiXhosa',
                'af': 'Afrikaans',
                'st': 'Sesotho',
                'tn': 'Setswana',
                'ss': 'siSwati',
                've': 'Tshivenda',
                'ts': 'Xitsonga',
                'nr': 'isiNdebele',
                'nso': 'Sepedi'
            };

            // Update demo interface to show selected language
            const demoStatus = document.getElementById('demoStatus');
            if (demoStatus) {
                demoStatus.textContent = `Ready to listen in ${langNames[selectedLang]}...`;
            }
        });
    }
});

// Impact section animations
function animateImpactNumbers() {
    const impactNumbers = document.querySelectorAll('.impact-number');
    impactNumbers.forEach(number => {
        const text = number.textContent;
        const target = parseInt(text.replace(/[^\d]/g, ''));
        if (!isNaN(target)) {
            animateCounter(number, target, 2000);
        }
    });
}

// Observe impact section
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateImpactNumbers();
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
});

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize timeline items as hidden
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
    });
});

// Observe roadmap section
const roadmapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTimeline();
            roadmapObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const roadmapSection = document.querySelector('.roadmap');
    if (roadmapSection) {
        roadmapObserver.observe(roadmapSection);
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Add mobile menu styles if not already added
            if (!document.querySelector('#mobile-menu-styles')) {
                const mobileStyles = document.createElement('style');
                mobileStyles.id = 'mobile-menu-styles';
                mobileStyles.textContent = `
                    @media (max-width: 768px) {
                        .nav-menu.active {
                            display: flex;
                            position: fixed;
                            top: 70px;
                            left: 0;
                            width: 100%;
                            height: calc(100vh - 70px);
                            background: rgba(255, 255, 255, 0.98);
                            backdrop-filter: blur(10px);
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: center;
                            padding-top: 50px;
                            z-index: 999;
                        }

                        .nav-menu.active .nav-link {
                            font-size: 1.2rem;
                            margin: 15px 0;
                        }

                        .hamburger.active span:nth-child(1) {
                            transform: rotate(-45deg) translate(-5px, 6px);
                        }

                        .hamburger.active span:nth-child(2) {
                            opacity: 0;
                        }

                        .hamburger.active span:nth-child(3) {
                            transform: rotate(45deg) translate(-5px, -6px);
                        }
                    }
                `;
                document.head.appendChild(mobileStyles);
            }
        });
    }
});

// Smooth reveal animations for cards
function addCardRevealAnimations() {
    const cards = document.querySelectorAll('.feature-card, .point-card, .stat-card, .team-member, .tech-item');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
}

// Initialize card animations
document.addEventListener('DOMContentLoaded', addCardRevealAnimations);

// Add floating animation to hero elements
function addFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-icon');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animationDuration = `${6 + index}s`;
    });
}

document.addEventListener('DOMContentLoaded', addFloatingAnimations);

// Performance optimization: Lazy load animations
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');

        const reducedMotionStyles = document.createElement('style');
        reducedMotionStyles.textContent = `
            .reduced-motion * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(reducedMotionStyles);
    }
}

document.addEventListener('DOMContentLoaded', optimizeAnimations);
