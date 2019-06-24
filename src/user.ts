export class User {
    constructor(public id: number, public name: string, public surname: string, public nickname: string,
        public gender: 'male' | 'female', public image: string) { }
}
