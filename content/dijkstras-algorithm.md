---
name: Dijkstra’s Algorithm
slug: dijkstras-algorithm
category: Graph Theory
description: A greedy algorithm that finds the shortest path from a single source vertex to all other vertices in a graph with non-negative edge weights.
tags: [graph, shortest-path, greedy, priority-queue]
difficulty: Medium
time_complexity:
    best: O(V + E log V)
    average: O(V + E log V)
    worst: O(V^2)
space_complexity: O(V)
---

## Overview
**Dijkstra's Algorithm** is the gold standard for finding the shortest path between nodes in a graph. It is a "single-source" shortest path algorithm, meaning it calculates the distance from one starting point to every other reachable node. It is famously used in network routing protocols and mapping software. Note that it only works correctly with **non-negative** edge weights.

## Intuition
Imagine you are at a central station and want to find the quickest way to all other stations. You start by looking at your immediate neighbors and recording their distances. You then always pick the "closest" station you haven't visited yet, go there, and check if you can find even shorter paths to its neighbors. By always expanding from the nearest known point, you guarantee that once you "visit" a station, you've found the absolute shortest path to it.



## How It Works
1.  **Initialize**: Set the distance to the source node to 0 and all other nodes to `\infty`. Mark all nodes as unvisited.
2.  **Priority Queue**: Put all nodes into a priority queue, ordered by their current distance.
3.  **Extract**: While the queue is not empty, extract the node `u` with the minimum distance.
4.  **Relaxation**: For every neighbor `v` of `u` that is still unvisited:
    * Calculate the tentative distance: `dist[u] + weight(u, v)`.
    * If this distance is less than the currently recorded `dist[v]`, update `dist[v]` with the new value.
5.  **Finalize**: Once a node is extracted from the queue, its shortest path is finalized.

## Applications
* **Digital Mapping**: Used in Google Maps or OpenStreetMap to find driving directions.
* **IP Routing**: Used in Link State routing protocols like OSPF (Open Shortest Path First).
* **Social Networks**: Finding the minimum number of connections between two users.
* **Robotic Motion**: Path planning for robots to navigate obstacles in a grid.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <queue>
#include <climits>

typedef std::pair<int, int> pii;

std::vector<int> dijkstra(int n, int start, const std::vector<std::vector<pii>>& adj) {
    std::vector<int> dist(n, INT_MAX);
    std::priority_queue<pii, std::vector<pii>, std::greater<pii>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

### Python
```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances
```

### Java
```java
import java.util.*;

public class Dijkstra {
    public int[] solve(int n, List<List<int[]>> adj, int start) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.add(new int[]{0, start});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[1];

            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.add(new int[]{dist[v], v});
                }
            }
        }
        return dist;
    }
}
```

### JavaScript
```javascript
function dijkstra(graph, start) {
    const distances = {};
    const pq = new MinPriorityQueue({ priority: (res) => res.dist });

    for (let node in graph) distances[node] = Infinity;
    distances[start] = 0;
    pq.enqueue({ node: start, dist: 0 });

    while (!pq.isEmpty()) {
        const { node: u, dist: d } = pq.dequeue();

        if (d > distances[u]) continue;

        for (let v in graph[u]) {
            let weight = graph[u][v];
            let newDist = distances[u] + weight;
            if (newDist < distances[v]) {
                distances[v] = newDist;
                pq.enqueue({ node: v, dist: newDist });
            }
        }
    }
    return distances;
}
```