import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks"; // Backend URL

const getAllTasks = () => axios.get(API_URL);
const getTasksByTitle = (title) => {
  return axios.get(`${API_URL}/search?title=${encodeURIComponent(title)}`);
};
const createTask = (task) =>
  axios.post(`${API_URL}/createTask`, JSON.stringify(task), {
    headers: { "Content-Type": "application/json" }, // Fix Network Error
  });
const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
const updateTaskStatus = (id, status) => {
  return axios.put(`${API_URL}/${id}/status`, { status });
};

export { getAllTasks, getTasksByTitle, createTask, deleteTask, updateTaskStatus };
