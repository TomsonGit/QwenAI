// Płynne przewijanie do sekcji
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Nawigacja mobilna
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            this.setAttribute('aria-expanded', !isExpanded);
            this.setAttribute('aria-label', isExpanded ? 'Otwórz menu nawigacji' : 'Zamknij menu nawigacji');
        });

        // Zamknij menu po kliknięciu w link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                // Update ARIA attributes
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Otwórz menu nawigacji');
            });
        });
        
        // Zamknij menu po kliknięciu poza menu
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Otwórz menu nawigacji');
            }
        });
    }
    
    // Navbar visibility - hide on hero section, show when scrolling down
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('#main'); // Hero section has id="main"
    
    if (navbar && heroSection) {
        // Initially hide navbar
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
        
        window.addEventListener('scroll', function() {
            const heroHeight = heroSection.offsetHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show navbar when scrolled past hero section
            if (scrollTop > heroHeight) {
                navbar.style.transform = 'translateY(0)';
            } else {
                // Hide navbar when on hero section
                navbar.style.transform = 'translateY(-100%)';
            }
        });
    }
});

// Slider w galerii
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Funkcja do pokazywania slajdu
function showSlide(index) {
    // Only run slider functionality if slides exist on the page
    if (slides.length > 0) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        const offset = -currentSlide * 100;
        document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    }
}

// Przyciski nawigacji slidera
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

// Automatyczne przewijanie slidera (tylko na stronie głównej)
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Formularz kontaktowy
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Pobranie danych z formularza
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Walidacja formularza
        if (!name || !email || !message) {
            alert('Wszystkie pola są wymagane!');
            return;
        }
        
        // Walidacja adresu e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Proszę podać poprawny adres e-mail!');
            return;
        }
        
        // Przygotowanie danych do wysyłki
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
        };
        
        (function() {
            emailjs.init("0VNKz3dVMKzx9RfhM");
        })();

        // Wysyłka wiadomości przy użyciu EmailJS
        emailjs.send('service_ftpa2vb', 'template_6by0h6e', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
            });
    });
}

// Funkcjonalność FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Efekt paralaksowy dla sekcji hero
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Animacje przy przewijaniu
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .gallery-category, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Inicjalizacja animacji
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-category, .contact-info, .contact-form');
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Wywołanie przy załadowaniu strony
});

// Zmiana stylu nawigacji przy przewijaniu
// Removed to keep navbar fixed at top

// Lightbox functionality
let lightbox;
let lightboxImg;
let lightboxCaption;
let lightboxClose;
let lightboxPrev;
let lightboxNext;

// Function to open lightbox
function openLightbox(imageSrc, caption, imageArray, imageIndex) {
    // Initialize lightbox elements if not already done
    if (!lightbox) {
        lightbox = document.querySelector('.lightbox');
        lightboxImg = document.getElementById('lightbox-img');
        lightboxCaption = document.getElementById('lightbox-caption');
        lightboxClose = document.querySelector('.lightbox-close');
        lightboxPrev = document.querySelector('.lightbox-prev');
        lightboxNext = document.querySelector('.lightbox-next');
        
        // Set up event listeners
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', nextImage);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', prevImage);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox && lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                } else if (e.key === 'ArrowLeft') {
                    prevImage();
                }
            }
        });
    }
    
    // Show the lightbox
    if (lightboxImg) lightboxImg.src = imageSrc;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightbox) lightbox.classList.add('active');
    
    // Store image data for navigation
    window.currentLightboxImages = imageArray || [];
    window.currentLightboxIndex = imageIndex !== undefined ? imageIndex : 0;
    
    // Hide navigation if there's only one image
    if (lightboxPrev && lightboxNext) {
        if (window.currentLightboxImages.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'block';
            lightboxNext.style.display = 'block';
        }
    }
}

// Function to close lightbox
function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// Function to show next image
function nextImage() {
    if (window.currentLightboxImages && window.currentLightboxImages.length > 0) {
        window.currentLightboxIndex = (window.currentLightboxIndex + 1) % window.currentLightboxImages.length;
        const img = window.currentLightboxImages[window.currentLightboxIndex];
        if (lightboxImg) lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = img.alt;
    }
}

// Function to show previous image
function prevImage() {
    if (window.currentLightboxImages && window.currentLightboxImages.length > 0) {
        window.currentLightboxIndex = (window.currentLightboxIndex - 1 + window.currentLightboxImages.length) % window.currentLightboxImages.length;
        const img = window.currentLightboxImages[window.currentLightboxIndex];
        if (lightboxImg) lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = img.alt;
    }
}

// Event listeners for slider images (these exist in the DOM from the start)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.slide img').forEach((img, index) => {
        img.addEventListener('click', function() {
            const images = Array.from(document.querySelectorAll('.slide img'));
            const imageData = images.map(img => ({
                src: img.src,
                alt: img.alt
            }));
            openLightbox(this.src, this.alt, imageData, index);
        });
    });
});

// Service descriptions functionality (expandable)
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent closing when clicking on links or buttons inside the card
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            // Toggle active class on clicked card
            this.classList.toggle('active');
            
            // Toggle description visibility with smooth animation
            const description = this.querySelector('.service-description');
            if (description) {
                description.classList.toggle('active');
            }
        });
    });
});

// Touch gesture support for gallery slider
let touchStartX = 0;
let touchEndX = 0;
let isSwipping = false;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
    isSwipping = true;
}

function handleTouchEnd(event) {
    if (!isSwipping) return;
    
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
    isSwipping = false;
}

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for swipe
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) < swipeThreshold) return;
    
    if (swipeDistance > 0) {
        // Swipe left - next slide
        showSlide(currentSlide + 1);
    } else {
        // Swipe right - previous slide  
        showSlide(currentSlide - 1);
    }
}

// Add touch listeners to gallery slider
document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        gallerySlider.addEventListener('touchstart', handleTouchStart, { passive: true });
        gallerySlider.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
});

// Improve form validation and mobile experience
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add better mobile input handling
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('error');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('error');
            }
        });
    });
    
    // Floating contact button functionality
    const floatingContact = document.querySelector('.floating-contact');
    const floatingBtn = document.querySelector('.floating-btn');
    
    if (floatingBtn && floatingContact) {
        floatingBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            floatingContact.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = floatingContact.classList.contains('active');
            floatingBtn.setAttribute('aria-expanded', isExpanded);
            floatingBtn.setAttribute('aria-label', isExpanded ? 'Zamknij opcje kontaktu' : 'Otwórz opcje kontaktu');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!floatingContact.contains(e.target)) {
                floatingContact.classList.remove('active');
                floatingBtn.setAttribute('aria-expanded', 'false');
                floatingBtn.setAttribute('aria-label', 'Otwórz opcje kontaktu');
            }
        });
    }
});
