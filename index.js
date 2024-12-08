import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path'


const app = express();



app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(),'./pages/public')));


const porta = 3007;
const host = 'localhost';

var listaUsuarios1 = [];
var listaUsuarios2 = []



function cadastroUsuarioView(req, resp) {
    resp.send(`
            <html>
                <head>
                    <title>Cadastro de Usuário</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">Menu</a>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/baterPapo">Sala de Bate Papo</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                    <div class="container text-center">
                        <h1 class="mb-3">Cadastro de Usuário</h1>
                              <form method="POST" action="/cadastrarUsuario" class="border p-3 row g-3" novalidate>
                                <div class="col-md-4">
                                    <label for="nome" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite o Nome">
                                </div>
                                <div class="col-md-4">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input type="email" class="form-control" id="email" name="email" placeholder="Digite o email">
                                </div>
                                <div class="col-md-4">
                                    <label for="senha" class="form-label">Senha</label>
                                    <input type="password" class="form-control" id="senha" name="senha" placeholder="Digite a senha">
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                                </div>
                            </form>
                        </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
    `);
}

function batePapoView2(req, resp) {
    resp.write(`
        <html>
            <head>
                <title>Sala de Bate Papo</title>
                <meta charset="utf-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: #f4f6f9;
                        font-family: Arial, sans-serif;
                    }
                    .chat-container {
                        max-width: 800px;
                        margin: 50px auto;
                        background-color: #fff;
                        border-radius: 10px;
                        padding: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        display: flex;
                        flex-direction: column;
                        height: 500px;
                        overflow: hidden;
                    }
                    .chat-box {
                        flex-grow: 1;
                        overflow-y: auto;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        background-color: #fafafa;
                        margin-bottom: 20px;
                    }
                    .message {
                        padding: 10px;
                        margin-bottom: 15px;
                        border-radius: 5px;
                        background-color: #e3f2fd;
                        max-width: 70%;
                    }
                    .input-area {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .input-area select, .input-area input {
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                    }
                    .input-area button {
                        padding: 10px;
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .input-area button:hover {
                        background-color: #45a049;
                    }
                </style>
            </head>
            <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/cadastrarUsuario">Cadastrar Usuário</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h3 style="text-align: center;">Sala de Bate Papo</h3>
                <div class="chat-container">
                    <div class="chat-box" id="chat-box"></div>
                    <div class="input-area">
    `);

    // Verificar se a lista de usuários está vazia
    if (listaUsuarios1 && listaUsuarios1.length > 0) {
        resp.write(`
            <select id="user-select" class="form-control">
        `);

        for (var i = 0; i < listaUsuarios1.length; i++) {
            resp.write(`
                <option value="${listaUsuarios1[i].nome}">${listaUsuarios1[i].nome}</option>
            `);
        }

        resp.write(`
            </select>
            <input type="text" id="messagem" class="form-control" placeholder="Digite sua mensagem..." />
            <button onclick="enviarMensagem()">Enviar</button>
        `);
    } else {
        resp.write(`
            <div class="alert alert-warning">
                Não existem usuários cadastrados. Por favor, cadastre um usuário antes de continuar.
            </div>
        `);
    }

    resp.write(`
                    </div>
                </div>
                <script>
                    function enviarMensagem() {
                        const subirMensagem = document.getElementById('messagem');
                        const caixaTexto = document.getElementById('chat-box');
                        const usuarioSelecionado = document.getElementById('user-select');
                        const message = subirMensagem.value;
                        const selecionarUsuario = usuarioSelecionado ? usuarioSelecionado.value : null;

                        if (!selecionarUsuario) {
                            alert("Por favor, selecione um usuário.");
                            return;
                        }

                        if (message.trim() === "") return;

                        const messageElement = document.createElement('div');
                        messageElement.classList.add('message');
                        messageElement.innerHTML = \`\${selecionarUsuario}: \${message}\`;
                        caixaTexto.appendChild(messageElement);

                        subirMensagem.value = "";
                        caixaTexto.scrollTop = caixaTexto.scrollHeight;
                    }
                </script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </html>
    `);
}


function menuView(req, resp) {
    let dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin) {
        dataHoraUltimoLogin = 'Não registrado';
    }
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">

            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Cliente</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <style>
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    background-color: #f8f9fa;
                    text-align: center;
                    padding: 10px 0;
                    border-top: 1px solid #eaeaea;
                }
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/cadastrarUsuario">Cadastrar Usuário</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/baterPapo">Sala de Bate Papo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <footer>
                <p>Seu último acesso foi realizado em: <strong>${dataHoraUltimoLogin}</strong></p>
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
        </html>
    `);
}

function cadastrarUsuario(req, resp) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    
    if (nome && email && senha) {

        const usuario = { nome, email, senha };

        listaUsuarios1.push(usuario);

        resp.write(`
        <html>
            <head>
                <title>Lista de Usuárioss</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
             <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/baterPapo">Sala de Bate-Papo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">senha</th>
                        </tr>
                    </thead>
                    <tbody>`);
        for (var i = 0; i < listaUsuarios1.length; i++) {
            resp.write(`
                            <tr>
                                <td>${listaUsuarios1[i].nome}</td>
                                <td>${listaUsuarios1[i].email}</td>
                                <td>${listaUsuarios1[i].senha}</td>
                            </tr>`

            );
        }

    }
    else{
        resp.write(`
            <html>
                <head>
                    <title>Cadastro de Usuários</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="/">Menu</a>

                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/baterPapo">Sala de Bate-Papo</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                        <div class="container text-center">
                            <h1 class="mb-3">Cadastro de Usuários</h1>
                            <form method="POST" action="/cadastrarUsuario" class="border p-3 row g-3" novalidate>
                                <div class="col-md-4">
                                    <label for="nome" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite o Nome" value="${nome || ''}">
            `);
        if (!nome) {
            resp.write(`
                                    <div>
                                        <span><p class="bg-danger">Por favor, você deve informar o Nome.</p></span>
                                    </div>
            `);
        }
        resp.write(`
                                </div>
                            <div class="col-md-4">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Digite o email" value="${email || ''}">
            `);
        if (!email) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar o e-mail.</p></span>
                                </div>
            `);
        }
        resp.write(`
                            </div>
                            <div class="col-md-4">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="senha" name="senha" placeholder="Digite a senhasenha" value="${senha || ''}">
            `);
        if (!senha) {
            resp.write(`
                                    <div>
                                        <span><p class="bg-danger">Por favor, você deve informar a senha.</p></span>
                                    </div>
            `);
        }
        resp.write(`
                            </div>
                        <div class="col-12">
                                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                                </div>
                            </form>
                        </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
        `);        
    }
    
    resp.end();
}

function baterPapo(req, resp) {
    const nome = req.body.nome;
    const email = req.body.email;

    
    
    if (nome || email) {

        const usuario = { nome, email};

        listaUsuarios2.push(usuario);

        resp.write(`
        <html>
            <head>
                <title>Lista de Usuárioss</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Usuário 1</th>
                            <th scope="col">Usuário 2</th>
                        </tr>
                    </thead>
                    <tbody>`);
        for (var i = 0; i < listaUsuarios2.length; i++) {
            resp.write(`
                            <tr>
                                <td>${listaUsuarios2[i].nome}</td>
                                <td>${listaUsuarios2[i].email}</td>
                            </tr>`

            );
        }

        resp.write(`</tbody>
            </table>   
            <a class="btn btn-primary" href="/baterPapo">Enviar nova Mensagem</a>  
            <a class="btn btn-secondary" href="/">Voltar ao Menu</a>   
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>`);
    }
    else{
        resp.write(`
            <html>
                <head>
                    <title>Cadastro de Usuários</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-3">Cadastro de Usuários</h1>
                        <form method="POST" action="/baterPapo" class="border p-3 row g-3" novalidate>
                            <div class="col-md-6">
                                <label for="nome" class="form-label">Mensagem USU1</label>
                                <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite o Nome" value="${nome || ''}">
            `);
        if (!nome) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar o Nome.</p></span>
                                </div>
            `);
        }
        resp.write(`
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Mensagem Usu2</label>
                                <input type="text" class="form-control" id="email" name="email" placeholder="Digite o email" value="${email || ''}">
            `);
        if (!email) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar o e-mail.</p></span>
                                </div>
            `);
        }
      
        resp.write(`
                            </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary">Cadastrar Usuário</button>
                            </div>
                        </form>
                    </div>
                </body>
            </html>
        `);        
    }
    
    resp.end();
}
function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'admin' && senha === '123'){
        req.session.usuarioLogado = true;
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly:true});
        resp.redirect('/');

    }
    else{
        resp.write(`<html>
                        <head>
                            <meta charset="utf-8"
                        <head>
                        <body>
                            <p>Usuário ou senha inválidos</p>
                        <body>
                    </html>`)
    }
}

function verificarAutenticacao(req, resp, next){
    if(req.session.usuarioLogado){
        next();
    }
    else{
        resp.redirect('/login.html');
    }
}
app.post('/login', autenticarUsuario);

app.get('/login', (req, resp) =>{
    resp.redirect('/login.html');
});
app.get('/logout', (req, resp) => {
    listaUsuarios1 = [];
    listaUsuarios2 = []
    req.session.destroy();
    resp.redirect('/login.html')
})
app.get('/', verificarAutenticacao, menuView);
app.get('/cadastrarUsuario', verificarAutenticacao, cadastroUsuarioView);
app.get('/baterPapo', verificarAutenticacao, batePapoView2);

app.post('/cadastrarUsuario', verificarAutenticacao, cadastrarUsuario);
app.post('/baterPapo', verificarAutenticacao, baterPapo);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
