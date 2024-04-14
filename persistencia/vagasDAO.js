import Vagas from '../modelo/vagas.js';
import conectar from './conexao.js';

export default class VagasDAO {

    async gravar(vaga) {
        if (vaga instanceof Vagas) {
            const sql = `INSERT INTO vaga(vag_cargo, vag_salario, vag_cidade, vag_quantidade, vag_requisitos) VALUES(?,?,?,?,?)`;
            const parametros = [vaga.vag_cargo, vaga.vag_salario, vaga.vag_cidade, vaga.vag_quantidade, vaga.vag_requisitos];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(vaga) {
        if (vaga instanceof Vagas) {
            const sql = `UPDATE vaga SET vag_cargo=?, vag_salario=?, vag_cidade=?, vag_quantidade=?, vag_requisitos=? WHERE vag_codigo=?`;
            const parametros = [vaga.vag_cargo, vaga.vag_salario, vaga.vag_cidade, vaga.vag_quantidade, vaga.vag_requisitos, vaga.vag_codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(vaga) {
        if (vaga instanceof Vagas) {
            const sql = `DELETE FROM vaga WHERE vag_codigo=?`;
            const parametros = [vaga.vag_codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        if (!isNaN(parseInt(parametroConsulta))){
            sql='SELECT * FROM vaga WHERE vag_codigo=?';
            parametros = [parametroConsulta];
        }
        else{
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM vaga WHERE vag_cargo like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaVagas = [];
        for (const registro of registros){
            const vaga = new Vagas(registro.vag_codigo, registro.vag_cargo, registro.vag_salario, registro.vag_cidade, registro.vag_quantidade, registro.vag_requisitos);
            listaVagas.push(vaga);
        }
        return listaVagas;
    }
}