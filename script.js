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

// Sistema de avaliação por estrelas (VERSÃO ANTIGA - VOU SUBSTITUIR)
// ============================================
// FORMSPREE - SISTEMA DE ESTRELAS ATUALIZADO
// ============================================

const starsInput = document.querySelectorAll('.stars-input i');
const ratingHidden = document.getElementById('rating-value');

if (starsInput.length > 0 && ratingHidden) {
    starsInput.forEach((star, index, stars) => {
        // Click na estrela
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingHidden.value = rating;
            
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });

        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-rating');
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                }
            });
        });

        star.addEventListener('mouseleave', function() {
            const currentRating = ratingHidden.value;
            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
}

// ============================================
// FORMULÁRIO DE CONTATO - FORMSPREE
// ============================================

const contactFormSpree = document.getElementById('contactForm');
if (contactFormSpree) {
    contactFormSpree.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.');
                this.reset();
            } else {
                alert('❌ Erro ao enviar. Tente novamente ou me chame no WhatsApp!');
            }
        })
        .catch(error => {
            alert('❌ Erro de conexão. Me chame direto no WhatsApp!');
        });
        
        return false;
    });
}

// ============================================
// FORMULÁRIO DE DEPOIMENTOS - FORMSPREE
// ============================================

const commentFormSpree = document.getElementById('commentForm');
if (commentFormSpree) {
    commentFormSpree.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const rating = document.getElementById('rating-value').value;
        if (rating === '0') {
            alert('⭐ Por favor, selecione uma avaliação com estrelas!');
            return;
        }
        
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('⭐ Obrigado pelo seu depoimento! Ele será publicado em breve.');
                this.reset();
                document.getElementById('rating-value').value = '0';
                document.querySelectorAll('.stars-input i').forEach(star => {
                    star.classList.remove('fas');
                    star.classList.add('far');
                });
            } else {
                alert('❌ Erro ao enviar depoimento. Tente novamente!');
            }
        })
        .catch(error => {
            alert('❌ Erro de conexão. Tente novamente!');
        });
        
        return false;
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

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

// ============================================
// HEADER SCROLL EFFECT
// ============================================

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 30, 36, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(26, 30, 36, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// ANIMAÇÃO DOS NÚMEROS
// ============================================

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

// Iniciar animação
window.addEventListener('load', animateNumbers);
