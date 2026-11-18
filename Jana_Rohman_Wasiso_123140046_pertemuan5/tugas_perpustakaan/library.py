"""Class Library sebagai pusat katalog dan keanggotaan perpustakaan."""

from library_item import LibraryItem
from member import Member


class Library:
    """Mengelola koleksi item dan anggota pada satu perpustakaan."""

    def __init__(self, nama_perpustakaan: str) -> None:
        """Membuat perpustakaan dengan katalog dan daftar anggota kosong."""
        self.nama_perpustakaan = nama_perpustakaan
        self.__koleksi_item: list[LibraryItem] = []
        self.__daftar_member: list[Member] = []

    @property
    def koleksi_item(self) -> tuple[LibraryItem, ...]:
        """Mengembalikan koleksi sebagai tuple agar tidak diubah dari luar."""
        return tuple(self.__koleksi_item)

    @property
    def daftar_member(self) -> tuple[Member, ...]:
        """Mengembalikan daftar member sebagai tuple yang aman dibaca."""
        return tuple(self.__daftar_member)

    def tambah_item(self, item: LibraryItem) -> None:
        """Menambahkan item baru ke katalog setelah memeriksa ID unik."""
        if any(koleksi.item_id == item.item_id for koleksi in self.__koleksi_item):
            raise ValueError(f"ID item {item.item_id} sudah terdaftar.")
        self.__koleksi_item.append(item)
        print(f"Katalog: {item} ditambahkan.")

    def registrasi_member(self, member: Member) -> None:
        """Mendaftarkan member baru setelah memeriksa ID member unik."""
        if any(anggota.member_id == member.member_id for anggota in self.__daftar_member):
            raise ValueError(f"ID member {member.member_id} sudah terdaftar.")
        self.__daftar_member.append(member)
        print(f"Member: {member.nama} berhasil terdaftar.")

    def cari_item(self, keyword: str) -> list[LibraryItem]:
        """Mengembalikan item dengan judul atau ID yang mengandung keyword."""
        kata_kunci = keyword.lower().strip()
        return [
            item
            for item in self.__koleksi_item
            if kata_kunci in item.judul.lower() or kata_kunci in item.item_id.lower()
        ]

    def tampilkan_katalog(self, hanya_tersedia: bool = False) -> None:
        """Mencetak katalog heterogen dengan polimorfisme get_detail()."""
        judul = "KATALOG ITEM TERSEDIA" if hanya_tersedia else "KATALOG PERPUSTAKAAN"
        print(f"\n{'=' * 68}\n{judul} — {self.nama_perpustakaan}\n{'=' * 68}")

        koleksi = [
            item for item in self.__koleksi_item if not hanya_tersedia or not item.is_dipinjam
        ]
        if not koleksi:
            print("Tidak ada item yang dapat ditampilkan.")
            return

        for nomor, item in enumerate(koleksi, start=1):
            print(f"{nomor}. {item.get_detail()}")
            print("-" * 68)

