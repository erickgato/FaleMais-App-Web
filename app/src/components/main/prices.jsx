import React from 'react'

import Menu from '../menu'
import "../stylizations/prices.scss"
import Chat from '../chat'
export default class Prices extends React.Component {
    render() {
        return (
            <div className="pricingpage">
                <Menu />
                <Chat/>
            </div>
        )
    }

}