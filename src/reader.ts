import { CreateOperation, EditOperation, DeleteOperation, Operation, OperationData } from "./operation";
import { readFileSync } from "fs";

interface OperationObject {
    operation?: string;
    editId?: number;
    deleteId?: number;
    data?: OperationData;
}

export function readFile(filePath: string): Operation[] {
    const json: OperationObject[] = JSON.parse(readFileSync(filePath, { encoding: 'utf-8' }));
    return parse(json);
}

function parse(json: OperationObject[]): Operation[] {
    return json.map(item => {
        if (item.operation === 'create') {
            if (!item.data) {
                throw new Error('data not specified');
            }
            return new CreateOperation(item.data);
        } else if (item.operation === 'edit') {
            if (!item.data) {
                throw new Error('data not specified');
            } else if (!item.editId) {
                throw new Error('editId not specified');
            }
            return new EditOperation(item.editId, item.data);
        } else if (item.operation === 'delete') {
            if (!item.deleteId) {
                throw new Error('deleteId not specified');
            }
            return new DeleteOperation(item.deleteId);
        }
        throw new Error('operation not found');
    })
}
