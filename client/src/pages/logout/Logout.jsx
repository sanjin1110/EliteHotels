import "./logout.css"
import React from 'react';
import axios from 'axios';

class LogoutButton extends React.Component {
    handleLogout = () => {
        axios.post('/auth/logout') // 
            .then(response => {
                window.location.href = '/login'; // Redirect to login page
            })
            .catch(error => {
                console.error("Logout error:", error);
                // Handle error if needed
            });
    }

    render() {
        return (
            <button className="logout-button" onClick={this.handleLogout}>Logout</button>
        );
    }
}

export default LogoutButton;
