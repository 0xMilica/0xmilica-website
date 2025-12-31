---
title: Understanding ZKP Systems - Proof Sizes, Speed, Curves and the Trade-offs That Actually Matter
date: 2025-12-31
hero: "/images/zkp-systems-groth16-plonk-snark.png"
excerpt: ZKP comparison in size, speed and curves
timeToRead: 5
authors:
- Milica Vulic
---

## Choosing the Right Zero-Knowledge Proof System: The Real Differences That Matter

Most people talk about ZKPs as if it’s irrelevant which system you choose. It is not - each proof system comes with its own specific tradeoffs: proof sizes, curve choices, budgets, security assumptions and verification costs. If you pick an inadequate one for your case, it might come with a set of burdens you did not count on in the beginning, and it can affect your project in terms of scaling, time budgeting or verification costs.
In this blogpost, we are going to cover the differences between most commonly used Zero Knowledge Proof types - **Groth16**, **PLONK** and **STARK** - regarding their size, implementation complexity, curves, speed and learning curve.

## Groth16

### What it is
A pairing-based **SNARK** - **S**uccinct **N**on-**I**nteractive **A**rgument of **K**nowledge with a per-circuit trusted setup. Long time on the ZK scene and still the smallest proof and fastest verification in practice.

### Curve Types
- BN254: cheap verification, lower security
- BLS12-381: higher security, more expensive on EVM (EVM only has pairing precompiles for BN254, not for BLS12-381)

### Proof Size
Some 200 bytes - one of the smallest proof sizes in practice today.

### Proving Time
It does not scale well with very large circuits (100k+ constraints). Proving time grows roughly linearly with the number of constraints.

### Verification Time
Among the fastest to verify in practice, especially on EVM, due to few pairings and tiny proofs. This is why chains adopt it and why it works well with verification layers like zkVerify.

### Developer Tooling
For Groth16, developers typically work with tools such as Circom and snarkJS or higher-level frameworks like ZoKrates. Also, for those into lower-level programming - implementations are available through Bellman/ark-groth16 in Rust and gnark in Go.

### Pros for Groth16

- You need tiny proofs
- You need very fast verification
- You are targeting chains where gas is expensive
  
### Cons for Groth16
 - Trusted setup
 - Per-circuit ceremony
 - Poor recursion support
 - Heavy proving for large circuits


## PLONK and PLONK-ish Systems (TurboPLONK, UltraPLONK, Plonky2)

### What it is
**PLONK** - **P**ermutations over **L**agrange-bases for **O**ecumenical **N**on-interactive arguments of **K**nowledge is still a zk-SNARK - just a more modern variant that trades Groth16’s tiny proofs and fast verification for a universal-setup, more modern polynomial commitments and good recursion support.

### Curve Types
- BN254
- BLS12-381
- Pasta curves (Pallas/Vesta)
- Goldilocks (for Plonky2 recursion efficiency)


### Proof Size
Typically kilobytes to tens of kilobytes, depending on implementation. Smaller than STARKs, larger than Groth16.

### Proving Time
Somewhere in the middle.
Plonky2 is optimised for recursion thanks to the Goldilocks field and efficient hashing.

### Verification Time
Slower than Groth16 but significantly faster than STARKs.

### Developer Tooling
Common tooling includes the Noir language, Nargo toolchain and the Halo2 framework. Usually, developers’ first choice is Noir framework.

### Pros for PLONK
- You want a universal setup
- You need recursion
- You want a modern circuit ecosystem
- You care about developer tooling (Noir, Halo2, etc.)

### Cons for PLONK
- We can still not neglect the proof size
- Verification is not the cheapest
- Performance varies heavily depending on curve choice


## STARKs

### What it is
Scalable, Transparent ARgument of Knowledge. It is a transparent, hash-based proof system that scales extremely well for large computations. STARKs are using well tested hash functions and algebraic proof techniques instead of number-theoretic assumptions like pairings, which makes them transparent and scalable.
That transparency means they have no trusted setup and are post-quantum secure, allowing the prover and verifier to scale to very large computations with nothing hidden behind a trusted setup.

### Curve Types
Hehe, no curves here :) STARKs do not rely on elliptic curve pairings. STARKs rely on hash functions (like Keccak, Rescue and Poseidon) and low-degree polynomial testing (as FRI protocol) meaning that it runs a mathematical test that checks whether a function behaves like a low-degree polynomial.

### Proof Size
Large: tens to hundreds of kilobytes.

### Proving Time
STARKs are efficient at large-scale workloads, but for small circuits the prover spends more time on setup and hashing than on the actual computation.

### Verification Time
Slower than SNARKs.
Verification is hash-intensive thus costly on EVM, which makes on-chain verification expensive in comparison to SNARKs.

### Developer Tooling
For STARK-based systems, developers usually build using Risc0 or SP1 in a zkVM programming model, as well as Cairo/StarkNet for AIR-style proving. For those interested in lower-level programming, there are STARK libraries available such as Winterfell.

### Pros for STARK
- You plan for a circuit that is huge (millions of constraints)
- You need transparency (no trusted setup)
- You look for plausible post-quantum resistance

### Cons for STARK
- Proofs are big
- Verifying big proofs is expensive
- Because STARK proofs are large and rely on Merkle/FRI hash checks rather than pairings, verifying them on the EVM is typically costly in terms of gas.

## So, How to Make a Choice?
You choose a ZKP system based on the constraints you cannot escape:

- If the proof must be tiny and verification costs small: **Groth16**
- If the circuit will scale, needs recursion and universal trusted setup: **PLONK**
- If you plan for a big circuit and you don’t want trusted setup: **STARKs**

### Comparison of ZKP Systems

| **Criteria**            | **Groth16**                     | **PLONK**                                      | **STARKs**                          |
|-----------------------|---------------------------------|------------------------------------------------|-------------------------------------|
| **Setup**             | Trusted per circuit             | Universal (trusted)                            | None (transparent)                  |
| **Proving Time**      | Slow                            | Medium                                         | Fast (for large circuits)           |
| **Verification Time** | Fastest                         | Medium                                         | Slow                                |
| **Proof Size**        | ~200 bytes                      | One to tens of KBs                             | Tens to hundreds of KBs             |
| **Recursion**         | Weak                            | Strong                                         | Strong                              |
| **Curve Choices**     | BN254, BLS12-381                | BN254, BLS12-381, Pasta, Goldilocks            | None (hash-based)                   |

The thing developers forget:
your bottleneck is rarely the proof system itself. It is how the system scales that introduces the biggest obstacles. There is no perfect choice. Choosing a proof system also means choosing its ecosystem - the languages, frameworks, and performance behaviour that come with it. Choose based on your latency budget, cost constraints, verification platform and the tech stack you plan to rely on.
