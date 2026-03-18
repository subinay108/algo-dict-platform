---
name: Knuth-Morris-Pratt (KMP) Algorithm
slug: kmp-string-matching
category: String Algorithms
description: An efficient string-searching algorithm that avoids redundant comparisons by using a partial match table.
tags: [string, pattern-matching, searching, complexity-optimization]
difficulty: Hard
time_complexity:
    best: O(n + m)
    average: O(n + m)
    worst: O(n + m)
space_complexity: O(m)
---

## Overview
The **Knuth-Morris-Pratt (KMP)** algorithm is a sophisticated string-matching technique that searches for occurrences of a "pattern" string `P` within a "text" string `T`. Unlike the naive approach—which restarts the search from the next character of the text whenever a mismatch occurs—KMP uses information gained from previous comparisons to skip unnecessary checks, achieving linear time complexity.

## Intuition
When a mismatch occurs after some characters have already matched, we already know what those characters are. KMP exploits this by pre-calculating how much of the pattern is a "prefix that is also a suffix." If we match "ABCDABX" and fail at 'X', but we know "AB" appeared at the start of the pattern, we don't need to re-check "AB" in the text; we can just slide the pattern forward and continue from the 'C' following the "AB" prefix.



## How It Works
1.  **Preprocessing (LPS Table)**: Create a "Longest Proper Prefix which is also Suffix" (LPS) table for the pattern. For each position `i` in the pattern, `lps[i]` stores the length of the longest proper prefix of `P[0...i]` that is also a suffix of `P[0...i]`.
2.  **Searching**:
    * Maintain two pointers: `i` for the text and `j` for the pattern.
    * If `T[i] == P[j]`, increment both `i` and `j`.
    * If `j` reaches the end of the pattern, a match is found. Reset `j` using `lps[j-1]` to continue searching.
    * If `T[i] \neq P[j]` and `j > 0`, do not reset `i`. Instead, set `j = lps[j-1]` and compare again.
    * If `T[i] \neq P[j]` and `j == 0`, simply increment `i`.



## Applications
* **Text Editors**: Implementing "Find" and "Replace" features efficiently.
* **Bioinformatics**: Searching for specific DNA or protein sequences within large genomic datasets.
* **Intrusion Detection**: Matching known malicious signatures within network traffic packets.
* **Data Compression**: Identifying repeating patterns for dictionary-based compression.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <string>

void computeLPS(std::string pat, std::vector<int>& lps) {
    int len = 0, i = 1;
    lps[0] = 0;
    while (i < pat.length()) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
}

void KMP(std::string txt, std::string pat) {
    int m = pat.length(), n = txt.length();
    std::vector<int> lps(m);
    computeLPS(pat, lps);
    int i = 0, j = 0;
    while (i < n) {
        if (pat[j] == txt[i]) { i++; j++; }
        if (j == m) {
            // Match found at index i - j
            j = lps[j - 1];
        } else if (i < n && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
}
```

### Python
```python
def compute_lps(pat):
    lps = [0] * len(pat)
    length = 0
    i = 1
    while i < len(pat):
        if pat[i] == pat[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(txt, pat):
    n, m = len(txt), len(pat)
    lps = compute_lps(pat)
    i = j = 0
    while i < n:
        if pat[j] == txt[i]:
            i += 1
            j += 1
        if j == m:
            print(f"Pattern found at index {i - j}")
            j = lps[j - 1]
        elif i < n and pat[j] != txt[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
```

### Java
```java
public class KMP {
    void search(String pat, String txt) {
        int M = pat.length(), N = txt.length();
        int[] lps = new int[M];
        computeLPS(pat, M, lps);
        int i = 0, j = 0;
        while (i < N) {
            if (pat.charAt(j) == txt.charAt(i)) { i++; j++; }
            if (j == M) {
                System.out.println("Found pattern at index " + (i - j));
                j = lps[j - 1];
            } else if (i < N && pat.charAt(j) != txt.charAt(i)) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
    }
    void computeLPS(String pat, int M, int[] lps) {
        int len = 0, i = 1;
        while (i < M) {
            if (pat.charAt(i) == pat.charAt(len)) {
                len++; lps[i] = len; i++;
            } else {
                if (len != 0) len = lps[len - 1];
                else { lps[i] = 0; i++; }
            }
        }
    }
}
```

### JavaScript
```javascript
function kmpSearch(txt, pat) {
    const m = pat.length, n = txt.length;
    const lps = new Array(m).fill(0);
    
    // Preprocess LPS
    let len = 0, i = 1;
    while (i < m) {
        if (pat[i] === pat[len]) {
            lps[i++] = ++len;
        } else if (len !== 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }

    let j = 0; // index for pat
    i = 0;     // index for txt
    while (i < n) {
        if (pat[j] === txt[i]) { i++; j++; }
        if (j === m) {
            console.log(`Match at index `{i - j}`);
            j = lps[j - 1];
        } else if (i < n && pat[j] !== txt[i]) {
            j !== 0 ? j = lps[j - 1] : i++;
        }
    }
}
```