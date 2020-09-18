import React from 'react';
const crop = require("../felix/crop.png");

class Background extends React.Component {

    getPositions = (num, width) => {
        let arr = [];
        for(let i = 0; i < num; i++) {
            arr.push([Math.random(), Math.random()*2+1 + 's', Math.random()*-2-1 + 's']);
        }
        console.log(arr)
        return arr;
    }

    positions = this.getPositions(20, 500);
    width = 0;

    render() {
        return(
            <div style = {{height: '100vh', width: '100vw', background: this.props.color || '#00539B', position: 'fixed', zIndex: -1}} id = 'canvas'>
                {this.positions.map(block => {
                    return (
                        <div style = {{positon: 'absolute', width: 0, height: 0}}>
                            <img src = {crop} className = 'animation' style = {{left: block[0]*(window.innerWidth-150), animationDuration: block[1], animationDelay: block[2]}}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Background;