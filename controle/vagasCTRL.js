import Vagas from "../modelo/vagas.js";

export default class VagasCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const vag_cargo = dados.vag_cargo;
            const vag_salario = dados.vag_salario;
            const vag_cidade = dados.vag_cidade;
            const vag_quantidade = dados.vag_quantidade;
            const vag_requisitos = dados.vag_requisitos;
            if (vag_cargo && vag_salario && vag_cidade && vag_quantidade && vag_requisitos) {
                const vaga = new Vagas(0, vag_cargo, vag_salario, vag_cidade, vag_quantidade, vag_requisitos);
                vaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": vaga.vag_codigo,
                        "mensagem": "Vaga incluída!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados da vaga segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar a vaga!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const vag_codigo = dados.vag_codigo;
            const vag_cargo = dados.vag_cargo;
            const vag_salario = dados.vag_salario;
            const vag_cidade = dados.vag_cidade;
            const vag_quantidade = dados.vag_quantidade;
            const vag_requisitos = dados.vag_requisitos;
            if (vag_codigo && vag_cargo && vag_salario && vag_cidade && vag_quantidade && vag_requisitos) {
                const vaga = new Vagas(vag_codigo, vag_cargo, vag_salario, vag_cidade, vag_quantidade, vag_requisitos);
                vaga.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga atualizada!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da vaga segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar a vaga!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const vag_codigo = dados.vag_codigo;
            if (vag_codigo) {
                const vaga = new Vagas(vag_codigo);
                vaga.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga excluída!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da vaga!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir a vaga!"
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
            const vaga = new Vagas();
            vaga.consultar(termo).then((listaVagas) => {
                resposta.json(
                    {
                        status: true,
                        listaVagas
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter as vagas: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar vagas!"
            });
        }
    }
}