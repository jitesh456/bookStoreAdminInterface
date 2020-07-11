import React, { Component } from 'react';
import '../css/UserLogin.css';
import LoginBox from "./LoginBox";

export default class UserLogin extends Component {

    render() {

        return (
            
                <div className="login-page">
                    <div className="login-Box">
                        <LoginBox />
                    </div>
                </div>
            
        );
    }
}