import React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {Modal, Input, Button} from 'antd';
import 'antd/dist/antd.css';

const f0 = require("../felix/f0.png");
const f1 = require("../felix/f1.png");
const f2 = require("../felix/f2.png");
const f3 = require("../felix/f3.png");
const arr = [f0, f1, f2, f3];

const url = "https://felix-jiang-backend.herokuapp.com";
class Counter extends React.Component {

    state = {
        count: 0,
        imageF: 0,
        loading: true,
        showModal: false,
        name: '',
        likes: [],
        height: 0,
    }

    name = null;

    async componentDidMount() {
        this.name = localStorage.getItem('name');
        if(!this.name) {
            this.name = null;
            this.setState({showModal: true});
        }
        else {
            this.setState({name: this.name});
        }
        const res = await this.getCount();
        const likes = await this.getLikes();
        this.setState({likes: likes});
        this.setState({count: res});
        this.setState({loading: false});
    }

    getCount = async () => {
        const res = await axios.get(url + '/count')
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(err => {
                return this.state.count;
            });
        return res;
    }

    handleOk = () => {
        this.name = this.state.name;
        console.log(this.name);
        this.setState({showModal: false});
        localStorage.setItem('name', this.name);
    }

    getLikes = async () => {
        const res = await axios.get(url + '/like')
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return this.state.count;
            });
        console.log(res);
        return res;
    }

    update = async () => {
        console.log(!this.name);
        if(!this.name) {
            this.setState({showModal: true});
            return;
        }
        this.setState({loading: true});
        await axios.post(url + '/count')
            .then(res => {
                // console.log(res.data);
            })
            .catch(err => {

            });
        await axios.post(url + '/like', {
            name: this.name
        })
            .then(res => {
                // console.log(res.data);
            })
            .catch(err => {

            });
        const res = await this.getCount();
        const likes = await this.getLikes();
        this.setState({likes: likes, count: res, imageF: (this.state.imageF +1)%4, loading: false});
    }

    changeName = () => {
        this.name = null;
        this.setState({showModal: true});
    }

    render() {
        return(
            <div style = {{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} id = 'main'>
                <div style = {{position: 'absolute', left: 0, top: 0, height: '3vw', width: '3vw', cursor: 'pointer'}}
                    onClick = {this.changeName}
                />
                <div className = 'counter' height = '20vh' width = '20vh'
                    onClick = {this.update}>
                    {!this.state.loading ?
                        (
                            this.state.count
                        ) :
                        (
                                <ReactLoading type='spin' color='blue' height='25%' width='25%'/>
                        )
                    }
                </div>
                <img src = {arr[this.state.imageF]} className = 'imagef'/>
                <div style = {{margin: 20, background: 'white', padding: 20, borderRadius: 5}}>
                    {this.state.likes.map(like => {
                        return(
                            <div>
                                {`${like.name} thought of felix on ${new Date(like.time).toLocaleString()}`}
                            </div>
                        )
                    })}
                </div>
                <Modal
                    title="Enter name"
                    visible={this.state.showModal}
                    onOk={this.handleOk}
                    onCancel={() => this.setState({showModal: false})}>
                    <Input onChange = {(e) => {
                            this.setState({name: e.target.value});
                        }}
                        value = {this.state.name}
                    >
                    </Input>
                </Modal>
            </div>
        )
    }
}

export default Counter;
