import React from "react";
import "../stylizations/message.scss";
import BotIMage from "../../UI/images/bot.png";
export class Bot extends React.Component {
  calcultateTableData(data) {
    const TDs = [];
    let i = 0
    data.forEach((item) => {
      TDs.push(<td key={`td=${i}`}> {item} </td>);
      i++;
    });
    return TDs;
  }
  Render404error() {
    return (
      <h1>Valor não encontrado no servidor, por favor, tente novamente.</h1>
    );
  }
  RenderTable(data) {
    if (data[0] === "404") return this.Render404error();
    return (
      <table>
        <thead cellSpacing="1">
          <tr>
            <th>Origem</th>
            <th>Destino</th>
            <th>Plano</th>
            <th>Tempo</th>
            <th>Com fale mais</th>
            <th>Sem fale mais</th>
          </tr>
        </thead>
        <tbody>
          <tr>{this.calcultateTableData(data)}</tr>
        </tbody>
      </table>
    );
  }
  render() {
    return (
      <section className="message bot ">
        <img src={BotIMage} alt="BotImage" />
        <div className="messagebody">
        {this.props.table ? this.RenderTable(this.props.table) : ""}
          <span>
            {this.props.message ? this.props.message : ""}
          </span> 
        </div>
      </section>
    );
  }
}

export class People extends React.Component {
  render() {
    return (
      <section className="message people">
        <div className="messagebody">
          <span>{this.props.message ? this.props.message : " "}</span>
        </div>
      </section>
    );
  }
}
