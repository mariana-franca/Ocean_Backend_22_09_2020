const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//const porta = 3000;
const porta = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
app.use(jsonParser);


app.get('/', (req,res) => {
    res.send('Hello World');
});

//Endpoints de envio de mensagens
//CRUD -> create, read(read all e read single), Uptade and Delete
//CRUD -> criar, lar(ler tudo e ler individualmente), atualizar e remover

const mensagens = [
    {
        id: 0,
        texto: "Essa é uma mensagem"
    },
    {
        id: 1,
        texto:"Essa é outra mensagem"
    },

];

//Read All
app.get('/mensagens', (req,res) => {
    res.json(mensagens);
});

//Create
app.post('/mensagens', (req,res) => {
    //Obtendo a mensagem que foi recebida atraves do body de requisição
    const mensagem = req.body;

    const id = mensagens.length
    //insiro a mensagem na lista de mensagens

    mensagem.id = id;

    mensagens.push(mensagem);

    //const id = mensagens.length - 1;

    //Exibindo o ID da mensagem, que no caso é o indice que ela foi adicionada
    res.send(`A mensagem com texto ${mensagem.texto} foi criada. ID : ${id}`);
});

// Read single
app.get('/mensagens/:id', (req,res) => {
    //pega os ID atraves dos parametros da requisiação 
    const id = req.params.id;
    
    //
    const mensagem = mensagens[id];

    res.json(mensagem)
    // res.json({ id, ,mensagem})
});

    //res.send('Exibe uma mensagemm selecionada pelo ID que foi informado');

//Uptade
app.put('/mensagens/:id', (req,res) => {
    //Acessa o Id pelos parametros
    const id = req.params.id;
//obtem a mensagem que foi nviada pelo usuario no corpo (body) da requisição
    const novoTexto = req.body.texto;
//atuaiza a mensagem direto na lista de mensgens, acessando pelo ID que foi informado
    mensagens[id].texto= novoTexto;

    res.send(`Mensagem com ID ${id} foi atualizado com sucesso`);
});

//Delete
app.delete('/mensagens/:id', (req,res) => {

    const id = req.params.id;

    delete mensagens[id];


    res.send(`Mensagem com ID ${id} foi removida com sucesso`);
});



app.listen(porta, () => {
    console.log(`App rodando em http://localhost:${porta}`);
});