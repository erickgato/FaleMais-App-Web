import React, { Component } from 'react'
import './stylizations/menu.scss'
import { Link } from 'react-router-dom'

export default class Menu extends Component { 
    render() {
        return (
            <div className="menu">
                <div className="title">
                    <span><Link to="/"> Telzir </Link></span>
                </div>
                <nav>
                    <ul>
                        <li >  <Link to="/">  PLANS </Link> </li>
                        <li > <Link to="/about"> ABOUT </Link>  </li>
                    </ul>
                </nav>
            </div>
        )
    }

}