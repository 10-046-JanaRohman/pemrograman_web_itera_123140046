"""Program penghitung BMI sederhana untuk praktikum Pertemuan 4."""


def hitung_bmi(berat_badan: float, tinggi_badan: float) -> float:
    """Menghitung BMI dari berat badan (kg) dan tinggi badan (m)."""
    if berat_badan <= 0 or tinggi_badan <= 0:
        raise ValueError("Berat badan dan tinggi badan harus lebih dari nol.")

    return berat_badan / (tinggi_badan**2)


def tentukan_kategori_bmi(bmi: float) -> str:
    """Mengembalikan kategori berat badan berdasarkan nilai BMI."""
    if bmi < 18.5:
        return "Berat badan kurang"
    if bmi < 25:
        return "Berat badan normal"
    if bmi < 30:
        return "Berat badan berlebih"
    return "Obesitas"


def main() -> None:
    """Menjalankan contoh perhitungan BMI Jana Rohman Wasiso."""
    nama = "Jana Rohman Wasiso"
    nim = "123140046"
    berat_badan = 64.0
    tinggi_badan = 1.70

    bmi = hitung_bmi(berat_badan, tinggi_badan)
    kategori = tentukan_kategori_bmi(bmi)

    print("=" * 52)
    print("       PENGHITUNG BODY MASS INDEX (BMI)")
    print("=" * 52)
    print(f"Nama          : {nama}")
    print(f"NIM           : {nim}")
    print("-" * 52)
    print(f"Berat badan   : {berat_badan:.1f} kg")
    print(f"Tinggi badan  : {tinggi_badan:.2f} m")
    print(f"Nilai BMI     : {bmi:.2f}")
    print(f"Kategori      : {kategori}")
    print("=" * 52)


if __name__ == "__main__":
    main()
