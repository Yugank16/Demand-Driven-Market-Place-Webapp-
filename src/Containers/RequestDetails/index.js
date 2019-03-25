import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDetailsAction } from '../../Actions/RequestItemActions';
import RequestDetail from '../../Components/RequestDetails';
import '../../App.css';

class RequestDetails extends Component {
    constructor() {
        super();

        this.state = {
            isButtonDisabled: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const { fetchDetailsAction } = this.props;
        fetchDetailsAction(id);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isButtonDisabled: true });
    }

    render() {
        if (this.props.item.id) {
            const datetime = new Date(this.props.item.date_time);
            const time = datetime.toISOString().slice(12, 16);
            const date = datetime.toISOString().slice(0, 10);
            return (
                <div>
                    <RequestDetail key={this.props.item.id} data={this.props.item} date={date} time={time} />
                    <div className="form-field clearfix">
                        <button className="form-field-button " disabled={this.state.isButtonDisabled}>Bid Now</button>
                    </div>
                </div>
            );
        }
        return <div>Please wait.....</div>;
    }
}

RequestDetails.propType = {
    item: PropTypes.object,
};

const mapStateToProps = state => ({
    item: state.requestItem.data,
});

export default connect(mapStateToProps, { fetchDetailsAction })(RequestDetails);

