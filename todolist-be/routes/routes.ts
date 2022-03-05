import { Router } from "express";
import Todo from "../models/Todo";

const router = Router();

router.post("", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed,
    });
    console.log(todo.title);
    const savedTodo = await todo.save();
    res.status(201);
    res.json(savedTodo);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/", async (req, res) => {
  try {
    const queryLimit = req.query.limit;
    const queryPage = req.query.page;
    const todo = await Todo.find()
      .skip(+queryPage * +queryLimit - +queryLimit)
      .limit(+queryLimit);
    res.status(200);
    res.send(todo);
  } catch (err) {
    res.status(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200);
    res.send(todo);
  } catch (err) {
    res.status(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedTodo = await Todo.remove({
      _id: req.params.id,
    });
    res.status(201);
    res.json(removedTodo);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.status(201);
    res.json(updatedTodo);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
