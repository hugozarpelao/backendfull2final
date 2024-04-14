import { Router } from "express";
import CandidatosCtrl from "../controle/candidatosCTRL.js";

const candidatoCtrl = new CandidatosCtrl();
const rotaCandidatos = new Router();

rotaCandidatos
.get('/', candidatoCtrl.consultar)
.get('/:termo', candidatoCtrl.consultar)
.post('/', candidatoCtrl.gravar)
.patch('/', candidatoCtrl.atualizar)
.put('/', candidatoCtrl.atualizar)
.delete('/', candidatoCtrl.excluir);

export default rotaCandidatos;