import React from 'react';
import axios from '../../config/config';
import { Link } from 'react-router-dom';

export default class CategoriesList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         categories: []
      }
   }

   componentDidMount() {
      axios.get('/categories')
         .then((response) => {
            this.setState({ categories: response.data})
         })
   }

   render() {
      return(
         <ul className="list-group">
					{
						this.state.categories.map(category => {
                        return <li
                                 className="list-group-item"
											key={category._id}>
                                 <Link to={`/categories/${category._id}`}>{category.name}</Link>
										</li>
						})
					}
				</ul>
      );
   }
}