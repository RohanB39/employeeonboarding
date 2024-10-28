import React, { useState } from 'react';
import './LoginPage.css';
import LoginImage from '../../assets/LoginPage.png';
import { fireDB, collection, query, where, getDocs } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Query Firestore to check if the entered email and password match
            const q = query(
                collection(fireDB, 'Onboarding_Info'),
                where('email', '==', email),
                where('password', '==', password)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // If no matching document found, show error
                setError('Invalid email or password');
            } else {
                // If matching document found, navigate to OnboardingPage
                navigate('/personal');
            }
        } catch (error) {
            console.error('Error checking credentials:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='mainLoginContainer'>
            <div className="login-container">
                <div className="login-box">
                    <div className="login-image">
                        <img src={LoginImage} alt="Login" />
                    </div>
                    <h2>Welcome!</h2>
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
