let getUserRooms = (rooms)=>{
    let avRooms = [];
    for(let key in rooms){
        let sockets = rooms[key].sockets;
        let noRoom = false;
        for (let u in sockets){
            if(u===key){
                //NO actual room
                noRoom = true;
            }
        }
        if(!noRoom){
            avRooms.push(key);
        }
    }
    return avRooms;
};

module.exports = {getUserRooms};