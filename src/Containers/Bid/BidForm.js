import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postBid } from '../../Actions/BidActions';

class Bid extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            description: '',
            photos: ['', '', '', '', '', ''],
            isButtonDisabled: false,
            errors: {},
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }

    handleFileChange = e => {
        const statecopy = Object.assign({}, this.state);
        const { photos } = statecopy;
        photos[e.target.id] = [e.target.files[0]];
        this.setState({ photos });
        console.log(this.state.photos);
    }

    handleValidation = () => {
        let formIsValid = true;
        const error = {};
        const { price, description, photos } = this.state;
        const patternPrice = new RegExp(/^\d+$/);
        if (price < 0 || !price || !patternPrice.test(price)) {
            formIsValid = false;
            error.price = 'Enter valid price';
        }
        if (!description) {
            formIsValid = false;
            error.description = 'Please enter description';
        }
        for (let i = 0; i < 6; i++) {
            if (!photos[i]) {
                formIsValid = false;
                error.photos = 'Upload 6 photos of the item';
                break;
            }
        }
        this.setState({ errors: error });
        return formIsValid;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isButtonDisabled: true });
        if (this.handleValidation()) {
            const { price, description, photos } = this.state;
            const data = { bid_price: price, description, images: photos };
            const { postBid, history } = this.props;
            const { id } = this.props.match.params;
            const response = await postBid(data, id);
            console.log(response);
            if (response === true) {
                console.log(response);
            } else {
                const { bid_price: price, description, images: photos } = response;
                const error = { price, description, photos };
                this.setState({ isButtonDisabled: false, errors: error });
            }
        }
        this.setState({ isButtonDisabled: false });
    };

    render() {
        return (
            <div>
                <div className="content">
                    <h2>Bid</h2>
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="description">Price</label>
                            <input type="int" id="price" className="FormField__Input" placeholder="Enter your price" name="price" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.price}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="description">Description</label>
                            <input type="text" id="description" className="FormField__Input" placeholder="Enter description of required item" name="description" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.description}</div>
                        </div>
                        <div className="FormField__Label error-block">{this.state.errors.photos}</div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="photo">Photo</label>
                            <input type="file" id="0" name="photo" onChange={this.handleFileChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="photo1">Photo</label>
                            <input type="file" id="1" name="photo1" onChange={this.handleFileChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="photo2">Photo</label>
                            <input type="file" id="2" name="photo2" onChange={this.handleFileChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="photo3">Photo</label>
                            <input type="file" id="3" name="photo3" onChange={this.handleFileChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="photo4">Photo</label>
                            <input type="file" id="4" name="photo4" onChange={this.handleFileChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="photo5">Photo</label>
                            <input type="file" id="5" name="photo5" onChange={this.handleFileChange} />
                        </div>
                        <div className="FormField">
                            <button className="FormField__Button mr-20" disabled={this.state.isButtonDisabled}>Bid</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default connect(null, { postBid })(Bid);

