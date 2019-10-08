import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';
import styles from './styles.css';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [technologies, setTecnologies] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(undefined);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
        [thumbnail]
    )
    
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('technologies', technologies);
        
        await api.post('/spots', data, {
            headers: { user_id: user_id }
        });

        await history.push('/dashboard');
    }

    function handleBackTrack() {
        window.location.assign('/dashboard');
    }
    
    return (<>
    <form onSubmit={handleSubmit}>
        <label id="thumbnail"
        style={{backgroundImage: `url(${preview})`}}
        className={thumbnail ? "has-thumbnail" : ""}
        >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
            <img src={camera} alt="Selecione uma imagem"/>
        </label>
        <label htmlFor="company">Empresa *</label>
        <input 
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
        />

        <label htmlFor="technologies">Tecnologias *<span> (separadas por vírgula)</span></label>
        <input 
        id="technologies"
        placeholder="Quais tecnologias usam?"
        value={technologies}
        onChange={event => setTecnologies(event.target.value)}
        />

        <label htmlFor="price">Valor da diária *<span> (Em branco para GRATUITO)</span></label>
        <input 
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
        />
        <button type="submit" className="btn">Cadastrar spot!</button>
    </form>
    <button type="button" className="btn" id="btn_new_backtrack" onClick={handleBackTrack}>Voltar</button>
    </>
    )
}