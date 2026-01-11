import React, { useEffect, useState } from "react";
import "./App.css"; // <--- Import the CSS file
import { fetchItems } from "./services/api";
import ItemCard from "./components/ItemCard";
import PostItemForm from "./components/PostItemForm";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data.reverse());
    setLoading(false);
  };

  const displayedItems = items.filter(item => 
    filter === "all" ? true : item.type === filter
  );

  return (
    <div className="container">
      {/* Navbar */}
      <header className="header">
        <h1>🔍 Lost & Found Hub</h1>
        <div className="filter-group">
          <button className={`btn btn-filter ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter("all")}>All</button>
          <button className={`btn btn-filter ${filter === 'lost' ? 'active' : ''}`} onClick={() => setFilter("lost")}>Lost</button>
          <button className={`btn btn-filter ${filter === 'found' ? 'active' : ''}`} onClick={() => setFilter("found")}>Found</button>
        </div>
      </header>

      <div className="main-layout">
        {/* Left: Form */}
        <div style={{ flex: '0 0 350px' }}>
          <PostItemForm onPostSuccess={loadItems} />
        </div>

        {/* Right: Feed */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Recent Reports</h2>
          {loading ? <p>Loading...</p> : (
            <div className="grid-feed">
              {displayedItems.length === 0 ? <p className="text-muted">No items found.</p> : displayedItems.map(item => (
                <ItemCard key={item.id} item={item} onDelete={loadItems} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;