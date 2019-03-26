import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postBid } from '../../Actions/BidActions';

class Bid extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            description: '',
            photos: [],
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
        photos.push(e.target.files[0]);
        e.target.value = '';
        this.setState({ photos });
        this.setState({ errors: { ...this.state.errors, photos: null } });
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
                error.photos = 'Upload Atleast 6 photos of the item';
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
    deletePhoto = (e) => {
        e.preventDefault();
        const statecopy = Object.assign({}, this.state);
        const { photos } = statecopy;
        photos.splice(e.target.name, 1);
        this.setState({ photos });
    }

    render() {
        return (
            <div>
                <div className="content">
                    <h2>Bid</h2>
                    <form className="form-fields">
                        <div className="form-field">
                            <label className="form-field-label" htmlFor="description">Price</label>
                            <input type="int" id="price" className="form-field-input" placeholder="Enter your price" name="price" onChange={this.handleChange} />
                            <div className="form-field-label error-block">{this.state.errors.price}</div>
                        </div>
                        <div className="form-field">
                            <label className="form-field-label" htmlFor="description">Description</label>
                            <input type="text" id="description" className="form-field-input" placeholder="Enter description of required item" name="description" onChange={this.handleChange} />
                            <div className="form-field-label error-block">{this.state.errors.description}</div>
                        </div>
                        <div className="form-field error-block">{this.state.errors.photos}</div>
                        <div className="form-field">
                            <label className="form-field-label" htmlFor="photo">Photo</label>
                            <input type="file" id="0" name="photo" onChange={this.handleFileChange} />
                        </div>
                        {this.state.photos.map((image, index) => 
                            <p>{image.name}<button onClick={this.deletePhoto} name={index}>remove</button></p>)}
                        <div className="form-field">
                            <button type="submit" className="form-field-button mr-20" disabled={this.state.isButtonDisabled} onClick={this.handleSubmit}>Bid</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default connect(null, { postBid })(Bid);

