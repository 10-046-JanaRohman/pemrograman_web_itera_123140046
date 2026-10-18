import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import useBookStats from "../hooks/useBookStats";
import useLocalStorage from "../hooks/useLocalStorage";

const BookContext = createContext(null);

const initialBooks = [
  { id: "book-1", title: "Laut Bercerita", author: "Leila S. Chudori", genre: "Fiksi", status: "milik", favorite: true, createdAt: "2026-10-18" },
  { id: "book-2", title: "Atomic Habits", author: "James Clear", genre: "Pengembangan Diri", status: "baca", favorite: false, createdAt: "2026-10-18" },
  { id: "book-3", title: "Filosofi Teras", author: "Henry Manampiring", genre: "Psikologi", status: "beli", favorite: true, createdAt: "2026-10-18" }
];

const createId = () => globalThis.crypto?.randomUUID?.() ?? `book-${Date.now()}`;

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks harus digunakan di dalam BookProvider.");
  return context;
}

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage("litera-books-123140046", initialBooks);
  const stats = useBookStats(books);

  // Context menyatukan data buku dan seluruh aksi CRUD untuk semua halaman.
  const value = useMemo(() => ({
    books,
    stats,
    addBook: (book) => setBooks((current) => [...current, { ...book, id: createId(), favorite: false, createdAt: new Date().toISOString() }]),
    updateBook: (id, changes) => setBooks((current) => current.map((book) => book.id === id ? { ...book, ...changes } : book)),
    removeBook: (id) => setBooks((current) => current.filter((book) => book.id !== id)),
    toggleFavorite: (id) => setBooks((current) => current.map((book) => book.id === id ? { ...book, favorite: !book.favorite } : book))
  }), [books, setBooks, stats]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = { children: PropTypes.node.isRequired };
