document.addEventListener('scroll', function() {
    const header = document.querySelector('#main-navbar');
    if (!header) return;
    if (window.scrollY >= 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });


document.addEventListener('DOMContentLoaded', function() {
    const panels = Array.from(document.querySelectorAll('.hero__panels .panel'));
    const heroTitle = document.querySelector('.hero__title');
    if (!panels.length || !heroTitle) return;

    const titles = [
        'Disciplined Design',
        'Long-term conviction',
        'Exceptional service',
        'Value'
    ];
    let index = 0;
    let rotationTimer;

    const startRotation = function() {
        clearInterval(rotationTimer);
        rotationTimer = setInterval(function() {
            index = (index + 1) % titles.length; // no hardcoding needed, wrap index back to 0 at end
            updateHero();
        }, 10000);
    };

    const updateHero = function() {
        panels.forEach(function(panel, panelIndex) {
            panel.classList.toggle('active', panelIndex === index);
        });
        heroTitle.innerHTML = titles[index] + '<br />for your website.';
    };

    panels.forEach(function(panel, panelIndex) {
        panel.addEventListener('click', function() {
            index = panelIndex;
            updateHero();
            startRotation();
        });
    });

    updateHero();
    startRotation();
});
