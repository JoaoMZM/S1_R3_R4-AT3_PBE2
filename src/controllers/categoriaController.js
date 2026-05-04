import { Categoria } from "../models/Categoria.js";
import categoriaRepository from "../repositories/categoriaRepository.js";

const categoriaController = {
    criar: async (req, res) => {
        try {
            const { nome, descricao } = req.body;
            const categoria = Categoria.criar({nome, descricao});
            const result = await categoriaRepository.criar(categoria);
            res.status(201).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { nome, descricao } = req.body;
            const categoriaSelecionada = await categoriaRepository.selecionarId(id);

            if(categoriaSelecionada.length == 0) {
                return res.status(404).json({message: "Categoria não encontrada"})
            }

            const categoria = Categoria.editar({ nome, descricao }, id);
            console.log(categoria)
            const result = await categoriaRepository.editar(categoria);
            
            return res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const produtoRelacionado = await categoriaRepository.selecionarProduto(id);

            if(produtoRelacionado.length != 0) {
                return res.status(400).json({Message: "Você não pode deletar uma categoria relacionada a um produto, delete o produto primeiro", "Produto relacionados": produtoRelacionado})
            }

            const result = await categoriaRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await categoriaRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default categoriaController;