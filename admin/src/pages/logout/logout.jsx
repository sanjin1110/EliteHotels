import React from 'react';
import axios from 'axios';
import "./logout.css"
class LogoutButton extends React.Component {
    handleLogout = () => {
        axios.post('/auth/logout') // Replace with your actual API endpoint
            .then(response => {
                // Redirect or perform other actions after successful logout
                window.location.href = '/login'; // Redirect to login page
            })
            .catch(error => {
                console.error("Logout error:", error);
                // Handle error if needed
            });
    }

    render() {
        return (
            <button onClick={this.handleLogout} className="logout-button">Logout</button>
        );
    }
}

export default LogoutButton;
