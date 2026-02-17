// ============================================ //
// =====  SCRIPT PRINCIPAL DO SITE - V2     ===== //
// ============================================ //

// Aguardar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================ //
    // =====  MENU MOBILE - HAMBURGER          ===== //
    // ============================================ //
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
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
    }

    // ============================================ //
    // =====  HEADER SCROLL EFFECT - SUMIR/APARECER = //
    // ============================================ //
    let lastScroll = 0;
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                header.style.transform = 'translateY(0)';
                return;
            }

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Rolando para baixo - esconder header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Rolando para cima - mostrar header
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    // ============================================ //
    // =====  CARROSSEL DE DEPOIMENTOS          ===== //
    // ============================================ //
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
    let autoplayInterval;

    // Função para criar o HTML de cada depoimento
    function createTestimonialHTML(testimonial, index) {
        const stars = Array(5).fill('').map(() => 
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

    // Função para atualizar o carrossel
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

    // Funções de navegação
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

    // Inicializar carrossel
    function initCarousel() {
        const testimonialsSection = document.getElementById('testimonials');
        if (!testimonialsSection) return;

        const container = testimonialsSection.querySelector('.container');
        
        // Verificar se já existe a estrutura do carrossel
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
            if (sectionHeader) {
                sectionHeader.insertAdjacentHTML('afterend', carouselHTML);
            }
        }

        updateCarousel();

        // Adicionar eventos aos botões
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.dot');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevTestimonial();
                resetAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextTestimonial();
                resetAutoplay();
            });
        }
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToTestimonial(i);
                resetAutoplay();
            });
        });

        // Autoplay
        startAutoplay();
    }

    // Autoplay do carrossel
    function startAutoplay() {
        autoplayInterval = setInterval(nextTestimonial, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Iniciar carrossel
    initCarousel();

    // ============================================ //
    // =====  SISTEMA DE ESTRELAS - VERSÃO 1   ===== //
    // =====  (Formulário antigo)               ===== //
    // ============================================ //
    const starsOld = document.querySelectorAll('.stars-input i');
    const ratingInputOld = document.getElementById('rating-value');

    if (starsOld.length && ratingInputOld) {
        // Inicializar com 0 estrelas
        ratingInputOld.value = "0";
        
        starsOld.forEach(star => {
            // Efeito hover
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                starsOld.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('hover');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('hover', 'fas');
                        s.classList.add('far');
                    }
                });
            });

            // Efeito mouseout
            star.addEventListener('mouseout', function() {
                const currentRating = ratingInputOld.value;
                starsOld.forEach(s => {
                    s.classList.remove('hover');
                    if (s.dataset.rating <= currentRating) {
                        s.classList.add('active', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('active', 'fas');
                        s.classList.add('far');
                    }
                });
            });

            // Clique para selecionar
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                ratingInputOld.value = rating;
                
                starsOld.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('active', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('active', 'fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }

    // ============================================ //
    // =====  SISTEMA DE ESTRELAS - VERSÃO 2   ===== //
    // =====  (Formulário moderno)              ===== //
    // ============================================ //
    const starsModern = document.querySelectorAll('.stars-input-modern i');
    const ratingInputModern = document.getElementById('rating-value');

    if (starsModern.length && ratingInputModern) {
        // Inicializar com 0 estrelas
        ratingInputModern.value = "0";
        
        starsModern.forEach(star => {
            // Efeito hover
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                starsModern.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('hover');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('hover', 'fas');
                        s.classList.add('far');
                    }
                });
            });

            // Efeito mouseout
            star.addEventListener('mouseout', function() {
                const currentRating = ratingInputModern.value;
                starsModern.forEach(s => {
                    s.classList.remove('hover');
                    if (s.dataset.rating <= currentRating) {
                        s.classList.add('active', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('active', 'fas');
                        s.classList.add('far');
                    }
                });
            });

            // Clique para selecionar
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                ratingInputModern.value = rating;
                
                starsModern.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('active', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('active', 'fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }

    // ============================================ //
    // =====  ANIMAÇÃO DE ENTRADA - SCROLL      ===== //
    // ============================================ //
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .stat, .feature, .social-highlight-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        });
    };

    // Aplicar estilos iniciais para animação
    document.querySelectorAll('.service-card, .testimonial-card, .stat, .feature, .social-highlight-item').forEach(element => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });

    // Executar animação no scroll
    window.addEventListener('scroll', animateOnScroll);
    // Executar uma vez ao carregar
    setTimeout(animateOnScroll, 100);

    // ============================================ //
    // =====  VALIDAÇÃO DE FORMULÁRIOS          ===== //
    // ============================================ //
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nome = this.querySelector('input[name="nome"]');
            const email = this.querySelector('input[name="email"]');
            const mensagem = this.querySelector('textarea[name="mensagem"]');
            
            if (!nome.value || !email.value || !mensagem.value) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios!');
            }
        });
    }

    // Formulário de depoimento (antigo)
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            const nome = this.querySelector('input[name="nome"]');
            const email = this.querySelector('input[name="email"]');
            const depoimento = this.querySelector('textarea[name="depoimento"]');
            const avaliacao = document.getElementById('rating-value');
            
            if (!nome.value || !email.value || !depoimento.value) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios!');
            }
            
            if (avaliacao && avaliacao.value === "0") {
                e.preventDefault();
                alert('Por favor, selecione uma avaliação com estrelas!');
            }
        });
    }

    // ============================================ //
    // =====  SCROLL SUAVE PARA LINKS ÂNCORA   ===== //
    // ============================================ //
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

    // ============================================ //
    // =====  EFEITO DE DIGITAÇÃO NO HERO       ===== //
    // ============================================ //
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Opcional: Se quiser efeito de digitação, descomente abaixo
        /*
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
        */
    }
});

// ============================================ //
// =====  PREVENIR ENVIO DUPLICADO          ===== //
// ============================================ //
window.addEventListener('load', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            }
        });
    });
});

// ============================================ //
// =====  DETECTAR MUDANÇA DE TEMA (opcional) ===== //
// ============================================ //
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Sistema está em modo escuro (já estamos usando escuro)
    console.log('Modo escuro ativo');
}
