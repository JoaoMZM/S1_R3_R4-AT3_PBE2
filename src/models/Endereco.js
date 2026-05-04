export class Endereco {

    //#region Parâmetros e constructor

    #numero;
    #logradouro;
    #complemento;
    #bairro;
    #localidade;
    #uf;
    #estado;
    #regiao;

    constructor(
        pNumero,
        pLogradouro,
        pComplemento,
        pBairro,
        pLocalidade,
        pUf,
        pEstado,
        pRegiao,
    ) {
        this.numero = pNumero; // usa o setter
        this.#logradouro = pLogradouro;
        this.#complemento = pComplemento;
        this.#bairro = pBairro;
        this.#localidade = pLocalidade;
        this.#uf = pUf;
        this.#estado = pEstado;
        this.#regiao = pRegiao;
    }
    //#endregion

    //#region Gets

    get numero() {
        return this.#numero;
    }

    get logradouro() {
        return this.#logradouro;
    }

    get complemento() {
        return this.#complemento;
    }

    get bairro() {
        return this.#bairro;
    }

    get localidade() {
        return this.#localidade;
    }

    get uf() {
        return this.#uf;
    }

    get estado() {
        return this.#estado;
    }

    get regiao() {
        return this.#regiao;
    }
    //#endregion

    //#region Sets
    set numero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }
    //#endregion

    //#region Validação
    #validarNumero(value) {
        if (!value || typeof value !== 'string' || value.trim().length === 0 || value.length > 10) {
            throw new Error('Número inválido');
        }
    }
    //#endregion

    //#region Factory
    static criar(dados) {
        return new Endereco(
            dados.numero,
            dados.logradouro,
            dados.complemento,
            dados.bairro,
            dados.localidade,
            dados.uf,
            dados.estado,
            dados.regiao
        );
    }
    //#endregion
}