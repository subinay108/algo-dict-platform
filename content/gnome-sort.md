---
name: Gnome Sort
slug: gnome-sort
category: Sorting Algorithms
description: A simple sorting algorithm similar to insertion sort that moves elements to their proper position by repeated swaps.
tags: [sorting, exchange-sort, comparison, stable]
difficulty: Easy
time_complexity:
    best: O(n)
    average: O(n^2)
    worst: O(n^2)
space_complexity: O(1)
---

## Overview
**Gnome Sort** (originally proposed by Hamid Sarbazi-Azad in 2000 as "Stupid Sort") is a sorting algorithm that is conceptually similar to Insertion Sort, but the movement of elements is accomplished through a series of swaps, much like a garden gnome sorting a line of flower pots. It is a stable sort with an extremely simple implementation, requiring no nested loops.

## Intuition
The algorithm is based on the technique used by a Dutch Garden Gnome:
1. The gnome looks at the flower pot next to him and the previous one. If they are in the right order, he steps one pot forward.
2. If they are in the wrong order, he swaps them and steps one pot backward to check if the swapped pot is now in the right place relative to its new neighbor.
3. If there is no previous pot (he is at the start), he always steps forward.



## How It Works
The algorithm maintains a single index `pos`.

1. **Start**: Initialize `pos = 0`.
2. **Boundary Check**: If `pos` is at the end of the array, the sort is complete.
3. **Comparison**:
    * If `pos == 0` or `arr[pos] >= arr[pos - 1]`, the current element is in the correct relative order. **Increment** `pos`.
    * If `arr[pos] < arr[pos - 1]`, the elements are out of order. **Swap** them and **decrement** `pos` to ensure the moved element is compared with its new preceding neighbor.
4. **Repeat**: Continue until the index reaches the end of the array.

## Applications
* **Educational**: Excellent for demonstrating how a single loop can perform a complete sort through conditional index manipulation.
* **Minimal Memory Systems**: Like other in-place sorts, it requires only `O(1)` extra space.
* **Nearly Sorted Data**: Performs well when elements are close to their final positions, though Insertion Sort is generally preferred for this use case.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

void gnomeSort(std::vector<int>& arr) {
    int n = arr.size();
    int pos = 0;
    while (pos < n) {
        if (pos == 0 || arr[pos] >= arr[pos - 1]) {
            pos++;
        } else {
            std::swap(arr[pos], arr[pos - 1]);
            pos--;
        }
    }
}
```

### Python
```python
def gnome_sort(arr):
    pos = 0
    n = len(arr)
    while pos < n:
        if pos == 0 or arr[pos] >= arr[pos - 1]:
            pos += 1
        else:
            arr[pos], arr[pos - 1] = arr[pos - 1], arr[pos]
            pos -= 1
    return arr
```

### Java
```java
public class GnomeSort {
    public static void sort(int[] arr) {
        int pos = 0;
        while (pos < arr.length) {
            if (pos == 0 || arr[pos] >= arr[pos - 1]) {
                pos++;
            } else {
                int temp = arr[pos];
                arr[pos] = arr[pos - 1];
                arr[pos - 1] = temp;
                pos--;
            }
        }
    }
}
```

### JavaScript
```javascript
function gnomeSort(arr) {
    let pos = 0;
    while (pos < arr.length) {
        if (pos === 0 || arr[pos] >= arr[pos - 1]) {
            pos++;
        } else {
            [arr[pos], arr[pos - 1]] = [arr[pos - 1], arr[pos]];
            pos--;
        }
    }
    return arr;
}
```