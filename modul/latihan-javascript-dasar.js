"use strict";

// Latihan mandiri materi JavaScript Dasar Pertemuan 1.
const mahasiswa = {
  nama: "Jana Rohman Wasiso",
  nim: "123140046",
  kotaAsal: "",
  usia: 19
};

const nilai = 85;
const statusKelulusan = nilai >= 70 ? "Lulus" : "Tidak lulus";
const kategoriUmur = mahasiswa.usia < 12 ? "Anak" : mahasiswa.usia <= 17 ? "Remaja" : mahasiswa.usia <= 59 ? "Dewasa" : "Lansia";
const hariInggris = ["Invalid", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function hitungFaktorial(angka) {
  if (!Number.isInteger(angka) || angka < 0) return null;
  let hasil = 1;
  for (let nilai = 2; nilai <= angka; nilai += 1) hasil *= nilai;
  return hasil;
}

function adalahPrima(angka) {
  if (!Number.isInteger(angka) || angka < 2) return false;
  for (let pembagi = 2; pembagi <= Math.sqrt(angka); pembagi += 1) {
    if (angka % pembagi === 0) return false;
  }
  return true;
}

function buatTabelPerkalian(angka) {
  return Array.from({ length: 10 }, (_, index) => `${angka} x ${index + 1} = ${angka * (index + 1)}`);
}

function fizzBuzz(batas = 100) {
  return Array.from({ length: batas }, (_, index) => {
    const angka = index + 1;
    return angka % 15 === 0 ? "FizzBuzz" : angka % 3 === 0 ? "Fizz" : angka % 5 === 0 ? "Buzz" : angka;
  });
}

console.table(mahasiswa);
console.log({ nilai, statusKelulusan, kategoriUmur, hari: hariInggris[1] });
console.log(buatTabelPerkalian(7));
console.log("5! =", hitungFaktorial(5), "| 17 prima =", adalahPrima(17));
console.log(fizzBuzz());
