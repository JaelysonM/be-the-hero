import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile() {

  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const [incidents,setIncidents] = useState([]);
   
  const history = useHistory();
  useEffect(() => {
    api.get("/profile", {headers: {
      Authorization: ongId
    }}).then(response => setIncidents(response.data));
  },[ongId]);
  async function handleDeleteIncident(id) {
      try {
          await api.delete(`incidents/${id}`, {
            headers: {
              Authorization: ongId
            }
          });

          setIncidents(incidents.filter(r=> r.id !==id));
      }catch (err) {
        alert(`Erro ao deletar o caso, tente novamente.`);
      }
  }
  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
     <header>
     <img src={logoImg} alt="Be the Hero"/>
      <span>Bem vinda, {ongName}</span>
      <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
      <button onClick={() => handleLogout()}type="button">
      <FiPower size={18} color="#E02041" />
      </button>
     </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(r=> (
          <li key={r.id}>
          <strong>CASO:</strong>
          <p>{r.title}</p>
          <strong>DESCRIÇÃO:</strong>
          <p>{r.description}</p>
          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency',currency:'BRL'}).format(r.value)}</p>
          <button onClick= {() => handleDeleteIncident(r.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}     
      </ul>
    </div>
  );
    
}