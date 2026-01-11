import React, { useState } from 'react';
import { createItem } from '../services/api';

const PostItemForm = ({ onPostSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        type: 'lost', // Default selection
        contact_phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Hardcoded User ID 1 for now (Requirement: Simplification)
            await createItem(formData, 1);
            alert("Item Posted Successfully!");
            // Reset form
            setFormData({ title: '', description: '', location: '', type: 'lost', contact_phone: '' });
            // Refresh the feed
            if (onPostSuccess) onPostSuccess();
        } catch (error) {
            alert("Failed to post item.");
        }
    };

    const inputStyle = {
        width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc'
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '400px', backgroundColor: '#f9f9f9' }}>
            <h3>Report an Item</h3>
            
            <label>Title (e.g., Red Wallet):</label>
            <input name="title" required value={formData.title} onChange={handleChange} style={inputStyle} />

            <label>Description:</label>
            <textarea name="description" required value={formData.description} onChange={handleChange} style={inputStyle} />

            <label>Location:</label>
            <input name="location" required value={formData.location} onChange={handleChange} style={inputStyle} />

            <label>Contact Phone:</label>
            <input name="contact_phone" required value={formData.contact_phone} onChange={handleChange} style={inputStyle} />

            <label>Type:</label>
            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                <option value="lost">I Lost This</option>
                <option value="found">I Found This</option>
            </select>

            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Submit Report
            </button>
        </form>
    );
};

export default PostItemForm;