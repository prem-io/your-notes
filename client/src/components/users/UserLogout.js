import React from 'react';
import axios from 'axios';

export default class UserLogout extends React.Component {

    componentDidMount() {
        axios.delete('http://localhost:3001/users/logout', {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            localStorage.removeItem('userAuthToken')
            this.props.handleAuth(false)
            this.props.history.push('/users/login')
        })
        .catch(err => {
            this.props.history.push('/users/login')
        })
    }

    render() {
        return(
            <p>Logging out...</p>
        );
    }
}