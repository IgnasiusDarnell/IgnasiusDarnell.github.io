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

document.addEventListener("DOMContentLoaded", function () {
    // Testimonial Slider
    const track_reviews = document.querySelector(".testimonial-track");
    const cards_reviews = document.querySelectorAll(".testimonial-card");
    const cardWidth = cards_reviews[0].offsetWidth + 15; // Lebar card + margin

    let position_reviews = 0;
    let animationFrameId;

    function scrollTestimonials() {
        position_reviews -= 1; // Geser ke kiri
        if (position_reviews <= -cardWidth * cards_reviews.length) {
            position_reviews = 0; // Kembali ke awal jika sudah mencapai akhir
        }
        track_reviews.style.transform = `translateX(${position_reviews}px)`;
        animationFrameId = requestAnimationFrame(scrollTestimonials);
    }

    function startAnimation() {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(scrollTestimonials);
        }
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    // Mulai animasi saat halaman dimuat
    startAnimation();

    // Hentikan animasi saat tab tidak aktif
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });

    // Portfolio Slider
    const track_porto = document.querySelector(".portfolio-track");
    const items_porto = document.querySelectorAll(".portfolio-item");
    const itemWidth = items_porto[0].offsetWidth + 15; // Lebar item + margin

    let position_porto = 0;
    let animationFrameIdPorto;

    function scrollPortfolio() {
        position_porto += 1; // Geser ke kanan
        if (position_porto >= itemWidth * items_porto.length) {
            position_porto = 0; // Kembali ke awal jika sudah mencapai akhir
        }
        track_porto.style.transform = `translateX(-${position_porto}px)`;
        animationFrameIdPorto = requestAnimationFrame(scrollPortfolio);
    }

    function startAnimationPorto() {
        if (!animationFrameIdPorto) {
            animationFrameIdPorto = requestAnimationFrame(scrollPortfolio);
        }
    }

    function stopAnimationPorto() {
        if (animationFrameIdPorto) {
            cancelAnimationFrame(animationFrameIdPorto);
            animationFrameIdPorto = null;
        }
    }

    // Mulai animasi saat halaman dimuat
    startAnimationPorto();

    // Hentikan animasi saat tab tidak aktif
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAnimationPorto();
        } else {
            startAnimationPorto();
        }
    });

    // Optimasi untuk Safari: Paksa hardware acceleration
    track_porto.style.backfaceVisibility = "hidden";
    track_porto.style.perspective = "1000px";

    // Tombol Navigasi untuk Portfolio Slider
    const prevButton = document.querySelector(".slider-prev");
    const nextButton = document.querySelector(".slider-next");

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
            position_porto -= itemWidth;
            if (position_porto < 0) {
                position_porto = itemWidth * (items_porto.length - 1);
            }
            track_porto.style.transform = `translateX(-${position_porto}px)`;
        });

        nextButton.addEventListener("click", () => {
            position_porto += itemWidth;
            if (position_porto >= itemWidth * items_porto.length) {
                position_porto = 0;
            }
            track_porto.style.transform = `translateX(-${position_porto}px)`;
        });
    }
});