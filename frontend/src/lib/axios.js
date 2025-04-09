import axios from "axios"

export const axioss = axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials: true, //minden requestel küldi a cookiekat,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}` //token küldése a headerben,
    },
})