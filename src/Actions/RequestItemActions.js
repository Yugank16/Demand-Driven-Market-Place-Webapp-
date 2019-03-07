import { RequestItemConstants, UserActionConstants } from '../Constants/index';

export const postRequestAction = (data) => dispatch => {
    const userdata = JSON.parse(localStorage.getItem('user'));
    fetch(`${UserActionConstants.API_BASE_URL}api/items/`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch({
                type: RequestItemConstants.POST_ITEM_REQUEST,
                payload: data,
            });
        })
        .catch((err) => alert(err));
};

export const fetchPosts = () => dispatch => {
    const userdata = JSON.parse(localStorage.getItem('user'));
    fetch(`${UserActionConstants.API_BASE_URL}api/items/`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch({
                type: RequestItemConstants.FETCH_ALL_REQUEST,
                payload: data,
            });
        });
};
