// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initCustomCursor();
    initTypewriter();
    initStatBars();
    init3DTilt();
    initComicEffects();
});

// ==================== AOS ANIMATION LIBRARY ====================
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Dot follows immediately
        dotX = mouseX;
        dotY = mouseY;
        
        // Circle follows with delay
        circleX += (mouseX - circleX) * 0.15;
        circleY += (mouseY - circleY) * 0.15;
        
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .tilt-3d, .portfolio-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            circle.style.width = '48px';
            circle.style.height = '48px';
        });
        
        el.addEventListener('mouseleave', () => {
            circle.style.width = '32px';
            circle.style.height = '32px';
        });
    });
}

// ==================== TYPEWRITER EFFECT ====================
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            typewriterElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 30);
        }
    }
    
    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                type();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(typewriterElement);
}

// ==================== STAT BARS ANIMATION ====================
function initStatBars() {
    const statBars = document.querySelectorAll('.stat-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    statBars.forEach(bar => observer.observe(bar));
}

// ==================== 3D TILT EFFECT ====================
function init3DTilt() {
    const tiltElements = document.querySelectorAll('.tilt-3d');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.setProperty('--tilt-x', `${rotateX}deg`);
            element.style.setProperty('--tilt-y', `${rotateY}deg`);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--tilt-x', '0deg');
            element.style.setProperty('--tilt-y', '0deg');
        });
    });
}

// ==================== COMIC EFFECTS ("BAM!", "POW!") ====================
function initComicEffects() {
    const effects = ['BAM!', 'POW!', 'ZAP!', 'CRASH!', 'BOOM!', 'WHAM!', 'KAPOW!'];
    
    document.addEventListener('click', (e) => {
        // Random chance to trigger effect
        if (Math.random() > 0.7) {
            createComicEffect(e.clientX, e.clientY);
        }
    });
    
    function createComicEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'comic-effect';
        effect.textContent = effects[Math.floor(Math.random() * effects.length)];
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }
}

// ==================== PARALLAX SCROLLING ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const halftones = document.querySelectorAll('.halftone-bg');
    
    halftones.forEach(halftone => {
        const speed = 0.5;
        halftone.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==================== PORTFOLIO HOVER SOUND EFFECT SIMULATION ====================
// (Visual feedback only - no actual sound)
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});