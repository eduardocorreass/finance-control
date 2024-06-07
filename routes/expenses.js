const express = require('express');
const router = express.Router();
const { expense, category } = require('../app/models');

router.post('/', async (req, res) => {
    try {
        const { description, amount, date, category_id } = req.body;
        
        const newExpense = await expense.create({ description, amount, date, category_id });
        
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error while creating expense:', error);
        res.status(500).send('Error while creating expense');
    }
});

router.get('/', async (req, res) => {
    try {
        const expenses = await expense.findAll({
        include: { model: category, as: 'category' }
        });

        res.json(expenses);
    } catch (error) {
        console.error('Error while listing expenses:', error);
        res.status(500).send('Error while listing expenses');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbExpense = await expense.findByPk(parseInt(req.params.id), {
            include: { model: category, as: 'category' }
        });

        if (!dbExpense) return res.status(404).send('Expense not found');

        res.json(dbExpense);
    } catch (error) {
        console.error('Error while getting expense:', error);
        res.status(500).send('Error while getting expense');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { description, amount, date, category_id } = req.body;
        
        const dbExpense = await expense.findByPk(req.params.id);

        if (!dbExpense) return res.status(404).send('Expense not found');

        await dbExpense.update({ description, amount, date, category_id });
        
        res.json(dbExpense);
    } catch (error) {
        console.error('Error while updating expense:', error);
        res.status(500).send('Error while updating expense');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const dbExpense = await expense.findByPk(req.params.id);

        if (!dbExpense) return res.status(404).send('Expense not found');
        
        await dbExpense.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error while deleting expense:', error);
        res.status(500).send('Error while deleting expense');
    }
});

module.exports = router;