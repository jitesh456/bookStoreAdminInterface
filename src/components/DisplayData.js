import React from 'react';
import '../css/DisplayData.css';

import Button from '@material-ui/core/Button';
import Service from '../service/Service.js';

export default class DisplayData extends React.Component{
    constructor(props){
        super(props)
        /*this.state={
          editFlag:true
        }*/
        this.state={
          bookRecord:[ ],
        };
        console.log(this.state)
      }
        
      /*editButton=e=>{
        this.setState({
          editFlag:true
        })
      }*/
    
    
        
    deleteData(dataID){
      const {data}=this.state;
      this.setState({
        data:data.filter(data=>data.id!==dataID)
      })
      Service.deleteData(dataID).then(response=>{
              console.log(response);
              this.setState({date:response.data})
              console.log(this.state.data);
          }).catch(error=>{
              console.log(error);
          })    
          this.getAllDetails();
    }
    
    /*changeContent= (id,event) => {
      if (this.state.firstname.length === 0) {
        return;
      }
      const index = this.state.data.findIndex((data)=> {
          return (data.id === id);
      })
    
      const user = Object.assign({}, this.state.data[index]);
      user.firstname = event.target.value;
    
      const data = Object.assign([], this.state.data);
      data[index] = user;
    
      this.setState({data:data});
    }*/

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
        let im=[]
        if(this.props.show)
        {
            im=<div className="container">
           		<table >
				<tr>
					<th style={{border:"1px solid black",width:"120px",textAlign:"center",color:"green",fontSize:"medium"}}>Book Name</th>
					<th style={{border:"1px solid black",width:"120px",textAlign:"center",color:"green",fontSize:"medium"}}>ISBN Number</th>
					<th style={{border:"1px solid black",width:"40px",textAlign:"center",color:"green",fontSize:"medium"}}>Price</th>
					<th style={{border:"1px solid black",width:"50px",textAlign:"center",color:"green",fontSize:"medium"}}>Quantity</th>
					<th style={{border:"1px solid black",width:"66px",textAlign:"center",color:"green",fontSize:"medium"}}>Edit</th>
					<th style={{border:"1px solid black",width:"80px",textAlign:"center",color:"green",fontSize:"medium"}}>Delete</th>
					</tr>
				</table>
				<div className="table-containt">
				<table style={{ width:"800px"}}>
				{
					this.state.bookRecord.map((data =>{
					return <tr >
						<div id="editbox" class="modal">
							<form class="modal-content animate">
								<div class="container2">
									<input type="text" placeholder="Edit Content" name="updateContent" onChange={this.handleChange} required></input>
									<button type="submit" >UPDATE</button>
								</div>
							</form>
							</div>
								<td style={{textAlign:"center",width:"120px",fontSize:"medium"}}>{data.name}</td>
								<td style={{textAlign:"center",width:"120px",fontSize:"medium"}}>{data.isbn}</td>
								<td style={{textAlign:"center",width:"40px",fontSize:"medium"}}>{data.price}</td>
								<td style={{textAlign:"center",width:"66px",fontSize:"medium"}}>{data.quantity}</td>
								<td style={{textAlign:"center",width:"40px",fontSize:"medium"}}><Button variant="contained" style={{background:"blue",color:"white"}}
									onClick={()=>this.deleteDataValue(data.isbn)}>Edit</Button>
								</td>
								<td style={{width:"40px",fontSize:"medium"}}><Button variant="contained" style={{background:"red",color:"white"}}
									onClick={()=>this.deleteDataValue(data.isbn)}>Delete</Button>
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