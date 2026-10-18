import { useBooks } from "../context/BookContext";

function About() {
  const { stats } = useBooks();
  return <main className="page-shell inner-page"><section className="about-hero"><p className="eyebrow">TENTANG LITERA</p><h1>Rak digital untuk<br /><em>pembaca yang bertumbuh.</em></h1><p>Litera dibuat sebagai aplikasi Manajemen Buku Pribadi untuk Praktikum Pengembangan Aplikasi Web. Aplikasi ini mengubah daftar buku sederhana menjadi pengalaman mencatat yang lebih hangat dan terorganisasi.</p></section><section className="about-grid"><article><span>01</span><h2>React components</h2><p>Antarmuka tersusun dari komponen reusable untuk navigasi, formulir, filter, kartu buku, daftar buku, dan statistik.</p></article><article><span>02</span><h2>State yang persisten</h2><p>Context API dan custom hook menyimpan koleksi secara otomatis, sehingga {stats.total} buku di rak tetap tersedia setelah halaman dimuat ulang.</p></article><article><span>03</span><h2>Navigasi tanpa reload</h2><p>React Router menyediakan halaman Beranda, Koleksi, Tentang, dan halaman 404 dalam satu SPA yang lancar.</p></article></section><section className="tech-callout"><div><p className="eyebrow">DIBUAT OLEH</p><h2>Jana Rohman Wasiso</h2><p>123140046 · PAW RB · Pertemuan 3</p></div><span aria-hidden="true">L</span></section></main>;
}

export default About;
