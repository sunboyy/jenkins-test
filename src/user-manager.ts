import axios from "axios";
import { User } from "./user";
import { OperationData } from "./operation";

interface UserResult {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    gender: 'male' | 'female';
    image: string;
}

class UserManager {
    private users?: User[];

    async getUsers(): Promise<User[]> {
        if (this.users) { return this.users; }
        return await axios.get('https://sb-oil-web-bootcamp.herokuapp.com/users').then(res => {
            const { data } = res.data;
            this.users = data.map((row: UserResult) => new User(row.id, row.name, row.surname, row.nickname, row.gender, row.image));
            return this.users!;
        });
    }

    async createUser(opData: OperationData): Promise<User> {
        if (!opData.name || !opData.surname || !opData.nickname || !opData.gender || !opData.image) {
            throw new Error('Missing field');
        }
        if (opData.gender !== 'male' && opData.gender !== 'female') {
            throw new Error('Invalid gender');
        }
        const res = await axios.post('https://sb-oil-web-bootcamp.herokuapp.com/users', opData);
        const data: UserResult = res.data.data;
        const user = new User(data.id, data.name, data.surname, data.nickname, data.gender, data.image);
        (await this.getUsers()).push(user);
        return user;
    }

    async editUser(id: number, opData: OperationData): Promise<User> {
        if (opData.gender && opData.gender !== 'male' && opData.gender !== 'female') {
            throw new Error('Invalid gender');
        }
        const user = (await this.getUsers()).find(user => user.id === id);
        if (!user) {
            throw new Error('User not found');
        }
        const res = await axios.post(`https://sb-oil-web-bootcamp.herokuapp.com/users/${id}`, opData);
        const data: UserResult = res.data;
        Object.assign(user, data);
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        const user = (await this.getUsers()).find(user => user.id === id);
        if (!user) {
            throw new Error('User not found');
        }
        await axios.delete(`https://sb-oil-web-bootcamp.herokuapp.com/users/${id}`);
        this.users = this.users!.filter(user => user.id !== id);
    }
}

export const userManager = new UserManager();
