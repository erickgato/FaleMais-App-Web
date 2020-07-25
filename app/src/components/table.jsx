import React, { Component } from 'react';
import './stylizations/table.scss'
export default class Table extends Component {
    state = {
        Tipo: this.props.Tipo,
        Nome: this.props.Nome
    }
    SetState(e) {
        return this.setState({ Nome: e.target.value  })
    }
    render() {
        

        const { Tipo, Nome } = this.state;
        return (
            <React.Fragment>
                <h1> {Tipo}  {Nome}  </h1>
                <input type="text" name="" id="" value={Nome} onChange={e => this.SetState(e) } />
            </React.Fragment>
        )
    }
}