import React, { Component } from 'react'
import Content from './main_page_content'
import Menu from './menu'
export default class MainPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu transparent={true} />
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
            </React.Fragment>
        )
    }
}