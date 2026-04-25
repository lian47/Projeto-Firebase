import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  async function handleCadastro(e) {
    e.preventDefault(); 

    try {
      // 1. Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid; 

      // 2. Grava o restante dos dados no Firestore
      await setDoc(doc(db, "usuarios", uid), {
        uid: uid,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email
      });

      alert("Usuário cadastrado com sucesso!");
      navigate("/"); 

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar: " + error.message);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Cadastro</h1>
      
      <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
        
        <input 
          type="text" 
          placeholder="Sobrenome" 
          value={sobrenome} 
          onChange={(e) => setSobrenome(e.target.value)} 
          required 
        />
        
        <input 
          type="date" 
          value={dataNascimento} 
          onChange={(e) => setDataNascimento(e.target.value)} 
          required 
        />
        
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
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;