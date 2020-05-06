import React from 'react';
import '../css/AdminHome.css';
import Button from '@material-ui/core/Button';
import AddBook from './AddBook';
import Paper from '@material-ui/core/Paper';
import '../css/AddBook.css';
import DisplayData from './DisplayData';
import booklogo from '../booklogo.png';

export default class AdminHome extends React.Component{
    constructor(props){
        super(props);
        this.state={ addbook:false,crossbutton:false,displaydata:true};
        this.handleAddBook=this.handleAddBook.bind(this);
    }

    handleAddBook=()=>{
        this.setState({
            addbook:!this.state.addbook,
            displaydata:!this.state.displaydata,
            crossbutton:!this.state.crossbutton
        });
    }

    render(){

        let but=[];
        if(this.state.crossbutton){
           but=<div class="button">
           <Button variant="contained" class="cancel_button" onClick={this.handleAddBook}>Cancel</Button>
       </div>
        }
        else{
            but=<div></div>
        }

        return(
            <div className="app">
                <header className="app_header">
                <div className="admin_header">
                    <img src={booklogo} alt="asd" width="40px" height="40px"/><span className="admin">OnlineBookStore</span>
                </div>
                <div className="admin_header">
                                        
                </div>
                <div class="admin_functions">
                    <Button style={{background:"darkviolet",color:"white"}} variant="contained" onClick={this.handleAddBook}>
                        Add Book
                    </Button>
                </div>
            </header>
            <div className="admin-form">
                <DisplayData show={this.state.displaydata}/>
                <Paper elevation={20} style={{display:"flex",flexDirection:"column"}}>
                    {but}
                    <AddBook show={this.state.addbook}/>
                </Paper>
            </div>
        </div>
        );
    } 
}