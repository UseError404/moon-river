import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";

let activeTabIndex = 0;// Активный индекс Tab

const tabsBodies = document.querySelectorAll('.tabs__body');
const menuButton = document.querySelector('.icon-menu');
const itemMenuButtons = document.querySelectorAll('.tabs__title');


document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Первоначальная анимация при загрузки страницы ==========================================
    timelineAnimationZeroSection();
    //=========================================

    // Анимация меню ==========================================
    initialisationMenuAnimation()
    //=========================================

    // Анимация при скролле страницы ==========================================
    scrollAnimation();
    //=========================================
})

// первноначальная анимация страницы Header и Zero
function timelineAnimationZeroSection() {
    let timeline = gsap.timeline();

    timeline
        .fromTo('.header__logo',
            {opacity: 0, yPercent: -30},
            {opacity: 1, yPercent: 0, duration: 0.6, ease: 'power2.out'}
        )
        .fromTo('.header__icon',
            {opacity: 0, yPercent: -30},
            {
                opacity: 1,
                yPercent: 0,
                stagger: 0.2,
                ease: 'power2.out'
            },
            '-=0.4' // Наложение
        )
        .fromTo('.icon-menu',
            {opacity: 0, yPercent: -30},
            {opacity: 1, yPercent: 0, duration: 0.5, ease: 'power2.out'},
            '-=0.3' // Наложение
        )
        .fromTo('.zero__title',
            {opacity: 0, yPercent: -30},
            {opacity: 1, yPercent: 0, duration: 0.5, ease: 'power2.out'},
            '-=0.2' // Наложение
        )
        .fromTo('.zero__link',
            {opacity: 0, x: -30},
            {opacity: 1, x: 0, duration: 0.5, ease: 'power2.out'},
            '-=0.2' // Наложение
        )
        .fromTo('.zero__picture',
            {opacity: 0, y: -30, scale: 0},
            {opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out'},
            '-=0.5' // Наложение
        )
        .fromTo('.zero__info',
            {opacity: 0, y: 30,},
            {opacity: 1, y: 0, duration: 0.4, ease: 'power2.out'},
            '-=0.5' // Наложение
        );
}

// Инициализация анимации меню
function initialisationMenuAnimation() {
    // Устанавливаем первый таб активным
    if (tabsBodies.length > 0) {
        tabsBodies[0].classList.add('active');
        itemMenuButtons[0].classList.add('_tab-active');
    }

    // Анимация открытия меню
    menuButton.addEventListener('click', () => {
        openMenuWithActiveTab();
    })

    // Переключение табов по клику на заголовок
    itemMenuButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            switchTab(index);

            // Обновление активного заголовка
            itemMenuButtons.forEach(btn => {
                btn.classList.remove('_tab-active')
            })
            this.classList.add('_tab-active');
        })
    })
}

// Анимация открытия меню и активной вкладки
function openMenuWithActiveTab() {
    // Прерывание предыдущей анимации
    const elementKillAnima = document.querySelectorAll(
        '.tabs, .tabs__title, .tabs__title-menu, .tabs__item');
    gsap.killTweensOf(elementKillAnima);

    // Начальная позиция анимации элементнов
    gsap.set('.tabs', {opacity: 0, xPercent: -100});
    gsap.set('.tabs__title', {opacity: 0});
    gsap.set('.tabs__title-menu, .tabs__item', {opacity: 0, y: -10});

    // Скрытие неактивных табов
    const tabsBodies = document.querySelectorAll('.tabs__body');
    tabsBodies.forEach((body, index) => {
        body.style.display = index === activeTabIndex ? 'block' : 'none';
    });

    const timeline = gsap.timeline();
    timeline
        .to('.tabs', {
            opacity: 1,
            xPercent: 0,
            duration: 0.3,
            delay: 0.3,
        })
        .to('.tabs__title', {
            opacity: 1,
            xPercent: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2"
        }, "-=.2")
        .to('.tabs__body.active .tabs__title-menu', {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2"
        }, "-=.3")
        .to('.tabs__body.active .tabs__item', {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2"
        }, "-=.3");
}

// Анимация по переключению активной влкадки
function switchTab(index) {
    if (index === activeTabIndex) return;

    const tabsBodies = document.querySelectorAll('.tabs__body');
    // Сбрасываеи анимации и скрывает все табы
    tabsBodies.forEach(tab => {
        const elements = tab.querySelectorAll('.tabs__title-menu, .tabs__item');
        gsap.killTweensOf(elements);
        gsap.set(elements, {opacity: 0, y: -10});
        tab.style.display = 'none'; // Скрываем все табы
        tab.classList.remove('active');// Удаление активного класса у неактивного tab
    });

    // Обновление индекса
    activeTabIndex = index;

    // Показание активного tab
    let activeTab = tabsBodies[activeTabIndex];
    activeTab.style.display = 'block';
    activeTab.classList.add('active');

    // Анимация активного tab
    const timeline = gsap.timeline();
    timeline
        .to(activeTab.querySelectorAll('.tabs__title-menu'), {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: 'power2.out'
        })
        .to(activeTab.querySelectorAll('.tabs__item'), {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power2.out'
        }, '-=0.3');
}

// Аимация при скролле страницы
function scrollAnimation() {
// SECTION sectionMF
    gsap.from(".sectionMF__men",
        {
            scrollTrigger: {
                trigger: '.sectionMF',
                start: '-200 100',
            },
            xPercent: -100,
            opacity: 0,
            duration: .8,
        }
    )
    gsap.from(".sectionMF__women",
        {
            scrollTrigger: {
                trigger: '.sectionMF',
                start: '-200 100',
            },
            xPercent: 100,
            opacity: 0,
            duration: .8,
            delay: .2,
        }
    )

// SECTION proposals
    gsap.from(".proposals__grid-items",
        {
            scrollTrigger: {
                trigger: '.proposals',
                start: '-200 200',
            },
            y: 100,
            opacity: 0,
            stagger: .2,
            ease: "power2",
        }
    )

// SECTION slider
    gsap.from(".slider__slide",
        {
            scrollTrigger: {
                trigger: '.slider',
                start: '100 200',
            },
            x: 200,
            opacity: 0,
            stagger: .2,
            delay: .2,
            ease: "power2",
        }
    )
    gsap.from(".slider__title",
        {
            scrollTrigger: {
                trigger: '.slider',
                start: '100 200',
            },
            x: -200,
            opacity: 0,
            delay: .8,
            ease: "power2",
        }
    )
    gsap.from(".slider__social-link img",
        {
            scrollTrigger: {
                trigger: '.slider',
                start: '100 200',
            },
            opacity: 0,
            stagger: .2,
            delay: .5,
            ease: "power2",
        }
    )

    // SECTION footer
    gsap.from(".footer__picture img",
        {
            scrollTrigger: {
                trigger: '.footer',
                start: '-100 center',
            },
            opacity: 0,
            delay: 0,
            ease: "power2",
        }
    )
    gsap.from(".footer__text-banner",
        {
            scrollTrigger: {
                trigger: '.footer',
                start: '-100 center',
            },
            opacity: 0,
            delay: .2,
            ease: "power2",
        }
    )
    gsap.from(".footer__title-banner",
        {
            scrollTrigger: {
                trigger: '.footer',
                start: '-100 center',
            },
            opacity: 0,
            delay: .4,
            ease: "power2",
        }
    )
    gsap.from(".footer__link-banner",
        {
            scrollTrigger: {
                trigger: '.footer',
                start: '-100 center',
            },
            opacity: 0,
            delay: .6,
            ease: "power2",
        }
    )

}