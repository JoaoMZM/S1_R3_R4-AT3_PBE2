import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {
    criar: async (req, res) => {
        try {
            const { idCategoria, nome, valor } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'Envie o arquivo' });
            }

            const imagePath = `/uploads/images/${req.file.filename}`;

            const produto = Produto.criar({ idCategoria, nome, valor, imagePath });
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { idCategoria, nome, valor } = req.body;

            const produtoAtual = await produtoRepository.selecionarId(id);

            if (produtoAtual.length === 0) {
                return res.status(404).json({message: "Produto não encontrado"})
            }

            const novoIdCategoria = idCategoria ?? produtoAtual[0].IdCategoria;
            const novoNome = nome ?? produtoAtual[0].Nome;
            const novoValor = valor ?? produtoAtual[0].Valor;

            let imagePath = produtoAtual[0].ImagePath;

            if (req.file) {
                imagePath = `/uploads/images/${req.file.filename}`
            }

            const produto = Produto.editar({ novoIdCategoria, novoNome, novoValor, imagePath }, id);
            const result = await produtoRepository.editar(produto, id);

            return res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();
            return res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default produtoController;