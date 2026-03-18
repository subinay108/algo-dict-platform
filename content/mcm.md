---
name: Matrix Chain Multiplication (MCM)
slug: matrix-chain-multiplication
category: Dynamic Programming
description: An optimization problem to find the most efficient way to multiply a sequence of matrices by minimizing the total number of scalar multiplications.
tags: [dynamic-programming, optimization, matrices, algorithms]
difficulty: Hard
time_complexity:
    best: O(n^3)
    average: O(n^3)
    worst: O(n^3)
space_complexity: O(n^2)
---

## Overview
**Matrix Chain Multiplication** is not about performing the actual multiplication, but about finding the optimal **parenthesization** of a product of `n` matrices. Because matrix multiplication is associative but not commutative, the order in which we group the operations can drastically change the number of required scalar multiplications.

## Intuition
Suppose you have three matrices: `A` (`10 \times 100`), `B` (`100 \times 5`), and `C` (`5 \times 50`).
* `(AB)C` takes `(10 \times 100 \times 5) + (10 \times 5 \times 50) = 5,000 + 2,500 = \mathbf{7,500}` operations.
* `A(BC)` takes `(100 \times 5 \times 50) + (10 \times 100 \times 50) = 25,000 + 50,000 = \mathbf{75,000}` operations.

The first way is 10 times faster. MCM uses dynamic programming to find this "cheapest" path for any number of matrices.



## How It Works
We use a table `m[n][n]` where `m[i][j]` is the minimum cost to multiply matrices from `i` to `j`.

1.  **Define Subproblems**: To compute the cost of the chain `M_i \dots M_j`, we split it at some point `k` (`i \leq k < j`).
2.  **Recursive Formula**: The cost is the sum of the cost to compute the two sub-chains plus the cost of multiplying the resulting two matrices:
    ``m[i,j] = \min_{i \leq k < j} \{ m[i,k] + m[k+1,j] + p_{i-1}p_kp_j \}``
    Where `p` is an array of dimensions such that Matrix `i` is `p_{i-1} \times p_i`.
3.  **Base Case**: The cost to multiply a single matrix is zero: `m[i,i] = 0`.
4.  **Filling Order**: We fill the table based on the length of the chain, starting from length 2 up to `n`.



## Applications
* **Compiler Optimization**: Optimizing the execution of complex mathematical expressions in code.
* **Computer Graphics**: Managing sequences of transformations (rotation, scaling, translation) represented as matrices.
* **Robotics**: Efficiently calculating Kinematics chains.
* **Parallel Computing**: Determining how to distribute matrix operations across multiple processors.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <climits>

int matrixChainOrder(std::vector<int>& p) {
    int n = p.size() - 1;
    std::vector<std::vector<int>> m(n + 1, std::vector<int>(n + 1, 0));

    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            m[i][j] = INT_MAX;
            for (int k = i; k <= j - 1; k++) {
                int q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < m[i][j]) m[i][j] = q;
            }
        }
    }
    return m[1][n];
}
```

### Python
```python
def matrix_chain_order(p):
    n = len(p) - 1
    m = [[0 for _ in range(n + 1)] for _ in range(n + 1)]

    # len is the chain length
    for length in range(2, n + 1):
        for i in range(1, n - length + 2):
            j = i + length - 1
            m[i][j] = float('inf')
            for k in range(i, j):
                cost = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]
                if cost < m[i][j]:
                    m[i][j] = cost
                    
    return m[1][n]
```

### Java
```java
public class MatrixChain {
    public static int solve(int[] p) {
        int n = p.length - 1;
        int[][] m = new int[n + 1][n + 1];

        for (int len = 2; len <= n; len++) {
            for (int i = 1; i <= n - len + 1; i++) {
                int j = i + len - 1;
                m[i][j] = Integer.MAX_VALUE;
                for (int k = i; k <= j - 1; k++) {
                    int q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                    if (q < m[i][j]) m[i][j] = q;
                }
            }
        }
        return m[1][n];
    }
}
```