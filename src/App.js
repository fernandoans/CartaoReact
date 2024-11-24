// ---------------------------------------------------------------------------------
// Instalar as depedências:
// npm install axios
// npm install bootstrap
// ---------------------------------------------------------------------------------
// Iniciar o Projeto
// npm start
// ---------------------------------------------------------------------------------
// Cria uma lista de usuários do GitHub
// Exemplos:
// fernandoans
// amitu2016
// kallebelins
// dsacademybr
// MarcinusX
// rajayogan
// ---------------------------------------------------------------------------------
import React, { useState } from 'react';
import axios from 'axios';
if (process.env.NODE_ENV !== 'test') {
    import('bootstrap/dist/css/bootstrap.min.css')
        .then(() => {
            // O Bootstrap foi carregado
        })
        .catch((error) => {
            console.error("Erro ao carregar o Bootstrap:", error);
    });
}

function Rodape() {
    return (
        <footer className="bg-dark text-white text-center py-1 mt-4">
            <p className="mb-0">Escrito por Fernando Anselmo <span>&copy;</span> 2024</p>
        </footer>
    );
}

const Card = props => {
    return (
        <div className="col">
            <div className="card border-dark" style={{ margin: '0.5em' }}>
                <div style={{margin: '1em'}}>
                    <img alt="avatar" style={{width: '70px'}} src={props.avatar_url} />
                    <div>
                        <div style={{fontWeight: 'bold'}}>{props.name}</div>
                        <a href={props.blog}>{props.blog}</a>
                    </div>
                </div>                    
            </div>
        </div>
    )
}

const CardList = ({cards}) => {
    return (
        <>
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </>

    )
}    

const Form = props => {
    const [userName, setUserName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .get(`https://api.github.com/users/${userName}`)
            .then(resp => {
                props.onSubmit(resp.data)
                setUserName('')
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nomeUsuario" className="form-label">Nome do Usuário no GitHub</label>
                <div className="input-group">
                    <input
                        id="nomeUsuario"
                        type="text"
                        className="form-control"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        placeholder="Nome do Usuário no Github"
                        required
                    />
                    <button className="btn btn-primary" type="submit">Adiciona Cartão</button>
                </div>
            </div>
        </form>
    )
}

const App = () => {
    const [cards, setCards] = useState([])

    const addNewCard = cardInfo => {
        setCards(cards.concat(cardInfo))
    }

    return (
        <div className="container">
            <h1 className="text-center">Dados dos Usuários do GitHub!</h1>
            <Form onSubmit={addNewCard} />
            <div className="row row-cols-2">
                <CardList cards={cards} />
            </div> 
            <Rodape /> 
        </div>
    )
}

export default App;