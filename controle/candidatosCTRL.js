import Candidatos from "../modelo/candidatos.js";

export default class CandidatosCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const can_cpf = dados.can_cpf;
            const can_nome = dados.can_nome;
            const can_ctps = dados.can_ctps;
            const can_datanasc = dados.can_datanasc;
            const can_endereco = dados.can_endereco;
            const can_bairro = dados.can_bairro;
            const can_municipio = dados.can_municipio;
            const can_cep = dados.can_cep;
            const can_telefone = dados.can_telefone;
            const can_email = dados.can_email;
            const can_escolaridade = dados.can_escolaridade;
            const vaga = dados.vaga;
            if (can_cpf && can_nome && can_ctps && can_datanasc && can_endereco && can_bairro && can_municipio && can_cep && can_telefone && can_email && can_escolaridade, vaga) {
                const candidato = new Candidatos(can_cpf, can_nome, can_ctps, can_datanasc, can_endereco, can_bairro, can_municipio, can_cep, can_telefone, can_email, can_escolaridade, vaga);
                candidato.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato cadastrado!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do candidato segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar o candidato!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const can_cpf = dados.can_cpf;
            const can_nome = dados.can_nome;
            const can_ctps = dados.can_ctps;
            const can_datanasc = dados.can_datanasc;
            const can_endereco = dados.can_endereco;
            const can_bairro = dados.can_bairro;
            const can_municipio = dados.can_municipio;
            const can_cep = dados.can_cep;
            const can_telefone = dados.can_telefone;
            const can_email = dados.can_email;
            const can_escolaridade = dados.can_escolaridade;
            if (can_cpf && can_nome && can_ctps && can_datanasc && can_endereco && can_bairro && can_municipio && can_cep && can_telefone && can_email && can_escolaridade) {
                const candidato = new Candidatos(can_cpf, can_nome, can_ctps, can_datanasc, can_endereco, can_bairro, can_municipio, can_cep, can_telefone, can_email, can_escolaridade);
                candidato.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato atualizado!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do candidato segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um candidato!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const can_cpf = dados.can_cpf;
            if (can_cpf) {
                const candidato = new Candidatos(can_cpf);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato excluído!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CPF do candidato!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir o candidato!"
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
            const candidato = new Candidatos();
            candidato.consultar(termo).then((listaCandidatos) => {
                resposta.json(
                    {
                        status: true,
                        listaCandidatos
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os candidatos: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar candidatos!"
            });
        }
    }
}