let isRealString = (str)=>{
  return typeof str === "string" && str.trim().length >0;
};

let checkUniqueName = (name, room)=>{
  if(!room){
    return false;
  }
  return room.includes(name);
};

module.exports = {isRealString, checkUniqueName};