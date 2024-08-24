---
title: WTH is Zero Knowledge Proof?
date: 2023-01-12
hero: "/images/zero-knowledge-proof-explained.png"
excerpt: Simple explanation of zero knowledge proof concept
timeToRead: 3
authors:
- Milica Vulic
---

Zero-knowledge proof is a method by which one party (the prover) can prove to another party (the verifier) that a given statement is true, without revealing any additional information beyond the fact that the given statement is true.

This magic is done by allowing the prover to create a mathematical proof that the statement in question is true, which the verifier can then check without the need to see any additional information.

For those who have never seen **ZKPs** (and for those who have seen them and got puzzled) - keep on reading - I'll try my best to explain it in simple terms as much as possible 🤓

I assume you played standard cards once in your life, but anyway, let's rehearse:

The standard deck counts **52 cards**. These 52 cards are divided into night and day cards, which are represented by Black and Red, **26 of each** of them.

![Zero Knowledge Proof Illustrated](/images/zero-knowledge-proof-illustrated.png)

Now we know all of this, let's play a game! ♠️♥️♣️♦️

I will hold a deck and draw a card - but I'll never show you which one. Still, I want to convince you it's a **Red** one.

Do you believe me? Why would you? The only way for me to convince you it's a Red one is to show you my card, right?

Well - I have a different answer for you. If we play with a standard deck of cards (which is important, I'll further explain why), there are **51** more cards in the deck. **25 of them Red, 26 Black** - as per my claim. If I show you all of the Red ones, you can easily learn my card, if I am to speak the truth, but still, my card can be Black.

For me to support my claim, I'll have to show you every last one of those **26 Black cards** - that's the only way you will be convinced my statement is true without seeing my card.

![ZK Proof Cards Example](/images/zk-proof-cards-example.png)

AAAAND - game over! Bravo, you just learned how ZKPs work! 🙌

Let's tap into lessons:

For you to be convinced, it is necessary for us to agree that we play under given circumstances that our deck is standard and therefore, known to both of us. That being said, our space for proving is a finite one.

But Milica! Where is there Zero Knowledge Proof? 🤔

Well, it's right under your nose. I **never showed my card**, remember? You never knew which card I drew, but I still managed to convince you my card is a **Red** one.

That's the beauty of ZKPs.
