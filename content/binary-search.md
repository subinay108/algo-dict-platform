---

name: Binary Search
slug: binary-search
category: Searching
description: Efficient element finding in sorted arrays
tags: [array, divide-and-conquer, logn]
difficulty: Easy
time_complexity:
    best: O(1)
    average: O(log n)
    worst: O(log n)
space_complexity: O(1)
---
## Overview

Binary Search is an efficient algorithm used to find the position of a target value within a **sorted array**. It works by repeatedly dividing the search space in half.

## Intuition

Instead of checking each element one by one (like linear search), Binary Search:

* Looks at the **middle element**
* Decides whether to search left or right
* Cuts the problem size in half each step

## How It Works

1. Start with two pointers: `low` and `high`
2. Find middle index:

   ```
   mid = (low + high) / 2
   ```
3. Compare:

   * If `arr[mid] == target` → found
   * If `arr[mid] < target` → search right
   * Else → search left
4. Repeat until found or range becomes invalid

## Applications

* Searching in sorted arrays
* Lower bound / upper bound problems
* Binary search on answer (optimization problems)
* Used in databases and indexing

---

## Code Implementations

### C++

```cpp
int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }

    return -1;
}
```

### Python

```python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1
```


### Java

```java
public class Search {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}
```


### JavaScript

```javascript
function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }

    return -1;
}
```
