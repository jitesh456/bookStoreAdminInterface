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
                category:'',
                isbnError: '',
                authorNameError:'',
                quantityError:'',
                priceError:''}  
       
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
      console.log(book);
      Axios.post('http://localhost:8090/add',{book}).then(response=>{
            console.log(response);
            this.setState({convert:response.data})
            console.log(this.state.convert);
        }).catch(error=>{
            console.log(error);
        })
    }
  }


	handleChange(event){
    this.setState({[event.target.name]:event.target.value}); 
  }

  validate = () => {
    var isbnPattern = /^([1-9]{1}([0-9]*))$/;
    var namePAttern = /^([A-Za-z]+[ ]*[a-zA-Z]*)$/;
    var numberPattern = /^([1-9]{1}([0-9]*))$/;
    let isbnError = '';
   let  authorNameError='';
   let quantityError='';
   let priceError='';
   

    if(!isbnPattern.test(this.state.isbn)){
      isbnError="Please Enters only numbers";
    }
    if(!namePAttern.test(this.state.authorName)){
      authorNameError="Please Enters only letters";
    }
    if(!numberPattern.test(this.state.quantity)){
      quantityError="Please Enters only numbers";
    }
    if(!numberPattern.test(this.state.price)){
      priceError="Please Enters only numbers";
      
    }

    if(quantityError || isbnError || priceError ||authorNameError ){
      this.setState({
        authorNameError:authorNameError,
        isbnError:isbnError,
        quantityError:quantityError,
        priceError:priceError
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
      priceError:""
    })
  }

    render(){
      let im=[];
      if(this.props.show){
        im=
          <form onSubmit={this.handleSubmit} onReset={this.reset}> 
          <Card class="card">
            <CardContent className="content">
            <div className="div_content">
					    <TextField name="bookName" label="Book Name" variant="outlined" onChange={this.handleChange} 
					      className="card_content" onKeyUp={this.handleError} required/>
					      <div className="error_message"></div>
				      </div>
			  
				<div style={{width:"20px"}}></div>
              
				<div className="div_content">
					<TextField name="isbn" label="ISBN" variant="outlined" onChange={this.handleChange} 
					className="card_content" required/>
					<div className="error_message">{this.state.isbnError}</div>
				</div>
            </CardContent>
            <CardContent  className="content">
            <div className="div_content">
					    <TextField name="authorName" label="Author Name" variant="outlined" onChange={this.handleChange} 
					    className="card_content" required/>
					    <div className="error_message">{this.state.authorNameError}</div>
			    	</div>
			  
				<div style={{width:"20px"}}></div>

        <div style={{display:"flex",flexDirection:"row"}}>
        <div className="div_content">
					<TextField name="price" label="Price" variant="outlined" onChange={this.handleChange} 
					className="card_det" required/>   
					<div className="error_message">{this.state.priceError}</div>
        </div>
          <div style={{width:"20px"}}></div>
          <div className="div_content">
					<TextField name="quantity" label="Quantity" variant="outlined" onChange={this.handleChange} 
              className="card_det" onKeyUp={this.handleError} required/>   
					<div className="error_message">{this.state.quantityError}</div>
        </div>      
				
				</div>
        </CardContent>
        <CardContent className="content">
            <input type="file" name="file" onChange={this.handleChange} className="card_content"/>
            <div style={{width:"20px"}}></div>
            <FormControl variant="outlined"  >
              <InputLabel id="demo-simple-select-outlined-label" >Category</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                onChange={this.handleChange}
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
                <TextareaAutosize
                  name="bookDescrption"
                  rowsMax={0}
                  aria-label="maximum height"
                  placeholder="Book Discription"
                  onChange={this.handleChange}
                  style={{height:"60px"}} className="textarea_content" 
                  required/>
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



 