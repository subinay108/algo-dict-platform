---
name: Jump Search
slug: jump-search
category: Searching Algorithms
description: A searching algorithm for sorted arrays that finds an element by jumping through fixed-size blocks.
tags: [search, sorted-array, square-root, linear-search]
difficulty: Easy
time_complexity:
    best: O(1)
    average: O(√n)
    worst: O(√n)
space_complexity: O(1)
---

## Overview
**Jump Search** is an efficient searching algorithm for sorted arrays. It serves as an intermediary between Linear Search (`O(n)`) and Binary Search (`O(\log n)`). By skipping fixed-size blocks of elements instead of checking every single one, it reduces the total number of comparisons. It is particularly useful when the cost of "jumping" or "skipping" is less than the cost of a full comparison or when moving backward in the data structure is expensive.

## Intuition
Imagine you are looking for a specific page in a massive book. Instead of flipping one page at a time (Linear Search), you skip forward by 10 pages at once. If you find that the page you are on has a higher number than what you are looking for, you know the target page must be in the last 10 pages you just skipped. You then perform a simple linear search within that small 10-page window.



## How It Works
1.  **Determine Block Size**: The optimal step size is usually `m = \sqrt{n}`, where `n` is the total number of elements.
2.  **Jump**: Start at the first element and jump forward by `m` steps. Compare the element at the current index with the target value `x`.
3.  **Continue or Backtrack**:
    * If `arr[m] < x`, jump to the next block (`2m`).
    * If `arr[m] > x`, the target must be in the current block. 
4.  **Linear Search**: Perform a linear search from the beginning of the previous block (`m`) to the current index (`2m`).
5.  **Termination**: If the element is found, return its index. If you reach the end of the array or cross the target value without finding it, the element is not present.

## Applications
* **Large Datasets**: Useful when the data is sorted and stored in a way that jumping is cheaper than binary search overhead.
* **Singly Linked Lists**: While typically used for arrays, a variation can be used in data structures where moving forward is much easier than jumping to an arbitrary middle point (Binary Search).
* **Hardware Constraints**: Systems where sequential memory access is faster than random access.

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

int jumpSearch(std::vector<int> arr, int x) {
    int n = arr.size();
    int step = std::sqrt(n);
    int prev = 0;

    // Finding the block where element is present
    while (arr[std::min(step, n) - 1] < x) {
        prev = step;
        step += std::sqrt(n);
        if (prev >= n) return -1;
    }

    // Doing a linear search for x in block beginning with prev
    while (arr[prev] < x) {
        prev++;
        if (prev == std::min(step, n)) return -1;
    }

    if (arr[prev] == x) return prev;
    return -1;
}
```

### Python
```python
import math

def jump_search(arr, x):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    
    # Jump through blocks
    while arr[min(step, n) - 1] < x:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    
    # Linear search in the identified block
    while arr[prev] < x:
        prev += 1
        if prev == min(step, n):
            return -1
            
    if arr[prev] == x:
        return prev
    return -1
```

### Java
```java
public class JumpSearch {
    public static int search(int[] arr, int x) {
        int n = arr.length;
        int step = (int) Math.floor(Math.sqrt(n));
        int prev = 0;

        while (arr[Math.min(step, n) - 1] < x) {
            prev = step;
            step += (int) Math.floor(Math.sqrt(n));
            if (prev >= n) return -1;
        }

        while (arr[prev] < x) {
            prev++;
            if (prev == Math.min(step, n)) return -1;
        }

        if (arr[prev] == x) return prev;
        return -1;
    }
}
```

### JavaScript
```javascript
function jumpSearch(arr, x) {
    const n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (arr[Math.min(step, n) - 1] < x) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }

    while (arr[prev] < x) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }

    if (arr[prev] === x) return prev;
    return -1;
}
```