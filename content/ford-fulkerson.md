---
name: Ford-Fulkerson Algorithm
slug: ford-fulkerson-algorithm
category: Graph Theory
description: A fundamental method for calculating the maximum flow in a network by iteratively finding augmenting paths.
tags: [graph, max-flow, network-flow, greedy, residual-graph]
difficulty: Hard
time_complexity:
    best: O(E * f)
    average: O(E * f)
    worst: O(E * f)
space_complexity: O(V + E)
---

## Overview
The **Ford-Fulkerson Algorithm** is a greedy approach used to solve the **Maximum Flow** problem. It calculates the maximum amount of "flow" (like water, traffic, or data) that can be sent from a source node to a sink node through a network of edges with specific capacities. The algorithm is the foundation for more optimized versions like Edmonds-Karp and Dinic's algorithm.

## Intuition
Imagine a network of water pipes with different diameters. To find out how much water you can send from the start to the end, you look for any path that isn't full yet (an "augmenting path"). You push as much water as possible through that path until it's "saturated." You repeat this process, but with a twist: you keep track of "residual" capacity, which allows you to "undo" or redirect flow if you find a better path later.



## How It Works
1.  **Initialize**: Set the initial flow in all edges to 0.
2.  **Residual Graph**: Create a residual graph that shows how much capacity is left on each edge. If an edge has capacity `C` and current flow `f`, the residual capacity is `C - f`. It also adds reverse edges with capacity `f` to allow flow redirection.
3.  **Find Path**: While there is a path from the source (`S`) to the sink (`T`) in the residual graph with available capacity:
    * Find the "bottleneck" capacity (the minimum residual capacity along that path).
    * Increase the flow along the path by this bottleneck value.
    * Update the residual capacities: subtract the bottleneck from forward edges and add it to the reverse edges.
4.  **Terminate**: When no more paths can be found, the total flow sent is the maximum flow.

## Applications
* **Data Networking**: Calculating maximum bandwidth between two points.
* **Bipartite Matching**: Finding the maximum number of pairs (e.g., jobs to workers).
* **Circulation Problems**: Managing supply chain logistics where nodes have demands.
* **Reliability Analysis**: Determining the minimum number of edges to remove to disconnect a network (Max-Flow Min-Cut Theorem).

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <string.h>

bool bfs(int rGraph[V][V], int s, int t, int parent[]) {
    bool visited[V];
    memset(visited, 0, sizeof(visited));
    std::queue<int> q;
    q.push(s);
    visited[s] = true;
    parent[s] = -1;

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v = 0; v < V; v++) {
            if (!visited[v] && rGraph[u][v] > 0) {
                if (v == t) {
                    parent[v] = u;
                    return true;
                }
                q.push(v);
                parent[v] = u;
                visited[v] = true;
            }
        }
    }
    return false;
}

int fordFulkerson(int graph[V][V], int s, int t) {
    int u, v, rGraph[V][V];
    for (u = 0; u < V; u++)
        for (v = 0; v < V; v++)
            rGraph[u][v] = graph[u][v];

    int parent[V], max_flow = 0;
    while (bfs(rGraph, s, t, parent)) {
        int path_flow = INT_MAX;
        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            path_flow = std::min(path_flow, rGraph[u][v]);
        }
        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            rGraph[u][v] -= path_flow;
            rGraph[v][u] += path_flow;
        }
        max_flow += path_flow;
    }
    return max_flow;
}
```

### Python
```python
def dfs(graph, s, t, visited, parent):
    visited[s] = True
    if s == t:
        return True
    for v, cap in enumerate(graph[s]):
        if not visited[v] and cap > 0:
            parent[v] = s
            if dfs(graph, v, t, visited, parent):
                return True
    return False

def ford_fulkerson(graph, source, sink):
    parent = [-1] * len(graph)
    max_flow = 0
    
    while True:
        visited = [False] * len(graph)
        if not dfs(graph, source, sink, visited, parent):
            break
            
        path_flow = float('inf')
        s = sink
        while s != source:
            path_flow = min(path_flow, graph[parent[s]][s])
            s = parent[s]
            
        max_flow += path_flow
        v = sink
        while v != source:
            u = parent[v]
            graph[u][v] -= path_flow
            graph[v][u] += path_flow
            v = parent[v]
            
    return max_flow
```

### Java
```java
import java.util.*;

public class FordFulkerson {
    public int solve(int[][] graph, int s, int t) {
        int u, v;
        int[][] rGraph = new int[graph.length][graph.length];
        for (u = 0; u < graph.length; u++)
            for (v = 0; v < graph.length; v++)
                rGraph[u][v] = graph[u][v];

        int[] parent = new int[graph.length];
        int maxFlow = 0;

        while (hasPath(rGraph, s, t, parent)) {
            int pathFlow = Integer.MAX_VALUE;
            for (v = t; v != s; v = parent[v]) {
                u = parent[v];
                pathFlow = Math.min(pathFlow, rGraph[u][v]);
            }
            for (v = t; v != s; v = parent[v]) {
                u = parent[v];
                rGraph[u][v] -= pathFlow;
                rGraph[v][u] += pathFlow;
            }
            maxFlow += pathFlow;
        }
        return maxFlow;
    }
}
```

### JavaScript
```javascript
function fordFulkerson(graph, source, sink) {
  let maxFlow = 0;
  const parent = [];
  const rGraph = graph.map(row => [...row]);

  const bfs = (s, t) => {
    const visited = new Array(graph.length).fill(false);
    const queue = [s];
    visited[s] = true;
    while (queue.length > 0) {
      const u = queue.shift();
      for (let v = 0; v < rGraph.length; v++) {
        if (!visited[v] && rGraph[u][v] > 0) {
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
          if (v === t) return true;
        }
      }
    }
    return false;
  };

  while (bfs(source, sink)) {
    let pathFlow = Infinity;
    for (let v = sink; v !== source; v = parent[v]) {
      let u = parent[v];
      pathFlow = Math.min(pathFlow, rGraph[u][v]);
    }
    for (let v = sink; v !== source; v = parent[v]) {
      let u = parent[v];
      rGraph[u][v] -= pathFlow;
      rGraph[v][u] += pathFlow;
    }
    maxFlow += pathFlow;
  }
  return maxFlow;
}
```