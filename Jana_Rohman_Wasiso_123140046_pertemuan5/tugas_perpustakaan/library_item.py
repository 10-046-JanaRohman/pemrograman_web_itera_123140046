"""Model item perpustakaan dan turunannya untuk tugas OOP Pertemuan 5."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Kontrak dasar untuk seluruh item yang dapat dipinjam di perpustakaan."""

    def __init__(
        self, item_id: str, judul: str, tahun_terbit: int, kategori: str
    ) -> None:
        """Menyimpan identitas umum item dan status peminjaman awal."""
        self.item_id = item_id
        self.judul = judul
        self.tahun_terbit = tahun_terbit
        self._kategori = kategori
        self.__is_dipinjam = False

    @property
    def is_dipinjam(self) -> bool:
        """Mengembalikan status peminjaman tanpa membuka akses tulis langsung."""
        return self.__is_dipinjam

    @property
    def kategori(self) -> str:
        """Mengembalikan kategori item untuk ditampilkan pada katalog."""
        return self._kategori

    def pinjam(self) -> bool:
        """Menandai item dipinjam dan mengembalikan status keberhasilan."""
        if self.__is_dipinjam:
            return False
        self.__is_dipinjam = True
        return True

    def kembalikan(self) -> None:
        """Menandai item telah dikembalikan ke perpustakaan."""
        self.__is_dipinjam = False

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        """Menghitung denda sesuai jenis item dan hari keterlambatan."""

    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan informasi lengkap item dalam bentuk teks."""


class Book(LibraryItem):
    """Item buku dengan informasi penulis, halaman, dan genre."""

    TARIF_DENDA_HARIAN = 2_000

    def __init__(
        self,
        item_id: str,
        judul: str,
        tahun_terbit: int,
        kategori: str,
        penulis: str,
        jumlah_halaman: int,
        genre: str,
    ) -> None:
        """Membuat buku baru dengan data spesifiknya."""
        super().__init__(item_id, judul, tahun_terbit, kategori)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman
        self.genre = genre

    def hitung_denda(self, hari_terlambat: int) -> float:
        """Mengembalikan denda buku sebesar Rp2.000 per hari terlambat."""
        return max(0, hari_terlambat) * self.TARIF_DENDA_HARIAN

    def get_detail(self) -> str:
        """Mengembalikan detail buku untuk katalog perpustakaan."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[BUKU] {self.item_id} | {self.judul} ({self.tahun_terbit})\n"
            f"       Penulis: {self.penulis} | {self.jumlah_halaman} halaman\n"
            f"       Genre: {self.genre} | Status: {status}"
        )

    def __str__(self) -> str:
        """Menyajikan ringkasan buku saat objek dicetak langsung."""
        return f"Buku '{self.judul}' oleh {self.penulis}"


class Magazine(LibraryItem):
    """Item majalah dengan informasi edisi dan bulan terbit."""

    TARIF_DENDA_HARIAN = 1_000

    def __init__(
        self,
        item_id: str,
        judul: str,
        tahun_terbit: int,
        kategori: str,
        edisi: int,
        bulan_terbit: str,
    ) -> None:
        """Membuat majalah baru dengan data edisi dan bulan terbit."""
        super().__init__(item_id, judul, tahun_terbit, kategori)
        self.edisi = edisi
        self.bulan_terbit = bulan_terbit

    def hitung_denda(self, hari_terlambat: int) -> float:
        """Mengembalikan denda majalah sebesar Rp1.000 per hari terlambat."""
        return max(0, hari_terlambat) * self.TARIF_DENDA_HARIAN

    def get_detail(self) -> str:
        """Mengembalikan detail majalah untuk katalog perpustakaan."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[MAJALAH] {self.item_id} | {self.judul} ({self.tahun_terbit})\n"
            f"          Edisi: {self.edisi} | Bulan: {self.bulan_terbit}\n"
            f"          Kategori: {self.kategori} | Status: {status}"
        )

    def __str__(self) -> str:
        """Menyajikan ringkasan majalah saat objek dicetak langsung."""
        return f"Majalah '{self.judul}' edisi {self.edisi}"

