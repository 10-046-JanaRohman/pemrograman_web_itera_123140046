import PropTypes from "prop-types";

function BookFilter({ query, status, onQueryChange, onStatusChange }) {
  return <div className="filter-bar"><label className="search-field"><span>⌕</span><input aria-label="Cari buku" value={query} onChange={({ target }) => onQueryChange(target.value)} placeholder="Cari judul atau penulis" /></label><div className="status-filter" role="group" aria-label="Filter status"><button className={status === "all" ? "active" : ""} onClick={() => onStatusChange("all")} type="button">Semua</button><button className={status === "milik" ? "active" : ""} onClick={() => onStatusChange("milik")} type="button">Milik</button><button className={status === "baca" ? "active" : ""} onClick={() => onStatusChange("baca")} type="button">Dibaca</button><button className={status === "beli" ? "active" : ""} onClick={() => onStatusChange("beli")} type="button">Ingin beli</button></div></div>;
}

BookFilter.propTypes = { query: PropTypes.string.isRequired, status: PropTypes.string.isRequired, onQueryChange: PropTypes.func.isRequired, onStatusChange: PropTypes.func.isRequired };

export default BookFilter;
