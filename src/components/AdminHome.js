import React from 'react';
import '../css/AdminHome.css';
import Button from '@material-ui/core/Button';
import AddBook from './AddBook';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
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
		   but=<div className="button">
		   <Tooltip  title="cancel" aria-label="cancel">
					<Fab style={{color:"maroon",width:"40px",height:"20px"}} >
						<CancelIcon onClick={this.handleAddBook}/>
					</Fab>
				</Tooltip>
		   </div>
		   
        }
        else{
            but=<div></div>
        }

        return(
            <div className="app">
                <header className="app_header">
                <div className="admin_header">
                    <img src={booklogo} alt="asd" width="40px" height="40px"/><span className="admin">Online_BookStore</span>
                </div>
                <div className="admin_header">
                                        
                </div>
                <div class="admin_functions">
                    <Tooltip title="Add" aria-label="add">
						<Fab style={{backgroundColor:"white",color:"maroon",width:"40px",height:"40px"}} >
							<AddIcon onClick={this.handleAddBook}/>
						</Fab>
					</Tooltip>
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