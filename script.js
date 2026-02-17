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

// CARROSSEL DE DEPOIMENTOS
const testimonials = [
    {
        name: 'Leandro P.',
        time: 'Aluno há 1 ano',
        text: 'Juan é meu amigo a muitos anos e sempre acreditei no seu potencial. Hoje ele me ajudou a superar minhas limitações e alcançar metas que antes eram impossíveis. Treino de verdade, com resultado e parceria!',
        rating: 5
    },
    {
        name: 'Gabrie P.',
        time: 'Aluno há 5 meses',
        text: 'Profissional extremamente dedicado e competente. Consegui sair do sedentarismo e hoje faço meus treinos com prazer. Recomendo demais! Acompanhamento diferenciado e muito profissionalismo.',
        rating: 5
    },
    {
        name: 'João M.',
        time: 'Aluno há 4 meses',
        text: 'Melhor Treinador que já tive! Além do treino personalizado, sempre está atento à execução dos exercícios e me motiva a dar o meu melhor. Resultados aparecendo e evolução constante!',
        rating: 5
    }
];

let currentTestimonial = 0;

function createTestimonialHTML(testimonial, index) {
    const stars = Array(5).fill('').map((_, i) => 
        `<i class="fas fa-star"></i>`
    ).join('');

    return `
        <div class="testimonial-card ${index === currentTestimonial ? 'active' : ''}" data-index="${index}">
            <div class="testimonial-header">
                <div class="user-icon">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <h4>${testimonial.name}</h4>
                    <span class="user-time">${testimonial.time}</span>
                </div>
            </div>
            <div class="testimonial-rating">
                ${stars}
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
        </div>
    `;
}

function updateCarousel() {
    const container = document.querySelector('.testimonials-carousel');
    if (!container) return;

    container.innerHTML = testimonials.map((t, i) => createTestimonialHTML(t, i)).join('');

    // Atualizar dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === currentTestimonial) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateCarousel();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateCarousel();
}

// Inicializar carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Criar estrutura do carrossel se existir a seção
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        const container = testimonialsSection.querySelector('.container');
        
        // Verificar se já existe a estrutura
        if (!document.querySelector('.testimonials-carousel')) {
            // Remover grid antiga se existir
            const oldGrid = document.querySelector('.testimonials-grid');
            if (oldGrid) oldGrid.remove();

            // Criar novo carrossel
            const carouselHTML = `
                <div class="testimonials-carousel"></div>
                <div class="carousel-controls">
                    <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                    <div class="carousel-dots">
                        ${testimonials.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                    </div>
                    <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            `;

            // Inserir após o section-header
            const sectionHeader = testimonialsSection.querySelector('.section-header');
            sectionHeader.insertAdjacentHTML('afterend', carouselHTML);
        }

        updateCarousel();

        // Adicionar eventos aos botões
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.dot');

        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goToTestimonial(i));
        });

        // Autoplay opcional (comente se não quiser)
        setInterval(nextTestimonial, 5000);
    }

    // Sistema de avaliação por estrelas
    const stars = document.querySelectorAll('.stars-input i');
    const ratingInput = document.getElementById('rating-value');

    if (stars.length && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                stars.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });

            star.addEventListener('mouseout', function() {
                stars.forEach(s => s.classList.remove('hover'));
            });

            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                ratingInput.value = rating;
                
                stars.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
});
