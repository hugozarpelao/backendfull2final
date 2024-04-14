import CandidatosDAO from "../persistencia/candidatosDAO.js";

export default class Candidatos{
    #can_cpf;
    #can_nome;
    #can_ctps;
    #can_datanasc;
    #can_endereco;
    #can_bairro;
    #can_municipio;
    #can_cep;
    #can_telefone;
    #can_email;
    #can_escolaridade;
    #vaga;
    

    constructor(can_cpf ,can_nome, can_ctps, can_datanasc, can_endereco, can_bairro, can_municipio, can_cep, can_telefone, can_email, can_escolaridade, vaga){
        this.#can_cpf=can_cpf;
        this.#can_nome=can_nome;
        this.#can_ctps=can_ctps;
        this.#can_datanasc=can_datanasc;
        this.#can_endereco=can_endereco;
        this.#can_bairro=can_bairro;
        this.#can_municipio=can_municipio;
        this.#can_cep=can_cep;
        this.#can_telefone=can_telefone;
        this.#can_email=can_email;
        this.#can_escolaridade=can_escolaridade;
        this.#vaga=vaga;
    }

    get can_cpf(){
        return this.#can_cpf;
    }
    set can_cpf(novocan_cpf){
        this.#can_cpf = novocan_cpf;
    }

    get can_nome(){
        return this.#can_nome;
    }

    set can_nome(novaDesc){
        this.#can_nome=novaDesc;
    }

    get can_ctps(){
        return this.#can_ctps;
    }

    set can_ctps(novoPreco){
        this.#can_ctps = novoPreco
    }

    get can_datanasc(){
        return this.#can_datanasc;
    }

    set can_datanasc(novocan_datanasc){
        this.#can_datanasc = novocan_datanasc; 
    }

    get can_endereco(){
        return this.#can_endereco;
    }

    set can_endereco(novoEndereco){
        this.#can_endereco = novoEndereco; 
    }

    get can_bairro(){
        return this.#can_bairro;
    }

    set can_bairro(novoBairro){
        this.#can_bairro = novoBairro; 
    }

    get can_municipio(){
        return this.#can_municipio;
    }

    set can_municipio(novoMunicipio){
        this.#can_municipio = novoMunicipio; 
    }

    get can_cep(){
        return this.#can_cep;
    }

    set can_cep(novoCEP){
        this.#can_cep = novoCEP; 
    }

    get can_telefone(){
        return this.#can_telefone;
    }

    set can_telefone(novoTelefone){
        this.#can_telefone = novoTelefone; 
    }

    get can_email(){
        return this.#can_email;
    }

    set can_email(novoEmail){
        this.#can_email = novoEmail; 
    }

    get can_escolaridade(){
        return this.#can_escolaridade;
    }

    set can_escolaridade(novaEscolaridade){
        this.#can_escolaridade = novaEscolaridade; 
    }

    get vaga(){
        return this.#vaga;
    }

    set vaga(novaVaga){
        this.#vaga = novaVaga; 
    }


    toJSON(){
        return {
            can_cpf:this.#can_cpf,
            can_nome:this.#can_nome,
            can_ctps:this.#can_ctps,
            can_datanasc:this.#can_datanasc,
            can_endereco:this.#can_endereco,
            can_bairro:this.#can_bairro,
            can_municipio:this.#can_municipio,
            can_cep:this.#can_cep,
            can_telefone:this.#can_telefone,
            can_email:this.#can_email,
            can_escolaridade:this.#can_escolaridade,
            vaga:this.#vaga
        }
    }

     async gravar(){
        const canditadoDAO = new CandidatosDAO();
        await canditadoDAO.gravar(this);
     }
 
     async excluir(){
        const canditadoDAO = new CandidatosDAO();
        await canditadoDAO.excluir(this);
     }
 
     async alterar(){
        const canditadoDAO = new CandidatosDAO();
        await canditadoDAO.atualizar(this);
     }
 
     async consultar(termo){
        const canditadoDAO = new CandidatosDAO();
        return await canditadoDAO.consultar(termo);
     }

}