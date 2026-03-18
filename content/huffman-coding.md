---
name: Huffman Coding
slug: huffman-coding
category: Compression
description: A greedy algorithm for lossless data compression that assigns variable-length codes based on symbol frequency.
tags: [compression, greedy, tree, prefix-code, lossless]
difficulty: Medium
time_complexity:
    best: O(n log n)
    average: O(n log n)
    worst: O(n log n)
space_complexity: O(n)
---

## Overview
**Huffman Coding** is a popular lossless data compression algorithm. It uses a variable-length coding system where frequently occurring characters are assigned shorter binary codes, and less frequent characters are assigned longer codes. It is a **prefix-free** code, meaning no code is a prefix of another, which allows for unambiguous decoding without the need for separators.

## Intuition
Imagine you are sending a message using only the letters "E" and "Z". In English, "E" appears much more often than "Z". If you use the same number of bits for both, you waste space. Huffman coding builds a "family tree" (a Binary Tree) for your characters. The most frequent characters stay near the top (short path/code), while the rare ones are pushed to the leaves at the bottom (long path/code).



## How It Works
1.  **Frequency Count**: Calculate the frequency of each character in the input string.
2.  **Priority Queue**: Create a leaf node for each character and add it to a min-priority queue based on frequency.
3.  **Build the Tree**: While there is more than one node in the queue:
    * Remove the two nodes with the lowest frequencies.
    * Create a new internal node with a frequency equal to the sum of the two nodes' frequencies.
    * Make the two nodes children of this new node (one left, one right).
    * Insert the new node back into the priority queue.
4.  **Assign Codes**: Starting from the root, assign `0` to every left edge and `1` to every right edge. The code for a character is the sequence of 0s and 1s on the path from the root to its leaf.



## Applications
* **File Compression**: Used in formats like GZIP, PKZIP (ZIP), and BZIP2.
* **Multimedia**: A key component in JPEG image compression and MP3 audio encoding.
* **Network Protocols**: Used in HTTP/2 header compression (HPACK).

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <map>

struct Node {
    char data;
    int freq;
    Node *left, *right;
    Node(char d, int f) : data(d), freq(f), left(nullptr), right(nullptr) {}
};

struct compare {
    bool operator()(Node* l, Node* r) { return l->freq > r->freq; }
};

void buildHuffmanTree(std::map<char, int>& freqMap) {
    std::priority_queue<Node*, std::vector<Node*>, compare> pq;
    for (auto pair : freqMap) pq.push(new Node(pair.first, pair.second));

    while (pq.size() != 1) {
        Node *left = pq.top(); pq.pop();
        Node *right = pq.top(); pq.pop();
        Node *top = new Node('`', left->freq + right->freq);
        top->left = left; top->right = right;
        pq.push(top);
    }
    // Resulting root is pq.top()
}
```

### Python
```python
import heapq

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
    
    def __lt__(self, other):
        return self.freq < other.freq

def huffman_encoding(data):
    # Calculate frequencies
    freq = {}
    for char in data:
        freq[char] = freq.get(char, 0) + 1
    
    # Build priority queue
    priority_queue = [Node(char, f) for char, f in freq.items()]
    heapq.heapify(priority_queue)
    
    while len(priority_queue) > 1:
        left = heapq.heappop(priority_queue)
        right = heapq.heappop(priority_queue)
        
        merged = Node(None, left.freq + right.freq)
        merged.left = left
        merged.right = right
        heapq.heappush(priority_queue, merged)
        
    return priority_queue[0] # Returns the root
```

### Java
```java
import java.util.*;

class HuffmanNode implements Comparable<HuffmanNode> {
    int data;
    char c;
    HuffmanNode left, right;

    public int compareTo(HuffmanNode s) {
        return this.data - s.data;
    }
}

public class Huffman {
    public static void buildTree(Map<Character, Integer> counts) {
        PriorityQueue<HuffmanNode> q = new PriorityQueue<>();
        for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
            HuffmanNode hn = new HuffmanNode();
            hn.c = entry.getKey();
            hn.data = entry.getValue();
            q.add(hn);
        }

        while (q.size() > 1) {
            HuffmanNode x = q.poll();
            HuffmanNode y = q.poll();
            HuffmanNode f = new HuffmanNode();
            f.data = x.data + y.data;
            f.c = '-';
            f.left = x;
            f.right = y;
            q.add(f);
        }
    }
}
```

### JavaScript
```javascript
class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function buildHuffmanTree(text) {
    const freqs = {};
    for (const char of text) freqs[char] = (freqs[char] || 0) + 1;

    const pq = Object.entries(freqs).map(([char, freq]) => new Node(char, freq));
    
    while (pq.length > 1) {
        pq.sort((a, b) => a.freq - b.freq);
        const left = pq.shift();
        const right = pq.shift();
        
        const parent = new Node(null, left.freq + right.freq, left, right);
        pq.push(parent);
    }
    return pq[0];
}
```