const expect = require("expect");

const {generateMessage} = require("./message");

describe("generateMessage", ()=>{
    it("should generate correct message", ()=>{
       const from = "Admin";
       const text = "This is a Message from Admin";
       const res = generateMessage(from, text);

       expect(res.createdAt).toBeA("number");
       expect(res).toInclude({from,text});
    });
});