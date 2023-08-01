export class UserError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserInputError extends UserError {
    constructor(parameter: string) {
        super("Invalid input");
        this.parameter = parameter;
    }

    public parameter: string;
}
