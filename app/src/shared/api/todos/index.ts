import { error } from "console"
import axios from 'axios';

export const API_URL = 'http://localhost:5000/api/todos/';

export const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

const handleError = (error: any) => {
    if(error.response) {
        console.log("Ошибка: ", error.response.data)
    } else {
        console.log("Ошибка сети: ", error.message)
    }
}

export const api = {
    getTodos: () => $api.get('getTodos').then(response => response.data).catch(handleError),
    postCreateTodo: (data: any) => $api.post('createTodo', data).then(response => response.data).catch(handleError),
    putUpdateTodo: (id: string, data: any) => $api.put(`updateTodo/${id}`, data).then(response => response.data).catch(handleError),
    deleteTodo: (id: string) => $api.delete(`deleteTodo/${id}`).then(response => response.data).catch(handleError),
    selected: (data: any) => $api.post('selected', data).then(response => response.data).catch(handleError),
    getSelected: () => $api.post('getSelected').then(response => response.data).catch(handleError),
    getCompleted: () => $api.get('completed').then(response => response.data).catch(handleError), // Добавьте этот метод
};