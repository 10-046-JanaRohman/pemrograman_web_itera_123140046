import PropTypes from "prop-types";

const statusLabel = { milik: "Milik", baca: "Sedang dibaca", beli: "Ingin dibeli" };

function BookCard({ book, onEdit, onRemove, onToggleFavorite }) {
  return (
    <article className="book-card">
      <div className={`book-cover ${book.status}`}><span className="cover-line"></span><span>{book.genre.slice(0, 1).toUpperCase()}</span><small>LITERA</small></div>
      <div className="book-info"><div className="book-heading"><span className={`status-tag ${book.status}`}>{statusLabel[book.status]}</span><button className={`favorite-button ${book.favorite ? "active" : ""}`} type="button" onClick={() => onToggleFavorite(book.id)} aria-label={`Favoritkan ${book.title}`}>♥</button></div><h3>{book.title}</h3><p className="author">oleh {book.author}</p><p className="genre">{book.genre}</p><div className="book-actions"><button type="button" onClick={() => onEdit(book)}>Edit</button><button className="delete" type="button" onClick={() => onRemove(book.id)}>Hapus</button></div></div>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({ id: PropTypes.string.isRequired, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, genre: PropTypes.string.isRequired, status: PropTypes.oneOf(["milik", "baca", "beli"]).isRequired, favorite: PropTypes.bool.isRequired }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired
};

export default BookCard;
