const express = require('express')
const http = require('http')
const cors = require('cors')
const debug = require('debug')('apiwa:server')
const app = express()
const jwt = require('jsonwebtoken')
const port = normalizePort(process.env.PORT || '9014')
app.set('port', port)

//server
const server = http.createServer(app)

app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use(express.json({
    limit: '50mb'
}));

//cors
app.use(cors())

//start
server.listen(port, function () {
    console.log('App running on *: ' + port);
});
server.on('error', onError)
server.on('listening', onListening)

//rotas
const routes = require('./src/load');


app.use('/cadastros', routes.cadastros)
app.use('/relatorios', routes.relatorio)
app.use('/usuarios', routes.usuarios)
app.use('/usuarios-permissoes', routes.usuariosPermissoes)
app.use('/projetos', routes.projetos)
app.use('/projetos-usuarios', routes.projetosUsuarios)
app.use('/grupos', routes.grupos)
app.use('/dominios', routes.dominios)
app.use('/cadastro-dados-controle', routes.cadastroDadosControle)
app.use('/cadastro-visitas', routes.cadastroVisitas)
app.use('/cadastro-violencia', routes.cadastroViolencia)
app.use('/cadastro-violencia-maria', routes.cadastroViolenciaMaria)
app.use('/cadastro-ocupacao', routes.cadastroOcupacao)
app.use('/cadastro-sustentabilidade', routes.cadastroSustentabilidade)
app.use('/cadastro-responsaveis', routes.cadastroResponsaveis)
app.use('/cadastro-mobilidade-urbana', routes.cadastroMobilidadeUrbana)
app.use('/login', routes.login)
app.use('/cadastro-esportes', routes.cadastroEsportes)
app.use('/cadastro-demografico', routes.cadastroDemografico)
app.use('/cadastro-demografico-valor', routes.cadastroDemograficoValor)
app.use('/cadastro-lazer', routes.cadastroLazer)
app.use('/cadastro-animal', routes.cadastroAnimal)
app.use('/cadastro-programa', routes.cadastroPrograma)
app.use('/cadastro-entidades', routes.cadastroEntidades)
app.use('/cadastra-documento', routes.cadastroDocumento)
app.use('/loop',routes.loop)
app.use('/cria-tudo',routes.criaTudo)
app.use('/mo-pdf',routes.moPdf)


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind)
}