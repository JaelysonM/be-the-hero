const connection = require("../database/conection");
module.exports = {
  async index (request,response) {
    const {page = 1} = request.query;
    const [count] = await connection("incidents").count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(
        [
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

     response.header('X-Total-Count', count['count(*)']);
     return response.json(incidents);
   },
  async create (request,response) {

    const {title, description,value} =request.body;
    const ong_id = request.headers.authorization;
    const ong = await connection("ongs").where("id",ong_id).select("name").first();
    if (ong) {
      const [id] =await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
      });
      return response.json({
        id
      });
    }else {
      return response.status(400).json({
        error: 'No ong find with this id.'
      })
    }
   
  },

  async delete (request,response) {

    const {id} = request.params;
    const ong_id = request.headers.authorization;
   try {
    const incident= await connection('incidents').where('id',id).select("ong_id").first();
     if (incident.ong_id != ong_id) {
      return response.status(401).json({
        error: "Operation not permited"
      });
     }
      await connection('incidents').where('id',id).delete();
      return response.status(204).send();
    
   }catch (err) {
     console.log(err);
    return response.status(404).send({
      error: 'No incident find with this id.'
    });
   }
   

  
   
   }
}
