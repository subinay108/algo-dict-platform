---
name: Bubble Sort
slug: bubble-sort
category: Sorting Algorithms
description: A simple comparison-based sorting algorithm that repeatedly steps through the list, swaps adjacent elements if they are in the wrong order.
tags: [sorting, comparison, brute-force, stable]
difficulty: Easy
time_complexity:
    best: O(n)
    average: O(n^2)
    worst: O(n^2)
space_complexity: O(1)
---

## Overview
**Bubble Sort** is the simplest sorting algorithm. It works by repeatedly swapping adjacent elements if they are in the wrong order. The algorithm gets its name because smaller or larger elements "bubble" to the top (the end of the array) with each iteration. While inefficient for large datasets, it is highly intuitive and easy to implement.

## Intuition
Imagine a row of people of different heights. You start at the beginning and compare the first two people. If the one on the left is taller than the one on the right, they swap places. You move to the next pair and repeat this until you reach the end. By the time you finish the first pass, the tallest person is guaranteed to be at the very end. You repeat this process for the remaining people until everyone is sorted.



## How It Works
1.  **Iterate**: Start from the first element (index 0).
2.  **Compare**: Compare the current element with the next element in the array.
3.  **Swap**: If the current element is greater than the next element, swap them.
4.  **Repeat**: Move to the next pair and repeat until the end of the unsorted portion of the array.
5.  **Passes**: After each full pass, the largest unsorted element is placed in its correct final position. Repeat the process for `n-1` passes.
6.  **Optimization**: If a full pass occurs without any swaps, the array is already sorted, and the algorithm can terminate early.

## Applications
* **Educational**: Frequently used to introduce the concept of sorting and algorithm complexity.
* **Small Datasets**: Useful when the number of elements is very small and the overhead of complex algorithms is not justified.
* **Nearly Sorted Data**: With the "swapped" flag optimization, it can perform efficiently on arrays that are almost entirely sorted.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
```

### Python
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```

### Java
```java
public class BubbleSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}
```

### JavaScript
```javascript
function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}
```