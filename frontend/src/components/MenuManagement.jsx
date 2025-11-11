

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './MenuManagement.css';

// const API_BASE_URL = 'https://orderflow-backend-v964.onrender.com/api';

// const MenuManagement = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [newItem, setNewItem] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     preparationTime: 15,
//     image: ''
//   });
//   const [loading, setLoading] = useState(false); // Only this loading state

//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const fetchMenuItems = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/menu`);
//       setMenuItems(response.data);
//     } catch (error) {
//       console.error('Error fetching menu:', error);
//       alert('Error loading menu items');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addMenuItem = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await axios.post(`${API_BASE_URL}/menu`, {
//         ...newItem,
//         price: parseFloat(newItem.price),
//         preparationTime: parseInt(newItem.preparationTime)
//         // Image is already a URL string - no processing needed
//       });
      
//       // Reset form
//       setNewItem({ 
//         name: '', 
//         description: '', 
//         price: '', 
//         category: '', 
//         preparationTime: 15,
//         image: '' 
//       });
      
//       fetchMenuItems();
//       alert('Menu item added successfully!');
//     } catch (error) {
//       console.error('Error adding menu item:', error);
//       alert('Error adding menu item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="menu-management">
//       <h1>Menu Management</h1>
      
//       <form onSubmit={addMenuItem} className="add-menu-form">
//         <h2>Add New Menu Item</h2>
        
//         {/* SIMPLE IMAGE URL INPUT - NO UPLOAD */}
//         <div className="image-url-section">
//           <label>🖼️ Image URL (Optional):</label>
//           <input
//             type="url"
//             placeholder="Paste image URL from Unsplash, Imgur, etc."
//             value={newItem.image}
//             onChange={(e) => setNewItem({...newItem, image: e.target.value})}
//           />
          
//           {/* Quick image suggestions */}
//           <div className="image-suggestions">
//             <small>💡 Quick suggestions:</small>
//             <div className="suggestion-buttons">
//               {[
//                 {
//                   url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop',
//                   name: 'Pizza'
//                 },
//                 {
//                   url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop', 
//                   name: 'Burger'
//                 },
//                 {
//                   url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop',
//                   name: 'Salad'
//                 },
//                 {
//                   url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&auto=format&fit=crop',
//                   name: 'Dessert'
//                 },
//               ].map((item, index) => (
//                 <button 
//                   key={index}
//                   type="button"
//                   onClick={() => setNewItem({...newItem, image: item.url})}
//                   className="suggestion-btn"
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Image preview */}
//           {newItem.image && (
//             <div className="image-preview">
//               <img 
//                 src={newItem.image} 
//                 alt="Preview" 
//                 onError={(e) => {
//                   console.error('Image failed to load:', newItem.image);
//                   e.target.style.display = 'none';
//                   alert('❌ Image failed to load. Please check the URL.');
//                 }}
//               />
//               <small>Image Preview</small>
//             </div>
//           )}
//         </div>

//         {/* Other form inputs */}
//         <input
//           type="text"
//           placeholder="Item Name"
//           value={newItem.name}
//           onChange={(e) => setNewItem({...newItem, name: e.target.value})}
//           required
//         />
        
//         <input
//           type="text"
//           placeholder="Description"
//           value={newItem.description}
//           onChange={(e) => setNewItem({...newItem, description: e.target.value})}
//         />
        
//         <input
//           type="number"
//           placeholder="Price"
//           step="0.01"
//           value={newItem.price}
//           onChange={(e) => setNewItem({...newItem, price: e.target.value})}
//           required
//         />
        
//         <select
//           value={newItem.category}
//           onChange={(e) => setNewItem({...newItem, category: e.target.value})}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Appetizers">Appetizers</option>
//           <option value="Main Course">Main Course</option>
//           <option value="Desserts">Desserts</option>
//           <option value="Drinks">Drinks</option>
//           <option value="Sides">Sides</option>
//         </select>
        
//         <input
//           type="number"
//           placeholder="Preparation Time (minutes)"
//           value={newItem.preparationTime}
//           onChange={(e) => setNewItem({...newItem, preparationTime: e.target.value})}
//         />
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Adding...' : 'Add Menu Item'}
//         </button>
//       </form>

//       {/* Menu items list */}
//       <div className="menu-items-list">
//         <h2>Current Menu Items ({menuItems.length})</h2>
//         {loading ? (
//           <div className="loading-message">Loading menu items...</div>
//         ) : (
//           <div className="menu-items-grid">
//             {menuItems.map(item => (
//               <div key={item._id} className="menu-item-card">
//                 {item.image && (
//                   <div className="menu-item-image">
//                     <img 
//                       src={item.image} 
//                       alt={item.name}
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                       }}
//                     />
//                   </div>
//                 )}
//                 <h3>{item.name}</h3>
//                 <p className="menu-item-description">{item.description}</p>
//                 <div className="menu-item-details">
//                   <span className="menu-item-price">₹{item.price}</span>
//                   <span className="menu-item-category">{item.category}</span>
//                 </div>
//                 <div className="menu-item-time">
//                   ⏱️ {item.preparationTime} min
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuManagement;


//2
// src/components/MenuManagement.jsx
import React, { useState } from 'react';
import menuItems from '../data/menuItems';
import './MenuManagement.css';

const MenuManagement = () => {
  const [items, setItems] = useState(menuItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filter items based on category and search
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAvailability = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  return (
    <div className="menu-management">
      <header className="menu-header">
        <h1>🍽️ Menu Management</h1>
        <p>Manage your restaurant menu items</p>
      </header>

      {/* Filters and Search */}
      <div className="menu-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className={`menu-card ${!item.isAvailable ? 'unavailable' : ''}`}>
            <div className="menu-card-image">
              <img 
                src={item.image} 
                alt={item.name}
                onError={(e) => {
                  e.target.src = '/menu-images/placeholder.jpg'; // Fallback image
                }}
              />
              {!item.isAvailable && <div className="unavailable-overlay">Unavailable</div>}
            </div>
            
            <div className="menu-card-content">
              <div className="menu-card-header">
                <h3>{item.name}</h3>
                <span className="price">₹{item.price}</span>
              </div>
              
              <p className="category">{item.category}</p>
              <p className="description">{item.description}</p>
              
              <div className="item-details">
                <div className="detail-item">
                  <span>⏱️ {item.preparationTime} mins</span>
                </div>
                <div className="detail-item">
                  <span>{item.isVegetarian ? '🥬 Veg' : '🍗 Non-Veg'}</span>
                </div>
              </div>

              <div className="ingredients">
                <strong>Ingredients:</strong>
                <div className="ingredients-list">
                  {item.ingredients.map((ingredient, index) => (
                    <span key={index} className="ingredient-tag">{ingredient}</span>
                  ))}
                </div>
              </div>

              <div className="menu-actions">
                <button 
                  className={`availability-btn ${item.isAvailable ? 'available' : 'unavailable'}`}
                  onClick={() => toggleAvailability(item.id)}
                >
                  {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <p>No menu items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
