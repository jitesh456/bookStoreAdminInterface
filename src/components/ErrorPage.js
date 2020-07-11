import React from 'react';

export default class ErrorPage extends React.Component{
    constructor(props){
        super(props);
        this.state={errormessage:''};
        this.handleErrorMessage=this.handleErrorMessage.bind(this);
    }
    handleErrorMessage(){

    }

    render(){
        const errormessage='Helo';
        
        return(
            errormessage
        );
    }
}