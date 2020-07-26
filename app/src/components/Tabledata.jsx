import React from 'react'

export default class TableData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: {
                dddor: 0,
                dddD: 0,
                time: 0,
                plan: 0,
                Wfl: 0, // with fale mais
                WTfl: 0,
            }
        }
        this.ActualizeRows();
        
    }
    ActualizeRows() {
        for( let [key, value] of Object.entries(this.props.rows)  )
            this.state.rows[key] = value;

        
    }
    RenderTDs() {
        let tds = [];
        let key = 0;
        for( let value of Object.values(this.state.rows)  ){        
            tds.push(<td key={key} >{value}</td>)
            key++;
        }   
        
        return tds
    }
    render(){
        return (
            <React.Fragment>
                <tr>
                    {this.RenderTDs()}     
                </tr>
            </React.Fragment>
        )
    }
}