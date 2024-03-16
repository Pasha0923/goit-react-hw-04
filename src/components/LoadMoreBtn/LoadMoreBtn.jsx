import css from "./LoadMoreBtn.module.css";
 function LoadMoreBtn({ loadMore }) {
  return (
    <button className={css.button} onClick={() => loadMore()}>
      Load more
    </button>
  );
}
export default LoadMoreBtn;