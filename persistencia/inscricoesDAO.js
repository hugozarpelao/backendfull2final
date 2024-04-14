import Inscricoes from '../modelo/inscricoes.js';
import Candidatos from '../modelo/candidatos.js';
import Vagas from '../modelo/vagas.js';
import conectar from './conexao.js';

export default class InscricoesDAO {

    async gravar(inscricao) {
        if (inscricao instanceof Inscricoes) {
            const sql = `INSERT INTO candidato_vaga(canvag_horario, canvag_can_cpf, canvag_vag_codigo) VALUES(?,?,?)`;
            const parametros = [inscricao.canvag_horario, inscricao.candidato, inscricao.vaga];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            inscricao.canvag_codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(inscricao) {
        if (inscricao instanceof Inscricoes) {
            const sql = `UPDATE candidato_vaga SET canvag_horario=?, canvag_can_cpf=?, canvag_vag_codigo=? WHERE canvag_codigo=?`;
            const parametros = [inscricao.canvag_horario, inscricao.candidato, inscricao.vaga, inscricao.canvag_codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(inscricao) {
        if (inscricao instanceof Inscricoes) {
            const sql = `DELETE FROM candidato_vaga WHERE canvag_codigo=?`;
            const parametros = [inscricao.canvag_codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        if (!isNaN(parseInt(parametroConsulta))){
            sql='SELECT * FROM candidato_vaga cv \
                    INNER JOIN candidatos c ON cv.canvag_can_cpf = c.can_cpf \
                    INNER JOIN vaga v ON cv.canvag_vag_codigo = v.vag_codigo \
                    WHERE canvag_can_cpf = ?';
            parametros = [parametroConsulta];
        }
        else{
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM candidato_vaga cv \
                    INNER JOIN candidatos c ON cv.canvag_can_cpf = c.can_cpf \
                    INNER JOIN vaga v ON cv.canvag_vag_codigo = v.vag_codigo \
                    WHERE canvag_can_cpf = ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaIncricoes = [];
        for (const registro of registros){
            const candidato = new Candidatos(registro.can_cpf, registro.can_nome, registro.can_ctps, registro.can_datanasc, registro.can_endereco, registro.can_bairro, registro.can_municipio, registro.can_cep, registro.can_telefone, registro.can_email, registro.can_escolaridade);
            const vaga = new Vagas(registro.vag_codigo, registro.vag_cargo, registro.vag_salario, registro.vag_cidade, registro.vag_quantidade, registro.vag_requisitos);
            const inscricao = new Inscricoes(registro.canvag_codigo, registro.canvag_horario, candidato, vaga);
            listaIncricoes.push(inscricao);
        }
        return listaIncricoes;
    }
}