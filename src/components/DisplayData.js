import React from 'react';
import '../css/DisplayData.css';
import Button from '@material-ui/core/Button';
import Service from '../service/Service.js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class DisplayData extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
          bookRecord:[ ]
          ,editFlag:false,
          cancelFlag:false,
          quantityTemp:'',
          priceTemp:'',
          isbnTemp:'',
          updatedPrice:'',
          updatedQuantity:'',
          snackbaropen:false,
          snackbarmsg:''
        };
        console.log(this.state)
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
        
      editButton=(quantity,price,isbn)=>{
        this.setState({
          editFlag:true,
          quantityTemp:quantity,
          priceTemp:price,
          isbnTemp:isbn
        })
      }

      snackbarClose=(event)=>{
        this.setState({snackbaropen:false});
      };

      cancelButton=e=>{
        this.setState({
          cancelFlag:true
        })
      }

      handleChange(field,event){
        this.setState({[event.target.name]:event.target.value}
           );
      }

    getAllDetails=()=>{
      Service.getAllDetails().then(response=>{
              console.log(response.data.body);
              this.setState({
                bookRecord:response.data.body
              })
              console.log(this.state.bookRecord);
          }).catch(error=>{

              console.log(error);
          })
    }

    handleSubmit(event) {
      event.preventDefault();
        const book={
          price:this.state.updatedPrice,
          isbn:this.state.isbnTemp,
          quantity:this.state.updatedQuantity
        }
        Service.updateBook(book).then(response => {
          console.log(response.data)
          this.setState({snackbaropen:true,snackbarmsg:response.data.body})
          console.log(this.state);
        }).catch(error => {
          console.log(error);
        })
        document.getElementById("updatedform").reset();
    }

    componentDidMount(){
      this.getAllDetails();
    }

    deleteDataValue(e){
      const {data}=this.state;
      this.setState({
        data:data.filter(data=>data.isbn!==e)
      })
      alert(e);
    }

    render(){    
        const editButtonFlags=this.state.editFlag
        if(editButtonFlags){
          document.getElementById('editbox').style.display='block';
          this.setState({
            editFlag:false
          })
        }

        const cancelButtonFlag=this.state.cancelFlag
        if(cancelButtonFlag){
          document.getElementById('editbox').style.display='none';
          this.setState({
            cancelFlag:false
          })
        }
        let im=[]
        if(this.props.show)
        {
            im=<div className="container">
              <Snackbar
              anchorOrigin={{vertical:'top',horizontal:'center'}}
              open={this.state.snackbaropen}
              autoHideDuration={3000}
              onClose={this.snackbarClose}
              message={<span id="mesage-id">{this.state.snackbarmsg}</span>}
              action={[
              <IconButton key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              </IconButton>
          ]}
          />
              <div id="editbox" class="modal">
              <form class="modal-content animate" id="updatedform" onSubmit={this.handleSubmit} onReset={this.reset}>
                <div class="container2">
                  <input type="text" name="updatedQuantity" style={{width:'30%',padding:'12px 20px',border:'1px solid #ccc'}} onChange={this.handleChange.bind(this, 'updatedQuantity')} placeholder={this.state.quantityTemp}  required></input>&nbsp;&nbsp;
                  <input type="text" name="updatedPrice" style={{width:'30%',padding:'12px 20px',border:'1px solid #ccc'}} onChange={this.handleChange.bind(this, 'updatedPrice')} placeholder={this.state.priceTemp} required></input>&nbsp;&nbsp;
                  <Button type="submit" variant="contained" style={{background:"blue",color:"white"}} onClick={()=>window.setTimeout(function(){window.location.reload(false)},2000)}>Edit</Button>&nbsp;
                  <Button variant="contained" style={{background:"red",color:"white"}} onClick={this.cancelButton}>Cancel</Button>        
                </div>
              </form>
            </div>
        <table >
				<tr>
          <th style={{border:"1px solid black",width:"120px",textAlign:"center",color:"green",fontSize:"medium"}}>Book Cover</th>
					<th style={{border:"1px solid black",width:"120px",textAlign:"center",color:"green",fontSize:"medium"}}>Book Name</th>
          <th style={{border:"1px solid black",width:"120px",textAlign:"center",color:"green",fontSize:"medium"}}>Author Name</th>
					<th style={{border:"1px solid black",width:"120px",textAlign:"center",color:"green",fontSize:"medium"}}>ISBN Number</th>
					<th style={{border:"1px solid black",width:"40px",textAlign:"center",color:"green",fontSize:"medium"}}>Price</th>
					<th style={{border:"1px solid black",width:"50px",textAlign:"center",color:"green",fontSize:"medium"}}>Quantity</th>
					<th style={{border:"1px solid black",width:"66px",textAlign:"center",color:"green",fontSize:"medium"}}>Edit</th>
					</tr>
				</table>
				<div className="table-containt">
				<table style={{ width:"1000px"}}>
				{
					this.state.bookRecord.map((data =>{
					return <tr >
            		<td style={{textAlign:"center",width:"120px",fontSize:"medium"}}>{<img src={`http://localhost:8090/admin/downloadFile/${data.bookcover}`} className="image" />}</td>
								<td style={{textAlign:"center",width:"120px",fontSize:"medium"}}>{data.name}</td>
                <td style={{textAlign:"center",width:"120px",fontSize:"medium"}}>{data.authorname}</td>
								<td style={{textAlign:"center",width:"120px",fontSize:"medium"}}>{data.isbn}</td>
								<td style={{textAlign:"center",width:"40px",fontSize:"medium"}}>{data.price}</td>
								<td style={{textAlign:"center",width:"66px",fontSize:"medium"}}>{data.quantity}</td>
								<td style={{textAlign:"center",width:"40px",fontSize:"medium"}}><Button variant="contained" style={{background:"blue",color:"white"}}
									onClick={()=>this.editButton(data.quantity,data.price,data.isbn)}>Edit</Button>
								</td>
							</tr>
				  }))
				}
				</table>
				</div>
				</div>
        }else{
          im=<div></div>
        }
    
        return (
          im
        );
      }
}