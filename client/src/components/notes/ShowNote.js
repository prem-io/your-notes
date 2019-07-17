import React from 'react';
import axios from '../../config/config';
import { Link } from 'react-router-dom';

export default class NoteShow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
				note: {}
		}
		this.handleRemove = this.handleRemove.bind(this)
	}

	componentDidMount() {
		const id = this.props.match.params.id
		axios.get(`/notes/${id}`, {
			headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
		})
		.then((response) => {
				this.setState({ note: response.data })
		})
	}

	handleRemove() {
		const id = this.props.match.params.id
		const confirmRemove = window.confirm('Are you sure?')
		if(confirmRemove) {
			axios.delete(`/notes/${id}`)
				.then((response) => {
					this.props.history.push('/notes')
				})
		}
	}

	render() {
		return (
			<div className="card">
				<div className="card-header">
					<h2>{this.state.note.title}</h2>
				</div>
				<div className="card-body">
					<p className="card-text">{this.state.note.body}</p>
					<div className="btn-group btn-group-sm">
						<button type="button" className="btn btn-secondary">{ this.state.note.category && this.state.note.category.name }</button>
						<button type="button" className="btn btn-secondary">x</button>
					</div>
					<br/>
					<br/>
					<Link
						to={`/notes/edit/${this.props.match.params.id}`}
						className="btn btn-info"
					>Edit</Link>
					<span> </span>
					<button
						type="button"
						className="btn btn-danger"
						onClick={this.handleRemove}
					>Delete</button>
					<Link to="/notes" className="btn btn-primary float-right">Back</Link>
				</div>
			</div>
		);
	}
}