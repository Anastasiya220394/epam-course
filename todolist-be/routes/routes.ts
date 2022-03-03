const { Router } = require('express');
const Todo = require('../models/Todo');
const router = Router();

router.post('/todos', async (req: any, res: any) => {
    try {
        const {title} = req.body;
        const todo = new Todo({title});
        await todo.save();
        res.status(201);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
})

/*router.get('/todos', async (req: any, res: any) => {
    
})*/

module.exports = router;

