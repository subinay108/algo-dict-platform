---
name: Adler-32 Checksum
slug: adler-32-checksum
category: Hashing
description: A high-speed checksum algorithm that uses two 16-bit sums to verify data integrity.
tags: [checksum, hashing, zlib, reliability]
difficulty: Easy
time_complexity:
    best: O(n)
    average: O(n)
    worst: O(n)
space_complexity: O(1)
---

## Overview
Adler-32 is a checksum algorithm invented by Mark Adler in 1995. It is a refinement of the Fletcher checksum and is primarily used in the **zlib** compression library. While it is significantly faster than a Cyclic Redundancy Check (CRC32), it trades off some reliability on very short messages because it does not distribute bits as evenly.

## Intuition
Imagine you have a string of numbers. To make sure nothing changes during a transfer, you could just add them all up. However, "1+2" and "2+1" both equal 3, so a simple sum won't catch swapped characters. Adler-32 solves this by keeping a **running total of the sums**. By tracking how the sum grows over time, the position of each byte impacts the final result, making it much harder for errors to go unnoticed.



## How It Works
Adler-32 concatenates two 16-bit checksums, `A` and `B`, into a single 32-bit value.

1.  **Initialize**: Set `A = 1` and `B = 0`.
2.  **Iterate**: For each byte `D` in the data stream:
    * `A = (A + D) \pmod{65521}`
    * `B = (B + A) \pmod{65521}`
3.  **Combine**: The final 32-bit hash is `B \times 65536 + A` (or `B \ll 16 \ | \ A`).
4.  **Modulo**: The number **65521** is used because it is the largest prime number smaller than `2^{16}`, which helps maximize the distribution of the checksum values.

## Applications
* **Zlib/Gzip**: Used as the default integrity check for compressed data blocks.
* **PNG Images**: Utilized within the IDAT chunks to ensure pixel data isn't corrupted.
* **Data Transmission**: Fast verification in low-latency environments where CRC32 is too computationally expensive.

---

## Code Implementations

### C++
```cpp
#include <cstdint>
#include <vector>

uint32_t adler32(const std::vector<uint8_t>& data) {
    uint32_t a = 1, b = 0;
    const uint32_t MOD_ADLER = 65521;

    for (uint8_t byte : data) {
        a = (a + byte) % MOD_ADLER;
        b = (b + a) % MOD_ADLER;
    }

    return (b << 16) | a;
}
```

### Python
```python
def adler32(data: bytes) -> int:
    a, b = 1, 0
    MOD_ADLER = 65521

    for byte in data:
        a = (a + byte) % MOD_ADLER
        b = (b + a) % MOD_ADLER

    return (b << 16) | a

# Usage: result = adler32(b"Hello World")
```

### Java
```java
public class Adler32 {
    public static long computeAdler32(byte[] data) {
        long a = 1, b = 0;
        final int MOD_ADLER = 65521;

        for (byte d : data) {
            // Ensure byte is treated as unsigned
            a = (a + (d & 0xFF)) % MOD_ADLER;
            b = (b + a) % MOD_ADLER;
        }

        return (b << 16) | a;
    }
}
```

### JavaScript
```javascript
function adler32(data) {
    let a = 1, b = 0;
    const MOD_ADLER = 65521;

    for (let i = 0; i < data.length; i++) {
        // Works for strings or typed arrays
        const charCode = typeof data === 'string' ? data.charCodeAt(i) : data[i];
        a = (a + charCode) % MOD_ADLER;
        b = (b + a) % MOD_ADLER;
    }

    return ((b << 16) | a) >>> 0; // >>> 0 ensures unsigned 32-bit int
}
```