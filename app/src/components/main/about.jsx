import React from "react";
import "../stylizations/about.scss";
import Menu from "../menu";
import PricingItem from "../pricingtable";

export default class About extends React.Component {
  state = {
    Plans: [],
    colors: {
      values: [["#12c2e9", "#c471ed", "#f64f59"], ["#8A2387", "#E94057", "#F27121"], ["#aa4b6b", "#6b6b83", "#3b8d99"]],
      Cindex: 0
    },
    animations: {
      values: ['left', 'top', 'right'],
      Aindex: 0
    }
  }
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
  async componentDidMount() {
    const Plans = await fetch('http://localhost:4000/api/planos');
    const Data = await Plans.json();
    this.setState(state => {
      /* Note: this is setstate scope */
      let Indexes = {
        Color: 0,
        Animation: 0
      };
      const plans = Data.map(plan => {
        const Value =  {
          id: plan.pl_id,
          name: plan.pl_name,
          price: plan.pl_price.replace('R$', ''),
          color: state.colors.values[Indexes.Color],
          animation: state.animations.values[Indexes.Animation]
        }
        Indexes.Color++;
        Indexes.Animation++;
        return Value
      })
      return {
        Plans: plans
      }
    })

    console.log(this.state.Plans);
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
                {this.state.Plans.map((plan,index) => {
                  return <li key={`li ${index}`} >
                            <PricingItem 
                              key={plan.id} 
                              animation={plan.animation} 
                              data={{ plan: plan.name, price: plan.price }} 
                              color={plan.color} 
                              isSpotlight={index === 1 ? true : false }
                            />
                          </li>
                })}
              </ul>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
