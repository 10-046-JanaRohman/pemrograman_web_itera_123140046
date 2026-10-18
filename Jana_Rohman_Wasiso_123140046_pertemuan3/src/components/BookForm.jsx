import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const emptyBook = { title: "", author: "", genre: "", status: "milik" };

function BookForm({ onSubmit, initialBook = null, onCancel }) {
  const [form, setForm] = useState(initialBook ? { title: initialBook.title, author: initialBook.author, genre: initialBook.genre, status: initialBook.status } : emptyBook);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialBook ? { title: initialBook.title, author: initialBook.author, genre: initialBook.genre, status: initialBook.status } : emptyBook);
    setErrors({});
  }, [initialBook]);

  const handleChange = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Judul buku wajib diisi.";
    if (!form.author.trim()) nextErrors.author = "Nama penulis wajib diisi.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit({ ...form, title: form.title.trim(), author: form.author.trim(), genre: form.genre.trim() || "Umum" });
    if (!initialBook) setForm(emptyBook);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <div className="form-title"><div><span className="eyebrow">{initialBook ? "PERBARUI DATA" : "TAMBAH KE RAK"}</span><h2>{initialBook ? "Edit buku pilihan" : "Buku apa yang baru kamu temukan?"}</h2></div>{initialBook && <button className="close-form" type="button" onClick={onCancel} aria-label="Batal edit">×</button>}</div>
      <div className="field"><label htmlFor="book-title">Judul buku</label><input id="book-title" name="title" value={form.title} onChange={handleChange} placeholder="Contoh: Bumi Manusia" /><small>{errors.title}</small></div>
      <div className="field"><label htmlFor="book-author">Penulis</label><input id="book-author" name="author" value={form.author} onChange={handleChange} placeholder="Contoh: Pramoedya Ananta Toer" /><small>{errors.author}</small></div>
      <div className="two-fields"><div className="field"><label htmlFor="book-genre">Genre</label><input id="book-genre" name="genre" value={form.genre} onChange={handleChange} placeholder="Fiksi, Sains, ..." /></div><div className="field"><label htmlFor="book-status">Status</label><select id="book-status" name="status" value={form.status} onChange={handleChange}><option value="milik">Sudah dimiliki</option><option value="baca">Sedang dibaca</option><option value="beli">Ingin dibeli</option></select></div></div>
      <button className="primary-button" type="submit">{initialBook ? "Simpan perubahan" : "Tambahkan buku"}<span>→</span></button>
    </form>
  );
}

BookForm.propTypes = { onSubmit: PropTypes.func.isRequired, initialBook: PropTypes.shape({ title: PropTypes.string, author: PropTypes.string, genre: PropTypes.string, status: PropTypes.string }), onCancel: PropTypes.func };
BookForm.defaultProps = { initialBook: null, onCancel: () => {} };

export default BookForm;
