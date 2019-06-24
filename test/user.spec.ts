import { User } from "../src/user"

describe('User', () => {
    it("should be created", () => {
        const user1 = new User(4, 'John', 'Doe', 'Joe', 'male', 'https://www.google.com');
        const user2 = new User(5, 'Jane', 'Dae', 'Don', 'female', 'https://www.facebook.com');
        expect(user1).toBeTruthy();
        expect(user1.id).toEqual(4);
        expect(user1.name).toEqual('John');
        expect(user1.surname).toEqual('Doe');
        expect(user1.nickname).toEqual('Joe');
        expect(user1.gender).toEqual('male');
        expect(user1.image).toEqual('https://www.google.com');
        expect(user2).toBeTruthy();
        expect(user2.id).toEqual(5);
        expect(user2.name).toEqual('Jane');
        expect(user2.surname).toEqual('Dae');
        expect(user2.nickname).toEqual('Don');
        expect(user2.gender).toEqual('female');
        expect(user2.image).toEqual('https://www.facebook.com');
    });
});
