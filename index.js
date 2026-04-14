const express = require('express');
const app = express();

app.use(express.json());

// Lista dos 10 filmes
let filmes = [
    { id: 1, titulo: "Homem aranha no aranha verso", diretor: "Bob Persichetti", nota: 10, genero: "Animacao" },
    { id: 2, titulo: "Amor com data marcada", diretor: "John Whitesell", nota: 7, genero: "Romance" },
    { id: 3, titulo: "Vingadores ultimato", diretor: "Joe Russo", nota: 10, genero: "Acao" },
    { id: 4, titulo: "Juntos e misturados", diretor: "Frank Coraci", nota: 8, genero: "Comedia" },
    { id: 5, titulo: "Arremessando Alto", diretor: "Jeremiah Zagar", nota: 9, genero: "Drama" },
    { id: 6, titulo: "Homem aranha sem volta pra casa", diretor: "Jon Watts", nota: 10, genero: "Acao" },
    { id: 7, titulo: "Operação big hero", diretor: "Don Hall", nota: 9, genero: "Animacao" },
    { id: 8, titulo: "Camp rock", diretor: "Matthew Diamond", nota: 7, genero: "Musical" },
    { id: 9, titulo: "Lemonade Mouth", diretor: "Patricia Riggen", nota: 8, genero: "Musical" },
    { id: 10, titulo: "A hora do rush", diretor: "Brett Ratner", nota: 9, genero: "Comedia" }
];

let proximoId = 11;

//  Rota para listar TODOS os filmes 
app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

//  Rota para buscar UM filme específico pelo ID
app.get('/api/filmes/:id', (req, res) => {
    const { id } = req.params;
    const filme = filmes.find(f => f.id === parseInt(id));

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado!" });
    }

    res.json(filme);
});
// Rota POST Criar novo filme 
app.post('/api/filmes', (req, res) => {
    const { titulo, diretor, nota, genero } = req.body;

    // Se faltar campo, o servidor barra com 400 (Bad Request)
    if (!titulo || !diretor || !nota || !genero) {
        return res.status(400).json({ erro: "Faltam dados! Preenche tudo aí." });
    }

    // Regra da nota tem que ser de 0 a 10 (Erro 422 - Unprocessable Entity)
    if (nota < 0 || nota > 10) {
        return res.status(422).json({ erro: "Nota inválida! Tem que ser entre 0 e 10." });
    }

    // Gerando o objeto novo com ID automático
    const novoFilme = { id: proximoId++, titulo, diretor, nota, genero };
    filmes.push(novoFilme);
    
    // Sucesso: 201 Created
    res.status(201).json(novoFilme);
});
app.put('/api/filmes/:id', (req, res) => {
    const idParaBuscar = parseInt(req.params.id); // Transforma o ID da URL em número
    const { titulo, diretor, nota, genero } = req.body;

    const filme = filmes.find(f => f.id === idParaBuscar);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado!" });
    }

    // Se as validações de campo estiverem barrando, veja se escreveu os nomes certos no Postman
    if (!titulo || !diretor || nota === undefined || !genero) {
        return res.status(400).json({ erro: "Dados incompletos!" });
    }

    filme.titulo = titulo;
    filme.diretor = diretor;
    filme.nota = nota;
    filme.genero = genero;

    res.json(filme);
});
    
// Rota DELETE Remover filme (CRUD completo)
app.delete('/api/filmes/:id', (req, res) => {
    const { id } = req.params;
    
    // Acha a posição do filme na lista
    const index = filmes.findIndex(f => f.id === parseInt(id));

    // Se o index for -1, o filme não existe
    if (index === -1) {
        return res.status(404).json({ erro: "Esse filme nem existe para apagar!" });
    }

    // Tira o filme da lista
    filmes.splice(index, 1);

    // Sucesso sem conteúdo: 204 No Content
    res.status(204).send();
});

app.listen(3001, () => {
    console.log("🔥 Servidor rodando em: http://localhost:3001/api/filmes");
});