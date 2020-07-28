import React from 'react'
import Table from '../table'
import Data from '../Tabledata'
import Menu from '../menu'
import "../stylizations/prices.scss"
import { Bot, People } from '../message'
export default class Plans extends React.Component {
    render() {
        return (
            <div className="pricingpage">
                <Menu />
                <div className="messagearea">
                    <div className="bot">
                        <Bot message="Olá eu sou a bot" />
                    </div>
                    <div className="people">
                        <People message="Meu nome é erick " />
                    </div>
                    
                </div>
                <div className="messageinput">
                    <input type="text" placeholder="Escreva algo" />
                </div>
                {/* <div className="content">
                    <Table>
                        <Data rows={{ dddor: 41, dddD: 32, time: 30, plan: 'fale mais 30', Wfl: 'R$ 50', WTfl: 'R$ 100' }}/> 
                        <Data rows={{ dddor: 41, dddD: 32, time: 80, plan: 'fale mais 90', Wfl: 'R$ 290', WTfl: 'R$ 500' }}/>               
                    </Table>
                </div> */}

            </div>
        )
    }
}