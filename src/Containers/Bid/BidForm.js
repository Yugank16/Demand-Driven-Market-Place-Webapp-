import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import Modal from 'react-bootstrap/Modal';
import { postBid } from '../../Actions/BidActions';
import StripePayment from '../Stripe';
import { canBidAction } from '../../Actions/RequestItemActions';
import Forbidden from '../../Components/Forbidden';

class Bid extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            description: '',
            photos: [],
            isButtonDisabled: true,
            errors: {},
            token: '',
            show: false,
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const { canBidAction } = this.props;
        canBidAction(id);
    }
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    updateToken = (tokenId) => {
        this.setState({ token: tokenId, isButtonDisabled: false });
        this.handleClose();
    }


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleFileChange = e => {
        const statecopy = Object.assign({}, this.state);
        const { photos } = statecopy;
        for (let i = 0; i < e.target.files.length; i++) {
            photos.push(e.target.files[i]);
        }
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
                history.push(`/home/request/${id}/`);
            } else {
                const { bid_price: price, description, images: photos, time, valid } = response;
                const error = { price, description, photos, time, valid };
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
        if (!this.props.isLoading && this.props.flag.value === true && !this.props.flag.id) {
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
                                <input type="file" multiple="true" id="0" name="photo" onChange={this.handleFileChange} />
                            </div>
                            {this.state.photos.map((image, index) =>
                                <p>{image.name}<button onClick={this.deletePhoto} name={index}>remove</button></p>)}
                            <Button variant="primary" onClick={this.handleShow}>
                                Make Payment
                            </Button>
                            <div className="form-field">
                                <Button className="form-field-button mr-20" variant="primary" disabled={this.state.isButtonDisabled} onClick={this.handleSubmit}>
                                    Bid
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Make Your Payment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <StripePayment updateToken={this.updateToken} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else if (!this.props.isLoading && this.props.flag.value === false && !this.props.flag.id) {
            return <Forbidden />;
        } else if (!this.props.isLoading && this.props.flag.id) {
            return (<Redirect to={'/home/bid/' + this.props.flag.id} />);
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
    }
}

const mapStateToProps = state => ({
    flag: state.requestItem.flag,
    isLoading: state.requestItem.isLoading,
});

export default connect(mapStateToProps, { postBid, canBidAction })(Bid);

