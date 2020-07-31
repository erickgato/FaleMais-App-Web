import React from 'react'

import Menu from '../menu'
import "../stylizations/prices.scss"
import ChatBot from '../chatbot/chatbot'
import JsonMaper from '../chatbot/JsonMapper'
export default class Prices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            AsyncChatBot: false,
        }
        this.GetMappedData = this.GetMappedData.bind(this)
    }
    componentDidMount() {
        this.GetMappedData();
    }
    GetMappedData() {
        JsonMaper().then((data) => {
            this.setState(() => {
                return {
                    AsyncChatBot: <ChatBot steps={data} />
                }
            })
        })
    }
    render() {
        return (
            <div className="pricingpage">
                <Menu />
                {this.state.AsyncChatBot}
               
            </div>
        )
    }

}