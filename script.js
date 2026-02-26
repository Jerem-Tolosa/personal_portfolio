// Menu déroulant hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Animation de typing
const typingElement = document.getElementById("typing");
if (typingElement) {
    const text = ["Ardéchois", "Grenoblois", "Toulousain",];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type(){
        if(count === text.length){
            count = 0;
        }
        currentText = text[count];
        letter = currentText.slice(0, ++index);

        typingElement.textContent = letter;

        if(letter.length === currentText.length){
            count++;
            index = 0;
        }
        setTimeout(type, 120);
    })();
}

// CAROUSEL FUNCTIONALITY
let carouselIndex = {};

function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach((carousel, carouselId) => {
        carouselIndex[carouselId] = 0;
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        // Create dots
        slides.forEach((_, slideIndex) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (slideIndex === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(carouselId, slideIndex));
            dotsContainer.appendChild(dot);
        });
        
        showSlide(carouselId, 0);
    });
}

function moveCarousel(event, direction) {
    const carousel = event.target.closest('.carousel');
    const carouselId = Array.from(document.querySelectorAll('.carousel')).indexOf(carousel);
    const slides = carousel.querySelectorAll('.carousel-slide');
    
    carouselIndex[carouselId] += direction;
    
    if (carouselIndex[carouselId] >= slides.length) {
        carouselIndex[carouselId] = 0;
    } else if (carouselIndex[carouselId] < 0) {
        carouselIndex[carouselId] = slides.length - 1;
    }
    
    showSlide(carouselId, carouselIndex[carouselId]);
}

function showSlide(carouselId, slideIndex) {
    const carousels = document.querySelectorAll('.carousel');
    const carousel = carousels[carouselId];
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const track = carousel.querySelector('.carousel-track');
    
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    carouselIndex[carouselId] = slideIndex;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Initialize carousels when page loads
document.addEventListener('DOMContentLoaded', initCarousels);
