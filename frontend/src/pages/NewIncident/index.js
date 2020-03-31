import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';


export default function NewIncident() {
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  const [data, setData] = useState({
    title: "",
    description: "",
    value: '',
  });

  async function handleCreate(e) {
    e.preventDefault();
    if (localStorage.getItem("ongId") != null) {
      try {
        await api.post("/incidents",data, {
          headers: {
           Authorization: ongId
          }
        });
        history.push('/profile');
     }catch (err) {
       alert("Erro ao criar um incidente, tente novamente");
      }
    }else {
      alert("Erro ao criar um incidente, você não está logado");
    }
        
  }

  return (<div className="new-incident-container">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
          Voltar para home
        </Link>
      </section>
      <form onSubmit={handleCreate}>
          <input 
          placeholder="Título do caso"
          onChange={(e) => setData({...data, title: e.target.value})}
          value={data.title}
          />
          <textarea 
          placeholder="Descrição"
          onChange={(e) => setData({...data, description: e.target.value})}
          value={data.description}
          />
          
          <input 
          placeholder="Valor em reais"
          value={data.value}
          onChange={(e) => setData({...data, value: e.target.value})}
          />
          <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
    );
}