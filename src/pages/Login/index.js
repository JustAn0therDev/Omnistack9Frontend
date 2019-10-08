import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    //Desestruturação sendo aplicada ao retorno da função useState.
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
    
    //O React não consegue parar o funcionamento de um comportamento padrão usando "return false", por isso prevent é usado.
    event.preventDefault(); 

    //Envia o email para a rota de sessions. O const response deve continuar aqui para sabermos o que é retornado e usar o que veio do back-end.
    var response = await api.post('/sessions', { email });
    
    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
    
    }
    return (
    //Tag com apenas os sinais de "maior que" e "menor que" são "fragments". Permitem que um elemento pai tome conta dos elementos no componente sem atrapalhar a estilização, pois este mesmo elemento pai vai sumir no DOM.
    <>
        <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para a sua empresa.
        </p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail *</label>
            <input 
            type="email" 
            id="email" 
            placeholder="Seu melhor e-mail"
            value={email}
            //valor que foi preenchido no input
            onChange={event => setEmail(event.target.value)}
            />

            <button type="submit" className="btn">Entrar</button>
        </form>
    </>
  );
}