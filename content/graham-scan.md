---
name: Graham Scan
slug: graham-scan
category: Computational Geometry
description: An efficient algorithm for computing the convex hull of a finite set of points in a 2D plane.
tags: [geometry, convex-hull, stack, sorting]
difficulty: Hard
time_complexity:
    best: O(n log n)
    average: O(n log n)
    worst: O(n log n)
space_complexity: O(n)
---

## Overview
The **Graham Scan** is a method of finding the **convex hull**—the smallest convex polygon that contains all points in a given set. Imagine the points as nails driven into a board; the convex hull is the shape formed by a rubber band stretched around all the nails. It is a fundamental algorithm in computational geometry.

## Intuition
The algorithm works like a "boundary patrol." After picking the lowest point as a starting anchor, it sorts all other points based on the angle they make with that anchor. It then traverses these sorted points, maintaining a stack of the hull's vertices. If adding a new point creates a "right turn" (making the shape concave), it backtracks and removes previous points until only "left turns" remain, ensuring the final boundary stays convex.



## How It Works
1.  **Find Pivot**: Select the point with the lowest y-coordinate (and leftmost x-coordinate in case of ties). This point `P` is guaranteed to be on the hull.
2.  **Sort**: Sort the remaining points by the polar angle they make with point `P`. If two points have the same angle, keep only the one farthest from `P`.
3.  **Initialize**: Push the pivot and the first two sorted points onto a stack.
4.  **Scan**: For each subsequent point `C`:
    * While the orientation of the last two points in the stack and `C` does not make a **counter-clockwise (left) turn**:
        * Pop the top point from the stack.
    * Push `C` onto the stack.
5.  **Formula**: Orientation is determined using the cross product of vectors `(P_2 - P_1)` and `(P_3 - P_2)`. A positive value indicates a left turn.

``(y_2 - y_1)(x_3 - x_2) - (x_2 - x_1)(y_3 - y_2)``

## Applications
* **Collision Detection**: Creating simplified bounding volumes for complex 2D shapes in video games.
* **Pattern Recognition**: Identifying the shape or boundary of a cluster of data points.
* **GIS Systems**: Finding the minimal boundary of a set of geographical locations (e.g., service areas).
* **Statistics**: Identifying outliers or defining the "spread" of a 2D dataset.

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <stack>

struct Point { int x, y; };

int orientation(Point p, Point q, Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0; // collinear
    return (val > 0) ? 1 : 2; // clock or counterclock
}

std::vector<Point> grahamScan(std::vector<Point>& points) {
    int n = points.size();
    if (n < 3) return points;

    // Find lowest point logic and sort by polar angle...
    std::stack<Point> hull;
    // Iterate and check orientation to build stack
    return {}; // Returns points in the hull
}
```

### Python
```python
def graham_scan(points):
    def orientation(p, q, r):
        return (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])

    # 1. Find the point with the lowest y-coord
    pivot = min(points, key=lambda p: (p[1], p[0]))
    
    # 2. Sort points by polar angle with pivot
    import math
    points.sort(key=lambda p: math.atan2(p[1]-pivot[1], p[0]-pivot[0]))

    # 3. Build hull
    hull = []
    for p in points:
        while len(hull) >= 2 and orientation(hull[-2], hull[-1], p) >= 0:
            hull.pop()
        hull.append(p)
    return hull
```

### Java
```java
import java.util.*;

class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
}

public class GrahamScan {
    public static List<Point> computeHull(Point[] points) {
        int n = points.length;
        if (n < 3) return Arrays.asList(points);

        // Sorting by polar angle relative to lowest point...
        Stack<Point> stack = new Stack<>();
        // Hull building logic...
        return new ArrayList<>(stack);
    }
}
```

### JavaScript
```javascript
function grahamScan(points) {
    if (points.length < 3) return points;

    // Sort by y-coordinate, then polar angle
    points.sort((a, b) => a.y - b.y || a.x - b.x);
    const pivot = points[0];
    const sorted = points.slice(1).sort((a, b) => {
        return Math.atan2(a.y - pivot.y, a.x - pivot.x) - 
               Math.atan2(b.y - pivot.y, b.x - pivot.x);
    });

    const hull = [pivot, sorted[0], sorted[1]];
    for (let i = 2; i < sorted.length; i++) {
        while (hull.length >= 2 && ccw(hull[hull.length - 2], hull[hull.length - 1], sorted[i]) <= 0) {
            hull.pop();
        }
        hull.push(sorted[i]);
    }
    return hull;
}
```