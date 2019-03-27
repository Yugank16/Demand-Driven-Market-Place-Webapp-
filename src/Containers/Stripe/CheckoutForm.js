import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { API } from '../../Constants/Urls';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        const { token } = await this.props.stripe.createToken({ name: "Name" });
        const response = await fetch(API.PAYMENT, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id });

        if (response.ok) console.log("Purchase Complete!");
    }

    render() {
        return (
            <div className="checkout">
                <p>Please complete the purchase?</p>
                <CardElement />
                <button className="form-field-button mr-20" onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
