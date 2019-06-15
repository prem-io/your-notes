import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class UserRegister extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
			username: '',
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
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		}
		axios.post('http://localhost:3001/users/register',formData)
			.then(response => {
				if(response.data.errors) {
					alert(response.data.alert)
				} else {
					this.props.history.push('/users/login')
				}
			})
	}
	
    render() {
        return(
            <div className="card">
				<form className="card-body" onSubmit={this.handleSubmit}>
                <h2>User Registeration</h2>
					<div className="form-group">
						<h5 className="card-title">Username</h5>
						<input
							type="text"
							className="form-control"
							id="username"
							placeholder="Username"
							onChange={this.handleChange}
						/>
					</div>

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
					
					<button type="submit" className="btn btn-primary">Register</button>
					<span> </span>
					<Link to="/" className="btn btn-primary">Back</Link>
				</form>
			</div>
        );
    }
}