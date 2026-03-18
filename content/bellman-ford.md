---
name: Bellman-Ford Algorithm
slug: bellman-ford-algorithm
category: Graph Theory
description: A shortest-path algorithm that handles graphs with negative edge weights and detects negative cycles.
tags: [graph, shortest-path, dynamic-programming, negative-weights]
difficulty: Medium
time_complexity:
    best: O(E)
    average: O(V * E)
    worst: O(V * E)
space_complexity: O(V)
---

## Overview
The **Bellman-Ford Algorithm** computes the shortest paths from a single source vertex to all other vertices in a weighted digraph. While it is slower than Dijkstra's algorithm, it is more versatile because it can process graphs containing negative edge weights. Crucially, it is also used to detect the presence of **negative cycles**—loops where the total weight is less than zero—which would otherwise cause a shortest-path search to run infinitely.

## Intuition
The algorithm is based on the **principle of relaxation**. If we know that the distance from `A` to `B` is 10, and we find an edge from `B` to `C` with weight 2, then the distance to `C` is at most 12. Bellman-Ford simply repeats this check for every single edge in the graph. Since the longest possible path without a cycle has `V - 1` edges, we only need to relax all edges `V - 1` times to guarantee we've found the shortest paths.



## How It Works
1.  **Initialize**: Set the distance to the source vertex to 0 and all other vertices to `\infty`.
2.  **Relax Edges**: Repeat the following `V - 1` times (where `V` is the number of vertices):
    * For every edge `(u, v)` with weight `w`:
    * If `dist[u] + w < dist[v]`, then update `dist[v] = dist[u] + w`.
3.  **Check for Negative Cycles**: Run the relaxation step one more time.
    * If any distance can still be shortened (`dist[u] + w < dist[v]`), it means a negative cycle exists because a path is still getting "shorter" even after `V - 1` iterations.
4.  **Result**: If no negative cycle is found, the distance array contains the shortest paths.

## Applications
* **Distance Vector Routing**: Used in protocols like RIP (Routing Information Protocol) to find paths in a network.
* **Finance**: Detecting arbitrage opportunities by looking for negative cycles in currency exchange graphs.
* **Network Flow**: Used as a subroutine in algorithms like successive shortest path for Min-Cost Max-Flow.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <climits>

struct Edge {
    int u, v, weight;
};

bool bellmanFord(int V, int E, int src, std::vector<Edge>& edges, std::vector<int>& dist) {
    dist.assign(V, INT_MAX);
    dist[src] = 0;

    for (int i = 1; i <= V - 1; i++) {
        for (const auto& edge : edges) {
            if (dist[edge.u] != INT_MAX && dist[edge.u] + edge.weight < dist[edge.v]) {
                dist[edge.v] = dist[edge.u] + edge.weight;
            }
        }
    }

    for (const auto& edge : edges) {
        if (dist[edge.u] != INT_MAX && dist[edge.u] + edge.weight < dist[edge.v]) {
            return false; // Negative cycle detected
        }
    }
    return true;
}
```

### Python
```python
def bellman_ford(vertices, edges, src):
    dist = [float("inf")] * vertices
    dist[src] = 0

    for _ in range(vertices - 1):
        for u, v, w in edges:
            if dist[u] != float("inf") and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    for u, v, w in edges:
        if dist[u] != float("inf") and dist[u] + w < dist[v]:
            print("Graph contains negative weight cycle")
            return None

    return dist
```

### Java
```java
import java.util.*;

public class BellmanFord {
    class Edge { int u, v, w; }

    public void solve(int V, int E, int src, Edge[] edges) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        for (int i = 1; i < V; ++i) {
            for (Edge e : edges) {
                if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.w < dist[e.v])
                    dist[e.v] = dist[e.u] + e.w;
            }
        }

        for (Edge e : edges) {
            if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.w < dist[e.v])
                System.out.println("Negative cycle found");
        }
    }
}
```

### JavaScript
```javascript
function bellmanFord(vertices, edges, source) {
    let dist = Array(vertices).fill(Infinity);
    dist[source] = 0;

    for (let i = 0; i < vertices - 1; i++) {
        for (let [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    for (let [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            throw new Error("Negative weight cycle detected");
        }
    }

    return dist;
}
```