import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [mensagem, setMensagem] = useState(''); 

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/principal');
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Usuário não está cadastrado ou credenciais incorretas.");
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          id="password"
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">Acessar</button>
      </form>

      {/* Label que só aparece se houver alguma mensagem de erro */}
      {mensagem && (
        <label style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
          {mensagem}
        </label>
      )}
    </div>
  );
}

export default Login;