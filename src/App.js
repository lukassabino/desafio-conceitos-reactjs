import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Conceitos de ReactJS",
      url: "https://github.com/lukassabino/desafio-conceitos-reactjs",
      techs: ["ReactJS", "NodeJS", "React Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(repository) {
    const response = await api.delete(`repositories/${repository}`)

    const repositoryIndex = repositories.findIndex(repositoryIndx => repositoryIndx.id === repository);

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository not found' })
    }

    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title} 
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
