// Verbal, reading, language, and writing lessons for HSPT, SSAT, and ISEE.
// See content/SCHEMA.md for the Lesson object.
const lessons = [];

// ---------------------------------------------------------------- HSPT 1
lessons.push({
  id: 'hspt-verbal-synonyms',
  test: 'hspt',
  section: 'verbal',
  skill: 'synonyms',
  title: 'Synonyms and Antonyms: Charge, Parts, and the Sentence Test',
  minutes: 14,
  level: 3,
  objectives: [
    'Read the direction line and know whether the item wants the same meaning or the opposite',
    'Label a word as positive, negative, or neutral before looking at choices',
    'Break an unfamiliar word into prefix, root, and suffix to recover its meaning',
    'Use the "put it in a sentence" test and elimination to choose with confidence'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What the HSPT is really asking',
      md: `The HSPT Verbal Skills section mixes two item types that look almost identical:

- **Synonym:** "Serene most nearly means..." (pick the word with the *same* meaning)
- **Antonym:** "Scarce means the *opposite* of..." (pick the word with the *reverse* meaning)

Students lose easy points by answering the wrong question. The direction line is part of the item. Read it every time.

### The underlying idea
You do not need a dictionary definition to answer. You need two things:

1. **The word's charge** (positive, negative, or neutral) and
2. **Its rough neighborhood** (what kind of thing it describes).

Most wrong choices fail on charge or neighborhood before you ever need precision. *Serene* is calm and pleasant, so a choice like "furious" is out on charge, and "enormous" is out on neighborhood (it describes size, not mood).`
    },
    {
      type: 'strategy',
      title: 'The 5-step method',
      md: `1. **Circle the task.** Same meaning or opposite? Write "S" or "O" next to the item.
2. **Charge the word.** Mark it + , − , or 0 before looking at the choices. Gut feeling counts: *gloomy* feels −, *jubilant* feels +.
3. **Take it apart.** Look for a prefix (un-, dis-, mal-, bene-), a root (bene = good, mal = bad, chron = time), or a suffix (-less = without, -ful = full of). *Malodorous* = mal (bad) + odor (smell) = smelling bad.
4. **Put it in a sentence.** Say a quick sentence you have actually heard: "The *serene* lake at dawn." Then swap each choice into the same sentence. The one that keeps the meaning wins.
5. **Eliminate, then choose.** Cross out choices with the wrong charge or neighborhood. If two remain, pick the one closest in *strength* to the original.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** *Benevolent* most nearly means
A. wealthy   B. kind   C. nervous   D. ancient

**Step 1.** "Most nearly means" tells me this is a synonym item. I write S.

**Step 2.** I notice *benevolent* feels positive. I have heard "a benevolent king." Kings in stories who are benevolent are the good ones. Charge: +.

**Step 3.** I see *bene-* at the front. *Benefit* and *beneficial* both mean something good, so *bene* = good. *Vol* shows up in *volunteer*, someone who *wants* to help. So benevolent is roughly "wanting good for others."

**Step 4.** Sentence: "The benevolent king gave bread to the poor." Swap in the choices:
- "The *wealthy* king gave bread..." That works grammatically, but wealthy is about money, not goodwill. A wealthy king could be cruel.
- "The *kind* king gave bread..." This keeps the meaning.
- "The *nervous* king..." Wrong charge and wrong neighborhood.
- "The *ancient* king..." Neighborhood is age, not character.

**Step 5.** Only B survives. **Answer: B.**

Notice the trap: *wealthy* is the one wrong choice that *feels* royal. It plays on the story context instead of the word's meaning.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** *Candid* means the **opposite** of
A. honest   B. secretive   C. cheerful   D. careful

The first three steps are done for you:

**Step 1.** "Opposite of" means this is an antonym item. We want the word that *reverses* candid.
**Step 2.** *Candid* describes someone who says exactly what they think. A "candid photo" is one taken without posing. Charge: + (open, frank).
**Step 3.** From Latin *candidus*, "white, pure." Nothing hidden.

Now you finish: write a sentence with *candid*, decide what the reverse of "open and frank" is, and watch for the choice that is the *synonym* planted as bait.`,
      question: {
        stem: 'Candid means the opposite of',
        choices: ['honest', 'secretive', 'cheerful', 'careful'],
        answer: 1,
        explanation: 'Candid means frank and open, so its opposite is secretive (hiding one\'s thoughts). The trap is "honest," which is a synonym of candid; it is planted for students who forgot the direction line says "opposite." "Cheerful" and "careful" are in the wrong neighborhood entirely.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Direction-line flip.** The single biggest point-loser. Synonym items and antonym items are shuffled together. Mark S or O before reading choices.
- **The planted synonym on antonym items** (and the planted antonym on synonym items). The test always includes the exact reverse of what you want. If a choice feels like a perfect match, double-check the direction line.
- **Right neighborhood, wrong strength.** *Furious* is not "annoyed." If two choices survive, match the intensity.
- **Looks-alike words.** *Ingenious* (clever) is not *ingenuous* (innocent). *Eminent* (famous) is not *imminent* (about to happen). Read every letter.
- **Context from a story you remember.** A benevolent king is often also wealthy; that does not make *wealthy* the meaning.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Lethargic most nearly means',
          choices: ['energetic', 'sluggish', 'furious', 'careful'],
          answer: 1,
          explanation: 'Lethargic means lacking energy or slow-moving, so sluggish is the match. "Energetic" is the antonym planted as bait for students who misread the direction line. "Furious" has a negative charge but the wrong neighborhood (anger, not energy).'
        },
        {
          stem: 'Frugal means the opposite of',
          choices: ['thrifty', 'wasteful', 'cheerful', 'honest'],
          answer: 1,
          explanation: 'Frugal means careful with money, so the opposite is wasteful. "Thrifty" is a synonym placed to catch students who did not notice "opposite of." "Cheerful" and "honest" describe other traits entirely.'
        },
        {
          stem: 'Malicious most nearly means',
          choices: ['kind', 'spiteful', 'enormous', 'rapid'],
          answer: 1,
          explanation: 'The prefix mal- means bad (malfunction, malnourished), so malicious means intending harm: spiteful. "Kind" is the antonym trap. "Enormous" and "rapid" are the wrong neighborhood (size and speed, not intent).'
        },
        {
          stem: 'Jubilant means the opposite of',
          choices: ['joyful', 'miserable', 'wealthy', 'ancient'],
          answer: 1,
          explanation: 'Jubilant means extremely happy, so the opposite is miserable. "Joyful" is the synonym bait on an antonym item. Sentence test: "The jubilant fans cheered" reverses to "The miserable fans groaned," which confirms the choice.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Read the direction line first: **same** or **opposite**. Mark it.
- Charge the word (+ / − / 0), then find its neighborhood.
- Break the word into prefix + root + suffix when it is unfamiliar.
- Put the word in a sentence you have heard, then swap in each choice.
- Eliminate on charge and neighborhood; break ties on strength.
- The exact reverse of the answer is almost always one of the choices. Expect it.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 2
lessons.push({
  id: 'hspt-verbal-analogies',
  test: 'hspt',
  section: 'verbal',
  skill: 'analogies',
  title: 'Analogies: Build the Bridge Sentence',
  minutes: 15,
  level: 3,
  objectives: [
    'Write a precise bridge sentence that states how the first two words relate',
    'Recognize the ten relationship types the HSPT uses',
    'Flip the bridge when the first word of the pair is the answer slot',
    'Tighten a bridge that lets more than one choice through'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What an analogy really tests',
      md: `An HSPT analogy reads: "*Glove* is to *hand* as *sock* is to ___." It is not asking whether you know what a glove is. It is asking you to name the **relationship** between the first two words and then find a second pair with the **same relationship**.

### The underlying idea
Every analogy hides a sentence. For *glove : hand*, the sentence is "A glove is worn on a hand." Once that sentence exists, the answer is just the word that fits the blank: "A sock is worn on a ___." Foot.

Students who stare at the words and ask "which one feels like sock?" guess. Students who write the sentence know.

The sentence must be **specific**. "A glove goes with a hand" is too loose: a ring also goes with a hand. "A glove is worn on a hand" is precise enough that only one answer fits.`
    },
    {
      type: 'concept',
      title: 'The 10 relationship types',
      md: `Nearly every HSPT analogy uses one of these bridges. Learn the names so you can spot them fast.

1. **Part / whole** — *petal : flower* ("A petal is part of a flower.")
2. **Degree** — *warm : scorching* ("Scorching is a much stronger warm.")
3. **Function** — *scissors : cut* ("Scissors are used to cut.")
4. **Category / member** — *oak : tree* ("An oak is a kind of tree.")
5. **Cause / effect** — *virus : illness* ("A virus causes illness.")
6. **Antonym** — *generous : stingy* ("Generous is the opposite of stingy.")
7. **Synonym** — *brave : courageous* ("Brave means the same as courageous.")
8. **Worker / tool** — *carpenter : hammer* ("A carpenter works with a hammer.")
9. **Characteristic** — *lemon : sour* ("A lemon is by nature sour.")
10. **Sequence** — *breakfast : lunch* ("Breakfast comes just before lunch.")

Some items mix two of these (worker : workplace, object : material). The bridge sentence still works; name the relationship in your own words if it is not on the list.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Write the bridge.** Make a short sentence using the first two words, in order. Start with "A ___ is..." or "A ___ is used to..." Keep it specific.
2. **Name the type.** Part/whole? Degree? Naming it stops you from drifting to a loose connection.
3. **Plug in each choice.** Read your bridge with the third word and the choice in the same slots. Cross out anything that does not fit *exactly*.
4. **If two choices fit, tighten the bridge.** Add a detail: "worn on," "stronger than," "part of the outside of." Re-test. If none fit, your bridge is wrong; rewrite it and try again.

**Keep the order.** If the first pair is *small thing : big thing*, the answer pair must also be *small : big*. Reversing order is a wrong answer, not a near miss.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** *Drizzle* is to *downpour* as *breeze* is to
A. wind   B. gale   C. calm   D. weather

**Step 1.** I write the bridge: "A drizzle is a light rain; a downpour is a very heavy rain." Shorter: "A downpour is a much stronger drizzle."

**Step 2.** I name it: **degree**. Same thing, bigger intensity.

**Step 3.** I plug in: "A ___ is a much stronger breeze."
- *Wind*: a wind is stronger than a breeze, but only a little. It is the general word, not the extreme. I keep it for now, suspiciously.
- *Gale*: a gale is a very strong wind. That is a much stronger breeze. Fits.
- *Calm*: that is the opposite, not a stronger version. Out.
- *Weather*: a breeze is a kind of weather. That is category, not degree. Out.

**Step 4.** Two survived: *wind* and *gale*. I tighten. "A downpour is the *extreme* version of a drizzle." Is wind the extreme version of a breeze? No, gale is. **Answer: B.**

I notice the trap: *weather* tempts anyone who switched from degree to category halfway through. Naming the type in Step 2 protects you.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** *Sculptor* is to *chisel* as *surgeon* is to
A. hospital   B. patient   C. scalpel   D. medicine

**Step 1.** Bridge: "A sculptor uses a chisel as the tool of the trade."
**Step 2.** Type: **worker / tool**.

Now you finish: plug each choice into "A surgeon uses a ___ as the tool of the trade." Two choices are *connected* to surgeons but are not tools. Cross them out and choose.`,
      question: {
        stem: 'Sculptor is to chisel as surgeon is to',
        choices: ['hospital', 'patient', 'scalpel', 'medicine'],
        answer: 2,
        explanation: 'The bridge is worker : tool. A sculptor cuts with a chisel; a surgeon cuts with a scalpel. "Hospital" is the workplace and "patient" is the person worked on; both are related to surgeons but are not tools, which is the classic loose-bridge trap. "Medicine" is something a surgeon may give, not an instrument held and used.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **The loose bridge.** "Goes with" or "is related to" lets two or three choices through. If more than one choice fits, your bridge is the problem, not the choices.
- **Reversed order.** *Petal : flower* (part : whole) is not matched by *tree : branch* (whole : part). Check direction every time.
- **Same-topic distractor.** Choices that live in the same world as the third word (surgeon → hospital, patient) are placed to reward association instead of relationship.
- **Switching types mid-problem.** You start with degree, see a category word, and drift. Name the type and stay with it.
- **Multiple meanings.** *Bark : tree* uses the noun; *bark : dog* uses the verb. If no bridge works, try the word's other meaning.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Petal is to flower as',
          choices: ['tree is to forest', 'page is to book', 'river is to water', 'ocean is to wave'],
          answer: 1,
          explanation: 'The bridge is part : whole ("A petal is one part of a flower"). A page is one part of a book, in the same order. "Ocean is to wave" is whole : part, the reversed-order trap. "Tree is to forest" is member : group, which is close but a forest is a collection rather than a single object with parts.'
        },
        {
          stem: 'Annoyed is to furious as',
          choices: ['happy is to sad', 'damp is to soaked', 'cold is to ice', 'tired is to sleep'],
          answer: 1,
          explanation: 'The bridge is degree: furious is a much stronger annoyed. Soaked is a much stronger damp. "Happy is to sad" is antonym, "cold is to ice" is characteristic, and "tired is to sleep" is cause/effect; none matches the degree relationship.'
        },
        {
          stem: 'Thermometer is to temperature as',
          choices: ['clock is to time', 'doctor is to fever', 'ruler is to wood', 'heat is to sun'],
          answer: 0,
          explanation: 'The bridge is function: a thermometer is used to measure temperature. A clock is used to measure time. "Ruler is to wood" is tempting because a ruler measures, but it does not measure wood; it measures length. The bridge must fit exactly.'
        },
        {
          stem: 'Hammer is to carpenter as',
          choices: ['brush is to painter', 'nail is to wood', 'kitchen is to chef', 'violin is to music'],
          answer: 0,
          explanation: 'The bridge is tool : worker ("A hammer is the tool a carpenter uses"). A brush is the tool a painter uses, in the same order. "Kitchen is to chef" is workplace : worker, the same-topic distractor. "Nail is to wood" and "violin is to music" are not tool : worker at all.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- An analogy hides a sentence. Write it: "A ___ is ___ a ___."
- Name the relationship type (part/whole, degree, function, category, cause/effect, antonym, synonym, worker/tool, characteristic, sequence).
- Plug every choice into the same sentence in the same order.
- Two fit? Tighten the bridge. None fit? Rewrite the bridge.
- Same-topic words are bait. Relationship beats association.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 3
lessons.push({
  id: 'hspt-verbal-logic',
  test: 'hspt',
  section: 'verbal',
  skill: 'logic',
  title: 'Logic: Diagram the Chain, Respect the Gap',
  minutes: 12,
  level: 3,
  objectives: [
    'Translate comparison statements into a single inequality chain',
    'Decide whether a third statement is true, false, or uncertain using only the given facts',
    'Recognize when two items are not linked and the answer must be "uncertain"',
    'Apply transitivity correctly and avoid reversing it'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What the HSPT logic item asks',
      md: `A logic item gives three statements and asks: "If the first two statements are true, the third is (A) true, (B) false, (C) uncertain."

Example: *Maria is taller than Jon. Jon is taller than Kim. Maria is taller than Kim.*

### The underlying idea
You are being tested on one rule, **transitivity**: if A > B and B > C, then A > C. The chain passes through the middle item.

Everything else in the item is designed to break that chain. The test gives you a pair that is *not* connected, or reverses the order of the words, or uses "not" so that the direction is hidden. The three answer choices mean exactly this:

- **True:** the facts *force* the third statement to be correct.
- **False:** the facts *force* it to be wrong.
- **Uncertain:** the facts leave it open. It *could* be true. That is not enough.

"Uncertain" is the correct answer far more often than students pick it. Your gut wants to resolve every question. The test rewards admitting what you do not know.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Shorten the names.** M, J, K. Write them in the margin.
2. **Turn each of the first two statements into an inequality.** "Maria is taller than Jon" → M > J. Use the same symbol for the same quality (taller, older, faster, more expensive) throughout the item. If a statement says "shorter," flip it: "Jon is shorter than Kim" → K > J.
3. **Link the chain.** If the two inequalities share a letter, join them: M > J and J > K become M > J > K. If they do not share a letter in a way that connects, you have two separate facts and no chain.
4. **Read the third statement off the chain.**
   - It matches the chain's order → **true**.
   - It contradicts the chain's order → **false**.
   - It compares two letters the chain does not place relative to each other → **uncertain**.

Write the chain down. Doing this in your head is how careful students miss easy items.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** The red box is heavier than the blue box. The green box is lighter than the blue box. The red box is heavier than the green box. If the first two statements are true, the third is
A. true   B. false   C. uncertain

**Step 1.** R, B, G.

**Step 2.** "Red is heavier than blue" → R > B. "Green is lighter than blue." I notice *lighter* is the reverse quality, so I flip it so the symbol still means "heavier": B > G.

**Step 3.** Both inequalities contain B. I link them: R > B > G.

**Step 4.** The third statement says "Red is heavier than green": R > G. I look at my chain. R is at the top, G at the bottom. Transitivity gives R > G directly. **Answer: A, true.**

Now the same item with one change: suppose the third statement were "The green box is heavier than the red box." That is G > R, which contradicts R > G. That would be **false**.

And suppose the second statement had said "The green box is lighter than the *yellow* box." Then I would have R > B and Y > G, two chains with no shared letter. Nothing connects R to G. The third statement would be **uncertain**, even though it feels likely.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** Pine Street is longer than Oak Street. Elm Street is longer than Oak Street. Pine Street is longer than Elm Street. If the first two statements are true, the third is

**Step 1.** P, O, E.
**Step 2.** Statement 1 → P > O. Statement 2 → E > O.
**Step 3.** Both contain O, but look at *where* O sits. In both facts O is at the bottom. Try to write a single chain with P, O, and E and notice what you cannot determine.

Now you finish Step 4.`,
      question: {
        stem: 'Pine Street is longer than Oak Street. Elm Street is longer than Oak Street. Pine Street is longer than Elm Street. If the first two statements are true, the third is',
        choices: ['true', 'false', 'uncertain'],
        answer: 2,
        explanation: 'Both facts put Oak at the bottom (P > O and E > O), but nothing compares Pine with Elm. Pine could be longer, shorter, or equal. The chain is a "V" with Oak at the point, not a straight line, so the third statement is uncertain. The trap is assuming the first-mentioned street is the longest.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **The shared-bottom (or shared-top) trap.** A > C and B > C tells you nothing about A versus B. If the shared letter is at the same end of both inequalities, the other two are unlinked.
- **Picking "false" when you mean "uncertain."** False means the facts *prove* the statement wrong. If you simply cannot tell, it is uncertain.
- **Reversed wording.** "Shorter than," "less than," "younger than," "not as fast as" flip the direction. Convert everything to one symbol.
- **"Not" statements.** "Kim is not taller than Jon" allows Kim to be shorter *or the same height*. Unless the item rules out ties, do not assume one.
- **Outside knowledge.** You may know Pine Street is long in your town. Only the given facts count.
- **The extra statement.** Some items add a fourth fact that is irrelevant. Diagram all of it; use only what links.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Ava is older than Ben. Ben is older than Cole. Cole is older than Ava. If the first two statements are true, the third is',
          choices: ['true', 'false', 'uncertain'],
          answer: 1,
          explanation: 'The chain is A > B > C, so Ava is older than Cole by transitivity. The third statement claims the reverse (C > A), which the facts contradict directly, so it is false. "Uncertain" would be wrong here because the facts settle the question.'
        },
        {
          stem: 'The blue train is faster than the red train. The yellow train is slower than the red train. The blue train is faster than the yellow train. If the first two statements are true, the third is',
          choices: ['true', 'false', 'uncertain'],
          answer: 0,
          explanation: 'Statement 1: B > R. Statement 2 uses "slower," so flip it: R > Y. Linking gives B > R > Y, and the third statement B > Y matches the chain. True. The trap is failing to flip "slower" and reading the second fact as Y > R.'
        },
        {
          stem: 'Lake Hollow is deeper than Lake Marsh. Lake Hollow is deeper than Lake Vale. Lake Vale is deeper than Lake Marsh. If the first two statements are true, the third is',
          choices: ['true', 'false', 'uncertain'],
          answer: 2,
          explanation: 'Both facts have Hollow on top (H > M and H > V) but say nothing about Marsh versus Vale. This is the shared-top trap: the two lower items are not linked, so the third statement is uncertain. It could be true, but "could be" is not "must be."'
        },
        {
          stem: 'Rosa scored higher than Dev. Dev scored higher than Lin. Lin scored lower than Rosa. If the first two statements are true, the third is',
          choices: ['true', 'false', 'uncertain'],
          answer: 0,
          explanation: 'The chain is R > D > L. The third statement says Lin scored lower than Rosa, which is L < R, the same fact as R > L written the other way. It follows by transitivity, so it is true. The trap is the switched wording "lower than," which makes the statement look new.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Abbreviate, then convert every statement to one symbol for one quality. Flip "shorter," "slower," "less."
- Link only through a shared letter in the middle: A > B and B > C gives A > B > C.
- Shared top or shared bottom means the other two are not linked: **uncertain**.
- True = forced correct. False = forced wrong. Uncertain = the facts leave it open.
- Use only the given facts. Your town's streets do not count.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 4
lessons.push({
  id: 'hspt-verbal-classification',
  test: 'hspt',
  section: 'verbal',
  skill: 'verbal-classification',
  title: 'Verbal Classification: Name the Category the Three Share',
  minutes: 12,
  level: 3,
  objectives: [
    'State the category shared by three of the four words in one phrase',
    'Use part of speech as a fast first filter',
    'Separate a category name from its members',
    'Tighten a category that lets all four words in'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What the item asks',
      md: `"Which word does **not** belong with the others?" A. apple B. carrot C. banana D. cherry

Three of the words share a category; one does not. Here, apple, banana, and cherry are fruits and *carrot* is a vegetable.

### The underlying idea
This is a **category** question in disguise. The task is not "which word is weird?" It is "what single category contains exactly three of these?" Once you name that category precisely, the outsider is obvious.

Beginners look for the odd one out by feel. Experts name the group first. Naming the group is the whole skill, because the test chooses outsiders that *almost* fit: carrot is still food, still a plant, still orange-ish like some fruits. Only a precise category ("fruits") excludes it.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Check parts of speech.** If three words are nouns and one is a verb or adjective, you are probably done. (*run, walk, jump, speed* → speed is the only noun.) This takes two seconds and catches a surprising number of items.
2. **Name the category of any three.** Pick the three that feel closest and say in one phrase what they are: "tools for cutting," "words for very happy," "things that measure."
3. **Test the fourth word against that phrase.** If it fits, your category is too broad. Tighten it (from "animals" to "animals with feathers") and re-test.
4. **Confirm by reversing.** The outsider should belong to a *different* precise category. If you cannot say what the outsider is instead, look again.

Category-versus-member check: if one word is the *name of the group* and the others are *members*, the group name is the outsider. *Rose, tulip, daisy, flower* → flower.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** Which word does not belong with the others?
A. trumpet   B. violin   C. flute   D. clarinet

**Step 1.** All four are nouns. No help there. I move on.

**Step 2.** My first instinct is "all musical instruments," but that includes all four, so it is useless. I need something tighter. I notice trumpet, flute, and clarinet are all played by blowing into them. Category: "instruments you blow into" (wind instruments).

**Step 3.** Test violin. A violin is played with a bow across strings. It does not fit "blown." The category holds.

**Step 4.** Reverse check: violin belongs to "string instruments." I can name its real group, so I am confident. **Answer: B.**

I notice what the test did: it picked four words from one broad family so that "instruments" would feel like the category. The skill is pushing one level deeper.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** Which word does not belong with the others?
A. ounce   B. gallon   C. ruler   D. mile

**Step 1.** All nouns.
**Step 2.** Ounce, gallon, and mile are all *units*: things you measure *in*.

Now finish Steps 3 and 4: test *ruler* against "units of measurement," and name the different category it actually belongs to.`,
      question: {
        stem: 'Which word does not belong with the others?',
        choices: ['ounce', 'gallon', 'ruler', 'mile'],
        answer: 2,
        explanation: 'Ounce, gallon, and mile are units of measurement. A ruler is a tool that does the measuring, not a unit, so it does not belong. The trap is the broad category "things about measuring," which lets all four in. Tightening to "units" exposes the outsider.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Too-broad category.** "Food," "animals," "things in a house" rarely exclude anything. If all four fit, tighten.
- **Group name among members.** *Furniture* among *chair, table, sofa* is the outsider. The group is not a member of itself.
- **Hidden part of speech.** Words like *fast, light, cool* can be more than one part of speech. Read how the other three are used and match.
- **Choosing by vibe.** "Clarinet sounds fancy" is not a category. Say the category in words.
- **Two possible groupings.** Occasionally a word fits two categories (*orange*: fruit or color). Pick the category that includes exactly three; the test writers built it that way.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Which word does not belong with the others?',
          choices: ['whisper', 'shout', 'mumble', 'silence'],
          answer: 3,
          explanation: 'Whisper, shout, and mumble are ways of speaking (verbs or nouns of speech). Silence is the absence of speech, not a way of doing it. The trap is the broad category "words about sound," which would admit all four.'
        },
        {
          stem: 'Which word does not belong with the others?',
          choices: ['copper', 'metal', 'iron', 'tin'],
          answer: 1,
          explanation: 'Copper, iron, and tin are specific metals. "Metal" is the name of the category itself, and a category name does not belong with its members. This is the category-versus-member pattern.'
        },
        {
          stem: 'Which word does not belong with the others?',
          choices: ['sprint', 'jog', 'dash', 'slowly'],
          answer: 3,
          explanation: 'Sprint, jog, and dash are verbs (or nouns) for ways of running. "Slowly" is an adverb. The part-of-speech check settles this in seconds, before you even think about meaning.'
        },
        {
          stem: 'Which word does not belong with the others?',
          choices: ['brook', 'pond', 'river', 'stream'],
          answer: 1,
          explanation: 'Brook, river, and stream are bodies of moving water. A pond is still water. "Bodies of water" is too broad and admits all four; "flowing water" is the precise category that leaves pond out.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Do not hunt for the odd word. Name the category that holds exactly three.
- Check part of speech first; it is the fastest filter.
- If all four fit your category, it is too broad. Tighten it one level.
- A group name among its members is the outsider.
- Confirm by naming the outsider's own, different category.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 5
lessons.push({
  id: 'hspt-reading-vocab',
  test: 'hspt',
  section: 'reading',
  skill: 'reading-vocab',
  title: 'Reading Vocabulary: The Word in a Short Phrase',
  minutes: 11,
  level: 3,
  objectives: [
    'Use the two or three words of context the HSPT gives to pin down a meaning',
    'Predict a definition before reading the choices',
    'Eliminate choices by charge, part of speech, and strength',
    'Handle words you have never seen using parts and the phrase'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'How these items work',
      md: `The last part of the HSPT Reading section drops the passages and gives you about 22 short-phrase vocabulary items:

*a **serene** lake*
A. stormy   B. peaceful   C. enormous   D. frozen

You get one word in a tiny phrase. The phrase is not decoration; it is a clue. "A serene *lake*" tells you the word describes a body of water and is probably about its condition, not its size.

### The underlying idea
These are synonym items with a hint attached. The phrase restricts the **part of speech** (adjective here, since it sits before a noun) and the **neighborhood** (what can be true of a lake). Combine that with the word's charge and parts, and most choices fall away.

Because there are many items and little time, your goal is speed with a fixed routine, not deep analysis.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Read the whole phrase, cover the choices.** Ask: what part of speech is the tested word, and what is it describing?
2. **Predict.** Say a plain word that could replace it: "a *calm* lake." If you cannot predict, say the charge at least: "something good about the lake."
3. **Uncover and match.** Find the choice closest to your prediction. Do not re-evaluate the other three at length if one matches cleanly.
4. **If nothing matches,** eliminate: wrong charge, wrong part of speech, wrong neighborhood (describes size when the word is about mood). Then use word parts (*ser-* appears in nothing you know? *-ene*? Move on and guess from what is left).

HSPT has **no guessing penalty**. Never leave a vocabulary item blank.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** *to **reluctantly** agree*
A. eagerly   B. unwillingly   C. loudly   D. quickly

**Step 1.** The phrase is "to reluctantly agree." *Reluctantly* sits before a verb and ends in -ly, so it is an adverb describing *how* someone agrees. I cover the choices.

**Step 2.** I notice I have heard "reluctant to go." That is someone dragging their feet. Prediction: "agreeing even though you do not really want to." Charge: slightly negative, hesitant.

**Step 3.** I uncover. *Unwillingly* matches my prediction almost exactly.

**Step 4.** Quick sanity check on the others: *eagerly* is the exact opposite, the planted antonym. *Loudly* and *quickly* are adverbs (right part of speech) but describe volume and speed, not willingness. **Answer: B.**

Total time: about fifteen seconds. The prediction did the work; the choices only confirmed it.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** *an **arid** region*
A. crowded   B. dry   C. fertile   D. mountainous

**Step 1.** *Arid* is an adjective describing a region (a place or climate).
**Step 2.** Prediction hint: you may have heard "arid desert." What is a desert's defining feature?

Now finish Steps 3 and 4: match your prediction, and identify which choice is the planted opposite.`,
      question: {
        stem: 'an arid region',
        choices: ['crowded', 'dry', 'fertile', 'mountainous'],
        answer: 1,
        explanation: 'Arid means very dry, with little rainfall. "Fertile" (rich, good for growing) is the near-opposite planted as bait. "Crowded" and "mountainous" can describe a region but have nothing to do with moisture, so they fail the neighborhood test.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Reading the choices first.** Choices are written to sound plausible. Predict first so they cannot steer you.
- **The planted opposite.** One choice is almost always the antonym. If the word is unfamiliar and a choice feels strongly "right," make sure it is not simply the strongest-sounding word.
- **Right part of speech, wrong neighborhood.** All four choices usually match the part of speech. Use what the phrase is *about* to cut further.
- **Spending a minute on one word.** These items are worth the same as every other. Predict, pick, move.
- **Changing an answer with no new reason.** Your first match based on a prediction is usually right. Change it only if you spot a concrete error.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'a hostile crowd',
          choices: ['friendly', 'unfriendly', 'enormous', 'quiet'],
          answer: 1,
          explanation: 'Hostile means unfriendly or showing dislike, so unfriendly is the match. "Friendly" is the planted antonym. "Enormous" and "quiet" describe size and noise, not attitude, which is the neighborhood the word lives in.'
        },
        {
          stem: 'to abandon the plan',
          choices: ['improve', 'explain', 'give up', 'begin'],
          answer: 2,
          explanation: 'Abandon means to leave behind or give up entirely. "Begin" is the opposite, planted as bait. "Improve" and "explain" are things you can do to a plan, which makes them tempting, but neither carries the meaning of leaving it.'
        },
        {
          stem: 'a prudent decision',
          choices: ['careless', 'wise', 'sudden', 'popular'],
          answer: 1,
          explanation: 'Prudent means showing careful good judgment, so wise is the match. "Careless" is the antonym trap. "Sudden" and "popular" are adjectives that fit "decision" but describe timing and reception rather than quality of judgment.'
        },
        {
          stem: 'a meager portion',
          choices: ['generous', 'tasty', 'small', 'warm'],
          answer: 2,
          explanation: 'Meager means small in amount, barely enough. "Generous" is the planted opposite. "Tasty" and "warm" describe food but not quantity, so they are out on neighborhood. Prediction before looking ("a tiny portion") lands on the answer immediately.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- The phrase is a clue: it fixes the part of speech and the neighborhood.
- Cover the choices, predict a plain replacement, then match.
- Expect the planted antonym; expect right-part-of-speech, wrong-neighborhood choices.
- No penalty on the HSPT, so answer every item and keep moving.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 6
lessons.push({
  id: 'hspt-language-punctuation',
  test: 'hspt',
  section: 'language',
  skill: 'punctuation',
  title: 'Punctuation: The Five Comma Rules and Their Neighbors',
  minutes: 16,
  level: 3,
  objectives: [
    'Apply the five comma rules the HSPT tests and recognize when a comma is wrong',
    'Place apostrophes correctly for possession and contractions',
    'Punctuate dialogue with quotation marks, commas, and end marks in the right order',
    'Distinguish semicolons from colons and from commas'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'How the HSPT tests punctuation',
      md: `The Language section shows three sentences and asks which one has an error in punctuation (or capitalization or usage). The fourth choice is "No mistakes." You are hunting for the *one* sentence that breaks a rule.

### The underlying idea
Punctuation marks are traffic signals for the reader. Every rule answers one question: *where does one idea stop and the next begin?* A comma is a brief pause inside one idea; a semicolon joins two complete ideas; a period ends one. Apostrophes and quotation marks mark ownership and speech.

When you know the small set of rules the test uses, you stop reading for "feel" and start checking for *violations*. That is faster and far more accurate.`
    },
    {
      type: 'concept',
      title: 'The rules the test uses',
      md: `### The five comma rules
1. **Items in a series:** "We packed tents, ropes, and lanterns."
2. **Before a conjunction joining two complete sentences:** "The sun set, and the air turned cold." (No comma if the second half is not a complete sentence: "The sun set and turned the sky red.")
3. **After an introductory word or phrase:** "After the storm, the streets flooded." "Yes, I finished."
4. **Around interrupters and nonessential information:** "My brother, who lives in Ohio, is visiting." "The book, however, was late."
5. **Direct address, dates, and places:** "Thank you, Maria." "June 4, 2026, was a Thursday." "Austin, Texas, is hot."

### Apostrophes
- Possession: *the dog's bone* (one dog), *the dogs' bones* (many dogs), *the children's toys* (irregular plural adds 's).
- Contractions: *it's* = it is; *they're* = they are; *who's* = who is.
- **Never** for plain plurals: "two *apples*," not "two apple's." **Never** in *its, hers, theirs, yours, ours* (possessive pronouns own nothing with apostrophes).

### Quotation marks
- Comma before the quote: She said, "We leave at noon."
- Periods and commas go **inside** the closing mark: "We leave at noon," she said.
- Question marks go inside only if the quote is the question: He asked, "Are we late?" versus Did he say, "We are late"?

### Semicolons and colons
- **Semicolon** joins two complete sentences with no conjunction: "The rain stopped; the game resumed." Both halves must stand alone.
- **Colon** introduces a list or explanation after a complete sentence: "Bring three things: water, a hat, and sunscreen." Not after a verb: "Bring: water, a hat..." is wrong.`
    },
    {
      type: 'strategy',
      title: 'The 3-step scan',
      md: `1. **Find every mark.** Underline each comma, apostrophe, quotation mark, semicolon, and colon in each sentence. Marks that are *present* are easier to judge than ones that are missing, so check those first.
2. **Name the rule each mark is obeying.** Say it: "series," "intro phrase," "interrupter," "possessive." If you cannot name a rule for a comma, that comma is probably the error.
3. **Then check for missing marks.** Two complete sentences joined by only a comma (comma splice) or by nothing (run-on)? A series with a missing comma? A contraction with no apostrophe?

If all three sentences pass, choose "No mistakes." Do not invent an error because you expect one; about one item in four has none.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** Which sentence has an error in punctuation?
A. After the concert, we walked to the station.
B. The twins' room is always messy.
C. I wanted to stay, my mother wanted to leave.
D. No mistakes.

**Step 1.** Marks: A has a comma after "concert." B has an apostrophe after "twins." C has a comma after "stay."

**Step 2.** A: "After the concert" is an introductory phrase; the comma obeys rule 3. Fine. B: "twins'" is a plural possessive, apostrophe after the s. The room belongs to both twins. Fine. C: I notice the comma sits between "I wanted to stay" and "my mother wanted to leave." Both halves are complete sentences. A comma alone cannot join two complete sentences. That is a comma splice. It needs a semicolon, a period, or ", but."

**Step 3.** I check for missing marks in A and B just in case. Nothing missing.

**Answer: C.** The tell was two subjects and two verbs on either side of a lone comma.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** Which sentence has an error in punctuation?
A. "Hurry up," Dad called from the car.
B. The recipe needs: eggs, flour, and butter.
C. The cat licked its paws and fell asleep.
D. No mistakes.

**Step 1.** Marks: A has quotation marks and a comma inside them. B has a colon and two commas. C has no marks except the period.
**Step 2 (partly done).** A: the comma belongs inside the closing quotation mark, and it is. Correct. C: "its" is a possessive pronoun, so no apostrophe is correct.

Now you finish: name the rule for the colon in B. What must come *before* a colon?`,
      question: {
        stem: 'Which sentence has an error in punctuation?',
        choices: ['"Hurry up," Dad called from the car.', 'The recipe needs: eggs, flour, and butter.', 'The cat licked its paws and fell asleep.', 'No mistakes.'],
        answer: 1,
        explanation: 'A colon must follow a complete sentence. "The recipe needs" is not complete; the colon splits the verb from its objects. Correct versions: "The recipe needs eggs, flour, and butter" or "The recipe needs three things: eggs, flour, and butter." Sentence A punctuates dialogue correctly and sentence C correctly uses "its" with no apostrophe.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Comma splice.** Two complete sentences, one comma, no conjunction. The most-tested error on the HSPT.
- **Comma before a conjunction that does not join two full sentences.** "She sang, and danced" is wrong because "danced" is not a sentence.
- **Its / it's.** *It's* only ever means *it is* or *it has*. If you cannot expand it, no apostrophe.
- **Apostrophe plurals.** "The Smith's are here" is wrong. Plurals take no apostrophe.
- **Punctuation outside the quotation mark.** In American usage, periods and commas go inside.
- **Semicolon with a fragment.** "I was late; because of traffic" is wrong; the second half cannot stand alone.
- **Expecting an error.** "No mistakes" is a real answer. Pick it when every rule checks out.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Which sentence has an error in punctuation?',
          choices: ['Its too late to change the schedule now.', 'The team practiced hard; the coach was pleased.', 'We visited Denver, Colorado, last spring.', 'No mistakes.'],
          answer: 0,
          explanation: '"Its too late" should be "It\'s too late," because the word means "it is." Expanding the contraction is the test. Sentence B correctly uses a semicolon between two complete sentences, and sentence C correctly puts commas around the state name.'
        },
        {
          stem: 'Which sentence has an error in punctuation?',
          choices: ['My uncle, who is a pilot, flies to Tokyo often.', 'Marcus bought apples, pears and, grapes.', 'Did she really say, "I quit"?', 'No mistakes.'],
          answer: 1,
          explanation: 'In a series, the comma goes before "and," not after it: "apples, pears, and grapes." Sentence A correctly sets off a nonessential clause with commas. Sentence C is correct: the whole sentence is the question, so the question mark goes outside the quotation marks.'
        },
        {
          stem: 'Which sentence has an error in punctuation?',
          choices: ['The storm knocked out power, we lit candles.', 'Before leaving, check that the stove is off.', 'The children\'s coats hung by the door.', 'No mistakes.'],
          answer: 0,
          explanation: 'Sentence A is a comma splice: "The storm knocked out power" and "we lit candles" are both complete sentences joined by only a comma. Use a semicolon, a period, or ", so." Sentence B correctly follows an introductory phrase with a comma, and "children\'s" is the correct irregular plural possessive.'
        },
        {
          stem: 'Which sentence has an error in punctuation?',
          choices: ['"Watch out!" she shouted.', 'The museum closes at five, so we should hurry.', 'Please bring the following items: a notebook, a pen, and a ruler.', 'No mistakes.'],
          answer: 3,
          explanation: 'All three sentences are correct. A places the exclamation point inside the quotation marks because the quote is the exclamation. B uses a comma before "so" joining two complete sentences. C uses a colon after a complete sentence to introduce a list. "No mistakes" is the answer, and it will be about one time in four.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Five comma rules: series, two full sentences + conjunction, intro phrase, interrupter, address/date/place.
- Apostrophes show possession or contraction, never plain plurals, never in *its/hers/theirs*.
- Periods and commas go inside quotation marks.
- Semicolon = two complete sentences, no conjunction. Colon = complete sentence, then a list or explanation.
- Name the rule for each mark; a mark with no rule is the error. If every mark has a rule, "No mistakes."`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 7
lessons.push({
  id: 'hspt-language-capitalization',
  test: 'hspt',
  section: 'language',
  skill: 'capitalization',
  title: 'Capitalization: Proper Names Only',
  minutes: 11,
  level: 3,
  objectives: [
    'Distinguish a proper noun (one specific, named thing) from a common noun',
    'Apply the capitalization rules for titles, places, dates, and directions',
    'Spot over-capitalization, which the HSPT tests as often as under-capitalization',
    'Decide "No mistakes" with confidence'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'The one idea behind every rule',
      md: `Capital letters mark **proper nouns**: the official name of one specific person, place, thing, or event. *A river* is common; *the Mississippi River* is proper. *A doctor* is common; *Doctor Ruiz* is proper.

Every capitalization rule is that idea applied to a special case. The HSPT asks "Which sentence has an error in capitalization?" and makes its money two ways:

1. **Under-capitalizing** a proper name: "we drove to lake erie."
2. **Over-capitalizing** a common noun that *feels* important: "My Mom is a Nurse at the Hospital."

Students catch the first kind. They miss the second kind because capital letters look official. Train yourself to ask, for each capital: *is this the name of one specific thing?*`
    },
    {
      type: 'strategy',
      title: 'The rules, and the 3-step scan',
      md: `### Capitalize
- First word of a sentence and of a direct quotation ("She said, 'We won.'").
- Names, initials, and the pronoun *I*.
- Titles **attached to a name**: *President Lincoln*, *Aunt Rosa*, *Dr. Chen*. Not when used alone: "the president spoke," "my aunt called."
- Specific places: *Main Street*, *Lake Erie*, *the Rocky Mountains*, *Europe*.
- Days, months, holidays: *Tuesday*, *October*, *Thanksgiving*. **Not seasons**: *spring, winter*.
- Languages, nationalities, religions: *Spanish*, *Canadian*, *Buddhism*.
- Specific courses and school names: *Algebra II*, *Lincoln Middle School*. Not subjects: *math, history* (except languages).
- Titles of books, movies, songs: first, last, and all major words. *The Call of the Wild*.
- Directions **as regions**: *the South*, *the Midwest*. Not as directions: "drive south."

### The scan
1. **Check every capital letter.** Ask: name of one specific thing, or first word, or *I*? If none, it is over-capitalized.
2. **Check every lowercase noun that could be a name.** Days, months, places, titles before names, languages.
3. **If all three sentences pass, pick "No mistakes."**`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** Which sentence has an error in capitalization?
A. Last summer we hiked in the Rocky Mountains.
B. My Grandmother makes tamales every Christmas.
C. The senator from Ohio spoke first.
D. No mistakes.

**Step 1.** I check every capital. A: *Last* starts the sentence; *Rocky Mountains* is a named range. Both fine. *summer* is lowercase, and seasons are not capitalized. Good. B: *My* starts the sentence. *Grandmother*: I notice this is not attached to a name as a title. "My grandmother" is a common noun, like "my friend." Over-capitalized. *Christmas* is a holiday, fine. C: *The* starts the sentence; *Ohio* is a state. *senator* is lowercase, and it is used alone, not before a name, so lowercase is right.

**Step 2.** Any lowercase names? A: no. C: "the senator" would need a capital only if it were "Senator Ortiz." No error.

**Answer: B.** *Grandmother* would be capitalized only as a name: "Did Grandmother call?" With "my" in front, it is a common noun.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** Which sentence has an error in capitalization?
A. We will study the french revolution in history class.
B. Turn left on Maple Avenue after the bridge.
C. Dr. Patel teaches on Mondays and Wednesdays.
D. No mistakes.

**Step 1 (done).** B and C: every capital is a name (a street, a title before a name, days of the week). *history class* is a subject, so lowercase is correct.

Now you do Step 2 on sentence A. Which words are the name of one specific event, and which word is a nationality?`,
      question: {
        stem: 'Which sentence has an error in capitalization?',
        choices: ['We will study the french revolution in history class.', 'Turn left on Maple Avenue after the bridge.', 'Dr. Patel teaches on Mondays and Wednesdays.', 'No mistakes.'],
        answer: 0,
        explanation: '"French" is a nationality and "French Revolution" is the name of one specific historical event, so both words need capitals. "History" is correctly lowercase because it is a general subject, not a course title. Sentences B and C are correct.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Family words.** *Mom, Dad, Grandpa* are capitalized only when used as a name with no *my/your/his* in front. "I asked Mom" vs. "I asked my mom."
- **Titles alone.** *the president, the principal, the coach* are lowercase unless directly before a name.
- **Seasons.** Never capitalized. (*Fall Festival* is capitalized only because it is an event's name.)
- **Directions vs. regions.** "head north" is lowercase; "the North" as a region is capitalized.
- **School subjects.** *math, science, art* are lowercase; *English, Spanish* are capitalized because they are languages; *Biology 101* is capitalized because it is a specific course.
- **Important-sounding common nouns.** *hospital, university, river, war* are lowercase unless part of a specific name.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Which sentence has an error in capitalization?',
          choices: ['My cousin moved to the South last year.', 'The Principal announced a new schedule.', 'I finished reading Charlotte\'s Web on Sunday.', 'No mistakes.'],
          answer: 1,
          explanation: '"Principal" is used alone, not as a title before a name, so it should be lowercase: "The principal announced." Sentence A is correct because "the South" names a region. Sentence C correctly capitalizes a book title and a day of the week.'
        },
        {
          stem: 'Which sentence has an error in capitalization?',
          choices: ['We celebrate Thanksgiving in late november.', 'Aunt Lydia speaks Portuguese and English.', 'The Nile River flows through Egypt.', 'No mistakes.'],
          answer: 0,
          explanation: 'Months are always capitalized: "November." Sentence B is correct: "Aunt" is a title attached to a name, and languages are capitalized. Sentence C correctly capitalizes a specific river and a country.'
        },
        {
          stem: 'Which sentence has an error in capitalization?',
          choices: ['Every winter, the pond behind our school freezes.', 'Mayor Jenkins will speak at the ceremony.', 'She said, "the bus is leaving now."', 'No mistakes.'],
          answer: 2,
          explanation: 'The first word of a direct quotation is capitalized: She said, "The bus is leaving now." Sentence A correctly leaves "winter" lowercase (seasons are not capitalized). Sentence B correctly capitalizes a title directly before a name.'
        },
        {
          stem: 'Which sentence has an error in capitalization?',
          choices: ['My dad drove us across the Golden Gate Bridge.', 'The class read a poem by Langston Hughes.', 'In the spring, we plant tomatoes and peppers.', 'No mistakes.'],
          answer: 3,
          explanation: 'All three are correct. "My dad" is a common noun with "my" in front, so lowercase is right; "Golden Gate Bridge" is a specific name. "Langston Hughes" is a person\'s name. "Spring" is a season and stays lowercase. The answer is "No mistakes."'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Capital = the name of one specific thing, a first word, or *I*.
- Titles and family words are capitalized only when they act as a name (no *my/the* in front).
- Days, months, holidays, languages: yes. Seasons, subjects, directions: no.
- Check every capital for a reason, then check every lowercase word that could be a name.
- Over-capitalization is tested as often as under-capitalization.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 8
lessons.push({
  id: 'hspt-language-usage',
  test: 'hspt',
  section: 'language',
  skill: 'usage',
  title: 'Usage: Agreement, Pronouns, Tense, Modifiers, and Sentence Boundaries',
  minutes: 17,
  level: 3,
  objectives: [
    'Match a verb to its true subject even when a phrase sits between them',
    'Choose pronoun case (I/me, who/whom) and make pronouns agree with their antecedents',
    'Keep verb tense consistent and use the correct past participle',
    'Place modifiers next to what they describe',
    'Identify fragments and run-ons'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What "usage" means on the HSPT',
      md: `Usage items ask "Which sentence has an error in usage?" The errors are grammar errors that *sound* almost right, especially out loud. The test is betting you will read with your ear instead of your rules.

### The underlying idea
Every usage error is a mismatch: subject and verb do not match in number, a pronoun does not match its job in the sentence, a tense does not match its neighbors, a describing phrase does not sit next to the thing it describes, or a group of words does not match the shape of a sentence.

The skill is to find the two parts that must agree and check them *directly*, ignoring the words in between.`
    },
    {
      type: 'concept',
      title: 'The five error families',
      md: `### 1. Subject-verb agreement
Find the subject, cross out any prepositional phrase after it, then match. "The box *of crayons* **is** empty." (Subject: box.) Compound subjects with *and* take plural verbs; with *or/nor*, the verb matches the closer subject. *Each, everyone, neither, either, nobody* are singular: "Each of the players **has** a jersey."

### 2. Pronouns
- **Case.** Subjects: *I, he, she, we, they, who*. Objects: *me, him, her, us, them, whom*. Test by removing the other person: "Dad took Sam and (I / me)" → "Dad took me." So *me*.
- **Agreement.** A pronoun matches its antecedent in number. "*Everyone* should bring **his or her** ticket," not *their* (on the HSPT, treat indefinite pronouns as singular).
- **Clear reference.** "Jen told Ava that she won" is ambiguous. The test prefers clear antecedents.

### 3. Verb tense and form
Keep tense consistent within a sentence unless meaning requires a shift. Know irregular forms: *went/gone, saw/seen, did/done, began/begun, drank/drunk, broke/broken, lay/lain, lie/lay/lain vs. lay/laid/laid*. "He has **gone**," never "has went."

### 4. Modifiers
A describing phrase must sit next to what it describes. "**Running to the bus**, my backpack fell open" says the backpack was running. Fix: "Running to the bus, **I** felt my backpack fall open." Also: *good* (adjective) vs. *well* (adverb); *fewer* (countable) vs. *less* (uncountable).

### 5. Fragments and run-ons
A sentence needs a subject, a verb, and a complete thought. "Because the game was canceled." is a fragment. "The game was canceled we went home." is a run-on. Connect with a conjunction, semicolon, or period.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Find the verb(s), then the true subject.** Cross out prepositional phrases (*of, in, with, on, between...*) between them. Check number.
2. **Circle every pronoun.** Ask: subject or object? Does it match a singular or plural antecedent? Use the remove-the-other-person test.
3. **Check tense and form.** Do the verbs stay in one time frame? Is each irregular form correct?
4. **Read the sentence shape.** Does an opening phrase describe the subject that follows it? Is this a complete sentence, one sentence, not two jammed together?

If all three sentences survive, "No mistakes."`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** Which sentence has an error in usage?
A. The collection of old coins were sold at auction.
B. Neither of the twins has finished the project.
C. My brother and I painted the fence yesterday.
D. No mistakes.

**Step 1.** A: verb is *were sold*. I look left for the subject. "The collection *of old coins*." I notice *of old coins* is a prepositional phrase, so I cross it out. The subject is *collection*, singular. "The collection were sold" is wrong. It should be *was sold*. That is likely the error, but I check the rest.

B: verb *has finished*. Subject: *Neither*, which is singular on this test. "Neither has" is correct. The phrase *of the twins* is bait to make you hear "twins have."

C: subject *My brother and I*; compound subject, plural verb *painted* (past tense, no number issue). Pronoun check: remove "my brother and": "I painted the fence." Subject case *I* is correct.

**Step 3 and 4.** Tenses consistent; no fragments or run-ons.

**Answer: A.** The ear hears "coins were." The rule finds "collection was."`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** Which sentence has an error in usage?
A. The coach gave the trophy to Priya and me.
B. Walking along the beach, the shells crunched under my feet.
C. She has already written her report.
D. No mistakes.

**Steps 1-3 (done).** A: remove "Priya and" → "gave the trophy to me." Object case, correct. C: *has written* is the correct past participle.

Now you do Step 4 on sentence B. The opening phrase is "Walking along the beach." Which noun comes right after the comma, and can that noun walk?`,
      question: {
        stem: 'Which sentence has an error in usage?',
        choices: ['The coach gave the trophy to Priya and me.', 'Walking along the beach, the shells crunched under my feet.', 'She has already written her report.', 'No mistakes.'],
        answer: 1,
        explanation: 'Sentence B has a dangling modifier. "Walking along the beach" must describe the subject that follows the comma, but that subject is "the shells," which cannot walk. A correct version: "Walking along the beach, I felt the shells crunch under my feet." A uses the correct object pronoun "me," and C uses the correct participle "written."'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **The phrase between subject and verb.** "The *box* of crayons *is*." Always cross out the prepositional phrase.
- **"Between you and I."** *Between* is a preposition, so it takes *me*. Politeness is not grammar.
- **"Everyone... their."** On the HSPT, *everyone, each, nobody* are singular. Expect *his or her*.
- **"Has went," "had saw," "should have did."** Helping verbs take the participle: *gone, seen, done*.
- **"Less students," "did good on the test."** *Fewer* for countable things; *well* as an adverb.
- **Fragment that starts with *because, although, when, since*.** A dependent clause alone is not a sentence.
- **Trusting your ear.** Usage errors are designed to sound natural. Check the rule.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Which sentence has an error in usage?',
          choices: ['Each of the students have a locker.', 'The puppies chased their tails in circles.', 'Whom did you invite to the party?', 'No mistakes.'],
          answer: 0,
          explanation: '"Each" is singular, so the verb must be "has": "Each of the students has a locker." The phrase "of the students" is bait for a plural verb. Sentence C correctly uses "whom" as the object of "invite" (you invited him → whom).'
        },
        {
          stem: 'Which sentence has an error in usage?',
          choices: ['After dinner, we played cards and told stories.', 'If you had seen the storm, you would have stayed home.', 'The teacher asked Marco and I to hand out the papers.', 'No mistakes.'],
          answer: 2,
          explanation: 'Remove "Marco and" and the sentence becomes "asked I to hand out," which is wrong. The pronoun is the object of "asked," so it must be "me." Sentence B uses the correct participle "seen" after "had."'
        },
        {
          stem: 'Which sentence has an error in usage?',
          choices: ['Because the road was closed for repairs.', 'There are fewer seats in this theater than in the old one.', 'The orchestra has begun its final piece.', 'No mistakes.'],
          answer: 0,
          explanation: 'Sentence A is a fragment: "Because the road was closed for repairs" is a dependent clause with no main clause to complete the thought. B correctly uses "fewer" for countable seats, and C correctly uses the participle "begun" with "has" and the singular "its" for an orchestra.'
        },
        {
          stem: 'Which sentence has an error in usage?',
          choices: ['Yesterday she walks to school and forgot her lunch.', 'Either the dog or the cats are responsible for the mess.', 'He did well on the exam despite his nerves.', 'No mistakes.'],
          answer: 0,
          explanation: 'Sentence A shifts tense without reason: "Yesterday" and "forgot" are past, so "walks" must be "walked." Sentence B is correct because with "or" the verb matches the closer subject, "cats," which is plural. Sentence C correctly uses the adverb "well."'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Find the true subject by crossing out prepositional phrases; match the verb to it.
- Pronoun case: remove the other person and listen. *Between you and me.*
- *Each, everyone, neither, nobody* are singular.
- Helping verb + participle: *has gone, had seen, should have done*.
- An opening phrase must describe the subject that follows the comma.
- Fragment = no complete thought. Run-on = two sentences with no proper joint.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 9
lessons.push({
  id: 'hspt-language-spelling',
  test: 'hspt',
  section: 'language',
  skill: 'spelling',
  title: 'Spelling: The Rules Behind the 40 Most-Tested Words',
  minutes: 14,
  level: 3,
  objectives: [
    'Apply the four spelling rules that cover most HSPT spelling items',
    'Recognize the 40 words that appear most often in spelling items',
    'Use a syllable-by-syllable check instead of a whole-word glance',
    'Choose "No mistakes" when every word is correct'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'How spelling is tested',
      md: `The HSPT asks "Which sentence has a spelling error?" with three sentences and "No mistakes." Each sentence has ordinary words plus one or two that are commonly misspelled. The misspelling is always *plausible*: a doubled letter missing, an *-ible* written as *-able*, a silent letter dropped.

### The underlying idea
English spelling is irregular, but the **errors the test uses are regular**. They cluster around four rules and a short list of words. If you know the rules and have *looked carefully* at the list, you are checking against a pattern rather than hoping a word "looks right." Looking right is exactly what the misspellings are built to do.`
    },
    {
      type: 'concept',
      title: 'The four rules and the 40 words',
      md: `### Rule 1: i before e, except after c
*believe, achieve, relieve, friend, piece* but *receive, deceive, ceiling, perceive*. Exceptions to memorize: *weird, seize, either, neither, leisure, height, foreign, their*.

### Rule 2: Doubling the final consonant
Double when the word ends in one vowel + one consonant **and** the stress is on that last syllable: *begin → beginning, occur → occurred, commit → committed, refer → referred*. One-syllable words follow the same pattern: *stop → stopped, run → running*. Do not double when the stress is earlier: *open → opened, benefit → benefited, offer → offered*. Do not double after two vowels: *rain → rained*.

### Rule 3: -able vs. -ible
If the base is a complete word, usually *-able*: *comfortable, acceptable, dependable, noticeable* (keep the e after soft c or g). If the base is not a word on its own, usually *-ible*: *possible, terrible, visible, incredible, responsible, eligible*.

### Rule 4: Silent letters and dropped syllables
*Wednesday, February, library, government, environment, probably, different, separate, definitely, interesting, knowledge, rhythm, column, receipt, answer, island.*

### The 40 most-tested words
accommodate, achieve, acquire, argument, athlete, beginning, believe, business, calendar, cemetery, committee, conscience, definitely, disappoint, embarrass, environment, exaggerate, existence, familiar, February, foreign, government, grammar, guarantee, height, immediately, independent, judgment, knowledge, library, license, maintenance, necessary, occasion, occurred, parallel, privilege, receive, recommend, separate, truly, until, weird

Notice the pattern: double letters (*accommodate, committee, embarrass, occurred*), one-not-two (*necessary, recommend, until, truly*), and *ie/ei* (*achieve, receive, foreign, weird*).`
    },
    {
      type: 'strategy',
      title: 'The 3-step scan',
      md: `1. **Flag the suspects.** In each sentence, ignore short everyday words. Underline every word of two or more syllables or any word with a double letter, *ie/ei*, or *-able/-ible*.
2. **Spell each suspect by syllable, out loud in your head.** *ac-com-mo-date*: two c's, two m's. *sep-a-rate*: there is "a rat" in separate. Do not glance; syllables expose dropped letters.
3. **Apply the rule that fits.** Doubling? Check stress. *ie/ei*? Check for a preceding c. *-able/-ible*? Check whether the base stands alone.

If every suspect passes, "No mistakes." The test includes correct spellings of hard words to tempt you into "fixing" what is already right.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** Which sentence has a spelling error?
A. The committee will meet on Wednesday.
B. She definately finished her homework.
C. The argument lasted until midnight.
D. No mistakes.

**Step 1.** Suspects: A: *committee, Wednesday*. B: *definately, finished, homework*. C: *argument, until, midnight*.

**Step 2.** *com-mit-tee*: two m's, two t's, two e's. I notice all three doubles are there. *Wednes-day*: silent d is present. Fine.
*def-i-nite-ly*: I think about the base. *Definite* ends in *-ite*, like *finite*. So the adverb is *definite + ly = definitely*. The sentence has *definately* with an a. Error.
*ar-gu-ment*: the base is *argue*, but the e drops before *-ment*. *Argument* with no e is correct. *Until*: one l. Correct.

**Step 3.** I confirmed B by rule (the base word *definite*).

**Answer: B.** The trap in C is *argument*; students who know the base is *argue* "correct" it to *arguement*, which is wrong.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** Which sentence has a spelling error?
A. The hikers were relieved to reach the summit.
B. He recieved a letter from his grandmother.
C. Our school library opens at eight.
D. No mistakes.

**Step 1 (done).** Suspects: *relieved*, *recieved*, *library*.
**Step 2 (partly done).** *li-brar-y*: the r after b is there. Correct.

Now apply Rule 1 to the two *ie/ei* words. Which one has a *c* right before the pair, and what does that require?`,
      question: {
        stem: 'Which sentence has a spelling error?',
        choices: ['The hikers were relieved to reach the summit.', 'He recieved a letter from his grandmother.', 'Our school library opens at eight.', 'No mistakes.'],
        answer: 1,
        explanation: '"Received" has a c right before the pair, so the rule gives ei: re-ceive-d. "Relieved" has an l before the pair, so ie is correct. Both words are on the most-tested list, and the test puts them in the same item so that one looks like the other. "Library" is correctly spelled with both r\'s.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Glancing.** Misspellings are chosen to look right at a glance. Syllable them.
- **"Fixing" a correct hard word.** *Argument, judgment, truly, until, ninth* are correct without the letter you expect. Know these.
- **Doubling by sound alone.** *Occurred* doubles; *offered* does not. Stress decides.
- **ie/ei exceptions.** *Weird, seize, height, foreign, their, neither* break the rule. They are tested precisely because they do.
- **-ance/-ence and -ant/-ent.** *Existence, independent, maintenance, guidance, relevant.* No rule; memorize from the list.
- **Homophones.** *Their/there/they\'re, its/it\'s, to/too/two, principal/principle, affect/effect.* The test files some of these under spelling.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Which sentence has a spelling error?',
          choices: ['The accident occured near the bridge.', 'Her grandmother lives in a foreign country.', 'The athletes stretched before the race.', 'No mistakes.'],
          answer: 0,
          explanation: '"Occur" has one vowel plus one consonant at the end and the stress on the last syllable, so the r doubles: "occurred." Sentence B spells the ie/ei exception "foreign" correctly, and "athletes" in C has no extra syllable (not "athaletes").'
        },
        {
          stem: 'Which sentence has a spelling error?',
          choices: ['It is necessary to sign the form.', 'The twins look alike but have seperate rooms.', 'We will truly miss our coach.', 'No mistakes.'],
          answer: 1,
          explanation: '"Separate" has an a in the middle: sep-a-rate ("there is a rat in separate"). "Necessary" is correctly spelled with one c and two s\'s, and "truly" is correct without an e; both are correct hard words placed to tempt a false fix.'
        },
        {
          stem: 'Which sentence has a spelling error?',
          choices: ['The hotel can accommodate two hundred guests.', 'That outcome is not possible this year.', 'His behavior at dinner was embarassing.', 'No mistakes.'],
          answer: 2,
          explanation: '"Embarrassing" has two r\'s and two s\'s: em-bar-rass-ing. "Accommodate" in A is correct with two c\'s and two m\'s. "Possible" takes -ible because "poss" is not a complete word on its own.'
        },
        {
          stem: 'Which sentence has a spelling error?',
          choices: ['The judgment of the panel was final.', 'A calendar hung beside the door.', 'The government announced new rules.', 'No mistakes.'],
          answer: 3,
          explanation: 'All three are correct. "Judgment" is the standard American spelling with no e after the g. "Calendar" ends in -ar, not -er. "Government" keeps the n before the m. Every suspect passes, so "No mistakes" is the answer.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Flag suspects, then spell each by syllable. Never glance.
- *i* before *e* except after *c*; memorize *weird, seize, height, foreign, their, neither*.
- Double the final consonant only with one vowel + one consonant and final-syllable stress.
- *-able* when the base stands alone; *-ible* when it does not.
- Know the 40 words, including the ones that are correct *without* the letter you expect.`
    }
  ]
});

// ---------------------------------------------------------------- HSPT 10
lessons.push({
  id: 'hspt-language-composition',
  test: 'hspt',
  section: 'language',
  skill: 'composition',
  title: 'Composition: Transitions, Topic Sentences, Unity, and Clarity',
  minutes: 14,
  level: 3,
  objectives: [
    'Choose the transition word that matches the logical relationship between two ideas',
    'Identify the topic sentence a paragraph needs and the sentence that breaks its unity',
    'Pick the clearest, most direct version of a sentence',
    'Order sentences into a logical paragraph'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What composition items ask',
      md: `The last items in the HSPT Language section stop hunting for errors and ask about *good writing*. Four item types appear:

1. **Transitions.** "Choose the word that best joins the thoughts." *The trail was steep; ______, we reached the top before noon.*
2. **Topic sentence / fits the paragraph.** "Which sentence best fits under the topic 'Why Cities Plant Trees'?" or "Which sentence does *not* belong in the paragraph?"
3. **Clearest sentence.** "Which sentence expresses the idea most clearly?"
4. **Order.** "Where should sentence 3 be placed?"

### The underlying idea
Every one of these is about **logical relationship**. A transition names the relationship between two sentences. A topic sentence names the relationship among all the sentences in a paragraph. Unity means every sentence has that relationship. Clarity means the relationship between subject, verb, and object is immediate, with no detours.

If you can say *how* two ideas relate (adds, contrasts, causes, follows in time, gives an example), you can answer any composition item.`
    },
    {
      type: 'strategy',
      title: 'The methods, by item type',
      md: `### Transitions: name the relationship first
Read the two ideas and ask which of these fits:
- **Addition:** *also, furthermore, in addition, moreover*
- **Contrast:** *however, but, yet, although, on the other hand, nevertheless*
- **Cause/result:** *therefore, so, consequently, as a result, because*
- **Time/sequence:** *then, next, finally, meanwhile, afterward*
- **Example:** *for example, for instance, such as*

Only then look at the choices. Pick the word in the right family.

### Topic sentence and unity
1. Read the paragraph; say its subject in three or four words.
2. A good topic sentence states that subject *and* makes a claim broad enough to cover every sentence that follows.
3. For "does not belong," find the sentence whose subject shifts, even slightly, away from the paragraph's. Being true or interesting does not make it belong.

### Clarity
Prefer the version that is **direct** (subject, then verb, soon), **unambiguous** (every pronoun has one clear antecedent), and **free of padding** (*due to the fact that* → *because*; *at this point in time* → *now*). Wordier is not more formal; it is just wordier.

### Order
Look for a sentence that introduces (names the topic, uses full nouns, no pronouns) and a sentence that concludes (*finally, in the end, this is why*). Pronouns and *this/these* must point back to something already stated.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** Choose the word or words that best join the thoughts.
*Maya practiced the piece every evening for a month; ______, her recital performance was flawless.*
A. however   B. for example   C. as a result   D. meanwhile

**Step 1.** I name the relationship before reading the choices. The first idea: she practiced a lot. The second: the performance was flawless. I notice the second is the *outcome* of the first. Relationship: cause and result.

**Step 2.** Now the choices. *However* signals contrast; practicing and then succeeding is not a contrast. Out. *For example* would mean the flawless performance is an example of practicing; it is not. Out. *As a result* is in the cause/result family. Keep. *Meanwhile* signals two things happening at the same time; the recital came after the month of practice. Out.

**Answer: C.** The trap is *however*, which students pick because it sounds sophisticated. A transition is only right if it names the real relationship.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** Which sentence does *not* belong in the paragraph?
(1) Honeybees communicate through a "waggle dance." (2) The angle of the dance tells other bees the direction of a food source. (3) The length of the dance tells them how far away it is. (4) Honey is sweeter than most sugar substitutes. (5) Scientists first decoded the dance in the 1940s.

**Step 1 (done).** The paragraph's subject in a few words: *how the waggle dance communicates*.
**Step 2.** Test each sentence against that subject. Sentences 1, 2, 3, and 5 all mention the dance or what it tells bees.

Now finish: which sentence shifts to a different subject, even though it is true and about honeybees?`,
      question: {
        stem: 'Which sentence does not belong in the paragraph about the honeybee waggle dance?',
        choices: ['Sentence 2', 'Sentence 3', 'Sentence 4', 'Sentence 5'],
        answer: 2,
        explanation: 'Sentence 4 is about the sweetness of honey, not about the waggle dance or communication. It is true and it mentions bees indirectly, which is the trap, but unity requires every sentence to serve the paragraph\'s subject. Sentences 2, 3, and 5 all develop the dance.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Fancy transition, wrong relationship.** *However, nevertheless, moreover* are picked for sound. Name the relationship first.
- **True but off-topic.** For unity items, a sentence can be accurate and still not belong.
- **Topic sentence too narrow.** A topic sentence must cover the *whole* paragraph. A sentence that states only one detail is a supporting sentence, not a topic sentence.
- **Wordy = formal.** The clearest choice is usually the shortest one that keeps the full meaning.
- **Pronoun first.** A sentence beginning with *This, It, They* cannot open a paragraph; it must follow the noun it refers to.
- **Two transitions.** "But however" and "so therefore" are redundant; the test treats them as errors.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Choose the word that best joins the thoughts: "The museum is free on Sundays; ______, it is usually crowded that day."',
          choices: ['similarly', 'therefore', 'for instance', 'otherwise'],
          answer: 1,
          explanation: 'Being free causes the crowds, so the relationship is cause and result, and "therefore" is the match. "Similarly" signals addition of a like idea, "for instance" signals an example, and "otherwise" signals an alternative; none states the cause-result link.'
        },
        {
          stem: 'Which sentence would make the best topic sentence for a paragraph about why recess helps students learn?',
          choices: ['Recess usually lasts about twenty minutes.', 'Some schools have reduced recess in recent years.', 'Time to run and play during the day helps students focus and remember more in class.', 'Many students play soccer during recess.'],
          answer: 2,
          explanation: 'A topic sentence must state the subject and a claim broad enough to cover the paragraph: recess helps learning. Choice C does that. A and D are narrow details that could support the paragraph, and B is about a different subject (cuts to recess), not about how recess helps learning.'
        },
        {
          stem: 'Which sentence expresses the idea most clearly?',
          choices: ['Due to the fact that it was raining, the game, which had been scheduled, was postponed by the officials.', 'Because of rain, the officials postponed the game.', 'The game was postponed, it was by the officials, because of the rain that was falling.', 'Rain being the reason, the postponement of the game by officials occurred.'],
          answer: 1,
          explanation: 'Choice B is direct: a clear subject (officials), an active verb (postponed), and the cause stated once. A is padded ("due to the fact that," "which had been scheduled"), C is a run-on with a comma splice, and D buries the action in nouns ("postponement... occurred"). Clarity means the shortest version that keeps the full meaning.'
        },
        {
          stem: 'Which sentence should come first in a paragraph? (1) They also carry seeds to new places. (2) Birds help forests in several ways. (3) This spreading of seeds lets new trees grow far from the parent tree. (4) Many birds eat insects that would damage leaves.',
          choices: ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'],
          answer: 1,
          explanation: 'Sentence 2 names the subject with a full noun ("Birds") and makes a broad claim ("in several ways") that the others develop. Sentence 1 starts with "They" and "also," which require something before them; sentence 3 starts with "This spreading," which must follow sentence 1. Sentence 4 is a specific detail, not an opener.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Name the relationship (addition, contrast, cause, time, example) before choosing a transition.
- A topic sentence states the subject and covers the whole paragraph.
- Unity: every sentence serves the paragraph's subject. True is not the same as relevant.
- Clarity: subject, verb, and object close together; no padding; no ambiguous pronouns.
- Order: full nouns first, pronouns and *this/these* after what they refer to, conclusion last.`
    }
  ]
});

// ---------------------------------------------------------------- SSAT 11
lessons.push({
  id: 'ssat-verbal-synonyms',
  test: 'ssat',
  section: 'verbal',
  skill: 'synonyms',
  title: 'SSAT Synonyms: Charge, Roots, and the Guessing Math',
  minutes: 14,
  level: 3,
  objectives: [
    'Decide when to guess using the SSAT scoring rule (+1 right, −1/4 wrong, 0 blank)',
    'Label the word\'s charge before reading the five choices',
    'Use roots and prefixes to unlock unfamiliar words',
    'Eliminate down to the best match among five choices'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'The SSAT synonym item and the scoring rule',
      md: `The SSAT Verbal section opens with 30 synonyms: a word in capitals and five choices. Pick the word closest in meaning.

**MERCURIAL**
(A) metallic (B) changeable (C) sluggish (D) heavy (E) polite

### The scoring rule, and why it matters
On the Middle and Upper Level SSAT, each correct answer earns **+1**, each wrong answer costs **−1/4**, and a blank scores **0**. (The Elementary Level has no penalty.)

Here is the math for a random guess among five choices: you win 1 point with probability 1/5 and lose 1/4 point with probability 4/5. Expected value = (1/5)(1) − (4/5)(1/4) = 1/5 − 1/5 = **0**. A pure blind guess neither helps nor hurts on average.

Now eliminate just **one** choice and guess among four: (1/4)(1) − (3/4)(1/4) = 1/4 − 3/16 = **+1/16**. Positive. Eliminate two and guess among three: (1/3) − (2/3)(1/4) = **+1/6**. 

**The rule:** if you can cross out even one choice with confidence, guess. If you truly cannot eliminate anything, leave it blank and move on.

### The underlying idea
As with every synonym item, you rarely need the dictionary definition. You need the word's **charge** (+/−/0) and **neighborhood**. Those two facts eliminate choices, and eliminating choices is what makes guessing profitable.`
    },
    {
      type: 'strategy',
      title: 'The 5-step method',
      md: `1. **Charge it.** Before looking at the choices, mark the capital word + , − , or 0. Use any memory of hearing it: "mercurial mood," "a mercurial leader" (unpredictable, so slightly −).
2. **Take it apart.** Prefix, root, suffix. *Mercurial* comes from Mercury, the fast-moving messenger god and the liquid metal that slides around; both suggest quick change.
3. **Sentence it.** Put the word in a short phrase you have heard, then test each choice in that phrase.
4. **Eliminate.** Cross out wrong charge, wrong neighborhood, wrong strength. Physically mark each elimination; it tells you whether guessing pays.
5. **Decide: answer, guess, or blank.** One or more eliminated → pick the best remaining. Zero eliminated → blank, move on. Never spend two minutes on one synonym; there are 30 of them.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** **CIRCUMVENT**
(A) surround (B) avoid (C) celebrate (D) invent (E) endure

**Step 1.** Charge. I have heard "circumvent the rules." That is slightly sneaky: getting around something. Charge: 0 to slightly −.

**Step 2.** Parts. *Circum-* means around (*circumference, circumstance*). *Vent* comes from *venire*, to come (*convene, intervene*). So: to come around something. To go around it.

**Step 3.** Sentence: "They circumvented the roadblock." Test the choices: "They *surrounded* the roadblock" changes the meaning. "They *avoided* the roadblock" keeps it. "They *celebrated* the roadblock" is nonsense. "They *invented* the roadblock" changes who made it. "They *endured* the roadblock" means they put up with it rather than got around it.

**Step 4.** I notice the trap: *surround* matches the root *circum* literally. Roots suggest meaning; they do not replace the sentence test. I eliminate (A), (C), (D), (E).

**Step 5.** One choice remains. **Answer: B.**

If I had only been able to eliminate (C) and (D), I would still guess among the other three, because two eliminations make the expected value positive.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** **BENIGN**
(A) harmful (B) gentle (C) ancient (D) clever (E) tiny

**Step 1 (done).** Charge: + . Doctors call a tumor "benign" when it is *not* dangerous.
**Step 2 (done).** *Ben-* means good: *benefit, benevolent, benediction*.

Now you finish: which choice has the wrong charge and is the planted opposite? Which choices are in the wrong neighborhood (age, intelligence, size)? Eliminate and pick.`,
      question: {
        stem: 'BENIGN',
        choices: ['harmful', 'gentle', 'ancient', 'clever', 'tiny'],
        answer: 1,
        explanation: 'Benign means harmless or kindly, so "gentle" is the closest match. "Harmful" is the planted antonym, which the positive root ben- rules out. "Ancient," "clever," and "tiny" are in the wrong neighborhoods (age, intelligence, size). Four eliminations leave one answer.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Leaving a question blank when you eliminated one choice.** That is a +1/16 you gave away. Over 30 items, selective guessing adds points.
- **Guessing with zero eliminations.** Expected value is zero and it costs time. Blank it.
- **Root literalism.** *Circum* = around, but *circumvent* is not *surround*. Roots point; the sentence decides.
- **The planted antonym.** One choice is often the opposite. A strong-feeling "match" may be the reverse.
- **Secondary meanings.** SSAT likes words with a common meaning and a less common one (*grave* = serious; *novel* = new; *champion* = to support). If the obvious meaning matches no choice, try the other meaning.
- **Over-strength.** *Content* is not *ecstatic*. Match intensity when two choices remain.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'On the Middle or Upper Level SSAT, you have eliminated one of five choices on a synonym item and must guess among the remaining four. What is the expected value of guessing?',
          choices: ['−1/4 point', '0 points', '+1/16 point', '+1/4 point', '+1 point'],
          answer: 2,
          explanation: 'With four choices left, you earn +1 with probability 1/4 and lose 1/4 with probability 3/4: (1/4)(1) − (3/4)(1/4) = 1/4 − 3/16 = +1/16. Positive, so guess. With all five choices still open the expected value would be exactly 0, which is why a single elimination is the threshold.'
        },
        {
          stem: 'AUSTERE',
          choices: ['luxurious', 'plain', 'noisy', 'distant', 'fragile'],
          answer: 1,
          explanation: 'Austere means severe, strict, or without decoration, so "plain" is the match. "Luxurious" is the planted antonym. "Noisy," "distant," and "fragile" fail the neighborhood test; none describes a lack of comfort or ornament. Charge (slightly negative, stern) rules out "luxurious" immediately.'
        },
        {
          stem: 'PROLIFIC',
          choices: ['productive', 'lazy', 'expensive', 'ancient', 'cautious'],
          answer: 0,
          explanation: 'Prolific means producing a great deal (a prolific writer publishes many books), so "productive" is the match. "Lazy" is the planted opposite. "Expensive," "ancient," and "cautious" are wrong neighborhoods. Root hint: pro- (forward) + a root related to offspring, as in "proliferate."'
        },
        {
          stem: 'TEDIOUS',
          choices: ['thrilling', 'boring', 'brief', 'difficult', 'hidden'],
          answer: 1,
          explanation: 'Tedious means long and tiresome, so "boring" is the match. "Thrilling" is the antonym trap. "Difficult" is a strength/neighborhood trap: a tedious task is dull, not necessarily hard. "Brief" is nearly the opposite in length, and "hidden" is unrelated.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Scoring: +1 right, −1/4 wrong, 0 blank. Blind guess = 0; one elimination = +1/16; two = +1/6.
- **Eliminate one, then guess. Eliminate none, leave it blank.**
- Charge the word, break it into parts, sentence it, test the five choices.
- Roots suggest; the sentence test decides.
- Expect a planted antonym and a secondary-meaning item or two.`
    }
  ]
});

// ---------------------------------------------------------------- SSAT 12
lessons.push({
  id: 'ssat-verbal-analogies',
  test: 'ssat',
  section: 'verbal',
  skill: 'analogies',
  title: 'SSAT Analogies: Full Pairs and Half-Analogies',
  minutes: 15,
  level: 3,
  objectives: [
    'Build a bridge sentence from the first pair and test all five choices against it',
    'Handle the half-analogy format in which only the first word of the answer pair is given',
    'Keep word order and relationship type fixed while testing choices',
    'Use elimination to make guessing profitable under the SSAT penalty'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Two formats, one skill',
      md: `The SSAT Verbal section has 30 analogies after the synonyms. They come in two shapes.

**Full-pair format.** The stem gives one complete pair and you choose a complete second pair:
*Kitten is to cat as*
(A) puppy is to dog (B) bird is to nest (C) cow is to milk (D) horse is to stable (E) fish is to water

**Half-analogy format.** The stem gives the first pair *and the first word of the second pair*; you choose only the last word:
*Kitten is to cat as lamb is to*
(A) wool (B) sheep (C) farm (D) goat (E) calf

### The underlying idea
Both formats test the same thing: can you state the relationship between the first two words as a precise sentence and find the pair that satisfies it? The half-analogy is actually easier, because the third word is fixed. The full-pair format is harder because each choice brings its own relationship and several will be tempting.

Five choices mean more distractors than on the HSPT. Precision in the bridge sentence matters more, not less.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Write the bridge from the first pair.** "A kitten is a young cat." Keep the words in order.
2. **Name the type.** Young/adult, part/whole, degree, function, category, cause/effect, antonym, synonym, worker/tool, characteristic, sequence, worker/workplace, object/material.
3. **Test the choices.**
   - Full-pair: read each choice through the bridge. "A puppy is a young dog." Yes. "A bird is a young nest." No.
   - Half-analogy: read the bridge with the given third word and each choice. "A lamb is a young ___." Sheep.
4. **Two survivors? Tighten the bridge.** None? Rewrite it, or check for a second meaning of one of the words.

**Elimination note.** Each choice you cross out makes guessing worthwhile under the −1/4 penalty. Cross them out on the page.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item (full-pair):** *Miser is to generous as*
(A) coward is to brave (B) thief is to dishonest (C) genius is to clever (D) hero is to famous (E) judge is to fair

**Step 1.** Bridge: "A miser is by definition *not* generous." I notice this is a person paired with a quality they lack. Type: **person / opposite characteristic**.

**Step 2.** I test each choice through that exact sentence.
- (A) "A coward is by definition not brave." Yes.
- (B) "A thief is by definition not dishonest." No; a thief *is* dishonest. Same shape, opposite direction. Trap.
- (C) "A genius is not clever." No.
- (D) "A hero is not famous." A hero may or may not be famous; no defining relationship.
- (E) "A judge is not fair." No; fairness is what a judge should have.

**Answer: A.** The trap is (B): it is person/characteristic, which is the right *family*, but it has the characteristic the person *has*, not lacks. Naming the type precisely ("opposite characteristic") caught it.

**Item (half-analogy):** *Conductor is to orchestra as*  *captain is to*
(A) ship (B) crew (C) ocean (D) uniform (E) officer

Bridge: "A conductor leads an orchestra." The orchestra is a *group of people*. "A captain leads a ___." *Ship* is tempting, but a ship is a vessel, not a group of people. "A captain leads a crew." **Answer: B.** The precise bridge (group of people, not a thing) separates (A) from (B).`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** *Drought is to rain as*
(A) flood is to water (B) famine is to food (C) winter is to snow (D) desert is to sand (E) storm is to wind

**Step 1 (done).** Bridge: "A drought is a long period *without* rain."
**Step 2 (done).** Type: condition caused by the **absence** of something.

Now test the five choices through "A ___ is a long period without ___." Watch for choices that pair a condition with something it has *too much* of; that is the reversed relationship.`,
      question: {
        stem: 'Drought is to rain as',
        choices: ['flood is to water', 'famine is to food', 'winter is to snow', 'desert is to sand', 'storm is to wind'],
        answer: 1,
        explanation: 'A drought is a long period without rain; a famine is a long period without food. The relationship is absence. "Flood is to water" and "storm is to wind" are conditions defined by too much of something, the reversed relationship, which is the trap. "Desert is to sand" and "winter is to snow" pair a thing with something it typically has.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Right family, wrong direction.** Person/has-quality vs. person/lacks-quality; too-much vs. too-little; part/whole vs. whole/part. State the direction in the bridge.
- **Same-topic distractors.** Captain → ship, ocean, uniform. Related to the third word but not related the *same way*.
- **Vague bridges.** "Is connected to" lets three choices through. If three fit, the bridge, not the choices, is the problem.
- **Second meanings.** *Bear, bark, fair, grave, novel, champion*. If no bridge works, switch meanings.
- **Grammatical mismatch.** If the first pair is noun : adjective, the answer pair should be noun : adjective. Choices that break the pattern are usually wrong.
- **Skipping elimination.** Even when unsure, cross out what cannot fit. It turns a blank into a profitable guess.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Author is to novel as',
          choices: ['reader is to library', 'composer is to symphony', 'actor is to stage', 'painter is to brush', 'editor is to mistake'],
          answer: 1,
          explanation: 'An author creates a novel; a composer creates a symphony. The bridge is creator : work created. "Painter is to brush" is creator : tool, "actor is to stage" is worker : workplace, and "reader is to library" is user : place, all same-topic distractors with a different relationship.'
        },
        {
          stem: 'Scalpel is to surgeon as chisel is to',
          choices: ['wood', 'sculptor', 'hammer', 'statue', 'workshop'],
          answer: 1,
          explanation: 'A scalpel is the cutting tool a surgeon uses; a chisel is the cutting tool a sculptor uses. This is the half-analogy format, so only the last word is chosen. "Wood" and "statue" are what the chisel works on or produces, "hammer" is another tool, and "workshop" is a place; none is the worker.'
        },
        {
          stem: 'Whisper is to shout as',
          choices: ['sleep is to dream', 'glance is to stare', 'song is to music', 'walk is to road', 'laugh is to joke'],
          answer: 1,
          explanation: 'A shout is a much louder, more forceful whisper; a stare is a much longer, more intense glance. The bridge is degree. "Laugh is to joke" is effect : cause, "song is to music" is member : category, and the others have no degree relationship.'
        },
        {
          stem: 'Reckless is to caution as',
          choices: ['generous is to wealth', 'honest is to truth', 'timid is to courage', 'brilliant is to intelligence', 'patient is to time'],
          answer: 2,
          explanation: 'A reckless person lacks caution; a timid person lacks courage. The bridge is quality : what it lacks. "Honest is to truth" and "brilliant is to intelligence" pair a quality with what it has, the reversed-direction trap. "Generous is to wealth" and "patient is to time" are loosely related but not defined by absence.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Both SSAT formats test the same thing: a precise bridge sentence, words in order.
- Half-analogy: the third word is fixed; read the bridge with it and each choice.
- Name the type *and* the direction (has vs. lacks, part vs. whole, too much vs. too little).
- Same-topic words are bait. Relationship beats association.
- Cross out every impossible choice; under the penalty, elimination is what makes guessing pay.`
    }
  ]
});

// ---------------------------------------------------------------- SSAT 13
lessons.push({
  id: 'ssat-writing-sample',
  test: 'ssat',
  section: 'writing',
  skill: 'writing',
  title: 'The SSAT Writing Sample: Choose, Plan, Write, Revise in 25 Minutes',
  minutes: 16,
  level: 3,
  objectives: [
    'Choose between the creative prompt and the essay prompt based on your strengths',
    'Follow a 3-18-4 minute plan so the sample is finished and clean',
    'Shape a story with a clear arc or an essay with a clear claim and examples',
    'Open strongly and show instead of tell'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What the Writing Sample is and who reads it',
      md: `The SSAT begins with a 25-minute Writing Sample. On the Middle and Upper Levels you choose **one of two prompts**:

- A **creative prompt**: a story starter such as "The door at the end of the hall had never been open before." You write a story that begins with that sentence.
- An **essay prompt**: a question such as "Is it better to be a leader or a follower? Support your position with examples." (On the Middle Level the second option is often a second creative starter rather than an essay.)

The Elementary Level gives a picture and 15 minutes to write a story about it.

### The one fact that changes how you write
The Writing Sample is **not scored**. A copy is sent to every school you apply to. Admissions readers see it *next to your application essays*, which were polished over weeks. They are asking: can this student think clearly and write a complete, controlled piece *alone, under time*?

So the goal is not brilliance. It is a **finished, organized, readable** piece with a beginning, middle, and end, in neat handwriting, with few errors. An ambitious story that stops mid-sentence hurts more than a modest story that lands.`
    },
    {
      type: 'strategy',
      title: 'Choosing the prompt, then the 3-18-4 plan',
      md: `### Choose in 30 seconds
- Pick the **story** if you can quickly picture one character with one problem in one place. Stories let you control everything.
- Pick the **essay** if you already have two real examples (from history, a book, or your own life) that support one side. Essays reward clear thinking over imagination.
- Never choose the prompt you think "sounds smarter." Choose the one you can *finish well*.

### Minutes 0-3: Plan (on scratch paper)
**Story:** Character + want + obstacle + turning point + ending. One line each.
**Essay:** Position in one sentence + two examples + one sentence on why the other side is weaker.

### Minutes 3-21: Write (18 minutes)
Four to five paragraphs. Write the opening you planned, then move; do not re-read until the end. Skip a line if you get stuck on a word and keep going.

### Minutes 21-25: Revise (4 minutes)
Read it once. Fix: missing words, run-ons, capitalization, a weak last line. Cross out neatly with one line. Make sure the ending is actually on the page.`
    },
    {
      type: 'concept',
      title: 'Story arc, show-don\'t-tell, strong openings',
      md: `### The five-beat arc (story)
1. **Normal world:** one or two sentences placing the character.
2. **Problem arrives:** something the character wants or must deal with.
3. **Attempt and complication:** the first try makes it worse or reveals something.
4. **Turning point:** a decision or discovery.
5. **Landing:** the result, plus one sentence that shows what changed.

Keep it small. One character, one afternoon, one problem. Big plots do not fit in 18 minutes.

### Show, don't tell
*Telling:* "Jonah was nervous." *Showing:* "Jonah wiped his palms on his jeans for the third time." Showing gives the reader an image and a reason to trust the emotion. Use it at the two or three moments that matter most, not every line.

### Strong openings
- **In the middle of action:** "The bus pulled away just as I reached the corner."
- **A specific image:** "Three cracked flowerpots sat on the windowsill, each holding nothing but dirt."
- **A line of dialogue:** "'You're not going to believe what's in the shed,' my sister said."
Avoid: "This is a story about..." and "Have you ever wondered..."

### Essay shape
Paragraph 1: hook + position. Paragraphs 2-3: one example each, with a sentence explaining *how* it proves the point. Paragraph 4: the other side in one sentence, and why your side still wins. Paragraph 5: two-sentence close that restates the position in new words.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud): planning a story in 3 minutes',
      md: `**Prompt:** Begin your story with: *"The note was still taped to the locker when I came back."*

**0:00.** I notice the starter has a *note* and a *locker*, and the narrator *came back*, so they left and returned. I will not fight the prompt; I will use what it gives me. Who left the note? What does the narrator fear it says?

**0:30. Character + want.** Narrator: Eli, 8th grade. Want: he wants the note to be from his friend Dev, who has not spoken to him since Eli skipped Dev's science fair to go to a game.

**1:00. Obstacle.** Eli is afraid to open it. He walks past it twice.

**1:30. Complication.** He finally opens it. It is not an apology or an accusation. It is Dev's science fair score sheet with "2nd place" circled and nothing else written.

**2:00. Turning point.** Eli realizes Dev is not angry; Dev wanted him there. The silence was hurt, not anger. Eli decides to go find Dev instead of writing back.

**2:30. Landing.** He finds Dev at the bike rack. He says, "Second place. I should have seen it." Dev shrugs, then hands him the second helmet. They ride.

**3:00.** I have five beats on paper. Opening sentence is given. First *showing* moment: Eli's hand on the tape. Second: Dev handing over the helmet instead of answering. I write.

Notice what I did not do: no villains, no twist ending, no second location. One problem, one afternoon, one change.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Prompt:** *"Is it more important to be honest or to be kind?"*

**Plan so far (2 minutes in):**
- Position: Honesty, because kindness without honesty is temporary.
- Example 1: A friend who tells you your science project has a flaw before the fair, not after.
- Example 2: A historical or book example of a leader who told the truth when it was unpopular.

Now finish the plan: what one sentence would you give the *other side*, and how does your position still win? Then pick the opening line. Which of these is the strongest hook for this essay?`,
      question: {
        stem: 'Which opening line is the strongest hook for an essay arguing that honesty matters more than kindness?',
        choices: ['In this essay I will explain why honesty is more important than kindness.', 'Honesty and kindness are both very important values that people have.', 'The kindest thing my best friend ever did was tell me my project was going to fail.', 'Have you ever wondered whether honesty or kindness is more important?', 'Honesty is defined as telling the truth, and kindness is defined as being nice to people.'],
        answer: 2,
        explanation: 'Choice C opens with a specific, slightly surprising image that already contains the argument (a hard truth was the kindness). Choice A announces the essay instead of starting it, choice B is a vague statement that takes no position, and choice D is the overused "Have you ever wondered" opener that admissions readers see constantly.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Not finishing.** The most damaging error. Plan small, watch the clock, and leave 4 minutes.
- **Choosing the "impressive" prompt.** Readers prefer a clean, finished piece to an ambitious broken one.
- **Changing the starter.** For the creative prompt, your first sentence must be the one given, exactly.
- **Too many characters or scenes.** One problem, one place. Depth over breadth.
- **Telling the emotion every line.** Pick two or three moments to show; let the rest move.
- **No paragraph breaks.** A wall of text looks unplanned. Indent four or five times.
- **Illegible handwriting and no revision.** Readers cannot credit what they cannot read. Write a little slower than your fastest.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'How is the SSAT Writing Sample used?',
          choices: ['It is scored from 1 to 6 and added to the Verbal score.', 'It is not scored, but a copy is sent to each school you apply to.', 'It is scored only if the student chooses the essay prompt.', 'It is read only by the test company and never shared.', 'It is scored by the schools using their own rubric and counted as a test section.'],
          answer: 1,
          explanation: 'The Writing Sample receives no score. Schools receive a copy and read it alongside the rest of your application to see how you write unassisted under time. That is why a finished, organized, legible piece matters more than a dazzling but incomplete one.'
        },
        {
          stem: 'A student has 25 minutes for the Writing Sample. Which time plan best follows the recommended approach?',
          choices: ['Write for 25 minutes without stopping.', 'Plan for 10 minutes, write for 15 minutes.', 'Plan for 3 minutes, write for 18 minutes, revise for 4 minutes.', 'Write for 20 minutes, then rewrite a clean copy in 5 minutes.', 'Plan for 1 minute, write for 12 minutes, revise for 12 minutes.'],
          answer: 2,
          explanation: 'The 3-18-4 plan gives a short written outline, enough time to finish four or five paragraphs, and a final pass to fix errors and confirm the ending is on the page. Writing with no plan risks a shapeless piece; planning for 10 minutes or revising for 12 leaves too little time to write; a clean recopy is impossible in 5 minutes.'
        },
        {
          stem: 'Which sentence best "shows" rather than "tells" that a character is exhausted?',
          choices: ['Maria was extremely exhausted after the race.', 'Maria felt very tired and worn out.', 'Maria\'s legs folded under her and she sat down on the curb, still holding her water bottle unopened.', 'Maria was so exhausted that she could not even describe how exhausted she was.', 'Everyone could see that Maria was tired.'],
          answer: 2,
          explanation: 'Choice C gives concrete actions (legs folding, sitting on the curb, the unopened bottle) from which the reader infers exhaustion. Every other choice names the emotion directly, which is telling. The unopened bottle is a small detail that implies she is too tired even to drink.'
        },
        {
          stem: 'The creative prompt says to begin your story with "The lights went out just as the music started." Which approach best follows the instructions and the recommended story method?',
          choices: ['Start with a different, better sentence and work the given line in later.', 'Use the sentence as your first line and write about one character dealing with one problem during the blackout.', 'Use the sentence as a title and write an essay about electricity.', 'Use the sentence as your first line and introduce five characters so the story feels full.', 'Explain in the first paragraph what the story will be about, then begin with the sentence.'],
          answer: 1,
          explanation: 'The creative prompt requires the given sentence as the exact first line, and the 18-minute writing window favors one character, one problem, one place. Changing the starter, turning it into an essay, or opening with a summary all break the instructions, and five characters cannot be developed in the time available.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Unscored, but sent to schools: finished and clean beats ambitious and broken.
- Choose the prompt you can finish well, not the one that sounds smarter.
- 3 minutes plan, 18 write, 4 revise. Leave the revision time.
- Story: one character, one problem, five beats, land the ending. Essay: position, two examples, other side in one line, close.
- Open with action, image, or dialogue. Show emotion at the moments that matter.`
    }
  ]
});

// ---------------------------------------------------------------- SSAT 14
lessons.push({
  id: 'ssat-reading-main-idea',
  test: 'ssat',
  section: 'reading',
  skill: 'main-idea',
  title: 'SSAT Reading: Main Idea in Prose and Poetry',
  minutes: 15,
  level: 3,
  objectives: [
    'Find the main idea of a prose passage by tracking what each paragraph does',
    'Paraphrase a poem stanza by stanza in plain language before answering',
    'Separate the speaker of a poem from the poet',
    'Distinguish literal statements from figurative ones and choose the main idea at the right level'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What makes SSAT reading different',
      md: `The SSAT Reading section gives you about 7 or 8 passages and 40 questions in 40 minutes. Passages are short (roughly 250-350 words) and come from fiction, nonfiction, essays, and, unlike the HSPT and ISEE, **poetry**. Expect one poem, sometimes two.

Main idea questions are the most common type: "The passage is primarily about," "The main purpose of the passage is to," "Which title best fits," and, for poems, "The poem is mainly about."

### The underlying idea
The main idea is the one sentence the *whole* passage exists to support. It is not the most interesting sentence or the first sentence. For prose, you find it by asking what each paragraph *does* and then what they add up to. For poetry, you find it the same way, but each stanza is a paragraph, and you must first **translate** the figurative language into plain statements, because the poem's "topic" is often not what its images are literally about.`
    },
    {
      type: 'concept',
      title: 'Reading a poem on a test',
      md: `### Paraphrase stanza by stanza
After each stanza, write three to six plain words in the margin: "speaker misses old house," "remembers garden," "accepts moving on." The poem's main idea is what those notes add up to.

### Speaker vs. poet
The **speaker** is the voice inside the poem, a character. The **poet** is the person who wrote it. A poem in the voice of a tired soldier was not necessarily written by a soldier. Questions say "the speaker," and the answer must come from the words in the poem, never from what you know or guess about the author.

### Literal vs. figurative
A poem may say "the sea swallowed the sun." Literally false; figuratively, the sun set over the water. When a line sounds impossible, it is figurative. Ask: what ordinary event or feeling is this image standing for?

The main idea of a poem is almost always about a **feeling, realization, or human situation**, not about the literal objects. A poem full of winter images is usually about loss, waiting, or endurance, not about weather.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Read with a pencil.** After every paragraph or stanza, write a three-to-six-word note on what it *does* (introduces a problem, gives an example, shifts to the opposite view, resolves).
2. **Sum the notes into one sentence.** Start with "The author/speaker wants me to understand that..." If your sentence covers only one paragraph, widen it.
3. **Predict the answer, then read the choices.** Match your sentence, not the passage's most memorable phrase.
4. **Eliminate by scope.** Too narrow: states one paragraph's point or one image. Too broad: could describe a different passage on the same topic. Wrong angle: mentions the right topic but a different claim. The answer is the one that is neither narrower nor wider than the passage.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud): a short poem',
      md: `**Poem:**
*My grandfather's hands were maps of the farm,*
*each scar a field, each callus a road he had walked.*
*He never spoke of the drought years;*
*his hands spoke for him.*

*Now my own hands are smooth as new paper.*
*I turn them over under the kitchen light*
*and wonder what roads they will learn,*
*and whether anyone will read them.*

**Question:** The poem is mainly about
(A) the hardships of farming during a drought
(B) a grandfather who refused to talk about his past
(C) the speaker's wish to live a life as meaningful as the grandfather's
(D) the differences between old people and young people
(E) how hands become scarred through physical work

**Step 1.** Stanza 1 note: "grandfather's hands show his hard life." I notice "maps of the farm" is figurative; hands are not maps. It means his hands *record* his work. Stanza 2 note: "speaker's hands are blank; wonders what life they'll show."

**Step 2.** Sum: "The speaker looks at the grandfather's work-worn hands and wonders whether the speaker's own life will leave a mark worth reading."

**Step 3.** I check the speaker vs. poet question: the "I" is a grandchild. I do not need to know who wrote it.

**Step 4.** (A) is too narrow and too literal: the drought is one line. (B) is one detail from stanza 1 and misses stanza 2 entirely. (D) is too broad; the poem is about one specific pair and one specific wish. (E) is literal; it treats the images as the subject. (C) covers both stanzas and names the feeling the images stand for. **Answer: C.**`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Passage (prose):**
*For most of the nineteenth century, lighthouse keepers lived in near-total isolation. Supplies arrived by boat every few months, weather permitting. Keepers kept logbooks recording every ship that passed, every storm, and every lamp they trimmed.*

*Yet the logbooks reveal something unexpected. Between the dry entries about wind direction, keepers pressed flowers, sketched birds, and copied poems. One keeper on a rock off Maine recorded the first day each spring that he heard a songbird. He did so for thirty-one years.*

*Historians once read these logs for data about shipping. Today they read them for something else: evidence of how people build a full inner life in a place that offers almost nothing.*

**Step 1 (done).** Paragraph notes: (1) "keepers isolated, kept logs." (2) "but logs show flowers, birds, poems: inner life." (3) "historians now read logs for how people stay human in isolation."
**Step 2 (half done).** The word "Yet" at the start of paragraph 2 signals the passage's real point begins there. Finish the summary sentence, then choose.`,
      question: {
        stem: 'The passage is primarily about',
        choices: ['the dangers lighthouse keepers faced during storms', 'how one keeper in Maine tracked the arrival of songbirds each spring', 'what lighthouse logbooks reveal about how isolated people sustained rich inner lives', 'why historians no longer study nineteenth-century shipping records', 'the daily duties required to maintain a lighthouse lamp'],
        answer: 2,
        explanation: 'Paragraph 2 ("Yet...") turns the passage toward its real claim, and paragraph 3 states it: the logs show how people built an inner life in isolation. Choice C covers all three paragraphs. Choice B is a single example (too narrow). Choices A and E are details from paragraph 1 only. Choice D distorts paragraph 3; historians still study the logs, just for a different purpose.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **First-sentence trap.** The opening often sets up a view the passage then complicates. Watch for *yet, but, however* in paragraph 2.
- **Literal reading of a poem.** If the answer choice is about the objects in the images (hands, winter, the sea), it is probably the literal trap. The main idea is the feeling or realization.
- **Speaker = poet.** The speaker is a character. Answer from the poem's words only.
- **Most vivid detail as main idea.** The thirty-one years of songbirds is memorable. It is an example, not the point.
- **Too-broad choices.** "The differences between old and young people" could head a thousand passages. The answer fits *this* one.
- **Guessing with no eliminations.** The −1/4 penalty applies in Reading too. Eliminate the too-narrow and too-broad choices first, then guess if needed.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'A poem describes a sailor returning home after years at sea, written in the first person. A question asks what "the speaker" feels on seeing the harbor. Where must the answer come from?',
          choices: ['From what is known about the poet\'s own life at sea', 'From the words and images of the poem itself', 'From the typical feelings of sailors in literature', 'From the title of the collection the poem appeared in', 'From the reader\'s own experience of coming home'],
          answer: 1,
          explanation: 'The speaker is a voice created inside the poem, separate from the poet. Questions about the speaker are answered only from the poem\'s text. Biography, genre expectations, and personal experience are outside knowledge and are exactly what the wrong answers are built from.'
        },
        {
          stem: 'A stanza reads: "The clock on the wall / has forgotten how to hurry; / each minute leans against the next / like tired cattle at a gate." The stanza most nearly means that',
          choices: ['the clock is broken and needs repair', 'the speaker is on a farm with cattle', 'time feels slow and heavy to the speaker', 'the speaker is late for an appointment', 'minutes are shorter than they used to be'],
          answer: 2,
          explanation: 'Clocks do not forget and minutes do not lean, so the lines are figurative. The images (forgetting how to hurry, tired cattle) stand for the feeling that time is dragging. Choices A and B read the images literally; D and E contradict the sense of slowness.'
        },
        {
          stem: 'A three-paragraph passage describes how a town built a bridge (paragraph 1), how the bridge changed trade (paragraph 2), and how the town later outgrew it and built a second bridge (paragraph 3). Which title best fits the passage?',
          choices: ['How Bridges Are Built', 'The Day the First Bridge Opened', 'A Town Shaped by Its Bridges', 'Trade in the Nineteenth Century', 'Why the First Bridge Failed'],
          answer: 2,
          explanation: 'Choice C covers all three paragraphs: building, change, and growth. "How Bridges Are Built" and "Trade in the Nineteenth Century" are too broad and could title other passages. "The Day the First Bridge Opened" is one paragraph only. "Why the First Bridge Failed" distorts paragraph 3; the town outgrew the bridge, which is not failure.'
        },
        {
          stem: 'A passage opens: "Most people believe that memory works like a video recording." The second paragraph begins with "In fact." What should a careful reader expect?',
          choices: ['The passage will give examples of memories that work like recordings.', 'The passage will explain how to record memories more accurately.', 'The passage will contradict the opening belief and present a different view of memory.', 'The passage will shift to a new topic unrelated to memory.', 'The passage will summarize the first paragraph in different words.'],
          answer: 2,
          explanation: '"Most people believe" sets up a common view, and "In fact" signals a correction. The main idea will be the author\'s contrasting view, not the opening sentence. Readers who stop at sentence one fall for the first-sentence trap on the main idea question.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Write a note after every paragraph or stanza; the main idea is what the notes add up to.
- Watch for *yet, but, in fact* at the start of paragraph 2; the real point often begins there.
- Poems: paraphrase into plain language, treat impossible lines as figurative, and answer about the speaker from the text only.
- Eliminate by scope: too narrow (one paragraph or image), too broad (any passage on the topic), wrong angle.
- The main idea is usually a feeling or realization for poems and a claim for prose, not the most vivid detail.`
    }
  ]
});

// ---------------------------------------------------------------- ISEE 15
lessons.push({
  id: 'isee-verbal-sentence-completion',
  test: 'isee',
  section: 'verbal',
  skill: 'sentence-completion',
  title: 'ISEE Sentence Completion: Find the Clue, Predict, Then Look',
  minutes: 15,
  level: 3,
  objectives: [
    'Identify the four context-clue types: contrast, cause, definition, and example',
    'Predict a word for the blank before reading the choices',
    'Solve double-blank items by eliminating on whichever word fails',
    'Use the no-penalty rule to answer every item'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'How sentence completions work',
      md: `The ISEE Verbal Reasoning section has two parts: synonyms and sentence completions. A sentence completion gives a sentence with one blank (two blanks on the Upper Level) and four choices:

*Although the lecture was long, the audience remained ------ throughout.*
(A) restless (B) attentive (C) absent (D) confused

### The underlying idea
The sentence always contains a **clue** that determines the blank. The test writers must make exactly one answer correct, so they plant the clue deliberately. Your job is to find it before you read the choices, because the wrong choices are written to sound fine if you read the sentence loosely.

Here the clue is *Although*, which signals contrast: the lecture was long (which would make people lose focus), *but* the audience stayed... focused. Prediction: "focused." Match: *attentive*.

### Scoring
The ISEE has **no guessing penalty**. Every item should have an answer. The method below is for getting it right; when time runs short, pick anything and move on.`
    },
    {
      type: 'concept',
      title: 'The four clue types',
      md: `### 1. Contrast
Signal words: *although, but, however, yet, despite, even though, unlike, while, instead of.* The blank is the **opposite** of what the other part says.
*Unlike his talkative brother, Sam was ------.* → quiet.

### 2. Cause and effect
Signal words: *because, since, therefore, so, as a result, consequently, thus.* The blank **follows logically** from the other part.
*Because the bridge was ------, the town closed it to traffic.* → unsafe.

### 3. Definition or restatement
Signal words: a comma or dash followed by an explanation; *that is, in other words, which means*; or a second half that re-says the first.
*The scientist was known for her ------, a careful attention to every detail.* → precision.

### 4. Example
Signal words: *for example, for instance, such as, including.* The blank is the **general word** that the example illustrates.
*The chef's ------ dishes, such as chocolate-chili soup, surprised the diners.* → unusual.

Also watch **tone words** elsewhere in the sentence (*unfortunately, happily, surprisingly*): they tell you the blank's charge.`
    },
    {
      type: 'strategy',
      title: 'The 5-step method',
      md: `1. **Cover the choices.** Read the full sentence once.
2. **Find the clue and the signal word.** Underline the signal (*although, because, such as*) and the phrase that defines the blank.
3. **Name the relationship.** Contrast, cause, definition, or example.
4. **Predict.** Write a plain word (or a + / − sign) above the blank. "Focused." "Unsafe." "Careful."
5. **Uncover and match.** Choose the closest to your prediction. If none match, eliminate by charge, then re-check the signal word; you may have misread the relationship.

### Double blanks (Upper Level)
Do the *easier* blank first, whichever one has the clearer clue. Eliminate every choice whose word for that blank fails. Then test only the survivors on the second blank. A choice is wrong if **either** word fails; you rarely need to evaluate all eight words.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** *The committee\'s decision was so ------ that even members who had voted for it could not explain its reasoning.*
(A) popular (B) puzzling (C) prompt (D) generous

**Step 1.** Choices covered. I read the sentence.

**Step 2.** I notice "so ------ that," which sets up a cause and effect: the blank *causes* the result after "that." The result: even supporters could not explain the reasoning.

**Step 3.** Relationship: cause and effect. What quality of a decision would make its own supporters unable to explain it?

**Step 4.** Prediction: "confusing." Charge: negative-ish.

**Step 5.** Uncover. *Popular*: being popular would not stop people from explaining it. Out. *Puzzling*: matches "confusing." *Prompt*: speed has nothing to do with explaining reasoning. Out. *Generous*: a generous decision could easily be explained. Out. **Answer: B.**

The trap is *popular*: the sentence mentions people who voted for it, so a careless reader connects "voted for" to "popular." The clue is the *result* after "that," not the voters.

**Double-blank example:** *Although the review was ------ , the director found one ------ comment buried in its final paragraph.*
(A) harsh .. critical (B) favorable .. helpful (C) scathing .. encouraging (D) brief .. lengthy

I do blank 1 first? Actually blank 2 has the stronger clue: "buried," "one," and "Although" say the second comment contrasts with the review as a whole. Try blank 2 with contrast in mind: the review and the one comment must be opposites. (A) harsh/critical: same direction. Out. (B) favorable/helpful: same direction. Out. (D) brief/lengthy: contrast in length, but a "lengthy comment" buried in a paragraph is odd, and the review's brevity has no link to finding a comment. (C) scathing/encouraging: a harsh review with one encouraging comment. **Answer: C.**`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** *Because the trail markers had faded, the hikers found the route ------ to follow.*
(A) simple (B) difficult (C) pleasant (D) familiar

**Step 2 (done).** Signal word: *Because*. Clue phrase: "trail markers had faded."
**Step 3 (done).** Relationship: cause and effect. Faded markers cause the route to be... what?

Now predict a word, then uncover and match. One choice is the exact opposite of your prediction; that is the planted trap.`,
      question: {
        stem: 'Because the trail markers had faded, the hikers found the route ------ to follow.',
        choices: ['simple', 'difficult', 'pleasant', 'familiar'],
        answer: 1,
        explanation: '"Because" signals cause and effect: faded markers make a route hard to follow, so "difficult" fits. "Simple" is the planted opposite for students who skip the clue. "Pleasant" and "familiar" ignore the cause entirely; neither follows from faded markers.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Reading the choices first.** Every wrong choice "sounds okay" in isolation. Predict first.
- **Missing the signal word.** *Although* and *because* point in opposite directions. One word changes the answer.
- **Connecting to the wrong part of the sentence.** The clue is the phrase that *logically determines* the blank, not the nearest noun.
- **The planted opposite.** It is always there. If you did not find a clue, you will choose it half the time.
- **Double blanks evaluated word by word for every choice.** Eliminate on one blank first; it halves the work.
- **Leaving blanks.** No penalty on the ISEE. Always answer.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Despite her ------ manner in public, the senator was known among her staff for her warmth and humor.',
          choices: ['friendly', 'reserved', 'careless', 'energetic'],
          answer: 1,
          explanation: '"Despite" signals contrast with "warmth and humor," so the public manner must be the opposite: reserved (cool, formal). "Friendly" is the planted same-direction trap. "Careless" and "energetic" are not opposites of warm and humorous.'
        },
        {
          stem: 'The museum\'s collection is remarkably ------, including everything from ancient coins to modern video art.',
          choices: ['narrow', 'valuable', 'diverse', 'fragile'],
          answer: 2,
          explanation: '"Including everything from... to..." is an example clue; the examples show a wide range, so the general word is "diverse." "Narrow" is the opposite. "Valuable" and "fragile" might be true of a collection but are not what the examples illustrate.'
        },
        {
          stem: 'The speaker\'s argument was ------: it rested on a single study that had never been repeated.',
          choices: ['persuasive', 'flimsy', 'lengthy', 'original'],
          answer: 1,
          explanation: 'The colon introduces a restatement: the second half explains the first. An argument built on one unrepeated study is weak, so "flimsy" fits. "Persuasive" contradicts the explanation. "Lengthy" and "original" are not what the colon clause describes.'
        },
        {
          stem: 'Because the evidence was ------, the jury reached a verdict ------ and without debate.',
          choices: ['confusing .. slowly', 'overwhelming .. quickly', 'limited .. unanimously', 'convincing .. reluctantly'],
          answer: 1,
          explanation: 'The second blank has the clearer clue: "and without debate" means the verdict came fast, so eliminate "slowly" (A) and "reluctantly" (D). Between the survivors, "Because" requires a cause: overwhelming evidence leads to a quick verdict (B), while limited evidence (C) would not. Eliminating on one blank first left only two choices to test.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- The clue is planted. Find the signal word and the phrase that determines the blank.
- Four relationships: contrast (*although, but*), cause (*because, so*), definition (comma, colon, *that is*), example (*such as, including*).
- Cover the choices, predict a plain word, then match.
- Double blanks: solve the clearer blank first and eliminate; a choice fails if either word fails.
- No penalty: answer every item.`
    }
  ]
});

// ---------------------------------------------------------------- ISEE 16
lessons.push({
  id: 'isee-verbal-synonyms',
  test: 'isee',
  section: 'verbal',
  skill: 'synonyms',
  title: 'ISEE Synonyms: Fast, Precise Matching',
  minutes: 12,
  level: 3,
  objectives: [
    'Apply a fixed 20-second routine to each one-word synonym item',
    'Use charge, word parts, and a sentence to narrow four choices',
    'Recognize secondary meanings and near-miss distractors',
    'Answer every item, since the ISEE has no guessing penalty'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'The ISEE synonym item',
      md: `The first half of ISEE Verbal Reasoning is synonyms: a word in capitals, four choices, no sentence, no context.

**ADVERSARY**
(A) ally (B) opponent (C) judge (D) stranger

Unlike the HSPT, the ISEE asks only for synonyms, never antonyms. Unlike the SSAT, there are four choices and **no penalty**: a blank and a wrong answer cost the same (nothing), so a blank is simply a lost chance.

### The underlying idea
With no context, you have two sources of information: what you know about the **word** (charge, parts, where you have heard it) and what you know about the **choices** (which ones cannot be synonyms of the word). Work both ends. You will often recognize that three choices cannot be right before you can define the word itself.`
    },
    {
      type: 'strategy',
      title: 'The 20-second routine',
      md: `1. **Charge** (3 seconds). Mark + , − , or 0 next to the capital word. Guess if you must; a hunch beats nothing.
2. **Parts and echoes** (5 seconds). Prefix, root, suffix. Where have you heard it? "His *adversary* in the final match." *Adverse* conditions are *against* you. *Ad-vers-* = turned toward/against.
3. **Sentence** (5 seconds). Say a short phrase with the word, swap in the choices.
4. **Eliminate and pick** (7 seconds). Cross out wrong charge, wrong neighborhood, planted opposite. Choose the best of what is left. Circle it and go.

If the word is completely unfamiliar after step 2, go straight to step 4 and eliminate from the choices' side: which choices are antonyms of each other? (One of those is often the answer.) Which is the odd one out?`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Item:** **METICULOUS**
(A) careless (B) thorough (C) wealthy (D) anxious

**Step 1.** Charge. I have heard "meticulous notes" and "a meticulous planner" as praise. Charge: +.

**Step 2.** Parts: nothing obvious, but the echo is strong: meticulous people check every detail.

**Step 3.** Sentence: "She kept meticulous records." Swap: "careless records" reverses it; "thorough records" keeps it; "wealthy records" is nonsense; "anxious records" is nonsense.

**Step 4.** I notice *careless* and *thorough* are opposites of each other, which is a strong sign one of them is the answer. The charge is +, so *thorough*. **Answer: B.**

**Second item, unfamiliar word:** **GARRULOUS**
(A) silent (B) talkative (C) angry (D) tall

Suppose I have never seen it. Step 4 from the choices' side: *silent* and *talkative* are opposites, so the answer is probably one of them. *Angry* and *tall* are odd ones out. Now a hunch: *garrulous* sounds like *gargle*, something done with the mouth, and the word is long and rolling. I pick *talkative*. That is correct, and even if the hunch were wrong, picking between two gives a 50% chance instead of 25%.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Item:** **FORTIFY**
(A) weaken (B) strengthen (C) decorate (D) abandon

**Step 1 (done).** Charge: + (a *fort* is built to protect).
**Step 2 (done).** Root: *fort* = strong (*fortress, effort, comfort*). Suffix *-ify* = to make (*simplify, clarify*).

Now finish: put the pieces together into a meaning, identify the planted opposite, and pick.`,
      question: {
        stem: 'FORTIFY',
        choices: ['weaken', 'strengthen', 'decorate', 'abandon'],
        answer: 1,
        explanation: 'Fort (strong) + -ify (to make) = to make strong: strengthen. "Weaken" is the planted opposite. "Decorate" and "abandon" are things you might do to a building, a same-topic trap from the word "fort," but neither means to make strong.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Leaving it blank.** No penalty. Even a 25% guess is better than a guaranteed zero.
- **The planted opposite.** Look for the pair of choices that are antonyms of each other; the answer is usually one of them, and charge tells you which.
- **Secondary meanings.** *Grave* (serious), *novel* (new), *sound* (healthy, as in "sound advice"), *temper* (to soften). If the common meaning matches nothing, the test wants the other one.
- **Same-topic words.** *Fortify* → decorate, abandon (things done to buildings). Related topic is not related meaning.
- **Sound-alikes.** *Indignant* (angry) is not *indigent* (poor). *Complement* is not *compliment*.
- **Overthinking.** Twenty seconds. The synonyms section is where time is saved for sentence completions.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'CONCISE',
          choices: ['lengthy', 'brief', 'confusing', 'formal'],
          answer: 1,
          explanation: 'Concise means saying a lot in few words, so "brief" is the match. "Lengthy" is the planted opposite; the antonym pair (lengthy/brief) flags where the answer lives. "Confusing" and "formal" describe other qualities of writing.'
        },
        {
          stem: 'HOSTILE',
          choices: ['welcoming', 'unfriendly', 'nervous', 'distant'],
          answer: 1,
          explanation: 'Hostile means showing strong dislike or opposition, so "unfriendly" is the match. "Welcoming" is the planted opposite. "Distant" is a near-miss: a distant person is cool but not necessarily opposed. "Nervous" is a different neighborhood.'
        },
        {
          stem: 'NOVEL',
          choices: ['fictional', 'lengthy', 'new', 'famous'],
          answer: 2,
          explanation: 'As an adjective, novel means new or original ("a novel idea"). "Fictional" is the secondary-meaning trap, drawn from the noun "a novel." "Lengthy" and "famous" are also qualities people associate with books, which makes them same-topic distractors rather than synonyms.'
        },
        {
          stem: 'DILIGENT',
          choices: ['lazy', 'hardworking', 'clever', 'cheerful'],
          answer: 1,
          explanation: 'Diligent means showing steady, careful effort, so "hardworking" is the match. "Lazy" is the planted opposite. "Clever" is a near-miss (a diligent student is not necessarily clever), and "cheerful" is a different trait entirely.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Charge, parts, sentence, eliminate: twenty seconds per item.
- Find the antonym pair among the choices; the answer is usually one of them, and charge decides.
- Same-topic and sound-alike choices are bait.
- When the common meaning matches nothing, try the secondary meaning.
- No penalty: never leave a synonym blank.`
    }
  ]
});

// ---------------------------------------------------------------- ISEE 17
lessons.push({
  id: 'isee-essay-writing',
  test: 'isee',
  section: 'essay',
  skill: 'writing',
  title: 'The ISEE Essay: 30 Minutes to Show Schools How You Think',
  minutes: 15,
  level: 3,
  objectives: [
    'Understand what the ISEE essay is, how it is used, and what readers look for',
    'Plan a four- or five-paragraph response in four minutes',
    'Support a position with specific, concrete examples rather than general claims',
    'Write in a clear personal voice and leave time to revise'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What the ISEE essay is',
      md: `The ISEE ends with a 30-minute essay. You get one prompt, usually a personal or expository question:

- *"If you could change one rule at your school, what would it be and why?"*
- *"Describe a person who has influenced you and explain how."*
- *"What is one skill everyone should learn? Explain your answer."*

You write by hand on two lined pages. There is no choice of prompt.

### How it is used
The essay is **not scored**. A copy goes to every school that receives your ISEE results. Admissions officers read it alongside your application, which means they are comparing your 30-minute, unedited writing with essays you had weeks to polish. They want to know: can this student organize a thought, support it, and write clearly without help?

### The underlying idea
The essay prompt asks a simple question. Readers do not want a surprising answer; they want a **clear answer supported by specific evidence, in a voice that sounds like a real student**. "Specific" is the whole game. "My coach taught me discipline" is a claim. "My coach made us re-rack every weight before we could leave, even on the night we won the league" is evidence.`
    },
    {
      type: 'strategy',
      title: 'The 4-22-4 plan and the paragraph map',
      md: `### Minutes 0-4: Plan
1. Restate the question in your own words. Make sure you answer *all* of it (many prompts have two parts: *what* and *why*).
2. Write your answer in one sentence. That is your thesis.
3. List two or three specific examples. Prefer real moments from your own life over general statements; they are easier to make specific.
4. Jot one closing idea: what this shows about you or why it matters beyond you.

### Minutes 4-26: Write
- **Paragraph 1 (3-4 sentences):** a concrete opening image or moment, then your thesis.
- **Paragraphs 2 and 3 (5-7 sentences each):** one example per paragraph. Describe the moment with detail (who, where, what happened), then one or two sentences explaining what it shows.
- **Optional paragraph 4:** a third example, or a short acknowledgment of another view.
- **Last paragraph (2-3 sentences):** return to the opening image or thesis and say why it matters.

### Minutes 26-30: Revise
Read once. Fix missing words, run-ons, spelling of common words, and the ending. Make sure every paragraph is indented.

Write in a voice you actually use. Avoid words you would not say out loud; readers can tell.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud): planning in 4 minutes',
      md: `**Prompt:** *"Describe an activity you enjoy that others might find boring. Explain why you enjoy it."*

**0:00.** I notice two parts: *describe* the activity and *explain why*. If I only describe, I have answered half.

**0:30. Thesis.** "I enjoy sorting and organizing my grandmother's button collection, which most people would find tedious, because it is the one time my mind gets completely quiet."

**1:00. Example 1 (describe).** The buttons: three coffee cans, maybe two thousand buttons, brass military ones, tiny pearl ones, a cracked red one shaped like a strawberry. I sort by color first, then size. Concrete detail: the sound of them pouring onto the table.

**2:00. Example 2 (why).** The night before a big test last spring I could not sleep. I sorted for an hour. By the end I had stopped rehearsing everything that could go wrong. Sorting gives my hands a job so my brain can rest.

**2:45. Example 3 (why, deeper).** My grandmother sorted these same buttons when she was my age. When I find one she has told me about, it is like a message. So the activity is also about her.

**3:30. Closing idea.** Boring from the outside, but it is where I get calm and where I feel connected to someone I love. Return to the strawberry button in the last line.

**4:00.** I have an answer to both parts, three specific moments, and an image to open and close with. I write.

Notice: no claim stands alone. Each "why" is attached to a moment the reader can see.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Prompt:** *"What is one skill every student should learn before leaving middle school? Explain why."*

**Plan so far:**
- Thesis: Every student should learn to cook three real meals, because it builds independence and care for others.
- Example 1: The first time I made dinner alone (burned rice, but my dad ate all of it).
- Example 2: Cooking for my younger brother when my parents were both working late.

Now finish the plan: you need a body paragraph that explains *why* with evidence. Which of these sentences would best support the thesis in a body paragraph?`,
      question: {
        stem: 'Which sentence would best support the thesis that every student should learn to cook, in a body paragraph of the ISEE essay?',
        choices: ['Cooking is a very important life skill that everyone needs.', 'Many people believe cooking is useful, and I agree with them.', 'The night my brother had a fever, I made the only soup I knew, and watching him finish it taught me that feeding someone is a way of taking care of them.', 'There are many reasons cooking is important, such as independence and responsibility.'],
        answer: 2,
        explanation: 'Choice C is a specific moment (a sick brother, one soup, the bowl finished) followed by what it shows (care for others), which is exactly the evidence-then-explanation pattern readers want. Choices A, B, and D restate the claim in general terms without any evidence; they tell the reader the point is true instead of showing it.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Answering half the prompt.** Underline each part of the question. Most prompts ask *what* and *why*.
- **General claims with no moments.** "Teamwork is important" is not evidence. A specific practice, game, or conversation is.
- **Thesaurus voice.** Words you would not say sound borrowed. Clear beats fancy.
- **No plan, long first paragraph.** Students who skip planning write a page of introduction and run out of time for examples.
- **Not finishing.** A missing conclusion reads as poor time management. Keep paragraphs 2 and 3 tight if time is short, and always land the ending.
- **Messy page.** Indent, skip no lines, cross out with a single stroke. Readers judge the whole page.
- **Treating it as unimportant because it is unscored.** Schools read it. Treat it as the first thing they see.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'How is the ISEE essay handled after the test?',
          choices: ['It is scored on a 1 to 6 scale and included in the composite score.', 'It is not scored, and a copy is sent to each school receiving the student\'s results.', 'It is scored only at the Upper Level.', 'It is reviewed by the test company and discarded.'],
          answer: 1,
          explanation: 'The ISEE essay is unscored, but every school that receives the score report also receives the essay. Admissions readers compare it with the polished application essays to see how the student writes alone under time, which is why clarity, structure, and specific evidence matter.'
        },
        {
          stem: 'A prompt asks: "Describe a place that is special to you and explain why it matters." A student writes four detailed paragraphs describing a grandparent\'s porch but never says why it matters. What is the main problem?',
          choices: ['The essay is too descriptive to be interesting.', 'The essay answers only half of a two-part prompt.', 'The student should have chosen a more unusual place.', 'The essay needed a fifth paragraph about a second place.'],
          answer: 1,
          explanation: 'The prompt has two parts, describe and explain why, and the essay delivers only the first. Readers check whether the student read and answered the whole question. Description quality and the choice of place are not the issue; completeness is.'
        },
        {
          stem: 'Which opening best fits the recommended approach for the ISEE essay?',
          choices: ['In this essay, I will discuss three reasons why reading is important.', 'Reading is important for many reasons.', 'Since the dawn of time, humans have utilized literature to facilitate the advancement of society.', 'The summer I was nine, the power went out for four days, and my mother handed me a flashlight and a book about a boy who survives alone in the woods.'],
          answer: 3,
          explanation: 'Choice D opens with a specific moment in a natural voice, and the thesis can follow it. Choice A announces instead of begins. Choice B is a general claim with no image. Choice C is thesaurus voice ("utilized," "facilitate") and a cliche ("since the dawn of time") that readers see constantly.'
        },
        {
          stem: 'With 30 minutes for the essay, which plan best follows the recommended timing?',
          choices: ['Write for 30 minutes to produce as much as possible.', 'Plan for 4 minutes, write for 22 minutes, revise for 4 minutes.', 'Plan for 15 minutes to get it perfect, then write for 15 minutes.', 'Write for 25 minutes, then recopy the essay neatly in 5 minutes.'],
          answer: 1,
          explanation: 'The 4-22-4 plan guarantees a thesis and examples before writing, enough time for four or five paragraphs, and a final pass for errors and the ending. Writing with no plan produces a shapeless essay, a 15-minute plan leaves too little time to write, and recopying is impossible in 5 minutes.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Unscored, but sent to every school: write as if it is the first thing they read.
- Underline every part of the prompt; answer all of it.
- 4 minutes plan, 22 write, 4 revise. Thesis in one sentence, two or three specific moments, a closing that returns to the opening.
- Evidence is a moment the reader can see, followed by what it shows.
- Write in your own voice, indent every paragraph, and land the ending.`
    }
  ]
});

// ---------------------------------------------------------------- ISEE 18
lessons.push({
  id: 'isee-reading-inference',
  test: 'isee',
  section: 'reading',
  skill: 'inference',
  title: 'ISEE Reading Comprehension: Pacing and the Six Question Types',
  minutes: 16,
  level: 3,
  objectives: [
    'Budget time across 6 passages and 36 questions',
    'Recognize the six ISEE question types and the move each one requires',
    'Answer inference questions with the smallest step the text supports',
    'Use the no-penalty rule to manage hard passages'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'The section at a glance',
      md: `ISEE Reading Comprehension (Middle and Upper Levels) gives you **6 passages and 36 questions in 35 minutes**: six questions per passage, a little under six minutes per passage including reading. (Lower Level: 5 passages, 25 questions, 25 minutes.) Passages are about 300-600 words and cover science, history, humanities, and fiction. There is **no guessing penalty**.

### The six question types
ISEE names them, and each has a signature move:

1. **Main idea** — "The primary purpose of the passage is to..." Answer must cover the whole passage.
2. **Supporting ideas** — "According to the passage, which of the following..." Go back and find the lines.
3. **Inference** — "It can be inferred that..." / "The author would most likely agree that..." The smallest step beyond the text.
4. **Vocabulary** — "In line 12, 'spare' most nearly means..." Cover, predict, plug in.
5. **Organization / logic** — "The second paragraph serves to..." / "Which best describes the structure..." Name what each paragraph *does*.
6. **Tone, style, figurative language** — "The author's attitude toward X is best described as..." / "The phrase 'a wall of sound' is an example of..."

### The underlying idea
Every correct answer is **supported by specific words in the passage**. The difference between question types is only *how far* from those words the answer is allowed to sit: zero distance for supporting ideas, one small step for inference, and the sum of the whole for main idea.`
    },
    {
      type: 'strategy',
      title: 'Pacing and the per-passage routine',
      md: `### Pacing
- **Target: 5.5 minutes per passage.** About 2 minutes reading, 3.5 answering (35 seconds per question).
- Check the clock after passages 2 and 4. If you are more than two minutes behind, speed up reading, not answering.
- If one passage is brutal (dense science, old-fashioned fiction), **do it last**. Passages are not in order of difficulty.
- Last two minutes: fill in every blank. No penalty.

### The routine for each passage
1. **Read actively, once.** After each paragraph, write a two-to-four-word note on what it does. Do not re-read sentences you did not understand; keep going. You can return.
2. **Read the question, then decide the type.** The type tells you where to look.
3. **Go back to the text for every question except main idea.** Find the lines. Put your finger on them.
4. **Predict, then match.** Say the answer in your own words before reading the choices.
5. **Eliminate by evidence.** A choice with no support in the text is wrong, no matter how reasonable.

### Inference, specifically
"Inferred" does not mean "guess." It means *must be true given the text*. Ask: which choice would the author have to agree with, based on what is actually written? Prefer the choice that is the **smallest step** from the lines. Choices with *always, never, all, only, completely* almost never survive.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Passage excerpt:**
*Before 1850, most American towns kept their own time, set by the sun at noon. A traveler going from Boston to Buffalo would reset her watch a dozen times. The railroads found this intolerable: a schedule that meant one thing in Albany and another in Syracuse made collisions frighteningly likely. In 1883, the major railroad companies, acting without any law behind them, divided the country into four time zones and simply began running their trains on the new standard. Within weeks, most towns had quietly followed.*

**Question:** It can be inferred from the passage that before 1883,
(A) train travel was more popular than it is today
(B) railroad schedules were difficult to coordinate across distances
(C) the federal government opposed standard time
(D) most Americans owned accurate watches

**Step 1.** My paragraph note: "local sun time → railroads create time zones, towns follow."

**Step 2.** Type: inference. So I want the smallest step from the text.

**Step 3.** I go back. "A schedule that meant one thing in Albany and another in Syracuse made collisions frighteningly likely." I notice this is the author telling me *why* the railroads cared: schedules did not line up across towns.

**Step 4.** Prediction: "schedules across different places were a mess."

**Step 5.** (A): the passage says nothing about popularity then versus now. No support. (B): matches my prediction; it is one small step from the Albany/Syracuse sentence. (C): the passage says the railroads acted "without any law behind them." That means the government had not acted, not that it *opposed*. Too big a step. (D): the traveler resets her watch, but that says nothing about accuracy or ownership by "most Americans." No support.

**Answer: B.** The trap is (C), which takes a real detail and stretches it one step too far.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Same passage.** 

**Question:** The author\'s description of the railroads as "acting without any law behind them" (sentence 4) primarily serves to
(A) criticize the railroads for breaking the law
(B) emphasize that the change came from private companies, not government
(C) suggest that the time zones were poorly designed
(D) explain why towns resisted the new standard

**Step 2 (done).** Type: organization/logic ("serves to"). The move is to name what the phrase *does* in the paragraph, not just what it says.
**Step 3 (done).** The phrase sits in the sentence about the railroads creating zones. The next sentence says towns "quietly followed."

Now finish: predict the phrase\'s purpose in your own words, then eliminate choices that contradict the text (did towns resist?) or add judgments the author never makes (does the author criticize?).`,
      question: {
        stem: 'The author\'s description of the railroads as "acting without any law behind them" primarily serves to',
        choices: ['criticize the railroads for breaking the law', 'emphasize that the change came from private companies, not government', 'suggest that the time zones were poorly designed', 'explain why towns resisted the new standard'],
        answer: 1,
        explanation: 'The phrase stresses that no government action was involved; private companies simply began using the zones and towns followed. Choice A misreads "without any law behind them" as lawbreaking, which the text does not say. Choice C adds a judgment about design that appears nowhere. Choice D contradicts the passage, which says towns "quietly followed."'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Answering from memory.** Thirty-five seconds is enough to go back. Put your finger on the lines.
- **The one-step-too-far inference.** A real detail, stretched. "No law behind them" becomes "the government opposed it."
- **Reasonable but unsupported.** A choice can be true in the real world and still wrong because the passage never says it.
- **Extreme words.** *Always, never, all, none, only, completely, proves.* Passages rarely support absolutes.
- **Reading every sentence twice.** Active notes once; go back only for questions.
- **Doing passages in order no matter what.** Skip the brutal one; come back.
- **Blanks at the end.** No penalty. Fill them all.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'On the Middle and Upper Level ISEE, how many passages and questions are in the Reading Comprehension section, and about how long should a student spend on each passage?',
          choices: ['5 passages, 25 questions; about 7 minutes each', '6 passages, 36 questions; about 5.5 minutes each', '8 passages, 40 questions; about 4 minutes each', '4 passages, 36 questions; about 9 minutes each'],
          answer: 1,
          explanation: 'The Middle and Upper Level section has 6 passages with 6 questions each (36 total) in 35 minutes, which works out to about 5.5 minutes per passage: roughly 2 minutes reading and 35 seconds per question. The 5-passage, 25-question format is the Lower Level.'
        },
        {
          stem: 'A passage states: "The expedition carried food for ninety days, but the ice did not release the ship until the one hundred and twentieth." Which inference is best supported?',
          choices: ['The crew ran out of food before the ship was freed.', 'The crew starved to death in the ice.', 'The expedition leader was incompetent.', 'Ice always traps ships that sail too late in the season.'],
          answer: 0,
          explanation: 'Ninety days of food and one hundred twenty days trapped means the planned supply ran out; that is the smallest step from the text. "Starved to death" goes further than the evidence (they may have rationed or hunted). "Incompetent" is a judgment the text does not make, and "always" is an extreme word the passage cannot support.'
        },
        {
          stem: 'A question asks: "The third paragraph serves primarily to..." What is the correct move?',
          choices: ['Summarize the facts stated in the third paragraph.', 'Identify what the third paragraph does for the passage as a whole, such as giving an example or raising an objection.', 'Find the main idea of the entire passage.', 'Define the hardest vocabulary word in the paragraph.'],
          answer: 1,
          explanation: '"Serves to" is an organization/logic question: it asks about the paragraph\'s function (example, contrast, evidence, transition, counterargument), not its content. Summarizing the facts answers a different question, and the main idea of the whole passage is broader than one paragraph\'s role.'
        },
        {
          stem: 'A student has four minutes left and two passages untouched. Which approach is best on the ISEE?',
          choices: ['Leave the remaining questions blank to avoid losing points.', 'Read both passages carefully and answer only what is certain.', 'Skim one passage, answer its questions as well as possible, then fill in an answer for every remaining question.', 'Answer only the vocabulary questions, since they do not require the passage.'],
          answer: 2,
          explanation: 'There is no penalty on the ISEE, so blanks are simply lost points. Skimming one passage gives a real chance at several questions, and filling in the rest guarantees that no question is left at zero. Careful reading of both is impossible in four minutes, and leaving blanks is never correct on this test.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- 6 passages, 36 questions, 35 minutes: about 5.5 minutes per passage. Check the clock after passages 2 and 4.
- Six types: main idea, supporting ideas, inference, vocabulary, organization/logic, tone/style/figurative. The type tells you where to look.
- Go back to the text for everything except main idea. Predict, then match.
- Inference = must be true, smallest step. Extreme words lose.
- Hardest passage last. No penalty: fill in every blank.`
    }
  ]
});

// ---------------------------------------------------------------- ALL 19
lessons.push({
  id: 'all-reading-main-idea',
  test: 'all',
  section: 'reading',
  skill: 'main-idea',
  title: 'Active Reading and the Main Idea',
  minutes: 15,
  level: 3,
  objectives: [
    'Read a passage once, actively, writing a one-line note per paragraph',
    'Identify the structure of a passage (claim and support, problem and solution, narrative, compare and contrast)',
    'State a main idea that covers the entire passage and nothing beyond it',
    'Eliminate choices that are too narrow or too broad'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Why passive reading fails on tests',
      md: `Most students read a test passage the way they read a text message: eyes move, words go by, and at the end they remember a few vivid details and a general feeling. Then the first question asks for the main idea, and they pick the choice that mentions the vivid detail.

### The underlying idea
A passage is **built**. The author chose an order: a claim, then support; a problem, then a solution; a common belief, then a correction; an event, then its consequences. The main idea lives in that structure, not in any single sentence.

**Active reading** means reading for the structure. After each paragraph you ask one question: *what did this paragraph do?* Not what it said; what it *did*. Introduced the topic. Gave the first example. Raised an objection. Answered it. Concluded. When you can list what each paragraph did, the main idea is simply the sentence those jobs add up to.

This takes about ten extra seconds per paragraph and saves far more on the questions, because you now have a map and can go back to the right place instantly.`
    },
    {
      type: 'strategy',
      title: 'The active reading method',
      md: `### While reading (once)
1. **Read the first paragraph slowly.** It usually sets the topic and often hints at the author's angle.
2. **After each paragraph, write a 3-6 word note in the margin.** Use verbs: "introduces X," "example: Y," "but: objection," "answers it," "result."
3. **Circle pivot words:** *however, but, yet, although, in fact, surprisingly, instead*. The author's real point often starts right after one of these.
4. **Read the last paragraph slowly.** Authors often restate the main idea there.

### To find the main idea
5. **Sum the notes into one sentence:** "The author wants me to understand that ___." If your sentence is about only one paragraph, widen it. If it could describe a different passage on the same topic, narrow it.
6. **Predict, then look at the choices.**
7. **Eliminate by scope:**
   - **Too narrow:** a true detail or one paragraph's point.
   - **Too broad:** the topic without the angle ("the history of bees"), or a claim larger than the passage makes.
   - **Wrong angle:** the right topic with a claim the author does not make, or the opposite of the author's view.
   - **Right scope:** covers every paragraph, matches the author's angle.

### The four common structures
- **Claim and support:** thesis, then examples or reasons. Main idea = the thesis.
- **Problem and solution:** problem described, then a response. Main idea = the solution and why it works.
- **Common belief, then correction:** "Most people think... In fact..." Main idea = the correction.
- **Narrative:** events in order. Main idea = what changes for the character and what it means.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Passage:**
*(1) The honeybee's reputation as nature's hardest worker is well earned, but it is also misleading. (2) A single honeybee makes only about a twelfth of a teaspoon of honey in her lifetime. (3) What makes the hive productive is not individual effort but coordination: scouts find flowers, dancers report locations, and foragers follow precise directions. (4) A hive of sixty thousand bees behaves less like a crowd of workers than like a single organism with sixty thousand hands. (5) Researchers now study hives not to learn about bees, but to learn how large systems can organize themselves without a leader.*

**Question:** The main idea of the passage is that
(A) honeybees are the hardest-working insects in nature
(B) a single honeybee produces very little honey
(C) the hive's success comes from coordination among bees rather than individual effort
(D) scientists have learned everything they can from studying bees

**Reading notes.** Sentence 1: "reputation as hard worker: true *but misleading*." I circle *but*; the correction is coming. Sentence 2: "example: one bee makes almost nothing." Sentence 3: "real reason for productivity: coordination." Sentence 4: "hive = one organism." Sentence 5: "researchers study hives for self-organization."

**Sum.** "The author wants me to understand that the hive's productivity comes from coordination, not from individual bees working hard, which is why hives interest researchers."

**Eliminate.** (A) is the common belief the passage *corrects*; wrong angle. (B) is one supporting detail (sentence 2); too narrow. (D) is not in the passage and contradicts sentence 5, which says researchers "now study" hives. (C) matches my sum and covers sentences 1 through 5. **Answer: C.**

I notice the first sentence set up the trap: a reader who stopped there would pick (A).`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Passage:**
*(1) In 1854, a cholera outbreak killed more than five hundred people in one London neighborhood in ten days. (2) The accepted explanation was "bad air" rising from the city's filth. (3) A physician named John Snow doubted it. (4) He walked the streets and marked each death on a map, and the marks clustered around a single water pump on Broad Street. (5) When officials removed the pump handle, new cases nearly stopped. (6) Snow had not found the cholera germ, which would take another thirty years, but he had shown something more useful: that mapping where disease occurs can reveal how it spreads.*

**Notes (done).** (1) "outbreak." (2) "accepted theory: bad air." (3) "Snow doubts." (4) "maps deaths → pump." (5) "handle removed, cases stop." (6) "didn't find germ, *but* showed mapping reveals spread."

**Sum (your turn).** Start with "The author wants me to understand that..." Then decide which choice matches the whole passage, including the *but* in sentence 6.`,
      question: {
        stem: 'The main idea of the passage is that',
        choices: ['a cholera outbreak in 1854 killed more than five hundred Londoners', 'John Snow discovered the germ that causes cholera', 'by mapping deaths, John Snow showed that tracking where disease occurs can reveal how it spreads', 'nineteenth-century doctors believed that disease was caused by bad air'],
        answer: 2,
        explanation: 'Choice C covers the full arc: the outbreak, the doubted theory, the map, the pump, and the lesson stated in sentence 6. Choice A is sentence 1 only (too narrow). Choice D is the belief the passage shows to be wrong (wrong angle). Choice B directly contradicts sentence 6, which says Snow had not found the germ.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **First-sentence main idea.** The opening often states the belief the author will correct. Look for the pivot.
- **The vivid detail.** The pump handle, the twelfth of a teaspoon. Memorable is not the same as central.
- **Topic instead of main idea.** "Cholera in London" is a topic. A main idea makes a claim about it.
- **Too broad.** A choice that would fit ten other passages on the subject does not fit this one.
- **Contradiction hidden in a choice.** A single word (*discovered* vs. *showed*) can flip a choice from right to wrong. Read every word.
- **Re-reading instead of noting.** Passive re-reading costs time and does not build the map. One active read, with notes.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'A passage\'s paragraph notes read: (1) "Most people think multitasking saves time." (2) "Study: switching tasks costs minutes each time." (3) "Second study: errors rise." (4) "Advice: do one thing at a time." Which statement best expresses the main idea?',
          choices: ['Multitasking is a popular way to save time.', 'Research shows that multitasking actually wastes time and increases errors, so single-tasking is better.', 'Switching between tasks costs a few minutes each time.', 'Scientists have conducted studies about how people work.'],
          answer: 1,
          explanation: 'Choice B covers all four notes: the belief, both studies, and the advice. Choice A is the belief the passage corrects. Choice C is one study, too narrow. Choice D is the topic with no claim, too broad.'
        },
        {
          stem: 'Which of these is a sign that a choice for a main-idea question is "too broad"?',
          choices: ['It mentions a specific example from paragraph 2.', 'It could serve as the main idea of many different passages on the same subject.', 'It uses a word from the passage\'s first sentence.', 'It contradicts the author\'s final paragraph.'],
          answer: 1,
          explanation: 'Too broad means the choice states the general topic or a claim bigger than the passage makes, so it would fit many passages. A specific example signals too narrow; a contradiction signals wrong angle. Using a word from the first sentence proves nothing either way.'
        },
        {
          stem: 'While reading, a student circles "however" at the start of the third paragraph. What should the student expect?',
          choices: ['The passage is about to end.', 'The third paragraph will give another example supporting the first two.', 'The author is about to shift direction, and the real point may begin here.', 'The third paragraph can be skipped because it repeats earlier ideas.'],
          answer: 2,
          explanation: 'Pivot words like "however," "but," and "in fact" signal a turn: a correction, a contrast, or the author\'s actual claim after setting up a common view. The paragraph after a pivot is often the most important for the main idea, not one to skip.'
        },
        {
          stem: 'A narrative passage follows a girl who is afraid to swim, is pushed into a lake by a cousin, panics, then discovers she can float. Which choice states the main idea rather than a detail?',
          choices: ['The girl\'s cousin pushed her into the lake.', 'Lakes can be dangerous for children who cannot swim.', 'The girl discovers that the thing she feared is something she can handle.', 'The girl panicked when she hit the water.'],
          answer: 2,
          explanation: 'In a narrative, the main idea is what changes for the character and what it means. Choice C captures the change from fear to discovery. Choices A and D are single events (too narrow). Choice B is a general statement about lakes that the story does not argue (too broad and wrong angle).'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Read once, actively: a 3-6 word verb note per paragraph, pivot words circled.
- The main idea is the sentence the paragraph notes add up to.
- Predict before looking; then eliminate by scope: too narrow, too broad, wrong angle.
- The first sentence often states the belief the author corrects.
- Vivid details are support, not the point.`
    }
  ]
});

// ---------------------------------------------------------------- ALL 20
lessons.push({
  id: 'all-reading-detail',
  test: 'all',
  section: 'reading',
  skill: 'detail',
  title: 'Detail Questions: Go Back to the Text',
  minutes: 12,
  level: 3,
  objectives: [
    'Recognize detail questions ("according to the passage," "the author states") and treat them as lookup tasks',
    'Use key words and line references to find the exact sentence',
    'Match the choice to the text\'s meaning, not its wording',
    'Reject choices that are true in general but not stated in the passage'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What a detail question is',
      md: `Detail questions ask what the passage *says*:

- "According to the passage, the bridge was closed because..."
- "The author mentions the 1883 railroad decision in order to..."
- "Which of the following is stated about the pump?"

### The underlying idea
A detail question is a **lookup**, not a memory test. The answer is physically in the passage, usually in one or two sentences. Your job is to find those sentences and compare the choices against them word by word.

Students lose these points in two ways. First, they answer from memory, and memory blends the passage with what they expected it to say. Second, they pick a choice that is **true** but not what the passage states, or not what the question asked. On a detail question, truth in the real world is irrelevant; only the text counts.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Spot the question type.** *According to the passage, the author states, the passage indicates, which of the following is mentioned* all mean detail. Switch to lookup mode.
2. **Pull a key word from the question.** A name, a number, a technical term, a distinctive noun. "Pump handle." "1883." "Broad Street." If the question gives a line number, go to that line and read **one sentence before and one after** it.
3. **Find the sentence; put your finger on it.** Read it in full. Say the answer in your own words before looking at the choices.
4. **Compare each choice to that sentence.**
   - The right answer usually **paraphrases** the text with different words.
   - Wrong answers often **reuse the passage's exact words** in a different combination, or state something true from *another* part of the passage, or something true in general but absent from the text.

When your paragraph notes from active reading are good, step 2 takes five seconds: the note tells you which paragraph to open.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Passage excerpt:**
*The lighthouse at Minot's Ledge was first built of iron pilings in 1850 and lasted barely a year before a storm tore it from the rock, killing the two assistant keepers inside. The replacement, finished in 1860, was built of interlocking granite blocks cut so precisely that no mortar was needed. It has stood through every storm since, including the blizzard of 1978, which destroyed hundreds of homes along the same coast.*

**Question:** According to the passage, the second Minot's Ledge lighthouse has survived because
(A) it was built on a different rock from the first
(B) its granite blocks fit together without mortar
(C) it was finished before the storms of the 1850s
(D) the blizzard of 1978 missed the coast

**Step 1.** "According to the passage" tells me this is a detail question. Lookup mode.

**Step 2.** Key words: "second lighthouse," "survived." I look for the replacement.

**Step 3.** Finger on: "The replacement, finished in 1860, was built of interlocking granite blocks cut so precisely that no mortar was needed. It has stood through every storm since." In my own words: it survived because the stone blocks lock together tightly.

**Step 4.** (A): the passage never mentions a different rock. Not stated. (B): paraphrases my sentence. (C): it was finished in 1860, *after* the 1850s. Contradicts the text, and it reuses the word "storm" to feel familiar. (D): the passage says the blizzard "destroyed hundreds of homes along the same coast," so it did not miss. Contradicts.

**Answer: B.** I notice (C) and (D) both borrow exact words from the passage (*storm, blizzard of 1978, coast*). Borrowed words are a warning sign, not a confirmation.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Same passage.**

**Question:** The passage states that the first lighthouse at Minot's Ledge
(A) was made of granite
(B) was destroyed in a storm within about a year
(C) was finished in 1860
(D) survived the blizzard of 1978

**Step 1 (done).** "The passage states" = detail.
**Step 2 (done).** Key words: "first lighthouse." That is sentence 1.

Now finish: put your finger on sentence 1, restate it in your own words, and compare each choice. Three of the choices describe the *second* lighthouse; that is the true-but-not-asked trap.`,
      question: {
        stem: 'The passage states that the first lighthouse at Minot\'s Ledge',
        choices: ['was made of granite', 'was destroyed in a storm within about a year', 'was finished in 1860', 'survived the blizzard of 1978'],
        answer: 1,
        explanation: 'Sentence 1 says the first lighthouse, built of iron pilings in 1850, "lasted barely a year before a storm tore it from the rock." Choice B paraphrases that. Choices A, C, and D are all true of the second lighthouse, not the first; they are true-but-not-asked traps that reuse details from the passage.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Answering from memory.** Always go back, even when you are sure. Especially when you are sure.
- **True but not asked.** A fact from elsewhere in the passage, attached to the wrong subject.
- **True in the world, absent from the text.** Reasonable background knowledge is not evidence.
- **Exact-word bait.** Choices that copy the passage's phrasing often rearrange it into something false. The right answer usually paraphrases.
- **Half right.** A choice can be correct for its first six words and wrong in its last three. Read to the end.
- **Line-reference tunnel vision.** The cited line is the pointer; the answer may sit in the sentence before or after.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'A passage says: "Unlike most owls, the burrowing owl is active during the day and nests underground in tunnels dug by prairie dogs or tortoises." According to the passage, the burrowing owl',
          choices: ['digs its own tunnels', 'hunts only at night like most owls', 'uses tunnels made by other animals', 'is the largest owl in North America'],
          answer: 2,
          explanation: 'The text says the tunnels are "dug by prairie dogs or tortoises," so the owl uses tunnels made by other animals. Choice A contradicts that. Choice B contradicts "active during the day" and borrows "most owls" as exact-word bait. Choice D is not stated anywhere.'
        },
        {
          stem: 'A question begins "According to the passage, the author mentions the 1906 earthquake in order to..." What is the best first move?',
          choices: ['Recall what you know about the 1906 earthquake.', 'Find the sentence that mentions 1906 and read the sentences around it.', 'Reread the entire passage from the beginning.', 'Pick the choice that contains the words "1906 earthquake."'],
          answer: 1,
          explanation: 'Detail questions are lookups: use the key word (1906) to find the sentence, then read one sentence before and after to see why it is there. Outside knowledge is irrelevant, rereading everything wastes time, and choices that repeat the question\'s words are often bait.'
        },
        {
          stem: 'A passage reads: "The expedition\'s botanist, not its leader, kept the only complete journal, and it was her notes that later allowed the route to be mapped." Which statement is supported by the passage?',
          choices: ['The leader kept a detailed journal of the route.', 'The botanist\'s notes made it possible to map the route.', 'The botanist was the leader of the expedition.', 'The expedition was the first to map the region.'],
          answer: 1,
          explanation: 'The sentence says the botanist\'s notes "allowed the route to be mapped," which choice B paraphrases. Choice A contradicts "not its leader." Choice C contradicts the same phrase. Choice D adds a claim ("first") that appears nowhere in the text.'
        },
        {
          stem: 'A choice on a detail question is a fact that is accurate and well known but does not appear anywhere in the passage. On a test, that choice is',
          choices: ['correct, because it is true', 'correct, if the student can explain the reasoning', 'wrong, because detail questions are answered only from the text', 'correct only on the SSAT'],
          answer: 2,
          explanation: 'Detail questions ask what the passage states. A fact that is true but absent from the text has no support and is wrong on every test. This "true in the world" trap is designed for students who answer from knowledge instead of looking back.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- "According to the passage" means lookup. Go back every time.
- Key word or line number → the sentence → one before and one after.
- Restate the sentence in your own words, then compare the choices.
- The right answer paraphrases; exact-word choices are often bait.
- True-but-not-asked and true-but-not-stated are both wrong.`
    }
  ]
});

// ---------------------------------------------------------------- ALL 21
lessons.push({
  id: 'all-reading-inference',
  test: 'all',
  section: 'reading',
  skill: 'inference',
  title: 'Inference: The Smallest Step That Must Be True',
  minutes: 13,
  level: 3,
  objectives: [
    'Define inference on a test as "must be true given the text," not "could be true"',
    'Locate the lines the inference rests on and take the smallest step from them',
    'Eliminate choices with extreme words (always, never, only, all, none)',
    'Distinguish a supported inference from a reasonable assumption'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What inference means on a test',
      md: `Inference questions use phrases like "it can be inferred that," "the passage suggests," "the author implies," "the author would most likely agree that."

In everyday life, inferring means making a smart guess. On a test, it means something stricter: **the answer must be true if the passage is true.** The author did not say it in so many words, but the words the author did use leave no other possibility.

### The underlying idea
Think of the text as a set of footprints. The correct inference is the next footprint, exactly where the pattern says it must land. Wrong choices are footprints two or three steps away: they *could* be where the person went, but nothing forces it.

Because of this, the right answer to an inference question is almost always **modest**. It sounds less exciting than the wrong choices. "The crew ran short of food" is right; "the crew starved to death" is a leap. Test writers know students prefer the dramatic choice, and they write the leap to be tempting.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Find the lines.** An inference still rests on specific text. Use key words from the question to locate the sentence or two it is about. Put your finger there.
2. **State what the lines say, plainly.** "Food for 90 days; trapped 120 days."
3. **Take one step.** Ask: what *must* be true if that is true? "They did not have enough planned food for the whole time." Stop there. Do not take a second step ("so they starved") or add a judgment ("so the leader was careless").
4. **Test every choice against the lines.** For each one, ask: *could the passage be true and this choice be false?* If yes, the choice is not forced, so it is wrong.

### Elimination shortcuts
- **Extreme words** (*always, never, all, none, only, every, completely, proves, impossible*) rarely survive, because a passage almost never supports an absolute.
- **Judgment words** the author did not use (*foolish, incompetent, brilliant, wrong*) are usually a leap.
- **New topics** the passage never touched (money, popularity, the government's view) are unsupported no matter how sensible.
- **The modest choice** that restates the text with one small step is usually the answer.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Passage excerpt:**
*Ana had practiced the piece for six months, but when the stage lights came up she could not feel her fingers. She played the opening anyway. By the second page her hands had remembered what her mind had forgotten, and when she stood to bow she was surprised to find the audience already on its feet.*

**Question:** It can be inferred from the passage that Ana
(A) had never performed in public before
(B) was nervous at the start of her performance
(C) made several mistakes on the first page
(D) is the most talented musician in her school

**Step 1.** The question is about Ana in general, so I take the whole excerpt. My finger goes to "she could not feel her fingers."

**Step 2.** Plainly: she had practiced a long time; under the lights her fingers went numb; she played anyway; her hands took over; the audience gave a standing ovation that surprised her.

**Step 3.** One step from "could not feel her fingers" under stage lights: she was frightened or nervous. The text does not say "nervous," but numb fingers at the moment the lights come up has no other sensible cause in this context.

**Step 4.** (A): "never performed before" is a new fact. Could the passage be true and she have performed before? Yes. Not forced. (B): could the passage be true and she *not* have been nervous? Hard to see how. Forced. (C): "several mistakes." The passage says she played the opening anyway and her hands remembered; nothing says she erred. Could be true, not forced. (D): "most talented in her school" is extreme and a new topic. Nothing in the text ranks her.

**Answer: B.** I notice (B) is the least dramatic choice. That is typical.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Same passage.**

**Question:** The passage suggests that the audience's reaction
(A) was exactly what Ana had expected
(B) was more enthusiastic than Ana had anticipated
(C) was caused by Ana's mistakes on the first page
(D) proves that Ana will become a professional musician

**Step 1 (done).** Finger on: "she was surprised to find the audience already on its feet."
**Step 2 (done).** Plainly: the audience was standing, and Ana was surprised by that.

Now take one step: what must be true about what Ana expected, given that she was *surprised*? Then test each choice with the question "could the passage be true and this be false?"`,
      question: {
        stem: 'The passage suggests that the audience\'s reaction',
        choices: ['was exactly what Ana had expected', 'was more enthusiastic than Ana had anticipated', 'was caused by Ana\'s mistakes on the first page', 'proves that Ana will become a professional musician'],
        answer: 1,
        explanation: 'Ana "was surprised" to see the audience standing, so the reaction exceeded what she expected; that is one step from the text. Choice A contradicts "surprised." Choice C invents mistakes the passage never mentions. Choice D uses the extreme word "proves" and leaps to a future the text says nothing about.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **The dramatic leap.** Numb fingers → "had never performed before." Standing ovation → "will become a professional." Two steps is one too many.
- **Extreme words.** *Always, never, only, all, proves, impossible.* Cross them out on sight unless the passage itself is absolute.
- **Judgments the author never made.** *Careless, brilliant, foolish.* The author's tone must support them.
- **Reasonable background assumptions.** "Most performers are nervous" is true in life but is not evidence from this text.
- **Confusing "could be true" with "must be true."** The test for every choice: could the passage be true and this choice false? If yes, it is out.
- **Preferring the interesting answer.** The right inference is usually the quiet one.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'A passage states: "The village\'s only well dried up in July, and by August the families who could afford to had moved to the city." It can be inferred that',
          choices: ['every family in the village moved to the city', 'some families remained in the village after August', 'the city had a better water supply than the village', 'the well had never dried up before July'],
          answer: 1,
          explanation: '"The families who could afford to" moved, which means some could not, so some remained. That is the smallest step. Choice A uses the extreme "every" and contradicts the qualifier. Choice C is a reasonable assumption but is not stated or forced. Choice D adds history the passage does not give.'
        },
        {
          stem: 'A passage says: "Although the new bridge opened to great fanfare, within a year engineers had quietly added steel braces beneath its deck." The author most likely includes this detail to suggest that',
          choices: ['the bridge was the strongest in the region', 'the bridge had a weakness its builders did not publicize', 'the engineers were incompetent', 'the public never used the bridge'],
          answer: 1,
          explanation: '"Quietly added steel braces" after a celebrated opening implies a problem that was fixed without announcement; choice B takes that one step. Choice A contradicts the need for braces. Choice C is a judgment the author never makes. Choice D is a new claim with no support.'
        },
        {
          stem: 'Which of these answer choices should a student be most suspicious of on an inference question, before even checking the passage?',
          choices: ['"The author suggests that the practice was sometimes effective."', '"The author suggests that the practice was never effective under any circumstances."', '"The author suggests that the practice had mixed results."', '"The author suggests that the practice was more common in cities."'],
          answer: 1,
          explanation: '"Never... under any circumstances" is an absolute, and passages almost never provide evidence for absolutes. Extreme words are the fastest elimination on inference questions. The other choices are modest and would need to be checked against the text.'
        },
        {
          stem: 'A passage describes a scientist who "repeated the experiment eleven times before publishing." Which inference is best supported?',
          choices: ['The scientist was careful to confirm the results before sharing them.', 'The first ten experiments all failed.', 'The scientist was the first to study this question.', 'Other scientists refused to believe the results.'],
          answer: 0,
          explanation: 'Repeating an experiment many times before publishing is one step from "careful to confirm." Choice B assumes the repeats were failures; they could have been confirmations. Choices C and D introduce facts about priority and other scientists that the sentence does not touch.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Inference on a test = must be true, not could be true.
- Find the lines, say them plainly, take one step, stop.
- For each choice: could the passage be true and this be false? If yes, eliminate.
- Extreme words, author judgments, and new topics are the three fastest eliminations.
- The modest choice is usually right. Distrust the dramatic one.`
    }
  ]
});

// ---------------------------------------------------------------- ALL 22
lessons.push({
  id: 'all-reading-vocab-in-context',
  test: 'all',
  section: 'reading',
  skill: 'vocab-in-context',
  title: 'Vocabulary in Context: Cover, Predict, Plug In',
  minutes: 12,
  level: 3,
  objectives: [
    'Treat a vocabulary-in-context question as a fill-in-the-blank using the surrounding sentences',
    'Predict a replacement word before reading the choices',
    'Plug each choice back into the sentence and test the meaning',
    'Recognize and avoid the familiar-meaning trap'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'What the question is really testing',
      md: `"In line 14, the word *spare* most nearly means..."

It looks like a vocabulary question. It is not, quite. The test chose a word with **more than one meaning** and wants the one the author used *here*. *Spare* can mean extra, thin, plain, or to save someone from harm. "The room was spare: a bed, a chair, nothing on the walls" uses the "plain" meaning.

### The underlying idea
Context determines meaning. The sentence around the word has to work with it; the sentences before and after usually confirm it. If you read the word in isolation, your brain supplies the most common meaning, and the test always lists that common meaning as a choice. That is the **familiar-meaning trap**, and it is the whole reason the question exists.

The fix is simple: do not read the word. Read the hole where it sits.`
    },
    {
      type: 'strategy',
      title: 'The 4-step method',
      md: `1. **Go to the line and cover the word.** Physically, with your finger or pencil. Read the sentence with a blank, plus one sentence before and one after.
2. **Predict.** Say the plainest word that fits the blank: "The room was ___: a bed, a chair, nothing on the walls." *Bare. Plain. Empty.*
3. **Match your prediction to the choices.** Pick the closest.
4. **Plug in to confirm.** Read the sentence with your choice in place of the original word. It should sound natural and keep the meaning of the surrounding sentences. If it does not, try the next-closest choice.

**Warning sign:** if the choice you like is the first definition you would give for the word, pause. Plug it in and make sure the sentence still works. Often it does not.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Passage excerpt:**
*The old mapmaker had a reputation for being difficult, but his standards were simply exact. He would not* **tolerate** *a coastline drawn from memory; every bay had to be measured, every rock sounded. Apprentices who guessed were sent back to the shore.*

**Question:** As used in the passage, "tolerate" most nearly means
(A) enjoy
(B) accept
(C) understand
(D) measure

**Step 1.** I cover *tolerate* and read: "He would not ___ a coastline drawn from memory; every bay had to be measured." Sentence after: apprentices who guessed were sent back.

**Step 2.** Prediction: he would not *allow* or *put up with* a guessed coastline.

**Step 3.** *Accept* is the closest to "allow / put up with."

**Step 4.** Plug in: "He would not accept a coastline drawn from memory." Natural, and it fits the next sentence about sending guessers back. Check the others: "would not *enjoy*" is too weak; the point is he forbade it, not that it displeased him. "Would not *understand*" changes the meaning; he understood exactly what was wrong with it. "Would not *measure*" is the familiar-word trap of a different kind: *measure* appears in the passage, so it feels right, but plugging it in makes nonsense.

**Answer: B.**`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Passage excerpt:**
*The committee's response was* **cool**. *They thanked the inventor for her presentation, asked no questions, and moved to the next item on the agenda.*

**Question:** As used in the passage, "cool" most nearly means
(A) fashionable
(B) cold in temperature
(C) unenthusiastic
(D) calm and skilled

**Step 1 (done).** Cover the word: "The committee's response was ___." Next sentence: they thanked her, asked nothing, moved on.
**Step 2 (your turn).** What plain word describes a response like that? Predict, then match, then plug in. Two choices are familiar meanings of *cool*; test them in the sentence and see what happens.`,
      question: {
        stem: 'As used in the passage, "cool" most nearly means',
        choices: ['fashionable', 'cold in temperature', 'unenthusiastic', 'calm and skilled'],
        answer: 2,
        explanation: 'The next sentence describes polite indifference: thanks, no questions, moving on. That is an unenthusiastic response. "Fashionable" is the everyday familiar meaning and makes no sense plugged in. "Cold in temperature" is the literal meaning, impossible for a response. "Calm and skilled" describes a person\'s manner, not a lukewarm reaction.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **The familiar meaning.** Always listed, often wrong. If the word has a common meaning you know well, the test is probably using a different one.
- **A word from the passage as a choice.** *Measure* in the mapmaker example. It feels right because you just read it. Plug it in.
- **Not covering the word.** If you read the word before predicting, the familiar meaning gets in first.
- **Reading only the one sentence.** The confirming clue is often in the sentence before or after.
- **Skipping the plug-in.** A prediction can be slightly off. The plug-in catches it in five seconds.
- **Choosing a "dictionary" definition over a contextual one.** The question says "as used in the passage." That phrase is the instruction.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: '"The treaty was signed, but the peace it produced was fragile, and both sides continued to arm." As used here, "fragile" most nearly means',
          choices: ['breakable like glass', 'easily ended', 'expensive', 'carefully made'],
          answer: 1,
          explanation: 'Cover the word: a peace that is ___ while both sides keep arming is one that could easily collapse, so "easily ended" fits. "Breakable like glass" is the familiar physical meaning and does not apply to a peace. "Expensive" and "carefully made" contradict or ignore the clue about continued arming.'
        },
        {
          stem: '"She gave a dry account of the accident, listing times and distances without a word about how she had felt." As used here, "dry" most nearly means',
          choices: ['lacking moisture', 'humorous', 'unemotional', 'thirsty'],
          answer: 2,
          explanation: 'The sentence defines the word: times and distances with no mention of feelings. That is an unemotional account. "Lacking moisture" and "thirsty" are familiar literal meanings that cannot describe an account. "Humorous" ("dry wit") is a secondary meaning, but nothing in the sentence suggests humor.'
        },
        {
          stem: '"The senator\'s remarks were brief, but they carried enormous weight with the undecided voters." As used here, "weight" most nearly means',
          choices: ['heaviness', 'influence', 'burden', 'length'],
          answer: 1,
          explanation: 'Remarks that affect undecided voters carry "influence." "Heaviness" is the familiar physical meaning and makes no sense for remarks. "Burden" is a secondary meaning that does not fit a positive effect on voters. "Length" contradicts "brief."'
        },
        {
          stem: 'A student reads the tested word first, instantly recognizes it, and picks the choice matching the definition she already knows without re-reading the sentence. What is the risk?',
          choices: ['None; recognizing the word is the goal of the question.', 'She may fall for the familiar-meaning trap, since the test usually uses a less common meaning.', 'She will run out of time on the passage.', 'She may choose a word that is too long.'],
          answer: 1,
          explanation: 'Vocabulary-in-context questions are built around words with multiple meanings, and the familiar definition is almost always offered as a trap. Covering the word, predicting from context, and plugging the choice back in protects against it. Speed is not the issue; reading the word first is.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Cover the word; read the sentence with a blank, plus one sentence on each side.
- Predict the plainest word that fits, then match it to a choice.
- Plug the choice back in and read it aloud in your head.
- The familiar meaning is always listed and is usually the trap.
- "As used in the passage" is an instruction, not a decoration.`
    }
  ]
});

// ---------------------------------------------------------------- ALL 23
lessons.push({
  id: 'all-reading-tone-purpose',
  test: 'all',
  section: 'reading',
  skill: 'tone-purpose',
  title: 'Tone, Purpose, and Structure',
  minutes: 14,
  level: 3,
  objectives: [
    'Identify an author\'s tone from word choice and name it precisely',
    'Determine the author\'s purpose: inform, persuade, entertain, or describe',
    'Recognize the four common passage structures and the signal words for each',
    'Answer "the author mentions X in order to" questions by naming the function of the detail'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Three questions about the author, not the subject',
      md: `Most reading questions ask about *what the passage says*. Tone, purpose, and structure questions ask about *what the author is doing*.

- **Tone:** How does the author feel about the subject? "The author's attitude toward the new policy is best described as..."
- **Purpose:** Why did the author write this? "The primary purpose of the passage is to..."
- **Structure:** How is the passage built? "Which best describes the organization of the passage?" or "The author mentions the 1906 fire in order to..."

### The underlying idea
Authors leave fingerprints in their **word choices**. "The committee *finally* approved the plan" and "the committee *hastily* approved the plan" report the same event with opposite attitudes. Tone lives in adjectives, adverbs, and verbs that carry a charge.

Purpose shows in the **shape** of the whole: a passage that piles up facts is informing; one that piles up reasons for a position is persuading; one with characters and scenes is entertaining; one that builds a picture through sensory detail is describing.

Structure shows in **signal words**: *first, then, later* (chronological); *similarly, in contrast, on the other hand* (compare-contrast); *the problem is... one solution* (problem-solution); *because, as a result, led to* (cause-effect).`
    },
    {
      type: 'strategy',
      title: 'The methods',
      md: `### Tone: collect charged words
1. Underline five or six words that carry feeling (*remarkable, unfortunately, so-called, merely, triumph, cramped*).
2. Decide the charge: positive, negative, or neutral. Then decide the strength: mild or strong.
3. Match to a tone word at the right charge **and** strength. Common test tone words:
   - Positive: *admiring, appreciative, enthusiastic, hopeful, nostalgic, respectful*
   - Negative: *critical, skeptical, disapproving, mocking, bitter, alarmed*
   - Neutral: *objective, informative, matter-of-fact, analytical, detached*
   - Mixed/other: *ambivalent, cautious, ironic, wistful, humorous*
4. Eliminate tones that are too strong (*outraged* when the words are only *doubtful*) and tones that ignore the charged words (*objective* when the author calls something "a disaster").

### Purpose: look at the shape
- Mostly facts, no side taken → **inform/explain**.
- A position plus reasons, with words like *should, must, clearly* → **persuade/argue**.
- Characters, scene, dialogue, plot → **entertain/narrate**.
- Sensory detail building one picture → **describe**.
Purpose answers begin with verbs; pick the verb that matches the shape and the object that matches the whole passage, not one paragraph.

### Structure: name each paragraph's job
Use your active-reading notes. Then ask which pattern fits:
- **Chronological:** events in time order.
- **Compare-contrast:** two things, alternating or in blocks.
- **Problem-solution:** a difficulty, then a response.
- **Cause-effect:** something happens, then what it led to.
For "the author mentions X in order to," find X, read around it, and ask what *job* it does: an example of a claim, a contrast, evidence, a concession, a transition.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud)',
      md: `**Passage excerpt:**
*The town council calls the new parking structure a "gateway to downtown." It is, in fairness, a very large gateway. Seven stories of concrete now stand where the farmers' market met for forty years, and the ribbon-cutting featured a brass band, three speeches, and no mention of the vendors who were told, with two weeks' notice, to find somewhere else to sell their tomatoes.*

**Question 1:** The author's tone is best described as
(A) objective   (B) enthusiastic   (C) ironic and critical   (D) nostalgic

**Step 1.** Charged words: "calls... a 'gateway'" (quotation marks around the council's phrase: distance), "in fairness, a very large gateway" (saying the opposite of praise while pretending to be fair), "seven stories of concrete," "no mention of the vendors," "two weeks' notice." 

**Step 2.** Charge: negative toward the council. Strength: moderate, delivered through understatement rather than anger.

**Step 3.** (A) *objective*: no; the word choices take a side. (B) *enthusiastic*: the opposite. (D) *nostalgic*: there is a mention of forty years of the market, but the energy is aimed at the council's behavior, not at missing the past. (C) *ironic and critical*: "in fairness, a very large gateway" is irony (saying something that means its opposite), and the whole paragraph criticizes. **Answer: C.**

**Question 2:** The author mentions the brass band and the three speeches in order to
(A) describe the festive mood of the opening
(B) contrast the ceremony's celebration with the treatment of the vendors
(C) explain why the parking structure was needed
(D) praise the council's planning

I find the detail and read around it: band, speeches, *and no mention of the vendors*. The sentence sets the celebration right next to the people who were ignored. Its job is contrast. **Answer: B.** (A) describes the detail without naming its function; (C) and (D) contradict the tone.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**Passage excerpt:**
*Before refrigeration, cities depended on ice cut from frozen lakes each winter and stored in sawdust-insulated icehouses. As cities grew, demand outran the supply of clean lake ice, and by the 1880s ice shipped from polluted rivers was spreading disease. Engineers responded with mechanical ice plants, which by 1900 produced ice year-round from purified water. Within a generation, the lake-ice trade had vanished.*

**Step 1 (done).** Paragraph notes: "ice from lakes" → "cities grow, demand outruns clean supply, disease" → "engineers build ice plants" → "lake trade vanishes."
**Step 2 (your turn).** Which structure pattern fits those notes? Look at the signal words: *as cities grew, responded with, within a generation*. Then choose.`,
      question: {
        stem: 'Which best describes the organization of the passage?',
        choices: ['A comparison of lake ice and mechanical ice, point by point', 'A problem is described, followed by the solution and its result', 'A list of the dangers of polluted water', 'An argument that refrigeration should be regulated'],
        answer: 1,
        explanation: 'The passage presents a problem (demand outran clean ice; polluted ice spread disease), a response ("Engineers responded with mechanical ice plants"), and the result (the lake trade vanished). That is problem-solution, with a chronological thread. It does not alternate comparison points, it is not a list, and it takes no position on regulation.'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Tone too strong.** *Furious* when the words are *doubtful*; *mocking* when the author is only *skeptical*. Match strength, not just direction.
- **"Objective" by default.** If any charged words exist, the author is not objective.
- **Purpose from one paragraph.** A persuasive essay may contain a descriptive paragraph. Purpose is the whole.
- **"In order to" answered with a summary.** The question asks what the detail *does*, not what it *says*.
- **Confusing subject with purpose.** "To describe the history of ice" names a subject; "to explain how a public health problem led to a new technology" names a purpose.
- **Irony read literally.** If a sentence seems to praise something the rest of the passage condemns, it is probably ironic.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'A passage about a city\'s new library uses the words "cramped," "poorly lit," "an afterthought," and "a missed opportunity." The author\'s attitude toward the library is best described as',
          choices: ['enthusiastic', 'disapproving', 'objective', 'nostalgic'],
          answer: 1,
          explanation: 'Every charged word is negative and moderate in strength, which points to "disapproving." "Enthusiastic" is the opposite charge, "objective" ignores the charged words, and "nostalgic" (longing for the past) has no support in the word list.'
        },
        {
          stem: 'A passage presents three reasons schools should start later in the morning, cites two studies, and ends with "Districts that ignore this evidence are failing their students." The primary purpose of the passage is to',
          choices: ['describe a typical school morning', 'inform readers about the history of school schedules', 'persuade readers that schools should start later', 'entertain readers with stories about tired students'],
          answer: 2,
          explanation: 'Reasons, supporting studies, and a closing "should"-style judgment are the shape of persuasion. The passage takes a side, which rules out inform. There is no narrative or sensory description, which rules out entertain and describe.'
        },
        {
          stem: 'A passage alternates between paragraphs about how wolves hunt and paragraphs about how coyotes hunt, using phrases like "by contrast" and "similarly." Its structure is best described as',
          choices: ['chronological', 'problem and solution', 'compare and contrast', 'cause and effect'],
          answer: 2,
          explanation: 'Two subjects treated in alternation, with "by contrast" and "similarly" as signal words, is compare-contrast. There is no time sequence, no problem being solved, and no chain of causes and effects described.'
        },
        {
          stem: 'In an essay arguing that handwriting should still be taught, the author writes: "Even the most devoted tablet user still signs a birthday card by hand." The author includes this sentence in order to',
          choices: ['explain how tablets work', 'give an example showing that handwriting remains useful', 'argue that tablets should be banned', 'describe the author\'s own birthday'],
          answer: 1,
          explanation: 'The sentence offers a concrete case (signing a card) that supports the essay\'s claim that handwriting still matters, so its function is an example as evidence. The other choices either summarize something the sentence does not say or invent positions the author never takes.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Tone is in the charged words. Collect them, find the charge and strength, match both.
- Purpose is in the shape of the whole: facts (inform), reasons for a side (persuade), scenes (entertain), sensory picture (describe).
- Structure is in the signal words: time order, contrast, problem-then-solution, cause-then-effect.
- "In order to" asks for the detail's job, not its content.
- If any charged words exist, the author is not "objective."`
    }
  ]
});

// ---------------------------------------------------------------- ALL 24
lessons.push({
  id: 'all-verbal-vocabulary-strategy',
  test: 'all',
  section: 'verbal',
  skill: 'strategy',
  title: 'How to Learn Vocabulary So It Sticks',
  minutes: 18,
  level: 3,
  objectives: [
    'Explain why spaced retrieval beats rereading, and set up a schedule that uses it',
    'Learn the 30 highest-yield roots and prefixes and use them to decode unfamiliar words',
    'Build a mnemonic that links a new word to an image and a sentence',
    'Use the site\'s vocabulary review and wide reading as a daily system'
  ],
  blocks: [
    {
      type: 'concept',
      title: 'Why most vocabulary study fails',
      md: `Students study a list by reading it over and over. The words start to look familiar, which *feels* like learning. Two weeks later, on the test, the words are gone.

### The underlying idea
Familiarity is not memory. **Memory is built by retrieval:** the act of pulling a meaning out of your head *without looking*. Each successful retrieval makes the next one easier. Rereading skips the pull, so it builds recognition ("I've seen this") but not recall ("I know what this means").

Two more facts from learning science:

- **Spacing beats cramming.** Ten minutes a day for a week beats seventy minutes on Sunday, with the same total time. Forgetting a little between sessions and then retrieving is what strengthens the memory.
- **Meaning hooks beat raw repetition.** A word tied to a root, an image, a sentence you made up, or a word you already know has several paths into memory. A word tied to nothing has one.

The system below combines all three: retrieve, space, hook.`
    },
    {
      type: 'strategy',
      title: 'The daily system (12-15 minutes)',
      md: `### 1. Retrieve first (5 minutes)
Open the site's **Vocabulary Review**. It shows you a word; you say the definition *out loud or in writing* before flipping. Grade yourself honestly: knew it / almost / no idea. The review schedules each word for you: words you miss come back tomorrow; words you know come back in a few days, then a week, then longer. That is **spaced repetition** done automatically. Do not skip the saying-it-first step; flipping early turns retrieval back into rereading.

### 2. Learn 5 new words (5 minutes)
For each new word:
- **Break it**: find a root or prefix you know (list below).
- **Sentence it**: write one sentence about your own life. "My *frugal* aunt reuses wrapping paper."
- **Picture it**: a quick mental image, the sillier the better.
- **Link it**: name one synonym and one antonym.
Five words, done well, beat twenty words glanced at.

### 3. Read something real (5+ minutes)
Vocabulary grows fastest from reading above your comfort level: nonfiction articles, classic novels, science writing. When you hit an unknown word, guess from context, *then* check. Add the ones you guessed wrong to your review deck.

### Weekly
Once a week, take 10 minutes to write a short paragraph using eight words from the deck. Producing a word is the strongest retrieval there is.`
    },
    {
      type: 'concept',
      title: 'The 30 highest-yield roots and prefixes',
      md: `Learn these and you can decode thousands of words. Each line: part, meaning, examples.

**Prefixes**
1. **a- / an-** — not, without — *atypical, anonymous, apathy*
2. **anti-** — against — *antidote, antisocial, antagonist*
3. **bene-** — good, well — *benefit, benevolent, benign*
4. **circum-** — around — *circumference, circumvent, circumstance*
5. **con- / com-** — with, together — *connect, compile, consensus*
6. **de-** — down, away, reverse — *descend, deflate, detract*
7. **dis-** — not, apart — *disagree, dispel, disparate*
8. **ex- / e-** — out — *exit, exclude, emit*
9. **in- / im-** — not (also: into) — *invisible, impartial, inert*
10. **inter-** — between — *interrupt, intervene, interact*
11. **mal-** — bad — *malfunction, malicious, malady*
12. **pre-** — before — *preview, precede, premonition*
13. **re-** — again, back — *revise, retract, rejuvenate*
14. **sub-** — under — *submarine, subtle, subordinate*
15. **trans-** — across — *transport, transparent, transcend*

**Roots**
16. **aud** — hear — *audible, audience, auditorium*
17. **chron** — time — *chronological, chronic, synchronize*
18. **cred** — believe — *credible, incredible, credulous*
19. **dict** — say — *dictate, predict, contradict*
20. **duc / duct** — lead — *conduct, induce, deduce*
21. **graph / gram** — write — *autograph, grammar, biography*
22. **ject** — throw — *reject, project, dejected*
23. **log / logy** — word, study — *dialogue, biology, eulogy*
24. **mit / miss** — send — *transmit, dismiss, emissary*
25. **path** — feeling, suffering — *sympathy, apathy, pathetic*
26. **port** — carry — *transport, portable, export*
27. **scrib / script** — write — *describe, manuscript, inscription*
28. **spec / spect** — look — *inspect, spectator, perspective*
29. **vid / vis** — see — *video, visible, envision*
30. **voc / vok** — call, voice — *vocal, provoke, advocate*

**Suffixes worth knowing:** *-ous* (full of), *-less* (without), *-ify* (to make), *-ology* (study of), *-ist* (one who), *-able/-ible* (can be).

Practice: *incredulous* = in (not) + cred (believe) + -ous (full of) = not believing. *Circumspect* = circum (around) + spect (look) = looking around carefully, cautious.`
    },
    {
      type: 'worked',
      title: 'Worked example (think-aloud): learning one word properly',
      md: `**New word:** *benevolent*

**Break it.** I notice *bene-* from the list: good. *Vol* I connect to *volunteer* and *voluntary*, both about wanting or willing. So: good-willing. Wanting good for others.

**Sentence it.** Something from my own life: "My benevolent neighbor shovels our walk before we wake up." I notice this is better than "The king was benevolent," because I can see my neighbor.

**Picture it.** A grandmotherly figure with a shovel and a halo. Silly, but it sticks.

**Link it.** Synonym: *kind, generous*. Antonym: *malevolent*, and I notice that is the same word with *mal-* (bad) swapped in. Two words for the price of one.

**Retrieve it.** I close the page and say: "Benevolent: kind, wanting good for others; opposite malevolent; my neighbor with the shovel." Tomorrow the review will ask again, and I will not flip the card until I have said the definition.

Total time: about one minute. Five words like this per day is 150 words a month, and because each one has four hooks and is retrieved on a schedule, they stay.`
    },
    {
      type: 'faded',
      title: 'Your turn, with scaffolding',
      md: `**New word:** *retract*

**Break it (done).** *re-* = back; *tract* = pull (as in *tractor*, *attract*, *extract*).
**Sentence it (done).** "The newspaper had to retract the story after the facts turned out to be wrong."

Now finish: put the parts together into a definition, choose the synonym, and name the antonym. Then decode a related word using the same pieces.`,
      question: {
        stem: 'Using the parts re- (back) and tract (pull), "retract" most nearly means',
        choices: ['to repeat', 'to take back', 'to pull apart', 'to attract again'],
        answer: 1,
        explanation: 'Re- (back) + tract (pull) = to pull back, which in use means to take back or withdraw, as a newspaper withdraws a false story. "Repeat" uses the "again" sense of re- without the root. "Pull apart" would be dis- + tract. "Attract again" wrongly treats "tract" as "attract."'
      }
    },
    {
      type: 'trap',
      title: 'Common traps',
      md: `- **Rereading the list.** Feels productive, builds nothing. Cover the definition and say it.
- **Flipping the card too soon.** The struggle to recall *is* the learning. Give it five seconds.
- **Cramming the night before.** Spacing is what moves words to long-term memory. Start weeks out, ten minutes a day.
- **Twenty new words a day.** Most will be gone by Friday. Five, with hooks, every day.
- **Root literalism.** Roots suggest meaning; usage decides. *Circumvent* is not *surround*. Always confirm with a sentence.
- **Studying only lists.** Words met in real reading come with a story attached, and stories are hooks.
- **Marking "knew it" when you almost knew it.** Honest grading is what makes the spacing schedule work.`
    },
    {
      type: 'check',
      title: 'Quick check',
      questions: [
        {
          stem: 'Two students each spend 70 minutes a week on vocabulary. Student A studies for 70 minutes on Sunday by rereading a list. Student B spends 10 minutes a day testing herself from flashcards before flipping them. Who is likely to remember more on a test three weeks later, and why?',
          choices: ['Student A, because one long session allows deeper focus', 'Student B, because spaced retrieval builds stronger memories than massed rereading', 'They will remember the same amount, since the total time is equal', 'Student A, because rereading builds recognition, which is what tests measure'],
          answer: 1,
          explanation: 'Student B uses both spacing (daily sessions) and retrieval (recalling before flipping), the two most reliable findings in memory research. Student A gets only recognition from rereading, which fades quickly. Equal total time does not produce equal memory; how the time is used matters more.'
        },
        {
          stem: 'Using the roots list, "inaudible" most nearly means',
          choices: ['impossible to see', 'impossible to hear', 'spoken loudly', 'written badly'],
          answer: 1,
          explanation: 'In- (not) + aud (hear) + -ible (can be) = cannot be heard. "Impossible to see" would use vid/vis. "Spoken loudly" reverses the meaning, and "written badly" would involve graph or scrib with mal-.'
        },
        {
          stem: 'Which of these is the strongest way to learn the word "malady" so that it is still remembered a month later?',
          choices: ['Read its definition five times in a row.', 'Highlight it in a vocabulary book.', 'Connect mal- (bad) to its meaning (illness), write a sentence about a time you were sick, and retrieve it on a spaced schedule.', 'Copy the definition once into a notebook and move on.'],
          answer: 2,
          explanation: 'Choice C uses a root hook, a personal sentence, and spaced retrieval, which together give the word several paths into memory and strengthen them over time. Rereading, highlighting, and one-time copying all rely on exposure rather than retrieval and fade within days.'
        },
        {
          stem: 'A student meets the word "circumspect" while reading, guesses "cautious" from context, and checks: correct. What should she do next with the site\'s vocabulary review?',
          choices: ['Nothing; a correct guess means the word is learned.', 'Add it to her review deck anyway, so spaced retrieval can confirm it over the coming weeks.', 'Look up ten more words with circum- and memorize them tonight.', 'Reread the paragraph three times to make the word stick.'],
          answer: 1,
          explanation: 'One correct guess is a start, not a memory. Adding the word to the deck lets the review schedule retrieve it tomorrow, next week, and later, which is what makes it permanent. Cramming ten related words tonight or rereading the paragraph both skip the spaced retrieval that does the real work.'
        }
      ]
    },
    {
      type: 'summary',
      md: `- Memory comes from retrieval, not rereading: say the meaning before you flip.
- Space it: ten minutes a day beats one long session. The site's review schedules the spacing for you.
- Hook every new word: break it (roots), sentence it (your life), picture it, link it (synonym and antonym).
- Five well-learned words a day is 150 a month that stay.
- Know the 30 roots and prefixes; confirm every decoded meaning with a sentence.
- Read above your level daily, and feed the words you miss back into the deck.`
    }
  ]
});

module.exports = { lessons };
