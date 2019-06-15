import React from 'react';
import axios from 'axios';

export default class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users/account', {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            this.setState({ user: response.data })
        })
        .catch(err => {
            this.props.history.push('/users/login')
        })
    }

    render() {
        return (
            <div>
                <h2>Welcome {this.state.user.username}!!</h2>
            </div>
        );
    }
}