// Math and Quantitative lessons for HSPT, SSAT, and ISEE. See content/SCHEMA.md (Lesson object).
'use strict';

const lessons = [
{
  id: 'all-math-arithmetic',
  test: 'all',
  section: 'math',
  skill: 'arithmetic',
  title: 'Arithmetic: Order of Operations, Negatives, and Mental Math',
  minutes: 14,
  level: 2,
  objectives: [
    'Apply the order of operations and explain why it exists',
    'Add, subtract, multiply, and divide negative numbers without sign errors',
    'Use the commutative, associative, and distributive properties to compute faster',
    'Estimate an answer before computing to catch mistakes'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Why there is an order of operations',
      md: `### One expression, one answer

Look at 2 + 3 × 4. If you work left to right you get 20. If you multiply first you get 14. Both cannot be right, so mathematicians agreed on a convention so that every expression has exactly one value.

The convention is not random. Multiplication is **repeated addition**, and exponents are **repeated multiplication**. The "stronger" operation binds tighter, so it happens first. Parentheses let a writer override that order on purpose.

### The order

1. **Parentheses** (and other grouping symbols: brackets, fraction bars, the bar under a square root).
2. **Exponents** and roots.
3. **Multiplication and division**, left to right, as one tier.
4. **Addition and subtraction**, left to right, as one tier.

The "left to right" part matters. 12 ÷ 3 × 2 is (12 ÷ 3) × 2 = 8, not 12 ÷ 6 = 2. Division does not wait for multiplication; they are equals.

### Negative numbers

A negative number is a distance **below zero**. Two ideas handle every case:

- **Adding a negative is subtracting.** 7 + (−3) = 7 − 3 = 4.
- **Subtracting a negative is adding.** 7 − (−3) = 7 + 3 = 10. Removing a debt makes you richer.

For multiplication and division, count the negative signs: an **even** count gives a positive result, an **odd** count gives a negative result. (−2)(−3)(−4) has three negatives, so the product is −24.

### Properties that let you rearrange

- **Commutative**: a + b = b + a and ab = ba. Order does not matter for adding or multiplying.
- **Associative**: (a + b) + c = a + (b + c). Grouping does not matter for adding or multiplying.
- **Distributive**: a(b + c) = ab + ac. This is the bridge between multiplication and addition.

These are not trivia. They are permission slips to compute in whatever order is easiest.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### For any multi-step expression

1. **Scan for grouping symbols** first. Treat the top and bottom of a fraction as if they were in parentheses.
2. **Resolve exponents and roots**, including signs: (−3)² = 9 but −3² = −9, because the exponent only grabs what is directly under it.
3. **Sweep left to right for × and ÷.**
4. **Sweep left to right for + and −.** Rewrite subtraction of a negative as addition before you move.

### For mental math

- **Make tens.** 47 + 38 = 47 + 40 − 2 = 85.
- **Split with the distributive property.** 6 × 48 = 6 × 50 − 6 × 2 = 300 − 12 = 288.
- **Regroup with the associative property.** 25 × 7 × 4 = (25 × 4) × 7 = 100 × 7 = 700.
- **Compensate.** 1,000 − 387: think 387 + 13 = 400, and 400 + 600 = 1,000, so the answer is 613.

### Estimate first, then compute

Round every number to one significant figure and get a ballpark. If your exact answer is far from the ballpark, you made an error. This takes five seconds and catches most sign and place-value slips.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Evaluate 18 − 3 × (2 − 6)² ÷ 4.

**Step 1.** The question asks for a single value. I see parentheses, an exponent, multiplication, division, and subtraction, so I need to go in order.

**Step 2.** Parentheses first: 2 − 6 = −4. The expression becomes 18 − 3 × (−4)² ÷ 4.

**Step 3.** Exponent next. The exponent applies to (−4), the whole thing in parentheses, so (−4)² = 16. Now I have 18 − 3 × 16 ÷ 4.

**Step 4.** Multiplication and division, left to right. 3 × 16 = 48 first, then 48 ÷ 4 = 12. Now: 18 − 12.

**Step 5.** Subtract: 18 − 12 = 6.

**Check by estimate:** 3 × 16 is about 50, divided by 4 is about 12, and 18 minus 12 is 6. The ballpark matches. **Answer: 6.**

**Where students go wrong on this exact problem:** computing 18 − 3 = 15 first (ignoring order), or writing (−4)² = −16 (forgetting an even number of negatives is positive).`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Evaluate −2³ + 5 × (7 − 10).

I have started it for you:

- Parentheses: 7 − 10 = −3. The expression is now −2³ + 5 × (−3).
- Exponent: notice there are no parentheses around −2, so the exponent only applies to the 2. That means −2³ = −(2³) = −8.

Now finish: compute 5 × (−3), then add.`,
      question: {
        stem: 'What is the value of −2³ + 5 × (7 − 10)?',
        choices: ['−23', '−7', '7', '23'],
        answer: 0,
        explanation: 'After the setup, 5 × (−3) = −15, so the expression is −8 + (−15) = −23. The trap is treating −2³ as (−2)³ = −8 (same value here by luck, but the reasoning matters) or as +8, which gives −7. Always ask what the exponent is attached to.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **−3² is not 9.** Without parentheses, the exponent grabs only the 3. −3² = −9. (−3)² = 9.
- **Division and multiplication are equals.** 24 ÷ 4 × 2 = 12, not 3. Go left to right.
- **A double negative is a plus.** 5 − (−5) = 10. Rewrite before you compute.
- **The fraction bar is a grouping symbol.** In (6 + 9) / 3, add first, then divide: 5.
- **Mental shortcuts need both halves.** 6 × 48 = 6 × 50 − 6 × 2. If you subtract only 2 instead of 12, you get 298 instead of 288.
- **Sign of a sum of mixed numbers.** −9 + 4 = −5 because the number farther from zero wins the sign.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Evaluate 40 ÷ 5 × 2 + 3².',
          choices: ['7', '13', '25', '31'],
          answer: 2,
          explanation: 'Exponent first: 3² = 9. Then × and ÷ left to right: 40 ÷ 5 = 8, and 8 × 2 = 16. Finally 16 + 9 = 25. The trap is doing 5 × 2 first, which gives 40 ÷ 10 = 4, then 4 + 9 = 13.'
        },
        {
          stem: 'What is (−6) − (−11)?',
          choices: ['−17', '−5', '5', '17'],
          answer: 2,
          explanation: 'Subtracting a negative is adding: −6 + 11 = 5. Students who forget to flip the second sign get −17. Think of removing an 11-dollar debt from someone 6 dollars in debt: they end up 5 dollars ahead.'
        },
        {
          stem: 'Which expression equals 8 × 37 when rewritten with the distributive property?',
          choices: ['8 × 30 + 7', '8 × 40 − 3', '8 × 30 + 8 × 7', '8 + 30 × 7'],
          answer: 2,
          explanation: '8 × 37 = 8 × (30 + 7) = 8 × 30 + 8 × 7 = 240 + 56 = 296. The distributive property multiplies the 8 by each part. Choice A forgets to multiply the 7 by 8; choice B forgets to multiply the 3 by 8.'
        },
        {
          stem: 'Evaluate (−2)⁴ − 2⁴.',
          choices: ['−32', '−16', '0', '32'],
          answer: 2,
          explanation: 'An even number of negative factors gives a positive product, so (−2)⁴ = 16, and 2⁴ = 16. The difference is 0. Students who think (−2)⁴ = −16 get −32.'
        },
        {
          stem: 'Which is the best estimate of 398 × 51?',
          choices: ['2,000', '20,000', '200,000', '2,000,000'],
          answer: 1,
          explanation: 'Round each number to one significant figure: 400 × 50 = 20,000. Estimating before you compute catches place-value errors, which are the most common mistakes on multi-digit multiplication.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Order of operations exists so that every expression has one value: grouping, exponents, then × and ÷ left to right, then + and − left to right.
- The exponent only applies to what is directly under it: −3² = −9, (−3)² = 9.
- Adding a negative subtracts; subtracting a negative adds. Count negative factors: even is positive, odd is negative.
- Commutative, associative, and distributive properties are permission to rearrange for easier arithmetic.
- Estimate first. A five-second ballpark catches most errors.`
    }
  ]
},
{
  id: 'all-math-number-theory',
  test: 'all',
  section: 'math',
  skill: 'arithmetic',
  title: 'Number Theory: Factors, Multiples, Primes, GCF and LCM',
  minutes: 14,
  level: 2,
  objectives: [
    'Distinguish factors from multiples and primes from composites',
    'Build a prime factorization with a factor tree',
    'Find the GCF and LCM from prime factorizations and know which word problems want which',
    'Use divisibility rules for 2, 3, 4, 5, 6, 8, 9, and 10'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Factors, multiples, and primes',
      md: `### Factors go in, multiples go out

A **factor** of a number divides it with no remainder. The factors of 12 are 1, 2, 3, 4, 6, 12. Factors are always **less than or equal to** the number, and there are finitely many.

A **multiple** of a number is what you get by multiplying it by a whole number. The multiples of 12 are 12, 24, 36, 48, ... Multiples are always **greater than or equal to** the number, and there are infinitely many.

A quick memory hook: a **f**actor **f**its inside; a **m**ultiple **m**ultiplies outward.

### Primes are the building blocks

A **prime** has exactly two factors: 1 and itself. The primes under 30 are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Note that **2 is the only even prime** and **1 is not prime** (it has only one factor).

Every whole number greater than 1 is either prime or can be written as a product of primes in exactly one way. That is why a **prime factorization** is like a number's fingerprint. 360 = 2³ × 3² × 5, and no other combination of primes multiplies to 360.

### GCF and LCM from the fingerprint

The **greatest common factor** of two numbers is the largest number that divides both. Build it from the primes they **share**, using the **smaller** power of each.

The **least common multiple** is the smallest number both divide into. Build it from **all** primes that appear in either, using the **larger** power of each.

Example: 24 = 2³ × 3 and 36 = 2² × 3².
- GCF = 2² × 3 = 12 (smaller powers of the shared primes).
- LCM = 2³ × 3² = 72 (larger powers of everything).

A useful check: GCF × LCM = the product of the two numbers. 12 × 72 = 864 = 24 × 36.

### Divisibility rules and why they work

- **2**: last digit even. **5**: last digit 0 or 5. **10**: last digit 0. (Only the ones digit matters because every other place is a multiple of 10.)
- **4**: last two digits divisible by 4. **8**: last three digits divisible by 8. (100 is a multiple of 4; 1,000 is a multiple of 8.)
- **3**: digit sum divisible by 3. **9**: digit sum divisible by 9. (Each power of 10 is one more than a multiple of 9, so a number and its digit sum leave the same remainder.)
- **6**: divisible by both 2 and 3.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Prime factorization

1. Split the number into any two factors you see (even numbers: pull out 2; ends in 5: pull out 5; digit sum divisible by 3: pull out 3).
2. Keep splitting any composite branch until every leaf is prime.
3. Collect the leaves with exponents.

### GCF or LCM: which does the problem want?

- Ask: am I **cutting things down** into equal pieces as large as possible, or **splitting** into the most groups? That is **GCF**. Words: "greatest", "largest", "divide evenly", "same size".
- Ask: am I waiting for events to **line up again**, or looking for the **smallest** quantity that works for everyone? That is **LCM**. Words: "least", "smallest", "both again", "next time", "at the same time".

### Finding GCF and LCM quickly

1. Write each number's prime factorization.
2. GCF: multiply shared primes with the smaller exponents.
3. LCM: multiply all primes with the larger exponents.
4. Check with GCF × LCM = product of the numbers (for two numbers).

### Counting factors

To count how many factors a number has, add 1 to each exponent in the prime factorization and multiply. 360 = 2³ × 3² × 5¹ has (3+1)(2+1)(1+1) = 24 factors.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Two buses leave a station at 8:00 a.m. One returns every 18 minutes, the other every 24 minutes. When will they next leave at the same time?

**Step 1.** The question asks when the schedules **line up again**. That is a "both again" situation, so I need the LCM of 18 and 24, not the GCF.

**Step 2.** Factor each. 18 = 2 × 9 = 2 × 3². 24 = 2 × 12 = 2 × 2 × 6 = 2³ × 3.

**Step 3.** LCM takes every prime at its larger power: 2³ × 3² = 8 × 9 = 72.

**Step 4.** 72 minutes is 1 hour 12 minutes. 8:00 + 1:12 = **9:12 a.m.**

**Check:** 72 ÷ 18 = 4 trips, 72 ÷ 24 = 3 trips. Both are whole numbers, so 72 works. Could anything smaller work? The GCF is 2 × 3 = 6, and 18 × 24 ÷ 6 = 72, confirming 72 is the least.

**Trap on this problem:** picking the GCF (6 minutes) because it is a "smaller" number, or multiplying 18 × 24 = 432 and forgetting to reduce.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** A florist has 36 roses and 60 tulips. She wants to make identical bouquets using all the flowers, with no flowers left over. What is the greatest number of bouquets she can make?

Setup done for you:

- "Identical bouquets, greatest number, nothing left over" means I am **dividing both quantities into the same number of equal groups**. That is the **GCF**.
- 36 = 2² × 3². 60 = 2² × 3 × 5.

Now finish: take the shared primes at their smaller powers and multiply.`,
      question: {
        stem: 'What is the greatest number of identical bouquets she can make from 36 roses and 60 tulips?',
        choices: ['6', '12', '15', '180'],
        answer: 1,
        explanation: 'Shared primes with smaller powers: 2² × 3 = 12. Each of the 12 bouquets gets 3 roses and 5 tulips. Choice D (180) is the LCM, which answers a different question. Choice A (6) is a common factor but not the greatest.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **1 is not prime, and 2 is prime.** Questions love "which of these is prime" with 1 or 2 in the list.
- **Factors vs. multiples get swapped.** Factors are small and finite; multiples are large and endless.
- **GCF when the problem wants LCM** (and vice versa). "Line up again" and "smallest that works for both" mean LCM. "Largest equal groups" means GCF.
- **Stopping the factor tree early.** 4, 6, 9 are not primes; keep splitting.
- **Divisibility by 3 vs. by 9.** 123 has digit sum 6, so it is divisible by 3 but not 9.
- **Divisibility by 4 uses the last two digits, not the last one.** 1,314 ends in 4 but 14 ÷ 4 is not whole, so 1,314 is not divisible by 4.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'What is the prime factorization of 84?',
          choices: ['2 × 42', '2² × 3 × 7', '2 × 3 × 14', '4 × 21'],
          answer: 1,
          explanation: '84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7 = 2² × 3 × 7. The other choices contain composite numbers (42, 14, 4, 21), so the tree is not finished.'
        },
        {
          stem: 'What is the least common multiple of 8 and 12?',
          choices: ['4', '24', '48', '96'],
          answer: 1,
          explanation: '8 = 2³ and 12 = 2² × 3. LCM uses the larger power of each prime: 2³ × 3 = 24. Choice A is the GCF. Choice D is the product 8 × 12, which is a common multiple but not the least.'
        },
        {
          stem: 'Which number is divisible by 9?',
          choices: ['4,323', '5,113', '7,235', '8,316'],
          answer: 3,
          explanation: 'Add the digits. 8 + 3 + 1 + 6 = 18, which is divisible by 9, so 8,316 is divisible by 9. The others fail: 4,323 has digit sum 12 (divisible by 3 but not 9), 5,113 has digit sum 10, and 7,235 has digit sum 17. The trap is confusing the rule for 3 with the rule for 9.'
        },
        {
          stem: 'How many positive factors does 72 have?',
          choices: ['6', '8', '10', '12'],
          answer: 3,
          explanation: '72 = 2³ × 3². Add 1 to each exponent and multiply: (3 + 1)(2 + 1) = 12. Listing confirms: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72. The trap is listing by hand and missing a pair such as 8 and 9.'
        },
        {
          stem: 'Which of the following is a prime number?',
          choices: ['1', '51', '57', '53'],
          answer: 3,
          explanation: '53 has no factors other than 1 and itself (test primes up to √53 ≈ 7.3: not divisible by 2, 3, 5, or 7). 51 = 3 × 17 and 57 = 3 × 19; both have digit sums divisible by 3. 1 is not prime because it has only one factor.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Factors fit inside a number (finite); multiples multiply outward (infinite).
- A prime has exactly two factors. 1 is not prime; 2 is the only even prime.
- Prime factorization is a number's fingerprint. GCF uses shared primes at smaller powers; LCM uses all primes at larger powers.
- "Largest equal groups" wants GCF. "Line up again" or "smallest for both" wants LCM.
- Divisibility: 2, 5, 10 look at the last digit; 4 and 8 at the last two or three digits; 3 and 9 at the digit sum.`
    }
  ]
},
{
  id: 'all-math-fractions',
  test: 'all',
  section: 'math',
  skill: 'fractions-decimals',
  title: 'Fractions: Why Common Denominators, and How to Multiply, Divide, and Compare',
  minutes: 15,
  level: 2,
  objectives: [
    'Explain why adding fractions requires a common denominator but multiplying does not',
    'Add, subtract, multiply, and divide fractions and mixed numbers reliably',
    'Compare and order fractions with three different techniques',
    'Simplify by canceling common factors before multiplying'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What a fraction really is',
      md: `### Denominator names the unit, numerator counts it

The fraction 3/4 means "three pieces, each of size one-fourth." The **denominator** tells you what kind of piece; the **numerator** tells you how many.

This explains the most important rule in fractions. You can only add things that are the same kind. 3 apples + 2 apples = 5 apples, but 3 apples + 2 oranges is not 5 of anything. Likewise 3/4 + 1/4 = 4/4 because both are counts of fourths. But 1/2 + 1/3 cannot be added until both are expressed in the same kind of piece: sixths. 3/6 + 2/6 = 5/6.

That is **why** you need a common denominator for addition and subtraction. It is not a rule to memorize; it is "same units before you count."

### Equivalent fractions

Multiplying top and bottom by the same number does not change the value, because you are multiplying by 1 (for example 3/3). Cutting each fourth into three pieces gives twelfths: 3/4 = 9/12. Simplifying runs this backward: divide top and bottom by a common factor.

### Multiplication does not need a common denominator

2/3 × 4/5 means "two-thirds **of** four-fifths." Take four-fifths, cut it into thirds, keep two of them. The pieces are now fifteenths (3 × 5), and you have 2 × 4 = 8 of them. So multiply tops, multiply bottoms: 8/15. No common denominator is required because you are not counting like units; you are scaling.

### Division is multiplication by the reciprocal

6 ÷ 1/2 asks "how many halves fit into 6?" Twelve. That is 6 × 2. In general, dividing by a/b is multiplying by b/a, because a/b × b/a = 1, and multiplying by the reciprocal undoes multiplying by the fraction. "Keep, change, flip" is the shortcut; the reason is undoing.

### Mixed numbers

2 3/4 means 2 + 3/4. For multiplying or dividing, convert to an improper fraction: 2 × 4 + 3 = 11, so 11/4. For adding, you can either convert or add whole parts and fraction parts separately.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Add or subtract

1. Find the LCM of the denominators (the least common denominator).
2. Rewrite each fraction with that denominator (multiply top and bottom by the same factor).
3. Add or subtract the numerators. Keep the denominator.
4. Simplify.

### Multiply

1. Convert mixed numbers to improper fractions.
2. **Cancel first**: any numerator and any denominator that share a factor can both be divided by it.
3. Multiply straight across.

### Divide

1. Convert mixed numbers.
2. Keep the first fraction, change ÷ to ×, flip the second.
3. Now multiply (cancel first).

### Compare two fractions

- **Same denominator?** Bigger numerator wins.
- **Same numerator?** Smaller denominator wins, because the pieces are bigger. 3/5 > 3/8.
- **Otherwise, cross-multiply.** For a/b vs. c/d, compare a × d with c × b. The side with the bigger product is the bigger fraction. (This works because you are secretly putting both over bd.)
- **Benchmark.** Is each fraction above or below 1/2? Close to 1? 5/9 is a bit above half; 4/9 is a bit below.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Compute 2 1/3 ÷ 1 3/4.

**Step 1.** The question asks for a quotient of mixed numbers. I know division needs improper fractions, so I convert first.

2 1/3 = (2 × 3 + 1)/3 = 7/3. 1 3/4 = (1 × 4 + 3)/4 = 7/4.

**Step 2.** Keep, change, flip: 7/3 ÷ 7/4 = 7/3 × 4/7.

**Step 3.** Cancel before multiplying. The 7 on top and the 7 on the bottom cancel to 1. Now I have 1/3 × 4/1 = 4/3.

**Step 4.** As a mixed number, 4/3 = 1 1/3.

**Reasonableness check:** 2 1/3 is a bit more than 1 3/4, so the quotient should be a bit more than 1. 1 1/3 fits. If I had gotten 4 or 1/4, I would know something went wrong.

**Trap on this problem:** flipping the first fraction instead of the second, or dividing 2 ÷ 1 and 1/3 ÷ 3/4 separately (mixed numbers do not split for division).`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Compute 5/6 − 3/8.

Setup done for you:

- Subtraction needs like units. The denominators are 6 and 8. 6 = 2 × 3 and 8 = 2³, so the LCM is 2³ × 3 = 24.
- 5/6 = 20/24 (multiply top and bottom by 4). 3/8 = 9/24 (multiply by 3).

Now subtract the numerators and simplify if possible.`,
      question: {
        stem: 'What is 5/6 − 3/8?',
        choices: ['2/14', '1/12', '11/24', '13/24'],
        answer: 2,
        explanation: '20/24 − 9/24 = 11/24, and 11 is prime so it does not simplify. Choice A (2/14) comes from subtracting the numerators and adding the denominators, which treats the fractions as if they were already the same unit. Choice D is an addition slip. Always convert to the same unit first.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Adding denominators.** 1/2 + 1/3 is not 2/5. Same units first.
- **Finding a common denominator when multiplying.** It is not wrong, but it wastes time and creates huge numbers.
- **Flipping the wrong fraction.** Only the divisor (the second fraction) gets flipped.
- **Canceling across addition.** You can cancel only in a product, never in a sum. (2 + 4)/2 is not 1 + 4.
- **Forgetting the whole number** when converting a mixed number: 3 1/2 is 7/2, not 3/2 or 4/2.
- **Bigger denominator, bigger fraction?** No. With the same numerator, a bigger denominator means smaller pieces: 1/8 < 1/5.
- **Not simplifying.** Answer choices are usually in lowest terms, so 6/8 will not appear; 3/4 will.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'What is 3/4 + 5/6?',
          choices: ['8/10', '4/5', '1 7/12', '1 1/2'],
          answer: 2,
          explanation: 'LCM of 4 and 6 is 12. 3/4 = 9/12 and 5/6 = 10/12, so the sum is 19/12 = 1 7/12. Choice A adds tops and bottoms separately, which is the classic error.'
        },
        {
          stem: 'What is 4/9 × 3/8?',
          choices: ['1/6', '7/17', '12/17', '32/27'],
          answer: 0,
          explanation: 'Cancel first: 4 and 8 share 4, giving 1 and 2; 3 and 9 share 3, giving 1 and 3. Then 1/3 × 1/2 = 1/6. Without canceling you get 12/72, which also simplifies to 1/6. Choice D is the result of flipping as if dividing.'
        },
        {
          stem: 'Which fraction is greatest?',
          choices: ['5/8', '7/12', '2/3', '11/18'],
          answer: 2,
          explanation: 'Use a common denominator of 72: 5/8 = 45/72, 7/12 = 42/72, 2/3 = 48/72, 11/18 = 44/72. So 2/3 is greatest. Benchmarking also works: all are above 1/2, but 2/3 is the farthest from 1/2 (1/6 above it, versus 1/8, 1/12, and 1/9 for the others).'
        },
        {
          stem: 'What is 3 1/2 ÷ 7?',
          choices: ['1/2', '2', '24 1/2', '1/14'],
          answer: 0,
          explanation: '3 1/2 = 7/2. Dividing by 7 is multiplying by 1/7: 7/2 × 1/7 = 1/2. Reasonableness: three and a half split into 7 equal parts should give a small number, so 24 1/2 (from multiplying) is impossible.'
        },
        {
          stem: 'A recipe uses 2/3 cup of sugar. How much sugar is needed for 1 1/2 batches?',
          choices: ['2/3 cup', '1 cup', '1 1/6 cups', '2 1/6 cups'],
          answer: 1,
          explanation: '"Of" means multiply: 1 1/2 × 2/3 = 3/2 × 2/3 = 1. Cancel the 3s and 2s to see it instantly. Choice D comes from adding instead of multiplying. One and a half batches of two-thirds is a whole cup.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- The denominator names the unit; the numerator counts it. Adding needs the same unit, so find a common denominator.
- Multiplying is scaling: multiply across, after canceling common factors.
- Dividing by a fraction is multiplying by its reciprocal because that undoes the fraction.
- Convert mixed numbers to improper fractions before multiplying or dividing.
- Compare with a common denominator, cross-multiplication, or a benchmark like 1/2.`
    }
  ]
},
{
  id: 'all-math-decimals',
  test: 'all',
  section: 'math',
  skill: 'fractions-decimals',
  title: 'Decimals and the Fraction-Decimal-Percent Triangle',
  minutes: 13,
  level: 2,
  objectives: [
    'Explain decimals as fractions with powers of ten in the denominator',
    'Add, subtract, multiply, and divide decimals by tracking place value',
    'Convert fluently among fractions, decimals, and percents',
    'Recognize the common equivalences (1/8 = 0.125 = 12.5%) on sight'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Decimals are fractions in disguise',
      md: `### Place value continues past the point

Each place to the right of the decimal point is one-tenth of the place before it: tenths, hundredths, thousandths. So 0.375 means 3/10 + 7/100 + 5/1000, which equals 375/1000. Read it as "three hundred seventy-five thousandths" and the fraction writes itself.

This single idea explains every decimal rule:

- **Adding and subtracting** line up the decimal points because you must add tenths to tenths and hundredths to hundredths (same units, just like fractions).
- **Multiplying** counts decimal places because 0.3 × 0.07 = 3/10 × 7/100 = 21/1000 = 0.021. One place plus two places gives three places.
- **Dividing** by a decimal moves the point because dividing by 0.25 is the same as dividing by 25 after multiplying both numbers by 100 (that is multiplying the whole division by 100/100 = 1).

### The triangle: fraction, decimal, percent

All three are ways to write the same number.

- **Fraction to decimal**: divide the numerator by the denominator. 3/8 = 3 ÷ 8 = 0.375.
- **Decimal to percent**: multiply by 100, which moves the point two places right. 0.375 = 37.5%. "Percent" means "per hundred," so this is just re-labeling in hundredths.
- **Percent to fraction**: put it over 100 and simplify. 37.5% = 37.5/100 = 375/1000 = 3/8.
- **Decimal to fraction**: write the digits over the place value of the last digit, then simplify. 0.6 = 6/10 = 3/5.

### Equivalences to know cold

| Fraction | Decimal | Percent |
|---|---|---|
| 1/2 | 0.5 | 50% |
| 1/3 | 0.333... | 33 1/3% |
| 2/3 | 0.666... | 66 2/3% |
| 1/4 | 0.25 | 25% |
| 3/4 | 0.75 | 75% |
| 1/5 | 0.2 | 20% |
| 1/8 | 0.125 | 12.5% |
| 3/8 | 0.375 | 37.5% |
| 1/10 | 0.1 | 10% |

If 1/8 is 0.125, then 5/8 is 5 × 0.125 = 0.625. You only need to memorize the unit fraction.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Operations

1. **Add or subtract**: line up the decimal points. Pad with zeros. Add or subtract as whole numbers. Bring the point straight down.
2. **Multiply**: ignore the points and multiply the whole numbers. Count total decimal places in the factors. Place the point that many places from the right in the product.
3. **Divide**: move the point in the divisor until it is a whole number. Move the point in the dividend the same number of places. Divide. The point in the answer goes directly above the point in the dividend.

### Conversions

- Need a decimal from a fraction? Divide, or scale the denominator to 10, 100, or 1,000 when possible (7/20 = 35/100 = 0.35).
- Need a percent from a decimal? Slide the point two places **right**.
- Need a decimal from a percent? Slide the point two places **left**.
- Need to compare a mix of fractions, decimals, and percents? Convert everything to decimals; they are easiest to line up.

### Estimate before you place the point

0.48 × 21 is about 0.5 × 20 = 10. If your answer is 100.8 or 1.008, the point is misplaced. The estimate tells you which.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Which is greatest: 0.62, 5/8, 61%, or 3/5?

**Step 1.** The question asks me to compare four numbers written in three different forms. I know comparing is easiest when everything is in the same form, so I will convert all of them to decimals.

**Step 2.** 0.62 stays as is. 5/8: I know 1/8 = 0.125, so 5/8 = 0.625. 61% slides two places left: 0.61. 3/5: I know 1/5 = 0.2, so 3/5 = 0.6.

**Step 3.** Line them up with the same number of places: 0.620, 0.625, 0.610, 0.600.

**Step 4.** Compare left to right digit by digit. All have 6 in the tenths place. In the hundredths place: 2, 2, 1, 0. The two with 2 are 0.620 and 0.625. In the thousandths place: 0 vs. 5. So 0.625 is greatest. **Answer: 5/8.**

**Trap on this problem:** judging 0.62 bigger than 0.625 because "62 is shorter" or "two digits look cleaner," or assuming 61% is bigger than 0.62 because 61 is a bigger-looking number than 0.62. Padding zeros removes that illusion.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Compute 3.6 ÷ 0.08.

Setup done for you:

- The divisor 0.08 has two decimal places. I move the point two places right to make it 8.
- I must do the same to the dividend: 3.6 becomes 360.
- The problem is now 360 ÷ 8, a whole-number division.

Finish the division and check with an estimate: 3.6 ÷ 0.08 is roughly 4 ÷ 0.1 = 40, so the answer should be in that neighborhood.`,
      question: {
        stem: 'What is 3.6 ÷ 0.08?',
        choices: ['0.45', '4.5', '45', '450'],
        answer: 2,
        explanation: '360 ÷ 8 = 45. The estimate (about 40) confirms the point is in the right place. Choices B and A come from moving the point in only one of the two numbers or in the wrong direction. Dividing by a number less than 1 makes the result bigger, so 0.45 and 4.5 are impossible.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Longer decimal is not bigger.** 0.7 > 0.6999. Pad with zeros and compare place by place.
- **Lining up the right edge when adding.** 2.5 + 0.35 is 2.85, not 0.60. Line up the decimal points.
- **Moving the point in only one number when dividing.** Both the divisor and dividend shift.
- **Percent to decimal in the wrong direction.** 5% = 0.05, not 0.5. 150% = 1.5.
- **0.5% vs. 50%.** The first is half of one percent (0.005). Read carefully.
- **Repeating decimals.** 1/3 is 0.333..., not 0.33. On a comparison, 1/3 > 0.33.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'What is 0.4 × 0.35?',
          choices: ['0.014', '0.14', '1.4', '14'],
          answer: 1,
          explanation: '4 × 35 = 140. The factors have 1 + 2 = 3 decimal places, so the product is 0.140 = 0.14. Estimate: 0.4 × 0.35 is a bit less than half of 0.35, which is about 0.17, so 0.14 is reasonable and 1.4 is not.'
        },
        {
          stem: 'Which of the following is equal to 7/8?',
          choices: ['0.78', '0.825', '0.875', '87%'],
          answer: 2,
          explanation: '1/8 = 0.125, so 7/8 = 7 × 0.125 = 0.875. Choice A just glues the digits together. Choice D is close but 87% = 0.87, not 0.875.'
        },
        {
          stem: 'Order from least to greatest: 2/5, 0.45, 38%.',
          choices: ['2/5, 0.45, 38%', '38%, 2/5, 0.45', '0.45, 38%, 2/5', '38%, 0.45, 2/5'],
          answer: 1,
          explanation: 'Convert to decimals: 2/5 = 0.40, 0.45 = 0.45, 38% = 0.38. Ordered: 0.38, 0.40, 0.45, which is 38%, 2/5, 0.45. Converting everything to one form is the whole strategy.'
        },
        {
          stem: 'What is 12.5% written as a fraction in lowest terms?',
          choices: ['1/8', '1/12', '12/5', '125/100'],
          answer: 0,
          explanation: '12.5% = 12.5/100 = 125/1000 = 1/8. This is one of the equivalences worth memorizing: 1/8 = 0.125 = 12.5%. Choice D is equal in value but not in lowest terms.'
        },
        {
          stem: 'What is 5 − 1.372?',
          choices: ['3.628', '3.738', '4.372', '4.628'],
          answer: 0,
          explanation: 'Write 5 as 5.000 and line up the points: 5.000 − 1.372 = 3.628. Estimate: 5 minus about 1.4 is about 3.6. Choice C comes from subtracting only the whole-number part.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- A decimal is a fraction with a power of ten underneath. Every decimal rule follows from place value.
- Add and subtract by lining up points; multiply by counting places; divide by shifting both numbers until the divisor is whole.
- Fraction to decimal: divide. Decimal to percent: slide right two. Percent to decimal: slide left two.
- Memorize the unit fractions (1/2, 1/3, 1/4, 1/5, 1/8, 1/10) and scale them.
- To compare mixed forms, convert everything to decimals and pad with zeros.`
    }
  ]
},
{
  id: 'all-math-percent',
  test: 'all',
  section: 'math',
  skill: 'percent-ratio',
  title: 'Percent: Part, Whole, Change, and the 1% Trick',
  minutes: 15,
  level: 3,
  objectives: [
    'Translate any percent sentence into the equation part = percent × whole',
    'Compute percent change with the original amount as the base',
    'Handle successive percent changes by multiplying, not adding',
    'Use the 1% and 10% tricks for fast mental percents'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Percent means "per hundred"',
      md: `### One idea underneath every percent problem

A percent is a fraction with denominator 100. 35% is 35/100, or 0.35. That is the whole definition. Everything else follows.

Every percent problem connects three quantities: a **part**, a **whole**, and the **percent** that relates them.

**part = percent × whole**

Any one of the three can be the unknown:

- "What is 30% of 80?" The part is unknown: part = 0.30 × 80 = 24.
- "24 is what percent of 80?" The percent is unknown: 24 = p × 80, so p = 24/80 = 0.30 = 30%.
- "24 is 30% of what?" The whole is unknown: 24 = 0.30 × w, so w = 24/0.30 = 80.

The word **of** signals the whole. The word **is** signals equals.

### Percent change compares to where you started

Percent increase or decrease is always measured against the **original** amount:

**percent change = (amount of change) ÷ (original) × 100%**

A price going from 50 to 60 is a 10/50 = 20% increase. Going from 60 back to 50 is a 10/60 = 16.7% decrease. Same 10 dollars, different percents, because the base changed. This asymmetry is the source of most percent traps.

### Successive percents multiply

A 20% increase means the new amount is 120% of the old, which is multiplying by 1.20. A 20% decrease is multiplying by 0.80. Two changes in a row multiply: up 20% then down 20% is 1.20 × 0.80 = 0.96, a net 4% **decrease**, not zero. Percents of different bases never simply add.

### The 1% and 10% tricks

10% of anything is the number with the decimal point moved one place left. 1% moves it two places. Build any percent from those pieces:

- 15% of 240: 10% is 24, 5% is half of that (12), total 36.
- 3% of 450: 1% is 4.5, so 3% is 13.5.
- 35% of 80: 10% is 8, so 30% is 24, and 5% is 4, total 28.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### For a plain percent sentence

1. Underline the number after **of**: that is the whole.
2. Write **part = percent × whole**, filling in what you know. Write the percent as a decimal.
3. Solve for the missing piece. If the whole is missing, divide the part by the decimal.

### For percent change

1. Identify the **original** (before) and the **new** (after).
2. Change = new − original (keep the sign: negative means decrease).
3. Divide the change by the original. Convert to a percent.

### For "after a change, what is the new amount?"

1. Convert the change to a multiplier: increase of p% is (1 + p/100); decrease of p% is (1 − p/100).
2. Multiply the original by that multiplier.
3. For several changes in a row, multiply all the multipliers together.

### For finding the original from the new amount

If a shirt costs 36 dollars after a 25% discount, then 36 is 75% of the original. 36 = 0.75 × w, so w = 48. Never add 25% back onto 36; that gives 45, which is wrong because the base is different.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** A store raises the price of a jacket by 25%, then puts it on sale for 20% off the new price. If the original price was 80 dollars, what is the final price, and what is the overall percent change?

**Step 1.** The question asks for a final price after two successive changes, then the net percent change. I know successive percents multiply, so I will build two multipliers.

**Step 2.** A 25% increase is a multiplier of 1.25. A 20% decrease is a multiplier of 0.80.

**Step 3.** Final price = 80 × 1.25 × 0.80. I can compute 1.25 × 0.80 first: that is 1.00. So the final price is 80 × 1.00 = **80 dollars**.

**Step 4.** The overall change is 0%. Interesting: up 25% then down 20% returns exactly to the start, because 5/4 × 4/5 = 1.

**Check with the 10% trick:** 25% of 80 is 20, so the raised price is 100. 20% of 100 is 20, so the sale price is 80. Matches.

**Trap on this problem:** adding the percents (+25% − 20% = +5%) and answering 84 dollars. The 20% comes off 100, not off 80, so the amounts are different even though the percent looks smaller.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** After a 15% discount, a backpack sells for 51 dollars. What was the original price?

Setup done for you:

- The 51 dollars is the **new** amount, after the discount. The original is unknown; call it w.
- A 15% discount means the sale price is 100% − 15% = 85% of the original.
- Equation: 51 = 0.85 × w.

Now solve for w. Hint: 0.85 × 60 = 51? Check: 10% of 60 is 6, 5% is 3, so 15% of 60 is 9, and 60 − 9 = 51.`,
      question: {
        stem: 'A backpack sells for 51 dollars after a 15% discount. What was the original price?',
        choices: ['43.35 dollars', '58.65 dollars', '60 dollars', '66 dollars'],
        answer: 2,
        explanation: '51 ÷ 0.85 = 60. Verify: 15% of 60 is 9, and 60 − 9 = 51. Choice B (58.65) is the trap of adding 15% of 51 back on; the discount was taken from the original, not from 51. Choice A applies the discount a second time.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Using the new amount as the base for percent change.** Always divide by the original.
- **Adding successive percents.** Up 50% then down 50% is 1.5 × 0.5 = 0.75, a 25% loss.
- **Undoing a discount by adding the same percent back.** 20% off then 20% on does not return you to the start.
- **Forgetting to convert the percent to a decimal.** 30% of 80 is 0.30 × 80, not 30 × 80.
- **"Percent of" vs. "percent more than."** 120 is 150% **of** 80 but 50% **more than** 80.
- **Percentage points vs. percent.** Going from 10% to 15% is 5 percentage points but a 50% increase.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: '18 is what percent of 45?',
          choices: ['25%', '40%', '60%', '250%'],
          answer: 1,
          explanation: 'The whole follows "of": 45. Part = percent × whole gives 18 = p × 45, so p = 18/45 = 2/5 = 40%. Choice D flips the fraction (45/18). Confirm with the 10% trick: 10% of 45 is 4.5, and 4 × 4.5 = 18.'
        },
        {
          stem: 'A population grows from 2,400 to 3,000. What is the percent increase?',
          choices: ['6%', '20%', '25%', '80%'],
          answer: 2,
          explanation: 'Change = 600. Divide by the original: 600/2,400 = 1/4 = 25%. Choice B (600/3,000 = 20%) uses the new amount as the base, which is the classic percent-change error.'
        },
        {
          stem: 'What is 35% of 60?',
          choices: ['18', '21', '24', '35'],
          answer: 1,
          explanation: '10% of 60 is 6, so 30% is 18 and 5% is 3; total 21. Or 0.35 × 60 = 21. Choice A stops at 30%.'
        },
        {
          stem: 'A stock rises 10% one day and falls 10% the next. Compared with the starting price, the final price is:',
          choices: ['1% lower', 'the same', '1% higher', '10% lower'],
          answer: 0,
          explanation: 'Multiply the multipliers: 1.10 × 0.90 = 0.99, a 1% decrease. The 10% drop is taken from a larger number than the 10% rise was added to, so it removes more than it added. Adding the percents (+10 − 10 = 0) is the trap.'
        },
        {
          stem: 'If 40% of a number is 26, what is 100% of the number?',
          choices: ['10.4', '52', '65', '104'],
          answer: 2,
          explanation: '26 = 0.40 × w, so w = 26 ÷ 0.4 = 65. Check: 10% of 65 is 6.5, and 4 × 6.5 = 26. Choice A multiplies instead of divides.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Percent means per hundred. Every problem is part = percent × whole; "of" marks the whole.
- Percent change divides the change by the **original**.
- Successive changes multiply their multipliers (1 + p/100 for increase, 1 − p/100 for decrease). They never simply add.
- To recover an original after a discount, divide the new amount by the remaining percent.
- Build mental percents from 10% (move the point one place) and 1% (two places).`
    }
  ]
},
{
  id: 'all-math-ratios',
  test: 'all',
  section: 'math',
  skill: 'percent-ratio',
  title: 'Ratios, Rates, Proportions, and Unit Conversion',
  minutes: 14,
  level: 3,
  objectives: [
    'Read a ratio as "parts" and use the total-parts method',
    'Set up and solve a proportion with cross-multiplication, and explain why it works',
    'Compute unit rates and compare them',
    'Convert units by multiplying by conversion factors equal to 1',
    'Apply scale factors to maps, models, and similar figures'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Ratios compare; rates compare different units',
      md: `### A ratio is a recipe

A ratio of 3 : 2 (boys to girls) does not mean 3 boys and 2 girls. It means **for every 3 boys there are 2 girls**, so there could be 30 and 20, or 12 and 8. The ratio is a recipe; the actual amounts are some multiple of it.

The key move is to think in **parts**. 3 : 2 has 3 + 2 = 5 parts total. If the class has 35 students, each part is 35 ÷ 5 = 7, so there are 21 boys and 14 girls.

### A rate is a ratio with two different units

Miles per hour, dollars per pound, words per minute. A **unit rate** is the rate with a denominator of 1, which is what makes rates comparable. 150 miles in 3 hours is 50 miles per hour.

### A proportion says two ratios are equal

a/b = c/d means the two ratios are the same recipe. **Cross-multiplication** (a × d = b × c) works because if you multiply both sides of a/b = c/d by bd, the denominators cancel, leaving ad = bc. It is not magic; it is clearing fractions.

Proportions solve every "if this, then how much of that" problem, as long as the relationship is **proportional**: doubling one doubles the other. (Not everything is proportional. If 2 painters take 6 hours, 4 painters do not take 12 hours.)

### Unit conversion is multiplying by 1

12 inches = 1 foot, so the fraction 12 in / 1 ft equals 1. Multiplying by it changes the units without changing the amount. Write the factor so the unit you want to remove is on the opposite side of the fraction from where it sits:

5 ft × (12 in / 1 ft) = 60 in. The "ft" units cancel like common factors.

### Scale factor

A scale of 1 : 50 means every real length is 50 times the drawing length. **Lengths** scale by the factor; **areas** scale by the factor squared; **volumes** by the factor cubed.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Ratio with a known total: the parts method

1. Add the ratio numbers to get total parts.
2. Divide the actual total by total parts to find the size of one part.
3. Multiply each ratio number by the part size.

### Proportion

1. Write the two ratios with the **same units in the same positions** (miles on top in both, hours on the bottom in both).
2. Cross-multiply.
3. Divide to isolate the unknown.
4. Sanity check: if the known side got bigger, the unknown should too.

### Comparing rates

1. Convert each to a unit rate (divide to get "per 1").
2. Compare the unit rates directly.

### Unit conversion

1. Write the starting quantity with its unit.
2. Multiply by conversion fractions, arranging each so unwanted units cancel.
3. Chain as many as needed (hours to minutes to seconds).

### Scale

1. Decide if the question is about length, area, or volume.
2. Apply the factor once for length, squared for area, cubed for volume.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** A paint mixture uses red and blue in a ratio of 5 : 3. If a painter needs 4 liters of mixture, how many liters of red paint are needed?

**Step 1.** The question gives a ratio and a total and asks for one part. That is the parts method.

**Step 2.** Total parts: 5 + 3 = 8. The 4 liters are split into 8 parts, so one part is 4 ÷ 8 = 0.5 liter.

**Step 3.** Red is 5 parts: 5 × 0.5 = **2.5 liters**.

**Check:** Blue is 3 × 0.5 = 1.5 liters, and 2.5 + 1.5 = 4. The ratio 2.5 : 1.5 reduces to 5 : 3 (divide both by 0.5). Everything matches.

**Alternative with a proportion:** red/total = 5/8 = r/4. Cross-multiply: 8r = 20, so r = 2.5. Same answer; notice I compared red to the **total**, not to blue, because the 4 liters is a total.

**Trap on this problem:** setting up 5/3 = r/4 (comparing red to blue but plugging in the total) gives r = 6.67, which is more than the whole mixture, an obvious impossibility if you sanity check.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** A car travels 180 miles on 6 gallons of gas. At that rate, how many gallons are needed for 300 miles?

Setup done for you:

- Both ratios are miles to gallons. Keep miles on top and gallons on the bottom in both: 180/6 = 300/g.
- Cross-multiply: 180 × g = 6 × 300, so 180g = 1,800.

Now divide to find g. Sanity check: 300 miles is more than 180, so g should be more than 6.`,
      question: {
        stem: 'A car travels 180 miles on 6 gallons. How many gallons are needed for 300 miles at the same rate?',
        choices: ['3.6', '8', '10', '12'],
        answer: 2,
        explanation: 'g = 1,800 ÷ 180 = 10 gallons. Quick check with the unit rate: 180 ÷ 6 = 30 miles per gallon, and 300 ÷ 30 = 10. Choice A comes from flipping one ratio (6/180 = 300/g). Choice B is a guess near the right size; always compute.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Treating ratio numbers as actual amounts.** 3 : 2 could be 300 and 200.
- **Part-to-part vs. part-to-whole.** If boys : girls = 3 : 2, then boys are 3/5 of the class, not 3/2.
- **Mismatched positions in a proportion.** Miles over hours on one side and hours over miles on the other gives nonsense.
- **Assuming everything is proportional.** More workers means less time, which is an inverse relationship, not a proportion.
- **Scaling area by the length factor.** A map scale of 1 : 100 makes areas 10,000 times bigger.
- **Conversion factor upside down.** 5 ft × (1 ft / 12 in) does not cancel anything. Put the unit you are removing on the opposite side.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'The ratio of cats to dogs at a shelter is 4 : 7. If there are 44 animals, how many are dogs?',
          choices: ['16', '28', '32', '77'],
          answer: 1,
          explanation: 'Total parts: 4 + 7 = 11. Each part is 44 ÷ 11 = 4. Dogs are 7 parts: 28. Choice A is the number of cats. Choice D treats 7 : 11 as 7/4 of 44.'
        },
        {
          stem: 'Which is the better buy: 3 pounds of apples for 4.50 dollars, or 5 pounds for 7.00 dollars?',
          choices: ['3 pounds for 4.50', '5 pounds for 7.00', 'They cost the same per pound', 'It cannot be determined'],
          answer: 1,
          explanation: 'Unit rates: 4.50 ÷ 3 = 1.50 per pound; 7.00 ÷ 5 = 1.40 per pound. The 5-pound bag is cheaper per pound. Compare rates per one unit, never by total price alone.'
        },
        {
          stem: 'If 8 notebooks cost 12 dollars, how much do 14 notebooks cost at the same rate?',
          choices: ['18 dollars', '20 dollars', '21 dollars', '24 dollars'],
          answer: 2,
          explanation: 'Set up 8/12 = 14/c with notebooks on top in both. Cross-multiply: 8c = 168, so c = 21. Or: each notebook is 1.50 dollars, and 14 × 1.50 = 21. Choice D comes from adding 12 to the count instead of scaling.'
        },
        {
          stem: 'How many seconds are in 2.5 hours?',
          choices: ['150', '900', '3,600', '9,000'],
          answer: 3,
          explanation: '2.5 h × (60 min / 1 h) × (60 s / 1 min) = 2.5 × 3,600 = 9,000 seconds. Hours cancel, then minutes cancel, leaving seconds. Choice A stops after converting to minutes.'
        },
        {
          stem: 'A model car is built at a scale of 1 : 20. If the real car is 4.6 meters long, how long is the model?',
          choices: ['0.23 m', '0.46 m', '2.3 m', '92 m'],
          answer: 0,
          explanation: 'Model length = real length ÷ 20 = 4.6 ÷ 20 = 0.23 m (23 cm). Choice D multiplies instead of divides; a model must be smaller than the car.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- A ratio is a recipe. With a known total, add the parts, find one part, and multiply.
- Part-to-whole fractions use the total of the ratio parts as the denominator.
- A proportion is two equal ratios; cross-multiply because it clears the denominators. Keep like units in like positions.
- Compare rates by converting to unit rates.
- Convert units by multiplying by fractions equal to 1 so unwanted units cancel.
- Scale factors apply once for length, squared for area, cubed for volume.`
    }
  ]
},
{
  id: 'all-math-algebra',
  test: 'all',
  section: 'math',
  skill: 'algebra',
  title: 'Expressions and Equations: Inverse Operations and Translating Words',
  minutes: 15,
  level: 3,
  objectives: [
    'Simplify expressions by combining like terms and distributing',
    'Solve linear equations by undoing operations in reverse order',
    'Translate word phrases into algebraic expressions, including the tricky "less than"',
    'Check a solution by substitution'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'An equation is a balance; solving is undoing',
      md: `### Variables are just unknown numbers

The letter x stands for a number you do not know yet. It obeys every rule numbers obey. 3x means 3 × x; x/4 means x ÷ 4; x² means x × x.

### Like terms

Terms are like terms when they have the same variable raised to the same power. 5x and 2x are like terms (they are both "x-things"), so 5x + 2x = 7x, the same way 5 apples + 2 apples = 7 apples. 5x and 2x² are not like terms and cannot be combined.

### The distributive property, both directions

3(x + 4) = 3x + 12. Multiplication spreads over addition. In the other direction, 3x + 12 = 3(x + 4) is **factoring**. Watch the sign when a negative is distributed: −2(x − 5) = −2x + 10.

### Why "do the same thing to both sides" works

An equation says two expressions are equal, like a balanced scale. If you add, subtract, multiply, or divide both sides by the same number, they stay equal. Solving means using this freedom to isolate the variable.

The trick is to **undo operations in the reverse order** that they were applied. In 3x + 5 = 20, the x was first multiplied by 3, then 5 was added. To undo, subtract 5 first (giving 3x = 15), then divide by 3 (giving x = 5). Reverse order, like taking off shoes before socks.

### Translating words

| Words | Algebra |
|---|---|
| the sum of x and 7, x increased by 7, 7 more than x | x + 7 |
| the difference of x and 7, x decreased by 7 | x − 7 |
| **7 less than x** | x − 7 (not 7 − x) |
| the product of 4 and x, 4 times x | 4x |
| the quotient of x and 5 | x/5 |
| twice x, double x | 2x |
| half of x | x/2 |
| x is | x = |

"Less than" and "subtracted from" reverse the order of the words. "7 less than x" means start at x and go down 7.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Solving a linear equation

1. **Simplify each side** separately: distribute, then combine like terms.
2. **Collect variables on one side** by adding or subtracting a variable term from both sides. Move the smaller variable term to avoid negatives.
3. **Collect constants on the other side** by adding or subtracting.
4. **Divide (or multiply)** to get the variable alone.
5. **Check** by substituting your answer into the original equation.

### Translating a word sentence

1. Define the variable in words: "let n = the number."
2. Read the sentence in chunks. Translate each chunk using the table.
3. Flip the order for "less than" and "subtracted from."
4. Replace "is" with =.
5. Read your equation back in English to confirm it says the same thing.

### Evaluating an expression

Substitute the value in parentheses, then follow the order of operations. For x = −2, the expression x² − 3x becomes (−2)² − 3(−2) = 4 + 6 = 10.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Solve 4(x − 3) + 2 = 2x + 6.

**Step 1.** The question asks for the value of x that makes both sides equal. I see parentheses, so I will simplify first.

**Step 2.** Distribute on the left: 4(x − 3) = 4x − 12. The left side is 4x − 12 + 2 = 4x − 10. The equation is now 4x − 10 = 2x + 6.

**Step 3.** Collect variables. I will subtract 2x from both sides so I keep a positive coefficient: 2x − 10 = 6.

**Step 4.** Collect constants. Add 10 to both sides: 2x = 16.

**Step 5.** Divide by 2: **x = 8**.

**Check:** Left side: 4(8 − 3) + 2 = 4(5) + 2 = 22. Right side: 2(8) + 6 = 22. Equal, so x = 8 is correct.

**Trap on this problem:** distributing the 4 to the x but not to the −3 (writing 4x − 3), which gives the wrong answer x = 3.5. The distributive property hits every term inside.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Five less than three times a number is 19. What is the number?

Setup done for you:

- Let n be the number.
- "Three times a number" is 3n.
- "Five less than" that means start at 3n and go down 5: 3n − 5. (Not 5 − 3n.)
- "Is 19" gives the equation 3n − 5 = 19.

Now undo in reverse order: the 5 was subtracted last, so add 5 first, then divide by 3.`,
      question: {
        stem: 'Five less than three times a number is 19. What is the number?',
        choices: ['4 2/3', '8', '14', '72'],
        answer: 1,
        explanation: '3n − 5 = 19, so 3n = 24 and n = 8. Check: three times 8 is 24, and five less than 24 is 19. Choice A comes from writing 5 − 3n = 19 (wrong order). Choice D comes from multiplying 24 by 3 instead of dividing.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **"7 less than x" is x − 7.** Translating left to right gives 7 − x, which is wrong.
- **Distributing to only the first term.** 3(x + 4) is 3x + 12, not 3x + 4.
- **Losing the sign with a negative distribution.** −(x − 2) = −x + 2.
- **Combining unlike terms.** 2x + 3 is not 5x. 2x + 3x² is not 5x³.
- **Undoing in the wrong order.** In 3x + 5 = 20, dividing by 3 first forces you to divide the 5 as well; it works but invites fraction errors.
- **Answering the wrong quantity.** If the question asks for 2x and you solved for x, finish the job.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Simplify 5(2x − 3) − 4x.',
          choices: ['6x − 3', '6x − 15', '10x − 15', '14x − 15'],
          answer: 1,
          explanation: 'Distribute: 10x − 15. Combine like terms: 10x − 4x = 6x, giving 6x − 15. Choice A forgets to multiply the −3 by 5. Choice C forgets to subtract 4x.'
        },
        {
          stem: 'Solve: 7 − 2x = 19.',
          choices: ['−6', '−13', '6', '13'],
          answer: 0,
          explanation: 'Subtract 7 from both sides: −2x = 12. Divide by −2: x = −6. Check: 7 − 2(−6) = 7 + 12 = 19. Choice C ignores the negative coefficient.'
        },
        {
          stem: 'Which expression represents "the product of 6 and a number, decreased by 4"?',
          choices: ['6(n − 4)', '6n − 4', '4 − 6n', '6 + n − 4'],
          answer: 1,
          explanation: '"The product of 6 and a number" is 6n. "Decreased by 4" subtracts 4 from that: 6n − 4. Choice A would be the translation of "6 times the difference of a number and 4." The comma marks where the product ends.'
        },
        {
          stem: 'If x = −3, what is the value of 2x² − 5x + 1?',
          choices: ['−32', '4', '34', '−2'],
          answer: 2,
          explanation: 'Substitute with parentheses: 2(−3)² − 5(−3) + 1 = 2(9) + 15 + 1 = 34. Choice D comes from treating (−3)² as −9. Choice B forgets the double negative in −5(−3).'
        },
        {
          stem: 'Solve: 3(x + 2) = x + 14.',
          choices: ['2', '4', '6', '8'],
          answer: 1,
          explanation: 'Distribute: 3x + 6 = x + 14. Subtract x: 2x + 6 = 14. Subtract 6: 2x = 8. So x = 4. Check: 3(6) = 18 and 4 + 14 = 18. Choice D comes from forgetting to distribute the 3 to the 2.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Like terms share the same variable and power; only like terms combine.
- Distribute to every term inside the parentheses, and carry negative signs through.
- An equation is a balance. Undo operations in reverse order to isolate the variable.
- "Less than" and "subtracted from" flip the order of the words.
- Always substitute your answer back to check, and make sure you answered the quantity the question asked for.`
    }
  ]
},
{
  id: 'all-math-algebra-2',
  test: 'all',
  section: 'math',
  skill: 'algebra',
  title: 'Inequalities, Systems, Exponents, Roots, and Patterns',
  minutes: 16,
  level: 3,
  objectives: [
    'Solve and graph inequalities, flipping the sign when multiplying or dividing by a negative',
    'Solve a system of two equations by substitution or elimination',
    'Apply the exponent rules and simplify square roots',
    'Find the rule for a pattern or function from a table'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Four tools, one mindset',
      md: `### Inequalities: a range, not a point

x > 3 describes every number bigger than 3. Solve it exactly like an equation, with one exception: **multiplying or dividing both sides by a negative number flips the inequality sign.** Why? 2 < 5 is true, but multiply both by −1 and you get −2 and −5, where −2 is the larger. Negatives reverse order on the number line.

On a number line, an open circle means the endpoint is not included (< or >); a closed circle means it is (≤ or ≥).

### Systems: two conditions, one answer

Two equations with two unknowns pin down one pair of values. There are two ways to combine them:

- **Substitution**: solve one equation for a variable, then plug that expression into the other.
- **Elimination**: add or subtract the equations so one variable cancels. Multiply an equation first if needed to make coefficients match.

Elimination is usually faster when the equations are lined up in standard form; substitution is faster when one variable is already isolated.

### Exponent rules follow from "repeated multiplication"

- x³ × x² = (x·x·x)(x·x) = x⁵. **Add exponents when multiplying same bases.**
- x⁵ ÷ x² = x³. **Subtract exponents when dividing.**
- (x³)² = x³ · x³ = x⁶. **Multiply exponents for a power of a power.**
- x⁰ = 1 for any nonzero x (because x³ ÷ x³ = x⁰ and also = 1).
- x⁻² = 1/x² (a negative exponent means reciprocal).
- (2x)³ = 8x³. The exponent applies to every factor inside.

### Roots undo powers

√49 = 7 because 7² = 49. Perfect squares to know: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225. Simplify roots by pulling out perfect-square factors: √50 = √(25 × 2) = 5√2. Estimate others by trapping between perfect squares: √40 is between 6 and 7, closer to 6.

### Patterns and functions

A function is a rule that turns an input into exactly one output. Tables hide rules. If outputs rise by the same amount each step, the rule is linear: output = (step size) × input + (starting adjustment). If outputs multiply by the same factor, the rule is exponential.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Inequalities

1. Solve exactly as an equation.
2. At the moment you multiply or divide by a negative, flip the sign.
3. Test a number from your solution region in the original inequality.

### Systems by elimination

1. Line up both equations as ax + by = c.
2. Multiply one or both equations so one variable has opposite coefficients.
3. Add the equations; that variable disappears.
4. Solve for the remaining variable, then substitute back to find the other.
5. Check the pair in both original equations.

### Exponents and roots

1. Identify the operation: multiplying powers (add), dividing (subtract), power of a power (multiply).
2. Handle coefficients separately from variables: (3x²)(4x⁵) = 12x⁷.
3. For roots, factor out the largest perfect square.

### Finding a pattern rule from a table

1. Compute the differences between consecutive outputs.
2. Constant difference d? Rule is output = d × input + b. Find b by plugging in one row.
3. Constant ratio r? Rule is output = a × r^input.
4. Verify on a row you did not use.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Solve the system: 2x + 3y = 12 and 4x − 3y = 6.

**Step 1.** The question asks for x and y that satisfy both equations. I notice the y-coefficients are already opposites (+3y and −3y). That is a signal to use elimination by adding.

**Step 2.** Add the equations: (2x + 4x) + (3y − 3y) = 12 + 6, so 6x = 18 and **x = 3**.

**Step 3.** Substitute x = 3 into the first equation: 2(3) + 3y = 12, so 6 + 3y = 12, 3y = 6, **y = 2**.

**Step 4.** Check in the second equation: 4(3) − 3(2) = 12 − 6 = 6. Correct.

**Answer: x = 3, y = 2.** If the question asks for x + y, that is 5; if it asks for xy, that is 6. Read the last line of the question.

**Trap on this problem:** subtracting the equations instead of adding (which doubles the y term instead of canceling it), or stopping at x = 3 when the question asked for y.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Solve 5 − 3x ≥ 20.

Setup done for you:

- Subtract 5 from both sides: −3x ≥ 15.
- The next step is dividing both sides by −3. Dividing by a negative **flips** the inequality sign.

Finish: divide and flip. Then test a value from your region in the original inequality (try x = −10).`,
      question: {
        stem: 'What is the solution to 5 − 3x ≥ 20?',
        choices: ['x ≥ −5', 'x ≤ −5', 'x ≥ 5', 'x ≤ 5'],
        answer: 1,
        explanation: 'Dividing −3x ≥ 15 by −3 gives x ≤ −5. Test x = −10: 5 − 3(−10) = 35, and 35 ≥ 20 is true. Test x = 0 (from the wrong region): 5 ≥ 20 is false. Choice A forgets to flip the sign.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Forgetting to flip** when dividing an inequality by a negative. Adding or subtracting a negative does not flip it.
- **Adding exponents when you should multiply**: (x²)³ = x⁶, not x⁵. And x² · x³ = x⁵, not x⁶.
- **Adding exponents with different bases**: 2³ × 3² is not 6⁵. Just compute: 8 × 9 = 72.
- **(x + y)² is not x² + y².** It is x² + 2xy + y². Test with x = y = 1: (2)² = 4, not 2.
- **√(a + b) is not √a + √b.** √(9 + 16) = 5, not 7.
- **Solving a system but reporting the wrong thing.** Reread the question for x, y, x + y, or xy.
- **Pattern rule that fits two rows but not the third.** Always verify on a spare row.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Simplify (2x³)(5x⁴).',
          choices: ['7x⁷', '10x⁷', '10x¹²', '7x¹²'],
          answer: 1,
          explanation: 'Multiply the coefficients (2 × 5 = 10) and add the exponents on the same base (3 + 4 = 7): 10x⁷. Choice A adds the coefficients; choice C multiplies the exponents.'
        },
        {
          stem: 'Which number line description matches the solution of 2x + 1 < 7?',
          choices: ['Open circle at 3, shaded to the left', 'Closed circle at 3, shaded to the left', 'Open circle at 3, shaded to the right', 'Open circle at 4, shaded to the left'],
          answer: 0,
          explanation: '2x < 6, so x < 3. Strict inequality means an open circle, and "less than" shades left. Choice D forgets to subtract the 1 first.'
        },
        {
          stem: 'If x + y = 10 and x − y = 4, what is the value of xy?',
          choices: ['7', '21', '24', '40'],
          answer: 1,
          explanation: 'Add the equations: 2x = 14, so x = 7. Then y = 3. The question asks for xy = 21. Choice A is x alone, the classic stop-too-early trap. Choice C comes from a sign slip giving y = 4 and x = 6.'
        },
        {
          stem: 'Simplify √72.',
          choices: ['6√2', '3√8', '2√18', '36√2'],
          answer: 0,
          explanation: 'The largest perfect-square factor of 72 is 36: √72 = √(36 × 2) = 6√2. Choices B and C are equal in value but not fully simplified because 8 and 18 still contain perfect-square factors. Choice D is far too large (36√2 ≈ 51).'
        },
        {
          stem: 'A table shows inputs 1, 2, 3, 4 with outputs 5, 8, 11, 14. What is the output when the input is 10?',
          choices: ['30', '32', '35', '41'],
          answer: 1,
          explanation: 'Outputs rise by 3 each step, so the rule is output = 3 × input + b. Using input 1: 3 + b = 5, so b = 2. Rule: 3n + 2. For n = 10: 32. Choice A ignores the +2; choice C treats the rule as 3.5n.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Solve inequalities like equations, but flip the sign when multiplying or dividing by a negative.
- Systems: eliminate by adding equations with opposite coefficients, or substitute when one variable is isolated. Report what the question asks for.
- Exponent rules: multiply same bases by adding exponents; divide by subtracting; power of a power multiplies.
- Simplify roots by pulling out the largest perfect square; estimate by trapping between perfect squares.
- Find a pattern rule from constant differences (linear) or constant ratios (exponential), and verify on a spare row.`
    }
  ]
},
{
  id: 'all-math-geometry',
  test: 'all',
  section: 'math',
  skill: 'geometry',
  title: 'Angles, Triangles, and Polygons',
  minutes: 16,
  level: 3,
  objectives: [
    'Use angle relationships: straight lines, vertical angles, and parallel-line angles',
    'Apply the triangle angle sum and the exterior angle rule',
    'Use the Pythagorean theorem and recognize the common triples and special right triangles',
    'Compute interior angle sums of polygons from triangles'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Everything comes from a straight line and a triangle',
      md: `### Angle facts and where they come from

- A **straight line** is 180°. Angles that together form a straight line (a linear pair) add to 180°.
- **Vertical angles** (the opposite angles where two lines cross) are equal, because each one is 180° minus the same neighbor.
- A full turn is 360°. **Complementary** angles add to 90°; **supplementary** angles add to 180°.
- When a line crosses two **parallel** lines, every acute angle formed is equal, every obtuse angle is equal, and any acute plus any obtuse is 180°. (Names like "alternate interior" all reduce to this.)

### The triangle angle sum is 180°, and why

Draw a line through one vertex parallel to the opposite side. The three angles of the triangle reappear along that line as a straight angle. That is the whole proof: triangle angles are a straight line in disguise.

A consequence: an **exterior angle** of a triangle equals the sum of the two non-adjacent interior angles. (The exterior angle is 180° minus the adjacent interior angle, and so is the sum of the other two.)

### Triangle types

- **Equilateral**: three equal sides, three 60° angles.
- **Isosceles**: two equal sides, and the angles opposite those sides are equal.
- **Scalene**: no equal sides.
- **Right**: one 90° angle. The side opposite it is the **hypotenuse**, always the longest side.
- The **largest angle is opposite the longest side**, and any two sides must add to more than the third (triangle inequality).

### Pythagorean theorem

In a right triangle with legs a and b and hypotenuse c: **a² + b² = c²**. The squares on the legs together fill the square on the hypotenuse.

Triples to recognize instantly: 3-4-5, 5-12-13, 8-15-17, and their multiples (6-8-10, 9-12-15, 10-24-26).

### Special right triangles

- **45-45-90** (half a square): legs equal, hypotenuse = leg × √2.
- **30-60-90** (half an equilateral triangle): short leg x, hypotenuse 2x, long leg x√3. The short leg is opposite the 30° angle.

### Polygon angle sums

Any polygon with n sides can be cut into n − 2 triangles from one vertex. So the interior angles sum to **(n − 2) × 180°**. A regular polygon splits that evenly: each interior angle is (n − 2) × 180° ÷ n. The exterior angles of any polygon always sum to 360°, so each exterior angle of a regular polygon is 360°/n.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### For any angle-chasing problem

1. **Mark what you know** on the figure. Write the given numbers on it.
2. **Look for 180s**: straight lines and triangles. Look for equal pairs: vertical angles, parallel-line angles, isosceles base angles.
3. **Write an equation** for the unknown and solve.
4. **Sanity check**: does an angle that looks acute come out under 90°? (Figures are usually drawn roughly to scale unless stated otherwise.)

### For a missing side in a right triangle

1. Identify the hypotenuse (opposite the right angle).
2. Check for a triple first (3-4-5 family, 5-12-13, 8-15-17). If you see one, skip the algebra.
3. Otherwise, write a² + b² = c² and solve. If the unknown is a leg, subtract: leg² = c² − other leg².
4. Simplify the square root.

### For a polygon angle question

1. Count the sides, n.
2. Interior sum = (n − 2) × 180°.
3. Regular? Divide by n for one interior angle, or use 360°/n for one exterior angle (then interior = 180° − exterior).`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** In triangle ABC, angle A is 50° and the triangle is isosceles with AB = AC. A line extends side BC past C to a point D. What is the measure of angle ACD?

**Step 1.** The question asks for an exterior angle at C. I know the exterior angle equals the sum of the two remote interior angles (A and B), so if I find angle B I am done.

**Step 2.** AB = AC means the angles opposite those sides are equal. The angle opposite AB is C, and the angle opposite AC is B. So angle B = angle C.

**Step 3.** Triangle sum: 50° + B + C = 180°, so B + C = 130°, and each is 65°.

**Step 4.** Exterior angle ACD = angle A + angle B = 50° + 65° = **115°**.

**Check another way:** angles ACB and ACD form a straight line, so ACD = 180° − 65° = 115°. Same answer.

**Trap on this problem:** assuming the 50° angle is one of the equal pair. The equal angles are opposite the equal sides, and the 50° is at the vertex between the two equal sides.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** A ladder leans against a wall. The foot of the ladder is 9 feet from the wall and the ladder reaches 12 feet up the wall. How long is the ladder?

Setup done for you:

- The wall, the ground, and the ladder make a right triangle. The ladder is the hypotenuse.
- Legs: 9 and 12. Before writing the formula, notice 9 = 3 × 3 and 12 = 3 × 4. That is a scaled 3-4-5 triangle.

Finish: what is 3 × 5? Confirm with 9² + 12² = c².`,
      question: {
        stem: 'The foot of a ladder is 9 feet from a wall, and it reaches 12 feet up the wall. How long is the ladder?',
        choices: ['13 ft', '15 ft', '21 ft', '225 ft'],
        answer: 1,
        explanation: '9-12-15 is 3-4-5 scaled by 3. Confirm: 81 + 144 = 225, and √225 = 15. Choice D is c² without taking the root. Choice A confuses this with the 5-12-13 triple, which would need a leg of 5, not 9.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Forgetting the square root.** a² + b² gives c², not c.
- **Adding when you should subtract.** If the unknown is a leg, leg² = hyp² − other leg².
- **Putting the hypotenuse on the wrong side.** The hypotenuse is always opposite the right angle and always the longest.
- **Isosceles: which angles are equal?** The angles opposite the equal sides, not the angle between them.
- **Counting polygon sides wrong.** A hexagon has 6 sides: (6 − 2) × 180° = 720°.
- **Mixing interior and exterior.** Exterior angles of any polygon sum to 360°; interior sums grow with n.
- **Assuming a figure is to scale when it says "not drawn to scale."** Then trust the numbers, not your eyes.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Two angles of a triangle measure 38° and 71°. What is the third angle?',
          choices: ['61°', '71°', '81°', '109°'],
          answer: 1,
          explanation: 'Triangle angles sum to 180°: 180 − 38 − 71 = 71. The triangle happens to be isosceles. Choice D (109°) is the exterior angle at the third vertex, a common confusion.'
        },
        {
          stem: 'A right triangle has a hypotenuse of 13 and one leg of 5. What is the other leg?',
          choices: ['8', '12', '√194', '18'],
          answer: 1,
          explanation: 'This is the 5-12-13 triple. Algebraically: 13² − 5² = 169 − 25 = 144, and √144 = 12. Choice C (√194) comes from adding 169 + 25 instead of subtracting; the unknown is a leg, so subtract.'
        },
        {
          stem: 'What is the sum of the interior angles of a pentagon?',
          choices: ['360°', '540°', '720°', '900°'],
          answer: 1,
          explanation: 'A pentagon has 5 sides and can be split into 3 triangles: (5 − 2) × 180° = 540°. Choice A is the exterior angle sum (always 360°). Choice C is a hexagon.'
        },
        {
          stem: 'Two parallel lines are cut by a transversal. One of the angles formed measures 112°. Which of the following must be the measure of another angle in the figure?',
          choices: ['22°', '58°', '68°', '78°'],
          answer: 2,
          explanation: 'With parallel lines, every angle is either 112° or its supplement 180° − 112° = 68°. Choice A assumes complementary (90°); the relevant relationship is supplementary.'
        },
        {
          stem: 'The legs of an isosceles right triangle are each 6. What is the length of the hypotenuse?',
          choices: ['6', '6√2', '12', '6√3'],
          answer: 1,
          explanation: 'A 45-45-90 triangle has hypotenuse = leg × √2, so 6√2. Confirm: 36 + 36 = 72, and √72 = 6√2. Choice D uses the 30-60-90 ratio, which does not apply.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- A straight line is 180°; vertical angles are equal; with parallel lines, every angle is one of two values that add to 180°.
- Triangle angles sum to 180° because they fold into a straight line. An exterior angle equals the sum of the two remote interior angles.
- Pythagorean theorem: a² + b² = c². Spot the triples (3-4-5, 5-12-13, 8-15-17) to skip the arithmetic.
- 45-45-90: hypotenuse = leg√2. 30-60-90: sides x, x√3, 2x.
- Polygon interior sum = (n − 2) × 180°. Exterior angles always total 360°.`
    }
  ]
},
{
  id: 'all-math-measurement',
  test: 'all',
  section: 'math',
  skill: 'geometry',
  title: 'Perimeter, Area, Volume, Circles, and the Coordinate Plane',
  minutes: 16,
  level: 3,
  objectives: [
    'Distinguish perimeter (length around) from area (space inside) from volume (space filled)',
    'Derive the area formulas for parallelograms, triangles, and trapezoids from a rectangle',
    'Work with circles: circumference, area, and parts of circles',
    'Compute volume and surface area of prisms and cylinders',
    'Find distance, midpoint, and slope on the coordinate plane'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Every area formula is a rectangle in disguise',
      md: `### Units tell you what you are measuring

- **Perimeter** is a length: add up the sides. Units: cm, ft.
- **Area** counts unit squares that fit inside. Units: cm², ft².
- **Volume** counts unit cubes. Units: cm³, ft³.

If your answer's units do not match the question, you used the wrong formula.

### Rectangle, and everything built from it

A rectangle with length l and width w has area **l × w**: w rows of l squares each.

- **Parallelogram**: slice off the triangle on one end and slide it to the other end. You get a rectangle with the same base and height. Area = **base × height**. The height is the perpendicular distance, not the slanted side.
- **Triangle**: any triangle is half of a parallelogram with the same base and height. Area = **(1/2) × base × height**.
- **Trapezoid**: two copies, one flipped, make a parallelogram with base (b₁ + b₂). So one trapezoid is **(1/2)(b₁ + b₂) × h**, which is "average of the bases times the height."

### Circles

- **Circumference** C = 2πr = πd. The ratio of any circle's circumference to its diameter is π ≈ 3.14 ≈ 22/7.
- **Area** A = πr². (Cut the circle into thin wedges and lay them as a near-rectangle with height r and width half the circumference, πr.)
- A sector or arc is a **fraction of the circle**: a 90° slice is 1/4 of the area and 1/4 of the circumference.

Use the **radius** in both formulas. If you are given the diameter, halve it first.

### Solids

- **Volume of any prism or cylinder** = (area of the base) × height. A box: l × w × h. A cylinder: πr² × h.
- **Surface area** = the total area of all the faces. For a box: 2lw + 2lh + 2wh. For a cylinder: two circles (2πr²) plus the wrapped-around rectangle (2πr × h).
- A **cube** with edge s: volume s³, surface area 6s².

### Coordinate plane

- **Distance** between two points is the Pythagorean theorem: d = √((x₂ − x₁)² + (y₂ − y₁)²). The horizontal and vertical changes are the legs.
- **Midpoint**: average the x's and average the y's.
- **Slope** = rise ÷ run = (y₂ − y₁)/(x₂ − x₁). Up to the right is positive; down to the right is negative; horizontal is 0; vertical is undefined.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### For any measurement problem

1. **Name the quantity**: perimeter, area, surface area, or volume. Check the units.
2. **Name the shape**, and whether it is a composite (two shapes combined or one cut out of another).
3. **Write the formula**, then substitute. Use the perpendicular height, and the radius (not diameter).
4. **Compute**, keeping π as a symbol if the answer choices have π in them.
5. **Check units and reasonableness.**

### For composite figures

- **Add**: split the figure into rectangles and triangles, compute each, add.
- **Subtract**: find the big shape's area, subtract the hole.
- For perimeter of an L-shape, the missing sides can be found because opposite sides across the figure add to the same total.

### For coordinate geometry

1. Sketch the points, even roughly.
2. For distance, count the horizontal change and vertical change, then apply a² + b² = c². Look for triples.
3. For slope, pick the two points carefully and keep the subtraction order the same in numerator and denominator.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** A rectangular garden is 12 m by 8 m. A circular fountain with a diameter of 4 m sits in the middle. What is the area of the garden not covered by the fountain? Use π ≈ 3.14.

**Step 1.** The question asks for the area of the garden minus the fountain. That is a subtraction composite. Units will be m².

**Step 2.** Garden area: 12 × 8 = 96 m².

**Step 3.** Fountain area. The diameter is 4, so the radius is 2. I must use the radius: π × 2² = 4π ≈ 12.56 m².

**Step 4.** Subtract: 96 − 12.56 = **83.44 m²**.

**Reasonableness check:** the fountain is small relative to the garden, so the answer should be a bit less than 96. It is.

**Trap on this problem:** using the diameter in πr², which gives 16π ≈ 50.24 and an answer of 45.76, far too small. The area of a circle grows with the square of the radius, so halving matters enormously.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** What is the distance between the points (−2, 3) and (4, 11)?

Setup done for you:

- Horizontal change: 4 − (−2) = 6.
- Vertical change: 11 − 3 = 8.
- These are the legs of a right triangle; the distance is the hypotenuse.

Finish: do you recognize a triple? If not, compute √(6² + 8²).`,
      question: {
        stem: 'What is the distance between (−2, 3) and (4, 11)?',
        choices: ['2√7', '10', '14', '100'],
        answer: 1,
        explanation: '6-8-10 is the 3-4-5 triple doubled, so the distance is 10. Algebraically: √(36 + 64) = √100 = 10. Choice D forgets the square root. Choice A comes from subtracting instead of adding inside the root.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Diameter in a radius formula.** Halve the diameter before using πr² or 2πr.
- **Slant side as height.** Area needs the perpendicular height. In a parallelogram or triangle, the slanted side is a distractor.
- **Forgetting the 1/2** for triangles and trapezoids.
- **Perimeter when asked for area** (or vice versa). Check the units in the answer choices.
- **Surface area: missing faces.** A box has 6 faces, in 3 matching pairs.
- **Slope with mixed subtraction order.** (y₂ − y₁)/(x₁ − x₂) flips the sign.
- **Doubling dimensions doubles area?** No. Doubling all lengths multiplies area by 4 and volume by 8.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'A triangle has a base of 10 cm and a height of 7 cm. What is its area?',
          choices: ['17 cm²', '35 cm²', '70 cm²', '34 cm²'],
          answer: 1,
          explanation: 'Area = (1/2) × 10 × 7 = 35 cm². Choice C forgets the 1/2 (that is the parallelogram with the same base and height). Choice A adds instead of multiplies.'
        },
        {
          stem: 'The circumference of a circle is 20π. What is its area?',
          choices: ['10π', '40π', '100π', '400π'],
          answer: 2,
          explanation: 'C = 2πr = 20π, so r = 10. Area = π × 10² = 100π. Choice D uses the diameter (20) as the radius. Choice A stops at the radius.'
        },
        {
          stem: 'A cylinder has a radius of 3 inches and a height of 5 inches. What is its volume?',
          choices: ['15π in³', '30π in³', '45π in³', '90π in³'],
          answer: 2,
          explanation: 'Volume = (base area) × height = π(3²)(5) = 45π in³. Choice A uses r instead of r². Choice D uses the diameter squared.'
        },
        {
          stem: 'What is the slope of the line through (1, 5) and (4, −1)?',
          choices: ['−2', '−1/2', '1/2', '2'],
          answer: 0,
          explanation: 'Slope = (−1 − 5)/(4 − 1) = −6/3 = −2. The line falls as it moves right, so the slope must be negative. Choice B flips rise and run; choice D loses the sign.'
        },
        {
          stem: 'A rectangular box measures 4 cm by 3 cm by 2 cm. What is its surface area?',
          choices: ['24 cm²', '26 cm²', '52 cm²', '9 cm²'],
          answer: 2,
          explanation: 'Three pairs of faces: 2(4 × 3) + 2(4 × 2) + 2(3 × 2) = 24 + 16 + 12 = 52 cm². Choice A (24) is the volume, in the wrong units. Choice B counts each face only once.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Perimeter is length around; area is squares inside; volume is cubes filled. Match the units.
- Parallelogram = base × perpendicular height; triangle is half of that; trapezoid is the average base times height.
- Circles: C = 2πr, A = πr². Always convert diameter to radius first.
- Prism or cylinder volume = base area × height. Surface area adds every face.
- Coordinate plane: distance is the Pythagorean theorem; midpoint averages; slope is rise over run.`
    }
  ]
},
{
  id: 'all-math-data-stats',
  test: 'all',
  section: 'math',
  skill: 'data-stats',
  title: 'Averages, Graphs, Probability, and Counting',
  minutes: 15,
  level: 3,
  objectives: [
    'Compute and reason about mean, median, mode, and range',
    'Use the "mean × count = total" relationship to solve missing-value problems',
    'Read bar graphs, line graphs, circle graphs, and tables accurately',
    'Compute simple and compound probability',
    'Count outcomes with the multiplication principle'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Four ways to describe a list of numbers',
      md: `### Mean, median, mode, range

- **Mean** (average): total ÷ count. It is the value every item would have if the total were shared equally.
- **Median**: the middle value after sorting. With an even count, average the two middle values. The median ignores how extreme the ends are.
- **Mode**: the most frequent value. There can be more than one, or none.
- **Range**: largest minus smallest. It measures spread, not center.

The most useful fact about the mean is the rearranged formula: **total = mean × count**. Most "find the missing score" problems are solved by finding the total first.

Outliers pull the mean but barely move the median. For the list 2, 3, 4, 100, the mean is 27.25 and the median is 3.5.

### Reading graphs

- **Bar graph**: compare categories. Read the scale carefully; bars may start above zero or use intervals of 5 or 50.
- **Line graph**: change over time. Steepness shows rate of change.
- **Circle graph**: parts of a whole, in percents or degrees (360° is 100%, so each 1% is 3.6°).
- **Table**: watch for totals rows and columns.

The question often asks about a **difference** or a **percent** between two readings, not the readings themselves.

### Probability

**P(event) = (favorable outcomes) ÷ (total outcomes)**, when all outcomes are equally likely. A probability is always between 0 and 1. The probability that an event does **not** happen is 1 − P(event).

For two **independent** events (one does not affect the other), multiply: P(A and B) = P(A) × P(B). For "either A or B" with no overlap, add.

For drawing **without replacement**, the second probability uses the reduced totals: from 3 red and 2 blue marbles, P(red then red) = 3/5 × 2/4.

### Counting

If a choice has m options and a second independent choice has n options, there are m × n combined outcomes. Three shirts and four pants make 12 outfits. Arranging n distinct things in order gives n × (n − 1) × ... × 1 outcomes (so 4 books on a shelf: 24 ways).`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Missing-value mean problems

1. Multiply the target mean by the count to get the required total.
2. Add the known values.
3. Subtract to find the missing value.

### Median and mode

1. **Sort first.** Unsorted lists hide the median.
2. Count the items. Odd: the middle one. Even: average the two middle.
3. For mode, tally frequencies.

### Graph questions

1. Read the title, axis labels, and scale **before** the question.
2. Locate exactly the data points the question names.
3. Do the arithmetic the question asks for (difference, percent, total).

### Probability

1. Count total outcomes. List them if the set is small.
2. Count favorable outcomes.
3. Form the fraction and simplify.
4. For multiple events, decide: "and" means multiply (adjust totals if no replacement); "or" with no overlap means add.

### Counting

1. Identify each independent decision and how many options it has.
2. Multiply the option counts.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Maya scored 84, 91, and 78 on three tests. What score does she need on the fourth test to have a mean of 85?

**Step 1.** The question asks for a missing value given a target mean. I know total = mean × count, so I will work with totals, not averages.

**Step 2.** Four tests with a mean of 85 require a total of 85 × 4 = 340.

**Step 3.** Her current total is 84 + 91 + 78 = 253.

**Step 4.** The fourth score must be 340 − 253 = **87**.

**Check:** (84 + 91 + 78 + 87) ÷ 4 = 340 ÷ 4 = 85. Correct.

**Faster mental version:** compare each score to 85. 84 is −1, 91 is +6, 78 is −7. Net so far: −2. The fourth score must be +2 above 85, so 87. This "balance" method is excellent for the test because the numbers stay small.

**Trap on this problem:** averaging the three known scores (84.33) and thinking she needs "a bit above 85." Mean problems are total problems.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** A bag has 4 red, 3 green, and 5 blue marbles. Two marbles are drawn without replacement. What is the probability that both are blue?

Setup done for you:

- Total marbles: 4 + 3 + 5 = 12.
- First draw: P(blue) = 5/12.
- After removing one blue marble, there are 4 blue left out of 11 total. Second draw: P(blue) = 4/11.

Finish: "both" means **and**, so multiply the two probabilities and simplify.`,
      question: {
        stem: 'A bag has 4 red, 3 green, and 5 blue marbles. Two are drawn without replacement. What is the probability both are blue?',
        choices: ['5/33', '25/144', '10/12', '5/12'],
        answer: 0,
        explanation: '5/12 × 4/11 = 20/132 = 5/33. Choice B (25/144) is the answer with replacement (5/12 × 5/12). Choice D is only the first draw. Without replacement, both the favorable count and the total shrink for the second draw.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Median without sorting.** The middle of the list as written is meaningless.
- **Even count, one middle.** Average the two middle numbers.
- **Range as a value in the list.** Range is a difference (max − min), not a number from the data.
- **Averaging averages.** If one class of 20 averages 80 and another of 30 averages 90, the combined mean is not 85; it is (1,600 + 2,700)/50 = 86. Weight by count.
- **Misreading the scale.** A bar at "3" on a graph where each unit is 50 means 150.
- **Adding probabilities for "and."** P(A and B) multiplies.
- **Forgetting the total shrinks** when drawing without replacement.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'What is the median of 12, 5, 9, 20, 7, 15?',
          choices: ['9', '10.5', '11.3', '14.5'],
          answer: 1,
          explanation: 'Sort: 5, 7, 9, 12, 15, 20. There are six values, so average the two middle ones: (9 + 12)/2 = 10.5. Choice A takes only one middle value. Choice C is the mean.'
        },
        {
          stem: 'The mean of five numbers is 14. Four of them are 10, 12, 15, and 19. What is the fifth number?',
          choices: ['14', '16', '18', '56'],
          answer: 0,
          explanation: 'Total needed: 14 × 5 = 70. Known sum: 10 + 12 + 15 + 19 = 56. Fifth number: 70 − 56 = 14. Choice D is the known sum, not the missing value.'
        },
        {
          stem: 'A circle graph shows that 25% of a budget goes to rent. What is the measure of the central angle of the rent sector?',
          choices: ['25°', '45°', '90°', '120°'],
          answer: 2,
          explanation: 'A full circle is 360°, and 25% of 360° is 90°. Each percent is 3.6°. Choice A confuses percent with degrees.'
        },
        {
          stem: 'A fair six-sided die is rolled twice. What is the probability of rolling a 6 both times?',
          choices: ['1/3', '1/6', '1/12', '1/36'],
          answer: 3,
          explanation: 'The rolls are independent, so multiply: 1/6 × 1/6 = 1/36. Choice A adds the probabilities, which is the "and" vs. "or" trap. Choice C mistakenly uses 6 × 2 outcomes.'
        },
        {
          stem: 'A sandwich shop offers 3 breads, 4 fillings, and 2 sauces. How many different sandwiches (one of each) are possible?',
          choices: ['9', '12', '24', '36'],
          answer: 2,
          explanation: 'Three independent choices multiply: 3 × 4 × 2 = 24. Choice A adds the options instead of multiplying. Choice B forgets the sauce.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Mean = total ÷ count, and the working form is total = mean × count. Solve missing-value problems through totals.
- Median needs a sorted list; with an even count, average the middle two. Mode is most frequent; range is max − min.
- Read the scale and labels of a graph before the question.
- Probability = favorable ÷ total. "And" multiplies (shrink totals if no replacement); "or" without overlap adds.
- Independent choices multiply to count outcomes.`
    }
  ]
},
{
  id: 'all-math-word-problems',
  test: 'all',
  section: 'math',
  skill: 'word-problems',
  title: 'Word Problems: The 5-Step Method and the Classic Types',
  minutes: 18,
  level: 3,
  objectives: [
    'Apply a reliable 5-step method to any word problem',
    'Recognize and set up the classic types: rate-time-distance, work, age, mixture, consecutive integers',
    'Define variables in words to avoid answering the wrong question',
    'Check answers against the story, not just the algebra'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Word problems are translation plus one relationship',
      md: `### Why word problems feel hard

The math inside a word problem is usually easy. The difficulty is deciding **what to compute**. Experts handle this by recognizing the problem type and knowing the one relationship that governs it. Once the relationship is written down, the rest is arithmetic.

### The governing relationships

- **Rate × Time = Distance** (or amount). 60 miles per hour for 2.5 hours is 150 miles. The same relationship covers pay (rate × hours), typing (words per minute × minutes), and so on.
- **Work**: if a job takes a person t hours, they complete **1/t of the job per hour**. Two workers add their rates: 1/a + 1/b = 1/t for the combined time t.
- **Age**: everyone ages at the same rate. If Ana is a and her brother is a + 4 now, then in 5 years they are a + 5 and a + 9, and the difference is still 4.
- **Mixture**: the amount of the pure substance is conserved. 2 liters of 30% acid contains 0.6 liters of acid. Track the pure stuff, not the percents.
- **Consecutive integers**: n, n + 1, n + 2. Consecutive even or odd integers: n, n + 2, n + 4.
- **Money and quantity**: (number of items) × (value each) = total value, for each type, added together.

### Why "define the variable in words" matters

Most wrong answers on word problems are correct answers to a different question. If you write "let x = the number of adult tickets" and the question asks for child tickets, you will notice. If you only write "x," you will not.`
    },
    {
      type: 'strategy',
      title: 'The 5-step method',
      md: `1. **Read the last sentence first.** It tells you what the answer is. Write it as "Find: ______ (units)."
2. **Identify the type** and its governing relationship. Write the relationship down.
3. **Define variables in words.** "Let r = Carla's speed in mph." Express every other quantity in terms of that variable. A table helps for rate-time-distance and mixture.
4. **Write and solve the equation.** Translate the sentence that relates the quantities (usually the one with "total," "together," "the same," or "equals").
5. **Answer the actual question and check against the story.** Plug the numbers back into the words. Are speeds positive? Are ages reasonable? Did you find the quantity in step 1?

### Type-specific setups

**Rate-time-distance**: make a table with rows for each traveler and columns for rate, time, distance. Fill two columns, compute the third. Then find the sentence that links the rows ("they meet," "same distance," "total distance is 300").

**Work**: convert each worker to a rate (1/t per hour). Add rates for people working together. Combined time is 1 ÷ (combined rate).

**Age**: make a table with rows for each person, columns for now and later (or earlier). Fill in with one variable, then translate the condition.

**Mixture**: make a table with rows for each ingredient and the final mix, columns for amount, concentration, and pure substance (amount × concentration). The pure-substance column adds.

**Consecutive integers**: let the smallest be n. Write the others. Translate the sum or product condition.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Two trains leave stations 420 miles apart at the same time and travel toward each other. One goes 60 mph and the other 80 mph. After how many hours will they meet?

**Step 1 (find):** Find the time in hours until they meet.

**Step 2 (type):** Rate-time-distance, two travelers. The link: when they meet, their distances **add up to 420**.

**Step 3 (variables):** Let t = hours until they meet. Both travel the same time.

| Train | Rate | Time | Distance |
|---|---|---|---|
| A | 60 | t | 60t |
| B | 80 | t | 80t |

**Step 4 (equation):** 60t + 80t = 420, so 140t = 420 and t = 3.

**Step 5 (check in the story):** In 3 hours, A goes 180 miles and B goes 240 miles. 180 + 240 = 420. They meet. **Answer: 3 hours.**

**The insight to remember:** when two things move toward each other, their speeds effectively add (140 mph closing speed), so the time is distance ÷ combined speed. When one chases another, speeds subtract.

**Trap on this problem:** setting the distances equal (60t = 80t) because "they meet at the same place." They meet at the same place but travel different distances; it is the **sum** that is fixed.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** The sum of three consecutive odd integers is 81. What is the largest of the three?

Setup done for you:

- **Find:** the largest integer.
- **Type:** consecutive odd integers. They differ by 2.
- **Variables:** let n = the smallest. Then the others are n + 2 and n + 4.
- **Equation:** n + (n + 2) + (n + 4) = 81, so 3n + 6 = 81.

Finish: solve for n, then compute n + 4. Make sure you report the largest, not the smallest.`,
      question: {
        stem: 'The sum of three consecutive odd integers is 81. What is the largest of the three?',
        choices: ['25', '27', '29', '31'],
        answer: 2,
        explanation: '3n + 6 = 81, so 3n = 75 and n = 25. The integers are 25, 27, 29; the largest is 29. Choice A is the smallest (the step-1 trap). Choice B is the middle one, which also equals the mean 81 ÷ 3. Check: 25 + 27 + 29 = 81.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Answering for the wrong person or quantity.** The variable you solved for is often not the answer. Reread the last sentence.
- **Setting distances equal when they should add** (toward each other) or add when they should be equal (same destination).
- **Adding times for a work problem.** Rates add; times do not. Two people together are faster than either alone.
- **Forgetting that both people age.** "In 6 years" adds 6 to **every** age.
- **Averaging percents in a mixture.** Mixing 2 L of 10% with 1 L of 40% is not 25%; it is (0.2 + 0.4)/3 = 20%.
- **Consecutive even integers written as n, n + 1.** They differ by 2.
- **Units mismatch.** Minutes with hours, cents with dollars. Convert first.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'A cyclist rides 45 miles in 2.5 hours. At the same rate, how far does she ride in 4 hours?',
          choices: ['18 miles', '54 miles', '72 miles', '90 miles'],
          answer: 2,
          explanation: 'Rate = 45 ÷ 2.5 = 18 mph. Distance in 4 hours = 18 × 4 = 72 miles. Choice A is the rate itself, stopping too early. Choice D doubles 45 as if 4 hours were double 2.5.'
        },
        {
          stem: 'Jon can paint a fence in 6 hours; Lee can paint it in 3 hours. Working together, how long will it take?',
          choices: ['1.5 hours', '2 hours', '4.5 hours', '9 hours'],
          answer: 1,
          explanation: 'Rates: Jon does 1/6 per hour, Lee 1/3 = 2/6 per hour. Together 3/6 = 1/2 per hour, so the job takes 2 hours. Choice D adds the times, which would make them slower together than either alone. Choice C averages the times, also impossible.'
        },
        {
          stem: 'Maria is 4 times as old as her son. In 8 years she will be twice as old as he will be. How old is her son now?',
          choices: ['4', '8', '12', '16'],
          answer: 0,
          explanation: 'Let s = son now; Maria is 4s. In 8 years: 4s + 8 = 2(s + 8). Then 4s + 8 = 2s + 16, so 2s = 8 and s = 4. Check: now 4 and 16; in 8 years 12 and 24, and 24 is twice 12. Choice D is Maria\'s current age.'
        },
        {
          stem: 'How many liters of pure water must be added to 6 liters of a 50% salt solution to make it a 20% solution?',
          choices: ['3', '6', '9', '15'],
          answer: 2,
          explanation: 'Salt is conserved: 6 × 0.50 = 3 liters of salt. After adding w liters of water, 3 = 0.20(6 + w), so 6 + w = 15 and w = 9. Choice D is the final total volume, not the water added. Track the pure substance, not the percents.'
        },
        {
          stem: 'A jar holds nickels and dimes worth 2.40 dollars in total. There are 30 coins. How many dimes are there?',
          choices: ['12', '18', '20', '24'],
          answer: 1,
          explanation: 'Let d = dimes; nickels = 30 − d. Value: 10d + 5(30 − d) = 240 cents. Then 10d + 150 − 5d = 240, so 5d = 90 and d = 18. Choice A is the number of nickels. Working in cents avoids decimal slips.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Read the last sentence first and write "Find: ___." That single habit prevents most wrong answers.
- Identify the type and write its governing relationship: rate × time = distance; rates add for work; everyone ages equally; pure substance is conserved; consecutive odds differ by 2.
- Define variables in words and use a table for multi-row problems.
- Toward each other: distances add. Same destination: distances equal.
- Check the answer against the story, then confirm it is the quantity the question asked for.`
    }
  ]
},
{
  id: 'all-math-number-sense',
  test: 'all',
  section: 'math',
  skill: 'number-sense',
  title: 'Number Sense: Number Lines, Absolute Value, Scientific Notation, and Place Value',
  minutes: 13,
  level: 2,
  objectives: [
    'Locate and compare numbers, including negatives and fractions, on a number line',
    'Interpret absolute value as distance from zero and solve simple absolute value equations',
    'Convert between standard and scientific notation and compare magnitudes',
    'Use place value and rounding to estimate quickly and accurately'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Numbers as positions and distances',
      md: `### The number line

Every real number is a point on a line. Right is bigger; left is smaller. This is the one picture that makes negatives obvious: −7 is to the left of −2, so −7 < −2, even though 7 is "bigger" than 2. Between any two numbers there are infinitely many others, so 3/8 and 0.4 and 0.375 all have exact spots.

To place a fraction, divide the unit interval into the denominator's number of pieces and count the numerator. To compare, convert to decimals or a common denominator, or use benchmarks (0, 1/2, 1).

### Absolute value is distance

|x| is the distance from x to zero, so it is never negative. |−5| = 5 and |5| = 5. Distance has no direction.

This means an equation like |x| = 5 has **two** solutions, x = 5 and x = −5, because two points sit 5 units from zero. And |x − 3| = 2 means "x is 2 units from 3," giving x = 5 or x = 1.

More generally, |a − b| is the distance between a and b on the number line. That is why it is useful for "how far apart" questions.

### Scientific notation

Very large and very small numbers are written as **a × 10ⁿ** with 1 ≤ a < 10. The exponent tells how many places the decimal point moved.

- 4,500,000 = 4.5 × 10⁶ (point moved 6 places left).
- 0.00032 = 3.2 × 10⁻⁴ (point moved 4 places right; negative exponent means small).

To compare numbers in scientific notation, compare exponents first. Only if the exponents match do you compare the front numbers.

To multiply, multiply the front numbers and add the exponents; then fix the front number back into the 1-to-10 range if needed: (3 × 10⁴)(5 × 10³) = 15 × 10⁷ = 1.5 × 10⁸.

### Place value and rounding

Each place is ten times the place to its right. In 4,728.56, the 7 is in the hundreds place and is worth 700; the 5 is in the tenths place and is worth 0.5.

To round to a place, look at the digit **one place to the right**. If it is 5 or more, round up; otherwise keep. 4,728.56 rounded to the nearest ten is 4,730; to the nearest tenth is 4,728.6.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Comparing or ordering numbers

1. Convert everything to decimals (or all to the same form).
2. Negatives are all less than positives. Among negatives, the one with the larger absolute value is smaller.
3. Pad decimals to the same length and compare left to right.

### Absolute value equations

1. Isolate the absolute value expression.
2. Split into two cases: the inside equals the positive value, or the inside equals the negative value.
3. Solve both. Check both in the original. If the isolated absolute value equals a negative number, there is no solution.

### Scientific notation conversions

1. Move the decimal point until exactly one nonzero digit is to its left.
2. Count the moves. Left moves give a positive exponent; right moves give a negative exponent.
3. To go back to standard form, move the point the other way.

### Estimation

1. Round each number to one or two significant digits.
2. Compute with the rounded numbers.
3. Note whether you rounded mostly up or down, so you know which direction the exact answer lies.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Order from least to greatest: −3/4, 0.7, −0.8, |−0.5|.

**Step 1.** The question asks for an ordering, so I will put everything in decimal form and think about positions on the number line.

**Step 2.** −3/4 = −0.75. 0.7 stays. −0.8 stays. |−0.5| = 0.5 (absolute value removes the sign).

**Step 3.** Negatives come first. I have −0.75 and −0.8. On the number line, −0.8 is farther left than −0.75 (it has the larger absolute value), so −0.8 is smaller. Order so far: −0.8, −0.75.

**Step 4.** Positives: 0.5 and 0.7. So 0.5 then 0.7.

**Answer: −0.8, −3/4, |−0.5|, 0.7.**

**Trap on this problem:** ranking −0.75 below −0.8 because 0.75 < 0.8 (true for positives, reversed for negatives), or forgetting that |−0.5| is positive and placing it among the negatives.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** The distance from Earth to the Sun is about 93,000,000 miles. Write this in scientific notation.

Setup done for you:

- I need the form a × 10ⁿ with 1 ≤ a < 10.
- The only nonzero digits are 9 and 3, so a = 9.3.
- Now count how many places the decimal point moves from its position in 93,000,000 (after the last zero) to just after the 9.

Finish: count the moves and decide whether the exponent is positive or negative.`,
      question: {
        stem: 'What is 93,000,000 written in scientific notation?',
        choices: ['9.3 × 10⁶', '9.3 × 10⁷', '93 × 10⁶', '9.3 × 10⁻⁷'],
        answer: 1,
        explanation: 'The decimal point moves 7 places left: 9.3 × 10⁷. Choice C has the correct value but 93 is not between 1 and 10, so it is not proper scientific notation. Choice D has a negative exponent, which means a tiny number. Choice A undercounts the zeros.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Bigger absolute value means bigger number?** Only for positives. −9 < −2.
- **Absolute value makes everything positive, including expressions inside?** No: |x − 3| is not x + 3. Evaluate inside first, then take the distance.
- **One solution for |x| = 5.** There are two.
- **Scientific notation with a front number of 10 or more** (like 15 × 10⁷). Shift it to 1.5 × 10⁸.
- **Negative exponent means a negative number.** No: 10⁻³ = 0.001, a small positive.
- **Rounding by looking two places right.** Only the very next digit matters. 2.449 to the nearest tenth is 2.4, not 2.5.
- **Place vs. value.** In 6,052, the 5 is in the tens place and its value is 50.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Which number is farthest from zero on the number line?',
          choices: ['−6.5', '6.2', '−6.05', '5.9'],
          answer: 0,
          explanation: 'Distance from zero is absolute value: 6.5, 6.2, 6.05, 5.9. The largest is 6.5, so −6.5 is farthest. Being negative does not make it closer; sign is direction, not distance.'
        },
        {
          stem: 'What are the solutions to |x − 4| = 6?',
          choices: ['x = 10 only', 'x = −2 only', 'x = 10 or x = −2', 'x = 2 or x = −10'],
          answer: 2,
          explanation: '"x is 6 units from 4" gives x = 4 + 6 = 10 or x = 4 − 6 = −2. Check: |10 − 4| = 6 and |−2 − 4| = |−6| = 6. Choice A forgets the negative case.'
        },
        {
          stem: 'What is 0.000078 in scientific notation?',
          choices: ['7.8 × 10⁵', '7.8 × 10⁻⁵', '78 × 10⁻⁶', '7.8 × 10⁻⁴'],
          answer: 1,
          explanation: 'Move the point 5 places right to get 7.8, so the exponent is −5. Choice C is equal in value but 78 is not in the 1-to-10 range. Choice D miscounts the zeros. A number less than 1 must have a negative exponent.'
        },
        {
          stem: 'Which is the best estimate of 6,872 ÷ 71?',
          choices: ['10', '100', '1,000', '7'],
          answer: 1,
          explanation: 'Round to 7,000 ÷ 70 = 100. The exact answer is about 96.8. Choice D treats 6,872 as about 500. Rounding both numbers to one significant digit makes the division trivial.'
        },
        {
          stem: 'In the number 58,316.49, what is the value of the digit 3?',
          choices: ['3', '30', '300', '3,000'],
          answer: 2,
          explanation: 'Reading from the decimal point leftward: 6 is ones, 1 is tens, 3 is hundreds. So the 3 is worth 300. Choice D confuses it with the thousands place (occupied by 8).'
        }
      ]
    },
    {
      type: 'summary',
      md: `- On the number line, right is bigger. Among negatives, the larger absolute value is the smaller number.
- Absolute value is distance from zero; |x| = k has two solutions, and |a − b| is the distance between a and b.
- Scientific notation: a × 10ⁿ with 1 ≤ a < 10. Positive exponent for big, negative for small. Compare exponents first.
- Round by looking at the single digit to the right of the target place.
- Estimate with one-significant-digit rounding before computing.`
    }
  ]
},
{
  id: 'all-math-strategy',
  test: 'all',
  section: 'math',
  skill: 'strategy',
  title: 'Math Test Strategy: Backsolving, Plugging In, Pacing, and Guessing',
  minutes: 15,
  level: 3,
  objectives: [
    'Backsolve from the answer choices when the question asks for a specific number',
    'Plug in your own numbers when the choices contain variables',
    'Eliminate impossible choices using size, sign, and units',
    'Budget time per question for each test and decide when to skip',
    'Apply the correct guessing rule: guess everything on HSPT and ISEE; use the elimination rule on SSAT'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Multiple choice changes the game',
      md: `### The answer is on the page

On a multiple-choice test, you do not have to generate the answer; you have to **identify** it. That opens two powerful techniques that are useless in math class but decisive on test day.

**Backsolving.** When the question asks for a specific number ("how old is Ana," "what is x"), the correct value is one of the four or five choices. Test them. Start with the middle value: if it is too big, you have also eliminated everything bigger, and vice versa. Usually two tries settle it.

**Plugging in.** When the choices contain variables ("which expression represents the total cost"), pick easy concrete numbers for the variables, work the problem with those numbers to get a target, then test each choice with the same numbers. Only the right expression hits the target. Avoid 0 and 1 (they make too many choices agree), and if two choices tie, try a second set of numbers.

### Elimination

Before computing, ask what a reasonable answer looks like. Positive or negative? Bigger or smaller than a number in the problem? Whole or fraction? Which units? Often two choices are impossible, and a 50-50 guess on a hard problem is worth more than the time an exact solution would cost.

### Time is the scarcest resource

| Test section | Questions | Minutes | Pace |
|---|---|---|---|
| HSPT Mathematics | 64 | 45 | about 42 seconds each |
| HSPT Quantitative Skills | 52 | 30 | about 35 seconds each |
| SSAT Quantitative (each of two sections) | 25 | 30 | about 72 seconds each |
| ISEE Quantitative Reasoning | 37 | 35 | about 57 seconds each |
| ISEE Mathematics Achievement | 47 | 40 | about 51 seconds each |

These paces mean you cannot afford to get stuck. Questions are worth the same whether easy or hard. The skill is to collect every easy point first, then spend leftover time on hard ones.

### Guessing rules

- **HSPT**: no penalty for wrong answers. Answer every question. Never leave a blank.
- **ISEE**: no penalty for wrong answers. Answer every question.
- **SSAT (Middle and Upper)**: +1 for a right answer, −1/4 for a wrong answer, 0 for a blank. Random guessing among five choices breaks even on average. **If you can eliminate even one choice, guess.** If you truly cannot eliminate any, leaving it blank is acceptable. (SSAT Elementary has no penalty.)`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Two passes

1. **First pass**: work in order. For each question, decide within about 10 seconds whether you see how to do it. If yes, do it. If no, mark it and move on. Do not let a hard problem steal time from three easy ones behind it.
2. **Second pass**: return to marked questions, hardest last. Use backsolving and elimination aggressively.
3. **Final minute**: fill every blank on HSPT and ISEE. On SSAT, fill blanks where you eliminated at least one choice.

### Backsolving

1. Confirm the question asks for a number and the choices are numbers.
2. Start with the middle choice (choices are usually in order).
3. Run the story with that value. Too big or too small? Eliminate in that direction.
4. Test the next candidate.

### Plugging in

1. Confirm the choices contain variables.
2. Choose small, friendly numbers that respect the problem's conditions (if n is even, pick 4). Avoid 0 and 1.
3. Compute the target from the problem.
4. Evaluate every choice. Keep only those that match. If more than one matches, pick new numbers and test the survivors.

### When to skip

Skip immediately if: you do not recognize the problem type, it needs a formula you do not know, or it will take more than twice the pace time. Come back only if time remains.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** A bookstore sells hardcovers for h dollars each and paperbacks for p dollars each. Which expression represents the cost of 3 hardcovers and 5 paperbacks after a 10-dollar coupon is applied?
(A) 3h + 5p + 10  (B) 3h + 5p − 10  (C) 8(h + p) − 10  (D) 15hp − 10

**Step 1.** The choices have variables, so I will plug in. I pick h = 4 and p = 2. Small, different, not 0 or 1.

**Step 2.** Compute the target from the story: 3 hardcovers cost 3 × 4 = 12. 5 paperbacks cost 5 × 2 = 10. Total 22, minus the 10-dollar coupon: **12**. That is my target.

**Step 3.** Test each choice with h = 4, p = 2:
- (A) 12 + 10 + 10 = 32. No.
- (B) 12 + 10 − 10 = 12. Yes.
- (C) 8(6) − 10 = 38. No.
- (D) 15(8) − 10 = 110. No.

**Step 4.** Only (B) hits the target. **Answer: B.**

**Why this beats pure algebra under pressure:** I never had to argue about whether the coupon is added or subtracted in symbols; the numbers made the story concrete, and the wrong choices collapsed on their own.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Dev has twice as many stickers as Mia. Together they have 42. How many does Dev have?
(A) 14  (B) 21  (C) 28  (D) 35

Setup done for you (backsolving):

- The question asks for a number, so I test the choices. Start in the middle with (B) 21.
- If Dev has 21, Mia has half: 10.5. Total 31.5. Too small, and not a whole number. So (A) is also out.
- Next try (C) 28.

Finish: if Dev has 28, how many does Mia have, and does the total come to 42?`,
      question: {
        stem: 'Dev has twice as many stickers as Mia. Together they have 42. How many does Dev have?',
        choices: ['14', '21', '28', '35'],
        answer: 2,
        explanation: 'If Dev has 28, Mia has 14, and 28 + 14 = 42. Backsolving confirms (C). Algebra agrees: m + 2m = 42, so m = 14 and Dev has 28. Choice A (14) is Mia, the classic wrong-person trap, which backsolving avoids because you check the whole story.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Perfectionism.** Spending three minutes to be sure of one question costs you four others. Mark it and move.
- **Plugging in 0 or 1.** These make expressions like 2n and n² agree. Use numbers like 3, 4, 5.
- **Plugging in numbers that break the problem's conditions.** If the problem says n is odd, do not use 4.
- **Backsolving from the top.** Start in the middle to eliminate half with one test.
- **Leaving blanks on HSPT or ISEE.** There is no penalty; a blank is a guaranteed zero.
- **Random guessing on SSAT without eliminating.** It averages to zero; eliminate first, then guess.
- **Changing an answer on a hunch.** Change it only when you find a specific error.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'On the HSPT, you have 30 seconds left and four questions blank. What should you do?',
          choices: ['Leave them blank to avoid losing points', 'Fill in an answer for every one', 'Read each carefully and answer only the ones you are sure of', 'Answer only the two easiest'],
          answer: 1,
          explanation: 'The HSPT has no guessing penalty, so a blank is a guaranteed zero while a guess has a 25% chance of a point. Fill in every blank. The same rule applies on the ISEE.'
        },
        {
          stem: 'On the SSAT Upper, you have eliminated two of five choices on a question but cannot decide among the rest. What is the best decision?',
          choices: ['Leave it blank', 'Guess among the remaining three', 'Spend as long as needed to solve it', 'Pick the answer with the largest number'],
          answer: 1,
          explanation: 'With two eliminated, a guess has a 1/3 chance of +1 and a 2/3 chance of −1/4, an expected value of +1/6. That is positive, so guess. Leaving it blank earns 0. The rule: eliminate at least one choice, then guess.'
        },
        {
          stem: 'Which question is best suited to plugging in your own numbers?',
          choices: ['What is 15% of 80?', 'If x + 3 = 11, what is x?', 'Which expression equals the perimeter of a rectangle with length w + 2 and width w?', 'What is the area of a circle with radius 3?'],
          answer: 2,
          explanation: 'Plugging in fits when the answer choices contain variables. Choice C is the only one whose answer will be an expression in w. The others ask for specific numbers (and B is a candidate for backsolving).'
        },
        {
          stem: 'A question asks "what is the smallest integer n such that 3n + 7 > 40?" The choices are 10, 11, 12, 13. Using backsolving, which choice should you test first and why?',
          choices: ['10, because it is the smallest', '13, because it is the largest', '11 or 12, because testing a middle value eliminates half the choices', '12, because even numbers are more likely'],
          answer: 2,
          explanation: 'Testing a middle value tells you which direction to go and eliminates half the choices at once. Test 11: 3(11) + 7 = 40, not greater than 40, so 11 fails and 10 fails too. Test 12: 43 > 40, so the answer is 12. Two tests settled it.'
        },
        {
          stem: 'A problem asks for the number of students on a bus. Before solving, which answer choice can you eliminate immediately?',
          choices: ['24', '30', '37.5', '42'],
          answer: 2,
          explanation: 'A count of students must be a whole number, so 37.5 is impossible. Eliminating by reasonableness (whole numbers for counts, positive for lengths, matching units) is free and fast, and it improves any guess you have to make.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- The answer is on the page: backsolve when the choices are numbers (start in the middle); plug in friendly numbers when the choices have variables.
- Eliminate by sign, size, units, and whole-number sense before you compute.
- Know your pace: HSPT Math 64 in 45, SSAT Quant 25 in 30 per section, ISEE QR 37 in 35, ISEE MA 47 in 40. Two passes: easy first, hard later.
- Guessing: answer everything on HSPT and ISEE. On SSAT, guess whenever you can eliminate at least one choice.
- Mark and move. No single question is worth three others.`
    }
  ]
},
{
  id: 'hspt-quant-number-series',
  test: 'hspt',
  section: 'quant',
  skill: 'number-series',
  title: 'HSPT Number Series: Find the Rule by Looking at Differences',
  minutes: 14,
  level: 3,
  objectives: [
    'Find the rule of a series by writing the differences between terms',
    'Recognize the main series types: constant add, multiply, alternating operations, interleaved series, changing differences, and letter series',
    'Predict the next term or a missing middle term and verify it against the whole series',
    'Work at HSPT pace (about 35 seconds per question)'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'A series is a rule in disguise',
      md: `### What the HSPT is testing

A number series question shows 5 to 7 numbers and asks for the next one (or occasionally a missing one in the middle). The numbers come from a **rule** applied over and over. Your job is to recover the rule, then apply it once more. Everything else is arithmetic.

### The core tool: differences

Write the difference between each pair of neighbors **under** the series. The pattern of differences reveals the rule far faster than staring at the numbers.

- 4, 7, 10, 13, ... differences: +3, +3, +3. **Constant add.** Next: 16.
- 3, 6, 12, 24, ... differences: +3, +6, +12. The differences double, which signals **multiplication** (each term is 2× the one before). Next: 48.
- 2, 5, 4, 7, 6, 9, ... differences: +3, −1, +3, −1. **Alternating operations.** Next: 8.
- 1, 4, 9, 16, 25, ... differences: +3, +5, +7, +9. The differences themselves increase by 2 each time (**second differences** are constant). These are perfect squares. Next: 36.
- 2, 10, 4, 20, 6, 30, ... differences look chaotic. Try **every other term**: 2, 4, 6 and 10, 20, 30. Two interleaved series. Next: 8.

### Letter series

Letters stand for their positions in the alphabet (A = 1, B = 2, ..., Z = 26). Treat them as numbers. C, F, I, L, ... is +3 each time, so the next is O. Mixed series like A1, C3, E5 run two patterns side by side.

### Series types you will see

1. **Add or subtract a constant.**
2. **Multiply or divide by a constant.**
3. **Alternating**: two operations taking turns (+5, −2, +5, −2).
4. **Interleaved**: two separate series woven together; check every other term.
5. **Growing differences**: differences that go up by a constant (second differences) or follow their own pattern.
6. **Squares, cubes, primes**: recognize the famous lists.
7. **Mixed letters and numbers.**`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `1. **Write the differences** under the series. Include signs.
2. **Read the differences.**
   - All the same? Add that number.
   - Growing proportionally (×2, ×3)? The series is multiplicative; check the ratio of neighbors instead.
   - Alternating between two values? Two operations taking turns.
   - Growing by a constant? Second differences; extend the difference pattern first, then the series.
   - Chaotic? Test every other term for two interleaved series.
3. **State the rule in words** ("add 4, then subtract 1, repeat").
4. **Apply the rule once more** to get the next term. For a missing middle term, apply the rule forward from the left and backward from the right; both should agree.
5. **Verify** that your rule produces every given term, not just the last two. A rule that fits only part of the series is wrong.

### Pace

About 35 seconds per question. If the differences do not reveal the rule in 15 seconds, test interleaving; if that fails, mark it and move on. These are all worth one point.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** What number should come next in the series 3, 4, 8, 9, 18, 19, ____?

**Step 1.** I write the differences: 3→4 is +1, 4→8 is +4, 8→9 is +1, 9→18 is +9, 18→19 is +1.

**Step 2.** I read them: +1, +4, +1, +9, +1. The +1 repeats every other step. The other steps are +4 and +9, which are not constant, so they are probably not additions. I check the terms themselves: 8 is 2 × 4, and 18 is 2 × 9. So the "other" operation is **multiply by 2**, not add.

**Step 3.** Rule in words: **add 1, then double, repeat.**

**Step 4.** Verify against every term: 3 (+1) 4 (×2) 8 (+1) 9 (×2) 18 (+1) 19. All six terms fit.

**Step 5.** Apply once more. The last step was +1, so the next step is ×2: 19 × 2 = **38**.

**Trap on this problem:** seeing +1, +4, +1, +9 and guessing the pattern is +1, +16 (squares), which would give 19 + 16 = 35. That reads the differences as additive when the series is actually alternating add-and-multiply. Checking that the rule produces every term catches this: "+1, +4, +1, +9" has no natural reason to be squares in between +1s, while "double" explains both the 4→8 and 9→18 steps.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** What number should fill the blank in the series 40, 37, 41, 38, 42, ____, 43?

Setup done for you:

- Differences: 40→37 is −3, 37→41 is +4, 41→38 is −3, 38→42 is +4.
- Rule: alternate **−3, +4**.
- The step after 42 should be −3.

Finish: compute 42 − 3, then confirm by checking that adding 4 to your answer gives the 43 at the end.`,
      question: {
        stem: 'What number should fill the blank in the series 40, 37, 41, 38, 42, ____, 43?',
        choices: ['38', '39', '45', '46'],
        answer: 1,
        explanation: '42 − 3 = 39, and 39 + 4 = 43 matches the final term, so both directions agree. Choice D (46) applies +4 out of turn. Choice A (38) repeats the earlier term instead of following the rule. Always check a missing middle term from both sides.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Fitting only the last two terms.** The rule must generate the whole series.
- **Confusing "add a growing amount" with "multiply."** 2, 4, 8, 16 doubles; 2, 4, 7, 11 adds 2, 3, 4. Both start 2, 4. Look at three differences, not one.
- **Missing an interleaved series.** If differences look random, check every other term immediately.
- **Sign slips in decreasing series.** 50, 45, 41, 38 has differences −5, −4, −3; next is −2, giving 36.
- **Letters: forgetting to wrap or count.** After Y comes Z; after Z, most HSPT series stop or wrap to A. Count positions on your fingers if needed.
- **Choosing the term after the next.** The question asks for the **next** term, not two ahead.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'What number should come next: 5, 11, 23, 47, ____?',
          choices: ['71', '83', '94', '95'],
          answer: 3,
          explanation: 'Differences: +6, +12, +24, doubling each time, so the next difference is +48 and the term is 95. Equivalently, each term is double the previous plus 1 (5×2+1 = 11, 11×2+1 = 23, 23×2+1 = 47, 47×2+1 = 95). Choice A (71) adds 24 again instead of doubling the difference.'
        },
        {
          stem: 'What number should come next: 7, 21, 9, 27, 11, 33, ____?',
          choices: ['13', '35', '39', '99'],
          answer: 0,
          explanation: 'Two interleaved series: 7, 9, 11 (add 2) and 21, 27, 33 (add 6, each triple the odd-position term). The next term belongs to the first series: 13. Choice C (39) is the term after that. Choice D triples 33, misreading the pattern as a single chain.'
        },
        {
          stem: 'What should come next: B, D, G, K, ____?',
          choices: ['N', 'O', 'P', 'Q'],
          answer: 2,
          explanation: 'Convert to positions: 2, 4, 7, 11. Differences: +2, +3, +4, so the next is +5, giving 16, which is P. Choice A (N = 14) assumes a constant +3; choice B (O = 15) assumes +4 again.'
        },
        {
          stem: 'What number should come next: 100, 90, 81, 73, 66, ____?',
          choices: ['58', '59', '60', '61'],
          answer: 2,
          explanation: 'Differences: −10, −9, −8, −7. The next difference is −6, so 66 − 6 = 60. Choice A (58) subtracts 8 by mistake; choice B subtracts 7 again instead of shrinking the step.'
        },
        {
          stem: 'What number should fill the blank: 2, 6, 18, ____, 162?',
          choices: ['36', '54', '72', '90'],
          answer: 1,
          explanation: 'Each term is 3 times the previous: 2, 6, 18, 54, 162. Check from the right: 162 ÷ 3 = 54. Both directions agree. Choice A doubles 18; choice C adds 54 to 18. When differences grow fast, test the ratio.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Write the differences under the series. They reveal the rule.
- Constant differences: add. Proportionally growing differences: multiply. Alternating differences: two operations taking turns. Differences that grow by a constant: second differences.
- Random-looking differences: check every other term for two interleaved series.
- Letters are numbers (A = 1 ... Z = 26). Convert and proceed.
- State the rule in words, verify it on every term, and apply it exactly once more. For a blank in the middle, check from both sides.`
    }
  ]
},
{
  id: 'hspt-quant-comparison',
  test: 'hspt',
  section: 'quant',
  skill: 'quant-comparison',
  title: 'HSPT Comparisons: Geometric Figures and (a), (b), (c) Statements',
  minutes: 15,
  level: 3,
  objectives: [
    'Evaluate each of (a), (b), (c) fully before reading the answer choices',
    'Compare shaded regions, angles, and lengths in figures using fractions of the whole',
    'Test each answer choice as a true/false statement and pick the one that is true',
    'Avoid the traps built into near-equal quantities'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Three quantities, four statements, one truth',
      md: `### The format

HSPT comparison questions come in two flavors.

**Non-geometric:** three expressions are labeled (a), (b), (c), for example (a) 3² (b) 2³ (c) 9. The four answer choices are statements like "(a) is greater than (b)" or "(a) equals (c)" or "(b) is less than (a) and (c)". Exactly one statement is true.

**Geometric:** a figure shows three shapes, angles, or shaded regions labeled (a), (b), (c), and the choices make the same kind of claims: "(a) is more shaded than (b)," "the angles are all equal," and so on.

### The underlying idea

This is a **compute-then-compare** task. The only way to go wrong is to compare before computing or to compute incorrectly. So the discipline is: **find the exact value of each of (a), (b), and (c) first**, write them down, and only then read the choices. Students who read the choices first start looking for "which one sounds right," which is exactly what the test writer is exploiting.

For the example above: (a) 3² = 9, (b) 2³ = 8, (c) 9. Now any statement is a simple true/false check. "(a) equals (c)" is true. "(b) is greater than (a)" is false.

### Geometric comparisons

Figures are drawn to scale unless stated otherwise, but the test writer chooses cases where the eye is unreliable. Convert every shaded region to a **fraction of its whole**: a circle with 3 of 8 equal wedges shaded is 3/8; a rectangle with 2 of 6 equal columns shaded is 1/3. Then compare fractions, not pictures.

For angles, use the facts: a straight line is 180°, a right angle is 90°, vertical angles are equal, triangle angles sum to 180°. For lengths, use the grid or the labeled numbers.

### Reading the statements

- "greater than" and "less than" are strict. If two values are equal, neither is greater.
- "(a) is greater than (b) and (c)" requires both comparisons to be true.
- "(a) plus (b) equals (c)" asks you to add first.
- "(a), (b), and (c) are all equal" is often the trap: values that look equal (like 0.5, 1/2, and 50% of 1) might actually be equal, or one might differ by a hair (0.5 vs 0.05).`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Non-geometric

1. **Cover the answer choices.** Compute (a), (b), and (c) to a single number each. Write the numbers next to the labels.
2. **Note equalities first.** If two are equal, any "greater than" claim between them is false.
3. **Read each choice as a true/false test** against your three numbers. Stop at the first true one, but glance at the rest if the question felt easy; "exactly one is true" means a second true statement signals an arithmetic slip.

### Geometric

1. **Decide what is being compared**: shaded fraction, angle size, length, area, or count.
2. **Quantify each figure.** Shaded: count shaded parts over total equal parts. Angles: use 180° and 90° facts. Lengths: count units.
3. **Put all three in the same form** (same denominator, or decimals).
4. **Test the choices** as true/false.

### Speed

Most of these are 30 to 40 seconds. The computing step is the slow part; the comparing step should be instant once the three numbers are written down. Never try to hold three values in your head.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** Examine (a), (b), and (c) and find the best answer.
(a) 25% of 80  (b) 1/5 of 100  (c) 0.4 × 50
A. (a) is greater than (b) and (c)
B. (b) is greater than (a)
C. (a), (b), and (c) are all equal
D. (c) is less than (a)

**Step 1.** I cover the choices and compute. (a) 25% of 80: a quarter of 80 is 20. (b) 1/5 of 100 is 20. (c) 0.4 × 50: 4 × 50 is 200, with one decimal place, so 20.

**Step 2.** I write: (a) = 20, (b) = 20, (c) = 20. All three are equal. That means any "greater than" or "less than" statement is false.

**Step 3.** Test the choices. A: is 20 greater than 20? No. B: no. C: all equal? Yes. D: no.

**Answer: C.**

**What the test writer wanted:** three different-looking expressions (a percent, a fraction, a decimal) so that a student who compares formats instead of values picks a "greater than" option at random. Computing first makes the trick vanish.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Three identical rectangles are each divided into equal parts. In (a), 2 of 4 parts are shaded. In (b), 3 of 8 parts are shaded. In (c), 4 of 6 parts are shaded. Which statement is true?
A. (a) is more shaded than (c)
B. (b) is more shaded than (a)
C. (c) is more shaded than (a) and (b)
D. (a) and (b) are equally shaded

Setup done for you:

- (a) = 2/4 = 1/2. (b) = 3/8. (c) = 4/6 = 2/3.
- Common denominator 24: (a) = 12/24, (b) = 9/24, (c) = 16/24.

Finish: order the three fractions, then test each choice as true or false.`,
      question: {
        stem: 'Rectangles (a), (b), (c) are shaded 2/4, 3/8, and 4/6 respectively. Which statement is true?',
        choices: ['(a) is more shaded than (c)', '(b) is more shaded than (a)', '(c) is more shaded than (a) and (b)', '(a) and (b) are equally shaded'],
        answer: 2,
        explanation: 'In twenty-fourths: (b) 9 < (a) 12 < (c) 16. So (c) is the most shaded, which makes choice C true. Choice A reverses (a) and (c). Choice D is the trap for students who count shaded pieces (2 vs 3) without the whole; 3 of 8 is less than 2 of 4.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Reading the choices before computing.** This is the number-one error. Compute first.
- **Counting shaded pieces instead of fractions.** 3 shaded of 8 is less than 2 shaded of 4.
- **Trusting the picture for angles.** A 85° angle and a 95° angle look alike. Use the given numbers and the 180° facts.
- **Strict vs. non-strict.** "Greater than" is false when the values are equal.
- **Exponent and decimal slips.** 2³ is 8, not 6. 0.4 × 50 is 20, not 2.
- **Stopping at the first plausible choice.** If two choices seem true, one of your three values is wrong. Recompute.
- **"(a) + (b) = (c)" type statements.** Do the addition; do not guess from size.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Examine (a), (b), and (c): (a) 4² (b) 2⁴ (c) 4 × 2. Which statement is true?',
          choices: ['(a) is greater than (b)', '(a) equals (b)', '(c) is greater than (a)', '(b) is less than (c)'],
          answer: 1,
          explanation: '(a) 4² = 16, (b) 2⁴ = 16, (c) 4 × 2 = 8. So (a) equals (b) and (c) is the smallest. Choice A is false because equal is not greater. The test writer chose 4² and 2⁴ because they look different but are equal.'
        },
        {
          stem: 'Examine (a), (b), and (c): (a) 0.3 (b) 1/3 (c) 30%. Which statement is true?',
          choices: ['(a), (b), and (c) are all equal', '(b) is greater than (a) and (c)', '(a) is greater than (b)', '(c) is less than (a)'],
          answer: 1,
          explanation: '(a) 0.3, (c) 30% = 0.3, but (b) 1/3 = 0.333..., which is slightly larger. So (b) is greater than both (a) and (c), and choice A is the trap: 1/3 is not 0.3. Choice D is false because (a) and (c) are equal.'
        },
        {
          stem: 'In a figure, angle (a) measures 90°, angle (b) is one angle of an equilateral triangle, and angle (c) is the supplement of a 60° angle. Which statement is true?',
          choices: ['(a) is greater than (c)', '(b) equals (c)', '(c) is greater than (a)', '(a) equals (b)'],
          answer: 2,
          explanation: '(a) = 90°. (b) = 60° (every angle of an equilateral triangle is 60°). (c) = 180° − 60° = 120°. So (c) is the largest, making choice C true. Choice B confuses the supplement with the angle itself.'
        },
        {
          stem: 'Examine (a), (b), and (c): (a) 2/3 of 18 (b) 3/4 of 16 (c) 5/6 of 12. Which statement is true?',
          choices: ['(a) is less than (b)', '(c) is greater than (b)', '(a) equals (b)', '(c) is greater than (a)'],
          answer: 2,
          explanation: '(a) 18 ÷ 3 × 2 = 12. (b) 16 ÷ 4 × 3 = 12. (c) 12 ÷ 6 × 5 = 10. So (a) equals (b), and both exceed (c). Choices A, B, and D are all false: 12 is not less than 12, and 10 is not greater than 12. Only the equality holds.'
        },
        {
          stem: 'Three circles are each cut into equal wedges. (a) has 2 of 3 wedges shaded, (b) has 5 of 8 shaded, (c) has 7 of 12 shaded. Which statement is true?',
          choices: ['(b) is more shaded than (a)', '(c) is more shaded than (b)', '(a) is more shaded than (b) and (c)', '(a) and (c) are equally shaded'],
          answer: 2,
          explanation: 'Common denominator 24: (a) 16/24, (b) 15/24, (c) 14/24. So (a) is the most shaded. The values are deliberately close; a glance cannot separate them, but the fractions can. Choice A is the trap for students who count 5 shaded as more than 2 shaded.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Compute (a), (b), and (c) to single values **before** reading any answer choice. Write them down.
- For figures, convert to fractions of the whole; for angles, use the 90° and 180° facts rather than your eyes.
- Equal values make every "greater than" or "less than" statement between them false.
- Test each choice as true or false. Exactly one is true; two apparent truths mean an arithmetic error.
- The format is designed to punish comparing before computing. Do not.`
    }
  ]
},
{
  id: 'hspt-quant-manipulation',
  test: 'hspt',
  section: 'quant',
  skill: 'number-sense',
  title: 'HSPT Number Manipulation: Translate the Sentence from the Inside Out',
  minutes: 13,
  level: 3,
  objectives: [
    'Translate a nested English sentence into an expression by working from the innermost phrase outward',
    'Handle "less than," "more than," "of," "times," and "divided by" in the correct order',
    'Solve reverse versions ("what number, when ...") with inverse operations',
    'Check the final answer by reading the sentence back with the number in it'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'The sentence is built like an onion',
      md: `### What these questions look like

"What number is 3 less than 20% of 60?"
"What number is 4 more than 1/3 of the product of 6 and 9?"
"The square of what number is 5 less than 54?"

Each one is a chain of operations described in words. The challenge is that English and arithmetic often run in **opposite directions**. "3 less than 20% of 60" has to be computed as 20% of 60 first (12), then 3 less than that (9). If you read left to right and compute 3 − 20% ... you get nonsense.

### Work from the inside out

The innermost phrase is the thing being acted on. It is usually at the **end** of the sentence. Find it, compute it, then peel outward one layer at a time:

"What number is 3 less than 20% of 60?"
- Innermost: 60.
- Next layer: 20% of 60 = 12.
- Next layer: 3 less than 12 = 9.

Reading the sentence right to left usually gives the correct computational order, which is why tutors call this "translate right to left."

### The vocabulary

| Phrase | Operation | Order matters? |
|---|---|---|
| "of" (with a fraction or percent) | multiply | no |
| "the product of A and B" | A × B | no |
| "the sum of A and B" | A + B | no |
| "A more than B" | B + A | no |
| "A less than B" | B − A | **yes**: start at B |
| "A subtracted from B" | B − A | **yes** |
| "the difference between A and B" | A − B | yes, in the order given |
| "A divided by B," "the quotient of A and B" | A ÷ B | **yes** |
| "the square of A" | A² | |
| "the square root of A" | √A | |
| "twice," "double," "half of" | ×2, ×2, ÷2 | |

### Reverse questions

"What number, when multiplied by 4 and then decreased by 5, gives 27?" Here the unknown is at the inside. Build the chain forward (n × 4 − 5 = 27), then undo it backward: add 5 (32), divide by 4 (8). This is exactly how you solve an equation.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `1. **Find the innermost quantity.** It is the concrete number or phrase being operated on, usually at the end of the sentence.
2. **Compute it**, or write it down if it is already a number.
3. **Peel one layer outward.** Read the next phrase to the left and apply it. For "less than" and "subtracted from," the number already in hand is the one being reduced.
4. **Repeat** until the sentence is used up.
5. **If the unknown is at the center** ("what number, when..."), write the chain with n and undo it in reverse.
6. **Read the sentence back** with your number in place. "Is 9 three less than 20% of 60?" 20% of 60 is 12, and 9 is three less than 12. Yes.

### Pace

These are 30-second questions. The reading is the hard part; the arithmetic is small. If you find yourself computing big numbers, you probably mis-nested the phrases.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** What number is 7 more than 2/5 of the product of 8 and 5?

**Step 1.** I look for the innermost quantity. The sentence ends with "the product of 8 and 5." That is a concrete thing I can compute: 8 × 5 = 40.

**Step 2.** Peel outward. The next phrase to the left is "2/5 of" that: 2/5 of 40. One fifth of 40 is 8, so two fifths is 16.

**Step 3.** Next layer: "7 more than" 16. That is 16 + 7 = 23.

**Step 4.** The sentence is used up. **Answer: 23.**

**Read it back:** Is 23 seven more than two-fifths of the product of 8 and 5? The product is 40, two-fifths of 40 is 16, and 23 is seven more than 16. Yes.

**Trap on this problem:** reading left to right and computing 7 + 2/5 first, or taking 2/5 of 8 and then multiplying by 5 (which happens to give the same 16 here but will not in general). Always compute the product before applying the fraction, because the sentence says the fraction is **of the product**.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** What number is 5 less than 30% of 150?

Setup done for you:

- Innermost: 150.
- Next layer: 30% of 150. Use the 10% trick: 10% of 150 is 15, so 30% is 45.

Finish: apply "5 less than" to 45. Remember that "5 less than 45" starts at 45 and goes down.`,
      question: {
        stem: 'What number is 5 less than 30% of 150?',
        choices: ['−40', '40', '45', '50'],
        answer: 1,
        explanation: '30% of 150 is 45, and 5 less than 45 is 40. Choice A (−40) comes from computing 5 − 45, the left-to-right trap. Choice D adds instead of subtracts. Choice C stops before the last layer.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Left-to-right subtraction.** "3 less than X" is X − 3. Never 3 − X.
- **Dividing in the wrong direction.** "The quotient of 48 and 6" is 48 ÷ 6 = 8, not 6 ÷ 48.
- **Stopping one layer early.** Count the operations in the sentence and make sure you performed all of them.
- **Applying a fraction before the product is formed.** "1/2 of the sum of 6 and 10" is 1/2 of 16 = 8, not 3 + 10.
- **Square vs. square root.** "The square of 6" is 36; "the square root of 36" is 6.
- **Reverse questions solved forward.** "What number, when doubled and increased by 3, equals 19?" Undo: 19 − 3 = 16, then 16 ÷ 2 = 8.
- **Percent slip.** 20% of 60 is 12, not 20.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'What number is 4 less than 1/2 of 36?',
          choices: ['14', '16', '18', '22'],
          answer: 0,
          explanation: 'Inside out: 1/2 of 36 is 18; 4 less than 18 is 14. Choice C stops before the last layer; choice D adds 4 instead of subtracting.'
        },
        {
          stem: 'What number is 6 more than the square of 5?',
          choices: ['16', '19', '31', '36'],
          answer: 2,
          explanation: 'The square of 5 is 25; 6 more than 25 is 31. Choice A uses 10 (double) instead of the square; choice D is the square of 6.'
        },
        {
          stem: 'What number, when multiplied by 3 and then decreased by 4, gives 20?',
          choices: ['5 1/3', '8', '16', '72'],
          answer: 1,
          explanation: 'Build the chain: 3n − 4 = 20. Undo in reverse: add 4 to get 24, divide by 3 to get 8. Check: 8 × 3 = 24, minus 4 is 20. Choice A comes from dividing 20 by 3 before undoing the subtraction.'
        },
        {
          stem: 'What number is 2/3 of the difference between 50 and 14?',
          choices: ['19 1/3', '24', '36', '42 2/3'],
          answer: 1,
          explanation: 'Innermost: the difference between 50 and 14 is 36. Then 2/3 of 36 is 24. Choice C stops at the difference. Choice A (19 1/3) comes from taking 2/3 of 50 first and then subtracting 14; the fraction applies to the whole difference, not to 50 alone.'
        },
        {
          stem: 'The square root of what number is 3 less than 10?',
          choices: ['7', '13', '49', '100'],
          answer: 2,
          explanation: '"3 less than 10" is 7. The sentence says the square root of the number is 7, so the number is 7² = 49. Choice A stops at 7 (the root, not the number). Choice D ignores the "3 less than."'
        }
      ]
    },
    {
      type: 'summary',
      md: `- These sentences nest operations like an onion. Find the innermost quantity (usually at the end) and peel outward.
- "A less than B" and "A subtracted from B" mean B − A. "Of" means multiply. "Quotient of A and B" is A ÷ B.
- Count the operations in the sentence; perform every one.
- For "what number, when ..." questions, write the chain with n and undo it in reverse.
- Read the sentence back with your number in it. If it is true, you are done.`
    }
  ]
},
{
  id: 'isee-quant-comparison',
  test: 'isee',
  section: 'quant',
  skill: 'quant-comparison',
  title: 'ISEE Quantitative Comparison: Column A vs. Column B',
  minutes: 16,
  level: 4,
  objectives: [
    'Memorize the four fixed answer choices and what each one claims',
    'Simplify both columns the same way before comparing',
    'Plug in 0, 1, a negative, and a fraction to test whether the relationship changes',
    'Recognize when D is impossible (no variables) and when D is likely (variables with few restrictions)'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Four answers, always the same',
      md: `### The format

Each question gives two quantities, **Column A** and **Column B**, sometimes with extra information centered above them. The four choices never change:

- **(A)** The quantity in Column A is greater.
- **(B)** The quantity in Column B is greater.
- **(C)** The two quantities are equal.
- **(D)** The relationship cannot be determined from the information given.

Roughly a third of the ISEE Quantitative Reasoning section is this format (Middle and Upper levels), so it is worth mastering as its own skill.

### What (D) really means

(D) does not mean "I could not figure it out." It means that **different legal values give different results**: for some allowed values Column A is bigger, for others Column B is bigger (or they are equal). The relationship genuinely changes.

This gives two immediate rules:

1. **If both columns are pure numbers with no variables, (D) is impossible.** Two numbers always have a fixed relationship. Compute and pick A, B, or C.
2. **If there are variables, (D) is possible**, and your job is to try to **break** whatever relationship you first see. If you cannot break it after testing the dangerous cases, the relationship holds.

### The dangerous numbers

Variables behave differently in different regions of the number line. When you plug in, test the cases that tend to flip relationships:

- **0** (kills products, makes x² = x)
- **1** (makes x² = x and x = 1/x)
- **a negative** (flips inequalities under multiplication, makes x² > x)
- **a fraction between 0 and 1** (makes x² < x and 1/x > x)
- **a large number** (shows long-run behavior)

The mnemonic many tutors use: **ZONE F** (Zero, One, Negative, Extreme, Fraction). You rarely need all five; usually 0, 1, −1, and 1/2 settle it.

### Simplify both columns alike

The columns are like two sides of a balance. You may add or subtract the same thing from both, or multiply or divide both by the same **positive** number, without changing which is bigger. This lets you strip away shared clutter. If Column A is 3x + 7 and Column B is 2x + 7, subtract 7 and 2x from both: compare x with 0. Now the answer depends on the sign of x, so without a restriction it is (D).

Never multiply or divide both columns by a variable unless you know its sign.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `1. **Read the centered information first.** Restrictions like "x > 0" or "x is an integer" decide which plug-ins are allowed.
2. **No variables?** Compute both columns. Answer A, B, or C. (D) is off the table.
3. **Variables present?** Simplify both columns by removing identical pieces.
4. **Plug in a simple number** that respects the restrictions (often 2). Note which column wins.
5. **Try to break it** with the dangerous numbers: 0, 1, a negative, a fraction. Stop as soon as the winner changes; the answer is (D).
6. **If the winner never changes** after testing the dangerous cases that are allowed, choose the consistent relationship (A, B, or C).
7. **Watch for equal.** If the simplification leaves identical expressions, the answer is (C) regardless of the variable.

### Timing

Quantitative comparisons should take 45 to 60 seconds. Plugging in two or three numbers is faster than solving algebraically, and safer.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** x ≠ 0.
Column A: x²   Column B: x

**Step 1.** The centered information says only that x is not zero. So x can be positive or negative, big or small, a fraction or an integer. That is a loose restriction, so I am alert for (D).

**Step 2.** Both columns have a variable; I cannot just compute. I plug in a simple number first: x = 2. Column A = 4, Column B = 2. A is bigger.

**Step 3.** Now I try to break it. A fraction: x = 1/2. Column A = 1/4, Column B = 1/2. **B is bigger.** The winner changed.

**Step 4.** Since different allowed values give different results, the relationship cannot be determined. **Answer: (D).**

**For contrast:** if the centered information had been "x > 1," then x² > x for every allowed value (squaring a number above 1 makes it bigger), and the answer would be (A). If it had been "0 < x < 1," squaring shrinks, and the answer would be (B). The restriction is everything.

**Trap on this problem:** testing only integers (2, 3, 10), seeing A win every time, and answering (A). Fractions and negatives are where relationships flip.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** a + b = 10.
Column A: 2a + 2b   Column B: 20

Setup done for you:

- Both columns involve the variables, but the centered fact gives me a + b exactly.
- I simplify Column A using the distributive property: 2a + 2b = 2(a + b).

Finish: substitute a + b = 10 into Column A and compare with Column B. Ask yourself whether any choice of a and b with a + b = 10 could change the result.`,
      question: {
        stem: 'If a + b = 10, compare Column A: 2a + 2b with Column B: 20.',
        choices: ['Column A is greater', 'Column B is greater', 'The two quantities are equal', 'The relationship cannot be determined'],
        answer: 2,
        explanation: '2a + 2b = 2(a + b) = 2(10) = 20, exactly Column B, no matter how a and b are split (3 and 7, −5 and 15, 2.5 and 7.5). So the answer is (C). Choice D is the trap: variables are present, but the given relationship pins the value down completely.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Choosing (D) because variables appear.** Variables with a strong enough restriction can still give A, B, or C. Test before you decide.
- **Choosing (D) when both columns are numbers.** Impossible. Compute.
- **Testing only positive integers.** 0, negatives, and fractions flip the most relationships.
- **Ignoring the centered information.** "x is a positive integer" rules out the very cases that would make (D).
- **Multiplying or dividing both columns by a variable.** If its sign is unknown, the comparison may flip.
- **Assuming a figure is to scale.** ISEE figures in this section are often not drawn to scale; use the given measurements.
- **Solving for an exact value when you do not need one.** You only need which column is bigger, not by how much.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Column A: 15% of 80   Column B: 80% of 15',
          choices: ['Column A is greater', 'Column B is greater', 'The two quantities are equal', 'The relationship cannot be determined'],
          answer: 2,
          explanation: 'Both equal 12, because a% of b equals b% of a (both are ab/100). No variables, so (D) is impossible; computing settles it. This commutative trick appears often.'
        },
        {
          stem: 'x < 0.  Column A: x³   Column B: x²',
          choices: ['Column A is greater', 'Column B is greater', 'The two quantities are equal', 'The relationship cannot be determined'],
          answer: 1,
          explanation: 'For any negative x, x³ is negative (odd power keeps the sign) and x² is positive. A positive always beats a negative, so Column B is greater for every allowed x. Test x = −1: A = −1, B = 1. Test x = −1/2: A = −1/8, B = 1/4. Same winner, and the reasoning covers all cases, so the answer is (B), not (D).'
        },
        {
          stem: 'y is a positive integer.  Column A: y + 5   Column B: 2y',
          choices: ['Column A is greater', 'Column B is greater', 'The two quantities are equal', 'The relationship cannot be determined'],
          answer: 3,
          explanation: 'Try y = 1: A = 6, B = 2, so A wins. Try y = 10: A = 15, B = 20, so B wins. The winner changes among allowed values, so (D). Simplifying (subtract y from both: compare 5 with y) shows the same thing: it depends on whether y is above or below 5.'
        },
        {
          stem: 'The perimeter of a square is 36.  Column A: the area of the square   Column B: 80',
          choices: ['Column A is greater', 'Column B is greater', 'The two quantities are equal', 'The relationship cannot be determined'],
          answer: 0,
          explanation: 'A square with perimeter 36 has side 9 and area 81. 81 > 80, so Column A is greater. The given fact fixes the square completely, so (D) is not possible even though the area is not written out.'
        },
        {
          stem: 'm > 0.  Column A: m/2   Column B: 2/m',
          choices: ['Column A is greater', 'Column B is greater', 'The two quantities are equal', 'The relationship cannot be determined'],
          answer: 3,
          explanation: 'Try m = 2: both equal 1. Try m = 4: A = 2, B = 1/2, so A wins. Try m = 1: A = 1/2, B = 2, so B wins. Three different results for allowed values, so (D). The restriction m > 0 removes negatives but still leaves fractions and large numbers, which flip the comparison.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- The four choices are fixed: A greater, B greater, equal, cannot be determined.
- (D) means the relationship changes for different allowed values. It is impossible when both columns are pure numbers.
- Read the centered restriction first; it decides which plug-ins are legal.
- Simplify both columns alike (add, subtract, or multiply or divide by a known positive), then plug in a simple number and try to break the result with 0, 1, a negative, and a fraction.
- If no legal value breaks the relationship, choose A, B, or C.`
    }
  ]
},
{
  id: 'isee-quant-reasoning',
  test: 'isee',
  section: 'quant',
  skill: 'word-problems',
  title: 'ISEE Quantitative Reasoning: Think, Estimate, and Pick the Expression',
  minutes: 14,
  level: 4,
  objectives: [
    'Recognize that QR rewards reasoning over calculation and adjust your approach',
    'Estimate and compare without computing exact values',
    'Translate a situation into the expression that represents it, and verify by plugging in',
    'Use structure (parity, divisibility, units, bounds) to eliminate choices quickly'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'QR is not the same as Math Achievement',
      md: `### Two math sections, two mindsets

The ISEE has two math sections. **Mathematics Achievement** asks you to compute: find the exact answer. **Quantitative Reasoning** asks you to think: decide which answer must be right, often with little or no calculation. QR problems are built so that the person who starts grinding numbers runs out of time, while the person who looks for structure finishes early.

### What "reasoning" looks like

- **Estimation.** "Which is closest to 0.49 × 81?" Half of 80 is 40. Done. The choices are far apart on purpose.
- **Which expression represents.** "A tank has g gallons and drains at r gallons per minute. How many gallons remain after t minutes?" You are asked for a formula, not a number: g − rt.
- **Structure and bounds.** "If n is an odd integer, which of the following must be even?" Test the choices with n = 3 or use parity: odd + odd is even, odd × odd is odd.
- **Comparing without solving.** "Which fraction is largest?" Benchmark against 1/2 and 1.
- **Reading a situation.** A graph or table with a question that needs one observation, not a full analysis.

### The underlying principle

Every QR question has a shortcut, and the shortcut comes from asking **"What must be true?"** rather than **"What is the value?"** Parity, sign, size, units, and the shape of an expression are all clues that exclude wrong answers before you compute anything.

### Pacing

37 questions in 35 minutes, and about a third are quantitative comparisons. The word problems and "which expression" items should take under a minute each. If a question seems to need three minutes of arithmetic, you are missing the shortcut; mark it and move on.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Before computing anything

1. **Read the question stem and the answer choices together.** The spread of the choices tells you how precise you need to be. Choices 10, 100, 1,000, 10,000 mean "estimate." Choices 41, 42, 43, 44 mean "compute."
2. **Ask what must be true.** Sign? Even or odd? Bigger or smaller than a number in the problem? Units?
3. **Eliminate** every choice that violates a must-be-true fact.

### For "which expression represents" questions

1. Assign small concrete numbers to the variables (avoid 0 and 1).
2. Work the story with those numbers to get a target.
3. Evaluate the choices with the same numbers; keep the one that matches.
4. Alternatively, build the expression directly: identify the starting amount, what is added or removed per unit, and how many units. Then confirm with one plug-in.

### For estimation questions

1. Round each number to one significant figure.
2. Compute with the rounded numbers.
3. Note the direction of your rounding to decide between two close choices.

### For "must be" questions about integers

1. Test with a small example that fits the condition (odd: 3; even: 4; multiple of 3: 6).
2. Eliminate any choice that fails.
3. If more than one survives, test a second example (odd: 5; or a negative).`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** A printer prints p pages per minute. A report has R pages. Which expression gives the number of minutes needed to print 3 copies of the report?
(A) 3R/p  (B) 3p/R  (C) 3Rp  (D) R/(3p)

**Step 1.** The question asks for an expression, so I will plug in numbers rather than argue in symbols. I pick p = 10 pages per minute and R = 20 pages.

**Step 2.** The story: 3 copies of a 20-page report is 60 pages. At 10 pages per minute, that takes 6 minutes. My target is 6.

**Step 3.** Test each choice with p = 10, R = 20:
- (A) 3(20)/10 = 6. Match.
- (B) 3(10)/20 = 1.5. No.
- (C) 3(20)(10) = 600. No.
- (D) 20/30 ≈ 0.67. No.

**Step 4.** Only (A) matches. **Answer: (A).**

**Reasoning check:** more pages (bigger R) should take longer, so R belongs on top. A faster printer (bigger p) should take less time, so p belongs on the bottom. Only (A) and (D) have that shape, and (D) divides by 3 when printing 3 copies should multiply by 3. The structure alone would have eliminated three choices before any plugging in.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** Which of the following is closest to 2,987 ÷ 0.51?

(A) 60  (B) 600  (C) 6,000  (D) 60,000

Setup done for you:

- The choices differ by factors of 10, so this is an estimation question; exact division would waste a minute.
- Round: 2,987 is about 3,000. 0.51 is about 1/2.
- Dividing by 1/2 is the same as multiplying by 2.

Finish: compute 3,000 × 2 and pick the closest choice.`,
      question: {
        stem: 'Which of the following is closest to 2,987 ÷ 0.51?',
        choices: ['60', '600', '6,000', '60,000'],
        answer: 2,
        explanation: '3,000 ÷ 0.5 = 3,000 × 2 = 6,000. The exact answer (about 5,857) is closest to 6,000. Choice B is the trap for students who treat dividing by 0.51 like dividing by 5; dividing by a number less than 1 makes the result bigger, not smaller.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Computing when the choices say estimate.** Look at the spread of the choices first.
- **Picking the expression that "looks right"** instead of testing it with numbers.
- **Plugging in 0 or 1**, which makes wrong expressions agree with right ones.
- **Testing "must be true" with a single example** when two choices survive. Test a second example, including a negative when integers are allowed to be negative.
- **Forgetting that dividing by a number less than 1 makes things bigger.**
- **Reading a graph question as a computation question.** Often one observation ("the line is steepest between 2 and 3") answers it.
- **Spending three minutes on one QR item.** No item is worth more than another. Mark and move.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'If n is an even integer, which of the following must be odd?',
          choices: ['n + 2', '3n', 'n² + 1', 'n/2'],
          answer: 2,
          explanation: 'Test n = 4: n + 2 = 6 (even), 3n = 12 (even), n² + 1 = 17 (odd), n/2 = 2 (even). Parity reasoning confirms: even squared is even, plus 1 is odd, for every even n. Choice D is the trap because n/2 can be odd (n = 6 gives 3) but does not have to be.'
        },
        {
          stem: 'A store sells notebooks for n dollars each and pens for p dollars each. Which expression gives the total cost of 4 notebooks and 6 pens with a 5-dollar coupon applied?',
          choices: ['4n + 6p + 5', '10(n + p) − 5', '4n + 6p − 5', '24np − 5'],
          answer: 2,
          explanation: 'Plug in n = 2, p = 1: four notebooks cost 8, six pens cost 6, total 14, minus the coupon is 9. Test: (C) 8 + 6 − 5 = 9. (A) gives 19, (B) gives 25, (D) gives 43. Only (C) matches. A coupon reduces cost, so the +5 in (A) is impossible on sight.'
        },
        {
          stem: 'Which of the following is closest to 0.26 × 4,120?',
          choices: ['100', '1,000', '10,000', '100,000'],
          answer: 1,
          explanation: '0.26 is about 1/4, and 4,120 is about 4,000. One quarter of 4,000 is 1,000. The exact product is 1,071.2, closest to 1,000. The factor-of-10 spread in the choices signals that estimating is the intended method.'
        },
        {
          stem: 'A rectangle has a length of L and a width that is 3 less than its length. Which expression represents its perimeter?',
          choices: ['L(L − 3)', '2L − 3', '4L − 6', '4L − 3'],
          answer: 2,
          explanation: 'Width is L − 3. Perimeter = 2L + 2(L − 3) = 4L − 6. Plug in L = 5: width 2, perimeter 2(5) + 2(2) = 14, and 4(5) − 6 = 14. Choice A is the area. Choice D subtracts 3 only once, forgetting there are two widths.'
        },
        {
          stem: 'Which of the following fractions is greatest?',
          choices: ['7/15', '9/17', '11/23', '13/27'],
          answer: 1,
          explanation: 'Benchmark against 1/2: 7/15 is below (half of 15 is 7.5), 9/17 is above (half of 17 is 8.5), 11/23 is below (11.5), 13/27 is below (13.5). Only 9/17 is above 1/2, so it is the greatest. No common denominator needed.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- QR rewards reasoning: ask "what must be true?" before "what is the value?"
- Read the spread of the choices. Far apart means estimate; close together means compute.
- For "which expression" items, plug in small friendly numbers and test every choice, or build the expression from the story and confirm with one plug-in.
- Use parity, sign, size, and units to eliminate choices on sight.
- Dividing by a number less than 1 makes the result bigger. Mark and move when an item resists you.`
    }
  ]
},
{
  id: 'ssat-quant-word-problems',
  test: 'ssat',
  section: 'quant',
  skill: 'word-problems',
  title: 'SSAT Word Problems and the Guessing Decision',
  minutes: 15,
  level: 4,
  objectives: [
    'Set up SSAT multi-step word problems with a defined variable and a governing relationship',
    'Handle the SSAT favorites: averages with a changed member, percent-of-percent, rate with a mid-trip change, and remainders',
    'Apply the SSAT guessing rule: guess when at least one choice is eliminated, otherwise leave blank',
    'Manage 25 questions in 30 minutes with a two-pass approach'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What makes SSAT word problems different',
      md: `### Five choices and a penalty

SSAT Quantitative items have **five** answer choices, and on the Middle and Upper levels a wrong answer costs **one quarter of a point** while a blank costs nothing. This changes two things: the wrong choices are built to be more tempting (there is room for a "stopped too early" answer, a "wrong person" answer, and a "sign error" answer all at once), and you need a rule for when to guess.

### The guessing math

With five choices, a blind guess has a 1/5 chance of +1 and a 4/5 chance of −1/4. Expected value: 1/5 − 1/5 = 0. Blind guessing neither helps nor hurts on average.

Eliminate one choice and the expected value becomes 1/4 − (3/4)(1/4) = +1/16, positive. Eliminate two and it is 1/3 − (2/3)(1/4) = +1/6. **So the rule is: if you can eliminate at least one choice, guess. If you cannot eliminate anything, leave it blank.** In practice you can almost always eliminate one (a negative length, a non-integer count, a number bigger than the total), so most students should answer nearly everything.

### The SSAT favorites

- **Average with a changed member.** "The average of 5 numbers is 20. One number is removed and the average becomes 18. What was removed?" Work with totals: 100 − 72 = 28.
- **Percent of a percent.** "30% of the students are seniors, and 40% of the seniors play a sport." Multiply: 0.3 × 0.4 = 12% of all students.
- **Rate with a change mid-trip.** Two legs with different speeds: compute each leg's distance or time separately, then combine. Average speed is **total distance ÷ total time**, never the average of the two speeds.
- **Remainder problems.** "When n is divided by 7 the remainder is 3." Write n = 7k + 3 and test small values (3, 10, 17).
- **Multi-person sharing.** "Ana has 3 more than twice what Ben has; together they have 33." Define Ben's amount as the variable, because Ana is described in terms of Ben.

### The governing relationship

As in every word problem, the math is one relationship (total = mean × count; distance = rate × time; the pure substance is conserved). Write that relationship down before touching the numbers. Then define the variable **in words**, including which person or quantity it stands for.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Solving

1. **Read the last sentence first.** Write "Find: ___."
2. **Name the type and write its relationship.**
3. **Define the variable in words**, choosing the quantity that others are described in terms of.
4. **Build the equation** from the sentence that links the quantities ("together," "total," "the same," "average").
5. **Solve, then check in the story**, and confirm you are reporting the quantity from step 1.

### Backsolve when the question asks for a number

The five choices are usually in order. Test the middle one; eliminate in the direction the result tells you. Two tests usually finish it.

### Pacing: 25 questions, 30 minutes

- First pass: anything you can set up in 15 seconds, do. Mark the rest.
- Second pass: return to marked items with backsolving and elimination.
- Last two minutes: apply the guessing rule to every marked item. Eliminate one choice, then guess. Cannot eliminate? Leave it blank.

### Deciding whether to guess, fast

Ask three questions about each choice: Is it the wrong sign? Is it the wrong size (bigger than the total, smaller than a part)? Is it the wrong type (fraction for a count)? Each "yes" eliminates a choice and makes guessing profitable.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** A car travels 120 miles at 40 miles per hour, then 120 miles at 60 miles per hour. What is the car's average speed for the whole trip?
(A) 45 mph  (B) 48 mph  (C) 50 mph  (D) 52 mph  (E) 55 mph

**Step 1 (find):** Average speed for the entire trip.

**Step 2 (relationship):** Average speed = total distance ÷ total time. I know the trap is to average 40 and 60 to get 50, so I will not do that; (C) is almost certainly the decoy.

**Step 3 (compute each leg):** Leg 1: 120 ÷ 40 = 3 hours. Leg 2: 120 ÷ 60 = 2 hours. Total time: 5 hours. Total distance: 240 miles.

**Step 4 (combine):** 240 ÷ 5 = **48 mph**. **Answer: (B).**

**Why it is less than 50:** the car spent more time at the slower speed (3 hours vs. 2), so the slow speed gets more weight. Average speed is a time-weighted average.

**The guessing lesson:** even if I had been unsure, I could have eliminated (C) (the naive average is never right when the speeds differ and the distances are equal) and (E) (the average cannot be closer to the faster speed when more time is spent at the slower one). With two eliminated, a guess has positive expected value.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** The average of six test scores is 82. When a seventh score is added, the average becomes 84. What is the seventh score?
(A) 84  (B) 86  (C) 90  (D) 96  (E) 98

Setup done for you:

- **Find:** the seventh score.
- **Relationship:** total = mean × count.
- Total of the six: 82 × 6 = 492.
- Total of the seven: 84 × 7 = 588.

Finish: subtract to find the seventh score. Sanity check: it must be above 84, since adding it raised the average, so (A) is eliminated before you compute.`,
      question: {
        stem: 'The average of six test scores is 82. When a seventh score is added, the average becomes 84. What is the seventh score?',
        choices: ['84', '86', '90', '96', '98'],
        answer: 3,
        explanation: '588 − 492 = 96. Choice A (84) is the new average, not the new score; a score equal to the average would not change it. Choice B (86) is the trap of thinking the score must be 2 above the new mean; in fact it must pull six other scores up by 2 each, so it is 2 × 6 = 12 above 84.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Averaging the speeds.** Average speed is total distance over total time.
- **Adding percents of different wholes.** 30% of students, 40% of those: multiply, giving 12%.
- **Answering for the wrong person.** Five choices leave room for every person's value. Reread "Find."
- **Leaving blanks you could have guessed.** One elimination makes guessing profitable.
- **Guessing blindly on SSAT.** Zero expected value, and it costs time. Eliminate first.
- **Assuming the variable is the answer.** Often the question asks for the other person, the total, or twice the variable.
- **Remainder problems solved with division alone.** Use n = (divisor)(k) + remainder and test values.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'In a school, 60% of the students are girls, and 25% of the girls are in the band. What percent of all students are girls in the band?',
          choices: ['15%', '25%', '35%', '60%', '85%'],
          answer: 0,
          explanation: 'Percent of a percent multiplies: 0.60 × 0.25 = 0.15 = 15%. Choice E adds the percents, which mixes two different wholes. Choice B is the percent of girls, not of all students.'
        },
        {
          stem: 'Nadia has 5 more than three times as many books as Omar. Together they have 45 books. How many books does Nadia have?',
          choices: ['10', '15', '30', '35', '40'],
          answer: 3,
          explanation: 'Let b = Omar. Nadia = 3b + 5. Then b + 3b + 5 = 45, so 4b = 40 and b = 10. Nadia has 3(10) + 5 = 35. Choice A (10) is Omar, the wrong-person trap. Choice C forgets the +5.'
        },
        {
          stem: 'When a positive integer n is divided by 6, the remainder is 4. What is the remainder when 2n is divided by 6?',
          choices: ['0', '1', '2', '4', '8'],
          answer: 2,
          explanation: 'Write n = 6k + 4. Then 2n = 12k + 8 = 12k + 6 + 2 = 6(2k + 1) + 2, so the remainder is 2. Test n = 4: 2n = 8, and 8 ÷ 6 leaves remainder 2. Choice E (8) is bigger than the divisor, so it cannot be a remainder; eliminate it on sight.'
        },
        {
          stem: 'On the SSAT Upper Level, a student has 90 seconds left and three unanswered questions. On one she has eliminated two choices, on another one choice, and on the third none. What should she do?',
          choices: ['Answer all three', 'Answer the first two and leave the third blank', 'Answer only the first', 'Leave all three blank', 'Answer only the third'],
          answer: 1,
          explanation: 'Guessing has positive expected value whenever at least one choice is eliminated (+1/16 with one eliminated, +1/6 with two). With nothing eliminated, the expected value is zero, so a blank is equally good and avoids a possible loss. Answer the first two; leave the third blank.'
        },
        {
          stem: 'A train travels 90 miles in 1.5 hours and then 60 miles in 1.5 hours. What is its average speed for the whole trip?',
          choices: ['40 mph', '45 mph', '50 mph', '55 mph', '60 mph'],
          answer: 2,
          explanation: 'Total distance 150 miles, total time 3 hours, average speed 50 mph. Here the naive average of the two speeds (60 and 40) also gives 50, because the times are equal, not the distances. Average speed equals the average of the speeds only when the time spent at each is the same.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- SSAT Middle and Upper: five choices, −1/4 per wrong answer, 0 for a blank. Guess when you can eliminate at least one choice; otherwise leave it blank.
- Read the last sentence first, write the governing relationship, define the variable in words.
- Average speed = total distance ÷ total time. Percent of a percent multiplies. Averages are total problems.
- Backsolve from the middle choice when the answer is a number.
- Two passes in 30 minutes; apply the guessing rule in the final two minutes.`
    }
  ]
},
{
  id: 'ssat-quant-algebra',
  test: 'ssat',
  section: 'quant',
  skill: 'algebra',
  title: 'SSAT Upper Algebra: Exponents, Radicals, Function Notation, and Sequences',
  minutes: 16,
  level: 4,
  objectives: [
    'Simplify expressions with integer, zero, and negative exponents',
    'Simplify and operate on radicals, including rationalizing a simple denominator',
    'Evaluate and compose functions written in f(x) notation, including made-up symbol operations',
    'Find any term of an arithmetic or geometric sequence from its rule'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Four topics that share one habit: know the definition',
      md: `### Exponents

Every exponent rule comes from "repeated multiplication," so when you forget a rule, expand a small case.

- aᵐ · aⁿ = aᵐ⁺ⁿ. (Multiplying same bases: add.)
- aᵐ ÷ aⁿ = aᵐ⁻ⁿ. (Dividing same bases: subtract.)
- (aᵐ)ⁿ = aᵐⁿ. (Power of a power: multiply.)
- (ab)ⁿ = aⁿbⁿ. (The exponent hits every factor.)
- a⁰ = 1 for a ≠ 0. (Because aⁿ ÷ aⁿ = a⁰ and also = 1.)
- a⁻ⁿ = 1/aⁿ. (Negative exponent means reciprocal; it does not make the number negative.)
- a^(1/2) = √a. (Fractional exponents are roots.)

Different bases do not combine: 2³ · 5² is 8 · 25 = 200, not 10⁵. But you can sometimes rewrite to a common base: 4ˣ = (2²)ˣ = 2²ˣ, so 4ˣ = 2⁶ means 2x = 6 and x = 3.

### Radicals

√a · √b = √(ab) and √a ÷ √b = √(a/b), but **√a + √b is not √(a + b)**. Simplify by extracting perfect squares: √48 = √(16 · 3) = 4√3. Like radicals add like like terms: 2√3 + 5√3 = 7√3. To remove a radical from a denominator, multiply top and bottom by that radical: 6/√2 = 6√2/2 = 3√2.

### Function notation

f(x) = 3x − 2 is a machine: feed in x, get out 3x − 2. **f(4)** means "feed in 4": 3(4) − 2 = 10. **f(a + 1)** means feed in a + 1: 3(a + 1) − 2 = 3a + 1. **f(g(x))** means feed g's output into f: evaluate the inside first.

The SSAT loves **made-up operations**: "For all numbers a and b, let a ★ b = a² − 2b. What is 5 ★ 3?" The symbol is just a function with two inputs. Substitute carefully in order: 5² − 2(3) = 19.

### Sequences

An **arithmetic** sequence adds the same number d each step. The nth term is a₁ + (n − 1)d. For 7, 11, 15, ..., the 20th term is 7 + 19(4) = 83.

A **geometric** sequence multiplies by the same number r each step. The nth term is a₁ · rⁿ⁻¹. For 3, 6, 12, ..., the 8th term is 3 · 2⁷ = 384.

The sum of an arithmetic sequence is (number of terms) × (first + last) ÷ 2, because pairing the first with the last, second with second-to-last, and so on gives equal pairs.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Exponent simplification

1. Separate coefficients from variables.
2. For each base, apply one rule at a time: combine products (add), quotients (subtract), powers (multiply).
3. Convert negative exponents to reciprocals at the end, and write the result with positive exponents.
4. For equations like 4ˣ = 2⁶, rewrite both sides with the same base and set the exponents equal.

### Radicals

1. Factor out the largest perfect square.
2. Combine like radicals only.
3. Rationalize a denominator by multiplying top and bottom by the radical.

### Function notation and made-up operations

1. Write the definition. Underline each input slot.
2. Substitute the given values **with parentheses**.
3. Follow the order of operations. For nested functions, work inside out.

### Sequences

1. Identify arithmetic (constant difference) or geometric (constant ratio).
2. Write the nth-term formula with the specific a₁ and d or r.
3. Substitute n. Remember the exponent or multiplier is n − 1, not n.
4. For a sum of an arithmetic sequence, find the last term, then use count × (first + last) ÷ 2.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** If f(x) = x² − 3x and g(x) = 2x + 1, what is f(g(2))?

**Step 1.** The question asks for a nested function value. I know I must evaluate the inside function first, because g(2) is the input to f.

**Step 2.** g(2) = 2(2) + 1 = 5.

**Step 3.** Now f(5). I substitute 5 for every x in f: f(5) = 5² − 3(5) = 25 − 15 = 10.

**Answer: 10.**

**Common wrong paths:** computing g(f(2)) instead (f(2) = 4 − 6 = −2, then g(−2) = −3), which is a different composition; or multiplying f(2) × g(2) = (−2)(5) = −10. The notation f(g(2)) means "f of the result of g," not a product and not the other order.

**A second quick one:** if a ◆ b = (a + b)/(a − b), what is 7 ◆ 3? Substitute in order: (7 + 3)/(7 − 3) = 10/4 = 5/2. Note that 3 ◆ 7 = 10/(−4) = −5/2, so order matters for made-up operations unless the definition happens to be symmetric.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** The first term of an arithmetic sequence is 5 and the fourth term is 23. What is the 15th term?

Setup done for you:

- From the 1st term to the 4th term is 3 steps. The sequence rose 23 − 5 = 18 over 3 steps, so the common difference is d = 18 ÷ 3 = 6.
- The nth term is a₁ + (n − 1)d = 5 + (n − 1)(6).

Finish: substitute n = 15. Remember to use n − 1 = 14 steps, not 15.`,
      question: {
        stem: 'An arithmetic sequence has first term 5 and fourth term 23. What is the 15th term?',
        choices: ['83', '89', '95', '101', '107'],
        answer: 1,
        explanation: 'd = 6, so the 15th term is 5 + 14(6) = 5 + 84 = 89. Choice C (95) uses 15 steps instead of 14. Choice A (83) uses 13 steps. The number of steps from term 1 to term n is always n − 1.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Negative exponent makes a negative number.** No: 2⁻³ = 1/8, positive.
- **(x + y)² = x² + y².** No: it is x² + 2xy + y². Expand a small case to see.
- **√(a + b) = √a + √b.** No. √(9 + 16) = 5, not 7.
- **Adding exponents with different bases.** 2³ · 3² is 72, not 6⁵.
- **f(g(x)) vs. g(f(x)).** Inside first. Order matters.
- **f(x + 1) = f(x) + 1.** No: substitute x + 1 for every x.
- **Made-up operation substituted backward.** a ★ b is not b ★ a unless the definition is symmetric.
- **Using n instead of n − 1** in sequence formulas.
- **x² = 25 has one solution.** It has two: 5 and −5.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Simplify (3x²y)³ ÷ (9x⁴y).',
          choices: ['3x²y²', '3x²y³', '27x²y²', 'x²y²/3', '3xy²'],
          answer: 0,
          explanation: 'Cube every factor: 27x⁶y³. Divide by 9x⁴y: 27/9 = 3, x⁶/x⁴ = x², y³/y = y². Result 3x²y². Choice C forgets to divide the coefficient; choice B forgets to subtract the y exponent.'
        },
        {
          stem: 'If 8ˣ = 2¹², what is x?',
          choices: ['1.5', '3', '4', '6', '9'],
          answer: 2,
          explanation: 'Rewrite with base 2: 8ˣ = (2³)ˣ = 2³ˣ. So 3x = 12 and x = 4. Choice D (6) divides 12 by 2 instead of 3; choice A divides 12 by 8. Matching bases is the whole technique.'
        },
        {
          stem: 'What is √50 + √18?',
          choices: ['√68', '2√17', '8√2', '34', '15√2'],
          answer: 2,
          explanation: 'Simplify each: √50 = 5√2 and √18 = 3√2. Like radicals add: 8√2. Choice A adds under the root, which is never allowed. Choice E multiplies the coefficients.'
        },
        {
          stem: 'For all numbers a and b, let a ▲ b = 2a − b². What is 4 ▲ (−3)?',
          choices: ['−1', '1', '2', '14', '17'],
          answer: 0,
          explanation: 'Substitute with parentheses: 2(4) − (−3)² = 8 − 9 = −1. Choice E (17) treats (−3)² as −9 and then subtracts a negative. Choice D (14) treats b² as 2b. Square the second input before subtracting, and keep the inputs in the order written.'
        },
        {
          stem: 'The third term of a geometric sequence is 12 and the fourth term is 36. What is the first term?',
          choices: ['1/3', '4/3', '4', '3', '2'],
          answer: 1,
          explanation: 'The ratio is 36 ÷ 12 = 3. Going backward divides: second term 12 ÷ 3 = 4, first term 4 ÷ 3 = 4/3. Choice C (4) is the second term. Choice D (3) is the ratio, not a term.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Exponent rules come from repeated multiplication: add when multiplying same bases, subtract when dividing, multiply for a power of a power. Negative exponents mean reciprocals. Match bases to solve exponential equations.
- Radicals: extract perfect squares, add only like radicals, never split a root over a sum.
- Function notation means substitute; nested functions work inside out; made-up symbols are functions with inputs in a fixed order.
- Arithmetic nth term: a₁ + (n − 1)d. Geometric nth term: a₁ · rⁿ⁻¹. The step count is n − 1.`
    }
  ]
},
{
  id: 'ssat-quant-geometry',
  test: 'ssat',
  section: 'quant',
  skill: 'geometry',
  title: 'SSAT Upper Geometry: Coordinates, Slopes, Transformations, and 3D Figures',
  minutes: 16,
  level: 4,
  objectives: [
    'Write and interpret the equation of a line in slope-intercept form; recognize parallel and perpendicular slopes',
    'Perform translations, reflections, and rotations on the coordinate plane',
    'Compute volume and surface area of prisms, cylinders, cones, spheres, and pyramids',
    'Match a net to its 3D solid and count faces, edges, and vertices'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Lines, moves, and solids',
      md: `### The equation of a line

y = mx + b describes every non-vertical line. **m** is the slope (rise over run), and **b** is the y-intercept (where the line crosses the y-axis, at the point (0, b)).

- Slope between two points: m = (y₂ − y₁)/(x₂ − x₁).
- **Parallel** lines have the **same** slope.
- **Perpendicular** lines have slopes that are **negative reciprocals**: if one is 2/3, the other is −3/2. (Their product is −1.)
- Horizontal lines: y = (number), slope 0. Vertical lines: x = (number), slope undefined.
- To find where a line crosses the x-axis, set y = 0 and solve.

To write the equation from two points, find m first, then substitute one point to find b.

### Transformations

- **Translation** (slide): add the same amount to every x and every y. (x, y) → (x + 3, y − 2) moves right 3, down 2.
- **Reflection** over the x-axis: (x, y) → (x, −y). Over the y-axis: (x, y) → (−x, y). Over the line y = x: (x, y) → (y, x).
- **Rotation** of 90° counterclockwise about the origin: (x, y) → (−y, x). 180°: (x, y) → (−x, −y). 90° clockwise: (x, y) → (y, −x).
- **Dilation** by factor k from the origin: (x, y) → (kx, ky). Lengths scale by k, areas by k².

Translations, reflections, and rotations keep size and shape (they are **congruence** transformations). Dilations keep shape only (**similarity**).

### 3D figures

- **Prism or cylinder**: V = (base area) × height. Surface area = 2(base area) + (perimeter of base) × height.
- **Pyramid or cone**: V = (1/3)(base area) × height. A cone's base area is πr².
- **Sphere**: V = (4/3)πr³, surface area 4πr².
- **Cube** with edge s: V = s³, surface area 6s², and the diagonal through the cube is s√3.
- **Rectangular box** diagonal: √(l² + w² + h²), the Pythagorean theorem applied twice.

### Nets and counting

A **net** is a solid unfolded flat. A cube's net has 6 squares; a cylinder's net is 2 circles and a rectangle whose width is the circumference 2πr. For any convex solid, **faces + vertices − edges = 2** (Euler's formula), which lets you check a count. A cube: 6 + 8 − 12 = 2.`
    },
    {
      type: 'strategy',
      title: 'The method',
      md: `### Lines

1. Get the equation into y = mx + b (solve for y if needed).
2. Read m and b. For a parallel line keep m; for a perpendicular line flip and negate m.
3. For a line through a given point, substitute the point to find b.
4. Intercepts: x-intercept at y = 0, y-intercept at x = 0.

### Transformations

1. Write the rule for the transformation as a coordinate mapping.
2. Apply it to each vertex.
3. Sketch to confirm the image is where it should be (a reflection over the x-axis flips the figure below the axis, for instance).

### Solids

1. Identify the solid and whether the question wants volume or surface area.
2. Write the formula. Note whether a 1/3 is involved (pyramids and cones).
3. Use the radius, not the diameter. Use the perpendicular height, not the slant height, for volume.
4. Keep π symbolic if the choices contain π.

### Nets

1. Count the faces in the net and their shapes.
2. Match the count and shapes to a solid: 6 squares is a cube; 2 triangles and 3 rectangles is a triangular prism; 1 square and 4 triangles is a square pyramid.
3. Check with faces + vertices − edges = 2 if the question counts edges or vertices.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Problem:** What is the equation of the line perpendicular to 2x + 3y = 6 that passes through the point (4, 1)?

**Step 1.** The question asks for a line equation. I know I need a slope and a point. The point is given; the slope comes from the perpendicular condition.

**Step 2.** Find the slope of the given line by solving for y: 3y = −2x + 6, so y = (−2/3)x + 2. Its slope is −2/3.

**Step 3.** A perpendicular slope is the negative reciprocal: flip −2/3 to −3/2, then negate to get **3/2**. Check: (−2/3)(3/2) = −1. Good.

**Step 4.** Use y = mx + b with m = 3/2 and the point (4, 1): 1 = (3/2)(4) + b, so 1 = 6 + b and b = −5.

**Answer: y = (3/2)x − 5.**

**Check:** does (4, 1) satisfy it? (3/2)(4) − 5 = 6 − 5 = 1. Yes.

**Trap on this problem:** reading the slope as 2 or −2 from the original equation without solving for y, or taking the reciprocal without negating, which gives −3/2 instead of 3/2. Always do both: flip and change sign.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Problem:** A cone has a radius of 3 cm and a height of 8 cm. What is its volume?

Setup done for you:

- A cone is one-third of the cylinder with the same base and height, so V = (1/3)πr²h.
- Base area: π(3²) = 9π.
- Height is 8 (the perpendicular height is given directly, so there is no slant-height conversion).

Finish: multiply 9π by 8 and take one-third. Leave the answer in terms of π.`,
      question: {
        stem: 'A cone has a radius of 3 cm and a height of 8 cm. What is its volume?',
        choices: ['8π cm³', '24π cm³', '36π cm³', '72π cm³', '216π cm³'],
        answer: 1,
        explanation: '(1/3)(9π)(8) = 72π/3 = 24π cm³. Choice D (72π) is the volume of the matching cylinder; the 1/3 was skipped. Choice A uses r instead of r². Choice E uses the diameter squared.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Reading the slope off ax + by = c without solving for y.** The slope is −a/b, not a or b.
- **Perpendicular slope: flipping without negating** (or negating without flipping). Do both.
- **Reflection over the wrong axis.** Over the x-axis, the **y** changes sign. Over the y-axis, the **x** changes sign.
- **Rotation direction.** Counterclockwise is the default; 90° counterclockwise sends (x, y) to (−y, x).
- **Forgetting the 1/3** for cones and pyramids.
- **Slant height in a volume formula.** Volume uses perpendicular height. Slant height is for lateral surface area.
- **Doubling the radius doubles the volume?** No: a sphere's volume scales by 2³ = 8.
- **Counting a net's faces wrong.** Lay them out: a triangular prism has 5 faces, not 6.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Which of the following is the equation of a line parallel to y = −4x + 7 that passes through (1, 2)?',
          choices: ['y = −4x + 6', 'y = −4x + 2', 'y = 4x − 2', 'y = (1/4)x + 7/4', 'y = −4x − 6'],
          answer: 0,
          explanation: 'Parallel lines share the slope −4. Substitute (1, 2): 2 = −4(1) + b, so b = 6. Choice D is the perpendicular line. Choice B keeps the slope but uses the y-coordinate as the intercept without solving.'
        },
        {
          stem: 'The point (−3, 5) is reflected over the y-axis and then translated 2 units down. What are the coordinates of the final image?',
          choices: ['(3, 3)', '(−3, 3)', '(3, 7)', '(−3, −5)', '(5, −5)'],
          answer: 0,
          explanation: 'Reflecting over the y-axis changes the sign of x: (3, 5). Translating down 2 subtracts from y: (3, 3). Choice B reflects over the wrong axis (keeps x). Choice D reflects over the x-axis and skips the translation.'
        },
        {
          stem: 'A rectangular box has dimensions 3, 4, and 12. What is the length of the longest diagonal inside the box?',
          choices: ['5', '12', '13', '15', '19'],
          answer: 2,
          explanation: 'The space diagonal is √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13. Choice A (5) is only the diagonal of the 3-by-4 face; the second application of the Pythagorean theorem gives √(5² + 12²) = 13. Choice E adds the dimensions.'
        },
        {
          stem: 'A sphere has a radius of 3. What is its volume?',
          choices: ['12π', '27π', '36π', '108π', '324π'],
          answer: 2,
          explanation: 'V = (4/3)πr³ = (4/3)π(27) = 36π. Choice B (27π) drops the 4/3. Choice A (12π) uses r instead of r³. Choice D (108π) multiplies by 4 but forgets to divide by 3. Cube the radius first, then apply the 4/3.'
        },
        {
          stem: 'A net consists of one square and four congruent triangles attached to its sides. How many edges does the solid formed from this net have?',
          choices: ['5', '6', '8', '9', '12'],
          answer: 2,
          explanation: 'The net folds into a square pyramid: 5 faces (1 square, 4 triangles) and 5 vertices (4 base corners plus the apex). Euler: F + V − E = 2 gives 5 + 5 − E = 2, so E = 8. Direct count agrees: 4 base edges plus 4 edges rising to the apex. Choice E is the edge count of a cube.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- y = mx + b: m is the slope, b the y-intercept. Solve for y before reading the slope. Parallel: same slope. Perpendicular: flip and negate.
- Transformations as coordinate rules: translate by adding; reflect over the x-axis by negating y and over the y-axis by negating x; rotate 90° counterclockwise by (x, y) → (−y, x).
- Prisms and cylinders: base × height. Cones and pyramids: one-third of that. Sphere: (4/3)πr³. Box diagonal: √(l² + w² + h²).
- A net's face count and shapes identify the solid; check edge and vertex counts with F + V − E = 2.`
    }
  ]
}
];

module.exports = { lessons };
