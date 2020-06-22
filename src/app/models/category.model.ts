export class Category {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public active: boolean,
        public order?: number
    ) {}
}
