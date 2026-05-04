import { db } from "../configs/database.js";

const produtoRepository = {
    criar:async (produto) =>{
        const sql = 'INSERT INTO produtos (IdCategoria, Nome, Valor, ImagePath) VALUES (?, ?, ?, ?);';
        const values = [produto.idCategoria, produto.nome, produto.valor, produto.imagePath];
        const [rows] = await db.execute(sql, values);
        return rows;
    },
    editar:async (produto, id) =>{
        const sql = 'UPDATE produtos SET IdCategoria = ?, Nome = ?, Valor = ?, ImagePath = ?  WHERE Id = ?';
        const values = [produto.idCategoria, produto.nome, produto.valor, produto.imagePath, id];
        const [rows] = await db.execute(sql, values);
        return rows;
    },
    selecionar: async() => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await db.execute(sql);
        return rows;
    },
    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE id = ?;';
        const values = [id];
        const [rows] = await db.execute(sql, values);
        return rows;
    },
    selecionarId: async(id) => {
        const sql = 'SELECT * FROM produtos WHERE Id = ?;';
        const [rows] = await db.execute(sql, [id]);
        return rows;
    },
}

export default produtoRepository;