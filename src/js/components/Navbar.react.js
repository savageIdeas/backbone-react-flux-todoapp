var React = require('react');
var todoActions = require('../actions/TodoActions');

var NavBar = React.createClass({

  render: function() {
      return (
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Logo</a>
            <ul className="right">
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
            </ul>
          </div>
        </nav>
    );
  }

});

module.exports = NavBar;
