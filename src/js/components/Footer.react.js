var React = require('react');
var todoActions = require('../actions/TodoActions');

var Footer = React.createClass({

  render: function() {
      return (
        <footer className="page-footer orange">
          <div className="container">
            <div className="row">
              <div className="col l9 s12">
                <h5 className="white-text">Team Name</h5>
                <p className="grey-text text-lighten-4">We build lovely apps</p>
              </div>
              <div className="col l3 s12">
                <h5 className="white-text">Useful Links</h5>
                <ul>
                  <li><a className="white-text" href="#!">Link 1</a></li>
                  <li><a className="white-text" href="#!">Link 2</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            Made by <a className="orange-text text-lighten-3" href="http://test.com">Team Name</a>
            </div>
          </div>
        </footer>
    );
  }

});

module.exports = Footer;
