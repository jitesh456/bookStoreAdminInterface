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


class AddBook extends React.Component
{
    constructor(props){
        super(props); 
        this.state={categorylist:['Adventure','Horror','Romantic','Science friction'],bookName:'',isbn:'',authorName:'',quentity:'',price:'',bookDescrption:'',category:''}
        this.handleSubmit=this.handleSubmit.bind(this);      
    }
    render(){
        return (
            <Card style={{ width:'400px',height:'auto',backgroundColor:'lightgrey'}}>
              <form onSubmit={this.handleSubmit}>
              <CardContent  >
                <TextField id="outlined-basic" name="bookName" label="BookName" variant="outlined" style={{ width:'200px',height:'40px'}} onChange={this.handleSubmit} />
              </CardContent>
              <CardContent  >
                <TextField id="outlined-basic" name="isbn" label="ISBN" variant="outlined" style={{ width:'200px',height:'40px'}} onChange={this.handleSubmit} />
              </CardContent>
              <CardContent  >
                <TextField id="outlined-basic" name="authorName" label="AuthorName" variant="outlined" style={{ width:'200px',height:'40px'}} onChange={this.handleSubmit} />
              </CardContent>
             
              <CardContent>
                <TextField id="outlined-basic" name="price" label="price" variant="outlined" style={{ width:'200px',height:'40px'}} onChange={this.handleSubmit}  />   
              </CardContent>

              <CardContent>
                <TextField id="outlined-basic" name="quantity" label="Quantity" variant="outlined" style={{ width:'200px',height:'40px'}} onChange={this.handleSubmit} />
              </CardContent>
              <CardContent>
              <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label" >Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    onChange={this.handleSubmit}
                    id="demo-simple-select-outlined"
                    name="category"
                    label="Category"
                    style={{ width:'200px',height:'40px',display:'flex' ,alignIteam:'center'}} 
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>     
                    {
                    this.state.categorylist.map((x)=><MenuItem value={x}>{x}</MenuItem>) 
                    }  
                  </Select>
                </FormControl>
              </CardContent>
              <CardContent>
                    <TextareaAutosize
                    name="bookDescrption"
                      rowsMax={4}
                      aria-label="maximum height"
                      placeholder="Book Discription"
                      onChange={this.handleSubmit}
                      style={{ width:'200px',height:'40px'}} 
                    />
             </CardContent>
            <CardContent>
              <Button  type="submit" size="50%"  style={{ width:'200px',height:'40px',backgroundColor:'Maroon',color:"white"}} >
                Submit
              </Button>
              
            </CardContent>
            </form>
          </Card>
        );
    }

    handleSubmit(event){
       this.setState({[event.target.name]:event.target.value}); 
       console.log(this.state.bookName);
       console.log(this.state.isbn);
       console.log(this.state.authorName);
    }

}
export default AddBook; 
  


 