import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CardElement, injectStripe } from 'react-stripe-elements';


class CheckoutForm extends Component {
    submit= async () => {
        const { token } = await this.props.stripe.createToken({ name: 'Name' }); 
        const { updateToken } = this.props;
        updateToken(token.id);
    }

    render() {
        return (
            <div className="checkout clearfix">
                <CardElement />
                <div className="float-right">
                    <Button variant="secondary modal-button" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary modal-button" onClick={this.submit}>
                        Pay
                    </Button>
                </div>
            </div>
        );
    }
}

export default withRouter(injectStripe(CheckoutForm));

