export class Publication {
    constructor(
        public _id: string,
        public date: Date,
        public title: string,
        public description: string,
        public category: string,
        public lnk: string,
        public active: boolean,
        public type?: number,
        public order?: number,
        public image?: string
    ) {}
}