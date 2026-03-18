---
name: Counting Sort
slug: counting-sort
category: Sorting Algorithms
description: A non-comparison-based sorting algorithm that sorts elements by counting the occurrences of each unique value.
tags: [sorting, non-comparison, integer-sort, linear-time]
difficulty: Medium
time_complexity:
    best: O(n + k)
    average: O(n + k)
    worst: O(n + k)
space_complexity: O(k)
---

## Overview
**Counting Sort** is a linear-time sorting algorithm that operates by counting the number of objects that have each distinct key value. Unlike comparison-based algorithms (like QuickSort or MergeSort), it never compares two elements. Instead, it uses the values of the elements themselves as indices into an array, making it incredibly fast when the range of input values (`k`) is not significantly larger than the number of elements (`n`).

## Intuition
Imagine you have a crate of fruit: apples, oranges, and bananas. To sort them, you don't compare an apple to an orange. Instead, you set up three buckets. Every time you pick up an apple, you put it in the apple bucket and increment a counter. Once you've gone through the crate, you just empty the buckets in order. In computer science, we use an integer array as our "buckets."



## How It Works
1.  **Find Range**: Identify the maximum value (`k`) in the input array to determine the size of the counting array.
2.  **Count Frequencies**: Create a `count` array of size `k+1` initialized to zero. Iterate through the input array and increment `count[x]` for every element `x`.
3.  **Cumulative Sum**: Transform the `count` array such that each element at index `i` stores the sum of previous counts. This indicates the actual position of the element in the output array.
4.  **Build Output**: Iterate through the input array in reverse (to maintain **stability**), look up the position in the `count` array, place the element in the output array, and decrement the count.
5.  **Copy**: Copy the sorted output array back to the original array.

## Applications
* **Subroutine for Radix Sort**: Used as a stable sorting backbone for sorting numbers with multiple digits.
* **Discrete Finite Ranges**: Sorting exam scores (0–100), ages, or alphabet characters.
* **Histogram Generation**: When the goal is to find frequency distributions rather than just sorting.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

void countingSort(std::vector<int>& arr) {
    if (arr.empty()) return;
    int maxVal = *std::max_element(arr.begin(), arr.end());
    std::vector<int> count(maxVal + 1, 0);
    std::vector<int> output(arr.size());

    for (int x : arr) count[x]++;
    for (int i = 1; i <= maxVal; i++) count[i] += count[i - 1];

    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    arr = output;
}
```

### Python
```python
def counting_sort(arr):
    if not arr: return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * len(arr)

    for x in arr:
        count[x] += 1
    
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]

    for x in reversed(arr):
        output[count[x] - 1] = x
        count[x] -= 1
        
    return output
```

### Java
```java
public class CountingSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        if (n == 0) return;
        int max = arr[0];
        for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];

        int[] count = new int[max + 1];
        for (int x : arr) count[x]++;
        for (int i = 1; i <= max; i++) count[i] += count[i - 1];

        int[] output = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        System.arraycopy(output, 0, arr, 0, n);
    }
}
```

### JavaScript
```javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    const output = new Array(arr.length);

    arr.forEach(x => count[x]++);
    for (let i = 1; i <= max; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}
```