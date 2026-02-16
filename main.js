/* ==========================================
   DEVI PRASAD PASUPULETI — PORTFOLIO WEBSITE
   Main JavaScript - Animations & Interactivity
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== PRELOADER ====================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 800);
    });
    // Fallback: hide preloader after 3s max
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 3000);

    // ==================== CUSTOM CURSOR ====================
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Check if touch device
    const isTouchDevice = ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);

    if (!isTouchDevice && cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.left = mouseX - 4 + 'px';
            cursor.style.top = mouseY - 4 + 'px';
            follower.style.left = cursorX + 'px';
            follower.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const interactiveEls = document.querySelectorAll('a, button, .tool-card, .about-card, .glass-card, input, textarea');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
        });
    } else {
        // Hide cursor on touch devices
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
    }

    // ==================== NAVIGATION ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // ==================== TYPING EFFECT ====================
    const typingElement = document.getElementById('typingText');
    const roles = [
        'UI/UX Designer',
        'Graphic Designer',
        'Video Editor',
        'Visual Storyteller',
        'Creative Thinker'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 1200);

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    const revealElements = document.querySelectorAll('.animate-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Don't unobserve — keep the effect
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==================== SKILL BARS ANIMATION ====================
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const toolLevels = document.querySelectorAll('.tool-level-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                if (fill.classList.contains('skill-bar-fill')) {
                    const width = fill.getAttribute('data-width');
                    fill.style.setProperty('--fill-width', width + '%');
                    fill.classList.add('animate');
                } else {
                    fill.classList.add('animate');
                }
                skillObserver.unobserve(fill);
            }
        });
    }, {
        threshold: 0.3
    });

    skillBars.forEach(bar => skillObserver.observe(bar));
    toolLevels.forEach(level => skillObserver.observe(level));

    // ==================== COUNTER ANIMATION ====================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, 0, target, 1500);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ==================== PARTICLE CANVAS ====================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? '0, 212, 255' : '124, 58, 237';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            const maxDist = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * 0.15;
                        ctx.globalAlpha = opacity;
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animationId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Pause animation when hero is not visible
        const heroSection = document.getElementById('hero');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) animateParticles();
                } else {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        }, { threshold: 0.1 });

        heroObserver.observe(heroSection);
    }

    // ==================== BACK TO TOP ====================
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
                formStatus.style.display = 'block';

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // ==================== HERO IMAGE FALLBACK ====================
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        heroImage.addEventListener('error', function () {
            // Create SVG avatar fallback
            this.style.display = 'none';
            const wrapper = this.parentElement;
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: calc(100% - 10px);
                height: calc(100% - 10px);
                border-radius: 50%;
                background: linear-gradient(135deg, #0f0f2a, #141432);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Outfit', sans-serif;
                font-size: 5rem;
                font-weight: 900;
                background-clip: text;
                -webkit-background-clip: text;
                position: relative;
            `;
            const initials = document.createElement('span');
            initials.textContent = 'DP';
            initials.style.cssText = `
                background: linear-gradient(135deg, #00d4ff, #a855f7, #00d4ff);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: gradientShift 3s linear infinite;
                font-size: 5rem;
                font-weight: 900;
                font-family: 'Outfit', sans-serif;
            `;
            fallback.appendChild(initials);
            wrapper.appendChild(fallback);
        });

        // Trigger error check
        if (!heroImage.complete || heroImage.naturalWidth === 0) {
            heroImage.dispatchEvent(new Event('error'));
        }
    }

    // ==================== PARALLAX EFFECT ====================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    // ==================== TILT EFFECT ON CARDS ====================
    if (!isTouchDevice) {
        const tiltCards = document.querySelectorAll('.about-card, .cert-card, .tool-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ==================== MAGNETIC BUTTONS ====================
    if (!isTouchDevice) {
        const magneticBtns = document.querySelectorAll('.btn');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==================== PERFORMANCE: Use requestAnimationFrame for scroll handlers ====================
    let ticking = false;
    const scrollHandlers = [handleNavScroll, highlightNav, handleBackToTop];

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                scrollHandlers.forEach(fn => fn());
                ticking = false;
            });
            ticking = true;
        }
    }

    // Override individual scroll listeners with optimized one
    window.removeEventListener('scroll', handleNavScroll);
    window.removeEventListener('scroll', highlightNav);
    window.removeEventListener('scroll', handleBackToTop);
    window.addEventListener('scroll', onScroll, { passive: true });

    // ==================== LIGHTBOX MODAL ====================
    const lightboxImages = [
        { src: 'assets/GK-Fram/Artboard 1.png', title: 'Homepage' },
        { src: 'assets/GK-Fram/Artboard 2.png', title: 'Full Website Scroll' },
        { src: 'assets/GK-Fram/Artboard 3.png', title: 'About Us' },
        { src: 'assets/GK-Fram/Artboard 4.png', title: 'Executive Summary' },
        { src: 'assets/GK-Fram/Artboard 5.png', title: 'Careers' },
        { src: 'assets/GK-Fram/Artboard 6.png', title: 'Contact' },
        { src: 'assets/GK-Fram/Artboard  7.png', title: 'Blog' }
    ];

    let currentLightboxIndex = 0;
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const item = lightboxImages[currentLightboxIndex];
        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Expose functions globally for onclick handlers
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.navigateLightbox = navigateLightbox;

    // ==================== VIDEO LIGHTBOX ====================
    const videoList = [
        { src: 'assets/videos/Coming Soon.mp4', title: 'Coming Soon' },
        { src: 'assets/videos/Sanskrithi .mp4', title: 'Sanskrithi' },
        { src: 'assets/videos/Sowing 1.mp4', title: 'Sowing 1' },
        { src: 'assets/videos/Sowing.mp4', title: 'Sowing' },
        { src: 'assets/videos/admission reel.mp4', title: 'Admission Reel' },
        { src: 'assets/videos/chemistry pub .mp4', title: 'Chemistry Pub' },
        { src: 'assets/videos/chemistry pub 1 .mp4', title: 'Chemistry Pub 2' },
        { src: 'assets/videos/christmas reel 1(1).mp4', title: 'Christmas Reel' },
        { src: 'assets/videos/christmas reel 1.mp4', title: 'Christmas Reel 2' },
        { src: 'assets/videos/field trip .mp4', title: 'Field Trip' },
        { src: 'assets/videos/mandi .mp4', title: 'Mandi' },
        { src: 'assets/videos/sowing(1).mp4', title: 'Sowing Reel' },
        { src: 'assets/videos/story telling.mp4', title: 'Story Telling' }
    ];

    let currentVideoIndex = 0;
    let isVideoMode = false;
    const lightboxVideo = document.getElementById('lightboxVideo');

    function openVideoLightbox(index) {
        currentVideoIndex = index;
        isVideoMode = true;
        updateVideoLightboxContent();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateVideoLightboxContent() {
        const item = videoList[currentVideoIndex];
        // Hide image, show video
        lightboxImage.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = item.src;
        lightboxVideo.play();
        lightboxTitle.textContent = item.title;
        lightboxCounter.textContent = `${currentVideoIndex + 1} / ${videoList.length}`;
    }

    function navigateVideoLightbox(direction) {
        lightboxVideo.pause();
        currentVideoIndex = (currentVideoIndex + direction + videoList.length) % videoList.length;
        updateVideoLightboxContent();
    }

    // Override closeLightbox to also handle video
    const originalCloseLightbox = closeLightbox;
    function closeLightboxEnhanced() {
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxVideo.style.display = 'none';
        }
        lightboxImage.style.display = 'block';
        isVideoMode = false;
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Override the original openLightbox to ensure video is hidden
    function openLightboxEnhanced(index) {
        isVideoMode = false;
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxImage.style.display = 'block';
        currentLightboxIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Override the navigate to check mode
    function navigateLightboxEnhanced(direction) {
        if (isVideoMode) {
            navigateVideoLightbox(direction);
        } else {
            currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
            updateLightboxContent();
        }
    }

    // Update keyboard handler
    document.removeEventListener('keydown', document._lightboxKeyHandler);
    document._lightboxKeyHandler = (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightboxEnhanced();
        if (e.key === 'ArrowLeft') navigateLightboxEnhanced(-1);
        if (e.key === 'ArrowRight') navigateLightboxEnhanced(1);
    };
    document.addEventListener('keydown', document._lightboxKeyHandler);

    // Re-expose enhanced functions globally
    window.openLightbox = openLightboxEnhanced;
    window.closeLightbox = closeLightboxEnhanced;
    window.navigateLightbox = navigateLightboxEnhanced;
    window.openVideoLightbox = openVideoLightbox;

});
