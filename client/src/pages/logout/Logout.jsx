import axios from 'axios';
import React from 'react';
import "./logout.css";

class LogoutButton extends React.Component {
    handleLogout = async () => {
        await axios.post('/auth/logout') // 
            .then(response => {
                window.location.href = '/login'; // Redirect to login page
            })
            .catch(error => {
                console.error("Logout error:", error);
                
            });
    }

    render() {
        return (
            <button className="logout-button" onClick={this.handleLogout}>Logout</button>
        );
    }
}

export default LogoutButton;
