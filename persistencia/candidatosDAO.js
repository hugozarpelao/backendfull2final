import Candidatos from '../modelo/candidatos.js';
import Inscricoes from '../modelo/inscricoes.js';
import Vagas from '../modelo/vagas.js';
import conectar from './conexao.js';

export default class CandidatosDAO {

    async gravar(candidato) {
        if (candidato instanceof Candidatos) {
            let dataAtual = new Date();
            const sql = `INSERT INTO candidatos(can_cpf, can_nome, can_ctps, can_datanasc, can_endereco, can_bairro, can_municipio, can_cep, can_telefone, can_email, can_escolaridade) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
            const parametros = [candidato.can_cpf, candidato.can_nome, candidato.can_ctps, candidato.can_datanasc, candidato.can_endereco, candidato.can_bairro, candidato.can_municipio, candidato.can_cep, candidato.can_telefone, candidato.can_email, candidato.can_escolaridade];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            const sql2 = 'INSERT INTO candidato_vaga(canvag_horario, canvag_can_cpf, canvag_vag_codigo) VALUES(?,?,?)'
            for (const inscricao of candidato.vaga) {
                const parametro2 = [dataAtual, candidato.can_cpf, inscricao.vag_codigo]
                await conexao.execute(sql2, parametro2);
            }
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(candidato) {
        if (candidato instanceof Candidatos) {
            const sql = `UPDATE candidatos SET can_nome=?, can_ctps=?, can_datanasc=?, can_endereco=?, can_bairro=?, can_municipio=?, can_cep=?, can_telefone=?, can_email=?, can_escolaridade=? WHERE can_cpf=?`;
            const parametros = [candidato.can_nome, candidato.can_ctps, candidato.can_datanasc, candidato.can_endereco, candidato.can_bairro, candidato.can_municipio, candidato.can_cep, candidato.can_telefone, candidato.can_email, candidato.can_escolaridade, candidato.can_cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidatos) {
            const sql = `DELETE FROM candidatos WHERE can_cpf=?`;
            const parametros = [candidato.can_cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM candidatos c \
                    INNER JOIN candidato_vaga cv ON c.can_cpf = cv.canvag_can_cpf\
                    INNER JOIN vaga v ON cv.canvag_vag_codigo = v.vag_codigo;';
            parametros = [parametroConsulta];
        }
        else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM candidatos c\
                    INNER JOIN candidato_vaga cv ON c.can_cpf = cv.canvag_can_cpf\
                    INNER JOIN vaga v ON cv.canvag_vag_codigo = v.vag_codigo\
                    WHERE can_nome LIKE ?;";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [rows] = await conexao.execute(sql, parametros);
        const listaCandidatos = []
        let candidatoAtual = null;
        for (const row of rows) {
            if (!candidatoAtual || candidatoAtual.can_cpf !== row['can_cpf']) {
                const candidato = new Candidatos(row['can_cpf'], row['can_nome'], row['can_ctps'], row['can_datanasc'], row['can_endereco'], row['can_bairro'], row['can_municipio'], row['can_cep'], row['can_telefone'], row['can_email'], row['can_escolaridade'], []);
                listaCandidatos.push(candidato);
                candidatoAtual = candidato;
            }
            const vaga = new Vagas(row['vag_codigo'], row['vag_cargo'], row['vag_salario'], row['vag_cidade'], row['vag_quantidade'], row['vag_requisitos']);
            const inscricao = new Inscricoes(row['canvag_codigo'], row['canvag_horario'], row['canvag_can_cpf'], vaga);
            candidatoAtual.vaga.push(inscricao);
        }
        return listaCandidatos;
    }
}