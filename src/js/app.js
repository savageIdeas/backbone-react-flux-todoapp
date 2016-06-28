var React = require('react');
var ReactDOM = require('react-dom');
var TodoListComponent = require('./components/TodoListComponent.react');
var NavBar = require('./components/NavBar.react')
var Footer = require('./components/Footer.react')

ReactDOM.render(<NavBar />,document.getElementById('navbar'));
ReactDOM.render(<TodoListComponent />,document.getElementById('mainApp'));
ReactDOM.render(<Footer />,document.getElementById('footer'));
