import React from 'react';
import Messages from './mesages.json';
import { Bot, People } from './message';
import sendicon from '../../UI/images/sendicon.png'
import '../stylizations/chat.scss'
import DataMapper from './Datamaper'

export default class ChatBot extends React.Component {
    constructor(props) {
        super(props);
        this.DummyData = []
        let index = 0;
        for (let [key] in props.steps.data) {
            this.DummyData.push({
                Qname: key,
                question: props.steps.data[key].question,
                options: props.steps.data[key].options,
                Response: props.steps.data[key].response || '',
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
        this.RenderInputs = this.RenderInputs.bind(this);
        this.RenderOptions = this.RenderOptions.bind(this);
        this.setOptionClick = this.setOptionClick.bind(this);
        this.RenderMessagesInputs = this.RenderMessagesInputs.bind(this);
        this.SubmitButton = this.SubmitButton.bind(this);
        this.DueTheFinalMessage = this.DueTheFinalMessage.bind(this);
        this.ClearChat = this.ClearChat.bind(this);
        this.RenderMessages = this.RenderMessages.bind(this);
    }
    ClearChat() {
        this.setState(() => {
            return {
                People: {
                    input: '',
                },
                messages: [],
                Bot: {
                    messageid: this.DummyData[0].id + 2,
                    passedmessages: [[this.DummyData[0]], [this.DummyData[1]]],
                    ReceivedData: ['']
                },
            }
        })
    }
    /**
        * @returns {Object}
        */
    GetnextMessage(Messageid) {
        const NextMessage = this.DummyData.filter(msg => msg.id === Messageid);
        return NextMessage;
    }

    /**
        * @Returns object
        * 
        */
    FormatInputs(array) {
        return {
            Origin: array[1],
            Destination: array[2],
            Time: array[3],
            Planid: this.plano
        }
    }
    DueTheFinalMessage() {
        const Data = new DataMapper(this.FormatInputs(this.state.Bot.ReceivedData));
        Data.GetResults().then((results) => {
            const FinalMessage = Messages.Output;
            const SplitFinalMessage = FinalMessage.split(',');
            let PreparedString = '';
            Object.values(results).forEach((val, index) => {
                PreparedString += SplitFinalMessage[index].replace('$I', val);
            })
            const LastMessage = {
                Qname: 'LastMessage',
                question: PreparedString,
                id: 'Last Message',
                options: [
                    {
                        content: 'Fazer consulta novamente',
                        id: 40
                    }
                ]
            }

            return LastMessage;
        }).then((lastmessage) => {
            this.setState(state => {
                return {
                    Bot: {
                        ...state.Bot,
                        passedmessages: [...state.Bot.passedmessages, [lastmessage]],
                        messageid: state.Bot.messageid + 1,
                    }
                }
            })
        })

    }
    GetResponseMensage(id) {
        const NextMessage = this.DummyData.filter(msg => msg.id === id);
        return NextMessage;
    }
    /** 
         * @Description_PT Quando o evento acontecer irá carregar a proxima mensagem na cadeia de mensagens
         * @return Novo estado
         * */
    AwaitMessage() {
        const Msg = this.GetnextMessage(this.state.Bot.messageid);
        if (Msg.length === 0)
            this.DueTheFinalMessage();
        else {
            this.setState(state => {
                const ResponseMessage = this.GetResponseMensage(this.state.Bot.messageid - 1)
                console.log(ResponseMessage)
                let nwMessage = [...state.Bot.passedmessages, Msg];
                return {
                    Bot: {
                        ...state.Bot,
                        passedmessages: nwMessage,
                        messageid: state.Bot.messageid + 1,
                    }

                }
            })

        }



    }
    /** 
         * @Description_PT irá verificar se a tecla clicada é enter, e se for irá enviar os dados
         * @param {object: keyevent}
         * */
    SubmitButton(target) {
        if (target.charCode === 13) {
            this.PushData();
        }
    }
    /** 
         * @Description_PT Carregar a mensagem de boas vindas, primeira mensagem sem nenhum tipo de input
         * 
         * */
    SayHello() {
        return Messages.hello;
    }
    /** 
         * @Description_PT Irá subistituir o estado de input digita
         * @param {String}
         * 
         * */
    Setinput(value) {
        this.setState({
            People: {
                input: value
            }
        });
    }
    /** 
         * @Description_PT Quando uma opção for clicada este metodo deve
         * ser chamado, atualizando o valor de input e o enviando logo em seguida
         * @param {String}
         * 
         * */
    setOptionClick(optionvalue, id = 1) {
        switch (id) {
            case 40:
                this.ClearChat();
                break;
            default:
                this.plano = id;
                this.PushData(optionvalue);
                break;
        }

    }
    /** 
         * @Description_PT Enviára os dados do input para o chatbot
         * @param {String} 
         * @return new state
         * 
         * */
    PushData(value = this.state.People.input) {
        if (value === '')
            return
        this.setState(state => {
            return {
                Bot: {
                    ...state.Bot,
                    ReceivedData: [...state.Bot.ReceivedData, value.toString()],
                }
            }
        });
        this.Pushinput(value)
    }
    /** 
         * @Description_PT Aumenta o valor das mensagens para mostra-lás no componente 
         * com o input
         * digitado pelo usuário
         * Após isto irá limpar o input aumentando a práticidade de enviar novos dados
         * 
         * */
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
        this.AwaitMessage()
    }
    /** 
         * @Description_PT Sé a mensagem do bot possuir algum tipo de opção está função irá
         * renderizar as opções
         * 
         * */
    RenderOptions() {
        let Index = this.state.Bot.messageid;
        const Datasets = this.state.Bot.passedmessages[Index - 1].map(optvalue => {
            return optvalue.options
        })
        return (Datasets.map(option => {
            return option.map((item, i) => {
                return <button className="botoption" key={`opt-${i}`} onClick={() => this.setOptionClick(item.content, item.id)} > {item.content} </button>
            })

        }))
    }
    /** 
         * @Description_PT Renderizar o input:text para o usuário enviar 
         * uma string
         * @return {Input,Button}
         * */
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
    /** 
     * @Description_PT Verificará se a mensagem atual possui algum tipo de opção,
     * caso tenha irá chamar o metodo de renderizar os inputs,
     * caso possua opção ira chamar a função de renderizar os botões como um callback
     * 
     * */
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
    /** 
    * @Description_PT Itera as mensagens de bot e de Usuário, 
    * Renderizar na ordem(Messagem, resposta)
    * */

    RenderMessages() {
        const Iterator = () => {

        }
        const Bot = () => {
            const BotMessagesArray = this.state.Bot.passedmessages.map(message => {
                return message.map(value => {
                    return <Bot key={value.id} message={value.question} />
                })
            });
            return BotMessagesArray;
        }
        const People = () => {
            const PeopleMessageArray = this.state.messages.map(msg => {
                ++this.key;
                return <People key={this.key} message={msg} />
            })
            return PeopleMessageArray;
        }
        return People();
    }
    render() {

        return (
            <React.Fragment>
                <div className="chat">
                    <div className="messagearea">

                        <Bot message={this.SayHello()} key='hellobot' />
                        {this.RenderMessages()}

                    </div>
                    <div className="messageinput">
                        {this.RenderMessagesInputs()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}