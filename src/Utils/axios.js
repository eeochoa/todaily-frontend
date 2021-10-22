import axios from "axios";

const api = axios.create({
    baseURL:"https://https://todaily-be.herokuapp.com/"
});

export default api;
