var TodoDispatcher = require('../dispatcher/TodoDispatcher');

var todoActions = {

  todoAdd: function(todoItem) {
    TodoDispatcher.dispatch({
      actionType: 'todo-add',
      todo: todoItem
    });
  },

  todoRemove: function(id) {
    TodoDispatcher.dispatch({
      actionType: 'todo-remove',
      modelId: id
    });
  },

  todoDoneChange: function(id) {
    TodoDispatcher.dispatch({
      actionType: 'todo-done-change',
      modelId: id
    });
  }
}

module.exports = todoActions;
