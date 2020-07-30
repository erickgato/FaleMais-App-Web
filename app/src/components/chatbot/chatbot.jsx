import React from 'react';
import Messages from './mesages.json';
import { Bot, People } from './message';
import sendicon from '../../UI/images/sendicon.png'
import '../stylizations/chat.scss'
export default class ChatBot extends React.Component {
    constructor(props) {
        super(props);
        this.DummyData = []

        let index = 0;
        for (let [key] in Messages.data) {
            this.DummyData.push({
                Qname: key,
                question: Messages.data[key],
                id: index
            })
            ++index;
        }
        this.state = {
            People: {
                input: '',

            },
            messages: [],
            Bot: {
                messageid: this.DummyData[0].id,
                passedmessages: [],
            },
        }
        this.key = 0;
        // Binds
        this.Setinput = this.Setinput.bind(this);
        this.Pushinput = this.Pushinput.bind(this);
        this.GetnextMessage = this.GetnextMessage.bind(this);
        this.AwaitMessage = this.AwaitMessage.bind(this);

    }
    GetnextMessage(Messageid) {
        const NextMessage = this.DummyData.filter(msg => msg.id === Messageid);
        return NextMessage;
    }
    AwaitMessage() {
        this.setState((state) => {
            const Msg = this.GetnextMessage(state.Bot.messageid);
            const nwMessage = [...state.Bot.passedmessages, Msg];
            return {
                Bot: {
                    passedmessages: nwMessage,
                    messageid: state.Bot.messageid + 1
                }

            }
        });
    }
    SayHello() {
        return Messages.hello;
    }

    Setinput(value) {
        this.setState(() => {
            return {
                People: {
                    input: value
                }
            }
        });
    }
    Pushinput() {
        this.setState(state => {
            const messages = [...state.messages, this.state.People.input]
            const input = ''
            return {
                People: {
                    input,
                },
                messages
            }
        })
        this.AwaitMessage();
    }
    render() {
        return (
            <React.Fragment>
                <div className="chat">
                    <div className="messagearea">
                        <div className="bot">
                            <Bot message={this.SayHello()} key='hellobot' />
                            {this.state.Bot.passedmessages.map(message => {
                                return message.map(value => {
                                    return <Bot key={value.id} message={value.question} />
                                })
                            })}
                        </div>
                        <div className="people" id="">
                            {this.state.messages.map(msg => {
                                ++this.key;
                                return (
                                    <People key={this.key} message={msg} />
                                )
                            })}
                        </div>

                    </div>
                    <div className="messageinput">
                        <input id="messageinput" value={this.state.People.input} type="text" onChange={v => this.Setinput(v.target.value)} placeholder="Escreva algo..." />
                        <button onClick={this.Pushinput} ><img src={sendicon} alt="enviar" /></button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}