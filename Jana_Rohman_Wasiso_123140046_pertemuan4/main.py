"""Program utama untuk mendemonstrasikan modul math_operations."""

import math_operations
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin


def main() -> None:
    """Menjalankan seluruh fungsi geometri dan konversi suhu dari modul."""
    sisi_persegi = 8
    panjang = 12
    lebar = 5
    jari_jari = 7
    suhu_celsius = 28

    print("=" * 58)
    print("       DEMO MODUL MATEMATIKA & KONVERSI SUHU")
    print("=" * 58)
    print("\n[1] BANGUN DATAR")
    print("-" * 58)
    print(f"Konstanta PI                 : {math_operations.PI}")
    print(f"Persegi (sisi {sisi_persegi})")
    print(f"  Luas                       : {math_operations.luas_persegi(sisi_persegi):.2f}")
    print(f"  Keliling                   : {math_operations.keliling_persegi(sisi_persegi):.2f}")
    print(f"Persegi panjang ({panjang} x {lebar})")
    print(
        f"  Luas                       : "
        f"{math_operations.luas_persegi_panjang(panjang, lebar):.2f}"
    )
    print(
        f"  Keliling                   : "
        f"{math_operations.keliling_persegi_panjang(panjang, lebar):.2f}"
    )
    print(f"Lingkaran (jari-jari {jari_jari})")
    print(f"  Luas                       : {math_operations.luas_lingkaran(jari_jari):.2f}")
    print(f"  Keliling                   : {math_operations.keliling_lingkaran(jari_jari):.2f}")

    print("\n[2] KONVERSI SUHU")
    print("-" * 58)
    print(f"Celsius                      : {suhu_celsius:.2f} °C")
    print(f"Celsius ke Fahrenheit        : {celsius_ke_fahrenheit(suhu_celsius):.2f} °F")
    print(f"Celsius ke Kelvin            : {celsius_ke_kelvin(suhu_celsius):.2f} K")
    print("=" * 58)


if __name__ == "__main__":
    main()
