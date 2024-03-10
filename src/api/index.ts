import { SERVER_URL } from "@/constants/api.constants";
import axios from "axios";

export const api = axios.create({
	baseURL: SERVER_URL,
})