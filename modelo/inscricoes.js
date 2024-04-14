import InscricoesDAO from "../persistencia/inscricoesDAO.js";

export default class Inscricoes {
    #canvag_codigo;
    #canvag_horario;
    #candidato;
    #vaga;


    constructor(canvag_codigo, canvag_horario, candidato, vaga) {
        this.#canvag_codigo = canvag_codigo;
        this.#canvag_horario = canvag_horario;
        this.#candidato = candidato;
        this.#vaga = vaga;
    }

    get canvag_codigo() {
        return this.#canvag_codigo;
    }
    set canvag_codigo(novoCodigo) {
        this.#canvag_codigo = novoCodigo;
    }

    get canvag_horario() {
        return this.#canvag_horario;
    }

    set canvag_horario(novoHorario) {
        this.#canvag_horario = novoHorario;
    }

    get candidato() {
        return this.#candidato;
    }

    set candidato(novoCandidato) {
        this.#candidato = novoCandidato
    }

    get vaga() {
        return this.#vaga;
    }

    set vaga(novaVaga) {
        this.#vaga = novaVaga;
    }


    toJSON() {
        return {
            canvag_codigo: this.#canvag_codigo,
            canvag_horario: this.#canvag_horario,
            candidato: this.#candidato,
            vaga: this.#vaga
        }
    }

    async gravar() {
        const inscricaoDAO = new InscricoesDAO();
        await inscricaoDAO.gravar(this);
    }

    async excluir() {
        const inscricaoDAO = new InscricoesDAO();
        await inscricaoDAO.excluir(this);
    }

    async alterar() {
        const inscricaoDAO = new InscricoesDAO();
        await inscricaoDAO.atualizar(this);
    }

    async consultar(termo) {
        const inscricaoDAO = new InscricoesDAO();
        return await inscricaoDAO.consultar(termo);
    }

}