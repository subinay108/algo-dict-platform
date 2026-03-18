---
name: A* Search Algorithm
slug: a-star-search-algorithm
category: Pathfinding
description: An informed search algorithm that uses heuristics to find the shortest path between nodes.
tags: [graph, pathfinding, heuristic, greedy, bfs]
difficulty: Hard
time_complexity:
    best: O(bd)
    average: O(bd)
    worst: O(E)
space_complexity: O(V)
---

## Overview
A* (A-Star) is one of the most successful and popular pathfinding algorithms. It combines the strengths of **Dijkstra’s Algorithm** (which stays close to the starting point) and **Greedy Best-First Search** (which moves toward the goal). It is both **complete** (finds a path if one exists) and **optimal** (finds the shortest path), provided the heuristic used is admissible and consistent.

## Intuition
The core idea is to prioritize nodes that seem most promising. Unlike Dijkstra, which explores equally in all directions, A* uses a "brain" called a **heuristic** to nudge the search toward the destination. It maintains a balance between the distance already traveled and the estimated distance remaining to ensure it doesn't wander off-course or miss a shortcut.

## How It Works
A* maintains two sets of nodes: an **Open Set** (nodes to be explored, usually a Priority Queue) and a **Closed Set** (nodes already evaluated). It selects the node with the lowest total cost function:

``f(n) = g(n) + h(n)``

1.  **Initialize**: Add the start node to the Open Set with `f(n) = 0`.
2.  **Select**: While the Open Set is not empty, pick the node `n` with the smallest `f(n)`.
3.  **Check**: If `n` is the goal, the path is found. Reconstruct it by following parent pointers.
4.  **Expand**: For each neighbor of `n`:
    * Calculate `g(neighbor)`, the cost from start to neighbor through `n`.
    * If this path to `neighbor` is better than any previously recorded path, update its `g`, `h`, and `f` values.
    * Set `n` as the parent of the neighbor and add the neighbor to the Open Set.
5.  **Terminate**: If the Open Set is empty and the goal wasn't reached, no path exists.



## Applications
* **Video Games**: Movement of NPCs (Non-Player Characters) across maps.
* **GPS Systems**: Calculating driving directions with real-time traffic data.
* **Robotics**: Path planning for autonomous drones or vacuum cleaners.
* **Natural Language Processing**: Parsing and machine translation.

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
#include <unordered_map>

struct Node {
    int x, y;
    double g, h;
    Node* parent;

    double f() const { return g + h; }
    bool operator>(const Node& other) const { return f() > other.f(); }
};

double heuristic(int x1, int y1, int x2, int y2) {
    return std::sqrt(std::pow(x1 - x2, 2) + std::pow(y1 - y2, 2));
}

// Simplified A* structure logic
void aStar(int startX, int startY, int goalX, int goalY) {
    auto cmp = [](Node* left, Node* right) { return *left > *right; };
    std::priority_queue<Node*, std::vector<Node*>, decltype(cmp)> openSet(cmp);
    
    openSet.push(new Node{startX, startY, 0, heuristic(startX, startY, goalX, goalY), nullptr});
    // Further logic: expansion and closed set tracking
}
```

### Python
```python
import heapq

def a_star(graph, start, goal, h):
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {node: float('inf') for node in graph}
    g_score[start] = 0
    
    f_score = {node: float('inf') for node in graph}
    f_score[start] = h(start, goal)

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == goal:
            return reconstruct_path(came_from, current)

        for neighbor, weight in graph[current].items():
            tentative_g = g_score[current] + weight
            if tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score[neighbor] = tentative_g + h(neighbor, goal)
                heapq.heappush(open_set, (f_score[neighbor], neighbor))
    return None
```

### Java
```java
import java.util.*;

class Node implements Comparable<Node> {
    int id;
    double g, f;
    Node(int id) { this.id = id; }
    @Override
    public int compareTo(Node other) {
        return Double.compare(this.f, other.f);
    }
}

public class AStar {
    public List<Integer> solve(Map<Integer, Map<Integer, Double>> graph, int start, int goal) {
        PriorityQueue<Node> openSet = new PriorityQueue<>();
        Map<Integer, Double> gScore = new HashMap<>();
        
        Node startNode = new Node(start);
        startNode.g = 0;
        startNode.f = heuristic(start, goal);
        openSet.add(startNode);
        gScore.put(start, 0.0);

        while (!openSet.isEmpty()) {
            Node current = openSet.poll();
            if (current.id == goal) return null; // Path reconstruction logic here
            // Neighbor expansion...
        }
        return null;
    }
    private double heuristic(int a, int b) { return 0; } // Placeholder
}
```

### JavaScript
```javascript
function aStar(start, goal, h, getNeighbors) {
    const openSet = new MinPriorityQueue({ priority: x => x.f });
    const gScore = new Map();
    const cameFrom = new Map();

    gScore.set(start, 0);
    openSet.enqueue({ node: start, f: h(start, goal) });

    while (!openSet.isEmpty()) {
        const { node: current } = openSet.dequeue();

        if (current === goal) return reconstructPath(cameFrom, current);

        for (const [neighbor, weight] of getNeighbors(current)) {
            const tentativeG = gScore.get(current) + weight;
            if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeG);
                openSet.enqueue({ 
                    node: neighbor, 
                    f: tentativeG + h(neighbor, goal) 
                });
            }
        }
    }
    return null;
}
```