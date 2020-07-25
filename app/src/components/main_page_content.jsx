import React, { Component } from 'react'
import './stylizations/Mp_Content.scss'
export default class Mp_Content extends Component {
    render(){
        return (
            <div id="content">
                {this.props.children}
            </div>
        )
    }
}