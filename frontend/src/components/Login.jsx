import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Email ou senha inválidos');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Login Administrativo</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Senha</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 w-100">
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
