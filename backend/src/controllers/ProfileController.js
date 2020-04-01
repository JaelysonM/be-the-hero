const conection = require("../database/conection");

module.exports= {
  async index(request,response) {
    const ong_id = request.headers.authorization;
    const ong = await conection("ongs").where("id",ong_id).select("name").first();
    if (ong) {
      const incidents = await conection('incidents').where("ong_id",ong_id).select("*");
      return response.json(incidents);
    }else {
      return response.status(400).json({
        error: 'No ong find with this id.'
      })
    }
 
  },
}
