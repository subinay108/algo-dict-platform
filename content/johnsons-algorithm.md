---
name: Johnson’s Algorithm
slug: johnsons-algorithm
category: Graph Theory
description: An all-pairs shortest path algorithm designed for sparse graphs that handles negative edge weights using reweighting.
tags: [graph, shortest-path, bellman-ford, dijkstra, reweighting]
difficulty: Hard
time_complexity:
    best: O(V^2 log V + VE)
    average: O(V^2 log V + VE)
    worst: O(V^2 log V + VE)
space_complexity: O(V^2)
---

## Overview
**Johnson’s Algorithm** is an efficient way to find the shortest paths between all pairs of vertices in a weighted, directed graph. It is particularly powerful for **sparse graphs** (graphs with fewer edges). While the Floyd-Warshall algorithm is the go-to for dense graphs, Johnson’s outperforms it by cleverly combining the **Bellman-Ford** algorithm and **Dijkstra’s** algorithm through a technique called "reweighting."

## Intuition
Dijkstra’s algorithm is much faster than Bellman-Ford, but it cannot handle negative edge weights. Johnson’s algorithm "fixes" the graph by adding a constant to edges in a way that makes all weights non-negative without changing which path is the shortest. It achieves this by calculating a set of potentials for each vertex. Once the graph is "safe," we can run Dijkstra’s from every vertex to get the final results.



## How It Works
1.  **Augment the Graph**: Add a new source vertex `q` to the graph and add edges with weight 0 from `q` to every other vertex.
2.  **Calculate Potentials**: Run the **Bellman-Ford** algorithm starting from `q` to find the shortest distance `h(u)` to every vertex `u`. If a negative cycle is detected, the algorithm terminates.
3.  **Reweight**: Transform every edge `(u, v)` with weight `w` into a new weight `\hat{w}`:
    ``\hat{w}(u, v) = w(u, v) + h(u) - h(v)``
    This ensures `\hat{w}(u, v) \geq 0`.
4.  **Run Dijkstra**: Remove vertex `q` and run **Dijkstra’s** algorithm from every vertex `u` in the reweighted graph to find distances `\hat{d}(u, v)`.
5.  **Finalize Distances**: Convert the reweighted distances back to the original distances:
    ``d(u, v) = \hat{d}(u, v) + h(v) - h(u)``

## Applications
* **Traffic Engineering**: Calculating optimal routes between all intersections in a large but sparse city road network.
* **Telecommunications**: Finding all-pairs latency in distributed networks.
* **Social Network Analysis**: Computing closeness centrality and average path lengths in large social graphs.
* **Operations Research**: Solving complex scheduling and routing problems where edge costs might represent offsets or penalties.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <climits>
#include <queue>

typedef std::pair<int, int> pii;
const int INF = INT_MAX;

void johnsonsAlgorithm(int V, std::vector<std::vector<pii>>& adj) {
    // 1. Add source q and run Bellman-Ford
    std::vector<int> h(V + 1, 0);
    // ... Bellman-Ford logic ...

    // 2. Reweight edges
    for (int u = 0; u < V; u++) {
        for (auto& edge : adj[u]) {
            edge.second = edge.second + h[u] - h[edge.first];
        }
    }

    // 3. Run Dijkstra from each vertex
    for (int i = 0; i < V; i++) {
        // ... Dijkstra(i) ...
    }
}
```

### Python
```python
import heapq

def dijkstra(adj, src, V):
    dist = [float('inf')] * V
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist

def johnson(V, edges):
    # Step 1: Bellman-Ford on augmented graph
    h = [0] * V # Simplified potential calculation
    
    # Step 2: Reweight
    new_adj = [[] for _ in range(V)]
    for u, v, w in edges:
        new_adj[u].append((v, w + h[u] - h[v]))
        
    # Step 3: All-pairs Dijkstra
    distances = []
    for i in range(V):
        d_hat = dijkstra(new_adj, i, V)
        # Finalize: d(u,v) = d_hat(u,v) + h[v] - h[u]
        distances.append([d + h[j] - h[i] for j, d in enumerate(d_hat)])
    return distances
```

### Java
```java
import java.util.*;

public class JohnsonsAlgorithm {
    static final int INF = Integer.MAX_VALUE;

    public void solve(int V, List<List<int[]>> adj) {
        // Step 1: Run Bellman-Ford to get h[]
        int[] h = new int[V]; 
        
        // Step 2: Reweight the edges
        for (int u = 0; u < V; u++) {
            for (int[] edge : adj.get(u)) {
                edge[1] = edge[1] + h[u] - h[edge[0]];
            }
        }

        // Step 3: Run Dijkstra for every vertex
        for (int i = 0; i < V; i++) {
            // dijkstra(i);
        }
    }
}
```

### JavaScript
```javascript
function johnsonsAlgorithm(V, edges) {
    const h = new Array(V).fill(0); // Assume potentials from Bellman-Ford
    
    const adj = Array.from({ length: V }, () => []);
    edges.forEach(([u, v, w]) => {
        // Reweight logic
        adj[u].push([v, w + h[u] - h[v]]);
    });

    const results = [];
    for (let i = 0; i < V; i++) {
        const d_hat = dijkstra(V, adj, i);
        results.push(d_hat.map((d, j) => d + h[j] - h[i]));
    }
    return results;
}
```