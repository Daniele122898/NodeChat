const moment = require("moment");
const escape = require("escape-html");
const emojione = require("emojione");

let generateMessage = (from, text)=>{
    let escaped = escape(text);
    let emojify = emojione.toImage(escaped);

    return {
      from,
      text: emojify,
      createdAt: moment().valueOf()
    }
};

let generateLocationMessage = (from, latitude, longitude)=>{
    return{
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
      createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};