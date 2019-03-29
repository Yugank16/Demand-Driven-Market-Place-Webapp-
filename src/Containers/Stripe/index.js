import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { StripeApi } from '../../Constants';

class StripePayment extends Component {
    render() {
        return (
            <StripeProvider apiKey={StripeApi.PUBLISH_KEY}>
                <div>
                    <Elements>
                        <CheckoutForm updateToken={this.props.updateToken} />
                    </Elements>
                </div>
            </StripeProvider>
        );
    }
}

export default StripePayment;
