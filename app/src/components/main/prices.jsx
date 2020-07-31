import React from 'react'

import Menu from '../menu'
import "../stylizations/prices.scss"
import ChatBot from '../chatbot/JsonMapper'
export default class Prices extends React.Component {
    render() {
        return (
            <div className="pricingpage">
                <Menu />
                {console.log(ChatBot().then((bot => console.log(bot))))}
            </div>
        )
    }

}