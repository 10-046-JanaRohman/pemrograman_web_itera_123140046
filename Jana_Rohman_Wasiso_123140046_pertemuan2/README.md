# RuangKampus - Personal Dashboard

> Tugas Praktikum Pengembangan Aplikasi Web - Pertemuan 2: JavaScript Next Gen (ES6+)

## Identitas

| Keterangan | Isi |
| --- | --- |
| Nama | Jana Rohman Wasiso |
| NIM | 123140046 |
| Kelas Praktikum | Belum diinformasikan |

## Deskripsi

**RuangKampus** adalah personal dashboard produktivitas untuk mahasiswa. Aplikasi membantu mencatat agenda kuliah secara cepat, melihat prioritas, memantau progres tugas, dan mendapatkan kutipan motivasi harian. Data tugas tetap tersimpan di browser sehingga agenda tidak hilang saat halaman dimuat ulang.

## Fitur Utama

- CRUD agenda: tambah, edit, tandai selesai, hapus, dan bersihkan seluruh tugas selesai.
- Pencarian serta filter tugas berdasarkan semua tugas, hari ini, belum selesai, atau selesai.
- Ringkasan total tugas, tenggat hari ini, tugas selesai, dan progres mingguan.
- Penyimpanan data persisten menggunakan `localStorage` dan `JSON.stringify()`/`JSON.parse()`.
- Widget kutipan motivasi dari DummyJSON Quotes memakai `fetch()` dan `async`/`await`, dengan fallback offline.
- Desain responsif untuk desktop serta ponsel.

## Struktur Folder

```text
Jana_Rohman_Wasiso_123140046_pertemuan2/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── app.js
│   └── modules/
│       ├── data.js
│       └── utils.js
├── screenshots/
└── README.md
```

## Implementasi ES6+

| Fitur | Lokasi | Implementasi |
| --- | --- | --- |
| `let` dan `const` | `js/app.js:4`, `js/app.js:101` | Konstanta `STORAGE_KEY` memakai `const`; hasil filter yang diperbarui memakai `let filteredTasks`. |
| Arrow functions | `js/modules/utils.js:1`, `js/modules/utils.js:3`, `js/modules/utils.js:5`, `js/main.js:12` | Fungsi `formatLongDate`, `formatShortDate`, `isToday`, serta `getFormData` menggunakan sintaks arrow. |
| Template literals | `js/app.js:127`, `js/app.js:147` | `taskTemplate()` merender kartu tugas dinamis dan `loadQuote()` membentuk teks kutipan. |
| Classes | `js/app.js:7`, `js/app.js:31` | `TaskItem` memodelkan data tugas dan `DashboardApp` mengelola state, DOM, `localStorage`, serta API. |
| Destructuring | `js/app.js:8`, `js/app.js:100`, `js/main.js:18` | Destructuring parameter diterapkan pada `TaskItem`, `getSummary`, dan form edit. |
| Spread operator | `js/app.js:19`, `js/app.js:23`, `js/app.js:60` | Data disalin secara immutable pada `toggle()`, `update()`, dan saat menambah tugas. |
| Array methods | `js/app.js:66`, `js/app.js:101` | `map()`, `filter()`, `find()`, `sort()`, dan `some()` mengelola agenda. |
| Async/Await | `js/app.js:137` | `async loadQuote()` mengambil kutipan dari API DummyJSON dengan `try`/`catch`/`finally`. |
| ES modules | `index.html:91`, `js/main.js:1` | Entry point menggunakan `type="module"` serta `import`/`export`. |

## Menjalankan Aplikasi

1. Buka folder `Jana_Rohman_Wasiso_123140046_pertemuan2` di Visual Studio Code.
2. Jalankan `index.html` dengan ekstensi **Live Server**. Ini diperlukan karena aplikasi menggunakan JavaScript module.
3. Buka alamat yang diberikan Live Server di browser.
4. Tambahkan agenda melalui formulir, gunakan filter/pencarian, lalu muat ulang halaman untuk memeriksa `localStorage`.

## Tangkapan Layar

### Dashboard utama
![Dashboard utama](screenshots/01-dashboard-utama.png)

### Validasi dan tambah agenda
![Validasi form agenda](screenshots/02-validasi-form.png)

### Edit dan progres agenda
![Edit serta progres agenda](screenshots/03-edit-dan-progres.png)

## API Publik

- [DummyJSON Quotes](https://dummyjson.com/quotes/random) untuk kutipan motivasi.
