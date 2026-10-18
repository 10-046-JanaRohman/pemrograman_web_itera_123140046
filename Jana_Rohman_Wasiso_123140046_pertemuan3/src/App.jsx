import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BookProvider } from "./context/BookContext";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/koleksi" element={<Collection />} />
          <Route path="/tentang" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;
