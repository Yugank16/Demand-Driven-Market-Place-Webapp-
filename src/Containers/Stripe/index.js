import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class StripePayment extends Component {
    render() {
        return (
            <StripeProvider apiKey="pk_test_NmwdjliywuXxJ9DNfqP3ODBg00BKV9HJwo">
                <div className="login-div">
                    <h1>Make your payment</h1>
                    <Elements>
                        <CheckoutForm />
                    </Elements>
                </div>
            </StripeProvider>
        );
    }
}

export default StripePayment;
