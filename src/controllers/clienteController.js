import axios from "axios";
import { Cliente } from "../models/Cliente.js";
import { Endereco } from "../models/Endereco.js";
import { Telefone } from "../models/Telefone.js";
import categoriaRepository from "../repositories/categoriaRepository.js";
import clienteRepository from "../repositories/clienteRepository.js";
import { limparNumero } from "../utils/limparNumero.js";

async function buscarCep(cep) {
    try {
        if (!cep || cep.length !== 8) {
            throw new Error("CEP inválido");
        }

        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (resposta.data.erro) {
            throw new Error("CEP não encontrado");
        }

        return resposta.data;
    } catch (error) {

        console.error('Erro ao buscar pelo CEP', error);
        throw new Error("Erro ao buscar o CEP");

    }
}

const clienteController = {
    criar: async (req, res) => {
        try {
            let { nome, cpf, cep, telefone, numero } = req.body;

            cep = limparNumero(cep);
            const endereco = await buscarCep(cep);

            const logradouro = endereco.logradouro;
            const complemento = endereco.complemento ?? null;
            const bairro = endereco.bairro;
            const localidade = endereco.localidade;
            const uf = endereco.uf;
            const estado = endereco.estado;
            const regiao = endereco.regiao;

            cpf = limparNumero(cpf);
            telefone = limparNumero(telefone);

            const cpfUtilizado = await clienteRepository.buscarPorCpf(cpf);

            if (cpfUtilizado.length !== 0) {
                return res.status(400).json({ Message: "O cpf já está cadastrado" })
            }

            const clienteObj = Cliente.criar({ nome, cpf, cep });
            const telefoneObj = Telefone.criar({ telefone });
            const enderecoObj = Endereco.criar({ numero, logradouro, complemento, bairro, localidade, uf, estado, regiao });

            const resultCli = await clienteRepository.criar(clienteObj, telefoneObj, enderecoObj);

            return res.status(201).json({ resultCli });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            let { nome, cpf, cep, telefone, numero } = req.body;

            cep = limparNumero(cep);
            const endereco = await buscarCep(cep);

            const clienteSelecionado = await clienteRepository.selecionarId(id);

            if (clienteSelecionado.length == 0) {
                return res.status(404).json({ message: "Categoria não encontrada" })
            }

            const logradouro = endereco.logradouro;
            const complemento = endereco.complemento ?? null;
            const bairro = endereco.bairro;
            const localidade = endereco.localidade;
            const uf = endereco.uf;
            const estado = endereco.estado;
            const regiao = endereco.regiao;

            cpf = limparNumero(cpf);
            telefone = limparNumero(telefone);

            const clienteObj = Cliente.editar({ nome, cpf, cep }, id);
            const telefoneObj = Telefone.criar({ telefone });
            const enderecoObj = Endereco.criar({ numero, logradouro, complemento, bairro, localidade, uf, estado, regiao });

            const resultCli = await clienteRepository.editar(id, clienteObj, telefoneObj, enderecoObj);

            return res.status(200).json({ resultCli });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            
            const resultCli = await clienteRepository.deletar(id);
            res.status(200).json({ resultCli });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            let resultCli = await clienteRepository.selecionar();
            if(id) {
                resultCli = await clienteRepository.selecionarId(id);
            }
            res.status(200).json({ resultCli });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default clienteController;