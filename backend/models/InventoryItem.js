const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0
  },
  unit: {
    type: String,
    default: 'pieces'
  },
  minStock: {
    type: Number,
    default: 0,
    min: 0
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  supplier: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better search performance
inventoryItemSchema.index({ name: 'text', category: 'text' });
inventoryItemSchema.index({ category: 1 });
inventoryItemSchema.index({ quantity: 1 });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);