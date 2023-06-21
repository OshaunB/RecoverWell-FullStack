const knex = require("../knex");

class JoinEvent {
    
    static async create(userId, eventId){
        try{
            if(JoinEvent.checkUser(userId, eventId)){
                const insertQuery = `
                    INSERT INTO joinEvent (user_id , event_id)
                    VALUES (? , ?)
                    RETURNING *
                `;
                const { rows : insertRows } = await knex.raw(insertQuery , [userId , eventId])
                
                return insertRows
            }else{
                throw new Error("User is already joined")
            }
        }
        catch(error){
            console.error(error)
            throw new Error("Error joining event")
        }
    }

    static async deleteEvent(userId , eventId){
        try{
            const deleteQuery = ` 
            DELETE FROM joinEvent   
            WHERE user_id = ? AND event_id = ?`;
            await knex.raw(deleteQuery , [userId , eventId])
            return "event deleted"
        }
        catch(error){
            console.error(error)
            throw new Error("Error deleting Event")    
        }
    }

    static async list(){
        try{

        }
        catch(error){
            console.error(error)
            throw new Error("Error getting list of events")
        }
    }

    static async listbyUserId(userId){
        try{
            const {rows : Users} = knex.raw(`
            SELECT * 
            FROM joinEvent
            WHERE user_id = ?` , userId)
            return Users
        }
        catch(error){
            console.error(error)
            throw new Error("Error getting list of events")
        }
    }

    static async listbyEventId(eventId){
        try{
            const {rows : Events} = knex.raw(`
            SELECT * 
            FROM joinEvent
            WHERE event_id = ?` , eventId)
            return Events
        }
        catch(error){
            console.error(error)
            throw new Error("Error getting list of members")
        }
    }

    static async checkUser(userId, eventId){
        try{
            const checkQuery = `
            SELECT 1
            FROM joinEvent 
            WHERE user_id = ? AND event_id = ?`;

            const checkSecondQuery = `
            SELECT 1
            FROM events
            WHERE user_id = ? AND id = ?
            `
            const { rows : checkRows } = await knex.raw(checkQuery , [userId , eventId])
            const { rows : checkRows2} = await knex.raw(checkSecondQuery , [userId , eventId])
            
            if (checkRows.length > 0 || checkRows2.length > 0){
                return false
            }else{
                return true
            } //checks if user has already joined event. If they have, dont do anything
              //checks if user trying to join is the host. If they are, dont do anything 
            
        }
        catch(error){
            console.error(error)
            throw new Error("User couldn't be checked")
        }
    }
}

module.exports = JoinEvent

(async () => {
    const join = await JoinEvent.create(1, 2);
    console.log(join);
})();