// Menu Mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sistema de avaliação por estrelas
const stars = document.querySelectorAll('.stars-input i');
let currentRating = 0;

stars.forEach(star => {
    // Hover effect
    star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        highlightStars(rating);
    });

    star.addEventListener('mouseleave', function() {
        highlightStars(currentRating);
    });

    // Click event
    star.addEventListener('click', function() {
        currentRating = parseInt(this.getAttribute('data-rating'));
        highlightStars(currentRating);
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

// Formulário de comentários
const commentForm = document.getElementById('commentForm');
if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const comment = this.querySelector('textarea').value;
        const rating = currentRating;
        
        if (rating === 0) {
            alert('Por favor, selecione uma avaliação com estrelas!');
            return;
        }
        
        // Simular envio
        alert(`Obrigado pelo seu depoimento, ${name}! Sua avaliação de ${rating} estrelas será analisada e publicada em breve.`);
        
        // Resetar formulário
        this.reset();
        currentRating = 0;
        highlightStars(0);
    });
}

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados
        const name = this.querySelector('input[type="text"]').value;
        
        // Simular envio
        alert(`${name}, sua mensagem foi enviada com sucesso! Entrarei em contato em breve.`);
        
        // Resetar formulário
        this.reset();
    });
}

// Smooth scroll para links internos
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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animação de contagem dos números
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                if (stat.innerText.includes('+')) {
                    stat.innerText = Math.ceil(current) + '+';
                } else if (stat.innerText.includes('%')) {
                    stat.innerText = Math.ceil(current) + '%';
                } else {
                    stat.innerText = Math.ceil(current) + '+';
                }
                requestAnimationFrame(updateNumber);
            } else {
                if (stat.innerText.includes('+')) {
                    stat.innerText = target + '+';
                } else if (stat.innerText.includes('%')) {
                    stat.innerText = target + '%';
                } else {
                    stat.innerText = target + '+';
                }
            }
        };
        
        // Observar quando o elemento entra na viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Iniciar animação quando a página carregar
window.addEventListener('load', animateNumbers);