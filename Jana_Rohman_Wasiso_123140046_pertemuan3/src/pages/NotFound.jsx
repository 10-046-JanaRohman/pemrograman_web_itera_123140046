import { Link } from "react-router-dom";

function NotFound() {
  return <main className="not-found"><span>404</span><h1>Halaman ini belum ada di rak.</h1><p>Mari kembali ke koleksi bukumu.</p><Link className="primary-button" to="/">Kembali ke beranda <span>→</span></Link></main>;
}

export default NotFound;
