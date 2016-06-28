var Backbone = require('backbone');
var TodoDispatcher = require('../dispatcher/TodoDispatcher');

TodoItem = Backbone.Model.extend({
  defaults: {
    todo: "ToDo",
    done: false
  }
});

TodoCollection = Backbone.Collection.extend({

  model: TodoItem,

  // Register a callback with the Dispatcher on init.
  initialize: function() {
    this.dispatchToken = TodoDispatcher.register(this.dispatchCallback)
  },

// For some reason using "this" does not work. As a result the collection is
// explicitly called instead.
  dispatchCallback: function(payload) {

    switch (payload.actionType) {
      case 'todo-add':
        todoCollection.add(new TodoItem({todo: payload.todo}));
        break;
      case 'todo-remove':
        todoCollection.remove(payload.modelId);
        break;
      case 'todo-done-change':
        var todoDone = todoCollection.get(payload.modelId).get("done");
        todoCollection.get(payload.modelId).set({done: !todoDone});
        break;
    }

  }
});

todoCollection = new TodoCollection();

module.exports = todoCollection;
