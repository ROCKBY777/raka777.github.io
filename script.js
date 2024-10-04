// JavaScript untuk mengubah gambar setiap 3 detik
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
  // Hilangkan gambar aktif saat ini
  slides[currentSlide].classList.remove('active');

  // Pindah ke gambar berikutnya, atau kembali ke awal jika sudah di akhir
  currentSlide = (currentSlide + 1) % slides.length;

  // Tampilkan gambar berikutnya dengan menambahkan kelas 'active'
  slides[currentSlide].classList.add('active');
}

// Ubah gambar setiap 3 detik
setInterval(showNextSlide, 5000);

// readmore js
function toggleReadMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readMoreBtn");

  if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read More"; 
      moreText.style.display = "none";
  } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read Less"; 
      moreText.style.display = "inline";
  }
}
//  animasi scrolling
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();  // Mencegah perilaku default anchor

      // Scroll ke elemen dengan id yang sesuai dengan link
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth',   // Efek smooth scrolling
          block: 'start',       // Bagian mana dari elemen yang ingin kita tampilkan
      });
  });
});

// animasi experience
 // Menambahkan event listener ke setiap border pengalaman
 document.querySelectorAll('.experience-border').forEach(border => {
  border.addEventListener('click', function() {
      const description = this.querySelector('.experience-description');
      const isVisible = description.style.display === 'block';

      // Toggling visibility of the description
      description.style.display = isVisible ? 'none' : 'block';

      // Menambahkan animasi saat menampilkan deskripsi
      if (!isVisible) {
          description.style.opacity = 0; // Memulai dari transparan
          description.style.transition = 'opacity 0.5s'; // Transisi selama 0.5 detik
          setTimeout(() => {
              description.style.opacity = 1; // Menampilkan deskripsi secara perlahan
          }, 50); // Sedikit delay untuk memulai transisi
      } else {
          description.style.opacity = 1; // Jika sedang terlihat
          description.style.transition = 'opacity 0.5s';
          setTimeout(() => {
              description.style.opacity = 0; // Memudarkan deskripsi
          }, 50); // Sedikit delay untuk memulai transisi
      }
  });
});
