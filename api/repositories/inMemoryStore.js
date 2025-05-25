// An in-memory store for managing collections of items.
class InMemoryStore {
    constructor() {
      this.data = {};
    }
  
    // Get all items in a collection
    async getAll(collection) {
      if (!this.data[collection]) {
        this.data[collection] = [];
      }
      return [...this.data[collection]];
    }
  
    // Get a single item by ID from a collection
    async getById(collection, id) {
      if (!this.data[collection]) {
        return null;
      }
      
      return this.data[collection].find(item => item.id === id) || null;
    }
  
    // Create a new item in a collection
    async create(collection, item) {
      if (!this.data[collection]) {
        this.data[collection] = [];
      }
      
      this.data[collection].push(item);
      return item;
    }
  
    // Update an existing item in a collection
    async update(collection, id, updatedItem) {
      if (!this.data[collection]) {
        return null;
      }
      
      const index = this.data[collection].findIndex(item => item.id === id);
      
      if (index === -1) {
        return null;
      }
      
      this.data[collection][index] = updatedItem;
      return updatedItem;
    }
  
    // Delete an item from a collection by ID
    async delete(collection, id) {
      if (!this.data[collection]) {
        return false;
      }
      
      const initialLength = this.data[collection].length;
      this.data[collection] = this.data[collection].filter(item => item.id !== id);
      
      return initialLength > this.data[collection].length;
    }
  }
  
  module.exports = InMemoryStore;