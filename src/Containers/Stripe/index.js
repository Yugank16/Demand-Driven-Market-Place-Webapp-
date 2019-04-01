import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { StripeApi } from '../../Constants';

class StripePayment extends Component {
    render() {
        const { updateToken, handleClose } = this.props;
        return (
            <StripeProvider apiKey={StripeApi.PUBLISH_KEY}>
                <div>
                    <Elements>
                        <CheckoutForm updateToken={updateToken} handleClose={handleClose} />
                    </Elements>
                </div>
            </StripeProvider>
        );
    }
}

export default StripePayment;
