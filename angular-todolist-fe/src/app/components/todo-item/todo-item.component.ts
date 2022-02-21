import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';

import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  constructor(private todoService: TodoService) { }
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter();

  editable = false;

  ngOnInit() {
  }

  onToggle(todo: Todo) {
    this.todoService.toggleCompleted(todo).
    subscribe(() => todo.completed = !todo.completed);
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

  onEdit(todo: Todo, title: string) {
    this.todoService.editTodo(todo).subscribe(() => {
      this.todo.title = title;
      this.editable = false;
    });
  }

}
