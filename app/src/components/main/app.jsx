import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../Routes/'
import Menu from '../menu'
export default class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <Menu/>
                <Routes/>
            </BrowserRouter>
           
        )
        
    }
}