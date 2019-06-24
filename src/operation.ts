import { User } from "./user";
import { userManager } from "./user-manager";

export interface OperationData {
    name?: string;
    surname?: string;
    nickname?: string;
    gender?: string;
    image?: string;
}

export interface Operation {
    performOperation(): Promise<any>;
}

export class CreateOperation implements Operation {
    constructor(private data: OperationData) { }

    async performOperation(): Promise<User> {
        return await userManager.createUser(this.data);
    }
}

export class EditOperation implements Operation {
    constructor(private editId: number, private data: OperationData) { }

    async performOperation(): Promise<User> {
        return await userManager.editUser(this.editId, this.data);
    }
}

export class DeleteOperation implements Operation {
    constructor(private deleteId: number) { }

    async performOperation(): Promise<void> {
        return await userManager.deleteUser(this.deleteId);
    }
}