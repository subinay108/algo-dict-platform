---
name: Kadane’s Algorithm
slug: kadanes-algorithm
category: Dynamic Programming
description: An efficient algorithm for finding the maximum sum contiguous subarray within a one-dimensional array of numbers.
tags: [array, dynamic-programming, optimization, maximum-subarray]
difficulty: Medium
time_complexity:
    best: O(n)
    average: O(n)
    worst: O(n)
space_complexity: O(1)
---

## Overview
**Kadane’s Algorithm** is an iterative dynamic programming algorithm used to solve the **Maximum Subarray Problem**. Given an array of integers, the goal is to find the contiguous subarray (at least one number) which has the largest sum. It is famous for reducing the time complexity from a naive `O(n^2)` (checking all pairs) to a linear `O(n)`.

## Intuition
The core idea is simple: as you move through the array, you keep track of the "current best" sum. At each new element, you have two choices: either add the current element to the existing sum or start a brand new subarray beginning at that element. You choose whichever is larger. If adding an element makes the current sum smaller than the element itself (i.e., your previous sum was negative), it is better to "reset" and start over.



## How It Works
The algorithm maintains two variables: `max_so_far` (the global maximum found) and `current_max` (the maximum sum ending at the current position).

1.  **Initialize**: Set `max_so_far` and `current_max` to the first element of the array.
2.  **Iterate**: Starting from the second element, for each element `x` in the array:
    * Update `current_max`: `current\_max = \max(x, current\_max + x)`
    * Update `max_so_far`: `max\_so\_far = \max(max\_so\_far, current\_max)`
3.  **Result**: After one pass, `max_so_far` contains the maximum subarray sum.



## Applications
* **Stock Market Analysis**: Finding the period with the highest gain (or least loss).
* **Computer Vision**: Finding the brightest region in an image (2D version).
* **Genomic Sequencing**: Identifying segments of DNA with high GC-content.
* **Data Mining**: Detecting bursts of activity in a time-series dataset.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

int kadane(std::vector<int>& nums) {
    int max_so_far = nums[0];
    int current_max = nums[0];

    for (size_t i = 1; i < nums.size(); i++) {
        current_max = std::max(nums[i], current_max + nums[i]);
        max_so_far = std::max(max_so_far, current_max);
    }
    return max_so_far;
}
```

### Python
```python
def kadane(nums):
    max_so_far = nums[0]
    current_max = nums[0]
    
    for i in range(1, len(nums)):
        current_max = max(nums[i], current_max + nums[i])
        max_so_far = max(max_so_far, current_max)
        
    return max_so_far
```

### Java
```java
public class Kadane {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }
}
```

### JavaScript
```javascript
function kadane(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    return maxSoFar;
}
```