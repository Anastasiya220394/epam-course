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

router.get('',async (req:any,res:any)=> {
    try {
      const queryLimit = req.query.limit  
      const queryPage = req.query.page
      const todo = await Todo
        .find()
        .skip(queryPage*queryLimit)
        .limit(queryLimit)
      res.status(200)
      res.send(todo)
    }
    catch (err) {
      res.status(500)
    }
  })

module.exports = router;

