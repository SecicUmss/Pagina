document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EFECTO NAVBAR STICKY ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. EFECTO TYPEWRITER (Máquina de escribir) ---
    const textElement = document.getElementById('typewriter-text');
    const textToType = "SOMOS LA SOCIEDAD ESTUDIANTIL DE INGENIERÍA CIVIL, COMPROMETIDOS CON EL CRECIMIENTO ACADÉMICO";
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            textElement.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50); // Velocidad de escritura (ms)
        }
    }
    // Iniciar el efecto tras un pequeño retraso
    setTimeout(typeWriter, 500);

    // --- 3. LÓGICA DEL CARRUSEL DE ANUNCIOS ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    // Eventos de los botones
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Cambio automático cada 5 segundos
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    startInterval();

    // --- 4. CONTADORES ANIMADOS AL HACER SCROLL ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // A menor número, más rápido

    // Usamos IntersectionObserver para ejecutar la animación solo cuando se vea la sección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                observer.unobserve(counter); // Dejar de observar una vez que ya contó
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando la sección está al 50% en pantalla

    counters.forEach(counter => {
        observer.observe(counter);
    });
});