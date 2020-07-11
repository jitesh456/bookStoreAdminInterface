import React, { Component } from 'react';

export default class Toggle extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        let im=[];
        if(this.props.show){
            im=<div>
                I am rendered in a span (by default) and hidden with display:none when show is false.
                I am rendered in a section and removed from the DOM when if is false.
            </div>
        }
        else{
            im=<div></div>
        }
      return (
        im
      );
    }
  }