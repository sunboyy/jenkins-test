import { Operation } from './operation';
import { userManager } from './user-manager';
import { readFile } from './reader';

(async () => {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error('ERROR: Path not specified');
        return;
    }
    try {
        const operations: Operation[] = readFile(filePath);
        for (let i = 0; i < operations.length; i++) {
            await operations[i].performOperation();
            console.log(`[${i + 1}/${operations.length}] operation succeeded`);
        }
        const users = await userManager.getUsers();
        users.forEach(user => console.log(`${user.id}. ${user.name} ${user.surname} (${user.nickname}), ${user.gender}`));
    } catch (err) {
        console.error('ERROR: ' + err.message);
    }
})();
