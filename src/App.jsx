import { useState, useEffect } from "react";
import requestImages from "./services/api";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

function App() {
  const [page, setPage] = useState(1); // Стан для зберігання поточної сторінки результатів
  const [images, setImages] = useState([]); // Стан для зберігання списку зображень
  const [loadingMore, setLoadingMore] = useState(false); // Стан для відображення завантаження основного контенту
  const [isloading, setIsLoading] = useState(false); // Стан для відображення завантаження індикатору завантаження
  const [searchQuery, setSearchQuery] = useState(""); // Стан для зберігання поточного пошукового запиту
  const [isError, setIsError] = useState(false); //Стан для відображення помилки
  const [selectedImage, setSelectedImage] = useState(null); // Стан для зберігання вибраного зображення для модального вікна
  const [modalIsOpen, setModalIsOpen] = useState(false); // Стан для відображення/приховування модального вікна

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchPicturesByQuery() {
      try {
        setLoadingMore(false);
        setIsLoading(true);
        setIsError(false);
        const data = await requestImages(searchQuery, page);
        // console.log(data.results);

        if (data.total_pages > page) {
          setLoadingMore(true);
        }

        setImages((prevState) => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPicturesByQuery();
  }, [searchQuery, page]);
  // Функція приймає строку з пошуковим запитом і встановлюємо її в state
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  function openModal(image) {
    setSelectedImage(image);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <>
      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery images={images} openModal={openModal} />
      {isloading && <Loader />}
      {loadingMore && <LoadMoreBtn loadMore={handleLoadMore} />}
      {selectedImage && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </>
  );
}

export default App;
