import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = { email: '', password: '' };
    if (!email) e.email = 'El email es obligatorio';
    else if (!email.includes('@')) e.email = 'Email no válido';
    if (!password) e.password = 'La contraseña es obligatoria';
    else if (password.length < 6) e.password = 'Mínimo 6 caracteres';
    setErrors(e);
    return !e.email && !e.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      navigate('/cines');
    } catch {
      setServerError('Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {serverError && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label style={{ fontWeight: 'bold', color: '#374151' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            style={{ padding: '0.75rem', borderRadius: '6px', border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`, fontSize: '1rem' }}
          />
          {errors.email && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.email}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label style={{ fontWeight: 'bold', color: '#374151' }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ padding: '0.75rem', borderRadius: '6px', border: `1px solid ${errors.password ? '#ef4444' : '#d1d5db'}`, fontSize: '1rem' }}
          />
          {errors.password && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.password}</span>}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.85rem', marginTop: '0.5rem', backgroundColor: loading ? '#9ca3af' : '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Comprobando...' : 'Iniciar sesión'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem', color: '#4b5563' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          Regístrate aquí
        </Link>
      </div>
    </>
  );
}