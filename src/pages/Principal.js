import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Principal() {
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Se achou um usuário logado, pega o UID dele e vai no Firestore buscar os dados
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data()); // Salva os dados no state
        } else {
          console.log("Nenhum dado encontrado no Firestore!");
        }
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    await signOut(auth);
    navigate('/');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Página Principal</h1>
      
      {userData ? (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
          <h2>Bem-vindo, {userData.nome}!</h2>
          <p><strong>Nome completo:</strong> {userData.nome} {userData.sobrenome}</p>
          <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}

      <button onClick={handleLogout} style={{ marginTop: '30px' }}>Sair da conta</button>
    </div>
  );
}

export default Principal;