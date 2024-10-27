(function ($) {
    "use strict";

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).addClass('active');
            }
        }
    });

})(jQuery);


document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.querySelector('.typed-text-output');
    const typedText = document.querySelector('.typed-text').textContent.split(', ');
    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function type() {
        if (isDeleting) {
            currentText = typedText[textIndex].substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = typedText[textIndex].substring(0, charIndex + 1);
            charIndex++;
        }

        typedTextElement.textContent = currentText;

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === typedText[textIndex].length) {
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typedText.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
});

$(document).ready(function () {
    $('a.nav-item.nav-link').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
            }, 800);
            $('.nav-item.nav-link').removeClass('active');
            $(this).addClass('active');
        }
    });
});

document.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-bottom');
    const aboutMeDiv = document.getElementById('aboutme');
    const rect = aboutMeDiv.getBoundingClientRect();

    if (rect.bottom < 440) {
        scrollButton.style.display = 'none'; 
    } else {
        scrollButton.style.display = 'block';
    }
});

(function() {
    emailjs.init("CuelrRDlPdPlZjLnK");
})();

const messagesuccess = document.getElementById('msgSuccess');

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    emailjs.sendForm('service_206zija', 'template_lczgedx', this) 
        .then(function() {
            messagesuccess.style.display = 'block';
            document.getElementById('contact-form').reset(); 
        }, function(error) {
            console.error('Error:', error);
        });
});
console.log('%c Ehmm you are checking my code, i got you', 'color: white; font-size: 30px; font-weight: bold; background-color: blue; padding: 5px; border-radius: 3px;');
