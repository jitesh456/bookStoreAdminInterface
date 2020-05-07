import React from 'react';
import Card from '@material-ui/core/Card';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import '../css/AddBook.css';
import Axios from 'axios';

export default class AddBook extends React.Component
{
    constructor(props){
        super(props); 
        this.state={msg:'',bookName:'',isbn:'',authorName:'',quantity:'',price:'',bookDescrption:'',
                category:'',file:'',isbnError: '', authorNameError:'',quantityError:'',fileError:'',
                priceError:'', bookDescrptionError:''}  
       
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleError=this.handleError.bind(this);
    }

    handleError(event){
      var value=event.target.value;
      var name=event.target.name;
    }
  
    handleSubmit(event){
      event.preventDefault();
      const isValid =this.validate();
      if(isValid){
      const book={
        bookname:this.state.bookName,
        isbn:this.state.isbn,
        authername:this.state.authorName
      }
      document.getElementById("baseForm").reset();
      Axios.post('http://localhost:8090/add',{book}).then(response=>{
            console.log(response);
            this.setState({convert:response.data})
            console.log(this.state.convert);
        }).catch(error=>{
            console.log(error);
        })
    }
  }


	handleChange(field,event){
    this.setState({[event.target.name]:event.target.value}
      , ()=> this.validate(field) ); 
    
    this.setState({
      isbnError: '',
      authorNameError:'',
      quantityError:'',
      priceError:'',fileError:'',
      bookDescrptionError:''
    }); 
  }

  validate = (type) => {
    
   
    var isbnPattern = /^((?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+)$/;
    var namePAttern = /^([A-Za-z.]+[ ]{1}[A-Za-z.]*[ ]*[A-Za-z.]*)$/;
    var numberPattern = /^([1-9]{1}([0-9]*))$/;
    let isbnError = '';
   let  authorNameError='';
   let quantityError='';
   let priceError='';
   let fileError='';
   let bookDescrptionError='';
    switch(type){
    
    case 'isbn':
        if(!isbnPattern.test(this.state.isbn)){
          isbnError="Please Enter 10-13 digit isbn number";
        }
        break;
    case 'authorName' :
         if(!namePAttern.test(this.state.authorName)){
             authorNameError="Please Enter proper name";
          }
        break;
    case 'quantity':
      if (this.state.quantity === "0"){
        quantityError="Quantity cannot be zero";
      }
      if(!numberPattern.test(this.state.quantity)){
        quantityError="Please Enter proper numbers";
      }
      break;
    case 'price' :
      if (this.state.price === "0"){
        quantityError="Price cannot be zero";
      }
      if(!numberPattern.test(this.state.price)){
          priceError="Please Enter proper numbers";
      }
      break;
    case 'file':
      if(this.state.file === ''){
        fileError = "Please Select file";
      }
      break;
    case 'bookDescrption':
      if(this.state.bookDescrption.length > 250){
        bookDescrptionError= "Please Enter max 250 characters only"
      }
    default :
      break;
  }
  

    if(quantityError || isbnError || priceError ||authorNameError || fileError ||bookDescrptionError ){
      this.setState({
        authorNameError:authorNameError,
        isbnError:isbnError,
        quantityError:quantityError,
        priceError:priceError,
        fileError:fileError,
        bookDescrptionError:bookDescrptionError
      })
      return false;
    }
    return true;

  }

  componentDidMount(){
    this.setState({
      authorNameError:"",
      isbnError:"",
      quantityError:"",
      priceError:"",fileError:""
    })
  }

    render(){
      let im=[];
      if(this.props.show){
        im=
          <form  id = "baseForm" onSubmit={this.handleSubmit} onReset={this.reset}> 
          <Card class="card">
            <CardContent className="content">
            <div className="div_content">
					    <TextField name="bookName" label="Book Name" variant="outlined" onChange={this.handleChange.bind(this, 'bookName')} 
					      className="card_content" onKeyUp={this.handleError} required/>
					      <div className="error_message"></div>
				      </div>
			  
				<div style={{width:"20px"}}></div>
              
				<div className="div_content">
					<TextField name="isbn" label="ISBN" variant="outlined" onChange={this.handleChange.bind(this,'isbn')} 
					className="card_content" required/>
					<div className="error_message">{this.state.isbnError}</div>
				</div>
            </CardContent>
             <CardContent  className="content">
            <div className="div_content">
					    <TextField name="authorName" label="Author Name" variant="outlined" onChange={this.handleChange.bind(this,'authorName')} 
					    className="card_content" required/>
					    <div className="error_message">{this.state.authorNameError}</div>
			    	</div>
			  
				<div style={{width:"20px"}}></div>

        <div style={{display:"flex",flexDirection:"row"}}>
        <div className="div_content">
					<TextField name="price" label="Price" variant="outlined" onChange={this.handleChange.bind(this,'price')} 
					className="card_det" required/>   
					<div className="error_message">{this.state.priceError}</div>
        </div>
          <div style={{width:"20px"}}></div>
          <div className="div_content">
					<TextField name="quantity" label="Quantity" variant="outlined" onChange={this.handleChange.bind(this,'quantity')} 
              className="card_det" onKeyUp={this.handleError} required/>   
					<div className="error_message">{this.state.quantityError}</div>
        </div>      
				
				</div>
        </CardContent>
        <CardContent className="content">
          <div>
            <input type="file" name="file" onChange={this.handleChange.bind(this,'file')} className="card_content"/>
            <div className="error_message">{this.state.fileError}</div>
            </div>
            <div style={{width:"20px"}}></div>
            <FormControl variant="outlined"  >
              <InputLabel id="demo-simple-select-outlined-label" >Category</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                onChange={this.handleChange.bind(this,'category')}
                id="demo-simple-select-outlined"
                name="category"
                label="Category"
                className="card_content category"
              >
                
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Adventure</MenuItem>
                <MenuItem value={2}>Horror</MenuItem>
                <MenuItem value={3}>Sci-Fiction</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardContent>
              <div>
                <TextareaAutosize
                  name="bookDescrption"
                  rowsMax={0}
                  aria-label="maximum height"
                  placeholder="Book Discription"
                  onChange={this.handleChange.bind(this,'bookDescrption')}
                  style={{height:"60px"}} className="textarea_content" 
                  required/>
                
                </div>
         </CardContent>
        <CardContent>
          <Button  type="submit" size="50%"  style={{ width:'200px',height:'40px',backgroundColor:'Maroon',color:"white"}} >
            Add
          </Button>
          
        </CardContent> 
      </Card>
      </form>
      
      }
      else{
        im=<div></div>
      }
        return ( im );
    }

}



 