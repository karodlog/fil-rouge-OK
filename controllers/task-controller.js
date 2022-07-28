const Task = require("../models/task-model");

const taskController = {
    //tous les getter
    getAll: async (req, res)=>{
        //pour récupérer le offset et la limit passés dans la requête
        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit: 10;

        //pour la possible query avec le status
        let statusFilter;
        const status = req.query.status;
        if(status){
            // si notre status est un tableau (contient plusieurs status à évaluer)
            if(Array.isArray(status)){
                //puisqu'on a un tab, on va regarder si le status de chaque requête a une valeur comprise ds le tab fourni
                    statusFilter = { status: {$in: status}}
                }
                else{
                    statusFilter = { status:status }
                }            
    }
    else{
        statusFilter = {}
    }
        
        const tasks = await Task.find(statusFilter)
            .populate({
                path: 'categoryId',
                select: {name: 1, icon:1}
            })
            .populate({
                path: 'receiverUserId',
                select:{firstname: 1, lastname: 1, pseudo:1}
            })
            .populate({
                path: 'senderUserId',
                select:{firstname: 1, lastname: 1, pseudo:1}
            }).limit(limit).skip(offset);
            const count = await Task.countDocuments();
            const data = {'tasks': tasks, count: count}

        res.status(200).json(data);
        
    },
    getById: async (req, res)=>{
        const id = req.params.id;
        const task = await Task.findById(id)

            .populate({
                path: 'categoryId',
                select: {name: 1, icon:1}
            })
            .populate({
                path: 'receiverUserId',
                select:{firstname: 1, lastname: 1, pseudo:1}
            })
            .populate({
                path: 'senderUserId',
                select:{firstname: 1, lastname: 1, pseudo:1}
            });
        if(!task){
            return res.sendStatus(404);
        }

        res.status(200).json(task);
        
    },
    getByCategory: async (req, res)=>{
        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit: 10;

        //filtre pour le status
        let statusFilter;
        const status = req.query.status;
        if(status){
            // si notre status est un tableau (contient plusieurs status à évaluer)
            if(Array.isArray(status)){
                //puisqu'on a un tab, on va regarder si le status de chaque requête a une valeur comprise ds le tab fourni
                    statusFilter = { status: {$in: status}}
                }
                else{
                    statusFilter = { status:status }
                }            
    }
    else{
        statusFilter = {}
    }

        //on récupère l'id de la route qui contient l'id de notre catégorie
        const idCat = req.params.id;
        //on veut les tâches dont les champs categoryId est égal à l'id passé en paramètre
        const categoryFilter = {categoryId: idCat}
        const tasks = await Task.find({$and: [categoryFilter, statusFilter]})
        .populate({
            path: 'categoryId',
            select: {name: 1, icon:1}
        })
        .populate({
            path: 'receiverUserId',
            select:{firstname: 1, lastname: 1, pseudo:1}
        })
        .populate({
            path: 'senderUserId',
            select:{firstname: 1, lastname: 1, pseudo:1}
        }).limit(limit).skip(offset);
        const count = await Task.countDocuments(categoryFilter);
        const data = {'tasks': tasks, count: count};

    res.status(200).json(data);
    
},
    getByUser: async (req, res)=>{
        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit: 10;

        //filtre pour le status

        let statusFilter;
        const status = req.query.status;
        if(status){
            // si notre status est un tableau (contient plusieurs status à évaluer)
            if(Array.isArray(status)){
                //puisqu'on a un tab, on va regarder si le status de chaque requête a une valeur comprise ds le tab fourni
                    statusFilter = { status: {$in: status}}
                }
                else{
                    statusFilter = { status:status }
                }            
    }
    else{
        statusFilter = {}
    }

        //on récupère l'id de la route qui contient l'id de notre catégorie
        const idReceiver = req.params.id;
        //on veut les tâches dont les champs receiverUserId est égal à l'id passé en paramètre
        const receiverFilter = {receiverUserId: idReceiver}
        const tasks = await Task.find({$and: [receiverFilter, statusFilter]})
        .populate({
            path: 'categoryId',
            select: {name: 1, icon:1}
        })
        .populate({
            path: 'receiverUserId',
            select:{firstname: 1, lastname: 1, pseudo:1}
        })
        .populate({
            path: 'senderUserId',
            select:{firstname: 1, lastname: 1, pseudo:1}
        }).limit(limit).skip(offset);
        const count = await Task.countDocuments(receiverFilter);
        const data = {'tasks': tasks, count: count};

    res.status(200).json(data);
    
},
    
    //creation
    create: async (req, res)=>{
        const taskToAdd = Task(req.body);
        await taskToAdd.save();
        res.status(200).json(taskToAdd);
    },
    //modif
    update: async(req, res)=>{
        const id = req.params.id;
        const {name, description, categoryId, receiverUserId, status, expectedEndingDate } = req.body;
        const taskUpdated = await Task.findByIdAndUpdate(id, {
            name,
            categoryId,
            receiverUserId,
            status,
            description: description ? description : null,
            expectedEndingDate: expectedEndingDate ? expectedEndingDate : null,
        }, {returnDocument: 'after'})
        if(!taskUpdated){
            return res.sendStatus(404);
        }
        res.sendStatus(204);
    },
    
    //suppression
    delete: async (req, res)=>{
        const id = req.params.id;
        const taskToDelete = await Task.findByIdAndDelete(id);
        if(!taskToDelete){
            return res.sendStatus(404)
        }
        res.sendStatus(204);

    },
}

module.exports = taskController;