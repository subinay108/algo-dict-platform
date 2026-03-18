---
name: Breadth-First Search (BFS)
slug: breadth-first-search
category: Graph Theory
description: A graph traversal algorithm that explores all neighbor nodes at the present depth before moving to nodes at the next depth level.
tags: [graph, traversal, search, queue, connectivity]
difficulty: Easy
time_complexity:
    best: O(V + E)
    average: O(V + E)
    worst: O(V + E)
space_complexity: O(V)
---

## Overview
**Breadth-First Search (BFS)** is a fundamental algorithm for traversing or searching tree or graph data structures. It starts at a selected node (the 'source') and explores all of its neighbor nodes at the current depth prior to moving on to the nodes at the next depth level. It is the primary algorithm used to find the shortest path in an unweighted graph.

## Intuition
Imagine dropping a stone into a still pond. The ripples expand outward in perfect circles, hitting everything at a distance of 1 foot, then everything at a distance of 2 feet, and so on. BFS works exactly like those ripples. It visits nodes in "layers" based on their distance from the starting point, ensuring that it never misses a closer node before venturing further away.



## How It Works
1.  **Initialize**: Create an empty **Queue** and a way to track **Visited** nodes (usually a boolean array or a set).
2.  **Start**: Mark the source node as visited and enqueue it.
3.  **Loop**: While the queue is not empty:
    * Dequeue the front node `u`.
    * For each neighbor `v` of `u`:
        * If `v` has not been visited:
            * Mark `v` as visited.
            * Enqueue `v`.
            * (Optional) Record `u` as the parent of `v` to reconstruct the path later.
4.  **Completion**: The process continues until the queue is empty, meaning all reachable nodes have been visited.

## Applications
* **Shortest Path**: Finding the minimum number of edges between two nodes in an unweighted graph.
* **Social Networking**: Finding "friends of friends" or degrees of separation.
* **Web Crawlers**: Indexing web pages by following links layer by layer.
* **Garbage Collection**: Identifying reachable objects in memory (Cheney's algorithm).

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <vector>
#include <queue>

void bfs(int startNode, const std::vector<std::vector<int>>& adj) {
    std::vector<bool> visited(adj.size(), false);
    std::queue<int> q;

    visited[startNode] = true;
    q.push(startNode);

    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        
        for (int neighbor : adj[curr]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

### Python
```python
from collections import deque

def bfs(graph, start_node):
    visited = {start_node}
    queue = deque([start_node])

    while queue:
        vertex = queue.popleft()
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

### Java
```java
import java.util.*;

public class BFS {
    public void traverse(int start, List<List<Integer>> adj) {
        boolean[] visited = new boolean[adj.size()];
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.add(start);

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
    }
}
```

### JavaScript
```javascript
function bfs(graph, startNode) {
    const visited = new Set([startNode]);
    const queue = [startNode];

    while (queue.length > 0) {
        const curr = queue.shift();

        for (const neighbor of graph[curr]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```