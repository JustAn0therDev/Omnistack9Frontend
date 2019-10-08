import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import styles from './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }    
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function deleteDashboard(spot_id) {
        const user_id = localStorage.getItem('user');
        await api.post('/spots/delete', { spot_id }, {
            headers: { user_id: user_id }
        });
        //É feita numa nova chamda para a API para evitar que o usuário tenha que recarregar a página por completo, apenas recarregando os dados no componente.
        const response = await api.get('/dashboard', {
            headers: { user_id }    
        });

        setSpots(response.data);
    }

    function handleLogout() {
        localStorage.clear('user');
        //Transfere o usuário para a URL de início da página.
        window.location.assign('/');
    }
    return (
        <>
            <button className="btn" type="button" id="btn_dashboard_logout" onClick={handleLogout}>Logout</button>
            {spots.length > 0 ? <ul className="spot-list">
                {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
                    <button className="btn" type="button" onClick={() => { deleteDashboard(spot._id) }}>Excluir Spot</button>
                </li>))}
            </ul> : <p style={{width: "100%", color: "#AAA"}}>Sua empresa ainda não possui spots cadastrados.</p>}
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}