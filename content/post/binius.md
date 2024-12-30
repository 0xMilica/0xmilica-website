---
title: Binius
date: 2024-12-19
hero: "/images/binius-magic.jpg"
excerpt: Why is Binius a breakthrough in ZK
timeToRead: 5
authors:
- Milica Vulic
---

## Binius, a New Chapter for ZK
As blockchain constantly evolves like a living organism, scalability remains one of its biggest hurdles. Cryptographic operations, especially when dealing with **zero-knowledge proofs**, are often the bottleneck. But what if we could accelerate these operations without sacrificing security? Say ‘Hello world!’ to [Binius](https://gitlab.com/IrreducibleOSS/binius) from [Irreducible](https://www.irreducible.com/): a groundbreaking **SNARK** system built to solve this problem by using the power of **binary towers** - a recently developed cryptographic structure that’s paving the way for more efficient, scalable systems.
![Speed and security, why not both!](/images/binius-both-speed-security.png)
## Binary Towers, a Game-Changer
Computer systems function within *the field of 2 {0,1}*. Thus, binary systems are a native language for computers. As SNARKs operate on finite fields of prime order, you will find that in most cases that order is of 256 bits. But, can it be done over **the smallest of fields, the binary field**? Binius introduces a new way of handling cryptographic computations through binary towers. <br /> 

You might be familiar with elliptic curves in blockchain protocols like Ethereum. They are incredibly powerful, but they come with some computational overhead, especially when it comes to operations like **multiplication** and **inversion**. <br /> 
Binary towers, however, allow us to perform these operations **faster** and more **efficiently** in elliptic curve cryptography, as they allow faster computation through the use of binary representation. Existing systems like [**Plonky3**](https://github.com/Plonky3/Plonky3) and [**Halo 2**](https://github.com/zcash/halo2) offer either small proof sizes or fast proving speeds, but not both. <br /> 

![Fast and efficient, Binius!](/images/binius-fast-efficient.png)

Binary tower fields are finite fields constructed using the powers of 2. In simple terms, a tower of binary fields is like stacking smaller building blocks (fields) to create something much more powerful. This allows for incredibly fast **multiplication** and **inversion** - operations that are key to generating zero-knowledge proofs. In fact, these binary tower operations are so efficient that inversion in Binius is only 1.5 times more costly than multiplication, whereas other methods can make inversion far more expensive timewise. This is a huge win for scaling blockchain systems. 

## Optimising Polynomial Commitments
One of the most significant parts of zero-knowledge proofs involves **commitments** - where a prover ‘commits’ to a value without revealing it, ensuring that the value remains hidden but cannot be changed later. Binius takes this a step further by optimising polynomial commitments for small values, even as small as a single bit. Traditional methods might pad small values to a larger size, causing unnecessary overhead. Binius, however, can commit to these tiny bits directly - **no padding required**. <br /> 
Think of it like having a standard, one-size box for packaging physical products in a retail company. Even if you’re sending just one small item and the box is nearly empty, you’ll still use a box the same size as a full one, filling it with plenty of padding to ensure your products aren’t tumbled and damaged during transit. Binius offers custom-sized boxes tailored specifically to the items you’re sending. <br /> 

![Binius efficiency without padding!](/images/binius-efficiency-no-padding.png "Padding according to Binius")

This is possible thanks to a clever use of **packing** and **linear codes**, which reduces what we call ‘embedding overhead’. Another way to think about it is packing multiple small items into one box instead of carrying them individually. By doing this, Binius can handle commitments much more efficiently, making it a suitable choice for real world applications where data often comes in smaller, more fragmented pieces.

## Hardware-Software Co-design
While the software side of Binius is impressive, its true potential comes to life when combined with proper hardware. Specifically, Binius is optimised for **FPGAs** (Field-Programmable Gate Arrays), specialised hardware that can be reconfigured to perform certain tasks very efficiently. FPGAs excel at tasks like **multiplying** and **inverting** field elements in parallel, making Binius even faster when deployed on this hardware. <br /> 
Imagine trying to run a marathon. A regular processor is like a runner pacing themselves, while an FPGA is like a team of sprinters each handling a portion of the race. The result? A massive speedup. In fact, Binius's FPGA prototypes have shown that **binary field multiplications** can be performed in **one clock cycle**, making them exponentially more efficient than traditional prime field operations like **Mersenne-31**, which require 49 clock cycles. Additionally, FPGA-based implementations of the **128-bit binary tower field** are up to **five times more efficient** than traditional field multipliers.

## Sumcheck Protocol
Now, even with all these optimisations, there’s still one pain point to tackle: the **Sumcheck protocol**. This protocol, which is a crucial component in ZK proof systems, involves extensive polynomial evaluations that can take time and resources. While Binius already provides faster polynomial evaluations thanks to its use of binary fields, there's still work to be done here. <br /> 
The good news is that there’s potential for even more acceleration. By further **optimising the Sumcheck protocol** using dedicated hardware like FPGAs, Binius can achieve even **faster proving times**. Think of this as tweaking the engine of a high-performance car for even better speed - this next step could dramatically improve Binius's ability to handle large-scale blockchain applications.

![Binius constantly improving!](/images/binius-speed.png)

## Efficiency
Binius is not just a theoretical construct; it’s a practical solution that delivers real-world results. In [Irreducible](https://www.irreducible.com/)’s testing, Binius has demonstrated **2–3 times smaller proof sizes** than existing SNARK systems while providing up to **50% faster proving performance**. These results are based on benchmarking against systems like **Plonky3**. <br /> 
The key to Binius’s efficiency lies in the unique properties of the **binary tower fields**. These fields allow for subquadratic multiplication and efficient inversion, which dramatically reduce the computational cost of operations. Benchmarks show that Binius’ implementation of these fields **outperforms systems like BN254** scalar field operations and **Baby Bear**.

## Why Binius Matters for Blockchain and Cryptography
Binius addresses one of the most pressing bottlenecks in modern blockchain systems: **proof size and proving speed**. Systems like **Plonky3** and **Halo 2** offer either small proof sizes or fast proving speeds, but not both. <br /> 
Ethereum’s scalability challenges are well-known, and **keccak** remains one of the biggest bottlenecks. Binius could offer a **succinct commitment scheme** that could enable Ethereum nodes to handle more transactions and proofs without overwhelming network resources. Having that in mind, Ethereum could scale more effectively, with smaller proof sizes and faster proving times.

## Future with Binius
Binius is an exciting step forward in cryptographic acceleration. By combining cryptographic techniques like **binary tower fields with hardware optimisations** in FPGAs, Binius is positioning itself as a key player in the future of the cryptographic ecosystem. It’s not just about making things faster - it’s about making them **scalable** and **efficient** at every level. <br /> 
But the impact of Binius stretches beyond Ethereum. Any blockchain or cryptographic system that relies on zero-knowledge proofs - from privacy-preserving protocols to DeFi applications, can benefit from the advancements made possible by Binius. <br /> 
With its genius **hardware-software co-design**, Binius is, without any doubt, shaping the future of zero-knowledge proofs.
