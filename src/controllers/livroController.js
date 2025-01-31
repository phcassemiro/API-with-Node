import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js"

class LivroController {

    static async listarLivros (req,res,next){

        try {

            const {limite = 5,pagina = 1} = req.query;

            const listaLivros = await livro.find({}).skip(( pagina - 1 ) * limite).limit(limite);
            res.status(200).json(listaLivros);
        } catch (error) {

            next(error);

        }

    };

    static async listarLivroPorId (req,res,next){

        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {

            next(error);

        }

    };

    static async cadastrarLivro(req,res,next){
        const novoLivro = req.body;

        try {

            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado });

        } catch (error) {

            next(error);
        }
    }

    static async atualizarLivro (req,res, next){

        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "livro atualizado"});
        } catch (error) {

            next(error);

        }

    };

    static async excluirLivro (req,res, next){

        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "livro excluido"});
        } catch (error) {

            next(error);

        }

    };

    static async listarLivroPorEditora(req,res, next){

        try {
            const editora = req.query.editora;
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (error) {

            next(error);

        }
    };

    static async listarLivroPorFiltro(req,res, next){

        try {
            const { editora, titulo } = req.query;
            // const regex = new RegExp(titulo, "i");
            const busca = {};

            if(editora) busca.editora = /editora/i;
            if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

            const livrosResultado = await livro.find(busca);
            res.status(200).json(livrosResultado);
        } catch (error) {

            next(error);

        }
    };



}

export default LivroController;