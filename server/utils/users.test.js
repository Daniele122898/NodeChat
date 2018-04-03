const expect = require("expect");

const {Users} = require("./users");


describe("Users",()=>{
    let users;
    beforeEach(()=>{
        users = new Users();
        users.users= [{
            id: "1",
            name: "Mike",
            room: "Node"
        },{
            id: "2",
            name: "Jen",
            room: "React"
        },{
            id: "3",
            name: "Michael",
            room: "Node"
        }]
    });

    it('should add new user', function () {
        let users = new Users();
        let user = {
            id: "123",
            name: "Dani",
            room: "TestRoom"
        };
        let resp = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names of Node', function () {
        let userList = users.getUserList('Node');
        expect(userList).toEqual(["Mike", "Michael"]);
    });

    it('should return names of React', function () {
        let userList = users.getUserList('React');
        expect(userList).toEqual(["Jen"]);
    });

    it('should return user with id 2', function () {
        let user = users.getUser("2");
        expect(user).toEqual({
            id: "2",
            name: "Jen",
            room: "React"
        });
    });

    it('should not return any users', function () {
        let user = users.getUser("4");
        expect(user).toNotExist();
    });

    it('should remove user with id 1', function () {
        let user = users.removeUser("1");
        expect(user.id).toBe("1");
        expect(users.users.length).toBe(2);
    });

    it('should NOT remove user with id 4', function () {
        let user = users.removeUser("4");
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
});