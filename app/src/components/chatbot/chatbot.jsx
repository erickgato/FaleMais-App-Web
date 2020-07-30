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
                question: Messages.data[key].question,
                options: Messages.data[key].options,
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
                messageid: this.DummyData[0].id + 1,
                passedmessages: [[this.DummyData[0]]],
                ReceivedData: []
            },
        }
        this.key = 0;
        // Binds
        this.Setinput = this.Setinput.bind(this);
        this.Pushinput = this.Pushinput.bind(this);
        this.GetnextMessage = this.GetnextMessage.bind(this);
        this.AwaitMessage = this.AwaitMessage.bind(this);
        this.PushData = this.PushData.bind(this);
        this.SearchResults = this.SearchResults.bind(this);
        this.RenderInputs = this.RenderInputs.bind(this);
        this.RenderOptions = this.RenderOptions.bind(this);
        this.setOptionClick = this.setOptionClick.bind(this);
        this.RenderMessagesInputs = this.RenderMessagesInputs.bind(this);
        this.SubmitButton = this.SubmitButton.bind(this);
    }
    GetnextMessage(Messageid) {
        const NextMessage = this.DummyData.filter(msg => msg.id === Messageid);
        return NextMessage;
    }

    /**
    * @Returns object
    * @Trow New Error
    */

    async SearchResults() {
        try {
            const inputs = this.state.Bot.ReceivedData;
            console.log(inputs);
            const Tarifas = await fetch(`http://localhost:4000/api/tarifas/destino?origin=${inputs[1]}&destination=${inputs[2]}`);
            const Plano = await fetch(`http://localhost:4000/api/plans/specifico?id=${inputs[4]}`);
            if (Tarifas.status === 404 || Plano.status === 404) 
                return this.setState(state => {
                        return {
                            Bot: {
                                ...state.Bot,
                                passedmessages: [...state.Bot.passedmessages, [{
                                    Qname: '404',
                                    question: 'Valor não encontrado no seridor não encontrado no servidor',
                                    id: 'error 404',
                                    options: [{
                                        content: 'Tentar denovo',
                                        id: '80',
                                    }]
                                }]]
                            }
                        }
                    });
            const _Data = await Tarifas.json();
            const _Plano = await Plano.json();

            return {
                price: await _Data[0].H_M,
                origin: await _Data[0].origem,
                dest: await _Data[0].destino,
                tolerancy: await _Plano[0].pl_tolerancy
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    AwaitMessage() {
        const Msg = this.GetnextMessage(this.state.Bot.messageid);
        if (Msg.length === 0) {
            this.SearchResults()
                .then(value => {
                    console.log(value)
                });
        }
        this.setState((state) => {

            let nwMessage = [...state.Bot.passedmessages, Msg];
            /*indicates that the number of messages has reached the end */


            /* 
            let PreparedString;
            const FinalMessage = Messages.Output;
            const SplitFinalMessage = FinalMessage.split(',');
            let PreparedArray = this.state.Bot.ReceivedData.map((data, i) => {
                return SplitFinalMessage[i].replace('$I', data);
            });
            PreparedString = PreparedArray.join(',');
            const LastMessage = {
                Qname: 'LastMessage',
                question: PreparedString,
                id: 'Last Message',
            }
            
            nwMessage = [...state.Bot.passedmessages, [LastMessage]];
            */


            return {
                Bot: {
                    ...state.Bot,
                    passedmessages: nwMessage,
                    messageid: state.Bot.messageid + 1,
                }

            }
        });
    }
  
    SubmitButton(target) {
        if(target.charCode===13){
            this.PushData();
        }
    }
    SayHello() {
        return Messages.hello;
    }

    Setinput(value) {
        this.setState({
            People: {
                input: value
            }
        });
    }
    PushData(value = this.state.People.input) {
        this.setState(state => {
            return {
                Bot: {
                    ...state.Bot,
                    ReceivedData: [...state.Bot.ReceivedData, value],
                }
            }
        })
        this.Pushinput(value);
    }
    Pushinput(data = this.state.People.input) {
        this.setState(state => {
            const messages = [...state.messages, data]
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
    RenderInputs() {
        return (
            <React.Fragment>
                <input 
                    key={`i-${this.key}`}
                    ref={(input) => { this.messageinput = input; }}
                    id="messageinput" value={this.state.People.input} 
                    type="text" onChange={v => this.Setinput(v.target.value)}
                    onKeyPress={this.SubmitButton}
                    placeholder="Escreva algo..."
                    autoFocus
                     />
                <button
                     key={`b-${this.key}`}
                     onClick={() => this.PushData()} >
                             < img key={`img-${this.key}`}
                                 src={sendicon} alt="enviar" 
                                 
                            />
                </button>
            </React.Fragment>

        )
    }
    RenderOptions() {
        let Index = this.state.Bot.messageid;
        const Datasets = this.state.Bot.passedmessages[Index - 1].map(optvalue => {
            return optvalue.options
        })
        return (Datasets.map(option => {
            return option.map((item, i) => {
                return <button className="botoption" key={`opt-${i}`} onClick={() => this.setOptionClick(item.id)} > {item.content} </button>
            })

        }))
    }
    setOptionClick(optionvalue) {
        this.setState(() => {
            return {
                People: {
                    input: optionvalue
                }
            }
        })
        console.log(this.state.People.input);
        this.PushData()
    }

    RenderMessagesInputs() {
        let Index = this.state.Bot.messageid;
        const Data = this.state.Bot.passedmessages[Index - 1].map(message => {
            return message.options
        });
        if (Data.toString() === '')
            return this.RenderInputs()
        else
            return this.RenderOptions()

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
                        {this.RenderMessagesInputs()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}