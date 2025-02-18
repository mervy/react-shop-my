import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Administrativo</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
