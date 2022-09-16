window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('body').classList.add('loaded');
    afterLoading();
    initMap();
});

function afterLoading() {

    const showObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            entry.target.classList.toggle('show', entry.isIntersecting);
        });
    });

    const rotateObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            entry.target.classList.toggle('roll-in', entry.isIntersecting);
            entry.target.style.setProperty('--rotation-angle', `${Math.random() * 8 - 5}` + 'deg');
            entry.target.style.setProperty('transition-delay', 0.2 + 2 * i / 10 + 's');
        });
    });

    let prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector('nav').style.top = '0';

        } else {
            document.querySelector('nav').style.top = '-100px';
        }
        prevScrollpos = currentScrollPos;
    }
    /*----MENU----*/
    const navList = document.querySelectorAll('a[href^="#"]');
    navList.forEach(anchor => {
        anchor.style.setProperty('--rotation-angle', `${Math.random() * 8 - 5}` + 'deg');
        anchor.addEventListener('click', ev => {
            ev.preventDefault();
            navList.forEach(el => el.classList.remove('menu-selected'));
            ev.target.classList.add('menu-selected');

            const hashtag = anchor.getAttribute('href');
            const target = document.querySelector(hashtag);

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            history.pushState(null, null, hashtag);
        });
    });

    /*-----ABOUT----*/

    const aboutPanel = document.querySelector('.about-panel');
    showObserver.observe(aboutPanel);

    const accentBalls = document.querySelectorAll('.accent_ball');
    accentBalls.forEach(accentBall => rotateObserver.observe(accentBall));

    /*-----SERVICES-----*/


    const serviceCards = document.querySelectorAll('.service-card');
    const serviceDetails = document.querySelectorAll('.service-details');
    const tooltipActive = document.querySelector('.tooltip');

    const followMouse = (e) => {
        tooltipActive.style.top = e.pageX + 'px';
    }

    serviceCards.forEach((card, index) => {

        showObserver.observe(card);

        card.addEventListener('click', ev => {
            ev.preventDefault();
            serviceCards.forEach((item, ind) => ind === index ? item.classList.toggle('card-selected') : item.classList.remove('card-selected'));
            serviceDetails.forEach((detailItem, detailIndex) => {
                if (detailIndex === index) {
                    detailItem.classList.toggle('details-visible');
                    const flexDirection = window
                        .getComputedStyle(document.querySelector('.service-cards'))
                        .getPropertyValue('flex-direction');
                    if (flexDirection === 'column') {
                        detailItem.style.order = 0;
                        detailItem.style.marginBottom = '1rem';
                    }
                } else {
                    detailItem.classList.remove('details-visible');
                }

            })
        });

        card.addEventListener('mouseenter', (e) => {
            const tooltip = document.querySelector('.tooltip');
            tooltip.classList.add('tooltip-active');

        });

        card.addEventListener('mouseleave', () => {
            document.querySelector('.tooltip').classList.remove('tooltip-active');
        });

        card.addEventListener('mousemove', (e) => {
            const tooltip = document.querySelector('.tooltip');
            tooltip.style.left = e.pageX + 'px';
            tooltip.style.top = e.pageY + 'px';
        });
    });






    /*--------GALLERY------*/
    const pics = document.querySelectorAll('.gallery-img');
    pics.forEach(pic => {
        rotateObserver.observe(pic);
    })

    const openGalleryBtn = document.getElementById('open-gallery-btn');
    openGalleryBtn.addEventListener('click', () => showGallery());

    const closeGalleryBtn = document.getElementById('gallery-close');
    closeGalleryBtn.addEventListener('click', () => closeGallery());

    const galleryButtons = document.querySelectorAll("[data-gallery-button]")

    galleryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const offset = button.dataset.galleryButton === "next" ? 1 : -1
            const slides = button
                .closest("[data-gallery]")
                .querySelector("[data-slides]")

            const activeSlide = slides.querySelector("[data-active]");
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;
            if (newIndex < 0) newIndex = slides.children.length - 1;
            if (newIndex >= slides.children.length) newIndex = 0;

            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;
        })
    })

    /*--------CONTACTS------*/

    const contactsPanel = document.querySelector('.contacts-panel');
    showObserver.observe(contactsPanel);
}


function initMap() {
    const educenter = { lat: 43.845093473144075, lng: 25.945465855776227 };
    const mapOptions = {
        center: educenter,
        zoom: 40
    };
    const googlemap = new google.maps.Map(document.getElementById('map'), mapOptions);

    new google.maps.Marker({
        position: educenter,
        googlemap,
        title: 'ПРИ ГЕРИ',
    });
}

function submitForm() {
    const form = document.querySelector(".contact-form");
    let formValid = true;
    const fields = [...form.children]
        .filter(field => field.tagName === 'INPUT' || field.tagName === 'TEXTAREA');
    fields.forEach(field => {
        if (field.value.trim() === '') {
            console.log(field.value);
            field.style.border = '1px solid red';
            formValid = false;
        } else {
            field.style.border = 'none';
        }
    });
    if (!formValid) {
        document.querySelector('.contacts-alert').classList.add('alert-active');
        return false;
    } else {
        document.querySelector('.contacts-alert').classList.remove('alert-active');
        form.submit();
    }
    console.log(fields);
    form.reset();
    return false;
}

const showGallery = () => {
    document.getElementById('gallery-modal').classList.add('gallery-active')
    const body = document.body;
    body.style.overflow = 'hidden';
};

const closeGallery = () => {
    document.getElementById('gallery-modal').classList.remove('gallery-active')
    const body = document.body;
    body.style.overflow = 'unset';
}