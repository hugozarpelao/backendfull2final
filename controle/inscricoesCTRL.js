import Inscricoes from "../modelo/inscricoes.js";

export default class InscricoesCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const canvag_horario = dados.canvag_horario;
            const candidato = dados.candidato;
            const vaga = dados.vaga;
            if (canvag_horario && candidato && vaga) {
                const inscricao = new Inscricoes(0, canvag_horario, candidato, vaga);
                inscricao.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": inscricao.canvag_codigo,
                        "mensagem": "Inscrição incluída!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a inscrição:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados da inscrição segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma inscrição!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const canvag_codigo = dados.canvag_codigo;
            const canvag_horario = dados.canvag_horario;
            const candidato = dados.candidato;
            const vaga = dados.vaga;
            if (canvag_codigo && canvag_horario && candidato && vaga) {
                const inscricao = new Inscricoes(canvag_codigo, canvag_horario, candidato, vaga);
                inscricao.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição atualizada!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a inscrição:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da inscrição segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma inscrição!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const canvag_codigo = dados.canvag_codigo;
            if (canvag_codigo) {
                const inscricao = new Inscricoes(canvag_codigo);
                inscricao.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição excluída!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a inscrição:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da inscrição!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma inscrição!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const inscricao = new Inscricoes();
            inscricao.consultar(termo).then((listaInscricao) => {
                resposta.json(
                    {
                        status: true,
                        listaInscricao
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter as inscrições: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar inscrições!"
            });
        }
    }
}