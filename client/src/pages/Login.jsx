import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);
        if (result.success) {
            navigate('/career/recommendations');
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
                            <h2 className="title-gradient">Welcome Back</h2>
                            <p>Verify your trajectory parameters to continue.</p>
                        </div>

                        {error && <div className="auth-error mb-6">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group mb-6">
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
                            <div className="form-group mb-8">
                                <label>Access Key</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary full-width mb-6" disabled={loading}>
                                {loading ? 'Synchronizing Intelligence...' : 'Login to CareerOrbit'}
                            </button>
                        </form>

                        <div className="auth-footer text-center">
                            <p>New to the orbit? <Link to="/signup">Register Talent</Link></p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
