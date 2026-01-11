import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// This function gets all items
export const fetchItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
};

// This function posts a new item
export const createItem = async (itemData, userId) => {
    try {
        // userId is hardcoded to 1 for this simple demo, as allowed by your scope
        const response = await axios.post(`${API_URL}/items/?user_id=${userId}`, itemData);
        return response.data;
    } catch (error) {
        console.error("Error creating item:", error);
        throw error;
    }
};

// Add this to your existing api.js file

export const deleteItem = async (itemId) => {
    try {
        await axios.delete(`${API_URL}/items/${itemId}`);
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
};