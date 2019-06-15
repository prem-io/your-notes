import React from 'react';
import axios from '../../config/config';

import { Link } from 'react-router-dom';

export default class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			body: '',
			categories: [],
			category: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            title: nextProps.note.title,
            body: nextProps.note.body,
            category: nextProps.note.category
        }))
	}
	
	componentDidMount() {
		axios.get('/categories')
			.then((response) => {
				this.setState({ categories: response.data })
			})
	}

	handleChange(e) {
		e.persist()
		this.setState(() => ({
			[e.target.name]: e.target.value
		}))
	}

	handleSubmit(e) {
		e.preventDefault()
		const formData = {
			title: this.state.title,
			body: this.state.body,
			category: this.state.category
		}
		this.props.handleSubmit(formData)
	}

	render() {
		return(
			<div className="card">
				<form className="card-body" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<h5 className="card-title">Title</h5>
						<input
							type="text"
							name="title"
							className="form-control"
							value={this.state.title}
							placeholder="Note Title"
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<h5 className="card-title">Body</h5>
						<textarea
							name="body"
							value={this.state.body}
							className="form-control"
							rows="3"
							placeholder="Note Body"
							onChange={this.handleChange}
						></textarea>
					</div>

					<div className="form-group">
						<h5 className="card-title">Category</h5>
						<select value={this.state.category} className="form-control" name="category" onChange={this.handleChange}>
							<option value="">select</option>
							{
								this.state.categories.map((category) => {
									return <option key={category._id} value={category._id}>{category.name}</option>
								})
							}
						</select>
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
					<span> </span>
					<Link to="/notes" className="btn btn-primary">Back</Link>
				</form>
			</div>
		);
	}
}