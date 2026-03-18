---
name: Adaptive Simpson's Method
slug: adaptive-simpsons-integration
category: Numerical Analysis
description: A dynamic numerical integration technique that adjusts step sizes based on the function's local curvature.
tags: [calculus, integration, numerical-methods, recursion]
difficulty: Medium
time_complexity:
    best: O(log n)
    average: O(n)
    worst: O(2^d)
space_complexity: O(d)
---

## Overview
The **Adaptive Simpson's Method** is a technique for calculating a definite integral that automatically adjusts the interval width to maintain a specified error tolerance. Unlike the standard Simpson's rule, which uses a fixed number of segments, this method concentrates more computational effort (more sub-intervals) on parts of the function that are highly oscillatory or "curvy" while using fewer segments in flatter regions.

## Intuition
Standard integration rules can be inefficient: if you pick a tiny step size to capture a spike in the middle of a function, you waste time using that same tiny step on the flat parts. The adaptive approach treats integration like a recursive "check-and-balance" system. It compares a single Simpson calculation over an interval to the sum of two Simpson calculations over the halves of that same interval. If the difference is small enough, it stops; if not, it keeps subdividing.



## How It Works
1.  **Simpson's Rule**: First, define the basic Simpson's Rule for an interval `[a, b]` with midpoint `c = \frac{a+b}{2}`:
    ``S(a, b) = \frac{b-a}{6} \left[ f(a) + 4f(c) + f(b) \right]``
2.  **Divide**: Calculate `S(a, b)` and then calculate the sum of two halves: `S(a, c) + S(c, b)`, where `c` is the midpoint of `[a, b]`.
3.  **Error Estimation**: The error is roughly proportional to `|S(a, b) - (S(a, c) + S(c, b))|`.
4.  **Recurse**: If the error estimate is within the tolerance `\epsilon`, return `S(a, c) + S(c, b) + \text{error\_correction}`.
5.  **Refine**: If the error is too high, recursively call the function for both `[a, c]` and `[c, b]`, passing half of the tolerance (`\epsilon/2`) to each side.

## Applications
* **Scientific Computing**: Evaluating integrals where the function's behavior changes drastically.
* **Computer Graphics**: Calculating lighting or area properties where geometric detail varies.
* **Physics Simulations**: Modeling systems with sudden transitions or "shocks."

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <cmath>

double f(double x) {
    return std::sin(x); // Example function
}

double simpson(double a, double b) {
    double c = (a + b) / 2.0;
    return (std::abs(b - a) / 6.0) * (f(a) + 4.0 * f(c) + f(b));
}

double adaptiveSimpson(double a, double b, double eps, double whole) {
    double c = (a + b) / 2.0;
    double left = simpson(a, c);
    double right = simpson(c, b);
    if (std::abs(left + right - whole) <= 15.0 * eps) {
        return left + right + (left + right - whole) / 15.0;
    }
    return adaptiveSimpson(a, c, eps / 2.0, left) + 
           adaptiveSimpson(c, b, eps / 2.0, right);
}
```

### Python
```python
def simpson(f, a, b):
    c = (a + b) / 2
    return abs(b - a) / 6 * (f(a) + 4 * f(c) + f(b))

def adaptive_simpson(f, a, b, eps, whole):
    c = (a + b) / 2
    left = simpson(f, a, c)
    right = simpson(f, c, b)
    
    if abs(left + right - whole) <= 15 * eps:
        return left + right + (left + right - whole) / 15
    
    return (adaptive_simpson(f, a, c, eps / 2, left) + 
            adaptive_simpson(f, c, b, eps / 2, right))

# Usage: adaptive_simpson(f, a, b, 1e-6, simpson(f, a, b))
```

### Java
```java
public class AdaptiveSimpson {
    interface Function { double apply(double x); }

    public static double simpson(Function f, double a, double b) {
        double c = (a + b) / 2.0;
        return (Math.abs(b - a) / 6.0) * (f.apply(a) + 4.0 * f.apply(c) + f.apply(b));
    }

    public static double integrate(Function f, double a, double b, double eps, double whole) {
        double c = (a + b) / 2.0;
        double left = simpson(f, a, c);
        double right = simpson(f, c, b);

        if (Math.abs(left + right - whole) <= 15.0 * eps) {
            return left + right + (left + right - whole) / 15.0;
        }
        return integrate(f, a, c, eps / 2.0, left) + integrate(f, c, b, eps / 2.0, right);
    }
}
```

### JavaScript
```javascript
function simpson(f, a, b) {
    const c = (a + b) / 2;
    return (Math.abs(b - a) / 6) * (f(a) + 4 * f(c) + f(b));
}

function adaptiveSimpson(f, a, b, eps, whole) {
    const c = (a + b) / 2;
    const left = simpson(f, a, c);
    const right = simpson(f, c, b);

    if (Math.abs(left + right - whole) <= 15 * eps) {
        return left + right + (left + right - whole) / 15;
    }

    return adaptiveSimpson(f, a, c, eps / 2, left) +
           adaptiveSimpson(f, c, b, eps / 2, right);
}
```