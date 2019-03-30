import React, { Component } from "react";

class Socket extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.connection = new WebSocket(`ws://localhost:8000/ws/${id}/`);
        console.log(this.connection);
        this.connection.onmessage = evt => {
            console.log('hello', evt);
            this.setState({
                message: evt.data,
            });
        };
    }

    render() {
        return (
            <div>
                hi
                {this.state.message}
            </div>
        );
    }
}

export default Socket;
