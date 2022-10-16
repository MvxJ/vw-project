const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 5000;
const sliderDots = document.querySelector('.slider-dots');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const videoFrame = document.querySelector('.slider-wideo');
let slideInterval;

pause.addEventListener('click', event => {
    clearInterval(slideInterval);
})

play.addEventListener('click', event => {
    slideInterval = setInterval(nextSlide, intervalTime);
});

const listener = window.addEventListener('blur', () => {
    if (document.activeElement === videoFrame) {
        clearInterval(slideInterval);
    }
});

const nextSlide = () => {
    const current = document.querySelector('.current');
    current.classList.remove('current');
    const currentDot = document.querySelector('.current-dot');
    currentDot.classList.remove('current-dot');

    if (current.nextElementSibling.classList.contains('slide')) {
        current.nextElementSibling.classList.add('current')
        currentDot.nextElementSibling.classList.add('current-dot');
    } else {
        slides[0].classList.add('current');
        const dots = document.querySelectorAll('.slide-dot');
        dots[0].classList.add('current-dot');
    }

    setTimeout(() => current.classList.remove(current))
}

for (let i = 0; i < slides.length; ++i) {
    const dot = document.createElement("div");
    dot.classList.add("slide-dot");
    
    if (i === 0) {
        dot.classList.add('current-dot');
    }

    sliderDots.appendChild(dot);
    dot.addEventListener("click", dotClick.bind(null, i), false);
}

function dotClick(num) {
    const current = document.querySelector('.current');
    const dots = document.querySelectorAll('.slide-dot');

    dots.forEach(dot => {
        if (dot.classList.contains('current-dot')) {
            dot.classList.remove('current-dot');
        }
    });

    current.classList.remove('current');
    dots[num].classList.add('current-dot');
    slides[num].classList.add('current');

    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
}

const prevSlide = () => {
    const current = document.querySelector('.current');
    current.classList.remove('current');
    const currentDot = document.querySelector('.current-dot');
    currentDot.classList.remove('current-dot');

    if (current.previousElementSibling) {
        current.previousElementSibling.classList.add('current')
        currentDot.previousElementSibling.classList.add('current-dot')
    } else {
        slides[slides.length - 1].classList.add('current')
        const dots = document.querySelectorAll('.slide-dot');
        dots[dots.length - 1].classList.add('current-dot');
    }
    
    setTimeout(() => current.classList.remove(current))
}

next.addEventListener('click', e => {
    nextSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
      }
})

prev.addEventListener('click', e => {
    prevSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
      }
})

if (auto) {
    slideInterval = setInterval(nextSlide, intervalTime);
}