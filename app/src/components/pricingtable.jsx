import React, { Component } from 'react'
import './stylizations/pricingitem.scss'
import { Link } from 'react-router-dom'
export default class PricingTable extends Component {
    constructor(props) {
        super(props);
        props.color ? this.color = props.color.join(",") : this.color = 'black'
        this.backgroundColor = `linear-gradient(to top,${this.color})`
        props.isSportlight ? this.class = 'Pricing-panel spot' : this.class = 'Pricing-panel' 

        this.state = {
            price: props.data.price,
            plan:  props.data.plan
        }
    }
    render(){
        return (
            <div className={`pricing-card ${ this.props.animation ? this.props.animation : '' } `}>
                <div className={this.class} style={{background: this.backgroundColor }} >
                        <span className="plan"> {this.state.plan}</span>
                        <span className="Price" > <sup> R$ </sup> { this.state.price } </span>
                    <Link to="#"> Quero </Link>
                </div>    
                
            </div>
       

        )
    }
}