import React from 'react';
import { deleteItem } from '../services/api';

const ItemCard = ({ item, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this?")) {
            await deleteItem(item.id);
            if (onDelete) onDelete();
        }
    };

    return (
        <div className={`item-card ${item.type}`}>
            <button onClick={handleDelete} className="btn btn-delete">✕</button>

            <span className={`badge ${item.type}`}>
                {item.type.toUpperCase()}
            </span>
            
            <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>{item.title}</h3>
            
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {item.description}
            </p>
            
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee', fontSize: '0.85rem', color: '#666' }}>
                <p style={{ margin: '5px 0' }}>📍 <strong>Location:</strong> {item.location}</p>
                <p style={{ margin: '5px 0' }}>📞 <strong>Contact:</strong> {item.contact_phone}</p>
            </div>
        </div>
    );
};

export default ItemCard;