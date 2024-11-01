import { useNavigate } from 'react-router-dom';
import './LoginForm.module.css';

function LoginForm() {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username === 'test' && password === '1234') {
      alert('Login successful');
      navigate('/todo');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login to access your TODOs</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;