const express = require('express');
const router = express.Router();
const { category } = require('../app/models');
const { income } = require('../app/models');
const { expense } = require('../app/models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { getCurrentMonthRange } = require('../helpers/getCurrentMonthRange')
const { getLastSixMonthsRange } = require('../helpers/getLastSixMonthsRange')

router.get('/month-expenses', async (req, res) => {
    try {
        const { firstDay, lastDay } = getCurrentMonthRange();

        const expenses = await expense.findAll({
            where: {
                date: {
                    [Op.between]: [firstDay, lastDay]
                }
            },
            attributes: [
                'category_id',
                [sequelize.fn('sum', sequelize.col('amount')), 'amount']
            ],
            group: ['category_id', 'category.name'],
            include: [{
                model: category,
                as: 'category',
                attributes: ['name'],
                where: {
                    type: 'expense'
                }
            }]
        });

        res.json(expenses);
    } catch (error) {
        console.error('Error while listing monthly expenses:', error);
        res.status(500).send('Error while listing monthly expenses');
    }
});

router.get('/last-transactions', async (req, res) => {
    try {
        const transactions = await Promise.all([
            expense.findAll({
                limit: 10,
                order: [['date', 'DESC']]
            }),
            income.findAll({
                limit: 10,
                order: [['date', 'DESC']]
            })
        ]);

        const formattedExpenses = transactions[0].map(transaction => ({
            ...transaction.get(),
            type: 'expense'
        }));

        const formattedIncomes = transactions[1].map(transaction => ({
            ...transaction.get(),
            type: 'income'
        }));

        const combinedTransactions = [...formattedExpenses, ...formattedIncomes]
            .sort((a, b) => b.date - a.date)
            .slice(0, 10);

        res.json(combinedTransactions);
    } catch (error) {
        console.error('Error while listing last transactions:', error);
        res.status(500).send('Error while listing last transactions');
    }
});

router.get('/monthly-incomes', async (req, res) => {
    try {
        const { start, end } = getLastSixMonthsRange();

        const incomes = await income.findAll({
            where: {
                date: {
                    [Op.between]: [start, end]
                }
            },
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('date')), 'month'],
                [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
            ],
            group: ['month'],
            order: [['month', 'DESC']]
        });

        const formattedIncomes = incomes.map(income => ({
            month: new Date(income.dataValues.month).toLocaleString('default', { month: '2-digit', year: 'numeric' }),
            total_amount: income.dataValues.total_amount
        }));

        res.json(formattedIncomes);
    } catch (error) {
        console.error('Error while listing monthly incomes:', error);
        res.status(500).send('Error while listing monthly incomes');
    }
});

module.exports = router;