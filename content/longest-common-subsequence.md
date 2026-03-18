---
name: Longest Common Subsequence (LCS)
slug: longest-common-subsequence
category: Dynamic Programming
description: An algorithm to find the longest sequence of characters that appear in the same relative order in two strings.
tags: [dynamic-programming, strings, optimization, bioinformatics]
difficulty: Medium
time_complexity:
    best: O(m * n)
    average: O(m * n)
    worst: O(m * n)
space_complexity: O(m * n)
---

## Overview
The **Longest Common Subsequence (LCS)** problem is a classic challenge in computer science. Unlike a "substring," a "subsequence" does not need to occupy consecutive positions within the original strings; it only needs to appear in the same relative order. For example, the LCS of "ABCDE" and "ACE" is "ACE" with a length of 3.

## Intuition
The problem exhibits **overlapping subproblems** and **optimal substructure**. To find the LCS of two strings, we look at their last characters:
1.  **Match**: If the last characters are the same, they must be part of the LCS. We add 1 to the result and solve for the remaining prefixes of both strings.
2.  **Mismatch**: If they differ, the LCS could be formed by either dropping the last character of the first string OR dropping the last character of the second string. We take the maximum of these two possibilities.



## How It Works
We use a 2D table `L[m+1][n+1]` to store the lengths of LCS for all possible prefixes.

1.  **Initialize**: Create a table where `L[i][j]` represents the LCS length of `String1[0...i-1]` and `String2[0...j-1]`. Fill the first row and column with 0.
2.  **Fill Table**: Iterate through the strings:
    * If `S1[i-1] == S2[j-1]`: 
      ``L[i][j] = L[i-1][j-1] + 1``
    * If `S1[i-1] != S2[j-1]`: 
      ``L[i][j] = \max(L[i-1][j], L[i][j-1])``
3.  **Result**: The value at `L[m][n]` is the length of the longest common subsequence.
4.  **Backtrack**: To find the actual string, start from `L[m][n]` and move diagonally up-left when characters match, or move toward the larger adjacent value when they don't.



## Applications
* **Version Control**: Used in the `diff` command to compare file versions and identify changes.
* **Bioinformatics**: Aligning DNA or protein sequences to find similarities between different organisms.
* **Natural Language Processing**: Measuring the similarity between two sentences or documents.
* **Data Compression**: Identifying repeated patterns across different data streams.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <string>
#include <algorithm>

int lcs(std::string s1, std::string s2) {
    int m = s1.size();
    int n = s2.size();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}
```

### Python
```python
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
                
    return dp[m][n]
```

### Java
```java
public class LCS {
    public static int findLCS(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1))
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
}
```