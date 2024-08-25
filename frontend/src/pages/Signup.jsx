import React, { useState } from "react";
import Heading from "../components/Heading";
import Inputfield from "../components/Inputfield";
import Button from "../components/Button";
import axios from "axios"; // Make sure axios is imported

export default function Signin() {
    // State variables to hold input field values
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle Signin as Startup
    const handleSigninAsStartup = async () => {
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);

        if (!email || !username || !password) {
            console.error("All fields are required");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/signinstartup", {
                email: email,
                username: username,
                password: password
            });
            console.log("Signin successful", response.data);
            const { token, redirectUrl } = response.data;

            // Save token in localStorage/sessionStorage
            localStorage.setItem('token', token);
        
            // Redirect to the startup dashboard
            window.location.href = redirectUrl;
        } catch (error) {
            console.error("Signin failed", error);
        }
    };

    const handleSigninAsInvestor = async () => {
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);

        if (!email || !username || !password) {
            console.error("All fields are required");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/signininvestor", {
                email: email,
                username: username,
                password: password
            });
            console.log("Signin successful", response.data);
        } catch (error) {
            console.error("Signin failed", error);
        }
    };

    return (
        <div>
            <Heading title="Signin" />
            <Inputfield
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Update state on change
            />
            <Inputfield
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Update state on change
            />
            <Inputfield
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Update state on change
            />
            <Button
                title="Signin As Startup"
                onclick={handleSigninAsStartup}  // Function for startup signin
            />
            <Button title="Signin As Investor" onclick={handleSigninAsInvestor} />
        </div>
    );
}
