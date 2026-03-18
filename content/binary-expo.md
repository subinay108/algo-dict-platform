---
name: Binary Exponentiation
slug: binary-exponentiation
category: Mathematics
description: An efficient algorithm for calculating `a^n` in logarithmic time by repeatedly squaring the base.
tags: [math, recursion, optimization, number-theory]
difficulty: Easy
time_complexity:
    best: O(log n)
    average: O(log n)
    worst: O(log n)
space_complexity: O(1)
---

## Overview
**Binary Exponentiation** (also known as **Exponentiation by Squaring**) is a technique to compute `a^n` using only `O(\log n)` multiplications, instead of the `O(n)` multiplications required by the naive approach. This is particularly crucial in competitive programming and cryptography, where `n` can be as large as `10^{18}` and results are often taken modulo `m`.

## Intuition
The core idea is to use the property that exponents can be split. If we want to calculate `3^{10}`, we can observe that `3^{10} = (3^5)^2`. Then, `3^5 = 3 \cdot (3^2)^2`. By halving the power at each step, we reach the result much faster. It effectively treats the exponent as a sum of powers of 2 (its binary representation). For example, `3^{13} = 3^{(1101)_2} = 3^8 \cdot 3^4 \cdot 3^1`.



## How It Works
1.  **Base Case**: If `n = 0`, return 1.
2.  **Recursive/Iterative Step**:
    * If `n` is **even**: `a^n = (a^{n/2})^2`
    * If `n` is **odd**: `a^n = a \cdot (a^{(n-1)/2})^2`
3.  **Modular Version**: Often, we calculate `(a^n) \pmod m`. In each step, we simply apply the modulo operator to keep the numbers small:
    ``res = (res \cdot res) \pmod m``
4.  **Bitwise Optimization**: In the iterative version, we check if the current least significant bit of `n` is 1 using `n & 1`. If it is, we multiply the current result by the current base. We then square the base and right-shift `n` (`n >>= 1`).

## Applications
* **Modular Inverse**: Calculating `a^{m-2} \pmod m` using Fermat's Little Theorem.
* **Cryptography**: RSA encryption relies heavily on modular exponentiation.
* **Matrix Exponentiation**: Finding the `n^{th}` Fibonacci number in `O(\log n)` time.
* **Geometric Transformations**: Applying a transformation multiple times efficiently.

---

## Code Implementations

### C++
```cpp
long long binpow(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
```

### Python
```python
def binpow(a, b, m=None):
    res = 1
    a = a if m is None else a % m
    while b > 0:
        if b % 2 == 1:
            res = res * a if m is None else (res * a) % m
        a = a * a if m is None else (a * a) % m
        b //= 2
    return res

# Note: Python's built-in pow(a, b, m) already uses this algorithm.
```

### Java
```java
public class BinaryExponentiation {
    public static long power(long a, long b) {
        long res = 1;
        while (b > 0) {
            if ((b & 1) == 1) 
                res = res * a;
            a = a * a;
            b >>= 1;
        }
        return res;
    }
}
```

### JavaScript
```javascript
function binpow(a, b) {
    let res = 1n; // Use BigInt for large numbers
    let base = BigInt(a);
    let exp = BigInt(b);

    while (exp > 0n) {
        if (exp % 2n === 1n) {
            res = res * base;
        }
        base = base * base;
        exp = exp / 2n;
    }
    return res;
}
```