import React, { Component } from 'react';
import Navbar from './navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './content/home';
import Calculator from './content/calculator';
import Login from './content/login';
import NotFound from './content/noFound';
import Register from './content/register';
import $ from 'jquery';


class App extends Component {
    state = {
        is_login: true,
        username: "xje",
    };

    componentDidMount() {
        return;
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/calculator/get_status/",
            type: "get",
            success: resp => {
                console.log(resp);
                if (resp.result === "login") {
                    this.setState({
                        is_login: true,
                        username: resp.username,
                    })
                } else {
                    this.setState({
                        is_login: false,
                    })
                }
            }
        });
    }


    render() {
        return (
            <React.Fragment>
                <Navbar is_login={this.state.is_login} username={this.state.username} />
                <div className='contanier'>
                    <Routes>
                        <Route path='/calculator' element={<Home />}></Route>
                        <Route path='/calculator/home' element={<Home />}></Route>
                        <Route path='/calculator/calculator' element={this.state.is_login ? <Calculator /> : <Navigate replace to='/calculator/login' />}></Route>
                        <Route path='/calculator/login' element={this.state.is_login ? <Navigate replace to='/calculator/' /> : <Login />}></Route>
                        <Route path='/calculator/register' element={this.state.is_login ? <Navigate replace to='/calculator/' /> : <Register />}></Route>
                        <Route path='/calculator/404' element={<NotFound />}></Route>
                        <Route path='/calculator/*' element={<Navigate replace to='/calculator/404' />}></Route>
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;