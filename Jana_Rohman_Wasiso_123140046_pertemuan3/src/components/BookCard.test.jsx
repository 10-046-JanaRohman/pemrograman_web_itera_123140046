import { fireEvent, render, screen } from "@testing-library/react";
import BookCard from "./BookCard";

const book = { id: "test-1", title: "Belajar React", author: "Jana", genre: "Teknologi", status: "baca", favorite: false };

describe("BookCard", () => {
  test("menampilkan judul, penulis, dan status buku", () => {
    render(<BookCard book={book} onEdit={vi.fn()} onRemove={vi.fn()} onToggleFavorite={vi.fn()} />);
    expect(screen.getByText("Belajar React")).toBeInTheDocument();
    expect(screen.getByText("oleh Jana")).toBeInTheDocument();
    expect(screen.getByText("Sedang dibaca")).toBeInTheDocument();
  });

  test("memanggil toggle favorit saat tombol hati diklik", () => {
    const onToggleFavorite = vi.fn();
    render(<BookCard book={book} onEdit={vi.fn()} onRemove={vi.fn()} onToggleFavorite={onToggleFavorite} />);
    fireEvent.click(screen.getByRole("button", { name: "Favoritkan Belajar React" }));
    expect(onToggleFavorite).toHaveBeenCalledWith("test-1");
  });

  test("memanggil hapus saat tombol Hapus diklik", () => {
    const onRemove = vi.fn();
    render(<BookCard book={book} onEdit={vi.fn()} onRemove={onRemove} onToggleFavorite={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Hapus" }));
    expect(onRemove).toHaveBeenCalledWith("test-1");
  });
});
