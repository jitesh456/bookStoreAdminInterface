import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import '../css/AddBook.css';
import Service from '../service/Service.js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '', bookName: '', isbn: '', authorName: '', quantity: '', price: '', bookDescrption: '',
      category: '', file: '', isbnError: '', authorNameError: '', quantityError: '', fileError: '',
      priceError: '', bookDescrptionError: '',editFlag:false,snackbaropen:false,snackbarmsg:''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange=this.handleFileChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleError(event) {
    var value = event.target.value;
    var name = event.target.name;
  }

  snackbarClose=(event)=>{
    this.setState({snackbaropen:false});
  };

  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const book={
        name :this.state.bookName,
        price :this.state.price,
        quantity :this.state.quantity,
        authorName :this.state.authorName,
        bookCover :this.state.file,
        isbn :this.state.isbn,
        category :this.state.category,
        bookDetails :this.state.bookDescrption,
      }
      Service.storeBook(book).then(response => {
        console.log(response.data);
        this.setState({snackbaropen:true,snackbarmsg:response.data.message})
        if(response.status===200){
          document.getElementById("baseForm").reset();
        }
        console.log(this.state);
      }).catch(error => {
        console.log(error);
      })
     
    }
  }

  handleFileChange(event){
    const selectedImage=new FormData();
    selectedImage.append('file',event.target.files[0]);
    console.log(selectedImage)
    Service.uploadImage(selectedImage).then((response)=>{
      console.log(response.data)
      this.setState({
        file:response.data.fileName
      })
      console.log(this.state.bookCover)
    }).catch((error)=>{
      console.log(error)
    })
  }


  handleChange(field, event) {
    this.setState({ [event.target.name]: event.target.value }
      , () => this.validate(field));

    this.setState({
      isbnError: '',
      authorNameError: '',
      quantityError: '',
      priceError: '', fileError: '',
      bookDescrptionError: ''
    });
  }

  validate = (type) => {


    var isbnPattern = /^((?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+)$/;
    var namePAttern = /^([A-Za-z.]+[ ]{1}[A-Za-z.]*[ ]*[A-Za-z.]*)$/;
    var numberPattern = /^([1-9]{1}([0-9]*))$/;
    let isbnError = '';
    var validExtension= ['png','jpg','jpeg','bmp'];
    let authorNameError = '';
    let quantityError = '';
    let priceError = '';
    let fileError = '';
    let bookDescrptionError = '';
    switch (type) {

      case 'isbn':
        if (!isbnPattern.test(this.state.isbn)) {
          isbnError = "Please Enter 10/13 digit ISBN number";
        }
        break;
      case 'authorName':
        if (!namePAttern.test(this.state.authorName)) {
          authorNameError = "Please Enter proper name";
        }
        break;
      case 'quantity':
        if (this.state.quantity === "0") {
          quantityError = "Quantity cannot be zero";
        }
        if (!numberPattern.test(this.state.quantity)) {
          quantityError = "Please Enter proper numbers";
        }
        break;
      case 'price':
        if (this.state.price === "0") {
          quantityError = "Price cannot be zero";
        }
        if (!numberPattern.test(this.state.price)) {
          priceError = "Please Enter proper numbers";
        }
        break;
      case 'file':
        var fileNameExtension=this.state.file.substr(this.state.file.lastIndexOf('.')+1);
        if ( !validExtension.includes(fileNameExtension)) {
          fileError = "Only these image type accepted:  jpg,png,jpeg,bmp";
        }
        break;
      case 'bookDescrption':
        if (this.state.bookDescrption.length > 250) {
          bookDescrptionError = "Please Enter max 250 characters only"
        }
        break;
      default:
        break;
    }


    if (quantityError || isbnError || priceError || authorNameError || fileError || bookDescrptionError) {
      this.setState({
        authorNameError: authorNameError,
        isbnError: isbnError,
        quantityError: quantityError,
        priceError: priceError,
        fileError: fileError,
        bookDescrptionError: bookDescrptionError
      })
      return false;
    }
    return true;

  }

  componentDidMount() {
    this.setState({
      authorNameError: "",
      isbnError: "",
      quantityError: "",
      priceError: "", fileError: ""
    })
  }

  render() {
    let im = [];
    if (this.props.show) {
      im =
      <div id='container'>
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
        <form id="baseForm" onSubmit={this.handleSubmit} onReset={this.reset}>
          <Card class="card">
            <CardContent className="content">
              <div className="div_content">
                <TextField name="bookName" label="Book Name" variant="outlined" onChange={this.handleChange.bind(this, 'bookName')}
                  className="card_content" onKeyUp={this.handleError} required />
                <div className="error_message"></div>
              </div>

              <div style={{ width: "20px" }}></div>

              <div className="div_content">
                <TextField name="isbn" label="ISBN" variant="outlined" onChange={this.handleChange.bind(this, 'isbn')}
                  className="card_content" required />
                <div className="error_message">{this.state.isbnError}</div>
              </div>
            </CardContent>
            <CardContent className="content">
              <div className="div_content">
                <TextField name="authorName" label="Author Name" variant="outlined" onChange={this.handleChange.bind(this, 'authorName')}
                  className="card_content" required />
                <div className="error_message">{this.state.authorNameError}</div>
              </div>

              <div style={{ width: "20px" }}></div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="div_content">
                  <TextField name="price" label="Price" variant="outlined" onChange={this.handleChange.bind(this, 'price')}
                    className="card_det" required />
                  <div className="error_message">{this.state.priceError}</div>
                </div>
                <div style={{ width: "20px" }}></div>
                <div className="div_content">
                  <TextField name="quantity" label="Quantity" variant="outlined" onChange={this.handleChange.bind(this, 'quantity')}
                    className="card_det" onKeyUp={this.handleError} required />
                  <div className="error_message">{this.state.quantityError}</div>
                </div>

              </div>
            </CardContent>
            <CardContent className="content">
              <div className="div_content" style={{ marginTop:"30px"}}>
                  <input type="file" name="file" label="File Url" variant="outlined" onChange={this.handleFileChange.bind('file')}
                  className="card_content" onKeyUp={this.handleError} required />
                <div className="error_message">{this.state.fileError}</div>
              </div>

              <div style={{ width: "20px" }}></div>

              <div className="div_content">
              <FormControl variant="outlined"  >
                <InputLabel id="demo-simple-select-outlined-label" >Category</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  onChange={this.handleChange.bind(this, 'category')}
                  id="demo-simple-select-outlined"
                  name="category"
                  label="Category"
                  className="card_content category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Horror">Horror</MenuItem>
                  <MenuItem value="Sci-Fiction">Sci-Fiction</MenuItem>
                  <MenuItem value="Romantic">Romantic</MenuItem>
                </Select>
              </FormControl>
              </div>
              </CardContent>
            <CardContent>
              <div>
                  <TextField
                    id="outlined-multiline-static"
                    name="bookDescrption"
                    label="Book Description"
                    multiline
                    rows={2}
                    variant="outlined"
                    onChange={this.handleChange.bind(this, 'bookDescrption')}
                    style={{ height: "60px" }} className="textarea_content"
                    required
                  />

              </div>
            </CardContent>
            <CardContent>
              <Button type="submit" size="50%" style={{ width: '200px', height: '40px', backgroundColor: 'Maroon', color: "white" }} >
                Add
          </Button>

            </CardContent>
          </Card>
        </form>
        </div>
    }
    else {
      im = <div></div>
    }
    return (im);
  }
}