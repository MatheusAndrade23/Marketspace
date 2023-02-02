import axios, { AxiosInstance, AxiosError } from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://192.168.11.8:3333",
});

export { api };
