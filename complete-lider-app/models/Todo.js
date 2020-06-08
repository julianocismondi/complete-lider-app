const { Schema, model} = require ('mongoose');

const TodoScheam = new Schema({
    name: {type: String, required:true}
});

module.exports = model('Todo', TodoScheam);
