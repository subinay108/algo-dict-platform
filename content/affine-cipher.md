---
name: Affine Cipher
slug: affine-cipher
category: Cryptography
description: A monoalphabetic substitution cipher that uses a linear mathematical function to encrypt letters.
tags: [security, encryption, modular-arithmetic, classical-cipher]
difficulty: Medium
time_complexity:
    best: O(n)
    average: O(n)
    worst: O(n)
space_complexity: O(n)
---

## Overview
The **Affine Cipher** is a type of monoalphabetic substitution cipher where each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back to a letter. It is a generalization of the Caesar Cipher; while Caesar only shifts letters (addition), Affine both multiplies and shifts.

## Intuition
The cipher works by applying a straight-line equation—similar to `y = mx + c`—to the alphabet. By multiplying the letter's position by a factor `a` and adding a shift `b`, the original order of the alphabet is scrambled in a predictable way. To ensure that every letter maps to a unique encrypted letter, the multiplier `a` must be "coprime" to the alphabet size (usually 26), meaning they share no common factors other than 1.



## How It Works
1.  **Assign Values**: Map each letter to an integer (e.g., A=0, B=1, ..., Z=25).
2.  **Encryption Formula**: For each character `x`, calculate the ciphertext `E(x)`:
    ``E(x) = (ax + b) \pmod{m}``
    * `m` is the size of the alphabet (26).
    * `a` must be coprime to `m`.
    * `b` is the magnitude of the shift.
3.  **Decryption Formula**: To reverse the process, calculate the plaintext `D(y)`:
    ``D(y) = a^{-1}(y - b) \pmod{m}``
    * `a^{-1}` is the modular multiplicative inverse of `a` modulo `m`.
4.  **Key Validation**: The algorithm first checks if `\gcd(a, m) = 1` before proceeding.

## Applications
* **Educational Purposes**: Used to teach the fundamentals of modular arithmetic and substitution.
* **Historical Cryptography**: Served as a more secure alternative to the simple Caesar cipher before modern computing.
* **Simple Obfuscation**: Basic data masking where high security is not required.

---

## Code Implementations

### C++
```cpp
#include <iostream>
#include <string>

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int modInverse(int a, int m) {
    for (int x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1) return x;
    return 1;
}

std::string encrypt(std::string text, int a, int b) {
    std::string res = "";
    for (char c : text) {
        if (isalpha(c)) {
            res += (char)((((a * (toupper(c) - 'A')) + b) % 26) + 'A');
        }
    }
    return res;
}
```

### Python
```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def mod_inverse(a, m):
    for x in range(1, m):
        if (a * x) % m == 1:
            return x
    return None

def affine_encrypt(text, a, b):
    if gcd(a, 26) != 1:
        raise ValueError(" 'a' must be coprime to 26")
    
    result = ""
    for char in text.upper():
        if char.isalpha():
            x = ord(char) - ord('A')
            cipher_char = chr(((a * x + b) % 26) + ord('A'))
            result += cipher_char
    return result
```

### Java
```java
public class AffineCipher {
    public static String encrypt(String text, int a, int b) {
        StringBuilder res = new StringBuilder();
        for (char c : text.toUpperCase().toCharArray()) {
            if (Character.isLetter(c)) {
                int x = c - 'A';
                int encrypted = (a * x + b) % 26;
                res.append((char) (encrypted + 'A'));
            }
        }
        return res.toString();
    }

    public static String decrypt(String text, int a, int b) {
        int aInv = 0;
        for (int i = 0; i < 26; i++) {
            if ((a * i) % 26 == 1) aInv = i;
        }
        StringBuilder res = new StringBuilder();
        for (char c : text.toCharArray()) {
            int y = c - 'A';
            int decrypted = (aInv * (y - b + 26)) % 26;
            res.append((char) (decrypted + 'A'));
        }
        return res.toString();
    }
}
```

### JavaScript
```javascript
const affineEncrypt = (text, a, b) => {
    const m = 26;
    return text.toUpperCase().split('').map(char => {
        const code = char.charCodeAt(0) - 65;
        if (code >= 0 && code < 26) {
            return String.fromCharCode(((a * code + b) % m) + 65);
        }
        return char;
    }).join('');
};

const affineDecrypt = (text, a, b) => {
    const m = 26;
    let aInv = 1;
    for (let i = 0; i < m; i++) {
        if ((a * i) % m === 1) aInv = i;
    }
    return text.toUpperCase().split('').map(char => {
        const y = char.charCodeAt(0) - 65;
        if (y >= 0 && y < 26) {
            return String.fromCharCode(((aInv * (y - b + m)) % m) + 65);
        }
        return char;
    }).join('');
};
```