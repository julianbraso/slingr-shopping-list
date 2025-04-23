import { Item } from "../types/types";

const API_URL = `${import.meta.env.VITE_API_URL}/items/`;

const reusableHeaders = {
    'Content-Type': 'application/json',
}

export const getAllItems = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    return data;
}

export const createItem = async (item: Item) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: reusableHeaders,
        body: JSON.stringify(item),
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export const updateItem = async (item: Item, body?: Object) => {
    const response = await fetch(`${API_URL}${item.id}`, {
        method: 'PATCH',
        headers: reusableHeaders,
        body: JSON.stringify(body ?? item),
    });
    if (!response.ok) {
        const error = await response.text();
        console.error("Update failed:", error);
        throw new Error(`Failed to update item: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export const deleteItem = async (item: Item) => {
    const response = await fetch(`${API_URL}${item.id}`, {
        method: 'DELETE',
        headers: reusableHeaders
      });
    const data = await response.json();
    console.log(data);
    return data;
}