import { fireEvent, render, screen } from "@testing-library/react";
import BookForm from "./BookForm";

describe("BookForm", () => {
  test("menampilkan error ketika judul dan penulis kosong", () => {
    render(<BookForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /Tambahkan buku/ }));
    expect(screen.getByText("Judul buku wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Nama penulis wajib diisi.")).toBeInTheDocument();
  });

  test("mengirim data buku yang valid", () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Judul buku"), { target: { value: "Clean Code" } });
    fireEvent.change(screen.getByLabelText("Penulis"), { target: { value: "Robert Martin" } });
    fireEvent.change(screen.getByLabelText("Genre"), { target: { value: "Teknologi" } });
    fireEvent.click(screen.getByRole("button", { name: /Tambahkan buku/ }));
    expect(onSubmit).toHaveBeenCalledWith({ title: "Clean Code", author: "Robert Martin", genre: "Teknologi", status: "milik" });
  });
});
