---
name: Baker's Algorithm
slug: bakers-algorithm
category: Memory Management
description: A real-time incremental garbage collection algorithm designed for heap management in systems with strictly bounded pause times.
tags: [garbage-collection, memory-management, real-time, systems]
difficulty: Hard
time_complexity:
    best: O(1)
    average: O(1)
    worst: O(n)
space_complexity: O(n)
---

## Overview
**Baker's Algorithm** is an incremental "copying" garbage collector (GC) designed to solve the problem of long pause times in real-time systems. In traditional "Stop-the-World" collectors, the program freezes while memory is cleaned. Baker's algorithm instead interleaves collection work with the program's execution, ensuring that every memory allocation or access performs a small, bounded amount of GC work.

## Intuition
Imagine you are moving houses, but you can't stop living your life while you do it. Instead of moving everything in one weekend, you move a few boxes every time you go from the old house to the new one. In Baker's algorithm, the heap is split into two halves: **From-space** (the old house) and **To-space** (the new house). Every time the program (the "mutator") reaches for an object in the old house, the algorithm immediately moves it to the new house before the program can touch it.



## How It Works
The algorithm uses a **Tospace** divided by three pointers: `bottom`, `scan`, and `top`.

1.  **Flip**: When Tospace is full, the roles of From-space and To-space are swapped. Root objects (directly accessible variables) are copied to the beginning of the new To-space.
2.  **The Read Barrier**: This is the most critical part. Whenever the program tries to read a pointer to an object in From-space, the algorithm intercepts the move:
    * It copies the object to To-space.
    * It leaves a "forwarding address" in From-space so other pointers to the same object can find it.
    * It returns the new address to the program.
3.  **Incremental Scanning**: Every time the program allocates a new object, the collector moves a few more objects from the `scan` pointer to the `top` pointer.
4.  **Completion**: Once the `scan` pointer catches up to the `top` pointer, all reachable objects have been moved and updated. The remaining objects in From-space are unreachable "garbage" and are cleared instantly.

## Applications
* **Real-Time Systems**: Used in environments like embedded systems where a 100ms pause could be catastrophic.
* **Lisp/Smalltalk Runtimes**: Historically used in early symbolic processing machines.
* **Functional Programming**: Efficient for languages that generate many short-lived objects.

---

## Code Implementations

### C++
```cpp
struct Object {
    bool inToSpace;
    Object* forwardingAddress;
    // Data members...
};

Object* readBarrier(Object* obj) {
    if (obj == nullptr) return nullptr;
    
    // If the object is still in the old space, move it
    if (!obj->inToSpace) {
        if (obj->forwardingAddress == nullptr) {
            obj->forwardingAddress = copyToToSpace(obj);
        }
        return obj->forwardingAddress;
    }
    return obj;
}
```

### Python
```python
class BakersGC:
    def __init__(self, size):
        self.from_space = [None] * size
        self.to_space = [None] * size
        self.scan_ptr = 0
        self.top_ptr = 0

    def read_barrier(self, obj_ref):
        if obj_ref and obj_ref.space == "from":
            return self.move_to_tospace(obj_ref)
        return obj_ref

    def allocate(self, size):
        # Perform incremental scan work during allocation
        self.incremental_scan()
        # Logic to place object at top_ptr...
```

### Java
```java
public class BakersAlgorithm {
    class Ref {
        Object target;
        boolean isToSpace;
    }

    public Object access(Ref ref) {
        // The Read Barrier: intercepting every access
        if (ref != null && !ref.isToSpace) {
            return moveToToSpace(ref);
        }
        return ref.target;
    }

    private Object moveToToSpace(Ref ref) {
        // Copy logic and forwarding address update
        return new Object(); 
    }
}
```

### JavaScript
```javascript
class BakerCollector {
    constructor() {
        this.toSpace = new Set();
        this.fromSpace = new Set();
    }

    // Intercept property access (simulating a read barrier)
    readBarrier(object) {
        if (this.fromSpace.has(object)) {
            const moved = this.copy(object);
            this.toSpace.add(moved);
            this.fromSpace.delete(object);
            return moved;
        }
        return object;
    }
}
```