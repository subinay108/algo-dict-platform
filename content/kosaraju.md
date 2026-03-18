---
name: Kosaraju’s Algorithm
slug: kosarajus-algorithm
category: Graph Theory
description: A depth-first search-based algorithm to find all strongly connected components (SCCs) in a directed graph.
tags: [graph, scc, dfs, connectivity, directed-graph]
difficulty: Hard
time_complexity:
    best: O(V + E)
    average: O(V + E)
    worst: O(V + E)
space_complexity: O(V)
---

## Overview
**Kosaraju’s Algorithm** is an efficient linear-time method used to find the **Strongly Connected Components (SCCs)** of a directed graph. An SCC is a sub-portion of a graph where every vertex is reachable from every other vertex in that same sub-portion. The algorithm is noted for its simplicity and its clever use of the graph's transpose (reversing all edges).

## Intuition
The "strength" of a component lies in its cycles. If you can go from A to B and B to A, they are in the same SCC. Kosaraju’s uses a two-pass approach. The first pass establishes a "finishing order" (similar to topological sort) which tells us which components are "downstream." By reversing the edges in the second pass and processing nodes in the reverse finishing order, we isolate these components, preventing the search from "leaking" into other SCCs.



## How It Works
1.  **First DFS Pass**: Perform a standard DFS traversal of the graph. As each node finishes its recursive calls (post-order), push it onto a **stack**. This stack now represents the nodes ordered by their finish times.
2.  **Transpose the Graph**: Create a new graph where the direction of every edge is reversed.
3.  **Second DFS Pass**: While the stack is not empty:
    * Pop a node `u`.
    * If `u` has not been visited in this pass, it is the root of a new SCC.
    * Perform a DFS starting from `u` on the **transposed graph**.
    * Every node reached in this DFS traversal belongs to the same SCC.



## Applications
* **Social Network Analysis**: Finding groups of people where everyone follows everyone else (directly or indirectly).
* **Software Engineering**: Identifying circular dependencies in package modules or class structures.
* **Optimization**: Reducing a complex directed graph into a Directed Acyclic Graph (DAG) of its SCCs to simplify pathfinding.
* **Search Engines**: Analyzing link structures to find clusters of highly related web pages.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <stack>
#include <algorithm>

void dfs1(int u, std::vector<std::vector<int>>& adj, std::vector<bool>& visited, std::stack<int>& st) {
    visited[u] = true;
    for (int v : adj[u]) if (!visited[v]) dfs1(v, adj, visited, st);
    st.push(u);
}

void dfs2(int u, std::vector<std::vector<int>>& adjT, std::vector<bool>& visited, std::vector<int>& component) {
    visited[u] = true;
    component.push_back(u);
    for (int v : adjT[u]) if (!visited[v]) dfs2(v, adjT, visited, component);
}

std::vector<std::vector<int>> getSCCs(int V, std::vector<std::vector<int>>& adj) {
    std::stack<int> st;
    std::vector<bool> visited(V, false);
    for (int i = 0; i < V; i++) if (!visited[i]) dfs1(i, adj, visited, st);

    std::vector<std::vector<int>> adjT(V);
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) adjT[v].push_back(u);
    }

    std::fill(visited.begin(), visited.end(), false);
    std::vector<std::vector<int>> sccs;
    while (!st.empty()) {
        int u = st.top(); st.pop();
        if (!visited[u]) {
            std::vector<int> component;
            dfs2(u, adjT, visited, component);
            sccs.push_back(component);
        }
    }
    return sccs;
}
```

### Python
```python
def kosaraju(V, adj):
    stack = []
    visited = [False] * V

    def dfs1(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]: dfs1(v)
        stack.append(u)

    def dfs2(u, component, adj_t):
        visited[u] = True
        component.append(u)
        for v in adj_t[u]:
            if not visited[v]: dfs2(v, component, adj_t)

    # First pass
    for i in range(V):
        if not visited[i]: dfs1(i)

    # Transpose
    adj_t = [[] for _ in range(V)]
    for u in range(V):
        for v in adj[u]: adj_t[v].append(u)

    # Second pass
    visited = [False] * V
    sccs = []
    while stack:
        u = stack.pop()
        if not visited[u]:
            component = []
            dfs2(u, component, adj_t)
            sccs.append(component)
    return sccs
```

### Java
```java
import java.util.*;

public class Kosaraju {
    private void dfs(int u, List<List<Integer>> adj, boolean[] visited, Stack<Integer> st) {
        visited[u] = true;
        for (int v : adj.get(u)) if (!visited[v]) dfs(v, adj, visited, st);
        if (st != null) st.push(u);
    }

    public List<List<Integer>> findSCCs(int V, List<List<Integer>> adj) {
        Stack<Integer> st = new Stack<>();
        boolean[] visited = new boolean[V];
        for (int i = 0; i < V; i++) if (!visited[i]) dfs(i, adj, visited, st);

        List<List<Integer>> adjT = new ArrayList<>();
        for (int i = 0; i < V; i++) adjT.add(new ArrayList<>());
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) adjT.get(v).add(u);
        }

        Arrays.fill(visited, false);
        List<List<Integer>> sccs = new ArrayList<>();
        while (!st.isEmpty()) {
            int u = st.pop();
            if (!visited[u]) {
                List<Integer> component = new ArrayList<>();
                dfsCollect(u, adjT, visited, component);
                sccs.add(component);
            }
        }
        return sccs;
    }

    private void dfsCollect(int u, List<List<Integer>> adjT, boolean[] visited, List<Integer> comp) {
        visited[u] = true;
        comp.add(u);
        for (int v : adjT.get(u)) if (!visited[v]) dfsCollect(v, adjT, visited, comp);
    }
}
```

### JavaScript
```javascript
function kosaraju(V, adj) {
    const stack = [];
    let visited = new Array(V).fill(false);

    function dfs1(u) {
        visited[u] = true;
        for (const v of adj[u]) {
            if (!visited[v]) dfs1(v);
        }
        stack.push(u);
    }

    function dfs2(u, component, adjT) {
        visited[u] = true;
        component.push(u);
        for (const v of adjT[u]) {
            if (!visited[v]) dfs2(v, component, adjT);
        }
    }

    for (let i = 0; i < V; i++) if (!visited[i]) dfs1(i);

    const adjT = Array.from({ length: V }, () => []);
    for (let u = 0; u < V; u++) {
        for (const v of adj[u]) adjT[v].push(u);
    }

    visited.fill(false);
    const sccs = [];
    while (stack.length > 0) {
        const u = stack.pop();
        if (!visited[u]) {
            const component = [];
            dfs2(u, component, adjT);
            sccs.push(component);
        }
    }
    return sccs;
}
```