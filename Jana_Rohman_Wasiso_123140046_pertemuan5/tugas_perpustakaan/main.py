"""Driver pengujian Sistem Manajemen Perpustakaan berbasis OOP."""

from library import Library
from library_item import Book, Magazine
from member import Member


def tampilkan_hasil_pencarian(perpustakaan: Library, keyword: str) -> None:
    """Mencari item lalu mencetak hasil pencarian berdasarkan keyword."""
    hasil = perpustakaan.cari_item(keyword)
    print(f"\nHasil pencarian untuk '{keyword}':")
    if not hasil:
        print("- Item tidak ditemukan.")
        return
    for item in hasil:
        print(f"- {item}")


def main() -> None:
    """Menjalankan skenario katalog, member, pinjam, cari, dan kembali."""
    perpustakaan = Library("Perpustakaan Cendekia ITERA")

    buku_laut = Book(
        "BK-001", "Laut Bercerita", 2017, "Fiksi", "Leila S. Chudori", 379, "Novel"
    )
    buku_clean_code = Book(
        "BK-002", "Clean Code", 2008, "Teknologi", "Robert C. Martin", 464, "Pemrograman"
    )
    majalah_national = Magazine(
        "MG-001", "National Geographic", 2026, "Sains", 24, "Oktober"
    )
    majalah_time = Magazine("MG-002", "TIME", 2026, "Berita", 18, "September")

    for item in (buku_laut, buku_clean_code, majalah_national, majalah_time):
        perpustakaan.tambah_item(item)

    jana = Member("MB-046", "Jana Rohman Wasiso")
    adelia = Member("MB-183", "Adelia Ramadani")
    perpustakaan.registrasi_member(jana)
    perpustakaan.registrasi_member(adelia)

    perpustakaan.tampilkan_katalog()

    print("\n--- SKENARIO PEMINJAMAN ---")
    jana.pinjam_item(buku_laut)
    adelia.pinjam_item(buku_laut)
    adelia.pinjam_item(majalah_national)
    jana.tampilkan_pinjaman()
    adelia.tampilkan_pinjaman()

    tampilkan_hasil_pencarian(perpustakaan, "code")
    tampilkan_hasil_pencarian(perpustakaan, "MG-001")

    print("\n--- SKENARIO PENGEMBALIAN ---")
    jana.kembalikan_item(buku_laut)
    adelia.kembalikan_item(majalah_national, hari_terlambat=3)

    perpustakaan.tampilkan_katalog(hanya_tersedia=True)


if __name__ == "__main__":
    main()

