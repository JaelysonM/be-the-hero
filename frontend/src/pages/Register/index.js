import React, {useState} from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import {Link} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {
   
   const [data, setData] = useState({
     name: "",
     email: "",
     whatsapp: "",
     city: "",
     uf: ""
   });
 async function handleRegister(e) {
     e.preventDefault();

     try {
      const response = await api.post("/ongs", data);
      alert(`Seu ID de acesso é ${response.data.id}`);

    }catch (err) {
      alert(`Erro no cadastro, tente novamente.`);
      
     }
    
  }


  return (<div className="register-container">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"/>
        <h1>Cadastro</h1>
        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
          Já tenho cadastro
        </Link>
      </section>
      <form onSubmit={handleRegister}>
          <input 
          placeholder="Nome da ONG"
          value={data.name}
          onChange={ (e) => setData({...data, name: e.target.value})}
          />
          <input type="email" 
          placeholder="E-mail"
          value={data.email}
          onChange={ (e) => setData({...data, email: e.target.value})}
          />
          <input placeholder="WhatsApp"
           value={data.whatsapp}
           onChange={ (e) => setData({...data, whatsapp: e.target.value})}
          />

          <div className="input-group">
          <input placeholder="Cidade"
           value={data.city}
           onChange={ (e) => setData({...data, city: e.target.value})}
          />
          <input placeholder="UF"
            value={data.uf}
            onChange={ (e) => setData({...data, uf: e.target.value})}
           style={{width: 80}}/>
          </div>

          <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
    );
}