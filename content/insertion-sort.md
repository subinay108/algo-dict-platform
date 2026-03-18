---
name: Insertion Sort
slug: insertion-sort
category: Sorting Algorithms
description: A simple comparison-based sorting algorithm that builds the final sorted array one item at a time.
tags: [sorting, comparison, in-place, stable, online]
difficulty: Easy
time_complexity:
    best: O(n)
    average: O(n^2)
    worst: O(n^2)
space_complexity: O(1)
---

## Overview
**Insertion Sort** is an intuitive sorting algorithm that works similarly to the way you might sort playing cards in your hands. It is highly efficient for small datasets and "nearly sorted" arrays, where it can outperform more complex algorithms like QuickSort or MergeSort due to its low overhead.

## Intuition
Imagine you are holding a hand of cards. You pick up a new card and look at the cards already in your hand from right to left. You shift the cards that are larger than your new card to the right, creating a "gap," and then drop the new card into its correct sorted position. You repeat this until all cards are in your hand and sorted.



## How It Works
The algorithm divides the array into a "sorted" part and an "unsorted" part.

1.  **Start**: Assume the first element is already sorted.
2.  **Pick**: Take the next element from the unsorted part (let's call this the `key`).
3.  **Compare**: Compare the `key` with the elements in the sorted part from right to left.
4.  **Shift**: If an element in the sorted part is larger than the `key`, shift that element one position to the right.
5.  **Insert**: Repeat step 4 until you find an element smaller than the `key` (or reach the start of the array). Place the `key` in the empty slot.
6.  **Repeat**: Move to the next unsorted element and repeat until the entire array is processed.



## Applications
* **Small Data**: Preferred for arrays with a small number of elements (typically 10-20).
* **Nearly Sorted Data**: Extremely fast when the data is already mostly in order.
* **Online Sorting**: Can sort a list as it receives it (e.g., streaming data), as it only needs to see one new element at a time to place it.
* **Hybrid Algorithms**: Used as the final "cleanup" step in more advanced algorithms like Timsort or Introsort.

---

## Code Implementations

### C++
```cpp
#include <vector>

void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}
```

### Python
```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Shift elements that are greater than the key
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
```

### Java
```java
public class InsertionSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}
```

### JavaScript
```javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
```