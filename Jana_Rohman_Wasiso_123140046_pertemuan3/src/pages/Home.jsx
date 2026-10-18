import { useMemo, useState } from "react";
import BookFilter from "../components/BookFilter";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import StatCard from "../components/StatCard";
import { useBooks } from "../context/BookContext";

function Home() {
  const { books, stats, addBook, updateBook, removeBook, toggleFavorite } = useBooks();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editingBook, setEditingBook] = useState(null);
  const visibleBooks = useMemo(() => books.filter((book) => (status === "all" || book.status === status) && `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase())), [books, query, status]);
  const handleSave = (book) => {
    if (editingBook) {
      updateBook(editingBook.id, book);
      setEditingBook(null);
    } else {
      addBook(book);
    }
  };

  return <main className="page-shell"><section className="hero"><div><p className="eyebrow">PERSONAL LIBRARY · 2026</p><h1>Temukan cerita,<br /><em>rawat koleksimu.</em></h1><p className="hero-copy">Litera adalah sudut kecil untuk mencatat buku yang sudah kamu miliki, sedang dibaca, dan ingin kamu temukan berikutnya.</p></div><div className="quote-note"><span>“</span><p>Setiap buku adalah perjalanan yang menunggu untuk dimulai.<small>— Ruang baca Jana</small></p></div></section><section className="stat-grid" aria-label="Statistik koleksi"><StatCard icon="◫" value={stats.total} label="Total koleksi" /><StatCard icon="◷" value={stats.reading} label="Sedang dibaca" tone="orange" /><StatCard icon="♥" value={stats.favorites} label="Buku favorit" tone="rose" /><article className="reading-progress"><div><span>Fokus baca saat ini</span><strong>{stats.readingRate}%</strong></div><div className="progress-track"><span style={{ width: `${stats.readingRate}%` }} /></div><p>{stats.reading ? "Ada buku yang sedang menemanimu." : "Pilih satu buku untuk mulai dibaca."}</p></article></section><section className="library-layout"><aside className="form-panel"><BookForm onSubmit={handleSave} initialBook={editingBook} onCancel={() => setEditingBook(null)} /><div className="shelf-tip"><span>✦</span><p><strong>Tip kecil</strong><br />Simpan buku yang ingin dibeli agar daftar bacaanmu tetap terarah.</p></div></aside><section className="collection-panel"><div className="section-heading"><div><p className="eyebrow">RAK PILIHAN</p><h2>Koleksimu, dalam satu pandangan.</h2></div><span className="result-count">{visibleBooks.length} buku</span></div><BookFilter query={query} status={status} onQueryChange={setQuery} onStatusChange={setStatus} /><BookList books={visibleBooks} onEdit={setEditingBook} onRemove={removeBook} onToggleFavorite={toggleFavorite} /></section></section></main>;
}

export default Home;
