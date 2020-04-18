import React, { Component } from 'react'
import {Col, Row} from 'reactstrap'
import axios from 'axios'
import moment from 'moment'
import CountryData from './CountryData'

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            covid_data: null,
            startDate: null
        }

        this.fetchData()
    }

    fetchData = async () =>  {

        try {
            const covid_data = await axios.get('https://pomber.github.io/covid19/timeseries.json')
            const {data} = covid_data
            const {startDate} = this.state

            const start_date = startDate ? startDate : moment().subtract(1, 'day').format('YYYY-M-D')

            console.log(start_date)

            let result  = []
            Object.keys(data).map(key => {

                // data[key].map(item2 => {
                //     // if (item2.date === start_date ) {
                //         item2.country = key
                //     //     result.push(item2)
                //     // }
                //     console.log(item2.pop())
                // })

                data[key].map(item2 => {
                    item2.country = key  
                })
                
                result.push(data[key].pop())
            })
            // console.log(result)
            
            this.setState({ 
                covid_data: result,
                startDate:start_date 
            })

        } catch (error) {   
            console.log(error)
        }
    }

    generetaTotalCases = () => {
        const { covid_data } = this.state
        return covid_data.map(data => <CountryData {...data} color={this.generateRandomColor(data.country)} />)
    }

    generateRandomColor = name => {
        let letters = 'BCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }
    
    render() {
        const { covid_data, startDate } = this.state
        return (
            <>
                <Row className="no-gutters">
                    <Col xs="12" className="text-center" style={{backgroundColor: 'rgb(222, 236, 253)'}}><h2 className="p-3">Covid-19 World Tracker</h2></Col>
                    {
                        covid_data  && this.generetaTotalCases()
                    }
                </Row>    
            </>
        )
    }

    
}

export default Home
