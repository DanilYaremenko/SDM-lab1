//solving quadratic eqation
const solveQuadraticEquation = (a, b, c) => {
    const discriminant = b * b - 4 * a * c;
    const discriminantRoot = Math.sqrt(discriminant)

    if (discriminant > 0) {
        const x1 = (-b + discriminantRoot) / (2 * a);
        const x2 = (-b - discriminantRoot) / (2 * a);
        return [x1, x2]
    } else if (discriminant == 0) {
        const x1 = (-b + discriminantRoot) / (2 * a);
        return [x1]
    } else {
        return []
    }
}
