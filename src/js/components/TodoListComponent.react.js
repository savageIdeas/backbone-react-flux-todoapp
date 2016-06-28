var todoActions = require('../actions/TodoActions');
var todoCollection = require('../collections/TodoCollection');
var TodoComponent = require('./TodoComponent.react');
var React = require('react');

var TodoListComponent = React.createClass({

  componentDidMount: function() {
    // This allows this component to respond to events from the dispatcher
    this.dispatchToken = TodoDispatcher.register(this.dispatchCallback);

    // This is so react will re-render when the collection is updated
    todoCollection.on('change add remove reset', function(){
      this.forceUpdate()
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    // turn off all events and callbacks that have this context
    todoCollection.off(null, null, this);
  },

  render: function() {

    return (

      <div>
        <div className="container">
          <div className="todoSection z-depth-3">
            <div className="container">
              <div className="row">
                  <div className="col s8 m8 l8">
                    <input ref="todoInput" placeholder="Enter a todo" onKeyPress={this.handleKeyPress}></input>
                  </div>
                  <div className="col s4 m4 l4 center valign">
                    <button type="button" onClick={this.onAddTodoClick}>Add todo</button>
                  </div>
              </div>
              <div>
                  {
                    todoCollection.map(function(model) {
                      return (
                        <TodoComponent
                          key={model.cid}
                          todo={model.attributes.todo}
                          modelId={model.cid}
                          done={model.attributes.done}>
                        </TodoComponent>
                      )
                    })
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  onAddTodoClick: function(ev) {
    this.addTodo();
  },

  handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.addTodo();
    };
  },

  addTodo: function() {
    var userEnteredTodo = this.refs.todoInput.value;
    if(userEnteredTodo.length != 0) {
      todoActions.todoAdd(this.refs.todoInput.value);
      this.refs.todoInput.value = "";
    }
  },

  // Handle events from the dispatcher inside this function
  dispatchCallback: function(payload) {
  }

});

module.exports = TodoListComponent;
