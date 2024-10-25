class Exercise1 {
  // Power function with BigInt for large numbers
  static power = (x, y, p) => {
    let res = 1n;
    x = BigInt(x) % BigInt(p);
    y = BigInt(y);

    while (y > 0n) {
      if (y & 1n) res = (res * x) % BigInt(p);
      y = y >> 1n;
      x = (x * x) % BigInt(p);
    }
    return res;
  };

  // Miller-Rabin primality test for large numbers
  static isMiller = (d, n) => {
    let a = 2n + BigInt(Math.floor(Math.random() * Number(n - 4n)));
    let x = this.power(a, d, n);

    if (x === 1n || x === n - 1n) return true;

    while (d !== n - 1n) {
      x = (x * x) % n;
      d *= 2n;

      if (x === 1n) return false;
      if (x === n - 1n) return true;
    }
    return false;
  };

  // Prime check function using Miller-Rabin
  static isPrime = (n, k = 5) => {
    n = BigInt(n);
    if (n <= 1n || n === 4n) return false;
    if (n <= 3n) return true;

    let d = n - 1n;
    while (d % 2n === 0n) d /= 2n;

    for (let i = 0; i < k; i++) {
      if (!this.isMiller(d, n)) return false;
    }
    return true;
  };
  static checkPrime = (inputId) => {
    const inputValue = document.getElementById(inputId).value;
    if (!inputValue) {
      alert("Please input a valid number");
      return;
    }

    const num = BigInt(inputValue);
    const limit = 2n ** 89n - 1n;

    if (num >= limit) {
      alert("Number exceeds 2^89 - 1");
    } else {
      let isPrime = this.isPrime(num);
      alert(`Number ${num} is ${isPrime ? "Prime" : "Not Prime"}`);
    }
  };

  // GCD Calculation using Euclidean Algorithm
  static gcd = (a, b) => {
    while (b !== 0n) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  static calculateGCD = () => {
    let num1 = document.getElementById("random1").value;
    let num2 = document.getElementById("random2").value;
    if (num1 && num2) {
      let bigInt1 = BigInt(num1);
      let bigInt2 = BigInt(num2);
      let result = this.gcd(bigInt1, bigInt2);
      document.getElementById("gcdOutput").value = result;
    } else {
      alert("Please input valid numbers for both Random No 1 and Random No 2");
    }
  };

  // Modular exponentiation handler
  static calculateExponentiation = () => {
    let base = BigInt(document.getElementById("baseInput").value);
    let exp = BigInt(document.getElementById("expInput").value);
    let mod = BigInt(document.getElementById("modInput").value);
    if (base && exp && mod) {
      let result = this.power(base, exp, mod);
      document.getElementById("expOutput").value = result;
    } else {
      alert("Please input valid numbers for base, exponent, and modulus");
    }
  };

  // Random Prime Generator for given bit size
  static generateRandomPrime = (bits) => {
    let min = 2n ** BigInt(bits - 1);
    let max = 2n ** BigInt(bits) - 1n;

    let prime;
    do {
      prime = this.getRandomBigInt(min, max);
    } while (!this.isPrime(prime));

    document.getElementById(`randomPrime${bits}`).value = prime;
  };

  // Random BigInt Generator within a range
  static getRandomBigInt = (min, max) => {
    let range = max - min;
    let randomBytes = range.toString(2).length;
    let randomBigInt;

    do {
      randomBigInt = BigInt(
        "0b" +
          [...Array(randomBytes)]
            .map(() => (Math.random() > 0.5 ? 1 : 0))
            .join("")
      );
    } while (randomBigInt > range);

    return randomBigInt + min;
  };

  static generateRandomLargeNumber = (elementId) => {
    const randomBigInt = this.getRandomBigInt(2n ** 32n, 2n ** 64n);
    document.getElementById(elementId).value = randomBigInt;
  };

  // Function to find 10 largest primes under Mersenne primes
  static findLargestPrimesUnderMersenne = () => {
    const mersennePrimes = [];
    let p = 2; // Start checking from p = 2
    const largestPrimes = [];
    while (mersennePrimes.length < 10) {
      if (this.isPrime(p)) {
        let mersenne = 2n ** BigInt(p) - 1n;
        if (this.isPrime(mersenne)) {
          mersennePrimes.push(mersenne);
          let prime = mersenne - 1n;
          while (!this.isPrime(prime)) {
            prime--;
          }
          largestPrimes.push(prime);
        }
      }
      p++;
    }
    document.getElementById("largestPrimesUnderMersenne").value =
      largestPrimes.join(", ");
  };
}

document
  .getElementById("findLargestPrimes")
  .addEventListener("click", function () {
    Exercise1.findLargestPrimesUnderMersenne();
  });

// Event listener for prime checking via checkboxes
document.getElementById("checkPrime1").addEventListener("change", function () {
  if (this.checked) {
    Exercise1.checkPrime("random1");
  }
});

document.getElementById("checkPrime2").addEventListener("change", function () {
  if (this.checked) {
    Exercise1.checkPrime("random2");
  }
});
