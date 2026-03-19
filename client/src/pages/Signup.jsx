import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        const result = await register(formData.username, formData.email, formData.password);
        if (result.success) {
            navigate('/profile/create');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="page-wrapper auth-page">
            <Navbar />
            <main className="auth-main section-padding">
                <div className="container">
                    <div className="auth-card glass-card mx-auto">
                        <div className="auth-header text-center mb-8">
                            <h2 className="title-gradient">Begin Trajectory</h2>
                            <p>Initialize your professional blueprint on CareerOrbit AI.</p>
                        </div>

                        {error && <div className="auth-error mb-6">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group mb-4">
                                <label>Professional Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your name"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label>Email Vector</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label>Secure Access Key</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-8">
                                <label>Confirm Key</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary full-width mb-6" disabled={loading}>
                                {loading ? 'Initializing Talent Protocol...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="auth-footer text-center">
                            <p>Already in trajectory? <Link to="/login">Secure Login</Link></p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Signup;
