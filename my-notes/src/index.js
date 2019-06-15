import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import Welcome from './components/users/Welcome';
import UserRegister from './components/users/UserRegister';
import UserLogin from './components/users/UserLogin';
import UserAccount from './components/users/UserAccount';
import UserLogout from './components/users/UserLogout';

import NotesList from './components/notes/ListNotes';
import NoteShow from './components/notes/ShowNote';
import NoteAdd from './components/notes/NewNote';
import NoteEdit from './components/notes/EditNote';

import CategoriesList from './components/categories/ListCategories';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isAuth: false
		}
	}

	handleAuth = (bool) => {
		this.setState({ isAuth: bool })
	}

	componentDidMount() {
		if(localStorage.getItem('userAuthToken')) {
			this.setState({ isAuth: true })
		}
	}

	render() {
		console.log(this.state)
		return (
			<BrowserRouter>
				<div className="container">
					<br/>
					<h1>my-notes</h1>
					<br/>
					
					<div>
						{ this.state.isAuth && (
							<div>
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item"><Link to="/notes">Notes</Link></li>
										<li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
									</ol>
								</nav>
								<Link className="btn btn-light" to="/users/account">Account</Link>
								<span> </span>
								<Link className="btn btn-danger" to="/users/logout">Logout</Link>
							</div>
						)}
						{ !this.state.isAuth && (
							<div>
								<Welcome/>
							</div>
						)}
					</div>
					<br/>

					<Switch>
						{/* <Route path="/" component={Welcome}/> */}
						<Route exact path="/users/register" component={UserRegister}/>
						<Route exact path="/users/login" render={(props) => {
							return <UserLogin {...props} handleAuth={this.handleAuth}/>
						}}/>
						<Route exact path="/users/account" component={UserAccount}/>
						<Route exact path="/users/logout" render={(props) => {
							return <UserLogout {...props} handleAuth={this.handleAuth}/>
						}}/>

						<Route exact path="/notes" component={NotesList}/>
						<Route path="/notes/add" component={NoteAdd}/>
						<Route path="/notes/edit/:id" component={NoteEdit}/>
						<Route path="/notes/:id" component={NoteShow}/>

						<Route exact path="/categories" component={CategoriesList}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));