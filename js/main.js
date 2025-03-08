// Inisialisasi AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
});

// Navbar Scroll Effect & Hide on Scroll Down
let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    let currentScrollPos = window.pageYOffset;

    // Efek navbar berubah warna saat scroll
    if (currentScrollPos > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Navbar hilang saat scroll ke bawah, muncul saat scroll ke atas
    if (prevScrollPos > currentScrollPos) {
        navbar.classList.remove("hidden"); // Scroll ke atas -> Navbar muncul
    } else {
        navbar.classList.add("hidden"); // Scroll ke bawah -> Navbar hilang
    }

    prevScrollPos = currentScrollPos;
});


