export class Telefone {
    #id;
    #telefone;

    constructor(pTelefone, pId) {
        this.#telefone = pTelefone;
        this.#id = pId;
    }

    // GETTERS
    get telefone() {
        return this.#telefone;
    }

    get id() {
        return this.#id;
    }

    // SETTERS
    set telefone(value) {
        this.#validarTelefone(value);
        this.#telefone = value;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    // VALIDAÇÕES
    #validarTelefone(value) {
        if (!value || value.trim().length < 8 || value.trim().length > 20) {
            throw new Error('O telefone deve ter entre 8 e 20 caracteres');
        }
    }

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde ao esperado');
        }
    }

    // FACTORY
    static criar(dados) {
        return new Telefone(
            dados.telefone,
            null,
        );
    }

    static editar(dados, id) {
        return new Telefone(
            dados.telefone,
            id
        );
    }
}