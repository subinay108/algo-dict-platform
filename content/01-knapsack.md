---
name: 0/1 Knapsack Problem
slug: 0-1-knapsack-problem
category: Dynamic Programming
description: An optimization problem that selects items with given weights and values to maximize total value without exceeding a weight capacity.
tags: [dynamic-programming, optimization, combinatorics, np-hard]
difficulty: Medium
time_complexity:
    best: O(n * W)
    average: O(n * W)
    worst: O(n * W)
space_complexity: O(n * W)
---

## Overview
The **0/1 Knapsack Problem** is a classic combinatorial optimization challenge. Given a set of items, each with a weight and a value, the goal is to determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. The "0/1" signifies that each item is indivisible; you either take it (1) or leave it (0).

## Intuition
The problem has an "optimal substructure" property. Imagine you are a thief with a backpack of limited capacity. When considering the last item, you have two choices:
1.  **Exclude the item**: The maximum value is the same as the maximum value found using the previous items with the same capacity.
2.  **Include the item**: The maximum value is the item's value plus the maximum value found using the previous items with the *remaining* capacity (Total Capacity - Item's Weight).

By building a table of solutions to these smaller sub-problems, we eventually find the answer for the full capacity and all items.



## How It Works
1.  **Initialize**: Create a 2D array `dp[n+1][W+1]` where `n` is the number of items and `W` is the maximum capacity.
2.  **Base Case**: Set the first row and first column to 0 (representing 0 items or 0 capacity).
3.  **Fill the Table**: For each item `i` and each capacity `w`:
    * If `weight[i-1] \leq w`:
      ``dp[i][w] = \max(val[i-1] + dp[i-1][w - weight[i-1]], \ dp[i-1][w])``
    * Else:
      ``dp[i][w] = dp[i-1][w]``
4.  **Result**: The value at `dp[n][W]` is the maximum value attainable.



## Applications
* **Resource Allocation**: Distributing a fixed budget among various projects to maximize profit.
* **Loading Cargo**: Filling shipping containers with crates of different weights and values.
* **Selection of Investments**: Choosing a portfolio of stocks given a capital limit.
* **Cutting Stock**: Minimizing waste when cutting raw materials into specific sizes.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

int knapsack(int W, const std::vector<int>& wt, const std::vector<int>& val, int n) {
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(W + 1));

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = std::max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}
```

### Python
```python
def knapsack(W, wt, val, n):
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]

    for i in range(n + 1):
        for w in range(W + 1):
            if i == 0 or w == 0:
                dp[i][w] = 0
            elif wt[i-1] <= w:
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]

    return dp[n][W]
```

### Java
```java
public class Knapsack {
    public static int solve(int W, int[] wt, int[] val, int n) {
        int[][] dp = new int[n + 1][W + 1];

        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (i == 0 || w == 0)
                    dp[i][w] = 0;
                else if (wt[i - 1] <= w)
                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
                else
                    dp[i][w] = dp[i - 1][w];
            }
        }
        return dp[n][W];
    }
}
```

### JavaScript
```javascript
function knapsack(W, wt, val, n) {
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (i === 0 || w === 0) {
                dp[i][w] = 0;
            } else if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}
```