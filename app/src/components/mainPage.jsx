import React, { Component } from 'react'
import Menu from './menu'
import Content from './main_page_content'
export default class MainPage extends Component {
    render() {
        return (
            <div className="MainPage">
                <Content>
                    <div className="fullcenter">
                        <p> Bem vindo ao fale mais </p>
                        <p className="description" >
                            O novo projeto da  <span> Telzir </span>
                        </p>
                        <p className="description row2">
                            Feito especialmente para <span style={{color: '#09e5ec' }} >você</span> 
                        </p>
                    </div>
                </Content>
            </div>
        )
    }
}