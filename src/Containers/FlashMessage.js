import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
        };
        this.hideAlert = this.hideAlert.bind(this);
    }
   
    hideAlert() {
        this.setState({
            isActive: false,
        });
        this.props.flashMessage.message = '';
    }
    render() {
        if (this.props.flashMessage.message) {
            const { message, className } = this.props.flashMessage;
            this.state = {
                isActive: true,
            };
            setTimeout(() => {
                this.hideAlert();
            }, 2000);
            return (
                <div >
                    {
                        this.state.isActive &&
                        <div className="flash" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.hideAlert()}><span aria-hidden="true">&times;</span></button>
                            {message}
                        </div>         
                    }
              
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    flashMessage: state.flashmessage,
});

export default connect(mapStateToProps)(FlashMessage);
