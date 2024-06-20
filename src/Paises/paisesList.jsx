import React, { useEffect, useState } from 'react';
import './paisesList.css';

const paises = () => {
  const [paises, setPaises] = useState([]); // Definindo o estado paises e a função para atualizá-lo
  const [favoritos, setFavoritos] = useState([]); // Definindo o estado favoritos e a função para atualizá-lo
  const [ordemOriginal, setOrdemOriginal] = useState([]); // Definindo o estado ordemOriginal e a função para atualizá-lo

  useEffect(() => { // Efeito executado apenas após o componente ser montado
    fetch('paises.json')
      .then(response => response.json()) // Convertendo a resposta para JSON
      .then(data => {
        const dadosT = data.map(pais => ({ // Mapeando os dados para um novo formato
          id: pais.numericCode, 
          nome: pais.name, 
          bandeira: pais.flag, 
          populacao: pais.population, 
          sigla: pais.alpha2Code
        }));
        setPaises(dadosT); // Atualizando o estado paises com os dados transformados
        setOrdemOriginal(dadosT.map(pais => pais.id)); // Salvando a ordem original dos países
      })
      .catch(error => console.error('Erro ao buscar dados:', error)); 
  }, []); 
  const favoritar = (pais) => {
    setFavoritos([...favoritos, pais]); // Adicionando o país aos favoritos
    setPaises(paises.filter(p => p.id !== pais.id)); // Removendo o país da lista de países
  };

  const desfavoritar = (pais) => {
    const paisesAtualizados = [...paises]; // Criando uma cópia da lista de países
    const indice = ordemOriginal.indexOf(pais.id); // Obtendo o índice original do país na lista de países
    paisesAtualizados.splice(indice, 0, pais); // Inserindo o país na posição original na lista de países
    setPaises(paisesAtualizados); // Atualizando o estado paises com os países atualizados
    setFavoritos(favoritos.filter(fav => fav.id !== pais.id)); // Removendo o país dos favoritos
  };

  const totalPopulacao = (lista) => { 
    return lista.reduce((soma, pais) => soma + pais.populacao, 0); // Reduzindo a lista de países para calcular a população total
  };

  return ( 
    <div className="pais-container">
      <div className="pais-lista">
        <h2>Todos os Países ({paises.length})</h2>
        <h4>População Total: {totalPopulacao(paises).toLocaleString()}</h4>
        <ul>
          {paises.map(pais => (
            <li key={pais.id}>
              <img src={pais.bandeira} alt={pais.nome} style={{ maxWidth: '200px', height: 'auto' }} />
              <div>
                <h3>{pais.nome}</h3>
                <p>Sigla: {pais.sigla}</p>
                <button onClick={() => favoritar(pais)}>Adicionar aos Favoritos</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pais-lista">
        <h2>Favoritos ({favoritos.length})</h2>
        <h4>População Total: {totalPopulacao(favoritos).toLocaleString()}</h4>
        <ul>
          {favoritos.map(pais => (
            <li key={pais.id}>
              <img src={pais.bandeira} alt={pais.nome} style={{ maxWidth: '200px', height: 'auto' }} />
              <div>
                <h3>{pais.nome}</h3>
                <p>Sigla: {pais.sigla}</p>
                <button onClick={() => desfavoritar(pais)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default paises;
