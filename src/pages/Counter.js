import React from 'react';
import axios from 'axios';

const url = "http://localhost:5000";
class Counter extends React.Component {

    state = {
        count: 0,
        imageF: 0,
    }

    update = () => {
        axios.get(url + '/count', (res, err) => {
            console.log(res);
        })
        this.setState({count: this.state.count + 1});
        this.setState({imageF: (this.state.imageF +1)%4});
    }

    render() {
        return(
            <div style = {{height: '100%', width: '100%', display: 'flex', justifyContent: 'center'}}>
                <div className = 'counter'
                    onClick = {this.update}>
                    {this.state.count}
                </div>
                <div className = {"f"+this.state.imageF}>

                </div>
            </div>
        )
    }
}

export default Counter;
