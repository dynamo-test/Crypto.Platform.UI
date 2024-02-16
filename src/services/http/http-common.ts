import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7260/api/1/",
  headers: {
    "Content-type": "application/json",
  },
});
