// VoiceBank Africa Presentation - Slide Navigation System

// Global variables
let currentSlide = 1;
let totalSlides = 10;
let isTransitioning = false;

// Initialize presentation
document.addEventListener('DOMContentLoaded', () => {
    showLoadingScreen();
    setTimeout(() => {
        hideLoadingScreen();
        initializeSlides();
        updateSlideCounter();
        setupKeyboardNavigation();
        setupTouchNavigation();
        startAutoAnimations();
    }, 2000);
});

// Initialize slides
function initializeSlides() {
    const slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

    // Set initial state
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        if (index === 0) {
            slide.classList.add('active');
        }
    });

    updateNavigationButtons();
}

// Navigation functions
function nextSlide() {
    if (isTransitioning || currentSlide >= totalSlides) return;

    isTransitioning = true;
    const currentSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const nextSlideEl = document.querySelector(`.slide[data-slide="${currentSlide + 1}"]`);

    if (currentSlideEl && nextSlideEl) {
        currentSlideEl.classList.remove('active');
        currentSlideEl.classList.add('prev');
        nextSlideEl.classList.add('active');

        currentSlide++;
        updateSlideCounter();
        updateNavigationButtons();

        setTimeout(() => {
            isTransitioning = false;
            triggerSlideAnimations(currentSlide);
        }, 500);
    }
}

function previousSlide() {
    if (isTransitioning || currentSlide <= 1) return;

    isTransitioning = true;
    const currentSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const prevSlideEl = document.querySelector(`.slide[data-slide="${currentSlide - 1}"]`);

    if (currentSlideEl && prevSlideEl) {
        currentSlideEl.classList.remove('active');
        prevSlideEl.classList.remove('prev');
        prevSlideEl.classList.add('active');

        currentSlide--;
        updateSlideCounter();
        updateNavigationButtons();

        setTimeout(() => {
            isTransitioning = false;
            triggerSlideAnimations(currentSlide);
        }, 500);
    }
}

function goToSlide(slideNumber) {
    if (isTransitioning || slideNumber < 1 || slideNumber > totalSlides || slideNumber === currentSlide) return;

    isTransitioning = true;
    const currentSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const targetSlideEl = document.querySelector(`.slide[data-slide="${slideNumber}"]`);

    if (currentSlideEl && targetSlideEl) {
        // Remove active class from current slide
        currentSlideEl.classList.remove('active');

        // Remove prev class from all slides
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('prev');
        });

        // Add prev class to slides before target
        for (let i = 1; i < slideNumber; i++) {
            const slide = document.querySelector(`.slide[data-slide="${i}"]`);
            if (slide) slide.classList.add('prev');
        }

        // Activate target slide
        targetSlideEl.classList.add('active');

        currentSlide = slideNumber;
        updateSlideCounter();
        updateNavigationButtons();

        setTimeout(() => {
            isTransitioning = false;
            triggerSlideAnimations(currentSlide);
        }, 500);
    }
}

// Update slide counter
function updateSlideCounter() {
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const slideCounter = document.querySelector('.slide-counter');

    if (currentSlideEl) currentSlideEl.textContent = currentSlide;
    if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;

    // Update progress indicator
    if (slideCounter) {
        const progress = (currentSlide / totalSlides) * 100;
        slideCounter.style.setProperty('--progress', progress);
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.disabled = currentSlide <= 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentSlide >= totalSlides;
    }
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
            case 'F11':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    });
}

// Touch navigation for mobile
function setupTouchNavigation() {
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide(); // Swipe left = next slide
            } else {
                previousSlide(); // Swipe right = previous slide
            }
        }

        startX = 0;
        startY = 0;
    });
}

// Fullscreen toggle
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Trigger slide-specific animations
function triggerSlideAnimations(slideNumber) {
    const slide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    if (!slide) return;

    // Animate counters for slides with statistics
    const statNumbers = slide.querySelectorAll('.stat-number, .impact-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        if (!isNaN(target)) {
            animateCounter(stat, target);
        }
    });

    // Start voice animation for demo slide
    if (slideNumber === 9) {
        startVoiceAnimation();
    }

    // Animate timeline phases for roadmap slide
    if (slideNumber === 8) {
        animateTimelinePhases();
    }
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.includes('%') ? '%' :
                   element.textContent.includes('+') ? '+' : '';

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }

    updateCounter();
}

// Voice animation for demo
function startVoiceAnimation() {
    const waveform = document.querySelector('.demo-waveform');
    if (waveform) {
        waveform.style.opacity = '1';
        const waveBars = waveform.querySelectorAll('.wave-bar');
        waveBars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Timeline animation for roadmap
function animateTimelinePhases() {
    const phases = document.querySelectorAll('.timeline-phase');
    phases.forEach((phase, index) => {
        setTimeout(() => {
            phase.style.opacity = '1';
            phase.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Demo functionality
function simulateCommand(type) {
    const demoStatus = document.getElementById('demoStatus');
    const demoResponse = document.getElementById('demoResponse');
    const demoBalance = document.getElementById('demoBalance');

    const commands = {
        balance: {
            command: 'Check my balance',
            response: 'Your balance is R1,250.50',
            result: 'R1,250.50'
        },
        transfer: {
            command: 'Send R100 to John',
            response: 'Transfer completed successfully',
            result: 'Transfer Complete ✓'
        },
        history: {
            command: 'Show recent transactions',
            response: 'Here are your recent transactions',
            result: `<div style="font-size: 0.9rem; text-align: left;">
                        <div>• Grocery Store - R150</div>
                        <div>• Fuel Station - R500</div>
                        <div>• Transfer from Mom - R200</div>
                     </div>`
        },
        help: {
            command: 'What can you do?',
            response: 'I can help with balance, transfers, history, and more',
            result: 'Available Commands: Balance, Transfer, History'
        }
    };

    const cmd = commands[type];
    if (!cmd) return;

    // Reset previous state
    if (demoResponse) demoResponse.textContent = '';
    if (demoBalance) demoBalance.innerHTML = '';

    // Show listening state
    if (demoStatus) demoStatus.textContent = 'Listening...';

    // Simulate voice input
    setTimeout(() => {
        if (demoStatus) demoStatus.textContent = `"${cmd.command}"`;

        // Show processing
        setTimeout(() => {
            if (demoStatus) demoStatus.textContent = 'Processing...';

            // Show response
            setTimeout(() => {
                if (demoStatus) demoStatus.textContent = 'Response:';
                if (demoResponse) demoResponse.textContent = cmd.response;
                if (demoBalance) demoBalance.innerHTML = cmd.result;

                // Reset after delay
                setTimeout(() => {
                    if (demoStatus) demoStatus.textContent = 'Ready to listen...';
                    if (demoResponse) demoResponse.textContent = '';
                    if (demoBalance) demoBalance.innerHTML = '';
                }, 4000);
            }, 1500);
        }, 1000);
    }, 1000);
}

// Auto-start animations
function startAutoAnimations() {
    // Start animations for the first slide
    setTimeout(() => {
        triggerSlideAnimations(1);
    }, 500);
}

// Initialize timeline phases as hidden for animation
function initializeTimelinePhases() {
    const phases = document.querySelectorAll('.timeline-phase');
    phases.forEach(phase => {
        phase.style.opacity = '0';
        phase.style.transform = 'translateX(-50px)';
        phase.style.transition = 'all 0.6s ease';
    });
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTimelinePhases();
});

// Add click effects to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.command-btn, .cta-btn, .nav-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
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
                background: rgba(255, 255, 255, 0.3);
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

// Presentation mode detection
function isPresentationMode() {
    return document.fullscreenElement !== null;
}

// Auto-advance slides (optional - can be enabled for demo mode)
let autoAdvanceInterval;

function startAutoAdvance(intervalMs = 10000) {
    stopAutoAdvance();
    autoAdvanceInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            stopAutoAdvance();
        }
    }, intervalMs);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
}

// Uncomment to enable auto-advance in presentation mode
// document.addEventListener('fullscreenchange', () => {
//     if (document.fullscreenElement) {
//         startAutoAdvance(15000); // 15 seconds per slide
//     } else {
//         stopAutoAdvance();
//     }
// });

// Professional Loading Screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'professional-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <svg viewBox="0 0 120 60" width="80" height="40">
                    <defs>
                        <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <path d="M25 15 C35 12, 45 15, 50 20 C55 25, 58 30, 55 35 C52 40, 48 42, 45 45 C40 48, 35 47, 30 45 C25 42, 22 38, 20 35 C18 30, 20 25, 22 20 C23 18, 24 16, 25 15 Z"
                          fill="url(#loaderGradient)" stroke="#000" stroke-width="1"/>
                    <g stroke="#D4AF37" stroke-width="2" fill="none" opacity="0.8">
                        <path d="M60 20 Q65 25, 60 30" class="loader-wave"/>
                        <path d="M65 18 Q72 25, 65 32" class="loader-wave"/>
                        <path d="M70 16 Q79 25, 70 34" class="loader-wave"/>
                    </g>
                    <circle cx="37" cy="30" r="3" fill="#000"/>
                    <rect x="35" y="33" width="4" height="6" fill="#000"/>
                </svg>
            </div>
            <h2 class="loader-title">VoiceBank Africa</h2>
            <p class="loader-subtitle">Preparing your presentation...</p>
            <div class="loader-progress">
                <div class="progress-bar"></div>
            </div>
        </div>
    `;

    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        #professional-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: 'Inter', sans-serif;
        }

        .loader-content {
            text-align: center;
            animation: fadeInUp 1s ease-out;
        }

        .loader-logo {
            margin-bottom: 30px;
            animation: pulse 2s ease-in-out infinite;
        }

        .loader-wave {
            animation: loaderWave 1.5s ease-in-out infinite;
        }

        .loader-title {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
        }

        .loader-subtitle {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 40px;
            font-weight: 400;
        }

        .loader-progress {
            width: 300px;
            height: 4px;
            background: #E0E0E0;
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #D4AF37, #B8860B);
            border-radius: 2px;
            animation: loadProgress 2s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes loaderWave {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
        }

        @keyframes loadProgress {
            from { width: 0%; }
            to { width: 100%; }
        }
    `;

    document.head.appendChild(loaderStyles);
    document.body.appendChild(loader);
}

function hideLoadingScreen() {
    const loader = document.getElementById('professional-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
}
