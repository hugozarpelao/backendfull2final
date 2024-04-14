import { Router } from "express";
import VagasCtrl from "../controle/vagasCTRL.js";

const vagaCtrl = new VagasCtrl();
const rotaVagas = new Router();

rotaVagas
.get('/', vagaCtrl.consultar)
.get('/:termo', vagaCtrl.consultar)
.post('/', vagaCtrl.gravar)
.patch('/', vagaCtrl.atualizar)
.put('/', vagaCtrl.atualizar)
.delete('/', vagaCtrl.excluir);

export default rotaVagas;