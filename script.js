// menu hamburger //
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-menu a'); // Targetkan link di dalam nav-menu

    if (menuToggle && navList) {
        // Toggle menu buka/tutup
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Menutup menu saat link diklik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }
});

// Hero Slider//
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 3000); // Ganti slide tiap 3 detik

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// Event listener untuk tombol manual
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });
}

// Reset timer otomatis jika user klik manual
function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000); // Pastikan angka ini juga 3000
}


// Slider Testimoni//
/* =========================================
   SLIDER TESTIMONI (SINGLE SLIDE)
   ========================================= */

// Inisialisasi variabel
const testiWrapper = document.getElementById('testi-wrapper');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');
let testiIndex = 0;
const totalTesti = 6; // Sesuaikan dengan jumlah kartu testimoni Anda
const intervalTime = 3000; // Durasi perpindahan (3 detik)

// Fungsi utama untuk menggeser slide
function moveTesti() {
    // Menggunakan index dikali 100% untuk menggeser satu kartu penuh
    if (testiWrapper) {
        testiWrapper.style.transform = `translateX(${-testiIndex * 100}%)`;
    }
}

// Fungsi slide berikutnya
function nextTesti() {
    if (testiIndex < totalTesti - 1) {
        testiIndex++;
    } else {
        testiIndex = 0; // Kembali ke awal jika sudah di akhir
    }
    moveTesti();
}

// Fungsi slide sebelumnya
function prevTesti() {
    if (testiIndex > 0) {
        testiIndex--;
    } else {
        testiIndex = totalTesti - 1; // Ke slide terakhir jika di awal
    }
    moveTesti();
}

// Pengaturan Auto-play
let autoSlideTesti = setInterval(nextTesti, intervalTime);

// Fungsi untuk mereset timer saat tombol diklik manual
function resetTestiTimer() {
    clearInterval(autoSlideTesti);
    autoSlideTesti = setInterval(nextTesti, intervalTime);
}

// Event Listeners untuk tombol navigasi
if (testiNext && testiPrev) {
    testiNext.addEventListener('click', () => {
        nextTesti();
        resetTestiTimer();
    });

    testiPrev.addEventListener('click', () => {
        prevTesti();
        resetTestiTimer();
    });
}

/* =========================================
   LOGIKA SCROLL TO TOP
   ========================================= */

const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    // Jika scroll lebih dari 300px dari atas
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    // Fungsi bawaan browser untuk scroll halus ke atas
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =========================================
   LOGIKA FIX NAVIGATION (PASTI JALAN)
   ========================================= */
const nav = document.querySelector('.bottom-header');
const topHeaderHeight = document.querySelector('.top-header').offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > topHeaderHeight) {
        nav.classList.add('fixed-nav');
        // Tambahkan padding di body agar konten tidak "lompat" saat nav jadi fixed
        document.body.style.paddingTop = nav.offsetHeight + 'px';
    } else {
        nav.classList.remove('fixed-nav');
        document.body.style.paddingTop = '0';
    }
});

/* =========================================
   LOGIKA SCROLL SPY (INDIKATOR MENU AKTIF)
   ========================================= */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        // Kita kurangi 100px agar deteksi pindah lebih cepat sebelum sampai ke section
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        // Mencari link navigasi yang href-nya sama dengan ID section
        const navItem = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (navItem) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItem.classList.add('active-link');
            } else {
                navItem.classList.remove('active-link');
            }
        }
    });
});

////// KOLOM PENCARIAN/////
// 1. Ambil elemen form dan input
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// 2. Tambahkan "Event Listener" untuk mendeteksi saat tombol Cari ditekan
searchForm.addEventListener('submit', function (event) {

    // 3. Cegah form agar tidak pindah halaman/refresh
    event.preventDefault();

    // 4. Ambil nilai yang diketik user
    const keyword = searchInput.value;

    // 5. Tampilkan pesan sesuai permintaan di gambar
    alert(`Aduhhh: Sayang!!! Pencarian "${keyword}" atau Fitur pencarian produk ini sedang dikembangkan!`);
});

////GALLERY PRODUK DETAIL STYLES////
function changeImage(element) {
    // 1. Ambil ID gambar utama
    const mainImg = document.getElementById('mainImg');

    // 2. Ubah src gambar utama dengan src thumbnail yang diklik
    mainImg.style.opacity = '0'; // Efek transisi halus (fade out)

    setTimeout(() => {
        mainImg.src = element.src;
        mainImg.style.opacity = '1'; // Fade in kembali
    }, 200);

    // 3. Update status 'active' pada border thumbnail
    const thumbnails = document.querySelectorAll('.thumb');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    element.classList.add('active');
}