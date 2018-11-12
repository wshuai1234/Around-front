import React, { Component } from 'react';
import '../styles/App.css';
import {Main} from './Main.js';
import {Header} from './Header.js';
import { TOKEN_KEY } from '../constant';
class App extends Component {
    state={
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
    }
    handleLogin = (response) => {
        localStorage.setItem(TOKEN_KEY, response);
        this.setState({ isLoggedIn: true });
    }
    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({ isLoggedIn: false });
    }
  render() {
        console.log(this.state.isLoggedIn);
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
        <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default App;
