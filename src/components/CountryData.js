import React, { Component } from 'react'
import {Col} from 'reactstrap'

export class CountryData extends Component {

    getFlag = str => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
    
        // remove accents, swap ñ for n, etc
        var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeiiiioooouuuunc------";

        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        return `https://assets.thebasetrip.com/api/v2/countries/flags/${str}.png`
    }

    render() {
        const {country, confirmed, recovered, deaths, color} = this.props
        // console.log(color)

        const card  = {
            backgroundColor: color
        }

        const info = {
            marginBottom: '3px'
        }

        return (
            <Col xs="6" sm="6" md="4" lg="3" className="text-center p-3" style={card}>
                <img className="mb-2" src={this.getFlag(country)} width="50" />
                <h4>{country}</h4> 
                <p style={info}>Confirmed: {new Intl.NumberFormat().format(confirmed)}</p>  
                <p style={info}>Recovered: {new Intl.NumberFormat().format(recovered)}</p>  
                <p style={info}>Deaths: {new Intl.NumberFormat().format(deaths)}</p>    
            </Col>
        )
    }
}

export default CountryData
