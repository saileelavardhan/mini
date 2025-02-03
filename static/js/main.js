// Typing animation
const typedTextSpan = document.querySelector('.typed-text');
const words = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typedTextSpan.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-bar, .project-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Dynamic circle animation
function createDynamicCircles() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const circles = [];
    const numCircles = 3;

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'dynamic-circle';
        circle.style.setProperty('--delay', `${i * 2}s`);
        circles.push(circle);
        imageWrapper.appendChild(circle);
    }
}

// Particle background
function createParticles() {
    const numParticles = 50;
    const particles = document.createElement('div');
    particles.className = 'particles';
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', `${Math.random() * 100}%`);
        particle.style.setProperty('--y', `${Math.random() * 100}%`);
        particle.style.setProperty('--delay', `${Math.random() * 4}s`);
        particles.appendChild(particle);
    }
    
    document.body.prepend(particles);
}

// Skill progress animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        bar.style.width = value;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    type();
    createDynamicCircles();
    createParticles();
    animateSkills();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);

    const info = card.querySelector('.project-info');
    const image = card.querySelector('.project-image');

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        info.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(50px)
        `;

        image.style.transform = `
            perspective(1000px)
            rotateX(${rotateX * 0.5}deg)
            rotateY(${rotateY * 0.5}deg)
            translateZ(30px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        info.style.transform = '';
        image.style.transform = '';
    });
}); 