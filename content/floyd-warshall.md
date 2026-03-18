---
name: Floyd-Warshall Algorithm
slug: floyd-warshall-algorithm
category: Graph Theory
description: A dynamic programming algorithm for finding shortest paths between all pairs of vertices in a weighted graph.
tags: [graph, dynamic-programming, shortest-path, matrix]
difficulty: Medium
time_complexity:
    best: O(V^3)
    average: O(V^3)
    worst: O(V^3)
space_complexity: O(V^2)
---

## Overview
The **Floyd-Warshall Algorithm** is a classic dynamic programming approach used to find the shortest distances between every pair of vertices in a directed or undirected weighted graph. Unlike Dijkstra's algorithm, which focuses on a single source, Floyd-Warshall computes a complete table of distances. It can handle negative edge weights, but the graph must not contain negative cycles.

## Intuition
The core idea is to gradually allow more vertices to serve as "intermediate" points on a path. We start by only considering direct edges. Then, we ask: "Can we find a shorter path between vertex `i` and vertex `j` if we are allowed to pass through vertex 1?" Next, we ask the same for vertex 2, and so on. By the time we have considered all vertices as potential intermediates, we have found the absolute shortest paths.



## How It Works
1.  **Initialize**: Create a distance matrix `D` of size `V \times V`. For every edge `(u, v)` with weight `w`, set `D[u][v] = w`. Set `D[i][i] = 0` and all other entries to `\infty`.
2.  **Iterate**: Use three nested loops to pick an intermediate vertex `k`, a source vertex `i`, and a destination vertex `j`.
3.  **Update**: For every pair `(i, j)`, check if the path through `k` is shorter than the current known path:
    ``D[i][j] = \min(D[i][j], D[i][k] + D[k][j])``
4.  **Repeat**: Continue this for every `k` from 1 to `V`.
5.  **Negative Cycles**: After the algorithm finishes, if any `D[i][i] < 0`, the graph contains a negative cycle.

## Applications
* **Network Routing**: Finding the shortest paths between all nodes in a communication network.
* **Transitive Closure**: Determining reachability in a directed graph (Warshall's version).
* **Currency Arbitrage**: Identifying profitable loops in exchange rates.
* **Urban Planning**: Analyzing travel times between all points in a city grid.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

const int INF = 1e9;

void floydWarshall(int V, std::vector<std::vector<int>>& dist) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = std::min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}
```

### Python
```python
def floyd_warshall(V, graph):
    # Initialize distance matrix
    dist = [[float('inf')] * V for _ in range(V)]
    for i in range(V):
        dist[i][i] = 0
        for neighbor, weight in graph[i].items():
            dist[i][neighbor] = weight

    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][j] > dist[i][k] + dist[k][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist
```

### Java
```java
public class FloydWarshall {
    final static int INF = 99999;

    public void solve(int V, int[][] dist) {
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }
}
```

### JavaScript
```javascript
function floydWarshall(V, matrix) {
    let dist = Array.from({ length: V }, (_, i) => 
        Array.from({ length: V }, (_, j) => matrix[i][j])
    );

    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}
```