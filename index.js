import express from 'express';
import cors from 'cors';
import rotaCandidatos from './rotas/rotaCandidatos.js';
import rotaVagas from './rotas/rotaVagas.js';
import rotaInscricoes from './rotas/rotaInscricoes.js';


const host='localhost';
const porta='4000';

const app = express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/candidatos', rotaCandidatos);
app.use('/vagas', rotaVagas);
app.use('/inscricoes', rotaInscricoes);


app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
