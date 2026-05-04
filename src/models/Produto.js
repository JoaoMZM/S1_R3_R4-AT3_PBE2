    export class Produto {
        #id;
        #idCategoria;
        #nome;
        #valor;
        #imagePath;

        constructor(pIdCategoria, pNome, pValor, pImagePath, pId) {
            this.#idCategoria = pIdCategoria;
            this.#nome = pNome;
            this.#valor = pValor;
            this.#imagePath = pImagePath;
            this.#id = pId;
        }

        get idCategoria() {
            return this.#idCategoria;
        }
        get nome() {
            return this.#nome;
        }
        get valor() {
            return this.#valor;
        }
        get imagePath() {
            return this.#imagePath;
        }
        get id() {
            return this.#id;
        }

        set idCategoria(value) {
            this.#validarIdCategoria(value);
            this.#idCategoria = value;
        }
        set nome(value) {
            this.#validarNome(value);
            this.#nome = value;
        }
        set valor(value) {
            this.#validarValor(value);
            this.#valor = value;
        }
        set imagePath(value) {
            this.#validarImagePath(value);
            this.#imagePath = value;
        }
        set id(value) {
            this.#validarId(value);
            this.#id = value;
        }

        #validarIdCategoria(value) {
            if (value && value <= 0) {
                throw new Error('O valor do ID não corresponde ao esperado');
            }
        }
        #validarNome(value) {
            if (!value || value.trim().length < 3 || value.trim().length > 45) {
                throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
            }
        }
        #validarValor(value) {
            if (!value || value <= 0) {
                throw new Error('O valor do item precisa ser maior que 0');
            }
        }
        #validarId(value) {
            if (value && value <= 0) {
                throw new Error('O valor do ID não corresponde ao esperado');
            }
        }
        #validarImagePath(value) {
            if (!value) {
                throw new Error('Insira uma imagem');
            }
        }

        // Design pattern: Factory
        static criar(dados) {
            return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.imagePath, null);
        }

        static editar(dados, id) {
            return new Produto(dados.novoIdCategoria, dados.novoNome, dados.novoValor, dados.imagePath, id);
        }
    }