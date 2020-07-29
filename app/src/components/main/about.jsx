import React from "react";
import "../stylizations/about.scss";
import Menu from "../menu";
import PricingItem from "../pricingtable";

export default class About extends React.Component {
  Debounce(func, wait, immediate) {
    let timeout;
    return (...args) => {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callnow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callnow) func.apply(context, args);
    };
  }
  static ClearClassToChild(className, array) {
    array.forEach((child) => {
      child.classList.remove(className);
    });
  }
  static AddclassToChild(className, array) {
    array.forEach((child) => {
      child.classList.add(className);
    });
  }
  HandleScrow() {
    const query = document.querySelectorAll("[data-scrow]");
    //Get the distance from top
    const divcontent = document
      .querySelector(".Content")
      .getBoundingClientRect().top;
    query.forEach((element) => {
      //Get the distance from top
        const childElement = element.querySelectorAll('li');
        element.getBoundingClientRect().top - divcontent < 0
          ? About.AddclassToChild("animate", childElement)
          : About.ClearClassToChild("animate", childElement);
    });
  }
  render() {
    return (
      <React.Fragment>
        <Menu />
        <div
          className="Content"
          onScroll={this.Debounce(this.HandleScrow, 100)}
        >
          <div className="transparent">
            <span>
              Fale mais
              <p>
                O mais novo produto da <code className="gold">Telzir</code>
                <br />
                Faça chamadas sem preocupações com o custo
              </p>
            </span>
          </div>
          <div className="panel black">
            <span>O que há de novo ?</span>

            <p>
              Com o fale mais você consegue ligar para diversas operadoras
              <br />
              Pagando apenas se o tempo de ligação exceder o plano contratado
            </p>
          </div>
          <div className="panel white" data-scrow="top" id="plans">
            <div id="plans"></div>
            <span className="title">Conheça nossos planos</span>
            <nav>
              <ul>
                <li data-scrow="left">
                  <PricingItem
                    animation="left"
                    data={{ plan: "Fale mais 30", price: "15" }}
                    color={["#12c2e9", "#c471ed", "#f64f59"]}
                  />
                </li>
                <li data-scrow="top">
                  <PricingItem
                    animation="top"
                    data={{ plan: "Fale mais 200", price: "80" }}
                    isSportlight={true}
                    color={["#8A2387", "#E94057", "#F27121"]}
                  />
                </li>
                <li data-scrow="right">
                  <PricingItem
                    data={{ plan: "Fale mais 120", price: "40" }}
                    color={["#aa4b6b", "#6b6b83", "#3b8d99"]}
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
