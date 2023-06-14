const knex = require('../knex');

class Post{
    static async list() {
        try {
          const query = "SELECT * FROM posts";
          const { rows } = await knex.raw(query);
          return rows;
        } catch (error) {
          console.error(error);
          throw new Error("Error listing posts");
        }
      }
    
    static async listbyDiscussionId(id) {
        try {
          const query = "SELECT * FROM posts WHERE discussionId = ?";
          const { 
            rows: [post] 
          } = await knex.raw(query , [id]);
          return rows;
        } catch (error) {
          console.error(error);
          throw new Error("Error listing posts");
        }
    }
    static async findById(id) {
    try {
      const query = "SELECT * FROM posts WHERE id = ?";
      const {
        rows: [post],
      } = await knex.raw(query, [id]);
      return post || null;
    } catch (error) {
      console.error(error);
      throw new Error(`Error finding post with id ${id}`);
    }
  }
  static async likePostById(id){
    try{
        
    }catch(error){
        console.error(error);
        throw new Error(`Error finding post with id ${id}`);
    }
  }

}
module.exports = Post