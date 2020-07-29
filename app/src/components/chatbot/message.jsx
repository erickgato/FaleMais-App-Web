import React from 'react';
import '../stylizations/message.scss'
import BotIMage from "../../UI/images/bot.jpg"
import UserImage from '../../UI/images/user.png'
export class Bot extends React.Component {
    render() {

        return (
            <section className="message">
                <img src={BotIMage} alt="BotImage" />
                <div className="messagebody" style={{ backgroundColor: this.props.color ? this.props.color : "black" }} >
                    <span>
                        {this.props.message ? this.props.message : "undefined"}
                    </span>
                </div>
            </section>

        )
    }
}

export class People extends React.Component {
    render() {

        return (
            <section className="message end">
                <div className="messagebody" style={{ backgroundColor: this.props.color ? this.props.color : "black" }} >
                    <span>
                        {this.props.message ? this.props.message : "undefined"}
                    </span>
                </div>
                <img src={UserImage} alt="BotImage" />
            </section>

        )
    }
}