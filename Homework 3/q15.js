function computePower(b, n) {
    const result = Math.pow(b, n);
    console.log(result);
}

const b = process.argv[2];
const n = process.argv[3];

if (b === undefined || n === undefined) {
    console.log("Usage: node q15.js <base> <exponent>");
} else {
    computePower(Number(b), Number(n));
}