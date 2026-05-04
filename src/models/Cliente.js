import { validarCPF } from "../utils/validarCpf.js";

export class Cliente {

    //#region Parâmetros e constructor

    #id;
    #nome;
    #cpf;
    #cep;

    constructor(pNome,pCpf,pCep,pId)

    {
        this.#nome = pNome;
        this.#cpf = pCpf;
        this.#cep = pCep;
        this.#id = pId;
    }
    //#endregion

    //#region Gets
    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get cep() {
        return this.#cep;
    }

    get id() {
        return this.#id;
    }
    //#endregion

    //#region Sets
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }

    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    }
    //#endregion

    //#region Validações
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde ao esperado');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome deve ter entre 3 e 45 caracteres');
        }
    }

    #validarCpf(value) {
        validarCPF(value);
    }

    #validarCep(value) {
        if (!value || value.trim().length !== 8) {
            throw new Error('CEP inválido');
        }
    }
    //#endregion

    //#region Factory
    static criar(dados) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            dados.cep,
            null  // id auto_increment
        );
    }

    static editar(dados, id) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            dados.cep,
            id
        );
    }
    //#endregion
}