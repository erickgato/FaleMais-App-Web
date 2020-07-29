import React from 'react';
import Messages from './mesages.json';
import { Bot } from './message';

export default class ChatBot extends React.Component {
    constructor(props) {
        super(props);
        this.messages = []
        let index = 0;
        for (let [key] in Messages.data) {
            this.messages.push({
                Qname: key,
                question: Messages.data[key],
                id: index
            })
            ++index;
        }
        this.state = {
            nextMSG: props.gonext,
            initialid: this.messages[0].id,
            passedmessages: []
        }
        // Binds
        this.AwaitMessage = this.AwaitMessage.bind(this);
        this.GetnextMessage = this.GetnextMessage.bind(this);

        
    }
    render() {
        return (
            <React.Fragment>
                <Bot message={this.SayHello()} key='hellobot' />
                {this.state.passedmessages}
            </React.Fragment>
        )
    }
    GetnextMessage(Messageid) {
        const NextMessage = this.messages.filter(msg => msg.id === Messageid+1 );
        return NextMessage;
    }
    AwaitMessage() {   
        if(this.state.nextMSG === true ){
            const Msg = this.GetnextMessage(this.state.initialid);
            const NewArray = this.state.passedmessages.concat(<Bot key={Msg.id * 2} message={Msg.question} />);
            this.setState({
                passedmessages: NewArray
            })
        }
    }
    SayHello() {
        return Messages.hello;
    }
}

/*

*Roadmap
1. Pegar as mensagens possiveis [x]
2. imprimir todas as mensagens [x]
3. Aguardar {
    1. Se apresentar
    2. Fazer a primeira pergunta
    3. aguardar resposta
}
*/