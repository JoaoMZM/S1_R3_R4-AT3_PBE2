import { db } from "../configs/database.js";

const clienteRepository = {
    criar: async (cliente, telefone, endereco) => {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCli = 'INSERT INTO clientes (Nome, Cpf, Cep) VALUES (?, ?, ?);';
            const valuesCli = [cliente.nome, cliente.cpf, cliente.cep];
            const [rowsCli] = await conn.execute(sqlCli, valuesCli);

            const idCliente = rowsCli.insertId;

            const sqlTel = 'INSERT INTO telefones (Telefone, IdCliente) VALUES (?, ?);';
            const valuesTel = [telefone.telefone, idCliente];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);

            const sqlEnd = 'INSERT INTO enderecos (IdCliente, numero, logradouro, complemento, bairro, localidade, uf, estado, regiao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
            const valuesEnd = [idCliente, endereco.numero, endereco.logradouro, endereco.complemento, endereco.bairro, endereco.localidade, endereco.uf, endereco.estado, endereco.regiao];
            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);


            await conn.commit();
            return { rowsCli, rowsTel, rowsEnd };
        } catch (error) {
            await conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release();
        }
    },

    editar: async (idCliente, cliente, telefone, endereco) => {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCli = 'UPDATE clientes SET Nome = ?, Cpf = ?, Cep = ? WHERE Id = ?;';
            const valuesCli = [cliente.nome, cliente.cpf, cliente.cep, idCliente];
            const [rowsCli] = await conn.execute(sqlCli, valuesCli);

            const sqlTel = 'UPDATE telefones SET Telefone = ? WHERE IdCliente = ?;';
            const valuesTel = [telefone.telefone, idCliente];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);

            const sqlEnd = 'UPDATE enderecos SET numero = ?, logradouro = ?, complemento = ?, bairro = ?, localidade = ?, uf = ?, estado = ?, regiao = ? WHERE IdCliente = ?;';
            const valuesEnd = [endereco.numero, endereco.logradouro, endereco.complemento, endereco.bairro, endereco.localidade, endereco.uf, endereco.estado, endereco.regiao, idCliente];
            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);

            await conn.commit();
            return { rowsCli, rowsTel, rowsEnd };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    buscarPorCpf: async (cpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf = ?;';
        const value = cpf;
        const [rows] = await db.execute(sql, [value]);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT clientes.Id, clientes.Nome, clientes.Cpf, clientes.Cep, clientes.DataCad, telefones.Telefone, enderecos.numero, enderecos.logradouro, enderecos.complemento, enderecos.bairro, enderecos.localidade, enderecos.uf, enderecos.estado, enderecos.regiao FROM clientes LEFT JOIN telefones ON telefones.IdCliente = clientes.Id LEFT JOIN enderecos ON enderecos.IdCliente = clientes.Id;';
        const [rows] = await db.execute(sql);
        return rows;
    },

    deletar: async (idCliente) => {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const sqlTel = 'DELETE FROM telefones WHERE IdCliente = ?;';
            const [rowsTel] = await conn.execute(sqlTel, [idCliente]);

            const sqlEnd = 'DELETE FROM enderecos WHERE IdCliente = ?;';
            const [rowsEnd] = await conn.execute(sqlEnd, [idCliente]);

            const sqlCli = 'DELETE FROM clientes WHERE Id = ?;';
            const [rowsCli] = await conn.execute(sqlCli, [idCliente]);

            await conn.commit();

            return { rowsCli, rowsTel, rowsEnd };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionarId: async (id) => {
        const sql = 'SELECT clientes.Id, clientes.Nome, clientes.Cpf, clientes.Cep, clientes.DataCad, telefones.Telefone, enderecos.numero, enderecos.logradouro, enderecos.complemento, enderecos.bairro, enderecos.localidade, enderecos.uf, enderecos.estado, enderecos.regiao FROM clientes LEFT JOIN telefones ON telefones.IdCliente = clientes.Id LEFT JOIN enderecos ON enderecos.IdCliente = clientes.Id WHERE clientes.Id = ?;';
        const [rows] = await db.execute(sql, [id]);
        return rows;
    }
};

export default clienteRepository;