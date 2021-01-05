

export function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        mainScene = "new property";
        hello = "override";
    };
}