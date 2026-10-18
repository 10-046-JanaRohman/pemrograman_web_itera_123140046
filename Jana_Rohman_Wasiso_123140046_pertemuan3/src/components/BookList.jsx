import PropTypes from "prop-types";
import BookCard from "./BookCard";

function BookList({ books, onEdit, onRemove, onToggleFavorite }) {
  if (!books.length) return <div className="empty-state"><span>⌁</span><h3>Rak ini masih kosong.</h3><p>Coba ubah pencarian atau tambahkan buku baru ke koleksi.</p></div>;
  return <div className="book-grid">{books.map((book) => <BookCard key={book.id} book={book} onEdit={onEdit} onRemove={onRemove} onToggleFavorite={onToggleFavorite} />)}</div>;
}

BookList.propTypes = { books: PropTypes.arrayOf(PropTypes.object).isRequired, onEdit: PropTypes.func.isRequired, onRemove: PropTypes.func.isRequired, onToggleFavorite: PropTypes.func.isRequired };

export default BookList;
