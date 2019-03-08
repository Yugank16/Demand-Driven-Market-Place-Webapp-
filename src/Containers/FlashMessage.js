import React, { Component } from 'react';
import { connect } from 'react-redux';

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
        };
    }

    hideAlert() {
        this.setState({
            isActive: false,
        });
        this.props.flashMessage.message = '';
    }
    render() {
        if (this.props.flashMessage.message) {
            console.log('hi', this.props.flashMessage);
            const { message, className } = this.props.flashMessage;
            console.log(message, className);
            return (
                <div >
                    {
                        this.state.isActive &&
                        <div className={'col-md-12 alert' + className + 'alert-dismissible'} role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.hideAlert()}><span aria-hidden="true">&times;</span></button>
                            {message}
                        </div>         
                    }
              
                </div>
            );
        }
        return <div>hi</div>;
    }
}

const mapStateToProps = state => ({
    flashMessage: state.flashmessage,
});

export default connect(mapStateToProps)(FlashMessage);
