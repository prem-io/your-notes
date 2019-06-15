import React from 'react';
import { Link } from 'react-router-dom';

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">This is a simple personalized notes app, it supports add, delete and edit note functionality. It provides user-autentication which adds an extra attention to your personal content or information.</p>
                <hr className="my-4"/>
                <p>Application Stack: Bootstrap, JavaScript, ReactJS, NodeJs, ExpressJS, and MongoDB</p>
                
                <Link className="btn btn-dark" to="/users/register">Register</Link>
                <span> </span>
                <Link className="btn btn-success" to="/users/login">Login</Link>
            </div>
        );
    }
}