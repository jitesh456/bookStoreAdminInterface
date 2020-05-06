import React, { Component } from 'react';
import Toggle from '../components/Toggle';

export default class ToggleComp extends Component {
    constructor() {
      super();
      this.state = { show: false };
    }
  
    handleClick() {
      this.setState({
        show: !this.state.show
      });
    }
  
    render() {
      return (
        <div className="App">
            <p className="App-intro">
               <button onClick={ () => this.handleClick() }>Toggle things</button>
            </p>
            <Toggle show={this.state.show}/>
        </div>
      );
    }
  }