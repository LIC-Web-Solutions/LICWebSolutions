document.addEventListener('scroll', function() {
    const header = document.querySelector('#main-navbar');
    if (!header) return;
    if (window.scrollY >= 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });
