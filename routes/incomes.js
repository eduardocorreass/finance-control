const express = require('express');
const router = express.Router();
const { income, category } = require('../app/models');

router.post('/', async (req, res) => {
    try {
        const { description, amount, date, category_id } = req.body;
        
        const newIncome = await income.create({ description, amount, date, category_id });
        
        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Error while creating income:', error);
        res.status(500).send('Error while creating income');
    }
});

router.get('/', async (req, res) => {
    try {
        const incomes = await income.findAll({
            include: { model: category, as: 'category' },
            order: [['date', 'DESC']]
        });

        res.json(incomes);
    } catch (error) {
        console.error('Error while listing incomes:', error);
        res.status(500).send('Error while listing incomes');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbIncome = await income.findByPk(req.params.id, {
            include: { model: category, as: 'category' }
        });

        if (!dbIncome) return res.status(404).send('Income not found');

        res.json(dbIncome);
    } catch (error) {
        console.error('Error while getting income:', error);
        res.status(500).send('Error while getting income');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { description, amount, date, category_id } = req.body;
        
        const dbIncome = await income.findByPk(req.params.id);

        if (!dbIncome) return res.status(404).send('Income not found');

        await dbIncome.update({ description, amount, date, category_id });
        
        res.json(dbIncome);
    } catch (error) {
        console.error('Error while updating income:', error);
        res.status(500).send('Error while updating income');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const dbIncome = await income.findByPk(req.params.id);

        if (!dbIncome) return res.status(404).send('Income not found');
        
        await dbIncome.destroy();
        
        res.status(204).send();
    } catch (error) {
        console.error('Error while deleting income:', error);
        res.status(500).send('Error while deleting income');
    }
});

module.exports = router;