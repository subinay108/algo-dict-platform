---
name: Kruskal’s Algorithm
slug: kruskals-algorithm
category: Graph Theory
description: A greedy algorithm that finds a Minimum Spanning Tree (MST) for a connected weighted graph by adding edges in increasing order of weight.
tags: [graph, mst, greedy, union-find, disjoint-set]
difficulty: Medium
time_complexity:
    best: O(E log E)
    average: O(E log E)
    worst: O(E log E)
space_complexity: O(V + E)
---

## Overview
**Kruskal's Algorithm** is a fundamental greedy algorithm used to find the **Minimum Spanning Tree (MST)** of a connected, undirected, weighted graph. An MST is a subset of the edges that connects all vertices together, without any cycles, and with the minimum possible total edge weight. Unlike Prim's algorithm, which grows a single tree from a starting node, Kruskal's builds the tree by considering all edges independently.

## Intuition
Imagine you want to connect several cities with fiber-optic cables at the lowest possible cost. Kruskal's approach is to look at a list of all possible connections (edges) ranked from cheapest to most expensive. You start picking the cheapest cables one by one. The only rule is: **never add a cable that completes a circle (cycle)** between cities that are already connected. By the time everyone is connected, you have used the least amount of cable possible.



## How It Works
The algorithm relies heavily on the **Disjoint Set Union (DSU)** data structure to efficiently check for cycles.

1.  **Sort**: Sort all the edges of the graph in non-descending order of their weights.
2.  **Initialize**: Create a forest (a set of trees), where each vertex in the graph is initially a separate tree.
3.  **Iterate**: For each sorted edge `(u, v)` with weight `w`:
    * Use the **Find** operation of the DSU to check if `u` and `v` belong to the same tree.
    * If they belong to different trees, add the edge to the MST and perform a **Union** operation to merge the two trees.
    * If they are already in the same tree, discard the edge to avoid creating a cycle.
4.  **Terminate**: Stop when there are `V - 1` edges in the MST or all edges have been processed.



## Applications
* **Network Design**: Designing telecommunication, electrical, or water supply networks with minimum cost.
* **Clustering**: In data mining, Kruskal's can be used for Single-Linkage Clustering by stopping before all nodes are connected.
* **Circuit Design**: Laying out components on a circuit board to minimize wire length.
* **Approximation Algorithms**: Serving as a building block for solving the Traveling Salesperson Problem (TSP).

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>

struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const { return weight < other.weight; }
};

struct DSU {
    std::vector<int> parent;
    DSU(int n) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    void unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i != root_j) parent[root_i] = root_j;
    }
};

std::vector<Edge> kruskal(int n, std::vector<Edge>& edges) {
    std::sort(edges.begin(), edges.end());
    DSU dsu(n);
    std::vector<Edge> mst;
    for (auto& edge : edges) {
        if (dsu.find(edge.u) != dsu.find(edge.v)) {
            dsu.unite(edge.u, edge.v);
            mst.push_back(edge);
        }
    }
    return mst;
}
```

### Python
```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j
            return True
        return False

def kruskal(n, edges):
    # edges is a list of (u, v, weight)
    edges.sort(key=lambda x: x[2])
    dsu = DSU(n)
    mst = []
    for u, v, w in edges:
        if dsu.union(u, v):
            mst.append((u, v, w))
    return mst
```

### Java
```java
import java.util.*;

class Edge implements Comparable<Edge> {
    int u, v, weight;
    public int compareTo(Edge other) { return this.weight - other.weight; }
}

public class Kruskal {
    int[] parent;
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }

    public List<Edge> findMST(int n, Edge[] edges) {
        Arrays.sort(edges);
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        List<Edge> mst = new ArrayList<>();
        for (Edge e : edges) {
            int rootU = find(e.u);
            int rootV = find(e.v);
            if (rootU != rootV) {
                mst.add(e);
                parent[rootU] = rootV;
            }
        }
        return mst;
    }
}
```

### JavaScript
```javascript
class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
    }
    find(i) {
        if (this.parent[i] === i) return i;
        return this.parent[i] = this.find(this.parent[i]);
    }
    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);
        if (rootI !== rootJ) {
            this.parent[rootI] = rootJ;
            return true;
        }
        return false;
    }
}

function kruskal(n, edges) {
    edges.sort((a, b) => a.w - b.w);
    const dsu = new DSU(n);
    const mst = [];
    for (const { u, v, w } of edges) {
        if (dsu.union(u, v)) {
            mst.push({ u, v, w });
        }
    }
    return mst;
}
```