export class Argument {
  constructor(argument: string) {
    this.argument = argument;
  }

  public argument: string;
  public wrap: [string, string] = ["", ""];

  public toString() {
    return this.wrap[0] + this.argument + this.wrap[1];
  }
}

class OptionalArgument extends Argument {
  declare readonly wrap: ["[", "]"];
}

class RequiredArgument extends Argument {
  declare readonly wrap: ["<", ">"];
}

export function Optional(argument: string) {
  return new OptionalArgument(argument);
}

export function Required(argument: string) {
  return new RequiredArgument(argument);
}
