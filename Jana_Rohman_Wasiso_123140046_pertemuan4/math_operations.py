"""Modul fungsi geometri dan konversi suhu untuk praktikum Pertemuan 4."""

PI = 3.14159


def luas_persegi(sisi: float) -> float:
    """Mengembalikan luas persegi dari panjang sisi yang diberikan."""
    return sisi**2


def keliling_persegi(sisi: float) -> float:
    """Mengembalikan keliling persegi dari panjang sisi yang diberikan."""
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Mengembalikan luas persegi panjang dari panjang dan lebar."""
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Mengembalikan keliling persegi panjang dari panjang dan lebar."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari: float) -> float:
    """Mengembalikan luas lingkaran dari nilai jari-jari."""
    return PI * (jari_jari**2)


def keliling_lingkaran(jari_jari: float) -> float:
    """Mengembalikan keliling lingkaran dari nilai jari-jari."""
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi suhu Celsius menjadi Fahrenheit."""
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi suhu Celsius menjadi Kelvin."""
    return celsius + 273.15
