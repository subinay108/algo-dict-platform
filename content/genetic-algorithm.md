---
name: Genetic Algorithm
slug: genetic-algorithm
category: Artificial Intelligence
description: A search heuristic inspired by Charles Darwin’s theory of natural evolution to find optimal solutions to complex problems.
tags: [optimization, evolution, metaheuristic, search-algorithm]
difficulty: Hard
time_complexity:
    best: O(g * p * n)
    average: O(g * p * n)
    worst: O(g * p * n)
space_complexity: O(p * n)
---

## Overview
A **Genetic Algorithm (GA)** is a metaheuristic inspired by the process of natural selection. It belongs to the larger class of evolutionary algorithms (EA). GAs are commonly used to generate high-quality solutions for optimization and search problems by relying on biologically inspired operators such as mutation, crossover, and selection.

## Intuition
The algorithm treats potential solutions like organisms in a population. Just as in nature, the "fittest" individuals (those that solve the problem best) are more likely to survive and pass their "genes" (solution parameters) to the next generation. Over many generations, the population evolves, and the solutions tend to converge toward an optimum.



## How It Works
The algorithm operates through a cycle of generations:

1.  **Initial Population**: Generate a random set of individuals (candidate solutions), often represented as bit strings or arrays of numbers.
2.  **Fitness Function**: Evaluate each individual using a scoring function that determines how close it is to the optimal solution.
3.  **Selection**: Pick the best-performing individuals to be "parents." Common methods include **Roulette Wheel Selection** or **Tournament Selection**.
4.  **Crossover (Recombination)**: Combine the genetic information of two parents to create offspring. This mimics reproduction.
    * Example: Parent A `[1, 1, 0, 0]` and Parent B `[0, 0, 1, 1]` might produce Offspring `[1, 1, 1, 1]`.
5.  **Mutation**: Randomly flip small parts of an offspring's genes to maintain genetic diversity and prevent the algorithm from getting stuck in local optima.
    * Example: `[1, 1, 1, 1]` becomes `[1, 0, 1, 1]`.
6.  **Termination**: Repeat steps 2–5 until a solution meets a threshold or a maximum number of generations is reached.



## Applications
* **Engineering Design**: Optimizing the shape of an aircraft wing or bridge for maximum strength.
* **Scheduling**: Solving complex timetabling problems for airlines or schools.
* **Game AI**: Evolving behaviors for NPCs to adapt to player strategies.
* **Finance**: Portfolio optimization and algorithmic trading strategy discovery.

---

## Code Implementations

### C++
```cpp
#include <vector>
#include <algorithm>
#include <random>

struct Individual {
    std::vector<int> genes;
    int fitness;
};

// Simplified Selection logic
Individual selection(const std::vector<Individual>& population) {
    // Perform tournament or roulette selection here
    return population[rand() % population.size()];
}

void mutate(Individual& ind, double rate) {
    for (int& gene : ind.genes) {
        if ((double)rand() / RAND_MAX < rate) {
            gene = 1 - gene; // Flip bit
        }
    }
}
```

### Python
```python
import random

def genetic_algorithm(population, fitness_fn, mutation_rate, generations):
    for _ in range(generations):
        # Sort by fitness
        population = sorted(population, key=fitness_fn, reverse=True)
        new_population = population[:2] # Elitism: keep best two
        
        while len(new_population) < len(population):
            # Selection
            p1, p2 = random.sample(population[:10], 2)
            # Crossover
            point = random.randint(1, len(p1)-1)
            child = p1[:point] + p2[point:]
            # Mutation
            if random.random() < mutation_rate:
                idx = random.randint(0, len(child)-1)
                child[idx] = 1 - child[idx]
            new_population.append(child)
        population = new_population
    return max(population, key=fitness_fn)
```

### Java
```java
import java.util.*;

public class GeneticAlgorithm {
    static class Individual {
        int[] genes;
        int fitness;
        
        Individual(int size) {
            genes = new int[size];
            // Initialize with random bits
        }
    }

    public void evolve(List<Individual> population) {
        // Evaluate fitness, select parents, crossover, mutate
        // Implementation follows the generational cycle
    }
}
```

### JavaScript
```javascript
function evolve(population, fitnessFn, mutationRate) {
    const nextGen = [];
    
    while (nextGen.length < population.length) {
        const parentA = select(population, fitnessFn);
        const parentB = select(population, fitnessFn);
        
        let child = crossover(parentA, parentB);
        child = mutate(child, mutationRate);
        
        nextGen.push(child);
    }
    return nextGen;
}

function mutate(genes, rate) {
    return genes.map(g => (Math.random() < rate ? 1 - g : g));
}
```