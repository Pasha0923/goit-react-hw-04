import { useState, useEffect, useRef } from "react";
import requestImages from "./services/api";
import "./App.css";

function App() {
  const [page, setPage] = useState(1); // Стан для зберігання поточної сторінки результатів
  const [images, setImages] = useState([]); // Стан для зберігання списку зображень
  const [loadingMore, setLoadingMore] = useState(false); // Стан для відображення завантаження основного контенту
  const [isloading, setIsLoading] = useState(false); // Стан для відображення завантаження індикатору завантаження
  const [searchQuery, setSearchQuery] = useState(""); // Стан для зберігання поточного пошукового запиту
  const [isError, setIsError] = useState(false); //Стан для відображення помилки

  const itemRef = useRef(null);
  const heightRef = useRef(null);

  const btnRef = useRef();

  useEffect(() => {
    if (itemRef.current) {
      const height = itemRef.current.getBoundingClientRect().height;
      heightRef.current = height;
      console.log(heightRef.current);
    }
  });

  useEffect(() => console.log(btnRef.current));
  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchPicturesByQuery() {
      try {
        setLoadingMore(false);
        setIsLoading(true);
        setIsError(false);
        const data = await requestImages(searchQuery, page);
        console.log(data.results);

        if (data.total === 0) {
          console.log("nothing found");
        }

        if (data.total_pages > page) {
          setLoadingMore(true);
        }
        console.log(data.total_pages);
        console.log(data.total);

        setImages((prevState) => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPicturesByQuery();
  }, [searchQuery, page, heightRef]);
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery ref={itemRef} images={images} />
      {isloading && <Loader />}
      {loadingMore && <LoadMoreBtn ref={btnRef} onLoadMore={handleLoadMore} />}
      <ImageModal />
    </>
  );
}

export default App;
