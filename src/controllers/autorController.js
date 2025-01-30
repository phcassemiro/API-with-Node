import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores (req,res){

        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (error) {

            res.status(500).json({message: `${error.message} - falha na requisição`})

        }

    };

    static async listarAutorPorId (req,res,next){

        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            if(autorEncontrado !== null){

                res.status(200).json(autorEncontrado);
            }else{
                res.status(404).json({message: 'Id do autor não localizado'})
            }
        } catch (error) {

            next(error);
        }

    };

    static async cadastrarAutor(req,res, next){
        try {

            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "criado com sucesso", autor: novoAutor });

        } catch (error) {
            next(error);
        }
    }

    static async atualizarAutor (req,res, next){

        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "autor atualizado"});
        } catch (error) {

            next(error);

        }

    };

    static async excluirAutor (req,res, next){

        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "autor excluido"});
        } catch (error) {

            next(error);

        }

    };


}

export default AutorController;