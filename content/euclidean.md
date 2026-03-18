---
name: Euclidean Algorithm
slug: euclidean-algorithm
category: Mathematics
description: An efficient method for computing the greatest common divisor (GCD) of two integers.
tags: [math, recursion, number-theory, gcd]
difficulty: Easy
time_complexity:
    best: O(1)
    average: O(log(min(a, b)))
    worst: O(log(min(a, b)))
space_complexity: O(log(min(a, b)))
---

## Overview
The **Euclidean Algorithm** is one of the oldest numerical algorithms still in common use, dating back to Euclid's *Elements* (c. 300 BC). It provides a highly efficient way to find the **Greatest Common Divisor (GCD)**—the largest positive integer that divides two numbers without leaving a remainder. It is a fundamental building block in number theory, cryptography, and simplifying fractions.

## Intuition
The core insight of the algorithm is that the GCD of two numbers does not change if the larger number is replaced by its difference with the smaller number. For example, the `GCD(24, 18)` is the same as `GCD(18, 24 - 18 = 6)`. If you repeat this, you eventually reach a state where one number is 0; the other number is the GCD. Modern versions use the remainder (modulo) instead of subtraction to speed up the process significantly.



## How It Works
The algorithm uses the property: `GCD(a, b) = GCD(b, a \pmod b)`.

1.  **Check**: Take two positive integers `a` and `b` (where `a > b`).
2.  **Divide**: Divide `a` by `b` and find the remainder `r` (`r = a \pmod b`).
3.  **Replace**: Set `a = b` and `b = r`.
4.  **Repeat**: Continue the process until `b` becomes 0.
5.  **Result**: When `b = 0`, the current value of `a` is the Greatest Common Divisor.

## Applications
* **Fraction Simplification**: Reducing fractions to their lowest terms (dividing numerator and denominator by their GCD).
* **Cryptography**: A key step in the RSA algorithm for generating public and private keys.
* **Extended Euclidean Algorithm**: Used to find modular multiplicative inverses, essential in modular arithmetic.
* **Least Common Multiple (LCM)**: Calculated using the formula: `LCM(a, b) = \frac{|a \cdot b|}{GCD(a, b)}`.

---

## Code Implementations

### C++
```cpp
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Recursive version
int gcdRecursive(int a, int b) {
    return b == 0 ? a : gcdRecursive(b, a % b);
}
```

### Python
```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

# Using recursion
def gcd_recursive(a, b):
    if b == 0:
        return a
    return gcd_recursive(b, a % b)
```

### Java
```java
public class EuclideanAlgorithm {
    public static int findGCD(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

### JavaScript
```javascript
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}
```