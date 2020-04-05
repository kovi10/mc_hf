import React, { Component } from 'react';
import { Login } from './Login'
import logo from './logo.svg';
import './App.css';
import { Proxy } from './Proxy'
import { proxy } from './Proxy'
import { Main } from './Main'

export default class App extends Component {
  state={bejelentkezve: false}

  constructor(props){
    super(props);
    proxy.addEventListener("login",this.login);
  }

  render() {
    return (
      <div className="app">
        {this.state.bejelentkezve ? <Main></Main>:<Login></Login>}
      </div>
    );
  }

  login=()=>{
    this.setState({bejelentkezve:true})
  }
}

