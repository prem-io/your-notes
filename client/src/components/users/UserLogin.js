import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
		}
		this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.id]: e.target.value
        }))
	}

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post('http://localhost:3001/users/login',formData)
			.then(response => {
				console.log(response.data)
				if(response.data.errors) {
					alert(response.data.errors)
				} else {
					const token = response.data.token
					localStorage.setItem('userAuthToken', token)
					this.props.handleAuth(true)
					this.props.history.push('/notes')
				}
			})
    }

    render() {
        return(
            <div className="card">
				<form className="card-body" onSubmit={this.handleSubmit}>
                <h2>User Login</h2>
					<div className="form-group">
						<h5 className="card-title">Email</h5>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Email"
							onChange={this.handleChange}
						/>
					</div>

                    <div className="form-group">
						<h5 className="card-title">Password</h5>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Password"
							onChange={this.handleChange}
						/>
					</div>
					
					<button type="submit" className="btn btn-primary">Login</button>
					<span> </span>
					<Link to="/" className="btn btn-primary">Back</Link>
				</form>
			</div>
        );
    }
}