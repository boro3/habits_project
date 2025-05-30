const path = require('path');
const fs = require('fs').promises;
const {fileExists, ensureDir} = require('../utils/fs-helpers');

// An file store for managing collections of items.
class fileStore {
    constructor() {
        this.path = './data';
        this.initialize();
    }

    // Initialize the file store by ensuring the data directory exists
    async initialize() {
        await ensureDir(this.path);
    }

    // Get all items in a collection
    async getAll(collectionName) {
        const collectionPath = path.join(this.path, `${collectionName}.json`);
        
        if (!await fileExists(collectionPath)) {
        throw new Error(`Collection '${collectionName}' does not exist`);
        }
        
        const data = await fs.readFile(collectionPath, 'utf8');
        let res = JSON.parse(data);
        return res;
    }

    // Get a single item by ID from a collection
    async getById(collectionName, id) {
        const data = await this.getAll(collectionName);
        return data.find(item => item.id === id) || {};
    }

    // Create a new item in a collection
    async create(collectionName, document) {
        const collection = await this.getAll(collectionName);
        const newDocument = {
        ...document,
        createdAt: new Date().toISOString()
        };

        collection.push(newDocument);
        await this._saveCollection(collectionName, collection);
        return newDocument;
    }

    // Update an existing item in a collection
    async update(collectionName, id, updatedItem) {
        const collection = await this.getAll(collectionName);
        let updated = false;

        const updatedCollection = collection.map(item => {
        if (!updated && (item.id === id)) {
            updated = true;
            return { 
                ...item, 
                ...updatedItem,
                updatedAt: new Date().toISOString()
            };
        }
            return item;
        });
      
        if (updated) {
            await this._saveCollection(collectionName, updatedCollection);
            return true;
        }
        
        return false;
    }

    // Delete an item from a collection by ID
    async delete(collectionName, id) {
        const collection = await this.getAll(collectionName);
        const index = collection.findIndex(item => item.id === id);
        
        if (index !== -1) {
            collection.splice(index, 1);
            await this._saveCollection(collectionName, collection);
            return true;
        }
        
        return false;
    }

    // Save the collection data to a file
    async _saveCollection(collectionName, data) {
        const collectionPath = path.join(this.path, `${collectionName}.json`);
        const jsonData = JSON.stringify(data, null, 2);

        await fs.writeFile(collectionPath, jsonData);
        return true;
    }
}
  
module.exports = fileStore;