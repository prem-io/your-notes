import React from "react";
import axios from '../../config/config';
import { Link } from 'react-router-dom';

export default class NotesList extends React.Component {
	constructor(props) {
			super(props)
			this.state = {
					notes: []
			}
	}

	componentDidMount() {
		axios.get('/notes', {
			headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
		})
		.then((response) => {
			this.setState({ notes: response.data})
		})
		.catch((err) => {
			this.props.history.push('/users/login')
		})
	}

	handleRemove(id) {
		const confirmRemove = window.confirm('Are you sure?')
		if(confirmRemove) {
			axios.delete(`/notes/${id}`)
				.then((response) => {
					this.props.history.push('/')
				})
		}
	}

	render() {
		return (
			<React.Fragment>
				<h1>Notes - {this.state.notes.length}</h1>
				<ul className="list-group">
					{
						this.state.notes.map(note => {
								return <li
											className="list-group-item"
											key={note._id}>
											<Link to={`/notes/${note._id}`}>{note.title}</Link>
											<div className="float-right">
												<Link
													to={`/notes/edit/${note._id}`}
													className="btn btn-outline-info btn-sm"
												>Edit</Link>	
												<span> </span>
												<button
													type="button"
													className="btn btn-outline-danger btn-sm"
													onClick={this.handleRemove.bind(this, `${note._id}`)}
												>Delete</button>
											</div>
									</li>
						})
					}
				</ul>
				<br/>
				<Link to="/notes/add" className="btn btn-info float-right">Add Note</Link>
			</React.Fragment>
		);
	}
}