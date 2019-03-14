import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postRequestAction } from '../../Actions/RequestItemActions';
import '../../App.css';

class RequestItem extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            datetime: '',
            itemState: 1,
            monthsOld: 2,
            quantityRequired: 0,
            maxPrice: 0,
            moreInfo: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleValidation() {
        const { name, description, datetime, itemState, monthsOld, quantityRequired, maxPrice, moreInfo } = this.state;
        const error = {};
        let formIsValid = true;

        if (!name || !description || !datetime || !itemState || !monthsOld || !quantityRequired || !maxPrice || !moreInfo) {
            formIsValid = false;
        }
        return formIsValid;
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });


        if (this.handleValidation()) {
            const data = {
                name: this.state.name,
                short_description: this.state.description,
                date_time: this.state.datetime,
                item_state: this.state.itemState,
                months_old: this.state.monthsOld,
                quantity_required: this.state.quantityRequired,
                max_price: this.state.maxPrice,
                more_info: this.state.moreInfo,
                item_status: 1,
            };
            const { postRequestAction, history } = this.props;
            postRequestAction(data);
            history.push('/home');
        }
    }

    render() {
        const { name, description, datetime, itemState, monthsOld, quantityRequired, maxPrice, moreInfo, submitted } = this.state;

        return (
            <div>
                <div className="content">
                    <h1>Request Item</h1>
                    <div className="FormCenter">
                        <form onSubmit={this.handleSubmit} className="FormFields">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="name">Name</label>
                                <input type="text" id="name" className="FormField__Input" placeholder="Enter name of item" name="name" onChange={this.handleChange} />
                                {submitted && !name &&
                                    <div className="FormField__Label error-block">Name is required</div>
                                }
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="description">Description</label>
                                <input type="text" id="description" className="FormField__Input" placeholder="Enter description of required item" name="description" onChange={this.handleChange} />
                                {submitted && !description &&
                                    <div className="FormField__Label error-block">Description is required</div>
                                }
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="datetime">Date and Time</label>
                                <input type="datetime-local" id="datetime" className="FormField__Input" placeholder="Enter date and time" name="datetime" onChange={this.handleChange} />
                                {submitted && !datetime &&
                                    <div className="FormField__Label error-block">Date and time is required</div>
                                }
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="itemState">Item State</label>
                                <select className="FormField__Input" name="itemState" onChange={this.handleChange}>
                                    <option className="drop_down_text" selected value={3}>Old</option>
                                    <option className="drop_down_text" value={2} >Second Hand</option>
                                    <option className="drop_down_text" value={1} >New</option>
                                </select>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="monthsOld">Months Old</label>
                                <input type="text" id="monthsOld" className="FormField__Input" placeholder="Enter how many months old" name="monthsOld" onChange={this.handleChange} />
                                {submitted && !monthsOld &&
                                    <div className="FormField__Label error-block">Description is required</div>
                                }
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="quantityRequired">Quantity Required</label>
                                <input type="text" id="quantityRequired" className="FormField__Input" placeholder="Enter quantity required" name="quantityRequired" onChange={this.handleChange} />
                                {submitted && !quantityRequired &&
                                    <div className="FormField__Label error-block">Description is required</div>
                                }
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="maxPrice">Max Price</label>
                                <input type="text" id="maxPrice" className="FormField__Input" placeholder="Enter max price" name="maxPrice" onChange={this.handleChange} />
                                {submitted && !maxPrice &&
                                    <div className="FormField__Label error-block">Description is required</div>
                                }
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="moreInfo">More Information</label>
                                <input type="text" id="moreInfo" className="FormField__Input" placeholder="Enter more specification for the item" name="moreInfo" onChange={this.handleChange} />
                                {submitted && !moreInfo &&
                                    <div className="FormField__Label error-block">Description is required</div>
                                }
                            </div>
                            <div className="FormField">
                                <button className="FormField__Button mr-20">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { postRequestAction })(RequestItem);
