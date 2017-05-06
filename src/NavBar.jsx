import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className = 'clientSize'> {this.props.clientsOnline} users are currently online. </div>
      </nav>
    );
  }
}


export default NavBar;