---
name: Hierholzer's Algorithm (Eulerian Path)
slug: eulerian-path-algorithm
category: Graph Theory
description: An efficient algorithm to find a path in a graph that visits every edge exactly once.
tags: [graph, traversal, eulerian, hierholzer, cycle]
difficulty: Medium
time_complexity:
    best: O(V + E)
    average: O(V + E)
    worst: O(V + E)
space_complexity: O(V + E)
---

## Overview
An **Eulerian Path** is a trail in a graph that visits every edge exactly once. If the path starts and ends at the same vertex, it is called an **Eulerian Circuit**. The problem of finding such a path dates back to Leonhard Euler and the "Seven Bridges of Königsberg." Unlike the Hamiltonian path (which visits every vertex), the Eulerian path is concerned with edges and can be solved in linear time.

## Intuition
The logic relies on the degree of vertices. In a connected graph, an Eulerian Circuit exists if every vertex has an even degree. An Eulerian Path exists if exactly zero or two vertices have an odd degree. Hierholzer's algorithm works by finding a simple cycle, then "splicing" in other cycles from unvisited edges until all edges are exhausted. It’s like drawing a complex shape without lifting your pen.



## How It Works
1.  **Verify**: Check if the graph satisfies the Eulerian conditions (connectivity and degree requirements).
2.  **Start**: Pick a starting vertex. If there are vertices with odd degrees, you must start at one of them.
3.  **Traverse**: Use a modified Depth-First Search (DFS). From the current vertex, pick an unvisited outgoing edge, move to the next vertex, and **remove** (or mark) that edge.
4.  **Backtrack**: When a vertex has no more unvisited edges, push that vertex onto a result stack.
5.  **Reverse**: Once the DFS is complete, the stack will contain the Eulerian path in reverse order. Pop the elements to get the correct sequence.



## Applications
* **Genome Assembly**: Reconstructing DNA sequences using De Bruijn graphs.
* **Network Routing**: Ensuring a maintenance vehicle covers every street in a city with minimum travel.
* **Circuit Design**: Optimizing the path of a laser or drill in manufacturing.
* **Snow Plowing**: Planning routes for snowplows or street sweepers to ensure full coverage.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <stack>
#include <algorithm>
#include <unordered_map>

std::vector<int> findEulerianPath(int n, std::unordered_map<int, std::vector<int>>& adj) {
    std::stack<int> st;
    std::vector<int> path;
    st.push(0); // Start node (assumed 0 here)

    while (!st.empty()) {
        int u = st.top();
        if (!adj[u].empty()) {
            int v = adj[u].back();
            adj[u].pop_back();
            st.push(v);
        } else {
            path.push_back(u);
            st.pop();
        }
    }
    std::reverse(path.begin(), path.end());
    return path;
}
```

### Python
```python
def find_eulerian_path(adj):
    stack = [next(iter(adj))] # Start at an arbitrary node
    path = []
    
    while stack:
        u = stack[-1]
        if adj[u]:
            v = adj[u].pop()
            stack.append(v)
        else:
            path.append(stack.pop())
            
    return path[::-1]
```

### Java
```java
import java.util.*;

public class EulerianPath {
    public List<Integer> getPath(Map<Integer, Stack<Integer>> adj, int startNode) {
        Stack<Integer> stack = new Stack<>();
        LinkedList<Integer> path = new LinkedList<>();
        
        stack.push(startNode);
        while (!stack.isEmpty()) {
            int u = stack.peek();
            if (adj.containsKey(u) && !adj.get(u).isEmpty()) {
                stack.push(adj.get(u).pop());
            } else {
                path.addFirst(stack.pop());
            }
        }
        return path;
    }
}
```

### JavaScript
```javascript
function findEulerianPath(adj, startNode) {
    const stack = [startNode];
    const path = [];

    while (stack.length > 0) {
        const u = stack[stack.length - 1];
        if (adj[u] && adj[u].length > 0) {
            const v = adj[u].pop();
            stack.push(v);
        } else {
            path.push(stack.pop());
        }
    }
    return path.reverse();
}
```