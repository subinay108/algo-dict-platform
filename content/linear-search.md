---
name: Linear Search
slug: linear-search
category: Searching Algorithms
description: A simple searching algorithm that checks every element in a list sequentially until a match is found or the end is reached.
tags: [search, sequential, brute-force, array]
difficulty: Easy
time_complexity:
    best: O(1)
    average: O(n)
    worst: O(n)
space_complexity: O(1)
---

## Overview
**Linear Search** (also known as Sequential Search) is the most basic searching algorithm. It works by starting at the beginning of a data structure and checking each element one by one until the target value is found or all elements have been examined. It does not require the data to be sorted, making it versatile but inefficient for large datasets.

## Intuition
Imagine you are looking for a specific shirt in a messy laundry basket. Since the clothes aren't organized, you have no choice but to pick up each item one at a time, look at it, and set it aside if it's not the one you want. You continue this until you either find your shirt or realize it's not in the basket.



## How It Works
1.  **Start**: Begin at the first element (index 0) of the array.
2.  **Compare**: Compare the current element with the target value `x`.
3.  **Match Found**: If the current element equals `x`, return the current index.
4.  **Move Forward**: If the current element does not equal `x`, move to the next element in the sequence.
5.  **Repeat**: Repeat steps 2-4 until a match is found.
6.  **End**: If you reach the end of the array without a match, return a value indicating the element is not present (usually -1).

## Applications
* **Unsorted Data**: When the data is not in any specific order and you only need to search it a few times.
* **Small Datasets**: For very small lists, the overhead of sorting for a faster search algorithm (like Binary Search) isn't worth it.
* **Linked Lists**: Since linked lists don't allow random access, you often must traverse them linearly anyway.
* **Simple Validation**: Checking if a specific username exists in a small list of active users.

---

## Code Implementations

### C++
```cpp
#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Found target at index i
        }
    }
    return -1; // Target not found
}
```

### Python
```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

### Java
```java
public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
```

### JavaScript
```javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}
```