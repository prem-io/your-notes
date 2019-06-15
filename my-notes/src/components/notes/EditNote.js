import React from 'react';
import axios from 'axios';
import Form from './Form';

export default class NoteEdit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			note: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3001/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            this.setState({ note: response.data })
        })
    }

    handleSubmit(formData) {
		axios.put(`http://localhost:3001/notes/${this.state.note._id}`, formData, {
			headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
		})
		.then((response) => {
			if(response.data.hasOwnProperty('errors')) {
				console.log(response.data.errors)
			} else {
				this.props.history.push(`/notes/${response.data._id}`)
			}
		})
	}

	render() {
		return (
			<div>
				<h2>Edit Note</h2>
                <Form note={this.state.note} handleSubmit={this.handleSubmit}/>
			</div>
		);
	}
}