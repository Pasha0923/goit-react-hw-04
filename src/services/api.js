import axios from "axios";

const ACCESS_KEY = "aW4itFl58kjMbbOWczZfnsXd9QNo6i-SQiRVHwZJpZY";
const requestImages = async (query, page) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );
  console.log(data);
  console.log(data.results);
  return data;
};

export default requestImages;
