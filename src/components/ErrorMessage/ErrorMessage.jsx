import css from "./ErrorMessage.module.css";
import { BiError } from "react-icons/bi";

const ErrorMessage = ({ message = "" }) => {
  return (
    <div className={css.errorMessage}>
      <BiError size={36} />
      <p>
        {message.length > 0
          ? message
          : "Whoops, something went wrong! Please try reloading this page!"}
      </p>
    </div>
  );
};

export default ErrorMessage;
