import { useMemo } from "react";

function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const countStatus = (status) => books.filter((book) => book.status === status).length;
    const owned = countStatus("milik");
    const reading = countStatus("baca");
    const wishlist = countStatus("beli");
    const favorites = books.filter((book) => book.favorite).length;
    return { total, owned, reading, wishlist, favorites, readingRate: total ? Math.round((reading / total) * 100) : 0 };
  }, [books]);
}

export default useBookStats;
