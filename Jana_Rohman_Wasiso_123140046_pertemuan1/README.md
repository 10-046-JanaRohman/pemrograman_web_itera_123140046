# KantinKu POS

> Tugas Praktikum Pengembangan Aplikasi Web - Pertemuan 1: JavaScript Dasar

## Identitas

| Keterangan | Isi |
| --- | --- |
| Nama | Jana Rohman Wasiso |
| NIM | 123140046 |
| Kelas Praktikum | Belum diinformasikan |

## Deskripsi Aplikasi

**KantinKu POS** adalah aplikasi kasir dan keranjang belanja sederhana untuk skenario kantin atau toko kampus. Aplikasi dibuat untuk menggabungkan materi dasar JavaScript: validasi input form, event handler, fungsi perhitungan, manipulasi DOM, array, serta penyimpanan data menggunakan `localStorage`.

## Fitur

- [x] Validasi nama barang minimal 3 karakter.
- [x] Validasi harga satuan berupa angka dengan nilai minimum Rp500.
- [x] Validasi jumlah sebagai bilangan bulat minimum 1.
- [x] Pesan kesalahan berwarna merah di bawah input yang tidak valid.
- [x] Tabel keranjang dengan nomor, nama, harga, jumlah, subtotal, dan tombol hapus.
- [x] Perhitungan subtotal dan total belanja otomatis.
- [x] Diskon otomatis 10% untuk total belanja minimal Rp50.000.
- [x] Kalkulator uang bayar dan kembalian, termasuk pemberitahuan ketika uang kurang.
- [x] Penyimpanan keranjang melalui `localStorage` agar tetap tersedia setelah halaman dimuat ulang.
- [x] Tombol transaksi baru untuk mengosongkan keranjang dan `localStorage`.
- [x] Tampilan responsif untuk layar desktop dan ponsel.

## Struktur Proyek

```text
Jana_123140046_pertemuan1/
├── index.html                  # Struktur aplikasi
├── style.css                   # Tampilan antarmuka
├── script.js                   # Logika aplikasi kasir
├── README.md                   # Dokumentasi proyek
├── screenshots/                # Bukti tampilan aplikasi
└── modul/
    ├── latihan-javascript-dasar.js
    └── README.md
```

## Panduan Menjalankan

1. Unduh atau clone repositori ini.
2. Buka folder proyek dengan Visual Studio Code.
3. Jalankan `index.html` menggunakan ekstensi **Live Server**, atau buka file tersebut langsung melalui browser.
4. Isi nama barang, harga satuan, dan jumlah, kemudian pilih **Tambah ke keranjang**.

## Penjelasan Teknis

1. **Validasi input** - saat form dikirim, fungsi `validateItemForm()` memastikan nama memiliki sedikitnya tiga karakter, harga minimal Rp500, dan jumlah adalah bilangan bulat minimal satu. Data yang tidak valid tidak akan ditambahkan.
2. **Kalkulator transaksi** - fungsi `getCartSummary()` menggunakan `reduce()` untuk menjumlahkan seluruh subtotal barang. Bila subtotal mencapai Rp50.000, sistem memberi diskon 10%. Fungsi `updatePayment()` kemudian membandingkan uang bayar dengan total akhir untuk menghitung kembalian atau kekurangan.
3. **Keranjang dan localStorage** - data keranjang disimpan dengan `JSON.stringify()` pada setiap perubahan. Ketika aplikasi dibuka kembali, `loadCart()` memulihkan data melalui `JSON.parse()` dan memvalidasinya sebelum dirender ke tabel.
4. **Manipulasi DOM** - fungsi `renderCart()` membangun tabel keranjang dan ringkasan pembayaran secara dinamis. Event listener menangani penambahan, penghapusan item, perhitungan uang bayar, dan reset transaksi.

## Tangkapan Layar

### Tampilan form input utama
![Tampilan form input utama](screenshots/01-tampilan-utama.png)

### Validasi input
![Pesan validasi error](screenshots/02-validasi-error.png)

### Perhitungan dan tabel keranjang
![Tabel keranjang serta hasil perhitungan](screenshots/03-keranjang-dan-perhitungan.png)

## Repository

Repository publik yang dituju: `https://github.com/10-046-JanaRohman/pemrograman_web_itera_123140046`
