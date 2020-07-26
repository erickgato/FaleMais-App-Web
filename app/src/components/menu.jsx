import React, { Component } from 'react'
import './stylizations/menu.scss'
import { Link } from 'react-router-dom'

export default class Menu extends Component { 
    render() {
        const classname = `menu ${this.props.transparent === true ? 'transparent' : '' }`;
        return (      
            <div className={classname}>
                <div className="title">
                    <span><Link to="/"> Telzir </Link></span>
                </div>
                <nav>
                    <ul>
                        <li >  <Link to="/prices">  PREÇOS </Link> </li>
                        <li > <Link to="/about"> SOBRE </Link>  </li>
                    </ul>
                </nav>
            </div>
        )
    }

}