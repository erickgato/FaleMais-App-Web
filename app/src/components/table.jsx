import React, { Component } from "react";
import "./stylizations/table.scss";
export default class Table extends Component {
  render() {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Origem</th>
            <th>Destino</th>
            <th>Tempo</th>
            <th>Plano</th>
            <th>Com fale mais</th>
            <th>Sem fale mais</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
