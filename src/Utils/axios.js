import axios from "axios";

const api = axios.create({
    baseURL:"https://todaily-be.herokuapp.com"
});

export default api;
