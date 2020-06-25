export class Notification {
    constructor(
        public _id: string,
        public date: Date,
        public title: string,
        public description: string,
        public active: boolean,
        public type?: number,
        public order?: number,
        public image?: string,
        public sfile?: string
    ) {}
}
