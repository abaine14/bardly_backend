const routes = require("express").Router();

// Create a new collection (implicitly) by adding a document
// this is for each client having their own collection for speed of data
routes.post('/createCollection', async (req, res) => {
    try {
      const { collectionName, documentData } = req.body;
  
      // Add a document to the specified collection
      const docRef = await db.collection(collectionName).add(documentData);
  
      res.status(201).json({
        message: `Collection '${collectionName}' created with a new document`,
        documentId: docRef.id,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = routes;