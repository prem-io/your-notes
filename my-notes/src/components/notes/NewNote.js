import React from 'react';
import axios from '../../config/config';
import Form from './Form';

export default class NoteNew extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			serverErrors: {}
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(formData) {
		axios.post('/notes', formData, {
			headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
		})
		.then((response) => {
			if(response.data.hasOwnProperty('errors')) {
				console.log(response.data.errors)
				this.setState(() => ({
					serverErrors: response.data.errors
				}))
			} else {
				console.log(response.data)
				this.props.history.push(`/notes/${response.data._id}`)
			}
		})
	}

	render() {
		return (
			<div>
				<h2>Add Note</h2>
				<Form handleSubmit={this.handleSubmit}/>
			</div>
		);
	}
}