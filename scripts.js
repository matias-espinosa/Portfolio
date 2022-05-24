/*================= HAMBURGUER =================*/

const hamburguer = document.querySelector ('.header .nav_bar .nav_list .hamburguer');
const mobile_menu = document.querySelector ('.header .nav_bar .nav_list ul');
const menu_item = document.querySelectorAll ('.header .nav_bar .nav_list ul li a');
const header = document.querySelector ('.header.container');

hamburguer.addEventListener('click',()=>{
    hamburguer.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', ()=>{
    var scroll_position = window.scrollY;
    if(scroll_position > 250){
        header.style.backgroundColor = '#000000'
    } else {
        header.style.backgroundColor = 'transparent'
    }
})

menu_item.forEach((item) => {
    item.addEventListener('click',()=> {
        hamburguer.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
    
})

/*================= CAROUSEL =================*/

const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right') ;
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

//GETTING THE SLIDES NEXT TO EACH OTHER
//first option
//const slideSize = slide [0].getBoundingClientRect();
//const slideWidth = slideSize.width;

//Optimized option, the width at the end strings it.
const slideWidth = slides [0].getBoundingClientRect().width;

/*
slides[0].style.left = slideWidth * 0 + 'px';
slides[1].style.left = slideWidth * 1 + 'px';
slides[2].style.left = slideWidth * 2 + 'px';

slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
})
*/

//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)

// function to move slides
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})
// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})


//when I click nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    //what indicator was clicked om?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;
    
    const currentSlide = track.querySelector ('.current-slide');
    const currentDot = dotsNav.querySelector ('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

/* Carousel selection 
carouselSelector = function(squares) {
    var box = document.querySelector(id + ' .project-pictures');
    var next = box.querySelector(id + ' .next');
    var prev = box.querySelector(id + ' .prev');
    var items = box.querySelectorAll(id + ' .content li')
};

carouselA = carousel('#carousel-a');
carouselB = carousel('#carousel-b');
*/

/*================= FORM =================*/

const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const media = document.getElementById('media');
const error = document.getElementById('error');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}

const validateInputs =() => {
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const mediaValue = media.value.trim();

    if(fullnameValue === '' || fullnameValue == null){
        setError(fullname, 'Full Name required');
    } else {
        setSuccess(fullname);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (phoneValue === '') {
        setError(phone, 'Phone is required');
    } else if (isNaN(phoneValue)) {
        setError(phone, 'Numbers only')
    } else {
        setSuccess(phone);
    }

    if (mediaValue === '') {
        setError(media, 'Social Media Username is required')
    } else {
        setSuccess(media);
    }
};

/*================= SHOW FORM ON ALERT =================*/
const containerForm = document.querySelector('.containerForm');
const seeform = containerForm.querySelectorAll('form');
const submitInput = seeform[0].querySelector('input[type="submit"]');

function getDataForm(e){
    e.preventDefault(); 
    var formData = new FormData(seeform[0]);
    alert(formData.get('fullname') + '-' + formData.get('email') + '-' + formData.get('phone') + '-' + formData.get('media'));
    console.log (submitInput);
}

document.addEventListener('DOMContentLoaded', function(){
    submitInput.addEventListener('click', getDataForm, false);
}, false);




