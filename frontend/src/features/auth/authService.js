import axios from "axios";
const authURL = "api/v1/users";

export const createNewUserFromBackend = async (userData) => {
    const response = await axios.post(`${authURL}/new-user`, userData);

    console.log(response.data);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    return response.data;
};

export const loginFromBackend = async (userData) => {
    const response = await axios.post(`${authURL}/login`, userData);

    console.log(response.data);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    return response.data;
};
