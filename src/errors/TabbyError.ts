class TabbyError extends Error {

    code: number;

    constructor(message:string, code:number) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}

export default TabbyError