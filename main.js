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
        console.log(entries);
        entries.forEach((entry, i) => {
            console.log(entry.isIntersecting)
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
    serviceCards.forEach((card, index) => {
        showObserver.observe(card);
        card.addEventListener('click', ev => {
            ev.preventDefault();
            serviceCards.forEach((item, ind) => ind === index ? item.classList.toggle('card-selected') : item.classList.remove('card-selected'));
            serviceDetails.forEach((detailItem, detailIndex) => {
                detailIndex === index
                    ? detailItem.classList.toggle('details-visible')
                    : detailItem.classList.remove('details-visible');
            })
        })
    });

    /*--------GALLERY------*/
    const pics = document.querySelectorAll('.gallery-img');
    pics.forEach(pic => {
        rotateObserver.observe(pic);
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

function submitForm(ev) {
    const form = document.querySelector(".contact-form");
    form.submit();
    form.reset();
    return false;
}