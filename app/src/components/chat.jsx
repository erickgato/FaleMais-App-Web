import React from 'react'

import { People } from './chatbot/message'

import sendicon from '../UI/images/sendicon.png'

import './stylizations/chat.scss'
import ChatBot from './chatbot/chatbot'

export default class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            messages: [],
            nextMessage: false
        };
        this.key = 0;
        /*  Binds*/ 
        this.Setinput = this.Setinput.bind(this);
        this.Pushinput = this.Pushinput.bind(this);
    }

    Setinput(value) {
        this.setState({ input: value ,nextMessage: false });
    }
    Pushinput() {
        this.state.messages.push(this.state.input);
        this.setState({ 
            input: '', 
            nextMessage: true
        });
    }
    render() {
        return (
            <div className="chat">
                <div className="messagearea">
                    <div className="bot">
                       <ChatBot gonext={true} />
                    </div>
                    <div className="people" id="">
                        {this.state.messages.map(message => {
                            ++this.key;
                            return (
                                <People key={this.key} message={`${message}`} />
                            )
                        })}
                    </div>

                </div>
                <div className="messageinput">
                    <input id="messageinput" value={this.state.input} type="text" onChange={v => this.Setinput(v.target.value)} placeholder="Escreva algo..." />
                    <button onClick={this.Pushinput} ><img src={sendicon} alt="enviar" /></button>
                </div>
            </div>


        )
    }
}
