---
name: Dinic's Algorithm
slug: dinics-algorithm
category: Graph Theory
description: A strongly polynomial algorithm for computing the maximum flow in a network using level graphs and blocking flows.
tags: [graph, max-flow, network-flow, level-graph, blocking-flow]
difficulty: Hard
time_complexity:
    best: O(V^2 E)
    average: O(V^2 E)
    worst: O(V^2 E)
space_complexity: O(V + E)
---

## Overview
**Dinic's Algorithm** is a sophisticated method for solving the maximum flow problem in a flow network. It improves upon the Edmonds-Karp algorithm by using two key concepts: **Level Graphs** and **Blocking Flows**. By grouping nodes into layers based on their distance from the source, it can push multiple augmenting paths in a single phase, significantly reducing the number of traversals required.

## Intuition
Imagine a network of pipes. Instead of finding one path at a time, Dinic’s builds a "map" (the Level Graph) that shows only the shortest paths toward the exit. It then pushes as much water as possible through this map until no more can fit (the Blocking Flow). Once that map is "blocked," it rebuilds a new, updated map and repeats the process. This "layered" approach prevents the algorithm from wasting time on inefficient, roundabout paths.



## How It Works
1.  **Level Graph Construction (BFS)**: Use Breadth-First Search to assign a "level" to each node, defined as its shortest distance from the source in the residual graph. If the sink cannot be reached, the algorithm terminates.
2.  **Find Blocking Flow (DFS)**: In the level graph, use Depth-First Search to find augmenting paths. A key constraint is that the DFS can only move from a node at level `i` to a node at level `i+1`. 
3.  **Update Residuals**: As paths are found, subtract the flow from capacity in the forward edges and add it to the reverse edges.
4.  **Repeat**: Rebuild the level graph and repeat until the sink is no longer reachable from the source.
5.  **Complexity Note**: For unit networks (like bipartite matching), the complexity improves to `O(E\sqrt{V})`.

## Applications
* **Bipartite Matching**: Finding the maximum number of matches between two groups.
* **Image Segmentation**: Separating foreground from background in computer vision.
* **Circulation Problems**: Managing supply and demand across various nodes.
* **Airline Scheduling**: Assigning crews and planes to flights efficiently.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <queue>
#include <algorithm>

struct Edge {
    int to, rev, capacity, flow;
};

class Dinic {
    std::vector<std::vector<Edge>> adj;
    std::vector<int> level, ptr;

public:
    Dinic(int n) : adj(n), level(n), ptr(n) {}

    void addEdge(int from, int to, int cap) {
        adj[from].push_back({to, (int)adj[to].size(), cap, 0});
        adj[to].push_back({from, (int)adj[from].size() - 1, 0, 0});
    }

    bool bfs(int s, int t) {
        std::fill(level.begin(), level.end(), -1);
        level[s] = 0;
        std::queue<int> q;
        q.push(s);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (auto& edge : adj[v]) {
                if (edge.capacity - edge.flow > 0 && level[edge.to] == -1) {
                    level[edge.to] = level[v] + 1;
                    q.push(edge.to);
                }
            }
        }
        return level[t] != -1;
    }

    int dfs(int v, int t, int pushed) {
        if (pushed == 0 || v == t) return pushed;
        for (int& cid = ptr[v]; cid < adj[v].size(); ++cid) {
            auto& edge = adj[v][cid];
            int tr = edge.to;
            if (level[v] + 1 != level[tr] || edge.capacity - edge.flow == 0) continue;
            int push = dfs(tr, t, std::min(pushed, edge.capacity - edge.flow));
            if (push == 0) continue;
            edge.flow += push;
            adj[tr][edge.rev].flow -= push;
            return push;
        }
        return 0;
    }

    long long maxFlow(int s, int t) {
        long long flow = 0;
        while (bfs(s, t)) {
            std::fill(ptr.begin(), ptr.end(), 0);
            while (int pushed = dfs(s, t, 1e9)) flow += pushed;
        }
        return flow;
    }
};
```

### Python
```python
from collections import deque

class Dinic:
    def __init__(self, n):
        self.n = n
        self.graph = [[] for _ in range(n)]
        self.level = []

    def add_edge(self, u, v, capacity):
        self.graph[u].append([v, capacity, len(self.graph[v])])
        self.graph[v].append([u, 0, len(self.graph[u]) - 1])

    def bfs(self, s, t):
        self.level = [-1] * self.n
        self.level[s] = 0
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v, cap, rev in self.graph[u]:
                if cap > 0 and self.level[v] < 0:
                    self.level[v] = self.level[u] + 1
                    queue.append(v)
        return self.level[t] >= 0

    def dfs(self, u, t, flow, ptr):
        if u == t or flow == 0:
            return flow
        for i in range(ptr[u], len(self.graph[u])):
            ptr[u] = i
            v, cap, rev = self.graph[u][i]
            if self.level[v] == self.level[u] + 1 and cap > 0:
                pushed = self.dfs(v, t, min(flow, cap), ptr)
                if pushed > 0:
                    self.graph[u][i][1] -= pushed
                    self.graph[v][rev][1] += pushed
                    return pushed
        return 0

    def max_flow(self, s, t):
        max_f = 0
        while self.bfs(s, t):
            ptr = [0] * self.n
            while True:
                pushed = self.dfs(s, t, float('inf'), ptr)
                if pushed == 0:
                    break
                max_f += pushed
        return max_f
```

### Java
```java
import java.util.*;

class Dinic {
    static class Edge {
        int to, rev, cap, flow;
        Edge(int to, int rev, int cap) {
            this.to = to; this.rev = rev; this.cap = cap;
        }
    }

    List<Edge>[] adj;
    int[] level, ptr;

    public Dinic(int n) {
        adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        level = new int[n];
        ptr = new int[n];
    }

    public void addEdge(int from, int to, int cap) {
        adj[from].add(new Edge(to, adj[to].size(), cap));
        adj[to].add(new Edge(from, adj[from].size() - 1, 0));
    }

    private boolean bfs(int s, int t) {
        Arrays.fill(level, -1);
        level[s] = 0;
        Queue<Integer> q = new LinkedList<>();
        q.add(s);
        while (!q.isEmpty()) {
            int v = q.poll();
            for (Edge e : adj[v]) {
                if (e.cap - e.flow > 0 && level[e.to] == -1) {
                    level[e.to] = level[v] + 1;
                    q.add(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    private int dfs(int v, int t, int pushed) {
        if (pushed == 0 || v == t) return pushed;
        for (int i = ptr[v]; i < adj[v].size(); i++) {
            ptr[v] = i;
            Edge e = adj[v].get(i);
            if (level[v] + 1 != level[e.to] || e.cap - e.flow == 0) continue;
            int tr = dfs(e.to, t, Math.min(pushed, e.cap - e.flow));
            if (tr == 0) continue;
            e.flow += tr;
            adj[e.to].get(e.rev).flow -= tr;
            return tr;
        }
        return 0;
    }

    public long maxFlow(int s, int t) {
        long flow = 0;
        while (bfs(s, t)) {
            Arrays.fill(ptr, 0);
            while (true) {
                int pushed = dfs(s, t, Integer.MAX_VALUE);
                if (pushed == 0) break;
                flow += pushed;
            }
        }
        return flow;
    }
}
```

### JavaScript
```javascript
class Dinic {
    constructor(n) {
        this.n = n;
        this.adj = Array.from({ length: n }, () => []);
        this.level = new Array(n);
        this.ptr = new Array(n);
    }

    addEdge(from, to, cap) {
        this.adj[from].push({ to, rev: this.adj[to].length, cap, flow: 0 });
        this.adj[to].push({ to: from, rev: this.adj[from].length - 1, cap: 0, flow: 0 });
    }

    bfs(s, t) {
        this.level.fill(-1);
        this.level[s] = 0;
        let q = [s];
        while (q.length > 0) {
            let v = q.shift();
            for (let edge of this.adj[v]) {
                if (edge.cap - edge.flow > 0 && this.level[edge.to] === -1) {
                    this.level[edge.to] = this.level[v] + 1;
                    q.push(edge.to);
                }
            }
        }
        return this.level[t] !== -1;
    }

    dfs(v, t, pushed) {
        if (pushed === 0 || v === t) return pushed;
        for (let i = this.ptr[v]; i < this.adj[v].length; i++) {
            this.ptr[v] = i;
            let edge = this.adj[v][i];
            if (this.level[v] + 1 !== this.level[edge.to] || edge.cap - edge.flow === 0) continue;
            let tr = this.dfs(edge.to, t, Math.min(pushed, edge.cap - edge.flow));
            if (tr === 0) continue;
            edge.flow += tr;
            this.adj[edge.to][edge.rev].flow -= tr;
            return tr;
        }
        return 0;
    }

    maxFlow(s, t) {
        let flow = 0;
        while (this.bfs(s, t)) {
            this.ptr.fill(0);
            while (true) {
                let pushed = this.dfs(s, t, Infinity);
                if (pushed === 0) break;
                flow += pushed;
            }
        }
        return flow;
    }
}
```