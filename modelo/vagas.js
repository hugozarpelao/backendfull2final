import VagasDAO from "../persistencia/vagasDAO.js";

export default class Vagas {
    #vag_codigo;
    #vag_cargo;
    #vag_salario;
    #vag_cidade;
    #vag_quantidade;
    #vag_requisitos;


    constructor(vag_codigo, vag_cargo, vag_salario, vag_cidade, vag_quantidade, vag_requisitos) {
        this.#vag_codigo = vag_codigo;
        this.#vag_cargo = vag_cargo;
        this.#vag_salario = vag_salario;
        this.#vag_cidade = vag_cidade;
        this.#vag_quantidade = vag_quantidade;
        this.#vag_requisitos = vag_requisitos;
    }

    get vag_codigo() {
        return this.#vag_codigo;
    }
    set vag_codigo(novoCodigo) {
        this.#vag_codigo = novoCodigo;
    }

    get vag_cargo() {
        return this.#vag_cargo;
    }

    set vag_cargo(novoHorario) {
        this.#vag_cargo = novoHorario;
    }

    get vag_salario() {
        return this.#vag_salario;
    }

    set vag_salario(novovag_salario) {
        this.#vag_salario = novovag_salario
    }

    get vag_cidade() {
        return this.#vag_cidade;
    }

    set vag_cidade(novavag_cidade) {
        this.#vag_cidade = novavag_cidade;
    }

    get vag_quantidade() {
        return this.#vag_quantidade;
    }

    set vag_quantidade(novaQuantidade) {
        this.#vag_quantidade = novaQuantidade;
    }

    get vag_requisitos() {
        return this.#vag_requisitos;
    }

    set vag_requisitos(novoRequisito) {
        this.#vag_requisitos = novoRequisito;
    }


    toJSON() {
        return {
            vag_codigo: this.#vag_codigo,
            vag_cargo: this.#vag_cargo,
            vag_salario: this.#vag_salario,
            vag_cidade: this.#vag_cidade,
            vag_quantidade : this.#vag_quantidade,
            vag_requisitos: this.#vag_requisitos
        }
    }

    async gravar() {
        const vagaDAO = new VagasDAO();
        await vagaDAO.gravar(this);
    }

    async excluir() {
        const vagaDAO = new VagasDAO();
        await vagaDAO.excluir(this);
    }

    async alterar() {
        const vagaDAO = new VagasDAO();
        await vagaDAO.atualizar(this);
    }

    async consultar(termo) {
        const vagaDAO = new VagasDAO();
        return await vagaDAO.consultar(termo);
    }

}