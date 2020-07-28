import React from 'react';
import './stylizations/message.scss'
import BotIMage from "../UI/images/bot.jpg"

export class Bot extends React.Component {
    render() {

        return (
            <section className="message">
                <img src={BotIMage} alt="BotImage" />
                <div class="messagebody" style={{ backgroundColor: this.props.color ? this.props.color : "black" }} >
                    {this.props.message ? this.props.message : "undefined"}
                </div>
            </section>

        )
    }
}

export class People extends React.Component {
    render() {

        return (
            <section className="message end">
                <div class="messagebody" style={{ backgroundColor: this.props.color ? this.props.color : "black" }} >
                    {this.props.message ? this.props.message : "undefined"}
                </div>
                <img src={BotIMage} alt="BotImage" />
            </section>

        )
    }
}