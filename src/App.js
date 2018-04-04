import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { WhiteList } from "./components";
import { BlackListContainer, TokenMarketContainer } from "./containers";

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'

import './App.css'

import { 
  Navbar, 
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
} from "reactstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">NoshowBlock</NavbarBrand>
          <Collapse isOpen={false} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/blacklist' className="nav-link">Blacklist</Link>
              </NavItem>
              <NavItem>
                <Link to='/whitelist' className="nav-link">Whitelist</Link>
              </NavItem>
              <NavItem>
                <Link to='/token_market' className="nav-link">Token Trader</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route exact path='/' component={BlackListContainer} />
          <Route path='/blacklist' component={BlackListContainer} />
          <Route path='/whitelist' component={WhiteList} />
          <Route path='/token_market' component={TokenMarketContainer} />
        </Switch>
      </div>
    );
  }
}

export default App
