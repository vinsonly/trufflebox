import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from '../Header/index';
import Footer from '../Footer/index';
import './styles.sass';
import '../../styles/animation.sass';
import Routes from '../routes';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="wrapper">
        <Username />
        <Header/>
        <CSSTransitionGroup
          transitionName="content"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <Routes />
        </CSSTransitionGroup>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  "location.pathname": PropTypes.string
};

export default App;

const Username = connect(mapStateToProps)(class Username extends Component {


  render() {
    let text;
    console.log("this.props.user", this.props.user);
    if(!this.props.user || !this.props.user.name) {
      text = ""
    } else {
      text = this.props.user.name;
    }
    
    return (
      <div className="text-right">{text}</div>
    )
  }
});


