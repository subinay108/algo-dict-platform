---
name: Heap Sort
slug: heap-sort
category: Sorting Algorithms
description: A comparison-based sorting algorithm that uses a binary heap data structure to sort elements in-place.
tags: [sorting, heap, comparison, in-place, selection-sort]
difficulty: Medium
time_complexity:
    best: O(n log n)
    average: O(n log n)
    worst: O(n log n)
space_complexity: O(1)
---

## Overview
**Heap Sort** is a highly efficient, comparison-based sorting algorithm that can be thought of as an improved version of Selection Sort. Instead of scanning the entire unsorted section to find the maximum element, it organizes the data into a **Binary Heap** data structure. This allows it to find and remove the largest element in logarithmic time, ensuring consistent performance regardless of the input data's initial order.

## Intuition
Imagine you have a pile of numbered blocks. To sort them, you first arrange them into a "mountain" (a Max-Heap) where every parent block is larger than its children. The largest block is naturally at the very peak. You take the peak block and move it to your "finished" row, then let the remaining blocks settle back into a smaller mountain. By repeatedly taking the peak, you build your sorted list from largest to smallest.



## How It Works
1.  **Build Max-Heap**: Transform the input array into a Max-Heap. In a Max-Heap, for any given node `i`, the value of `i` is greater than or equal to the values of its children.
2.  **Extract Root**: The largest element is at the root (index 0). Swap it with the last element of the unsorted array.
3.  **Heapify**: Reduce the size of the heap by 1 and call `heapify` on the new root to restore the Max-Heap property.
4.  **Repeat**: Continue swapping the root and heapifying until the entire array is sorted.



## Applications
* **Systems Programming**: Used in the Linux Kernel for its `O(n \log n)` guarantee and `O(1)` space usage.
* **Priority Queues**: The underlying heap structure is essential for managing prioritized tasks.
* **Embedded Systems**: Ideal for environments with strictly limited memory where stability isn't required.
* **Selection Problems**: Efficiently finding the `k` largest or smallest elements in a dataset.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
```

### Python
```python
def heapify(arr, n, i):
    largest = i
    l, r = 2 * i + 1, 2 * i + 2

    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr
```

### Java
```java
public class HeapSort {
    public void sort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    void heapify(int[] arr, int n, int i) {
        int largest = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }
}
```

### JavaScript
```javascript
function heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}
```