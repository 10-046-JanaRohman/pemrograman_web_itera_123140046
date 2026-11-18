"""Class Member untuk pengelolaan peminjaman anggota perpustakaan."""

from library_item import LibraryItem


class Member:
    """Merepresentasikan anggota dan daftar item yang sedang dipinjamnya."""

    def __init__(self, member_id: str, nama: str) -> None:
        """Membuat anggota dengan daftar pinjaman kosong."""
        self.member_id = member_id
        self.nama = nama
        self.__daftar_pinjaman: list[LibraryItem] = []

    @property
    def daftar_pinjaman(self) -> tuple[LibraryItem, ...]:
        """Memberikan salinan immutable daftar pinjaman untuk keamanan data."""
        return tuple(self.__daftar_pinjaman)

    def pinjam_item(self, item: LibraryItem) -> bool:
        """Meminjam item bila tersedia dan menyimpannya pada daftar anggota."""
        if not item.pinjam():
            print(f"Gagal: {item.judul} sedang dipinjam anggota lain.")
            return False

        self.__daftar_pinjaman.append(item)
        print(f"Sukses: {self.nama} meminjam {item}.")
        return True

    def kembalikan_item(self, item: LibraryItem, hari_terlambat: int = 0) -> float:
        """Mengembalikan item dan menghitung denda sesuai jenis item."""
        if hari_terlambat < 0:
            raise ValueError("Hari keterlambatan tidak boleh bernilai negatif.")
        if item not in self.__daftar_pinjaman:
            print(f"Gagal: {item.judul} tidak tercatat pada pinjaman {self.nama}.")
            return 0.0

        self.__daftar_pinjaman.remove(item)
        item.kembalikan()
        denda = item.hitung_denda(hari_terlambat)
        print(f"Sukses: {self.nama} mengembalikan {item}.")
        if denda > 0:
            print(f"Denda keterlambatan ({hari_terlambat} hari): Rp{denda:,.0f}")
        else:
            print("Tidak ada denda keterlambatan.")
        return denda

    def tampilkan_pinjaman(self) -> None:
        """Mencetak seluruh item yang sedang dipinjam anggota."""
        print(f"\nPinjaman aktif {self.nama}:")
        if not self.__daftar_pinjaman:
            print("- Tidak ada item yang sedang dipinjam.")
            return
        for nomor, item in enumerate(self.__daftar_pinjaman, start=1):
            print(f"{nomor}. {item}")

