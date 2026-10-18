import { NavLink } from "react-router-dom";
import { useBooks } from "../context/BookContext";

function Navbar() {
  const { stats } = useBooks();
  return (
    <header className="topbar">
      <nav className="nav-shell" aria-label="Navigasi utama">
        <NavLink className="brand" to="/"><span className="brand-mark">L</span><span>litera<span className="brand-dot">.</span></span></NavLink>
        <div className="nav-links">
          <NavLink to="/" end>Beranda</NavLink>
          <NavLink to="/koleksi">Koleksi</NavLink>
          <NavLink to="/tentang">Tentang</NavLink>
        </div>
        <div className="shelf-counter"><span>◫</span>{stats.total} buku</div>
      </nav>
    </header>
  );
}

export default Navbar;
