import React from 'react';
import Table from '../table'
import Data from '../Tabledata'
import Menu from '../menu'
export default class Plans extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="pricingpage">
                <Menu/>
                <Table>
                    <Data rows={{ dddor: 41, dddD: 32, time: 30, plan: 'fale mais 30', Wfl: 'R$ 50', WTfl: 'R$ 100' }}/> 
                    <Data rows={{ dddor: 41, dddD: 32, time: 80, plan: 'fale mais 90', Wfl: 'R$ 290', WTfl: 'R$ 500' }}/>               
                </Table>
            </div>
        )
    }
}