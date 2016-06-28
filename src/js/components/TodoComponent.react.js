var React = require('react');
var todoActions = require('../actions/TodoActions');

var TodoComponent = React.createClass({

  render: function() {
      return (
        <div className="row">
            <input type="checkbox" ref="todoCheckbox" checked={this.props.done}></input>
            <label className="todoText" ref="todoText" id={this.props.modelId} onClick={this.doneTodoClick}>{this.props.todo}</label>
            <img className="btnRemoveTodo" src="images/remove.png" width="15" onClick={this.removeTodoClick}></img>
        </div>
    );
  },

  removeTodoClick: function(ev) {
    todoActions.todoRemove(this.refs.todoText.id);
  },

  doneTodoClick: function(ev) {
    todoActions.todoDoneChange(this.refs.todoText.id);
  }

});

module.exports = TodoComponent;
