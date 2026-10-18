import { useMemo, useState } from "react";
import BookFilter from "../components/BookFilter";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { useBooks } from "../context/BookContext";

function Collection() {
  const { books, stats, updateBook, removeBook, toggleFavorite } = useBooks();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editingBook, setEditingBook] = useState(null);
  const visibleBooks = useMemo(() => books.filter((book) => (status === "all" || book.status === status) && `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase())), [books, query, status]);
  const saveEdit = (changes) => { updateBook(editingBook.id, changes); setEditingBook(null); };

  return <main className="page-shell inner-page"><section className="page-heading"><p className="eyebrow">CATALOGUE VIEW</p><h1>Jelajahi seluruh <em>koleksi.</em></h1><p>{stats.total} buku tersimpan di rak pribadi Jana. Gunakan pencarian dan filter untuk menemukan buku dengan cepat.</p></section>{editingBook && <section className="inline-editor"><BookForm onSubmit={saveEdit} initialBook={editingBook} onCancel={() => setEditingBook(null)} /></section>}<section className="catalogue"><BookFilter query={query} status={status} onQueryChange={setQuery} onStatusChange={setStatus} /><BookList books={visibleBooks} onEdit={setEditingBook} onRemove={removeBook} onToggleFavorite={toggleFavorite} /></section></main>;
}

export default Collection;
