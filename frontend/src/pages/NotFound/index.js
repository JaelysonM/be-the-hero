import React from 'react';
import {Link} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';


export default function NotFound(params) {
 console.log(params);
  return (<div className="notfound-container">
    <section className="container">
        <img src={logoImg} alt="Be The Hero"/>
        <div>
        <h1>Página não encontrada :/</h1>
        <p>
          Desculpe herói mais a página que você estava procurando não existe, mas você pode retornar para a página inicial.
        </p>
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
         Retornar para página inicial
        </Link>
        </div>
    </section>
    <img src={heroesImg} alt="heroes"/>
  </div>
    );
}