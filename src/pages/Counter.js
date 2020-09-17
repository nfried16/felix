import React from 'react';

class Counter extends React.Component {

    state = {
        count: 0
    }

    update = () => {
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
