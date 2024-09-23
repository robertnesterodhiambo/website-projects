$(function() {


    lightGallery(document.querySelector('#lightgallery'), {
        selector: ".img-thm",
        getCaptionFromTitleOrAlt: true
    });

    $(document).ready(function() {
        var owl = $('.landing-banner-slider');
        owl.owlCarousel({
            loop: true,
            margin: 0,
            autoplayTimeout: 5000,
            touchDrag: true,
            mouseDrag: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            smartSpeed: 2000,
            autoplay: true,
            dots: false,
            nav: true,
            navText: ['Prev', 'Next'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        })

    });


    $(document).ready(function() {
        var owl = $('.testimonials');
        owl.owlCarousel({
            loop: true,
            margin: 0,
            autoplayTimeout: 5000,
            touchDrag: true,
            mouseDrag: true,
            smartSpeed: 2000,
            autoplay: true,
            dots: false,
            nav: true,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        })

    });

    $(document).ready(function() {
        var owl = $('.news-slider');
        owl.owlCarousel({
            loop: true,
            margin: 20,
            autoplayTimeout: 3000,
            nav: false,
            touchDrag: true,
            mouseDrag: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1.5,
                },
                1000: {
                    items: 3,
                    slideBy: 1
                },
                1500: {
                    items: 3,
                    slideBy: 1
                }
            }
        })

    });

});


// window.addEventListener('load', function() {
//     document.querySelector('.pre-loader').classList.add('is-loaded');
// });