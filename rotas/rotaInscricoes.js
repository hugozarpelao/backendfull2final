import { Router } from "express";
import InscricoesCtrl from "../controle/inscricoesCTRL.js";

const inscricaoCtrl = new InscricoesCtrl();
const rotaInscricoes = new Router();

rotaInscricoes
.get('/', inscricaoCtrl.consultar)
.get('/:termo', inscricaoCtrl.consultar)
.post('/', inscricaoCtrl.gravar)
.patch('/', inscricaoCtrl.atualizar)
.put('/', inscricaoCtrl.atualizar)
.delete('/', inscricaoCtrl.excluir);

export default rotaInscricoes;