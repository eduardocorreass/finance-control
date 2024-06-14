const express = require('express');
const router = express.Router();
const { category } = require('../app/models');

router.get('/', async (req, res) => {
    try {
      const type = req.query.type;

      const categories = await category.findAll({
        where: {
          type: type
        },
        order: [['name', 'ASC']]
      });
      
      res.json(categories);
    } catch (error) {
      console.error('Error while listing categories:', error);
      res.status(500).send('Error while listing categories');
    }
});

module.exports = router;