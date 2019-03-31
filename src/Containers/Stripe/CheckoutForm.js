import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CardElement, injectStripe } from 'react-stripe-elements';


class CheckoutForm extends Component {
    submit= async (ev) => {
        const { token } = await this.props.stripe.createToken({ name: 'Name' }); 
        const { updateToken } = this.props;
        updateToken(token.id);
    }

    render() {
        return (
            <div className="checkout">
                <p>Please complete the purchase?</p>
                <CardElement />
                <Button variant="primary" onClick={this.submit}>
                    Pay
                </Button>
            </div>
        );
    }
}

export default withRouter(injectStripe(CheckoutForm));

