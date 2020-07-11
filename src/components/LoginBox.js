import React, { Component } from 'react';
import '../css/UserLogin.css';
import loginimage from '../assets/images/Login.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import Service from '../service/Service';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

let emailError = '';
let passwordError = '';

const theme = createMuiTheme({
    palette: {
        primary: { main: purple[500] },
        secondary: { main: '#B0002A' }
    },
});

export default class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showpassword: false,
            email: '',
            emailError: '',
            passwordError: '',
            loginChecked: true,
            validateform: false,
            loginMessage: '',
            alertShow: false,
            alertResponse: "", 
            index: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
       this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    }

    validate = (type) => {
        var emailPattern = /^[a-zA-Z]{3,}([-|+|.|_]?[a-zA-Z0-9]+)?[@]{1}[A-Za-z0-9]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]+)?$/;
        var passwordPattern = /[a-zA-Z0-9]{1,}$/;
        switch (type) {
            case 'email':
                if (!emailPattern.test(this.state.email)) {
                    emailError = "Enter valid email";
                }
                if (emailPattern.test(this.state.email)) {
                    emailError = "";
                }
                break;
            case 'password':
                if (this.state.password.length < 8 && this.state.password.length > 1) {
                    passwordError = " Min 8 characters";
                }
                if (!passwordPattern.test(this.state.password)) {
                    passwordError = "Enter proper password";
                }
                if (passwordPattern.test(this.state.password)) {
                    passwordError = "";
                }
                break;
            default:
                break;
        }
        if ( emailError || passwordError) {
            this.setState({      
                emailError: emailError,
                passwordError: passwordError,
            })
            return false;
        }
        return true;
    }

    handleChange(field, e) {
        this.setState({ [e.target.name]: e.target.value }, () => this.validate(field));
        this.setState({
            emailError: '',
            passwordError: '', 
            ChangeTab: false,
            validateform: false
        });
    }

    handleClickShowPassword = () => { this.setState({ showPassword: !this.state.showPassword }); }

    handleMouseDownPassword = (e) => { e.preventDefault(); }

    handleTabSelection = ({ target }) => { if ([target.name] === "login") { this.setState({ loginChecked: true}) } }

    componentDidMount() {
        this.setState({
            emailError: '',
            passwordError:'',
            validateform: false
        });
    }

  
    clearFieldsData = () => { this.setState({ password: "" }); }

    closeAlertBox = () => { this.setState({ alertShow: false }); }

    showAlert = (severity, alertShow, alertResponse) => {
        this.setState({
            severity: severity,
            alertShow: alertShow,
            alertResponse: alertResponse
        })
        this.props.dialogResponce(this.state.alertResponse);
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }
        Service.login(credentials).then(response => {
            console.log(response);
            if (response.data.statusCode === 200) {
                this.setState({
                    severity: "success",
                    alertShow: true,
                    alertResponse: response.data.message
                });
                this.clearFieldsData();
                document.getElementById("loginForm").reset();
                setTimeout(() => {
                    window.location.replace("/adminhome");
                }, 2000)
            } else {
                this.setState({
                    severity: "error",
                    alertShow: true,
                    alertResponse: response.data.message
                });
            }
        }).catch(error => {
            console.log(error.data)
        })
    }


    render() {
        const displayData = (
            <Tabs defaultIndex={this.state.index} >
                <TabList className="tablist" style={{marginLeft:'37%',paddingTop:'10%'}} >
                    <Tab ><input id="tab-1" type="radio" name="login" className="sign-in" checked={this.state.loginChecked}  /><label htmlFor="tab-1" className="tab1">Login</label></Tab>
                </TabList>
                <TabPanel className="tabpanel-content" >

                    <div className="login-field-container">
                        <form id="loginForm" onSubmit={this.handleLoginSubmit} onReset={this.reset}>
                            <div className="login-fields">
                                <div className="div_content">
                                    <TextField
                                        label="Email id"
                                        id="outlined-start-adornment"
                                        variant="outlined"
                                        className="info"
                                        color="secondary"
                                        name="email"
                                        onChange={this.handleChange.bind(this, 'email')}
                                        disabled={this.props.disableform}
                                        required
                                    />
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "12px",
                                            marginTop: "0.8%",
                                            marginBottom: "-3em",

                                        }}
                                    >
                                        {this.state.emailError}
                                    </p>
                                </div>
                                <div style={{ height: "35px" }}></div>
                                <div className="div_content">
                                    <FormControl style={{ width: "100%" }}>
                                        <InputLabel htmlFor="outlined-adornment-password" color="secondary" variant="outlined">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            color="secondary"
                                            name="password"
                                            className="info"
                                            onChange={this.handleChange.bind(this, 'password')}
                                            endAdornment={
                                                <InputAdornment position="end" className="adornment">
                                                    <IconButton className="icon-button"
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                        />
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "12px",
                                                marginTop: "1%",
                                                marginBottom: "-3em",

                                            }}
                                        ><div style={{ marginTop: "-5px" }} >{this.state.passwordError}</div>
                                        </p>

                                    </FormControl>
                                </div>


                                <div className="foot-lnk">
                                {/* <a href="/forget/password">Forgot Password?</a> */}
                                </div>
                                <Button type="submit" id="login-button" variant="contained">Login</Button>
                            </div>
                        </form>
                    </div>
                </TabPanel>
              
            </Tabs>
        );
        return (

            <div className="page">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={this.state.alertShow}
                    autoHideDuration={6000} onClose={this.closeAlertBox}>
                    <Alert onClose={this.closeAlertBox} severity={this.state.severity} variant={"filled"}>
                        {this.state.alertResponse}
                    </Alert>
                </Snackbar>

                <div className="main-container">
                    <img src={loginimage} alt="asd" className="login-image" />
                    <div className="bbStore">
                        <h3 >Bug Busters Book Store</h3>
                    </div>
                </div>
                <div className="login-container">
                    <ThemeProvider theme={theme}>
                        {displayData}
                    </ThemeProvider>
                </div>

            </div>


        );
    }
}