import React from 'react';
import '../css/DisplayData.css';
import Axios from 'axios';
import Button from '@material-ui/core/Button';


export default class DisplayData extends React.Component{
    constructor(props){
        super(props)
        this.state={
          data:[],
        };
        console.log(this.state)
      }
        
      deleteData(dataID){
      const {data}=this.state;
      this.setState({
        data:data.filter(data=>data.id!==dataID)
      })
      Axios.delete('http://localhost:8090/${dataID}').then(response=>{
              console.log(response);
              this.setState({date:response.data})
              console.log(this.state.data);
          }).catch(error=>{
              console.log(error);
          })    
          this.getAllDetails();
    }
    
    
    getAllDetails=()=>{
        Axios.get('http://localhost:8090/all').then(response=>{
              console.log(response);
              this.setState({date:response.data})
              console.log(this.state.data);
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
            im=<div id="container">
            <form class="table_Container animate">
            <table style={{overflow:"scroll"}}>
              <tr>
              <th style={{color:"green",fontSize:"medium"}}>Book Name</th>
                <th style={{color:"green",fontSize:"medium"}}>ISBN Number</th>
                <th style={{color:"green",fontSize:"medium"}}>Price</th>
                <th style={{color:"green",fontSize:"medium"}}>Quantity</th>
                <th style={{color:"green",fontSize:"medium"}}>Description</th>
                <th style={{color:"green",fontSize:"medium"}}>Edit</th>
                <th style={{color:"green",fontSize:"medium"}}>Delete</th>
              </tr>
              {
              this.state.data.map((data =>{
                return <tr >
                <div id="editbox" class="modal">
                  <form class="modal-content animate">
                    <div class="container2">
                      <input type="text" placeholder="Edit Content" name="updateContent" onChange={this.handleChange} required></input>
                      <button type="submit" >UPDATE</button>
                    </div>
                  </form>
                </div>
                  <td style={{fontSize:"medium"}}>{data.bookname}</td>
                  <td style={{fontSize:"medium"}}>{data.isbn}</td>
                  <td style={{fontSize:"medium"}}>{data.price}</td>
                  <td style={{fontSize:"medium"}}>{data.quantity}</td>
                  <td style={{fontSize:"medium"}}>{data.description}</td>
                  <td style={{fontSize:"medium"}}><Button variant="contained" style={{background:"blue",color:"white"}}
                  onClick={()=>this.deleteDataValue(data.isbn)}>
                    Edit
                    </Button></td>
                  <td><Button variant="contained" style={{background:"red",color:"white"}}
                  onClick={()=>this.deleteDataValue(data.isbn)}>
                    Delete
                    </Button></td>
                </tr>
              }))
            }
            </table>
            </form>
          </div>
        }else{
          im=<div></div>
        }
    
        return (
          im
        );
      }
}