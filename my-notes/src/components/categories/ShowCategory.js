import React from 'react';
import axios from 'axios';

export default class CategoryShow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            category: {},
            notes: []
      }
   }

   componentDidMount() {
      const id = this.props.match.params.id
      axios.get(`http://localhost:3001/categories/${id}`)
         .then((response) => {
            this.setState(() => ({
               category: response.data,
               notes: response.data.notes
            }))
         })
   }

   render() {
      return (
         <div>
         <h2>{this.state.category.name}</h2>
            <ul>{
                    this.state.notes.map(note => {
                        return <li key={note._id}><h3>{note.title}</h3></li>
                    })
                }
            </ul>
         </div>
      );
   }
}