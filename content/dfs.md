---
name: Depth-First Search (DFS)
slug: depth-first-search
category: Graph Theory
description: A graph traversal algorithm that explores as far as possible along each branch before backtracking.
tags: [graph, traversal, recursion, stack, connectivity]
difficulty: Easy
time_complexity:
    best: O(V + E)
    average: O(V + E)
    worst: O(V + E)
space_complexity: O(V)
---

## Overview
**Depth-First Search (DFS)** is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root in the case of a graph) and explores as far as possible along each branch before backtracking. It is a fundamental building block for many complex graph algorithms like finding strongly connected components or solving puzzles.

## Intuition
Imagine you are navigating a maze. To ensure you don't get lost, you follow a simple rule: always take the leftmost path available. When you hit a dead end, you backtrack to the last junction where you could have taken a different turn and try the next available path. This "go deep until you can't" strategy is exactly how DFS operates, using a stack to remember where to return.



## How It Works
1.  **Initialize**: Create a way to track **Visited** nodes (usually a boolean array or a set) to avoid infinite loops in cycles.
2.  **Start**: Pick a starting node, mark it as visited, and push it onto a **Stack** (or use the call stack in recursion).
3.  **Recursive Step**:
    * For the current node, look at all its adjacent neighbors.
    * If a neighbor has not been visited, recursively call the DFS function for that neighbor.
4.  **Backtrack**: If all neighbors of the current node have been visited (or it has no neighbors), return to the previous node in the stack and continue the process for its remaining neighbors.
5.  **Termination**: The algorithm finishes when the stack is empty and all reachable nodes have been visited.

## Applications
* **Pathfinding**: Finding a path between two nodes (though not necessarily the shortest).
* **Topological Sorting**: Ordering tasks with dependencies (e.g., build systems).
* **Cycle Detection**: Checking if a graph contains any loops.
* **Solving Puzzles**: Finding solutions to mazes or Sudoku by exploring possible moves.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <iostream>

void dfs(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {
    visited[u] = true;
    // Process node u here
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, adj, visited);
        }
    }
}
```

### Python
```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    # Process current node here
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited
```

### Java
```java
import java.util.*;

public class DFS {
    public void traverse(int u, List<List<Integer>> adj, boolean[] visited) {
        visited[u] = true;
        // Process node u
        
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                traverse(v, adj, visited);
            }
        }
    }
}
```

### JavaScript
```javascript
function dfs(node, adj, visited = new Set()) {
    visited.add(node);
    // Process node here
    
    for (const neighbor of adj[node]) {
        if (!visited.has(neighbor)) {
            dfs(neighbor, adj, visited);
        }
    }
    return visited;
}
```