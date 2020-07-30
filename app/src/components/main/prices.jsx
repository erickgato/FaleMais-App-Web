import React from 'react'

import Menu from '../menu'
import "../stylizations/prices.scss"
import ChatBot from '../chatbot/chatbot'
export default class Prices extends React.Component {
    render() {
        return (
            <div className="pricingpage">
                <Menu />
                <ChatBot />
            </div>
        )
    }

}