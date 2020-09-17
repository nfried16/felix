import React from 'react';
import axios from 'axios';

const url = "https://felix-jiang-backend.herokuapp.com";
class Counter extends React.Component {

    state = {
        count: 0,
    }

    async componentDidMount() {
        const res = await axios.get(url + '/count')
            .then(res => {
                console.log(res);
                return res.data;
            })
            .catch(err => {
                return this.state.count;
            });
        this.setState({count: res});
    }

    update = async () => {
        await axios.post(url + '/count')
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {

            });
        this.setState({count: this.state.count + 1});
    }

    render() {
        return(
            <div style = {{height: '100%', width: '100%', display: 'flex', justifyContent: 'center'}}>
                <div className = 'counter'
                    onClick = {this.update}>
                    {this.state.count}
                </div>
            </div>
        )
    }
}

export default Counter;
