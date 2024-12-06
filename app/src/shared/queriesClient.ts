import { $api } from "./api";

const handleError = (error: any) => {
    if (error.response) {
        console.log("Ошибка: ", error.response.data);
    } else {
        console.log("Ошибка сети: ", error.message);
    }
}

export class Api {


    static async getTodos() {
        try {
            const response = await $api.get("getTodos")
            return response.data; // Now TypeScript knows response is AxiosResponse
        } catch (error) {
            handleError(error); // Handle the error appropriately
            throw error; // Optionally rethrow the error if you want to propagate it
        }
    }

    static async createTodo(title: string) {
        try {
            const response = await $api.post("createTodo", { title })
            return response.data; // Now TypeScript knows response is AxiosResponse
        } catch (error) {
            handleError(error); // Handle the error appropriately
            throw error; // Optionally rethrow the error if you want to propagate it
        }
    }

    static async updateTodo(id: string, title: string) {
        try {
            const response = await $api.put(`updateTodo/${id}`, { title });
            return response.data; // Now TypeScript knows response is AxiosResponse
        } catch (error) {
            handleError(error); // Handle the error appropriately
            throw error; // Optionally rethrow the error if you want to propagate it
        }
    }
    
    static async completedTodo(id: string) {
        try {
            const response = await $api.put(`completedTodo/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
    
    static async deleteTodo(id: string) {
        try {
            const response = await $api.delete(`deleteTodo/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
    
    static async getCompleted() {
        try {
            const response = await $api.get("getSelected");
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
}