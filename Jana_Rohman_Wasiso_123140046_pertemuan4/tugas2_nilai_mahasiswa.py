"""Program pengelolaan data nilai mahasiswa untuk praktikum Pertemuan 4."""

from typing import Any


DATA_MAHASISWA: list[dict[str, Any]] = [
    {
        "nama": "Jana Rohman Wasiso",
        "nim": "123140046",
        "nilai_uts": 88,
        "nilai_uas": 92,
        "nilai_tugas": 90,
    },
    {
        "nama": "Adelia Ramadani",
        "nim": "123140183",
        "nilai_uts": 76,
        "nilai_uas": 81,
        "nilai_tugas": 84,
    },
    {
        "nama": "Aditya Hot Martua Sihite",
        "nim": "123140114",
        "nilai_uts": 67,
        "nilai_uas": 63,
        "nilai_tugas": 72,
    },
    {
        "nama": "Abel Fortino",
        "nim": "123140111",
        "nilai_uts": 54,
        "nilai_uas": 58,
        "nilai_tugas": 61,
    },
    {
        "nama": "Muhammad Rafi Ilham",
        "nim": "123140173",
        "nilai_uts": 42,
        "nilai_uas": 48,
        "nilai_tugas": 45,
    },
]


def hitung_nilai_akhir(nilai_uts: float, nilai_uas: float, nilai_tugas: float) -> float:
    """Menghitung nilai akhir dari bobot UTS 30%, UAS 40%, dan tugas 30%."""
    return (0.30 * nilai_uts) + (0.40 * nilai_uas) + (0.30 * nilai_tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """Mengembalikan grade A sampai E berdasarkan nilai akhir mahasiswa."""
    if nilai_akhir >= 80:
        return "A"
    if nilai_akhir >= 70:
        return "B"
    if nilai_akhir >= 60:
        return "C"
    if nilai_akhir >= 50:
        return "D"
    return "E"


def siapkan_data_nilai(
    data_mahasiswa: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Menyalin data mahasiswa lalu menambahkan nilai akhir dan grade."""
    data_lengkap = []
    for mahasiswa in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(
            mahasiswa["nilai_uts"],
            mahasiswa["nilai_uas"],
            mahasiswa["nilai_tugas"],
        )
        data_lengkap.append(
            {
                **mahasiswa,
                "nilai_akhir": nilai_akhir,
                "grade": tentukan_grade(nilai_akhir),
            }
        )
    return data_lengkap


def tampilkan_tabel(data_mahasiswa: list[dict[str, Any]]) -> None:
    """Mencetak data nilai mahasiswa dalam format tabel yang rapi."""
    garis = "+----+--------------------------+------------+------------+-------+"
    print(garis)
    print("| No | Nama                     | NIM        | Nilai Akhir| Grade |")
    print(garis)
    for nomor, mahasiswa in enumerate(data_mahasiswa, start=1):
        print(
            f"| {nomor:<2} | {mahasiswa['nama']:<24} | "
            f"{mahasiswa['nim']:<10} | {mahasiswa['nilai_akhir']:>10.2f} | "
            f"{mahasiswa['grade']:^5} |"
        )
    print(garis)


def tampilkan_ekstrem(data_mahasiswa: list[dict[str, Any]]) -> None:
    """Mencetak mahasiswa dengan nilai akhir tertinggi dan terendah."""
    tertinggi = max(data_mahasiswa, key=lambda mahasiswa: mahasiswa["nilai_akhir"])
    terendah = min(data_mahasiswa, key=lambda mahasiswa: mahasiswa["nilai_akhir"])

    print("\nRINGKASAN NILAI")
    print("-" * 52)
    print(
        f"Nilai tertinggi : {tertinggi['nama']} "
        f"({tertinggi['nilai_akhir']:.2f}, Grade {tertinggi['grade']})"
    )
    print(
        f"Nilai terendah  : {terendah['nama']} "
        f"({terendah['nilai_akhir']:.2f}, Grade {terendah['grade']})"
    )


def main() -> None:
    """Menjalankan pengolahan dan tampilan data nilai mahasiswa."""
    data_lengkap = siapkan_data_nilai(DATA_MAHASISWA)
    print("DATA NILAI MAHASISWA - PRAKTIKUM PEMROGRAMAN WEB")
    tampilkan_tabel(data_lengkap)
    tampilkan_ekstrem(data_lengkap)


if __name__ == "__main__":
    main()
