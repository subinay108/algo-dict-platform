---
name: Arithmetic Coding
slug: arithmetic-coding
category: Compression
description: A form of entropy encoding that represents an entire message as a single floating-point number between 0 and 1.
tags: [data-compression, entropy, lossless, encoding]
difficulty: Hard
time_complexity:
    best: O(n)
    average: O(n)
    worst: O(n)
space_complexity: O(1)
---

## Overview
**Arithmetic Coding** is a highly efficient lossless data compression technique. Unlike Huffman coding, which assigns a fixed-length bit string to each symbol, Arithmetic Coding maps an entire message into a single number within a sub-interval of `[0, 1)`. It can achieve compression rates very close to the theoretical entropy limit because it can represent symbols using fractional bits.

## Intuition
Imagine the interval from 0 to 1 as a stretchable rubber band. Every character in your alphabet is assigned a portion of that band based on its probability. As you read each character in a message, you "zoom in" on its specific portion of the band, treating that new smaller segment as your full 0-to-1 range for the next character. By the end, any single number inside your final, tiny interval uniquely identifies the entire sequence of characters.



## How It Works
1.  **Probability Table**: Assign a probability range to each symbol based on its frequency. For example, if 'A' has a 50% chance, it takes `[0, 0.5)`.
2.  **Initialize**: Start with a current interval `[L, H)`, initially `[0, 1)`.
3.  **Encode**: For each symbol in the message:
    * Calculate the new range size: `Range = H - L`.
    * Update `H` to: `L + Range \times \text{Upper\_Bound}(\text{symbol})`.
    * Update `L` to: `L + Range \times \text{Lower\_Bound}(\text{symbol})`.
4.  **Final Value**: Once the message ends, pick any value (usually the shortest decimal) within the final `[L, H)` to represent the message.
5.  **Decode**: Reverse the process by checking which symbol's range contains the current value, outputting it, and scaling the interval back up.

## Applications
* **Modern Compression Standards**: Used in JPEG 2000, H.264/AVC, and H.265/HEVC (CABAC).
* **Text Compression**: Effective for large documents with predictable character distributions.
* **Academic Research**: Serves as the benchmark for optimal entropy encoding.

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <vector>
#include <map>

struct Range { double low, high; };

double encode(const std::string& text, std::map<char, Range>& table) {
    double low = 0.0, high = 1.0;
    for (char c : text) {
        double range = high - low;
        high = low + range * table[c].high;
        low = low + range * table[c].low;
    }
    return low; // Return the lower bound of the final interval
}
```

### Python
```python
def arithmetic_encode(text, probability_table):
    low = 0.0
    high = 1.0
    
    for char in text:
        prob_low, prob_high = probability_table[char]
        current_range = high - low
        high = low + current_range * prob_high
        low = low + current_range * prob_low
        
    return (low + high) / 2

# Example table: {'a': (0.0, 0.5), 'b': (0.5, 1.0)}
```

### Java
```java
import java.util.Map;

public class ArithmeticCoding {
    public static double encode(String text, Map<Character, double[]> table) {
        double low = 0.0;
        double high = 1.0;

        for (char c : text.toCharArray()) {
            double range = high - low;
            double[] bounds = table.get(c);
            high = low + range * bounds[1];
            low = low + range * bounds[0];
        }
        return (low + high) / 2.0;
    }
}
```

### JavaScript
```javascript
function arithmeticEncode(text, table) {
    let low = 0.0;
    let high = 1.0;

    for (let char of text) {
        let range = high - low;
        let [pLow, pHigh] = table[char];
        high = low + range * pHigh;
        low = low + range * pLow;
    }

    return (low + high) / 2;
}

// table example: { 'A': [0, 0.6], 'B': [0.6, 1.0] }
```