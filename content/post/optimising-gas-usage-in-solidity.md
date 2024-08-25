---
title: Optimising gas usage in Solidity
date: 2023-02-06
hero: "/images/optimizing-gas-usage-solidity.jpg"
excerpt: The best way to save on gas with smart contracts
timeToRead: 10
authors:
- Milica Vulic
---

Lately, it became tricky to find truly efficient solutions for gas optimisation online. What happens is, either they are simply wrong assumptions, or they became obsolete in the meantime, or we need more context to fully understand the proposed solution. But, one thing is for sure - There is always some puzzle missing.

The following examples are based on [Branislav](https://twitter.com/baneofweb3)'s [lecture](https://youtu.be/zmItvMeW4dg) using the Tenderly gas profiler and simulations which are completely free - make sure to create a profile there and enjoy a tool that gives you incredible insight into gas consumption while supporting a variety of EVM-compatible networks (you can always contact them if there is no network of your preference ATM)

## Transaction - Level

### Batching operations
Every transaction has an initial gas fee. If they're called consecutively within the smart contract it's possible to batch them, resolve them as internal calls and have a single initial gas fee.

However, that might not always be the case. When Ether is forwarded through an internal call (i.e, calling a function from some other smart contract that consumes Ether), there is a penalty in price which can turn batched transactions into more expensive ones compared to the individual ones.

![To batch transactions, or not to batch!](/images/to-batch-transactions-or-not-to-batch.jpeg "To batch transactions, or not to batch")

To batch, or not to batch, that is the question

To be able to conclude whether or not batching is a favourable operation we have to take into consideration how much gas is saved up on the initial gas fee. With enough transactions batched, a single initial gas fee could be advantageous even for an internal call that consumes Ether.

Let's take a look at this example in Tenderly [sandbox](https://sandbox.tenderly.co/branislav/gas-batching). It is such a nice place for creating prototypes without doing an actual deployment.

(https://sandbox.tenderly.co/0xMilica/gas-batching)

While <contract.sol> represents a smart contract, <script.js> is there to deploy it on the Tenderly fork. In the Simulated transactions card, you can click on 'work1' or 'work 2', open both of these transactions and inspect how much gas each of them consumed. If you check the Gas profiler section, you could find a piece-by-piece breakdown of the method by gas consumption. Great, isn't it?

### Tenderly fork
[Tenderly](https://tenderly.co/) fork is not an actual Ethereum fork, but rather an internal Mainnet representation, or a representation of a network of your choice.

![Tenderly!](/images/tenderly.jpg "Tenderly")

**Pros:**
- cosy for gas cost profiling compared to the test networks where there is waiting on consensus after deployment
- a sum of 100 Ethers could be assigned out of thin air, which makes it possible to completely manipulate the internal state
- there is a complete EVM implemented in such a way that you won't lack a feeling of working with a true EVM, but still, you won't interact with the blockchain
- user can address all of the 'IF-THIS-THEN-THAT' doubts in a super-efficient manner, error-free, without waiting
- your fork, your state - a fork is created per user
- others can contribute - a fork can be shared among the team
  
**Cons:**
not an actual network - can't do production on the fork.

### Limit external calls
Contrary to web2 logic and OOP rules of thumb, it is more gas efficient to work with a monolith smart contract than to operate with several simple modules.

- Modular approach: creating smart contracts like classes in OOP - clean code approach. Usually, you would take references on contracts and call them.
- Monolithic approach: all functions within a single smart contract

![Gas efficiency or clean code!](/images/clean-code-or-gas-efficiency.jpeg "Gas efficiency or clean code")

Major culprit? Calling other contracts is pricey - avoiding it can save you some gas.

Following the [example](https://sandbox.tenderly.co/branislav/gas-monolith) below, you can test and try both monolith and modular approaches. When looking at the modular case, you can notice that there is an internal overhead in gas consumption, even though it is an internal call.

(https://sandbox.tenderly.co/0xMilica/gas-monolith)

Saving gas using this technique is possible only if we are the creators of the contract. If someone else owns that contract, then, due to a lack of possibilities, we are compelled to use a modular approach.


## Compiler Optimisation

### Understanding the runs parameter
When it comes to running functions, there are two options:

- **inline** - every time the function is called, its code will be copied to where it's invoked
- **jump** - every time the function is called, a jump is made to where that function is defined to read the code of the function (similar to working with GOTO for those that still remember it).
  
So, how does it affect gas consumption? Whenever we use **inline**, e.g. copy the body of a function, we increase our deployed code size in bytes. On the other side, when we use **jump** we work with two extra OPCODEs: JUMP -> execute the function -> JUMP BACK, which is pricey.

(https://sandbox.tenderly.co/0xMilica/uniswap)

[This](https://sandbox.tenderly.co/branislav/gas-monolith) is where the 'runs' parameter comes into the spotlight. The runs parameter is part of Optimiser that allows you to make a tradeoff between the two:

1. price of a contract **deployment**
2. price of contract **execution**.
   
The runs parameter operates on a bytecode level (applied during compiling from Solidity to bytecode) and it gives hints to Compiler Optimisator on how many times a single OPCODE will be repeated. This enables inlining a function first x times, and after that to execute without inlining.

![Contract execution or deployment cost!](/images/contract-execution-or-deployment-cost.jpeg "Contract execution or deployment cost")

It allows for a fine-tuning of how much will the deployment and execution cost. The lower the runs parameter, the lower the deployment value. The higher it is, thus the cheaper execution is.

The trick is - deployment is paid by the developer, while the user covers the execution costs. For a user-friendly smart contract, the runs parameter should be set so that the user does not spend a fortune on execution.

## Data structures

### Packing variables
This is usually the first advice that pops up when browsing for Solidity gas optimisation, but also one of the trickiest to apply.

In this section, we refer to variables that are already stored in EVM (creating variables won’t be observed here). **Important**: according to [Ethereum yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), the store operation is a byte-level operation (not a variable level one), thus relevant for hexadecimal pairs.

What is charged in gas is changing some of the variable’s bytes from hexadecimal zero to hexadecimal non-zero:

- hex non-zero → hex non-zero: not noticeable in charges
- hex zero → hex non-zero: expensive
- hex non-zero → hex zero: refund (max 1/5 of tx)

![Getting a gas refund!](/images/gas-refund.jpeg "Getting a gas refund")

Having in mind that preserving zero in hardware is much cheaper than non-zero, the incentivisation to have as many zeros as possible does not come as surprise.

Regarding constants, this trick is applicable during deployment and it's only notable if the deployment is frequent. Try it out [here](https://sandbox.tenderly.co/branislav/zeros).

When EVM executes modifying variables operations, it is operating with 32B size variables, i.e. 256b. Storage slots are organised in a unit of 32B, but there is more.

Smaller variables can be organised together so that one slot can hold multiple variables! For unlocking that possibility variables have to be organised in a sequential manner be it struct, or array. Take a look at the example [below](https://sandbox.tenderly.co/branislav/structs1):

(https://sandbox.tenderly.co/branislav/structs1)

But, beware: all OPCODEs, except for read and write, run on 32B variables. ADD, SUM, PUSH etc operate with 32B, so even if the variable is declared as uint64, it still has to be converted into uint256 so that the desired OPCODE can be applied, and then converted back to uint64. Applying those additional steps is expensive due to additional OPCODEs for conversion.

### Maps and Arrays
Compared to arrays, maps are more cost-effective. Nevertheless, arrays come with advantages as well: they're more iterable and packable.

In order to be iterable arrays contain additional structures. As a result, it is more costly to use arrays for storing variables. To make it more interesting, dynamic arrays have a storage slot which contains the info on the size of the array, and to determine the actual position of the array, the Keccak algorithm is implemented. I'm attaching the link for a playground below.


### Freeing storage
For every struct, array or map that is deleted, a variable set to zero or string set to an empty string EVM refunds 4800 gas (or up to 1/5 of tx cost) **at the end of the transaction**.

Note: refunded gas **cannot be used during the transaction**, given the fact that the gas is refunded at the end of the transaction. Give it a try [here](https://sandbox.tenderly.co/branislav/gas-refund) and let me know if you experienced the same.


Rules were different in the past, but some people took advantage of this feature: they stored when prices were low, and cleared out when prices were high.

## Control Flow

### Visibility
The keyword 'public' is a combination of the 'external' and 'internal' keywords.

- external - open exclusively for outside-of-the-contract usage
- internal - only for inside-of-the-contract usage
  
Keywords 'internal' and 'external' are more gas efficient than 'public', so use them where possible to tweak some expenses. 'View' is free, but cannot change internal storage.

![External and public variable difference!](/images/external-and-public-variable-difference.jpeg "External and public variable difference")

### Variable caching
If a storage variable is used on multiple occasions it should be stored in a separate variable instead. E.g, when iterating over an array using i<myArray.length it's going to be more useful to cache it in a separate variable (e.g. uint256 arrayLength = myArray.length). As storage reading cost some gas, accessing the storage numerous times should be avoided.

### Memory vs Calldata
No need to change parameters within the function? Great, declare them as 'calldata' rather than 'memory' and save yourself a dime. 'Memory' and 'calldata' are stored in different places in EVM.

By default, variables are set to 'memory'. Given the fact that parameters are already located in the 'calldata' section, if the default setting is not changed they'll be copied to the 'memory' part.

### More Tricks
- if there is a certainty that some variable cannot overflow, it is useful to put 'unchecked' at the end of the loop in front of the increment (like unchecked ++i).
- the compiler always looks at the left-hand side of the equation first so it's a fine choice to interrupt those ANDs and ORs as fast as possible.

## Design Patterns

### Proxy
The proxy pattern is used mainly for upgrading smart contract logic. E.g, you want to upgrade your smart contract but there are existing state and users.

A proxy contract comes into the scene as a sort of interface in OOP (web2 devs will understand).

This smart contract contains all the data and empty methods. Its trade is delegating execution to some other contract, implemented in such a way that it uses storage of the proxy contract. The call used thereby is a low-level call 'delegate'.

### Eternal storage
In this pattern, a separate smart contract is used as a database. Every time that the original contract seeks some data, a 'set' call is used to fetch them.

- pros: no copying of data when the original contract upgrades to a new version
- cons: every read or write operation with an external contract generates an additional gas fee (not a situation with proxy pattern)

![Expensive gas prices!](/images/expensive-gas-prices.jpeg "Expensive gas prices")
