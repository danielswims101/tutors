// Reading comprehension bank: original passages, passage-based questions, and HSPT standalone reading vocabulary.
// Exports { passages, questions } per content/SCHEMA.md
'use strict';

const passages = [];
const questions = [];

// ---------------------------------------------------------------------------
// LEVEL 1 PASSAGES (grades 3-5)
// ---------------------------------------------------------------------------

passages.push({
  id: 'rc-seed-travel',
  test: 'all',
  level: 1,
  title: 'How Seeds Travel',
  genre: 'science',
  wordCount: 226,
  text: `A plant cannot walk, run, or fly. Yet somehow, a dandelion that grows in one yard can have children growing a mile away the next summer. How does a plant send its seeds so far from home?

Many seeds travel on the wind. A dandelion seed is attached to a tiny tuft of white hairs that works like a parachute. When a breeze comes, the seed floats up and drifts until it lands. Maple seeds have thin wings that make them spin like helicopters as they fall, which keeps them in the air longer.

Other seeds hitch a ride on animals. Some seeds, like burrs, are covered with little hooks. When a dog or a deer brushes past, the hooks grab onto fur, and the seed rides along until it falls off far away. Fruits like berries work differently. A bird eats the sweet fruit, flies to a new place, and leaves the seeds behind in its droppings.

A few seeds even travel by water. A coconut can float for weeks on the ocean before washing up on a distant beach, where it may sprout into a new palm tree.

Plants cannot move, but their seeds can. By using wind, animals, and water, plants make sure their young do not all crowd together in one spot, where they would have to fight for sunlight and water.`
});

questions.push(
  {
    id: 'rc-seed-travel-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rc-seed-travel',
    stem: `Which sentence best states the main idea of the passage?`,
    choices: [`Dandelion seeds float on the wind like parachutes.`, `Plants use several different methods to spread their seeds far from home.`, `Birds eat berries and carry the seeds to new places.`, `Coconuts can float across the ocean for weeks.`],
    answer: 1,
    explanation: `The passage opens with a question in paragraph 1 (how does a plant send its seeds far away?) and then answers it with three methods: wind (paragraph 2), animals (paragraph 3), and water (paragraph 4). Only choice B covers all of those paragraphs. Choices A, C, and D are each true details from a single paragraph, which is the classic main-idea trap. Strategy: the main idea must cover the whole passage, not one paragraph.`
  },
  {
    id: 'rc-seed-travel-q2', test: 'all', section: 'reading', skill: 'detail', level: 1, passageId: 'rc-seed-travel',
    stem: `According to the passage, maple seeds stay in the air longer because they`,
    choices: [`are lighter than dandelion seeds.`, `are attached to white hairs.`, `have thin wings that make them spin.`, `are carried away by birds.`],
    answer: 2,
    explanation: `Paragraph 2 says maple seeds "have thin wings that make them spin like helicopters as they fall, which keeps them in the air longer." Choice B describes dandelion seeds, not maples, and choice D describes berries in paragraph 3. Choice A is never stated. Strategy: for a detail question, go back and find the exact sentence; do not answer from memory.`
  },
  {
    id: 'rc-seed-travel-q3', test: 'all', section: 'reading', skill: 'inference', level: 1, passageId: 'rc-seed-travel',
    stem: `The passage suggests that if all of a plant's seeds landed right next to the parent plant, the young plants would`,
    choices: [`have to compete with one another for sunlight and water.`, `grow taller than the parent plant.`, `be eaten by birds and deer.`, `float away on the ocean.`],
    answer: 0,
    explanation: `The final paragraph says plants spread their seeds so their young "do not all crowd together in one spot, where they would have to fight for sunlight and water." Choice A is the direct consequence of that crowding. Choice C is tempting because animals appear in paragraph 3, but there they help seeds move; nothing says they eat seedlings. Strategy: an inference must be supported by a specific sentence, even if the passage does not say it in the same words.`
  },
  {
    id: 'rc-seed-travel-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rc-seed-travel',
    stem: `In paragraph 3, the phrase "hitch a ride" most nearly means`,
    choices: [`fall off quickly.`, `get carried along by something else.`, `grab onto food.`, `grow larger.`],
    answer: 1,
    explanation: `Paragraph 3 explains that burrs hook onto fur and "ride along" with a dog or deer, and that berry seeds travel inside a bird. So "hitch a ride" means to be carried by another creature, choice B. Choice A is tempting because the seeds do eventually fall off, but that is the end of the ride, not the ride itself. Strategy: replace the phrase with each choice and check which one fits the surrounding sentences.`
  },
  {
    id: 'rc-seed-travel-q5', test: 'all', section: 'reading', skill: 'tone-purpose', level: 1, passageId: 'rc-seed-travel',
    stem: `The author's main purpose in writing this passage is to`,
    choices: [`persuade readers to plant more trees.`, `tell a story about a dog and a deer.`, `warn readers that burrs stick to fur.`, `explain how seeds move to new places.`],
    answer: 3,
    explanation: `Every paragraph gives factual information about how seeds travel, with no opinion, no story, and no request for action, so the purpose is to explain (choice D). Choice C is tempting because burrs are mentioned in paragraph 3, but they are one example, not a warning. Strategy: ask whether the author is trying to inform, persuade, entertain, or describe; a passage full of facts and examples is informing.`
  },
  {
    id: 'rc-seed-travel-q6', test: 'all', section: 'reading', skill: 'structure', level: 1, passageId: 'rc-seed-travel',
    stem: `How is the passage organized?`,
    choices: [`It asks a question in the first paragraph and answers it with examples in the paragraphs that follow.`, `It tells the events of one seed's journey in the order they happened.`, `It compares plants that can move with plants that cannot.`, `It lists problems that seeds face and how plants solve each one.`],
    answer: 0,
    explanation: `Paragraph 1 ends with the question "How does a plant send its seeds so far from home?" and paragraphs 2 through 4 each give one answer (wind, animals, water). That is a question-and-answer structure, choice A. Choice B is wrong because the passage follows no single seed through time, and choice D is wrong because no problems are listed. Strategy: look at how the first paragraph sets up the rest and how the body paragraphs are related to each other.`
  }
);

passages.push({
  id: 'rc-lost-mitten',
  test: 'all',
  level: 1,
  title: 'The Lost Mitten',
  genre: 'fiction',
  wordCount: 237,
  text: `Nina stood at the bus stop with one hand warm and one hand freezing. Somewhere between her front door and the corner, her left mitten had disappeared.

"It's just a mitten," said her older brother, Theo, stamping his boots in the snow. "Put your hand in your pocket."

But it was not just a mitten. Grandma had knitted the pair last winter, red with a white stripe, and she had let Nina pick the colors. Nina looked back down the sidewalk. The snow was coming down thick now, filling in their footprints.

"The bus will be here in two minutes," Theo said. "If we miss it, Mom has to drive us, and she'll be late for work."

Nina knew he was right. She shoved her bare hand into her pocket and tried not to think about the mitten lying somewhere under the snow.

The bus came. Nina sat by the window and stared at the white street. Theo sat beside her and said nothing. He did not tease her, which was unusual.

That afternoon, when the bus dropped them off, Theo walked ahead with his head down, kicking at the snow along the edge of the sidewalk. Halfway home, he bent over, dug for a moment, and stood up holding something small and red.

"Found it," he said, and tossed it to her as if it were nothing at all. But Nina saw that he was smiling.`
});

questions.push(
  {
    id: 'rc-lost-mitten-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rc-lost-mitten',
    stem: `Which statement best describes what the story is mostly about?`,
    choices: [`A girl misses the school bus because of bad weather.`, `A brother who seems unbothered quietly helps his sister find something she loves.`, `A grandmother knits mittens for her grandchildren every winter.`, `Two children argue about who should drive them to school.`],
    answer: 1,
    explanation: `The story follows Theo from "It's just a mitten" (paragraph 2) to his quiet search and smile in the final paragraphs, so the heart of the story is his hidden care for Nina, choice B. Choice C is a detail from paragraph 3 that explains why the mitten matters but is not what the story is about. Choice A never happens; they catch the bus. Strategy: for fiction, the main idea usually involves how a character changes or what a character reveals by the end.`
  },
  {
    id: 'rc-lost-mitten-q2', test: 'all', section: 'reading', skill: 'detail', level: 1, passageId: 'rc-lost-mitten',
    stem: `Why does Theo say they should not go back for the mitten?`,
    choices: [`He thinks the mitten is ugly.`, `He is cold and wants to get on the bus.`, `Missing the bus would make their mother late for work.`, `He knows the mitten is already buried too deep to find.`],
    answer: 2,
    explanation: `In paragraph 4 Theo says, "If we miss it, Mom has to drive us, and she'll be late for work." That is his stated reason, choice C. Choice B is tempting because he is stamping his boots in the snow, but the story never says he is cold, and that is not the reason he gives. Strategy: when a question asks "why," find the character's own words or the narrator's explanation rather than guessing.`
  },
  {
    id: 'rc-lost-mitten-q3', test: 'all', section: 'reading', skill: 'inference', level: 1, passageId: 'rc-lost-mitten',
    stem: `Which clue in the story best shows that Theo cares about Nina's feelings more than he lets on?`,
    choices: [`He stamps his boots in the snow.`, `He tells her to put her hand in her pocket.`, `He says the bus will arrive in two minutes.`, `He does not tease her on the bus, which is unusual for him.`],
    answer: 3,
    explanation: `Paragraph 6 says Theo "did not tease her, which was unusual." The word "unusual" tells us he is behaving differently because he knows she is upset, so choice D is the clue. Choice B is tempting because it sounds a little helpful, but it is really part of his "it's just a mitten" dismissal. Strategy: authors signal hidden feelings through changes in a character's normal behavior; look for words like "unusual."`
  },
  {
    id: 'rc-lost-mitten-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rc-lost-mitten',
    stem: `In the first paragraph, the word "disappeared" most nearly means`,
    choices: [`gone missing.`, `been torn.`, `fallen apart.`, `turned cold.`],
    answer: 0,
    explanation: `Paragraph 1 says the mitten "had disappeared" somewhere between the door and the corner, and the rest of the story is about finding it, so it was lost, choice A. Choice D is tempting because Nina's hand is freezing, but that describes her hand, not the mitten. Strategy: check the sentences after the word; Theo later finds the mitten whole, so it was not torn or fallen apart.`
  },
  {
    id: 'rc-lost-mitten-q5', test: 'all', section: 'reading', skill: 'inference', level: 1, passageId: 'rc-lost-mitten',
    stem: `The last sentence of the story suggests that Theo`,
    choices: [`is embarrassed because he lost the mitten himself.`, `is happy that he found the mitten for his sister.`, `wants Nina to give him the mitten.`, `thinks the red mitten looks funny.`],
    answer: 1,
    explanation: `In the final paragraph Theo tosses the mitten "as if it were nothing at all," but Nina "saw that he was smiling." The contrast between his casual act and his smile shows he is secretly pleased to have helped, choice B. Choice A is wrong because nothing in the story says Theo lost it; Nina lost it (paragraph 1). Strategy: when a character's words and actions do not match, the action (the smile) usually reveals the true feeling.`
  },
  {
    id: 'rc-lost-mitten-q6', test: 'all', section: 'reading', skill: 'structure', level: 1, passageId: 'rc-lost-mitten',
    stem: `Why does the author include the sentence "The snow was coming down thick now, filling in their footprints"?`,
    choices: [`to show that the children are enjoying the snow.`, `to explain why the bus is running late.`, `to show that the mitten will become harder to find as time passes.`, `to describe what Nina's mitten looks like.`],
    answer: 2,
    explanation: `The sentence appears in paragraph 3 right after Nina looks back down the sidewalk. If snow is filling in footprints, it is also covering the mitten, which raises the worry that it will be lost for good, choice C. Choice B is wrong because the bus arrives on time. Strategy: when asked why an author includes a detail, ask what it makes the reader feel or expect at that moment in the story.`
  }
);

passages.push({
  id: 'rc-pony-express',
  test: 'all',
  level: 1,
  title: 'Riders of the Pony Express',
  genre: 'history',
  wordCount: 227,
  text: `In 1860, a letter from Missouri to California could take weeks to arrive by stagecoach or many months by ship. A group of businessmen had a bold idea: what if riders on fast horses carried the mail in relays, day and night, across almost two thousand miles of prairie, desert, and mountains?

That idea became the Pony Express. Stations were built every ten to fifteen miles along the route from St. Joseph, Missouri, to Sacramento, California. A rider would gallop into a station, leap off his tired horse, throw the mail pouch over a fresh one, and race off again in less than two minutes. After seventy-five miles or more, a new rider would take over. In this way, the mail moved about two hundred miles a day. A letter could cross the country in about ten days.

The riders were mostly young men, often teenagers, chosen because they were light and could ride for hours. They faced blizzards, burning heat, and long stretches with no one around for miles.

The Pony Express was famous, but it did not last long. In October 1861, workers finished a telegraph line that connected the East and West. A message that took ten days by horse now took only minutes by wire. Just nineteen months after it began, the Pony Express closed. Yet its daring riders are still remembered today.`
});

questions.push(
  {
    id: 'rc-pony-express-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rc-pony-express',
    stem: `This passage is mostly about`,
    choices: [`how the telegraph was invented.`, `how the Pony Express carried mail quickly across the country and why it ended.`, `why teenagers made the best horse riders.`, `the dangers of crossing the desert on horseback.`],
    answer: 1,
    explanation: `Paragraph 1 introduces the idea, paragraph 2 explains how the relay system worked, paragraph 3 describes the riders, and paragraph 4 explains why it ended. Choice B is the only option that covers that whole arc. Choice A is tempting because the telegraph appears in paragraph 4, but it is there only to explain the ending. Strategy: the main idea must cover the whole passage; a choice drawn from one paragraph is too narrow.`
  },
  {
    id: 'rc-pony-express-q2', test: 'all', section: 'reading', skill: 'detail', level: 1, passageId: 'rc-pony-express',
    stem: `According to the passage, how often did a rider switch to a fresh horse?`,
    choices: [`every ten to fifteen miles.`, `every seventy-five miles.`, `every two hundred miles.`, `once a day.`],
    answer: 0,
    explanation: `Paragraph 2 says stations were built "every ten to fifteen miles," and at each station the rider threw the mail pouch "over a fresh" horse. Choice B is the trap: seventy-five miles is when a new rider took over, not a new horse. Strategy: this passage gives several numbers; match each number to exactly what it measures before choosing.`
  },
  {
    id: 'rc-pony-express-q3', test: 'all', section: 'reading', skill: 'inference', level: 1, passageId: 'rc-pony-express',
    stem: `Why were light riders probably chosen for the Pony Express?`,
    choices: [`Light riders could carry more mail in their pouches.`, `Light riders were easier to train.`, `Light riders did not get cold in blizzards.`, `A horse carrying less weight could run faster and longer.`],
    answer: 3,
    explanation: `Paragraph 3 says riders were "chosen because they were light and could ride for hours," and paragraph 2 stresses speed. Putting those together, a lighter load lets a horse keep up a fast pace, choice D. Choice A sounds logical but is not supported; the passage never links rider weight to mail capacity. Strategy: an inference should connect two facts the passage actually gives, not add a new idea.`
  },
  {
    id: 'rc-pony-express-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rc-pony-express',
    stem: `In paragraph 1, the word "bold" most nearly means`,
    choices: [`foolish.`, `expensive.`, `daring.`, `simple.`],
    answer: 2,
    explanation: `The "bold idea" in paragraph 1 is to race horses across two thousand miles of prairie, desert, and mountains day and night, which is brave and risky, so "daring" (choice C) fits. Choice A is tempting because the plan failed after nineteen months, but the author calls the riders "daring" in the last paragraph and clearly admires them. Strategy: use the author's attitude elsewhere in the passage to decide between positive and negative meanings.`
  },
  {
    id: 'rc-pony-express-q5', test: 'all', section: 'reading', skill: 'structure', level: 1, passageId: 'rc-pony-express',
    stem: `The last paragraph is mainly about`,
    choices: [`why the Pony Express came to an end.`, `what the riders ate at the stations.`, `how letters traveled by ship.`, `how the stations were built.`],
    answer: 0,
    explanation: `Paragraph 4 begins "The Pony Express was famous, but it did not last long" and then explains that the telegraph made it unnecessary. That makes choice A the topic of the paragraph. Choice C refers to paragraph 1, and choice D refers to paragraph 2. Strategy: for a paragraph-purpose question, read the first sentence of the paragraph; it usually announces the topic.`
  },
  {
    id: 'rc-pony-express-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 1, passageId: 'rc-pony-express',
    stem: `The author's attitude toward the Pony Express riders can best be described as`,
    choices: [`admiring.`, `suspicious.`, `amused.`, `bored.`],
    answer: 0,
    explanation: `The author calls the riders "daring" in the final paragraph and lists the hardships they faced in paragraph 3 (blizzards, burning heat, loneliness) in a way that highlights their courage. That is admiration, choice A. Choice C might tempt a reader because the two-minute horse switch is lively, but nothing is treated as funny. Strategy: look at the adjectives the author chooses; "daring" and "famous" are words of respect.`
  }
);

passages.push({
  id: 'rc-grandpa-garden',
  test: 'all',
  level: 1,
  title: 'A Little Bit Every Day',
  genre: 'biography',
  wordCount: 236,
  text: `When I was seven, my grandfather gave me a square of dirt behind his garage and told me it was mine. "Grow whatever you want," he said. "But you have to do the work yourself."

I wanted tomatoes, because I liked the way they looked in the store, stacked red and shiny. Grandpa handed me a packet of seeds and a trowel. I planted them all in one afternoon, dumped a bucket of water on top, and waited for tomatoes.

Nothing happened for two weeks. I complained that the seeds were broken. Grandpa just said, "Keep watering." When tiny green sprouts finally appeared, I was so excited that I watered them three times a day. Half of them drowned.

"Plants don't need everything at once," Grandpa said, kneeling beside me. "They need a little bit, every day, for a long time." He showed me how to feel the soil with my finger to know when it was thirsty.

By August, I had six plants and more tomatoes than our family could eat. We gave bags of them to the neighbors. I remember being proud, but what I remember most is that sentence about a little bit every day. I have thought about it before every test, every piano recital, and every hard thing I have tried since.

My grandfather never said he was teaching me about anything besides tomatoes. Maybe that is why the lesson stuck.`
});

questions.push(
  {
    id: 'rc-grandpa-garden-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rc-grandpa-garden',
    stem: `What is the main idea of this passage?`,
    choices: [`Tomatoes are difficult to grow without help.`, `The narrator's grandfather was an expert farmer.`, `Giving vegetables to neighbors makes a family proud.`, `A summer of gardening taught the narrator a lasting lesson about steady effort.`],
    answer: 3,
    explanation: `Paragraph 5 says the narrator has thought about "a little bit every day" before "every hard thing I have tried since," and paragraph 6 calls it "the lesson." The whole passage builds to that idea, choice D. Choice C is a detail from paragraph 5, and choice A is contradicted by the six healthy plants in August. Strategy: in a memoir, the main idea is usually stated near the end, where the writer looks back on what the experience meant.`
  },
  {
    id: 'rc-grandpa-garden-q2', test: 'all', section: 'reading', skill: 'detail', level: 1, passageId: 'rc-grandpa-garden',
    stem: `What happened when the narrator watered the sprouts three times a day?`,
    choices: [`They grew faster than expected.`, `Grandpa took over the garden.`, `They produced tomatoes early.`, `Half of them drowned.`],
    answer: 3,
    explanation: `Paragraph 3 says, "I watered them three times a day. Half of them drowned." Choice D restates that directly. Choice A is the trap: a reader might assume more water means more growth, which is exactly the mistake the narrator made. Strategy: detail questions reward going back to the text rather than relying on what seems sensible.`
  },
  {
    id: 'rc-grandpa-garden-q3', test: 'all', section: 'reading', skill: 'inference', level: 1, passageId: 'rc-grandpa-garden',
    stem: `Why does the narrator at first think the seeds are "broken"?`,
    choices: [`The narrator does not yet understand that seeds take time to sprout.`, `Grandpa gave the narrator old seeds by mistake.`, `The narrator planted the seeds too deep in the dirt.`, `The dirt behind the garage was too poor for tomatoes.`],
    answer: 0,
    explanation: `In paragraph 3, "Nothing happened for two weeks" and the narrator complained; then sprouts appeared after more watering. So the seeds were fine, and the seven-year-old simply expected instant results, choice A. Choices B, C, and D invent causes the passage never mentions, and all are disproved when the sprouts come up. Strategy: an inference about a character's mistake should match what the story later shows to be true.`
  },
  {
    id: 'rc-grandpa-garden-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rc-grandpa-garden',
    stem: `In paragraph 4, the word "thirsty" is used to describe soil that`,
    choices: [`is too wet.`, `is full of worms.`, `needs water.`, `has no plants in it.`],
    answer: 2,
    explanation: `Paragraph 4 says Grandpa showed the narrator "how to feel the soil with my finger to know when it was thirsty," right after explaining that plants need "a little bit" of water each day. Thirsty soil is dry soil that needs water, choice C. Choice A is the opposite and is the mistake the narrator had just made. Strategy: "thirsty" is used figuratively here; ask what a thirsty person needs and apply it to the soil.`
  },
  {
    id: 'rc-grandpa-garden-q5', test: 'all', section: 'reading', skill: 'inference', level: 1, passageId: 'rc-grandpa-garden',
    stem: `The last paragraph suggests that the lesson "stuck" because`,
    choices: [`Grandpa repeated it every single day.`, `Grandpa let the narrator discover it rather than announcing it as a lesson.`, `the narrator wrote it down in a notebook.`, `the tomatoes tasted better than store-bought ones.`],
    answer: 1,
    explanation: `Paragraph 6 says Grandpa "never said he was teaching me about anything besides tomatoes. Maybe that is why the lesson stuck." The word "that" points to his not announcing the lesson, so choice B is correct. Choice A is tempting because the lesson is about doing something every day, but the passage never says Grandpa repeated it. Strategy: when a sentence says "that is why," find what "that" refers to in the sentence before.`
  },
  {
    id: 'rc-grandpa-garden-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 1, passageId: 'rc-grandpa-garden',
    stem: `The narrator's tone in this passage is best described as`,
    choices: [`angry.`, `bored.`, `worried.`, `grateful and thoughtful.`],
    answer: 3,
    explanation: `The narrator looks back on the summer with warmth, remembers being "proud" (paragraph 5), and credits the grandfather's lesson with helping through "every hard thing" since. That mixture of appreciation and reflection is choice D. Choice C might tempt a reader because the narrator worried about the seeds in paragraph 3, but that is a feeling from the past, not the tone of the telling. Strategy: tone is the attitude of the voice telling the story, not the feelings of the characters inside it.`
  }
);

// ---------------------------------------------------------------------------
// LEVEL 2 PASSAGES (grades 5-6)
// ---------------------------------------------------------------------------

passages.push({
  id: 'rc-leaves-color',
  test: 'all',
  level: 2,
  title: 'What Was Underneath',
  genre: 'science',
  wordCount: 253,
  text: `Every autumn, the green hills of New England turn gold, orange, and scarlet, and visitors drive for hours just to look. The show seems like magic, but it is actually chemistry, and the colors have been hiding in the leaves all summer long.

A leaf is green because it is packed with chlorophyll, the pigment that captures sunlight and turns it into food for the tree. All summer, the tree keeps making fresh chlorophyll to replace what breaks down. Chlorophyll is so plentiful that it masks the other pigments in the leaf: yellow and orange carotenoids, the same substances that color carrots and corn.

As days grow shorter and nights grow cooler, the tree gets a signal. It is time to prepare for winter, when there will be too little light to make food. The tree stops producing chlorophyll and begins sealing off each leaf at the stem. As the green fades, the yellows and oranges that were there all along finally show through.

Red is a different story. Some trees, such as sugar maples, produce bright red pigments called anthocyanins only in the fall, when sugars get trapped in the leaf after the stem is sealed. A sunny, dry autumn with cool nights produces the most sugar and therefore the most brilliant reds. A rainy, warm autumn tends to be dull.

Eventually, the seal at the stem is complete, the leaf lets go, and the tree stands bare until spring. The colors were never a goodbye. They were simply what was underneath.`
});

questions.push(
  {
    id: 'rc-leaves-color-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rc-leaves-color',
    stem: `The passage is mainly about`,
    choices: [`the best places to see fall colors.`, `how chlorophyll makes food for trees.`, `the science behind why leaves change color in autumn.`, `why sugar maples are more valuable than other trees.`],
    answer: 2,
    explanation: `Paragraph 1 announces that the color change "is actually chemistry," and paragraphs 2 through 5 explain that chemistry step by step. Choice C captures the whole passage. Choice B is tempting because chlorophyll is explained in paragraph 2, but that is one piece of the explanation, not the subject. Strategy: a main-idea answer should be broad enough to include every body paragraph but not so broad that it could describe any science passage.`
  },
  {
    id: 'rc-leaves-color-q2', test: 'all', section: 'reading', skill: 'detail', level: 2, passageId: 'rc-leaves-color',
    stem: `According to the passage, the yellow and orange pigments in a leaf`,
    choices: [`are produced only in the fall.`, `are present all summer but hidden by chlorophyll.`, `come from sugars trapped in the leaf.`, `appear only in sugar maples.`],
    answer: 1,
    explanation: `Paragraph 2 says chlorophyll "masks the other pigments in the leaf: yellow and orange carotenoids," and paragraph 3 says these colors "were there all along." That is choice B. Choices A and C describe red anthocyanins from paragraph 4, which is the trap: the passage deliberately contrasts red with yellow and orange. Strategy: when a passage describes two different processes, keep a mental note of which facts belong to which.`
  },
  {
    id: 'rc-leaves-color-q3', test: 'all', section: 'reading', skill: 'inference', level: 2, passageId: 'rc-leaves-color',
    stem: `Based on the passage, which kind of autumn weather would most likely produce the dullest leaf colors?`,
    choices: [`warm, rainy days.`, `sunny days and cool nights.`, `dry days with frosty nights.`, `windy days with clear skies.`],
    answer: 0,
    explanation: `Paragraph 4 states that "a sunny, dry autumn with cool nights produces the most sugar and therefore the most brilliant reds," while "a rainy, warm autumn tends to be dull." So warm, rainy weather (choice A) gives the dullest colors. Choice B is the opposite of the right answer; it produces the brightest colors. Strategy: when a passage gives a cause-and-effect pair, an inference question often asks you to flip it around.`
  },
  {
    id: 'rc-leaves-color-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rc-leaves-color',
    stem: `In paragraph 2, the word "masks" most nearly means`,
    choices: [`protects.`, `destroys.`, `copies.`, `hides.`],
    answer: 3,
    explanation: `Paragraph 2 says chlorophyll is "so plentiful that it masks the other pigments," and paragraph 3 says those pigments "finally show through" when the green fades. Something that later shows through was hidden, not destroyed, so choice D is correct. Choice B is the trap because chlorophyll itself "breaks down," but it does not break down the other pigments. Strategy: read one sentence past the word; the follow-up usually confirms the meaning.`
  },
  {
    id: 'rc-leaves-color-q5', test: 'all', section: 'reading', skill: 'structure', level: 2, passageId: 'rc-leaves-color',
    stem: `Why does the author begin paragraph 4 with the sentence "Red is a different story"?`,
    choices: [`to signal that red pigments form in a different way than yellow and orange.`, `to argue that red leaves are the most beautiful.`, `to introduce a story about one particular sugar maple.`, `to explain why some trees never turn red at all.`],
    answer: 0,
    explanation: `Paragraphs 2 and 3 explain that yellow and orange were present all along, while paragraph 4 explains that red is newly produced in the fall. The sentence is a transition that warns the reader a contrast is coming, choice A. Choice C takes the word "story" literally, but no narrative follows. Strategy: short sentences at the start of a paragraph are often signposts telling you how the new paragraph relates to the old one.`
  },
  {
    id: 'rc-leaves-color-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 2, passageId: 'rc-leaves-color',
    stem: `What does the author mean by saying "The colors were never a goodbye"?`,
    choices: [`Trees do not actually lose their leaves in winter.`, `Visitors should stay in New England through the winter.`, `The colors are not a sign of the tree dying but a reveal of pigments that were already present.`, `Red leaves last longer on the tree than yellow ones.`],
    answer: 2,
    explanation: `The final paragraph pairs "never a goodbye" with "simply what was underneath," echoing paragraph 1 ("the colors have been hiding in the leaves all summer"). The author is correcting the romantic idea that fall colors are a farewell, choice C. Choice A is directly contradicted: "the tree stands bare until spring." Strategy: when a closing line is poetic, match it to the plain statement earlier in the passage that it echoes.`
  }
);

passages.push({
  id: 'rc-the-tryout',
  test: 'all',
  level: 2,
  title: 'A Good Recovery',
  genre: 'fiction',
  wordCount: 291,
  text: `Marcus had practiced the audition piece so many times that his fingers could play it while his mind wandered. That was exactly the problem. On the morning of the tryout for the regional youth orchestra, he was more afraid of his wandering mind than of the judges.

His mother dropped him off at the music school at eight. "You'll be wonderful," she said, the way she always did. Marcus nodded, the way he always did, and carried his cello up the steps.

The waiting room was full of students clutching instrument cases and sheet music. A girl with a violin was tapping out rhythms on her knee. A boy with a trumpet kept wiping his palms on his jeans. Nobody talked. Marcus found a chair in the corner and sat with his cello between his knees like a shield.

When his name was called, he walked into a room with three judges behind a long table. One of them, an older man with silver glasses, smiled and said, "Whenever you're ready."

Marcus lifted his bow. The first phrase came out clean. The second was better. Then, in the middle of the third page, his left hand slipped and a note came out sour, loud, and wrong.

He felt his face burn. For half a second, he wanted to stop. Instead, he took a breath and played on, and the final measures were the best he had ever played them.

Afterward, the judge with silver glasses made a note on his paper. "Thank you, Marcus," he said. "That was a good recovery."

Marcus walked out not knowing whether he had made the orchestra. But he knew, for the first time, that a mistake did not have to be the end of anything.`
});

questions.push(
  {
    id: 'rc-the-tryout-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rc-the-tryout',
    stem: `Which sentence best expresses the theme of the story?`,
    choices: [`Practicing too much can hurt a performance.`, `Judges are kinder than they appear.`, `Younger musicians are usually more nervous than older ones.`, `A mistake does not have to ruin a performance if you keep going.`],
    answer: 3,
    explanation: `The final paragraph states the lesson directly: Marcus "knew, for the first time, that a mistake did not have to be the end of anything." The whole story builds to that moment, so choice D is the theme. Choice A is tempting because paragraph 1 says over-practice let his mind wander, but the story never shows this hurting him; the slip is physical, and he recovers. Strategy: a theme is the insight a character gains, often stated in the last lines.`
  },
  {
    id: 'rc-the-tryout-q2', test: 'all', section: 'reading', skill: 'detail', level: 2, passageId: 'rc-the-tryout',
    stem: `Why is Marcus afraid of his "wandering mind" in the first paragraph?`,
    choices: [`He has not practiced the piece enough.`, `He has practiced so much that he can play without paying attention, and he worries about losing focus.`, `He thinks the judges will ask him difficult questions.`, `He has forgotten how the piece begins.`],
    answer: 1,
    explanation: `Paragraph 1 says he had practiced "so many times that his fingers could play it while his mind wandered. That was exactly the problem." His fear is that automatic playing will let his attention drift, choice B. Choice A is the opposite of what the text says. Strategy: the phrase "that was exactly the problem" points backward to the previous sentence; read the two together.`
  },
  {
    id: 'rc-the-tryout-q3', test: 'all', section: 'reading', skill: 'inference', level: 2, passageId: 'rc-the-tryout',
    stem: `The description of the waiting room in paragraph 3 mainly suggests that`,
    choices: [`every student in the room is nervous.`, `the students are close friends.`, `the room is too small for everyone.`, `the audition is running late.`],
    answer: 0,
    explanation: `Paragraph 3 shows a girl tapping rhythms on her knee, a boy wiping sweaty palms on his jeans, and total silence; these are all signs of nerves, so choice A is the inference. Choice B is contradicted by "Nobody talked." Choices C and D add facts the passage never gives. Strategy: when an author describes several small physical behaviors, ask what feeling they have in common.`
  },
  {
    id: 'rc-the-tryout-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rc-the-tryout',
    stem: `In paragraph 3, the author says Marcus held his cello "like a shield." This comparison suggests that Marcus`,
    choices: [`is proud to show off his instrument.`, `is worried the cello will be damaged.`, `plans to leave before his turn is called.`, `feels he needs protection in a stressful situation.`],
    answer: 3,
    explanation: `A shield is something you hold up to protect yourself, and paragraph 3 places Marcus in a silent, tense room full of anxious students. The comparison shows he feels exposed and is using the cello as a barrier, choice D. Choice B reverses the image: the cello is protecting him, not the other way around. Strategy: for a figurative comparison, ask what the object (a shield) is normally for and apply that purpose to the character.`
  },
  {
    id: 'rc-the-tryout-q5', test: 'all', section: 'reading', skill: 'inference', level: 2, passageId: 'rc-the-tryout',
    stem: `What can be inferred from the judge's comment, "That was a good recovery"?`,
    choices: [`The judge did not notice the wrong note.`, `The judge noticed the mistake but was impressed by how Marcus continued.`, `Marcus has definitely made the orchestra.`, `The judge thinks Marcus needs much more practice.`],
    answer: 1,
    explanation: `You cannot praise a "recovery" without having noticed what was recovered from, so the judge heard the sour note (paragraph 5) and admired what Marcus did next (paragraph 6). That is choice B. Choice C goes too far: paragraph 8 says Marcus "walked out not knowing whether he had made the orchestra." Strategy: beware of answers that are more certain than the passage allows; "definitely" is a warning word.`
  },
  {
    id: 'rc-the-tryout-q6', test: 'all', section: 'reading', skill: 'structure', level: 2, passageId: 'rc-the-tryout',
    stem: `How does the author organize the story?`,
    choices: [`by comparing Marcus to the other students in the waiting room.`, `by describing the ending first and then explaining what led up to it.`, `in time order, from the morning drop-off through the end of the audition.`, `by alternating between Marcus's thoughts and his mother's.`],
    answer: 2,
    explanation: `The story moves straight through the day: the morning (paragraph 1), the drop-off at eight (paragraph 2), the waiting room (paragraph 3), the audition (paragraphs 4-7), and walking out (paragraph 8). That is chronological order, choice C. Choice A describes only paragraph 3, and the mother's thoughts (choice D) never appear. Strategy: scan for time markers such as "on the morning," "when his name was called," and "afterward."`
  }
);

passages.push({
  id: 'rc-lighthouse-keepers',
  test: 'all',
  level: 2,
  title: 'Keepers of the Light',
  genre: 'history',
  wordCount: 265,
  text: `Before radar and satellite navigation, a ship approaching a rocky coast at night depended on one thing: a light. For more than a century, lighthouses along the American coast were tended by keepers whose job was simple to describe and hard to do. Keep the light burning, every night, no matter what.

A keeper's day began in the evening. Before sunset, the keeper climbed the spiral stairs to the lamp room, trimmed the wicks, filled the lamps with oil, and polished the huge glass lens until it shone. Once the light was lit, someone had to stay awake to watch it through the night, winding the clockwork that turned the lens and wiping soot from the glass. At dawn, the light was put out and the whole routine began again.

The work could be lonely. Many lighthouses stood on islands or at the end of long spits of land, hours from the nearest town. Keepers often brought their families, and children grew up rowing to school or doing lessons by mail. When storms struck, keepers sometimes rowed out into the waves to pull sailors from wrecks.

Keepers were not all men. Women tended lights all along the coast, often taking over after a husband or father died. Some served for decades and were credited with saving dozens of lives.

By the 1900s, electric lights and automatic timers began to replace oil lamps and human hands. Today, almost every lighthouse in the country runs on its own. The towers still stand, but the keepers, with their trimmed wicks and polished lenses, have become part of history.`
});

questions.push(
  {
    id: 'rc-lighthouse-keepers-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rc-lighthouse-keepers',
    stem: `This passage is mainly about`,
    choices: [`the daily work and way of life of lighthouse keepers.`, `how to polish a lighthouse lens properly.`, `why ships often wrecked on rocky coasts.`, `the invention of electric lights.`],
    answer: 0,
    explanation: `Paragraph 1 introduces the keepers' job, paragraph 2 describes their nightly routine, paragraphs 3 and 4 describe their lives and who they were, and paragraph 5 explains how the job ended. Choice A covers all of that. Choice B is a single step from paragraph 2, and choice D is mentioned only in the last paragraph. Strategy: the title of a passage is often a hint; "Keepers of the Light" points to the people, not the equipment.`
  },
  {
    id: 'rc-lighthouse-keepers-q2', test: 'all', section: 'reading', skill: 'detail', level: 2, passageId: 'rc-lighthouse-keepers',
    stem: `According to the passage, what did a keeper do before sunset?`,
    choices: [`rowed to the nearest town for supplies.`, `trimmed the wicks, filled the lamps with oil, and polished the lens.`, `put out the light and went to sleep.`, `wound the clockwork that turned the lens.`],
    answer: 1,
    explanation: `Paragraph 2 says that "before sunset, the keeper climbed the spiral stairs to the lamp room, trimmed the wicks, filled the lamps with oil, and polished the huge glass lens." That is choice B. Choice D is tempting because winding the clockwork is in the same paragraph, but it happened during the night, after the light was lit. Strategy: when a paragraph lists tasks in time order, match the task to the time the question names.`
  },
  {
    id: 'rc-lighthouse-keepers-q3', test: 'all', section: 'reading', skill: 'inference', level: 2, passageId: 'rc-lighthouse-keepers',
    stem: `Which statement about keepers' children is best supported by the passage?`,
    choices: [`Their isolation made ordinary things like going to school unusual.`, `They usually became keepers themselves.`, `They were not allowed to live at the lighthouse.`, `They were often rescued from shipwrecks.`],
    answer: 0,
    explanation: `Paragraph 3 says lighthouses were "hours from the nearest town" and that children "grew up rowing to school or doing lessons by mail." Those details show that isolation changed everyday life, choice A. Choice B might seem reasonable, but the passage says only that women took over after a husband or father died (paragraph 4); it says nothing about children in general. Strategy: "best supported" means pick the answer with the most direct textual evidence, not the one that merely sounds possible.`
  },
  {
    id: 'rc-lighthouse-keepers-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rc-lighthouse-keepers',
    stem: `In paragraph 3, the word "spits" refers to`,
    choices: [`sudden storms.`, `small rowboats.`, `rocky islands.`, `narrow strips of land reaching into the water.`],
    answer: 3,
    explanation: `Paragraph 3 says lighthouses "stood on islands or at the end of long spits of land." The phrase "of land" and the word "long" show that a spit is a piece of land that stretches out, choice D. Choice C is tempting because islands appear in the same sentence, but the word "or" shows spits and islands are two different things. Strategy: when an unfamiliar word appears in a list, the other items and the connecting words ("or") tell you how it differs from them.`
  },
  {
    id: 'rc-lighthouse-keepers-q5', test: 'all', section: 'reading', skill: 'structure', level: 2, passageId: 'rc-lighthouse-keepers',
    stem: `Why does the author include paragraph 4?`,
    choices: [`to correct the possible assumption that all keepers were men.`, `to describe one famous rescue in detail.`, `to explain why many keepers died young.`, `to argue that women should run lighthouses today.`],
    answer: 0,
    explanation: `Paragraph 4 opens with "Keepers were not all men," which directly addresses what a reader might have assumed from the earlier paragraphs, and then gives evidence about women keepers. That is choice A. Choice D is too extreme; the passage reports history and makes no argument about today. Strategy: a paragraph that begins with "not all" or "however" usually exists to correct or complicate an earlier impression.`
  },
  {
    id: 'rc-lighthouse-keepers-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 2, passageId: 'rc-lighthouse-keepers',
    stem: `The phrase "with their trimmed wicks and polished lenses" in the last sentence mainly serves to`,
    choices: [`explain how modern automatic lighthouses work.`, `suggest that the lighthouse towers have been torn down.`, `remind readers of the careful, hands-on nature of the vanished job.`, `show that oil lamps were dangerous.`],
    answer: 2,
    explanation: `The final sentence contrasts the towers that "still stand" with the keepers who "have become part of history," and the phrase recalls the specific handwork from paragraph 2. It is a respectful nod to the human labor that automation replaced, choice C. Choice B is contradicted by "The towers still stand." Strategy: when a closing sentence repeats details from earlier, the author is usually drawing an emotional connection, not adding new information.`
  }
);

passages.push({
  id: 'rc-learn-to-swim',
  test: 'all',
  level: 2,
  title: 'Every Child Should Learn to Swim',
  genre: 'argument',
  wordCount: 267,
  text: `Imagine a skill that could save your life, keep you healthy, and open the door to a dozen other activities. Now imagine that about half of the people around you never learned it. That skill is swimming, and I believe every child should be taught to swim before leaving elementary school.

The most important reason is safety. Drowning is one of the leading causes of accidental death for children, and most drownings happen not in oceans but in pools, lakes, and even bathtubs close to home. A child who can float, tread water, and swim a short distance to safety has a far better chance of surviving a fall into deep water. Lessons do not make a child invincible, but they turn a panic into a plan.

Swimming is also one of the best forms of exercise there is. It works the whole body, it is easy on the joints, and it can be done for a lifetime. Grandparents who would never run a mile can swim one.

Finally, swimming unlocks other joys. Canoeing, snorkeling, surfing, sailing, even a trip to a friend's pool party: all of these are either dangerous or off-limits to a person who cannot swim.

Some people argue that lessons are too expensive or that there is no pool nearby. These are real problems, but they are reasons to build more programs, not to give up. Many towns already offer free lessons through schools or community centers, and more should.

Teaching a child to swim takes a few weeks. The benefits last a lifetime. It is hard to think of a better bargain.`
});

questions.push(
  {
    id: 'rc-learn-to-swim-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rc-learn-to-swim',
    stem: `The author's main claim is that`,
    choices: [`swimming is the best exercise for older adults.`, `most drownings happen in the ocean.`, `towns should build more swimming pools.`, `every child should be taught to swim before finishing elementary school.`],
    answer: 3,
    explanation: `The thesis appears at the end of paragraph 1: "I believe every child should be taught to swim before leaving elementary school." Paragraphs 2 through 4 give reasons, and paragraph 5 answers objections. Choice D is that thesis. Choice C is tempting because paragraph 5 calls for more programs, but that is a supporting point, not the central claim. Strategy: in a persuasive essay, the main claim is usually the sentence with "I believe" or "should" in the first paragraph.`
  },
  {
    id: 'rc-learn-to-swim-q2', test: 'all', section: 'reading', skill: 'detail', level: 2, passageId: 'rc-learn-to-swim',
    stem: `According to the passage, where do most childhood drownings happen?`,
    choices: [`in pools, lakes, and bathtubs close to home.`, `in the ocean.`, `during swimming lessons.`, `on canoe and sailing trips.`],
    answer: 0,
    explanation: `Paragraph 2 says most drownings happen "not in oceans but in pools, lakes, and even bathtubs close to home." Choice A quotes that directly. Choice B is the exact opposite, and it is tempting only because the ocean is mentioned in the same sentence. Strategy: watch for "not X but Y" constructions; the test will often offer X as a wrong answer.`
  },
  {
    id: 'rc-learn-to-swim-q3', test: 'all', section: 'reading', skill: 'structure', level: 2, passageId: 'rc-learn-to-swim',
    stem: `Why does the author include the fifth paragraph, which begins "Some people argue"?`,
    choices: [`to admit that swimming lessons are too expensive for most families.`, `to respond to objections before the reader raises them.`, `to describe the author's own swimming lessons as a child.`, `to list the dangers of surfing and sailing.`],
    answer: 1,
    explanation: `Paragraph 5 names two objections (cost and lack of pools), calls them "real problems," and then argues they are "reasons to build more programs, not to give up." Raising and answering the other side is a classic persuasive move, choice B. Choice A misreads the paragraph: the author acknowledges the problem but does not concede the argument. Strategy: a paragraph starting with "Some people argue" almost always exists to counter an objection.`
  },
  {
    id: 'rc-learn-to-swim-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rc-learn-to-swim',
    stem: `In paragraph 2, the word "invincible" most nearly means`,
    choices: [`invisible.`, `very fast.`, `impossible to harm.`, `experienced.`],
    answer: 2,
    explanation: `Paragraph 2 says lessons "do not make a child invincible, but they turn a panic into a plan." The sentence is admitting a limit: lessons help, but a child can still be hurt. So "invincible" means unable to be harmed, choice C. Choice A is a look-alike word trap (invisible vs. invincible). Strategy: the "but" clause after the word tells you the author is contrasting total safety with partial safety.`
  },
  {
    id: 'rc-learn-to-swim-q5', test: 'all', section: 'reading', skill: 'inference', level: 2, passageId: 'rc-learn-to-swim',
    stem: `The author would most likely agree with which of the following statements?`,
    choices: [`Children who cannot swim should avoid all water activities for life.`, `Communities have a responsibility to make swimming lessons available.`, `Running is a better form of exercise than swimming.`, `Swimming lessons guarantee that a child will never drown.`],
    answer: 1,
    explanation: `Paragraph 5 says towns "already offer free lessons through schools or community centers, and more should." That is a call for community action, choice B. Choice D is too extreme and is contradicted by "Lessons do not make a child invincible" (paragraph 2). Choice A is also too extreme; the author wants children to learn, not to avoid water. Strategy: in "would most likely agree" questions, eliminate answers with absolute words like "all," "never," and "guarantee."`
  },
  {
    id: 'rc-learn-to-swim-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 2, passageId: 'rc-learn-to-swim',
    stem: `What does the author mean by calling swimming lessons "a better bargain" in the last paragraph?`,
    choices: [`A small investment of time produces benefits that last for life.`, `Swimming lessons are usually cheaper than other sports.`, `Swimming is more enjoyable than other activities.`, `Most towns sell lessons at a discount.`],
    answer: 0,
    explanation: `The last paragraph sets "a few weeks" of teaching against benefits that "last a lifetime." A bargain is getting a lot for a little, so the author means the time is small and the payoff is huge, choice A. Choice B takes "bargain" literally as a price comparison, which the passage never makes. Strategy: when a word normally about money is used in a non-money context, look at what two things are being weighed against each other.`
  }
);

passages.push({
  id: 'rc-kite-poem',
  test: 'ssat',
  level: 2,
  title: 'Letting Out the Line',
  genre: 'poetry',
  wordCount: 128,
  text: `I held the string too tight at first,
afraid the wind would steal my kite.
It bucked and dove and spun, and worse,
it crashed into the grass. Twice.

My grandmother, who'd flown a hundred,
watched me from the picnic bench.
"You hold it like you're fighting thunder,"
she said. "Just let out an inch."

I let out one, and then another.
The kite stopped fighting, climbed, and hung
as steady as a painted picture
in the blue above the swings.

I used to think that gripping tight was caring.
Now I watch it ride the air
and wonder what else I've been wearing
out by holding on, and who is there

to say, so softly I can hear it,
"Let out an inch. It wants to fly."`
});

questions.push(
  {
    id: 'rc-kite-poem-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rc-kite-poem',
    stem: `Which of the following best states the central idea of the poem?`,
    choices: [`Kites are difficult to fly on windy days.`, `Grandparents know more about kites than children do.`, `Holding on too tightly can keep something from succeeding.`, `Children should always obey adults.`, `The speaker wants to become a better athlete.`],
    answer: 2,
    explanation: `The poem moves from a literal lesson (lines 1-12: the kite flies only when the speaker loosens the string) to a general one (lines 13-18: the speaker wonders "what else I've been wearing out by holding on"). Choice C captures both halves. Choice B is tempting because the grandmother gives the advice, but the poem is about the lesson, not who knows more. Strategy: in a poem, look for the moment the speaker turns from the concrete event to a reflection; the reflection usually carries the central idea.`
  },
  {
    id: 'rc-kite-poem-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 2, passageId: 'rc-kite-poem',
    stem: `According to the poem, what happens after the speaker lets out the line?`,
    choices: [`The kite crashes a third time.`, `The grandmother takes the string.`, `The wind suddenly stops.`, `The string snaps.`, `The kite rises and holds steady.`],
    answer: 4,
    explanation: `Lines 9-12 say that after the speaker lets out the line, "The kite stopped fighting, climbed, and hung / as steady as a painted picture." That is choice E. Choice A describes what happened before the advice (line 4: "Twice"). Strategy: detail questions about poems still have a location; find the stanza that follows the event named in the question.`
  },
  {
    id: 'rc-kite-poem-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 2, passageId: 'rc-kite-poem',
    stem: `In lines 13-18, the speaker's thoughts shift from the kite to`,
    choices: [`the weather.`, `other situations in life where holding on too tightly causes harm.`, `learning to build a better kite.`, `memories of the grandmother's childhood.`, `the swings in the park.`],
    answer: 1,
    explanation: `Line 13 says "I used to think that gripping tight was caring," and lines 15-16 ask "what else I've been wearing / out by holding on." The phrase "what else" shows the speaker is applying the kite lesson to other parts of life, choice B. Choice E is tempting because swings are mentioned in line 12, but they are just setting. Strategy: the words "what else" and "who is there" signal that the speaker is generalizing beyond the kite.`
  },
  {
    id: 'rc-kite-poem-q4', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rc-kite-poem',
    stem: `In line 11, the comparison "as steady as a painted picture" emphasizes that the kite is`,
    choices: [`brightly colored.`, `made of paper.`, `hard to see.`, `hanging still and calm in the sky.`, `about to fall.`],
    answer: 3,
    explanation: `A painting does not move, and line 11 uses the comparison right after "The kite stopped fighting, climbed, and hung." The point of comparison is stillness, choice D. Choice A is tempting because paintings are colorful, but the word the poet chose is "steady," which is about motion, not color. Strategy: in a simile, identify the specific quality being compared (here "steady") rather than every quality the object has.`
  },
  {
    id: 'rc-kite-poem-q5', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 2, passageId: 'rc-kite-poem',
    stem: `The grandmother's tone when she speaks in lines 7-8 can best be described as`,
    choices: [`gentle and knowing.`, `scolding.`, `impatient.`, `frightened.`, `sarcastic.`],
    answer: 0,
    explanation: `The grandmother has "flown a hundred" kites (line 5), watches calmly from the bench, and offers a small, specific tip ("Just let out an inch"), and the final stanza describes the same advice spoken "so softly." That is gentle expertise, choice A. Choice B is tempting because she is correcting the speaker, but there is no harshness in her words. Strategy: tone comes from word choice; "just" and "softly" soften the correction into guidance.`
  },
  {
    id: 'rc-kite-poem-q6', test: 'ssat', section: 'reading', skill: 'structure', level: 2, passageId: 'rc-kite-poem',
    stem: `How does the final stanza (lines 17-18) relate to the rest of the poem?`,
    choices: [`It uses a stricter rhyme pattern than the earlier stanzas.`, `It repeats the grandmother's advice but now applies it to life beyond the kite.`, `It is written entirely in the grandmother's voice.`, `It describes a different day at the park.`, `It explains how to build a kite.`],
    answer: 1,
    explanation: `The last line, "Let out an inch. It wants to fly," echoes line 8, but it now follows the speaker's question about "what else" in life needs loosening (lines 15-16). The repeated words have a wider meaning the second time, choice B. Choice C is wrong because only the quoted sentence is in the grandmother's voice; the stanza begins with the speaker. Strategy: when a poem repeats a line, ask how the context around it has changed.`
  }
);

// ---------------------------------------------------------------------------
// LEVEL 3 PASSAGES (grades 7-8)
// ---------------------------------------------------------------------------

passages.push({
  id: 'rc-octopus-mind',
  test: 'all',
  level: 3,
  title: 'The Mind in the Arms',
  genre: 'science',
  wordCount: 350,
  text: `An octopus has no bones, three hearts, blue blood, and a brain shaped like a doughnut wrapped around its throat. It can squeeze through any opening larger than its beak, change the color and texture of its skin in less than a second, and taste with its suckers. For a long time, scientists treated these abilities as curiosities. Only recently have they begun to ask a more unsettling question: how intelligent is this animal, and how would we know?

Part of the difficulty is that octopus intelligence is organized unlike our own. A human brain sits in one place and sends commands down the spinal cord. An octopus has a central brain, but roughly two-thirds of its neurons are located in its eight arms. Each arm can taste, touch, and, to a surprising degree, decide. An arm severed from the body will still reach for food and attempt to pass it toward a mouth that is no longer there. The central brain seems to issue general goals, while the arms work out the details on their own.

Despite this distributed design, octopuses perform feats that look remarkably like thinking. In laboratories, they have learned to unscrew jars to reach a crab inside, navigated mazes, and recognized individual human keepers, squirting water at ones they appear to dislike. In the wild, some species collect coconut shells and carry them across the sea floor to assemble into shelters later, which suggests planning for a future need.

What makes all this stranger is that an octopus lives only one to two years, learns everything on its own, and receives no teaching from parents, who die before their eggs hatch. Every clever octopus is self-taught. Our last common ancestor with the octopus was a simple worm-like creature that lived more than 500 million years ago. Whatever intelligence the octopus has, it evolved separately from ours, along a completely different path.

That is why some researchers describe the octopus as the closest thing we have to meeting an intelligent alien. It did not get smart the way we did. It got smart its own way.`
});

questions.push(
  {
    id: 'rc-octopus-mind-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 3, passageId: 'rc-octopus-mind',
    stem: `The passage is primarily concerned with`,
    choices: [`explaining why octopuses have three hearts and blue blood.`, `proving that octopuses are more intelligent than dogs.`, `describing the unusual nature of octopus intelligence and why it fascinates scientists.`, `arguing that octopuses should not be kept in laboratories.`],
    answer: 2,
    explanation: `Paragraph 1 ends with the question of how intelligent the octopus is; paragraphs 2-4 describe how its intelligence is organized, what it can do, and how it evolved; paragraph 5 sums up with the "alien" comparison. Choice C covers all of that. Choice A is tempting because the hearts and blood appear in the first sentence, but they are a hook, not the subject. Strategy: when the first sentence is a list of striking facts, keep reading; the real topic usually appears at the end of the first paragraph.`
  },
  {
    id: 'rc-octopus-mind-q2', test: 'all', section: 'reading', skill: 'detail', level: 3, passageId: 'rc-octopus-mind',
    stem: `According to the passage, roughly two-thirds of an octopus's neurons are found in its`,
    choices: [`central brain.`, `arms.`, `skin.`, `three hearts.`],
    answer: 1,
    explanation: `Paragraph 2 states that "roughly two-thirds of its neurons are located in its eight arms." That is choice B. Choice A is the trap for a reader who assumes that, as in humans, most neurons must be in the brain, which is exactly the assumption the paragraph is correcting. Strategy: when a passage says something is "unlike our own," expect a detail question that tests whether you absorbed the difference.`
  },
  {
    id: 'rc-octopus-mind-q3', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-octopus-mind',
    stem: `The example of the severed arm in paragraph 2 is included to show that`,
    choices: [`octopus arms can act with some independence from the central brain.`, `octopuses can regrow lost limbs quickly.`, `octopuses feel no pain in their arms.`, `the central brain controls every movement of the arms.`],
    answer: 0,
    explanation: `The sentence after the example says "The central brain seems to issue general goals, while the arms work out the details on their own," and the severed arm still reaching for food demonstrates that independence, choice A. Choice D states the opposite. Choice B is a real octopus fact but is never mentioned, so it cannot be the author's purpose. Strategy: to find why an example is included, read the general statement it sits next to; the example illustrates that statement.`
  },
  {
    id: 'rc-octopus-mind-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 3, passageId: 'rc-octopus-mind',
    stem: `In paragraph 3, the word "distributed" most nearly means`,
    choices: [`damaged.`, `delivered to customers.`, `unusually large.`, `spread out across several parts.`],
    answer: 3,
    explanation: `"This distributed design" at the start of paragraph 3 refers back to paragraph 2, where neurons are divided between a central brain and eight arms. A design in which the thinking is spread among many parts is "distributed," choice D. Choice B is the everyday meaning of the word (as in distributing products), which does not fit a nervous system. Strategy: "this" at the start of a paragraph points back to the previous paragraph; use that paragraph to define the word.`
  },
  {
    id: 'rc-octopus-mind-q5', test: 'all', section: 'reading', skill: 'structure', level: 3, passageId: 'rc-octopus-mind',
    stem: `The fourth paragraph serves mainly to`,
    choices: [`summarize the laboratory experiments described earlier.`, `add facts that make the octopus's intelligence even more surprising.`, `explain in detail how octopuses lay their eggs.`, `introduce the idea that octopuses are closely related to humans.`],
    answer: 1,
    explanation: `Paragraph 4 opens with "What makes all this stranger" and then adds the short life span, the lack of parental teaching, and the separate evolutionary path. Each fact raises the stakes of the earlier evidence, choice B. Choice D is the reverse of the paragraph's point: the last common ancestor was a worm-like creature 500 million years ago, which makes octopuses very distant relatives. Strategy: the first words of a paragraph ("What makes all this stranger") often state its job in the passage.`
  },
  {
    id: 'rc-octopus-mind-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 3, passageId: 'rc-octopus-mind',
    stem: `The author compares the octopus to an "intelligent alien" in paragraph 5 in order to`,
    choices: [`suggest that octopuses may have come from another planet.`, `warn readers that octopuses can be dangerous.`, `emphasize that octopus intelligence evolved along a completely separate path from ours.`, `show that scientists still do not take octopuses seriously.`],
    answer: 2,
    explanation: `The comparison follows directly from paragraph 4's statement that octopus intelligence "evolved separately from ours, along a completely different path," and paragraph 5 explains it: "It did not get smart the way we did." The alien image captures that separateness, choice C. Choice A takes the figure of speech literally. Strategy: a vivid comparison at the end of a passage usually restates the main point in memorable form; look for the plain version a paragraph earlier.`
  }
);

passages.push({
  id: 'rc-long-way-home',
  test: 'all',
  level: 3,
  title: 'The Long Way Home',
  genre: 'fiction',
  wordCount: 306,
  text: `Priya took the long way home on purpose. The short way went past the Lindqvists' house, and the Lindqvists' house had a front window, and in that front window, every afternoon at four, Mrs. Lindqvist sat waiting for Priya to come and read to her.

It had started as a school project. Visit a neighbor, learn their story, write it up. Priya had chosen Mrs. Lindqvist because she lived two doors down and because the assignment was due in a week. The old woman's eyes had gone bad, she explained, and she missed books more than she missed anything, more than driving, more than her garden. So Priya had read to her for the project, one chapter of a mystery novel, and then, because the chapter ended on a cliffhanger, she had come back the next day for another.

That was in September. It was now November, and they were on their fourth book, and Priya had a math test on Friday, a science fair project, and a best friend who had started asking, a little coolly, why Priya was never free after school anymore.

So today she took the long way, up Fenwick Street and around the park, telling herself that Mrs. Lindqvist would understand. One day off. It was not a crime.

The long way took eleven extra minutes. Priya spent all of them thinking about the front window.

At the corner of her own street, she stopped. She stood there long enough for a dog walker to pass her twice. Then she turned around, walked the three blocks back, and climbed the Lindqvists' porch steps. The door opened before she knocked.

"I thought you might not come," Mrs. Lindqvist said. She did not sound hurt, only honest. "You don't have to, you know."

"I know," said Priya. She found the bookmark. "Chapter twelve."`
});

questions.push(
  {
    id: 'rc-long-way-home-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 3, passageId: 'rc-long-way-home',
    stem: `Which statement best expresses the central idea of the story?`,
    choices: [`Priya realizes that what began as an assignment has become a commitment she chooses to keep.`, `School projects usually last longer than students expect.`, `Mrs. Lindqvist is angry that Priya arrives late.`, `Priya decides that her best friend matters more than her neighbor.`],
    answer: 0,
    explanation: `The story traces the visits from a one-week project (paragraph 2) to a two-month habit (paragraph 3), and ends with Priya turning around and saying "I know" when told she does not have to come (paragraphs 6-8). Her choice to return is the point, choice A. Choice D is the opposite of what she does. Choice C is contradicted by "She did not sound hurt." Strategy: in fiction, the main idea is usually the decision a character makes at the climax and what it reveals.`
  },
  {
    id: 'rc-long-way-home-q2', test: 'all', section: 'reading', skill: 'detail', level: 3, passageId: 'rc-long-way-home',
    stem: `Why did Priya originally choose Mrs. Lindqvist for her project?`,
    choices: [`because Mrs. Lindqvist had asked her to visit.`, `because her teacher assigned that neighbor to her.`, `because Mrs. Lindqvist lived nearby and the deadline was close.`, `because her best friend recommended her.`],
    answer: 2,
    explanation: `Paragraph 2 says Priya chose Mrs. Lindqvist "because she lived two doors down and because the assignment was due in a week." That is choice C, and it matters because it shows how unsentimental the start was. Choice A is tempting because Mrs. Lindqvist waits for Priya now, but that is the present, not the original reason. Strategy: when a question says "originally," find the earliest point in the story's timeline.`
  },
  {
    id: 'rc-long-way-home-q3', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-long-way-home',
    stem: `The detail that Priya "spent all of them thinking about the front window" (paragraph 5) suggests that`,
    choices: [`she is worried the window has been broken.`, `she cannot stop feeling responsible for Mrs. Lindqvist.`, `she plans to read by the window at home.`, `she is angry at Mrs. Lindqvist for waiting.`],
    answer: 1,
    explanation: `The front window was established in paragraph 1 as the place where Mrs. Lindqvist "sat waiting" each afternoon. If Priya spends eleven minutes thinking about it, she is picturing the old woman waiting for her, which is guilt and responsibility, choice B. Choice D is not supported; nothing in the story shows anger. Strategy: track what an object has come to stand for earlier in the story; the window means "someone waiting."`
  },
  {
    id: 'rc-long-way-home-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 3, passageId: 'rc-long-way-home',
    stem: `In paragraph 3, the word "coolly" most nearly means`,
    choices: [`calmly and kindly.`, `cleverly.`, `quietly.`, `in a distant, slightly unfriendly way.`],
    answer: 3,
    explanation: `The best friend is asking "why Priya was never free after school anymore," which is a complaint, and the friend is listed among the pressures on Priya. A question asked "a little coolly" is one asked with some chill, choice D. Choice A is the trap: "cool" can mean calm, but the surrounding context is about strain in the friendship, not kindness. Strategy: decide whether the context is positive or negative before choosing between two possible meanings.`
  },
  {
    id: 'rc-long-way-home-q5', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-long-way-home',
    stem: `Mrs. Lindqvist's words "You don't have to, you know" most likely show that she`,
    choices: [`wants Priya to stop coming.`, `does not want Priya to feel trapped by obligation.`, `has found someone else to read to her.`, `is upset that Priya arrived late.`],
    answer: 1,
    explanation: `Paragraph 7 says she "did not sound hurt, only honest," and she opens the door before Priya knocks, showing she was glad to see her. The sentence releases Priya from duty while leaving the choice to her, choice B. Choice A is too strong; wanting someone to feel free is not the same as wanting them gone. Strategy: use the narrator's description of how a line is spoken ("only honest") to interpret what it means.`
  },
  {
    id: 'rc-long-way-home-q6', test: 'all', section: 'reading', skill: 'structure', level: 3, passageId: 'rc-long-way-home',
    stem: `Why does the author include the paragraph about September and November (paragraph 3)?`,
    choices: [`to explain how the mystery novel ends.`, `to describe Priya's science project in detail.`, `to show how much time has passed and how the visits now compete with the rest of Priya's life.`, `to suggest that Priya no longer enjoys reading.`],
    answer: 2,
    explanation: `Paragraph 3 jumps from September to November, counts the books ("their fourth"), and lists the math test, science project, and cooling friendship. It compresses time and piles up the pressures that make today's temptation understandable, choice C. Choice D is not supported; Priya's problem is time, not interest. Strategy: a paragraph that lists dates and obligations is usually there to establish stakes before the character's decision.`
  }
);

passages.push({
  id: 'rc-chess-lesson',
  test: 'all',
  level: 3,
  title: 'Thirty-One Moves',
  genre: 'fiction',
  wordCount: 351,
  text: `Eli's father had taught him chess at six, and by ten Eli could beat him. By twelve, Eli could beat nearly everyone at the community center on Saturday mornings, and he had started to find the whole thing a little boring. He won; people shook his hand; he went home. That was chess.

Then Mr. Abernathy showed up. He was an old man with a cardigan buttoned wrong and a thermos of tea, and he asked Eli, very politely, for a game. Eli agreed, mostly to be polite back.

Eli opened fast and aggressively, the way he always did. Mr. Abernathy responded slowly, sipping his tea between moves, building what looked to Eli like nothing much: a few pawns here, a knight tucked behind them, a bishop that did not seem to point anywhere.

By the twentieth move, Eli realized that every attack he launched ran into a wall. Not a dramatic wall, just a quiet one. His pieces were all out and busy, and they had nowhere to go. Mr. Abernathy's pieces, which had seemed so sleepy, suddenly all pointed at Eli's king at once.

Eli lost in thirty-one moves. He sat staring at the board.

"You play well," Mr. Abernathy said, screwing the cap back on his thermos. "You play like someone who's never lost. That's a kind of weakness."

"What do you mean?"

"When you always win, you only learn what works against people who are worse than you." He stood and pulled on his coat. "You attack because attacking has always been enough. You've never had to ask what your opponent wants. Would you like to play again next week?"

Eli said yes before he had decided to.

That night, he set up the board at home and replayed the game from memory, trying to find the move where he had lost it. He could not find a single one. It had not been one move. It had been all of them, every one made without wondering what the man across the table was thinking.

For the first time in years, Eli could not wait for Saturday.`
});

questions.push(
  {
    id: 'rc-chess-lesson-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 3, passageId: 'rc-chess-lesson',
    stem: `What is the main lesson Eli learns in the story?`,
    choices: [`Older players are usually better than younger ones.`, `Chess should always be played slowly.`, `Losing is more enjoyable than winning.`, `Winning easily can keep a person from learning to understand an opponent.`],
    answer: 3,
    explanation: `Mr. Abernathy states the idea in paragraph 8 ("When you always win, you only learn what works against people who are worse than you... You've never had to ask what your opponent wants"), and paragraph 10 shows Eli accepting it: every move was "made without wondering what the man across the table was thinking." That is choice D. Choice B is tempting because Mr. Abernathy plays slowly, but his speed is a style, not the lesson. Strategy: the main lesson is the one the character himself confirms by the end.`
  },
  {
    id: 'rc-chess-lesson-q2', test: 'all', section: 'reading', skill: 'detail', level: 3, passageId: 'rc-chess-lesson',
    stem: `How does Mr. Abernathy play during the first part of the game?`,
    choices: [`quickly and aggressively.`, `slowly, building a position that looks unthreatening.`, `carelessly, losing several pieces.`, `by copying each of Eli's moves.`],
    answer: 1,
    explanation: `Paragraph 3 says he "responded slowly, sipping his tea between moves, building what looked to Eli like nothing much." That is choice B. Choice A describes Eli, not Mr. Abernathy. Choice C is wrong because his "sleepy" pieces turn out to be perfectly placed (paragraph 4). Strategy: when two characters are contrasted, be sure which one the question asks about.`
  },
  {
    id: 'rc-chess-lesson-q3', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-chess-lesson',
    stem: `Why does Eli agree to play Mr. Abernathy at first?`,
    choices: [`He wants to learn from an experienced player.`, `He is bored and hoping for a real challenge.`, `He is simply returning the old man's politeness.`, `His father insists that he play.`],
    answer: 2,
    explanation: `Paragraph 2 says Mr. Abernathy asked "very politely" and Eli "agreed, mostly to be polite back." That is choice C. Choice B is tempting because paragraph 1 says Eli finds chess boring, but nothing suggests he expects a challenge from a man with his cardigan buttoned wrong; the description makes Mr. Abernathy look harmless. Strategy: read the sentence that gives the character's motive rather than inferring from an earlier mood.`
  },
  {
    id: 'rc-chess-lesson-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 3, passageId: 'rc-chess-lesson',
    stem: `In paragraph 4, the word "launched" most nearly means`,
    choices: [`began.`, `abandoned.`, `threw into the air.`, `sailed.`],
    answer: 0,
    explanation: `Paragraph 4 says "every attack he launched ran into a wall." To launch an attack is to start it, choice A. Choice C is the literal meaning of launching a rocket, which makes no sense for chess pieces. Choice B is the opposite; Eli keeps attacking. Strategy: substitute each choice into the sentence: "every attack he began ran into a wall" reads naturally.`
  },
  {
    id: 'rc-chess-lesson-q5', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-chess-lesson',
    stem: `The sentence "Eli said yes before he had decided to" (paragraph 9) suggests that`,
    choices: [`Eli's eagerness is stronger than his pride.`, `Eli feels pressured by Mr. Abernathy.`, `Eli does not understand the question.`, `Eli plans to skip next Saturday.`],
    answer: 0,
    explanation: `Eli has just lost badly and been told he has a weakness, so pride might make him refuse, yet "yes" comes out before he thinks. Something deeper than pride, his wish to play again, answers for him, choice A. Choice B is not supported; Mr. Abernathy asks politely and then leaves. The last paragraph confirms the eagerness: "Eli could not wait for Saturday." Strategy: a response that comes "before deciding" reveals a character's true feeling beneath the conscious one.`
  },
  {
    id: 'rc-chess-lesson-q6', test: 'all', section: 'reading', skill: 'structure', level: 3, passageId: 'rc-chess-lesson',
    stem: `What is the purpose of the final paragraph?`,
    choices: [`to show that Eli has forgiven Mr. Abernathy.`, `to explain the rules of chess.`, `to contrast Eli's new excitement with the boredom described at the start.`, `to reveal that Eli has decided to quit chess.`],
    answer: 2,
    explanation: `Paragraph 1 says Eli found chess "a little boring"; the final line says "For the first time in years, Eli could not wait for Saturday." The ending answers the opening, showing how the loss changed him, choice C. Choice A assumes there was something to forgive, but Eli is never shown as angry. Strategy: compare the first and last paragraphs of a story; the change between them is often the point.`
  }
);

passages.push({
  id: 'rc-transcontinental',
  test: 'all',
  level: 3,
  title: 'One Word Across the Country',
  genre: 'history',
  wordCount: 344,
  text: `In 1860, a traveler who wanted to go from New York to California had three choices, all of them bad. She could spend months in a wagon crossing plains, deserts, and mountains. She could sail around the tip of South America, a voyage of up to six months. Or she could sail to Panama, cross the jungle on foot and by mule, and catch another ship on the far side. The United States was one country on the map and two countries in practice.

In 1862, in the middle of the Civil War, Congress passed the Pacific Railroad Act. Two companies would build a single railroad from opposite ends. The Central Pacific would start in Sacramento and build east; the Union Pacific would start in Omaha and build west. The government paid them by the mile, which meant that each company raced to lay as much track as it could before meeting the other.

The Central Pacific faced the harder ground. Almost immediately it ran into the Sierra Nevada, a wall of granite rising more than seven thousand feet. The company hired thousands of Chinese immigrants, who eventually made up the great majority of its workforce. They blasted tunnels through solid rock, sometimes advancing only a few inches a day, and worked through winters so severe that camps were buried under snow. Across the plains, the Union Pacific's crews, many of them Irish immigrants and Civil War veterans, could lay several miles of track on a good day, but they faced their own problems, including conflict with Native nations whose lands the railroad cut through.

On May 10, 1869, the two lines met at Promontory Summit, Utah. A ceremonial spike of gold was tapped into the final tie, and a telegraph operator sent a single word across the country: "Done."

The journey that had taken months now took about a week. The railroad made the nation whole in a way that no law could, though the cost, in lives lost and lands taken, was paid by people who rarely appear in the celebration photographs.`
});

questions.push(
  {
    id: 'rc-transcontinental-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 3, passageId: 'rc-transcontinental',
    stem: `Which statement best expresses the main idea of the passage?`,
    choices: [`The Central Pacific faced harder terrain than the Union Pacific.`, `Chinese immigrants were the most skilled railroad workers.`, `The transcontinental railroad, built by two companies racing toward each other, united the country but at a human cost.`, `Before 1869, travel from New York to California took about six months.`],
    answer: 2,
    explanation: `The passage moves from the problem (paragraph 1), to the plan and the race (paragraph 2), to the labor and hardship (paragraph 3), to the meeting (paragraph 4), to the result and its cost (paragraph 5). Choice C is the only option that spans that whole arc. Choice A is a true detail from paragraph 3 only. Strategy: a main-idea choice that mentions only one company or one group is too narrow for a passage about the whole project.`
  },
  {
    id: 'rc-transcontinental-q2', test: 'all', section: 'reading', skill: 'detail', level: 3, passageId: 'rc-transcontinental',
    stem: `According to the passage, why did the two companies race to lay track?`,
    choices: [`The government paid each company by the mile.`, `The Civil War required the railroad to be finished quickly.`, `Each company wanted to reach the golden spike first.`, `The telegraph was threatening to replace railroads.`],
    answer: 0,
    explanation: `Paragraph 2 says "The government paid them by the mile, which meant that each company raced to lay as much track as it could." That is choice A. Choice B is tempting because the Civil War is mentioned in the same paragraph, but only as the time period, not as the reason for the race. Strategy: "which meant that" signals cause and effect; the cause sits right before it.`
  },
  {
    id: 'rc-transcontinental-q3', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-transcontinental',
    stem: `The author's statement that the United States was "two countries in practice" (paragraph 1) most nearly means that`,
    choices: [`the Civil War had split the nation in half.`, `the country had two different governments.`, `California was planning to become its own country.`, `the East and the West were so hard to travel between that they functioned as separate places.`],
    answer: 3,
    explanation: `The sentence comes right after three terrible ways to get from New York to California, so "two countries in practice" means the coasts were cut off from each other by distance, choice D. Choice A is tempting because the Civil War appears in paragraph 2, but the split described in paragraph 1 is East versus West, not North versus South. Strategy: interpret a figurative phrase using the sentences immediately before it, not a fact from a later paragraph.`
  },
  {
    id: 'rc-transcontinental-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 3, passageId: 'rc-transcontinental',
    stem: `In paragraph 3, the word "severe" most nearly means`,
    choices: [`short.`, `early.`, `unexpected.`, `harsh.`],
    answer: 3,
    explanation: `Paragraph 3 says the winters were "so severe that camps were buried under snow." A winter that buries camps is harsh, choice D. Choice A is nearly the opposite; a short winter would not bury anything. Strategy: the "so ... that" structure gives you the result, and the result (buried camps) tells you how strong the word must be.`
  },
  {
    id: 'rc-transcontinental-q5', test: 'all', section: 'reading', skill: 'structure', level: 3, passageId: 'rc-transcontinental',
    stem: `The author organizes paragraph 3 by`,
    choices: [`describing events in the order in which they happened.`, `comparing the challenges faced by the two companies.`, `listing the causes of the Civil War.`, `explaining step by step how a tunnel is built.`],
    answer: 1,
    explanation: `Paragraph 3 opens with "The Central Pacific faced the harder ground," describes its mountains and workers, then pivots with "Across the plains, the Union Pacific's crews..." and describes their different conditions. That is a comparison, choice B. Choice A is wrong because the paragraph is not a timeline; both companies worked at the same time. Strategy: look for pivot phrases such as "across the plains" or "by contrast" that signal a side-by-side comparison.`
  },
  {
    id: 'rc-transcontinental-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 3, passageId: 'rc-transcontinental',
    stem: `The final sentence suggests that the author believes`,
    choices: [`the railroad should never have been built.`, `photographs from 1869 cannot be trusted.`, `the usual celebration of the railroad overlooks the people who paid its price.`, `the golden spike was a waste of money.`],
    answer: 2,
    explanation: `The last sentence praises the railroad for making "the nation whole" but adds "though the cost, in lives lost and lands taken, was paid by people who rarely appear in the celebration photographs." The word "though" introduces a reservation about who gets remembered, choice C. Choice A is too extreme; the author clearly values the achievement. Strategy: a "though" clause at the end of a passage usually carries the author's judgment; weigh it against the praise, not instead of it.`
  }
);

passages.push({
  id: 'rc-bakery-mornings',
  test: 'all',
  level: 3,
  title: 'Four in the Morning',
  genre: 'biography',
  wordCount: 363,
  text: `My grandmother opened her bakery in 1974 with a borrowed oven and a recipe for rye bread that had crossed the Atlantic in her mother's head, because her mother had never learned to write. For the next thirty-eight years, she got up at four in the morning six days a week. I did not understand this when I was small. I thought the bakery simply existed, the way the mountains behind our town existed.

The summer I turned thirteen, my parents decided I needed a job, and the bakery was the obvious one. My grandmother did not go easy on me. The first morning, she handed me an apron and a scrub brush and pointed at the floor. I did not touch dough for two weeks.

When she finally let me shape loaves, I was terrible at it. My rounds came out lopsided; my braids unraveled in the oven. She would pick up one of my failures, turn it over in her floury hands, and say, "This one will taste fine. Nobody eats the shape." Then she would show me again, her fingers moving so fast I could not follow, and I would try again, and fail a little less.

What I remember most is not the bread. It is the hour before the doors opened, when the ovens were roaring and the windows were still black and it was just the two of us and the radio. She told me stories then that she never told at the dinner table: about arriving in this country at nineteen with one suitcase, about the first winter when the bakery nearly failed, about the customer who came every Tuesday for twenty years and whose name she never learned.

She sold the bakery the year I left for college. The new owners kept the name and changed the rye recipe, and I have never gone back. But I still wake, some mornings, at four, in the dark, and lie there for a moment smelling bread that is not there.

I did not become a baker. I became someone who knows what work looks like, and who knows that most of it happens before anyone is watching.`
});

questions.push(
  {
    id: 'rc-bakery-mornings-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 3, passageId: 'rc-bakery-mornings',
    stem: `Which statement best expresses the main idea of the passage?`,
    choices: [`A summer in her grandmother's bakery gave the narrator a lasting understanding of work and a bond with her grandmother.`, `The narrator's grandmother was too strict with her employees.`, `Rye bread is more difficult to make than other kinds of bread.`, `The narrator regrets not taking over the family bakery.`],
    answer: 0,
    explanation: `The final paragraph states what the narrator took away: "I became someone who knows what work looks like," and paragraph 4 describes the early-morning closeness with the grandmother as "what I remember most." Choice A combines both threads. Choice D is tempting because the narrator "never went back," but the last paragraph expresses no regret about not becoming a baker. Strategy: in a memoir, weigh the reflective final paragraph most heavily when choosing the main idea.`
  },
  {
    id: 'rc-bakery-mornings-q2', test: 'all', section: 'reading', skill: 'detail', level: 3, passageId: 'rc-bakery-mornings',
    stem: `What did the narrator do during the first two weeks at the bakery?`,
    choices: [`shaped loaves of rye bread.`, `ran the cash register.`, `delivered bread to customers.`, `scrubbed floors and did not touch dough.`],
    answer: 3,
    explanation: `Paragraph 2 says the grandmother "handed me an apron and a scrub brush and pointed at the floor. I did not touch dough for two weeks." That is choice D. Choice A describes what happened after the two weeks (paragraph 3). Strategy: the phrase "for two weeks" in the passage matches the time period in the question; locate it and read the sentence before it.`
  },
  {
    id: 'rc-bakery-mornings-q3', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-bakery-mornings',
    stem: `The grandmother's remark "Nobody eats the shape" most strongly suggests that she`,
    choices: [`does not care about the quality of her bread.`, `values the substance of work over its appearance and wants to encourage the narrator.`, `is annoyed that the narrator keeps failing.`, `plans to stop making braided loaves.`],
    answer: 1,
    explanation: `In paragraph 3 she says "This one will taste fine" before "Nobody eats the shape," and then shows the narrator again. She is reassuring a discouraged beginner while still teaching, choice B. Choice A goes too far: a woman who rose at four for thirty-eight years clearly cares about quality; she is distinguishing taste from looks. Strategy: read the whole exchange, not just the quoted line; her next action (showing again) reveals her intent.`
  },
  {
    id: 'rc-bakery-mornings-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 3, passageId: 'rc-bakery-mornings',
    stem: `In paragraph 1, the phrase "crossed the Atlantic in her mother's head" means that the recipe`,
    choices: [`was written in a notebook that was later lost.`, `was invented during an ocean voyage.`, `was too complicated to explain to anyone.`, `was carried by memory rather than on paper.`],
    answer: 3,
    explanation: `The sentence finishes with "because her mother had never learned to write," which explains why the recipe traveled "in her head": it had to be memorized. That is choice D. Choice A is the opposite; there was no notebook. Strategy: the word "because" after a figurative phrase often supplies the literal explanation.`
  },
  {
    id: 'rc-bakery-mornings-q5', test: 'all', section: 'reading', skill: 'structure', level: 3, passageId: 'rc-bakery-mornings',
    stem: `Why does the narrator include the detail about the customer "whose name she never learned"?`,
    choices: [`to show that the grandmother was unfriendly to customers.`, `to give an example of the private stories shared only in the early-morning hours.`, `to explain why the bakery nearly failed.`, `to criticize the customer for being rude.`],
    answer: 1,
    explanation: `Paragraph 4 lists three stories the grandmother "never told at the dinner table," and the unnamed Tuesday customer is the last one. Its purpose is to illustrate the intimacy of those pre-dawn conversations, choice B. Choice C confuses two items in the same list; the near-failure is a separate story. Strategy: when a detail is one item in a list, its purpose is usually the purpose of the whole list.`
  },
  {
    id: 'rc-bakery-mornings-q6', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-bakery-mornings',
    stem: `The narrator's statement "I have never gone back" (paragraph 5) most likely reflects`,
    choices: [`anger at the grandmother for selling the bakery.`, `the fact that the narrator now lives in another country.`, `a wish to keep the bakery as it was in memory rather than see it changed.`, `the fact that the narrator no longer enjoys bread.`],
    answer: 2,
    explanation: `The sentence follows "The new owners kept the name and changed the rye recipe," and the next sentence shows the narrator still waking at four "smelling bread that is not there." The narrator is protecting a memory from being overwritten, choice C. Choice D is contradicted by that lingering smell of bread. Strategy: connect the statement to the sentence before it (what changed) and the sentence after it (what is still treasured).`
  }
);

passages.push({
  id: 'rc-case-for-handwriting',
  test: 'all',
  level: 3,
  title: 'In Defense of the Pen',
  genre: 'argument',
  wordCount: 337,
  text: `Every few years, someone proposes that schools stop teaching handwriting. The argument sounds sensible. Students type their essays, text their friends, and will almost certainly work at keyboards for the rest of their lives. Why spend hours drilling children on the loops of a cursive g when those hours could go to coding or reading? I taught middle school for twenty years, and I want to explain why I think this reasoning is wrong.

First, handwriting is not just a way of recording ideas; it is a way of forming them. When students write by hand, they cannot keep up with their own thoughts, so they are forced to summarize, choose, and condense. Students who type their notes, by contrast, tend to transcribe word for word, and several studies have found that they remember less of what they heard. Slowness, it turns out, is a feature.

Second, handwriting builds the brain in ways that typing does not. Forming a letter by hand requires planning a sequence of movements, controlling them, and checking the result against a model, all at once. Young children who practice writing letters recognize them more quickly when reading. Pressing a key that is already labeled asks nothing of the hand or the eye.

Third, there is the matter of access. Keyboards need power, screens, and money. A pencil needs none of these. A student who can only compose at a keyboard is helpless in a power outage, on a hike, or at a desk where the laptop has been forgotten. Handwriting is the technology that never crashes.

I am not suggesting that students should stop typing. They should type, and type well. But a skill is not obsolete simply because another skill exists. We still teach children to add in their heads even though calculators are everywhere, because mental math trains thinking, not just computing. Handwriting deserves the same respect.

Give students the pen and the keyboard. Then let them discover, as I did, that the slow tool is sometimes the smarter one.`
});

questions.push(
  {
    id: 'rc-case-for-handwriting-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 3, passageId: 'rc-case-for-handwriting',
    stem: `The author's central claim is that`,
    choices: [`schools should stop teaching typing.`, `cursive writing is more attractive than printing.`, `students should take notes word for word.`, `schools should continue to teach handwriting because it offers benefits typing does not.`],
    answer: 3,
    explanation: `Paragraph 1 ends with the author promising to explain why dropping handwriting "is wrong," and paragraphs 2-4 give three benefits of handwriting. Choice D states that position. Choice A is the trap: paragraph 5 says "I am not suggesting that students should stop typing," so the author wants both. Strategy: the central claim of an argument is what the reasons support; here all three reasons support keeping handwriting.`
  },
  {
    id: 'rc-case-for-handwriting-q2', test: 'all', section: 'reading', skill: 'detail', level: 3, passageId: 'rc-case-for-handwriting',
    stem: `According to the passage, students who type their notes tend to`,
    choices: [`summarize more carefully than students who write by hand.`, `copy what they hear word for word and remember less of it.`, `finish faster and remember more.`, `stop paying attention to the lesson.`],
    answer: 1,
    explanation: `Paragraph 2 says typing students "tend to transcribe word for word, and several studies have found that they remember less of what they heard." That is choice B. Choice A describes handwriting students, the group being contrasted. Strategy: in a "by contrast" sentence, make sure you attach each behavior to the right group.`
  },
  {
    id: 'rc-case-for-handwriting-q3', test: 'all', section: 'reading', skill: 'structure', level: 3, passageId: 'rc-case-for-handwriting',
    stem: `How does the author organize the main body of the argument (paragraphs 2 through 4)?`,
    choices: [`as a series of three distinct reasons, each in its own paragraph.`, `as a story about one memorable student.`, `in the order the events happened in the author's career.`, `by comparing two schools with different policies.`],
    answer: 0,
    explanation: `Paragraphs 2, 3, and 4 begin with "First," "Second," and "Third," and each develops one benefit of handwriting (thinking, brain development, access). That is choice A. Choice C is tempting because the author mentions twenty years of teaching, but no career events are narrated. Strategy: numbered transition words almost always indicate a list-of-reasons structure.`
  },
  {
    id: 'rc-case-for-handwriting-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 3, passageId: 'rc-case-for-handwriting',
    stem: `In paragraph 5, the word "obsolete" most nearly means`,
    choices: [`difficult to learn.`, `expensive.`, `no longer useful.`, `beautiful but slow.`],
    answer: 2,
    explanation: `Paragraph 5 says "a skill is not obsolete simply because another skill exists," and then compares it to mental math surviving alongside calculators. The author is arguing that handwriting has not been made useless, so "obsolete" means out of date or no longer useful, choice C. Choice D is tempting because the passage praises slowness, but that is the author's view, not the meaning of the word. Strategy: the calculator example that follows defines the word by analogy.`
  },
  {
    id: 'rc-case-for-handwriting-q5', test: 'all', section: 'reading', skill: 'inference', level: 3, passageId: 'rc-case-for-handwriting',
    stem: `The author mentions calculators in paragraph 5 in order to`,
    choices: [`argue that calculators should be banned from classrooms.`, `show by comparison that a skill can be worth teaching even when a machine can do it.`, `prove that math is harder to learn than writing.`, `suggest that keyboards will soon replace calculators.`],
    answer: 1,
    explanation: `The sentence reads: "We still teach children to add in their heads even though calculators are everywhere, because mental math trains thinking." Then: "Handwriting deserves the same respect." The calculator is an analogy supporting the claim that handwriting still matters, choice B. Choice A is not stated; the author accepts that calculators are everywhere. Strategy: when an author says "the same," the preceding example is being used as a parallel case.`
  },
  {
    id: 'rc-case-for-handwriting-q6', test: 'all', section: 'reading', skill: 'tone-purpose', level: 3, passageId: 'rc-case-for-handwriting',
    stem: `The statement "Slowness, it turns out, is a feature" (paragraph 2) is best understood as`,
    choices: [`a surprising claim that the slow pace of handwriting is actually an advantage.`, `a complaint that handwriting takes too long.`, `an admission that typing is more efficient.`, `a joke about students who work slowly.`],
    answer: 0,
    explanation: `The sentence concludes a paragraph explaining that because handwriting is slow, students must "summarize, choose, and condense," which helps them remember. "It turns out" signals a surprising reversal: the apparent weakness is a strength, choice A. Choice B reads the sentence as negative, but the paragraph presents slowness as helpful. Strategy: watch for phrases like "it turns out" that flip an expectation.`
  }
);

// ---------------------------------------------------------------------------
// LEVEL 4 PASSAGES (upper level)
// ---------------------------------------------------------------------------

passages.push({
  id: 'rc-bioluminescence',
  test: 'all',
  level: 4,
  title: 'Living Light',
  genre: 'science',
  wordCount: 418,
  text: `On a moonless night in certain bays, a swimmer's every stroke trails blue fire. The water itself seems to glow, and footprints on the wet sand flash briefly before fading. The source of this light is not magic or pollution but billions of single-celled organisms called dinoflagellates, each one capable of producing its own light through a chemical reaction. The phenomenon is called bioluminescence, and it is far more common than most people realize. By some estimates, three-quarters of the animals living in the open ocean can make light.

The chemistry is surprisingly consistent across very different creatures. A molecule called luciferin reacts with oxygen, with help from an enzyme called luciferase, and the reaction releases energy as light rather than heat. Because almost none of the energy is wasted as heat, biologists sometimes call it "cold light." A firefly's lantern is nearly one hundred percent efficient; an old-fashioned incandescent bulb, by contrast, converts most of its energy into heat and only a small fraction into light.

What varies enormously is the purpose. Fireflies flash in patterns specific to their species, and females respond to the pattern of their own kind, so that the glow is essentially a language for finding a mate. Some fireflies, however, have learned to imitate the signals of other species, luring in hopeful males and eating them. In the deep sea, the anglerfish dangles a glowing lure in front of its mouth to attract prey. Certain squid do the opposite: they glow on their undersides to match the faint light filtering down from the surface, so that a predator looking up from below sees no silhouette. And the dinoflagellates in the bay are thought to flash when disturbed as a kind of burglar alarm, drawing larger predators that will eat whatever small creature is trying to eat them.

In other words, the same chemical trick has been recruited for courtship, deception, hunting, camouflage, and defense. Scientists have counted dozens of separate occasions on which bioluminescence evolved independently in different branches of the tree of life. That repetition tells us something: in the dark, the ability to make light is so valuable that evolution keeps rediscovering it.

Researchers have since borrowed the trick themselves. Genes for luciferase are now inserted into cells in laboratories so that scientists can watch, by the glow, where a particular protein is active or whether a cancer treatment is working. A reaction that began in the sea, in the dark, has become a lamp for looking inside living things.`
});

questions.push(
  {
    id: 'rc-bioluminescence-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 4, passageId: 'rc-bioluminescence',
    stem: `The passage is primarily about`,
    choices: [`the glowing bays where swimmers can see blue light.`, `how living things produce light and the many purposes that light serves.`, `the ways in which fireflies deceive one another.`, `how laboratories use glowing genes to study cancer.`],
    answer: 1,
    explanation: `Paragraph 1 introduces bioluminescence, paragraph 2 explains the shared chemistry, paragraph 3 surveys its purposes, paragraph 4 draws the evolutionary lesson, and paragraph 5 describes human uses. Choice B is the only option broad enough to cover that sequence. Choice A is the opening hook, and choices C and D are single examples from paragraphs 3 and 5. Strategy: when a passage has a hook, a mechanism, examples, and an application, the main idea is the mechanism plus its range of uses, not any one example.`
  },
  {
    id: 'rc-bioluminescence-q2', test: 'all', section: 'reading', skill: 'detail', level: 4, passageId: 'rc-bioluminescence',
    stem: `According to the passage, bioluminescence is called "cold light" because`,
    choices: [`it occurs only in cold, deep-sea water.`, `it is dimmer than light from a bulb.`, `almost none of the energy of the reaction is released as heat.`, `it is produced only by cold-blooded animals.`],
    answer: 2,
    explanation: `Paragraph 2 says, "Because almost none of the energy is wasted as heat, biologists sometimes call it 'cold light.'" That is choice C. Choice A is tempting because the deep sea appears in paragraph 3, but the term is about the reaction, not the location, and fireflies are not aquatic at all. Strategy: when a question quotes a term, find the sentence that defines it; the word "because" there gives the answer.`
  },
  {
    id: 'rc-bioluminescence-q3', test: 'all', section: 'reading', skill: 'detail', level: 4, passageId: 'rc-bioluminescence',
    stem: `The squid described in paragraph 3 glow on their undersides in order to`,
    choices: [`hide their outline from predators looking up from below.`, `attract a mate of the same species.`, `lure small fish toward their mouths.`, `signal other squid that danger is near.`],
    answer: 0,
    explanation: `Paragraph 3 says the squid "glow on their undersides to match the faint light filtering down from the surface, so that a predator looking up from below sees no silhouette." That is camouflage, choice A. Choice C describes the anglerfish, and choice B describes fireflies; both are in the same paragraph, which is why careful matching matters. Strategy: in a paragraph that lists several animals, draw a quick mental line from each animal to its purpose.`
  },
  {
    id: 'rc-bioluminescence-q4', test: 'all', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-bioluminescence',
    stem: `The author's claim that evolution "keeps rediscovering" bioluminescence (paragraph 4) is best supported by which piece of evidence?`,
    choices: [`Fireflies are nearly one hundred percent efficient at producing light.`, `Three-quarters of open-ocean animals can make light.`, `Scientists have inserted luciferase genes into laboratory cells.`, `Bioluminescence has evolved separately in many different branches of life.`],
    answer: 3,
    explanation: `The sentence before the claim says scientists "have counted dozens of separate occasions on which bioluminescence evolved independently." Independent evolution in many lineages is what "rediscovering" means, choice D. Choice B is tempting because it shows the trait is common, but commonness could come from a single origin; only separate origins show repeated discovery. Strategy: match the claim to the evidence that proves the specific point, not just related facts.`
  },
  {
    id: 'rc-bioluminescence-q5', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 4, passageId: 'rc-bioluminescence',
    stem: `In paragraph 4, the word "recruited" most nearly means`,
    choices: [`invented from nothing.`, `put to use for a purpose.`, `hired for money.`, `abandoned.`],
    answer: 1,
    explanation: `Paragraph 4 says "the same chemical trick has been recruited for courtship, deception, hunting, camouflage, and defense." The one reaction is being enlisted for different jobs, so "recruited" means put to use, choice B. Choice C is the literal employment sense, which does not fit a chemical reaction. Strategy: an everyday word applied to nature usually keeps its core idea (here, enlisting for a task) while dropping its human details (money).`
  },
  {
    id: 'rc-bioluminescence-q6', test: 'all', section: 'reading', skill: 'structure', level: 4, passageId: 'rc-bioluminescence',
    stem: `How does the third paragraph relate to the second?`,
    choices: [`It contradicts the chemistry described in the second paragraph.`, `It gives the history of how the reaction was discovered.`, `After the second explains what is shared across species, the third explores how the purpose differs.`, `It restates the second paragraph in simpler terms.`],
    answer: 2,
    explanation: `Paragraph 2 begins "The chemistry is surprisingly consistent," and paragraph 3 begins "What varies enormously is the purpose." The two openings are deliberately paired: sameness, then difference. That is choice C. Choice A is wrong because nothing in paragraph 3 disputes the chemistry. Strategy: compare the topic sentences of adjacent paragraphs; authors often build a same-versus-different structure.`
  },
  {
    id: 'rc-bioluminescence-q7', test: 'all', section: 'reading', skill: 'tone-purpose', level: 4, passageId: 'rc-bioluminescence',
    stem: `The author's attitude toward bioluminescence is best described as`,
    choices: [`fascinated and admiring.`, `skeptical of its importance.`, `worried about its dangers.`, `detached and purely technical.`],
    answer: 0,
    explanation: `The author opens with "blue fire" and footprints that "flash," calls the firefly's efficiency remarkable by comparison with a light bulb, and ends with the image of "a lamp for looking inside living things." The language is vivid and appreciative, choice A. Choice D is tempting because there is real chemistry here, but a purely technical writer would not open with a swimmer trailing fire. Strategy: judge attitude by the imagery and adjectives, especially in the first and last paragraphs.`
  }
);

passages.push({
  id: 'rc-the-understudy',
  test: 'all',
  level: 4,
  title: 'The Understudy',
  genre: 'fiction',
  wordCount: 391,
  text: `For six weeks, Dana had learned every line of a part she would never play. That was what it meant to be an understudy: you stood in the wings during rehearsal, mouthing the words, while Celeste Marchetti stood in the light and actually said them. Celeste had been cast as Antigone because she was, everyone agreed, the best actor in the school. Dana had been cast as her shadow because she was, everyone agreed, reliable.

Dana did not resent Celeste. That would have been easier. Celeste was generous and funny and had once stayed after rehearsal for an hour to help Dana with a monologue for another class. It was impossible to dislike her, and so Dana was left with a feeling that had no object, a kind of ache that she carried into the wings each afternoon and carried home again.

On the Thursday before opening night, Dana arrived at the theater to find Mr. Okafor, the director, waiting at the stage door. His face told her before his words did. Celeste had been in a car accident. She was going to be fine, but she had a broken wrist and a concussion, and the doctor had said no stage, no lights, no chance.

"You're on," Mr. Okafor said. "Tomorrow."

Dana had imagined this moment, of course. Everyone who stands in the wings imagines it. In the imagining, the feeling had always been something like triumph. In the actual stage door, with the actual cold air and the director's actual tired eyes, it felt nothing like triumph. It felt like being handed something that belonged to someone else.

She called Celeste that night. She had not planned what to say and ended up saying almost nothing; Celeste did most of the talking, her voice slow from the medication. "Listen," Celeste said finally. "The second act, where she argues with Creon. Don't play it angry. I always played it angry, and it was wrong. She's not angry. She's certain. There's a difference."

Dana wrote it down on the back of her hand.

The next night, when the lights came up and she walked to center stage, she was not thinking about Celeste, or Mr. Okafor, or the six weeks in the wings. She was thinking about the difference between angry and certain. She said the first line, and it was hers.`
});

questions.push(
  {
    id: 'rc-the-understudy-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 4, passageId: 'rc-the-understudy',
    stem: `Which statement best expresses the central idea of the story?`,
    choices: [`Understudies are usually more talented than the actors they replace.`, `Dana secretly hoped that Celeste would be unable to perform.`, `Dana comes to make a role her own, helped by the generosity of the person she replaces.`, `Mr. Okafor regrets his original casting decision.`],
    answer: 2,
    explanation: `The story moves from Dana as "shadow" (paragraph 1), through the uncomfortable gift of the part (paragraph 5), to Celeste's advice (paragraph 6) and the final line, "it was hers." Choice C captures that arc. Choice B is tempting because paragraph 5 admits Dana "had imagined this moment," but the same paragraph says the reality "felt nothing like triumph," and paragraph 2 says she did not resent Celeste. Strategy: a central idea for fiction should account for the ending, not just the setup.`
  },
  {
    id: 'rc-the-understudy-q2', test: 'all', section: 'reading', skill: 'detail', level: 4, passageId: 'rc-the-understudy',
    stem: `According to the passage, why was Dana chosen as the understudy?`,
    choices: [`She was considered the best actor in the school.`, `She had asked Mr. Okafor for the role.`, `She had helped Celeste prepare a monologue.`, `She was considered dependable.`],
    answer: 3,
    explanation: `Paragraph 1 says Dana "had been cast as her shadow because she was, everyone agreed, reliable." That is choice D. Choice A describes Celeste. Choice C reverses the help: Celeste helped Dana with a monologue (paragraph 2). Strategy: the parallel sentences in paragraph 1 ("because she was, everyone agreed, ...") set up a direct contrast; keep the two adjectives attached to the right girl.`
  },
  {
    id: 'rc-the-understudy-q3', test: 'all', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-the-understudy',
    stem: `In paragraph 2, the author says Dana's feeling "had no object." This most likely means that`,
    choices: [`Dana had nothing in her life to feel sad about.`, `Dana's unhappiness had no one to blame, since Celeste deserved the part and was kind to her.`, `Dana did not understand what an understudy was supposed to do.`, `Dana was no longer interested in the play.`],
    answer: 1,
    explanation: `Paragraph 2 begins "Dana did not resent Celeste. That would have been easier," then explains that Celeste was generous and "impossible to dislike," and "so" Dana's ache had no object. An emotion's "object" is its target; Dana has no one to aim her disappointment at, choice B. Choice A is contradicted by the "ache" she carries home. Strategy: the word "so" links the feeling to the reason just given; use that reason to decode the phrase.`
  },
  {
    id: 'rc-the-understudy-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 4, passageId: 'rc-the-understudy',
    stem: `In paragraph 5, the word "triumph" most nearly means`,
    choices: [`victory.`, `relief.`, `confusion.`, `guilt.`],
    answer: 0,
    explanation: `Paragraph 5 says that in Dana's imagination, getting the part "had always been something like triumph," and then contrasts that with the reality of being "handed something that belonged to someone else." The imagined feeling is winning, choice A; the real feeling is closer to guilt, which is why choice D is the trap. Strategy: when a sentence contrasts an imagined feeling with a real one, the vocabulary word belongs to the imagined side.`
  },
  {
    id: 'rc-the-understudy-q5', test: 'all', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-the-understudy',
    stem: `Why does the moment at the stage door feel "like being handed something that belonged to someone else"?`,
    choices: [`Dana realizes she has not actually learned the lines.`, `Mr. Okafor clearly wishes Celeste could still perform.`, `Dana feels the role is still rightfully Celeste's and comes to her only through Celeste's bad luck.`, `Dana has decided she would rather play Creon.`],
    answer: 2,
    explanation: `Dana gets the part only because Celeste was hurt (paragraph 3), and she has already been established as Celeste's "shadow" who does not resent her (paragraphs 1-2). The role feels borrowed rather than earned, choice C. Choice A is contradicted by paragraph 1, which says she learned "every line." Choice B puts the feeling in the wrong person; the sentence describes how it felt to Dana. Strategy: an inference about a feeling must fit the character who has the feeling.`
  },
  {
    id: 'rc-the-understudy-q6', test: 'all', section: 'reading', skill: 'structure', level: 4, passageId: 'rc-the-understudy',
    stem: `Why does the author include the phone call with Celeste (paragraph 6)?`,
    choices: [`to show that Celeste is jealous of Dana's opportunity.`, `to give Dana the insight that lets her make the role her own and to show Celeste's generosity.`, `to explain exactly how the car accident happened.`, `to reveal that Celeste will return for the second performance.`],
    answer: 1,
    explanation: `In the call, Celeste, though injured and medicated, gives Dana the key to the part ("She's not angry. She's certain."), and the final paragraph shows Dana thinking about exactly that as she speaks her first line. The call supplies both the turning point and the proof of Celeste's character, choice B. Choice A is the opposite of what Celeste shows. Strategy: ask what would be lost if the scene were cut; here the ending would have no source for its insight.`
  },
  {
    id: 'rc-the-understudy-q7', test: 'all', section: 'reading', skill: 'tone-purpose', level: 4, passageId: 'rc-the-understudy',
    stem: `The final sentence, "She said the first line, and it was hers," suggests that`,
    choices: [`Dana has finally memorized the line correctly.`, `the audience prefers Dana to Celeste.`, `Dana has decided to ignore Celeste's advice.`, `Dana no longer feels like someone else's shadow.`],
    answer: 3,
    explanation: `The story has repeatedly framed the part as belonging to Celeste (paragraphs 1 and 5). "It was hers" reverses that: the role now belongs to Dana. That is choice D. Choice C is contradicted by the sentence before, where Dana is "thinking about the difference between angry and certain," which is Celeste's advice. Strategy: a short final sentence often answers a tension the story set up at the start; look for the earlier phrase it overturns ("her shadow").`
  }
);

passages.push({
  id: 'rc-dust-bowl',
  test: 'all',
  level: 4,
  title: 'When the Sky Turned Black',
  genre: 'history',
  wordCount: 426,
  text: `In the spring of 1935, dust from Oklahoma fell on ships three hundred miles out in the Atlantic Ocean. It darkened the sky over Washington, D.C., where, as it happened, Congress was debating a bill about soil conservation. Lawmakers who had been unconvinced walked to the windows, saw the brown haze, and voted for the bill. The land itself had come to testify.

The disaster that became known as the Dust Bowl had been decades in the making. The southern Great Plains, covering parts of Oklahoma, Texas, Kansas, Colorado, and New Mexico, had been grassland for thousands of years. The grasses' deep roots held the soil in place through droughts and winds that would have stripped bare ground in a season. Then came the First World War. Wheat prices soared, and farmers, encouraged by the government and by new gasoline tractors, plowed up millions of acres of grass to plant it. In wet years, the harvests were enormous. Nobody asked what would happen in dry ones.

The dry years arrived in 1931 and stayed for most of a decade. Without rain, the wheat died, and without wheat or grass, there was nothing to hold the soil. The wind did the rest. Storms rose like dark walls thousands of feet high and rolled across the plains, turning noon into midnight. Dust seeped through sealed windows and settled on dinner tables between the time a plate was set and the time it was filled. Children developed a condition doctors called dust pneumonia. Cattle died with their stomachs packed with dirt. On April 14, 1935, a day remembered as Black Sunday, a single storm carried an estimated three hundred thousand tons of topsoil into the air.

Hundreds of thousands of people gave up. They packed what fit in a car and drove west, mostly toward California, where they were often met with suspicion and signs telling them to keep moving. Those who stayed learned, slowly, to farm differently. The new Soil Conservation Service taught them to plow along the curves of hillsides rather than straight up and down, to leave stubble in the fields after harvest, and to plant rows of trees as windbreaks. By the end of the decade, the rains returned and the storms faded.

The Dust Bowl is often remembered as a natural disaster. It was not, or not only. The drought was natural; the catastrophe was made. The plains had survived droughts before. What they could not survive was a drought on land that had been stripped of the one thing that held it together.`
});

questions.push(
  {
    id: 'rc-dust-bowl-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 4, passageId: 'rc-dust-bowl',
    stem: `The passage mainly argues that the Dust Bowl`,
    choices: [`was caused entirely by an unusual lack of rain.`, `could have been avoided if farmers had moved to California sooner.`, `was the most destructive single storm in American history.`, `was a catastrophe produced when human farming practices collided with a natural drought.`],
    answer: 3,
    explanation: `The final paragraph states the thesis outright: "The drought was natural; the catastrophe was made." Paragraph 2 supplies the human cause (plowing up the grass) and paragraph 3 the natural one (drought). Choice D combines both. Choice A is exactly the view the author rejects ("It was not, or not only"). Strategy: when the last paragraph begins by naming a common belief and then says "It was not," the main idea is the correction that follows.`
  },
  {
    id: 'rc-dust-bowl-q2', test: 'all', section: 'reading', skill: 'detail', level: 4, passageId: 'rc-dust-bowl',
    stem: `According to the passage, why did farmers plow up the grasslands?`,
    choices: [`High wheat prices during the First World War made planting wheat profitable.`, `The government ordered them to remove the grass.`, `The grass had already died from drought.`, `They needed open land for raising cattle.`],
    answer: 0,
    explanation: `Paragraph 2 says, "Then came the First World War. Wheat prices soared, and farmers... plowed up millions of acres of grass to plant it." That is choice A. Choice B overstates the text, which says farmers were "encouraged" by the government, not ordered. Choice C reverses the sequence: the drought came in 1931, after the plowing. Strategy: watch for answer choices that turn "encouraged" into "ordered"; that shift in strength makes a choice wrong.`
  },
  {
    id: 'rc-dust-bowl-q3', test: 'all', section: 'reading', skill: 'structure', level: 4, passageId: 'rc-dust-bowl',
    stem: `Why does the author open the passage with dust falling on Washington, D.C.?`,
    choices: [`to explain how a bill becomes a law.`, `to show the scale of the disaster with a striking image before explaining its causes.`, `to argue that Congress caused the Dust Bowl.`, `to describe typical spring weather in Washington.`],
    answer: 1,
    explanation: `Paragraph 1 shows Oklahoma dust reaching ships in the Atlantic and darkening the capital, which dramatizes how enormous the storms were; only in paragraph 2 does the author go back to explain the causes ("had been decades in the making"). That is choice B. Choice C misreads the paragraph: Congress is shown responding to the disaster, not causing it. Strategy: an opening scene far from the main setting is usually there for impact; ask what it makes the reader feel before the explanation begins.`
  },
  {
    id: 'rc-dust-bowl-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 4, passageId: 'rc-dust-bowl',
    stem: `In paragraph 1, the phrase "come to testify" most nearly means`,
    choices: [`started to rain.`, `traveled by train.`, `arrived to give evidence, as a witness would.`, `come to apologize.`],
    answer: 2,
    explanation: `The sentence follows a scene in which lawmakers debating a soil bill look out the window and see the dust, then vote for the bill. The dust acts like a witness proving the case, so "testify" carries its courtroom meaning, choice C. Choice A has nothing to do with the context; the sky is full of dust, not rain. Strategy: when a passage personifies something ("the land itself"), interpret the verb as the human action it borrows.`
  },
  {
    id: 'rc-dust-bowl-q5', test: 'all', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-dust-bowl',
    stem: `The sentence "Nobody asked what would happen in dry ones" (paragraph 2) implies that`,
    choices: [`farmers were too lazy to plan ahead.`, `there had never been a drought on the plains before.`, `the government hid the weather forecasts.`, `the success of the wet years blinded farmers to the danger of drought.`],
    answer: 3,
    explanation: `The sentence directly follows "In wet years, the harvests were enormous," so the implication is that good results made people stop asking hard questions, choice D. Choice B is contradicted by paragraph 5 ("The plains had survived droughts before"). Choice A is harsher than the text supports; the author blames a blind spot, not laziness. Strategy: an implication question asks what the sentence suggests in its immediate context; read the sentence before it.`
  },
  {
    id: 'rc-dust-bowl-q6', test: 'all', section: 'reading', skill: 'detail', level: 4, passageId: 'rc-dust-bowl',
    stem: `Which of the following was NOT mentioned as a practice taught by the Soil Conservation Service?`,
    choices: [`plowing along the curves of hillsides.`, `leaving stubble in the fields after harvest.`, `pumping water from underground wells.`, `planting rows of trees as windbreaks.`],
    answer: 2,
    explanation: `Paragraph 4 lists three practices: plowing along the curves of hillsides, leaving stubble after harvest, and planting trees as windbreaks. Pumping well water (choice C) is never mentioned. It is tempting because irrigation sounds like a sensible response to drought, but the question asks what the passage says, not what might work. Strategy: for NOT questions, check off each choice against the text and pick the one you cannot find.`
  },
  {
    id: 'rc-dust-bowl-q7', test: 'all', section: 'reading', skill: 'tone-purpose', level: 4, passageId: 'rc-dust-bowl',
    stem: `The author's statement "The drought was natural; the catastrophe was made" is intended to`,
    choices: [`draw a sharp line between the natural cause and the human responsibility.`, `blame the weather alone for the suffering.`, `praise the courage of the farmers who stayed.`, `suggest that historians have exaggerated the drought.`],
    answer: 0,
    explanation: `The semicolon balances two parallel halves, natural versus made, and the next sentences explain that the plains had survived droughts until people stripped the grass. The author is separating what nature did from what people did, choice A. Choice B is the opposite of the sentence's point. Strategy: a balanced sentence with a semicolon usually sets up a contrast; identify what is on each side.`
  }
);

passages.push({
  id: 'rc-inheritance-poem',
  test: 'ssat',
  level: 4,
  title: 'What the House Knows',
  genre: 'poetry',
  wordCount: 157,
  text: `My father built the stairs that creak, and he
could name each step by sound: the third one sighs,
the seventh groans, the ninth keeps quiet. "See,"
he'd say, "that's how you climb without a sound."

He taught me this as if it were a gift.
I was eleven. I didn't think to ask
what he had needed silence for, or if
some other boy once crept past some other door.

Now he is old, and I am what he was,
and my own daughter learns the stairs from me.
I hear her test the seventh step, and pause,
and shift her weight, and choose the ninth instead.

So this is what gets handed down: not land,
not money, not the house, which will be sold,
but small, exact, half-understood commands
for moving gently through a world of wood,

and knowledge that the stairs will give us up
no matter how we learn them. Still, we learn.`
});

questions.push(
  {
    id: 'rc-inheritance-poem-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 4, passageId: 'rc-inheritance-poem',
    stem: `The poem is primarily concerned with`,
    choices: [`how to build a staircase that does not creak.`, `the speaker's resentment toward a secretive father.`, `what is truly passed down from one generation to the next.`, `a daughter who disobeys her parents at night.`, `the sadness of selling a family home.`],
    answer: 2,
    explanation: `Lines 13-16 state the theme directly: "So this is what gets handed down: not land, / not money, not the house... but small, exact, half-understood commands." The first three stanzas show the lesson passing from father to speaker to daughter. Choice C captures that. Choice E is tempting because the house "will be sold" (line 14), but the poem dismisses the house as not what matters. Strategy: when a poem contains a line beginning "So this is," that line usually names the central idea.`
  },
  {
    id: 'rc-inheritance-poem-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 4, passageId: 'rc-inheritance-poem',
    stem: `According to the poem, which step makes no sound?`,
    choices: [`the first.`, `the third.`, `the seventh.`, `the eleventh.`, `the ninth.`],
    answer: 4,
    explanation: `Line 3 says "the ninth keeps quiet," and line 12 confirms it when the daughter chooses "the ninth instead." That is choice E. Choice D is a trap built from line 6, "I was eleven," which is the speaker's age, not a step. Strategy: poems pack several numbers close together; verify which noun each number describes.`
  },
  {
    id: 'rc-inheritance-poem-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-inheritance-poem',
    stem: `Lines 6-8 ("I didn't think to ask...") suggest that the speaker now`,
    choices: [`wishes to rebuild the staircase.`, `wonders about the father's own hidden past and why he once needed to move silently.`, `regrets teaching the daughter about the stairs.`, `believes the father was lying about the steps.`, `remembers the house with pure happiness.`],
    answer: 1,
    explanation: `The speaker, looking back, notes not having asked "what he had needed silence for, or if / some other boy once crept past some other door." The phrasing implies the adult speaker now suspects the father had his own youthful secrets, choice B. Choice D goes too far; the speaker questions the father's past, not his honesty about the steps, which the daughter's experience confirms. Strategy: "I didn't think to ask" signals a question the speaker is asking now; the inference lies in that question.`
  },
  {
    id: 'rc-inheritance-poem-q4', test: 'ssat', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-inheritance-poem',
    stem: `In lines 11-12, the daughter's choice of the ninth step shows that`,
    choices: [`she is afraid of the dark.`, `the seventh step has been repaired.`, `she prefers to be heard.`, `she has absorbed the lesson just as the speaker once absorbed it from the father.`, `she is trying to wake the speaker.`],
    answer: 3,
    explanation: `Line 10 says the daughter "learns the stairs from me," and lines 11-12 show her testing the seventh (which "groans," line 3) and choosing the ninth (which "keeps quiet"). She is applying the inherited knowledge, completing the three-generation pattern, choice D. Choice C is the opposite; she avoids the noisy step. Strategy: connect the daughter's action to the specific step sounds named in stanza one.`
  },
  {
    id: 'rc-inheritance-poem-q5', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 4, passageId: 'rc-inheritance-poem',
    stem: `In line 15, the phrase "half-understood commands" most nearly refers to`,
    choices: [`instructions whose deeper meaning the speaker never fully grasped.`, `orders the father shouted in anger.`, `rules for selling the house.`, `songs the father used to sing.`, `carpentry directions for building stairs.`],
    answer: 0,
    explanation: `The "commands" are the father's lessons about which steps to use (lines 2-4), and "half-understood" echoes stanza two, where the speaker never asked what the silence was for. So the phrase means instructions passed on without their full meaning, choice A. Choice E is tempting because the father built the stairs, but the commands are about climbing, not building. Strategy: link an abstract phrase back to the concrete scene that illustrates it.`
  },
  {
    id: 'rc-inheritance-poem-q6', test: 'ssat', section: 'reading', skill: 'structure', level: 4, passageId: 'rc-inheritance-poem',
    stem: `How does the fourth stanza (lines 13-16) function in the poem?`,
    choices: [`It introduces the speaker's mother.`, `It returns the poem to the speaker's childhood.`, `It states directly the idea the earlier stanzas have shown through example.`, `It describes the day the house is sold.`, `It contradicts what the father said in stanza one.`],
    answer: 2,
    explanation: `Stanzas one through three tell a story in three generations; stanza four steps back and generalizes: "So this is what gets handed down." The examples come first, the statement second, choice C. Choice D takes "will be sold" as an event, but it is a passing future detail, not a scene. Strategy: the word "So" at the start of a stanza often marks the shift from narrative to reflection.`
  },
  {
    id: 'rc-inheritance-poem-q7', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 4, passageId: 'rc-inheritance-poem',
    stem: `The final two lines convey a tone that is best described as`,
    choices: [`bitter.`, `joyful.`, `mocking.`, `accepting and quietly determined.`, `terrified.`],
    answer: 3,
    explanation: `Lines 17-18 admit that "the stairs will give us up / no matter how we learn them," which acknowledges that the effort can never fully succeed, and then add "Still, we learn." The acceptance of a limit plus the decision to continue is choice D. Choice A is tempting because of the defeat in "give us up," but "Still, we learn" is not bitter; it is resolve. Strategy: a tone question about an ending should weigh the very last clause most heavily.`
  }
);

passages.push({
  id: 'rc-busyness',
  test: 'all',
  level: 4,
  title: 'The Case Against Busy',
  genre: 'argument',
  wordCount: 433,
  text: `Ask an adult how they are, and the answer, more often than not, is "busy." It is said with a sigh, but listen closely and you will hear something else underneath: a note of pride. In our culture, busyness has become a badge, a way of announcing that one is needed, important, in demand. I want to argue that this badge is counterfeit, and that we are handing it to our children.

Consider the schedule of a typical twelve-year-old in an ambitious family. School until three. A sport until five. Music, tutoring, or a club until seven. Homework until bed. Weekends bring tournaments, recitals, and volunteer hours that will look good on an application. Every hour is accounted for, and every activity, taken on its own, is defensible. Sports build health. Music builds discipline. Volunteering builds character. Who could object?

I object, not to any single item but to the sum. A child whose days are entirely scheduled never experiences boredom, and boredom, it turns out, is not a problem to be solved but a doorway. The child who is bored builds a fort, invents a game, writes a terrible novel, takes apart a radio, or simply lies in the grass and thinks. These unscheduled hours are where a person finds out what they actually like, as opposed to what they have been signed up for. Remove them, and you produce a young adult with an impressive résumé and no idea who they are.

Defenders of the full calendar will say that children left to themselves will only stare at screens. This is a fair worry but a weak argument. It is a reason to limit screens, not a reason to abolish free time. For most of human history, children had hours of unsupervised play every day, and the species produced its artists and scientists anyway.

There is also a quieter cost. Busyness teaches a child that their worth lies in output. Each activity comes with a measure: a score, a grade, a ribbon. The lesson absorbed, without anyone intending it, is that a person at rest is a person wasting time. That lesson is hard to unlearn, and it follows people into adulthood, where it shows up as the sigh, and the pride, when someone asks how they are.

I am not proposing that children do nothing. I am proposing that something is not always better than nothing, and that an empty afternoon is not a failure of planning but an opportunity. Protect it the way you would protect any other appointment. It may be the most important one on the calendar.`
});

questions.push(
  {
    id: 'rc-busyness-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 4, passageId: 'rc-busyness',
    stem: `Which statement best expresses the author's main argument?`,
    choices: [`Over-scheduling children robs them of the unstructured time in which they discover who they are.`, `Children should quit organized sports and music lessons.`, `Adults are too proud of their busy lives to change them.`, `Screen time is the greatest threat facing children today.`],
    answer: 0,
    explanation: `Paragraph 3 makes the core claim that unscheduled hours "are where a person finds out what they actually like," and paragraph 6 restates it: an empty afternoon "is not a failure of planning but an opportunity." Choice A captures this. Choice B is too extreme; paragraph 6 says "I am not proposing that children do nothing" and paragraph 3 objects "not to any single item but to the sum." Strategy: in an argument, check the author's own qualifications ("I am not proposing...") to rule out extreme answers.`
  },
  {
    id: 'rc-busyness-q2', test: 'all', section: 'reading', skill: 'detail', level: 4, passageId: 'rc-busyness',
    stem: `According to the author, what does boredom lead to?`,
    choices: [`laziness and bad habits.`, `higher grades in school.`, `more time spent on screens.`, `self-directed, creative activity.`],
    answer: 3,
    explanation: `Paragraph 3 calls boredom "a doorway" and lists what the bored child does: builds a fort, invents a game, writes a novel, takes apart a radio. Those are self-chosen creative acts, choice D. Choice C is the objection raised by "defenders of the full calendar" in paragraph 4, which the author rejects. Strategy: distinguish the author's own claims from the opposing views the author quotes in order to refute.`
  },
  {
    id: 'rc-busyness-q3', test: 'all', section: 'reading', skill: 'structure', level: 4, passageId: 'rc-busyness',
    stem: `The author's main strategy in paragraph 2 is to`,
    choices: [`list the activities the author's own children enjoy.`, `present a typical schedule so fairly that each activity seems reasonable, setting up the objection to the whole.`, `prove that organized sports harm children.`, `summarize the argument made in paragraph 1.`],
    answer: 1,
    explanation: `Paragraph 2 lays out the schedule, grants that "every activity, taken on its own, is defensible," and ends with "Who could object?" Paragraph 3 then answers, "I object, not to any single item but to the sum." The fairness of paragraph 2 makes the objection in paragraph 3 land harder, choice B. Choice C is the opposite of what the paragraph does; it concedes that sports build health. Strategy: a paragraph that ends with a rhetorical question is usually setting up the answer in the next paragraph.`
  },
  {
    id: 'rc-busyness-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 4, passageId: 'rc-busyness',
    stem: `In paragraph 1, the word "counterfeit" most nearly means`,
    choices: [`fake.`, `rare.`, `expensive.`, `earned.`],
    answer: 0,
    explanation: `Paragraph 1 calls busyness "a badge" that announces importance, then says "this badge is counterfeit." A counterfeit badge is a false one; the author means the pride is not justified, choice A. Choice D is the opposite, and choice C takes the money association of the word too literally. Strategy: a word applied to a metaphor (the badge) should be read in terms of the metaphor; a fake badge signals a false claim.`
  },
  {
    id: 'rc-busyness-q5', test: 'all', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-busyness',
    stem: `How does the author respond to the concern that unscheduled children will "only stare at screens"?`,
    choices: [`by denying that children use screens at all.`, `by agreeing that free time should therefore be abolished.`, `by accepting the worry as fair but arguing it justifies limiting screens, not eliminating free time.`, `by proposing even more organized activities to fill the time.`],
    answer: 2,
    explanation: `Paragraph 4 calls the concern "a fair worry but a weak argument" and says it "is a reason to limit screens, not a reason to abolish free time." That is exactly choice C. Choice A is wrong because the author accepts the worry as fair. Choice B is the position the author is arguing against. Strategy: when an author uses the pattern "X is a reason for A, not for B," the answer will distinguish A from B.`
  },
  {
    id: 'rc-busyness-q6', test: 'all', section: 'reading', skill: 'inference', level: 4, passageId: 'rc-busyness',
    stem: `The author's reference to "the sigh, and the pride" in paragraph 5 connects to the opening paragraph by suggesting that`,
    choices: [`adults are generally happier than children.`, `children should be taught to express their feelings.`, `pride is always harmful.`, `the over-scheduled child grows up to become the busy, sighing adult.`],
    answer: 3,
    explanation: `Paragraph 1 describes the adult who says "busy" with a sigh and hidden pride; paragraph 5 says the lesson that rest is wasted time "follows people into adulthood, where it shows up as the sigh, and the pride." The repeated phrase links cause (childhood scheduling) to effect (the adult attitude), choice D. Choice C is too absolute; the author criticizes one kind of pride, not pride itself. Strategy: when a distinctive phrase from the opening reappears late in an essay, the author is closing a loop; ask what the two moments have in common.`
  },
  {
    id: 'rc-busyness-q7', test: 'all', section: 'reading', skill: 'tone-purpose', level: 4, passageId: 'rc-busyness',
    stem: `The author's tone throughout the passage is best described as`,
    choices: [`playful and lighthearted.`, `earnest and persuasive.`, `angry and accusatory.`, `uncertain and hesitant.`],
    answer: 1,
    explanation: `The author argues a serious point with direct statements ("I want to argue," "I object," "Protect it"), concedes fair worries, and ends with advice. That is sincere persuasion, choice B. Choice C is tempting because the author criticizes a cultural habit, but there is no name-calling or blame of individual parents; the author even says the lesson is taught "without anyone intending it." Strategy: distinguish firm disagreement from anger by checking whether the author attacks people or ideas.`
  }
);

// ---------------------------------------------------------------------------
// LEVEL 5 PASSAGES (elite)
// ---------------------------------------------------------------------------

passages.push({
  id: 'rc-mary-anning',
  test: 'all',
  level: 5,
  title: 'The Fossil Hunter of Lyme Regis',
  genre: 'biography',
  wordCount: 474,
  text: `Mary Anning was born in 1799 in Lyme Regis, a small town on the southern coast of England, where the cliffs are made of a dark, crumbling shale that the sea tears away in winter storms. Those cliffs were the family's livelihood. Her father, a cabinetmaker, supplemented his meager income by collecting the strange stone shapes that weathered out of the rock, what the locals called "curiosities," and selling them to tourists. When he died in 1810, leaving the family in debt, the collecting ceased to be a sideline and became the only thing standing between the Annings and the poorhouse.

The following year, Mary's brother Joseph found a skull nearly four feet long embedded in the cliff. Over the following months, Mary, then about twelve, located and painstakingly excavated the rest of the skeleton. It was no creature anyone had seen alive. Scientists would eventually name it Ichthyosaurus, "fish lizard," and it became one of the first fossils to force a question that respectable opinion had long avoided: whether entire kinds of animals could vanish from the earth. In 1823, Anning unearthed the first complete plesiosaur, a marine reptile with a neck so improbably long that one eminent anatomist initially suspected a fake. In 1828, she found the first pterosaur discovered outside Germany. Each find rewrote a page of natural history.

Yet the pages did not carry her name. Anning was a woman, poor, and a religious dissenter in an era when the Geological Society of London admitted none of the three. Gentlemen scientists purchased her specimens, described them in learned papers, and credited the collector, if at all, in a footnote. Some of them freely acknowledged in private letters what they omitted in print: that she knew the anatomy of these creatures better than they did, that she could identify a bone from a fragment, that her hypotheses about how the animals had lived were frequently correct. She taught herself French to read the leading anatomical works and dissected modern fish and squid to compare their structures with those of her fossils. She was, by any reasonable definition, a scientist. She was simply never permitted to be called one.

Her working life was perilous as well as unrewarded. The best fossils emerged after landslides, which meant hunting in winter along unstable cliffs. In 1833, a collapse killed her dog, Tray, who had been standing a few feet from her. She continued. Money remained scarce; when fossil prices fell in the 1830s, a few sympathetic scientists arranged a small annuity to keep her from destitution. She died of cancer in 1847, at forty-seven.

Her reputation has since been reassembled, bone by bone, much as she reassembled the creatures she found. Today it is her name, not those of the gentlemen who published her discoveries, that appears on the museum walls of Lyme Regis.`
});

questions.push(
  {
    id: 'rc-mary-anning-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 5, passageId: 'rc-mary-anning',
    stem: `Which statement best expresses the main idea of the passage?`,
    choices: [`Fossil hunting in the nineteenth century was more dangerous than it is today.`, `Mary Anning's most important discovery was the plesiosaur.`, `Mary Anning made foundational discoveries but was denied recognition in her lifetime because of her sex, class, and religion.`, `The Geological Society of London eventually apologized to Anning.`],
    answer: 2,
    explanation: `Paragraph 2 lists the discoveries, paragraph 3 explains why "the pages did not carry her name" (woman, poor, dissenter), and paragraph 5 describes her reputation being restored only later. Choice C captures the achievement, the injustice, and its causes. Choice A is a detail from paragraph 4, and choice D is never stated; the passage says museum walls now carry her name, not that the Society apologized. Strategy: a biography's main idea usually pairs what the person did with how the world responded.`
  },
  {
    id: 'rc-mary-anning-q2', test: 'all', section: 'reading', skill: 'detail', level: 5, passageId: 'rc-mary-anning',
    stem: `According to the passage, the ichthyosaur fossil was significant because it`,
    choices: [`helped raise the question of whether whole kinds of animals could go extinct.`, `was the first fossil the Annings ever sold.`, `proved that reptiles had once been able to fly.`, `was initially suspected of being a fake.`],
    answer: 0,
    explanation: `Paragraph 2 says the ichthyosaur "became one of the first fossils to force a question that respectable opinion had long avoided: whether entire kinds of animals could vanish from the earth." That is choice A. Choice D belongs to the plesiosaur, and choice C hints at the pterosaur; both are in the same paragraph, which makes them tempting. Strategy: when a paragraph describes three discoveries in sequence, attach each consequence to its own fossil.`
  },
  {
    id: 'rc-mary-anning-q3', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 5, passageId: 'rc-mary-anning',
    stem: `In paragraph 1, the word "meager" most nearly means`,
    choices: [`steady.`, `seasonal.`, `dishonest.`, `scanty.`],
    answer: 3,
    explanation: `Paragraph 1 says the father "supplemented his meager income" by selling fossils and that his death left the family "in debt" near "the poorhouse." An income that needs supplementing and leaves a family poor is small, choice D. Choice B is tempting because tourists and winter storms suggest seasons, but "meager" describes the amount, not the timing. Strategy: use the consequences in the surrounding sentences (debt, poorhouse) to pin down the degree the word expresses.`
  },
  {
    id: 'rc-mary-anning-q4', test: 'all', section: 'reading', skill: 'inference', level: 5, passageId: 'rc-mary-anning',
    stem: `The author includes the detail that scientists "freely acknowledged in private letters what they omitted in print" (paragraph 3) in order to`,
    choices: [`prove that the scientists were dishonest about the age of the fossils.`, `show that the scientists knew Anning's expertise and chose not to credit it publicly.`, `suggest that the letters were later lost.`, `explain why Anning taught herself French.`],
    answer: 1,
    explanation: `The contrast between "private letters" and "in print" is the point: the men knew she understood the anatomy "better than they did" yet left her out of their papers. That exposes a deliberate choice, not ignorance, choice B. Choice A misreads what they were dishonest about; the fossils' age is never at issue. Strategy: when an author sets "private" against "public," the inference is about the gap between what people knew and what they admitted.`
  },
  {
    id: 'rc-mary-anning-q5', test: 'all', section: 'reading', skill: 'structure', level: 5, passageId: 'rc-mary-anning',
    stem: `The fourth paragraph serves primarily to`,
    choices: [`explain the geological process by which fossils form in cliffs.`, `argue that Anning should have given up fossil hunting.`, `show the physical danger and financial hardship that accompanied her lack of recognition.`, `introduce the scientists who published her work.`],
    answer: 2,
    explanation: `Paragraph 4 opens with "Her working life was perilous as well as unrewarded," then gives the landslide that killed her dog and the fall in fossil prices. The phrase "as well as" adds danger and poverty to the injustice already described in paragraph 3, choice C. Choice B is contradicted by "She continued," which the author presents with admiration. Strategy: a paragraph's first sentence with "as well as" tells you it is adding a new dimension to a point already made.`
  },
  {
    id: 'rc-mary-anning-q6', test: 'all', section: 'reading', skill: 'inference', level: 5, passageId: 'rc-mary-anning',
    stem: `What does the author mean by saying that Anning's reputation has been "reassembled, bone by bone" (paragraph 5)?`,
    choices: [`Her skeleton has been placed on display in a museum.`, `Her recognition was restored gradually, piece by piece, over a long time.`, `Scientists have rebuilt the fossils she discovered.`, `Her name has been carved into the cliffs at Lyme Regis.`],
    answer: 1,
    explanation: `The sentence compares the slow restoring of her reputation to the way "she reassembled the creatures she found," that is, patiently and in fragments. The point is that recognition came slowly and after her death, choice B. Choice A takes the bones literally, and choice C confuses her fossils with her reputation. Strategy: when a comparison uses "much as," identify what is being compared to what; here reputation is compared to a skeleton, not equated with one.`
  },
  {
    id: 'rc-mary-anning-q7', test: 'all', section: 'reading', skill: 'tone-purpose', level: 5, passageId: 'rc-mary-anning',
    stem: `The author's attitude toward the "gentlemen scientists" is best described as`,
    choices: [`admiring.`, `indifferent.`, `amused.`, `critical.`],
    answer: 3,
    explanation: `The author notes that these men credited Anning "if at all, in a footnote," admitted her superiority only in private, and are now absent from the museum walls where her name appears. The repeated, pointed use of "gentlemen" is ironic, choice D. Choice A is tempting because some scientists did arrange an annuity (paragraph 4), but the author calls them "a few sympathetic scientists," distinguishing them from the group who took credit. Strategy: watch for a label used repeatedly with a slight edge; irony is a form of criticism.`
  }
);

passages.push({
  id: 'rc-why-sleep',
  test: 'all',
  level: 5,
  title: 'The Cost of Sleep',
  genre: 'science',
  wordCount: 477,
  text: `From the standpoint of natural selection, sleep looks like a terrible idea. A sleeping animal cannot forage, cannot mate, cannot flee, and cannot watch for whatever is watching it. For a third of every day, it lies insensible, converting itself into a convenient meal. Any mutation that reduced the need for sleep without other cost should, in theory, have spread rapidly through every population on earth. It did not. Sleep, or something resembling it, has been found in every animal carefully examined, from fruit flies to blue whales, and the universality of so hazardous a behavior implies that it performs some function so essential that its dangers are worth paying for. The question that has occupied researchers for a century is what that function is.

The oldest answer is energy conservation, and it is almost certainly incomplete. A sleeping human saves roughly the calories in a slice of bread over an eight-hour night, a trivial gain against the risk of being eaten. A second theory holds that sleep is for the body's repair, and there is evidence for this: growth hormone is released mainly during deep sleep, and sleep-deprived animals show impaired immune function and wound healing. But repair alone fails to explain why the brain, rather than the body, seems to suffer most acutely from sleep's absence. A rat kept awake dies within weeks, and its organs are largely unremarkable at autopsy; it is the brain that has failed.

The most influential recent theories therefore focus on the brain. One proposes that during waking hours, the connections between neurons are strengthened by learning until the system approaches saturation, and that sleep selectively weakens these connections, pruning the trivial to preserve the significant. Memory is not merely stored during sleep but edited. A second theory, supported by experiments in mice, suggests that sleep is a kind of plumbing. Channels between brain cells widen during sleep, and cerebrospinal fluid flushes through them, carrying away metabolic waste products that accumulate during waking thought. One of these products is a protein associated with Alzheimer's disease, which has prompted speculation, still unproven, that chronic sleep loss may contribute to the disease.

These theories are not rivals so much as layers. It is entirely possible that sleep evolved first for one purpose and was subsequently recruited for others, in the way that feathers, which likely arose for warmth, were later found useful for flight. That would explain why no single function accounts for the whole phenomenon, and why the attempt to identify "the" purpose of sleep may be misguided.

What is not in doubt is the cost of going without. Sleep remains the only known behavior that an animal will choose, under experimental conditions, over food. That preference, measured across species, is the clearest statement evolution has made on the subject. Whatever sleep is for, the body considers it worth the risk.`
});

questions.push(
  {
    id: 'rc-why-sleep-q1', test: 'all', section: 'reading', skill: 'main-idea', level: 5, passageId: 'rc-why-sleep',
    stem: `Which statement best expresses the main idea of the passage?`,
    choices: [`Sleep's main purpose is to conserve energy during the night.`, `Although sleep is risky and its purpose remains debated, its universality implies functions essential enough to justify the risk.`, `The brain's need for sleep proves that the body does not need it.`, `Rats and humans respond to sleep deprivation in the same way.`],
    answer: 1,
    explanation: `Paragraph 1 sets up the puzzle (sleep is dangerous yet universal, so it must be essential), paragraphs 2-4 survey theories without settling on one, and paragraph 5 returns to the cost of going without. Choice B holds all of that together. Choice A is the theory the author calls "almost certainly incomplete" in paragraph 2. Choice C is too extreme; the passage says the brain suffers "most acutely," not that the body is unaffected. Strategy: in a passage that weighs several theories, the main idea is the frame around them, not any single theory.`
  },
  {
    id: 'rc-why-sleep-q2', test: 'all', section: 'reading', skill: 'detail', level: 5, passageId: 'rc-why-sleep',
    stem: `According to the passage, why is the energy conservation theory considered incomplete?`,
    choices: [`Animals actually burn more energy while asleep than awake.`, `Only humans save energy by sleeping.`, `Growth hormone cancels out the energy savings.`, `The amount of energy saved is too small to outweigh the danger of sleeping.`],
    answer: 3,
    explanation: `Paragraph 2 says a sleeping human saves "roughly the calories in a slice of bread over an eight-hour night, a trivial gain against the risk of being eaten." The savings are real but tiny compared with the cost, choice D. Choice A overstates the text; the passage never says sleep burns more energy. Choice C mixes in the repair theory, which is a separate idea. Strategy: the word "trivial" is the author's judgment; the answer must reflect that proportion, not reverse it.`
  },
  {
    id: 'rc-why-sleep-q3', test: 'all', section: 'reading', skill: 'inference', level: 5, passageId: 'rc-why-sleep',
    stem: `The example of the rat "kept awake" (paragraph 2) is used to support the claim that`,
    choices: [`the brain suffers most from lack of sleep.`, `rats need more sleep than humans do.`, `sleep exists chiefly to repair the body's organs.`, `laboratory experiments on sleep are unreliable.`],
    answer: 0,
    explanation: `The rat example follows the sentence "repair alone fails to explain why the brain, rather than the body, seems to suffer most acutely," and it ends with "it is the brain that has failed." The unremarkable organs and the failed brain illustrate that claim, choice A. Choice C is the theory the example is used to weaken, which makes it the trap. Strategy: an example usually supports the sentence immediately before it; read backward from the example to find the claim.`
  },
  {
    id: 'rc-why-sleep-q4', test: 'all', section: 'reading', skill: 'vocab-in-context', level: 5, passageId: 'rc-why-sleep',
    stem: `In paragraph 3, the word "pruning" most nearly means`,
    choices: [`strengthening.`, `measuring.`, `trimming away.`, `duplicating.`],
    answer: 2,
    explanation: `Paragraph 3 says sleep "selectively weakens these connections, pruning the trivial to preserve the significant," and the next sentence says memory is "edited." Pruning, as with a plant, means cutting away what is unneeded, choice C. Choice A is the opposite; strengthening happens during waking, according to the same sentence. Strategy: the structure "pruning X to preserve Y" tells you that X is removed and Y is kept.`
  },
  {
    id: 'rc-why-sleep-q5', test: 'all', section: 'reading', skill: 'structure', level: 5, passageId: 'rc-why-sleep',
    stem: `The author's comparison between sleep and feathers (paragraph 4) serves to`,
    choices: [`argue that sleep first evolved in birds.`, `show that flight requires rest.`, `prove that sleep keeps animals warm.`, `illustrate how a trait that arose for one purpose can later serve others.`],
    answer: 3,
    explanation: `Paragraph 4 proposes that sleep "evolved first for one purpose and was subsequently recruited for others, in the way that feathers, which likely arose for warmth, were later found useful for flight." The feathers are an analogy for a trait acquiring new jobs over time, choice D. Choice A takes the analogy literally. Strategy: the phrase "in the way that" introduces an analogy; the analogy explains the sentence before it and should not be read as a new claim about sleep.`
  },
  {
    id: 'rc-why-sleep-q6', test: 'all', section: 'reading', skill: 'inference', level: 5, passageId: 'rc-why-sleep',
    stem: `With which of the following statements would the author most likely agree?`,
    choices: [`Scientists will soon identify the single true purpose of sleep.`, `The link between sleep loss and Alzheimer's disease has been proven.`, `Food is more important to animals than sleep.`, `Looking for a single purpose of sleep may be the wrong approach.`],
    answer: 3,
    explanation: `Paragraph 4 says the theories "are not rivals so much as layers" and that "the attempt to identify 'the' purpose of sleep may be misguided." That is choice D. Choice B is contradicted by the words "speculation, still unproven" in paragraph 3. Choice C is contradicted by paragraph 5, where animals choose sleep over food. Strategy: for "would most likely agree," find the author's hedged statements ("may be," "still unproven") and match their level of certainty.`
  },
  {
    id: 'rc-why-sleep-q7', test: 'all', section: 'reading', skill: 'tone-purpose', level: 5, passageId: 'rc-why-sleep',
    stem: `The phrase "the clearest statement evolution has made on the subject" (paragraph 5) is used to`,
    choices: [`suggest that evolution follows a conscious plan.`, `show that animals do not need food.`, `present the preference for sleep over food as powerful evidence of sleep's importance.`, `criticize the experimental methods used by researchers.`],
    answer: 2,
    explanation: `The sentence refers to the finding that animals "will choose, under experimental conditions, [sleep] over food," and treats that choice as evolution's verdict on how essential sleep is. The figure of speech dramatizes the strength of the evidence, choice C. Choice A takes the personification literally; evolution does not "make statements." Strategy: when an author personifies an abstract process, ask what the human-sounding verb stands in for; here "statement" means evidence.`
  }
);

// ---------------------------------------------------------------------------
// HSPT STANDALONE READING VOCABULARY (no passage)
// ---------------------------------------------------------------------------

const rv = (n, level, stem, choices, answer, explanation) => ({
  id: `hspt-rv-${String(n).padStart(3, '0')}`, test: 'hspt', section: 'reading', skill: 'reading-vocab', level, stem, choices, answer, explanation
});

questions.push(
  rv(1, 2, `a *tedious* task`, [`boring`, `dangerous`, `quick`, `important`], 0,
    `Tedious means long, slow, and dull. A tedious task drags on and bores you, so "boring" is correct. "Important" is the trap because tedious tasks are often necessary, but the word describes how the task feels, not whether it matters. Strategy: plug each choice into the phrase; "a boring task" keeps the meaning.`),
  rv(2, 2, `a *fragile* vase`, [`expensive`, `easily broken`, `ancient`, `colorful`], 1,
    `Fragile means delicate or easily broken; think of a "Fragile" sticker on a package. "Expensive" is tempting because fragile things are often valuable, but price is not part of the definition. Strategy: ask what the word tells you to DO (handle carefully), and the meaning follows.`),
  rv(3, 2, `to *abandon* the plan`, [`improve`, `explain`, `give up`, `begin`], 2,
    `To abandon something is to leave it behind or give it up completely. "Begin" is the opposite and is a trap for students who only half-remember the word. Strategy: remember the root image of an abandoned building, one that has been left behind.`),
  rv(4, 2, `an *enormous* crowd`, [`noisy`, `angry`, `friendly`, `huge`], 3,
    `Enormous means extremely large, so "huge" is correct. "Noisy" is the trap: a big crowd is often loud, but the word describes size only. Strategy: do not add associations; stick to what the word itself means.`),
  rv(5, 2, `a *reluctant* volunteer`, [`eager`, `unwilling`, `skilled`, `cheerful`], 1,
    `Reluctant means hesitant or unwilling. A reluctant volunteer steps forward only because no one else will, so "unwilling" fits. "Eager" is the exact opposite and is the trap for a student who guesses from the word "volunteer." Strategy: when a word modifies a noun in a surprising way, the word is probably contrasting with the noun.`),
  rv(6, 2, `to *conceal* the evidence`, [`hide`, `destroy`, `find`, `copy`], 0,
    `Conceal means to hide something from view or knowledge. "Destroy" is tempting because both remove evidence from sight, but concealed evidence still exists; it is only hidden. Strategy: choose the answer that matches the word exactly, not one that merely has a similar effect.`),
  rv(7, 2, `a *vacant* lot`, [`crowded`, `muddy`, `empty`, `fenced`], 2,
    `Vacant means empty or unoccupied, as in a "vacancy" sign at a hotel. "Crowded" is the direct opposite. Strategy: connect the word to a familiar form you already know (vacancy, vacation, both involving emptiness or absence).`),
  rv(8, 2, `an *urgent* message`, [`secret`, `lengthy`, `friendly`, `requiring immediate attention`], 3,
    `Urgent means needing immediate action or attention. "Secret" is the trap because urgent messages in stories are often secret, but secrecy is not part of the meaning. Strategy: think of an "urgent care" clinic, which treats problems that cannot wait.`),
  rv(9, 2, `a *brief* visit`, [`pleasant`, `short`, `surprising`, `formal`], 1,
    `Brief means short in time or length. "Pleasant" is tempting because brief visits are often enjoyable, but the word says nothing about mood. Strategy: a "briefing" is a short summary; let the related word remind you of the core idea of shortness.`),
  rv(10, 2, `to *imitate* a bird call`, [`copy`, `hear`, `record`, `enjoy`], 0,
    `Imitate means to copy or mimic. "Record" is the trap: recording captures a sound with a device, while imitating reproduces it yourself. Strategy: an "imitation" product is a copy of the real thing; apply that to the verb.`),
  rv(11, 3, `a *diligent* student`, [`lazy`, `hardworking`, `popular`, `nervous`], 1,
    `Diligent means careful and persistent in work. "Nervous" is tempting because diligent students may worry about grades, but the word describes effort, not feelings. "Lazy" is the antonym. Strategy: eliminate the opposite first, then choose between the remaining options by definition.`),
  rv(12, 3, `a *candid* remark`, [`cruel`, `clever`, `honest`, `quiet`], 2,
    `Candid means frank and honest, saying what you truly think. "Cruel" is the trap: candid remarks can sting, but honesty is the meaning, not harshness. Strategy: a "candid photo" is one taken without posing; candor is the unposed truth.`),
  rv(13, 3, `to *prolong* the meeting`, [`cancel`, `schedule`, `shorten`, `extend`], 3,
    `Prolong means to make something last longer, so "extend" is correct. "Shorten" is the antonym trap. Strategy: break the word apart: pro- (forward) + long; to make longer.`),
  rv(14, 3, `an *obstinate* child`, [`stubborn`, `shy`, `cheerful`, `curious`], 0,
    `Obstinate means stubbornly refusing to change one's mind. "Curious" is tempting because children are often curious, but that has nothing to do with the word. Strategy: think of an obstacle, something that will not move; an obstinate person will not move either.`),
  rv(15, 3, `a *lucrative* business`, [`failing`, `profitable`, `new`, `illegal`], 1,
    `Lucrative means producing a lot of money. "Illegal" is a trap for students who confuse lucrative with "ludicrous" or assume big profits are shady; the word itself is neutral about honesty. Strategy: the root lucr- means gain or profit.`),
  rv(16, 3, `to *deter* criminals`, [`arrest`, `punish`, `discourage`, `hire`], 2,
    `Deter means to discourage someone from acting, usually through fear of consequences. "Punish" is tempting because punishment can deter, but deterring happens before the crime, not after. Strategy: a "deterrent" is something that keeps an action from happening in the first place.`),
  rv(17, 3, `a *hostile* crowd`, [`unfriendly`, `cheering`, `small`, `patient`], 0,
    `Hostile means showing unfriendliness or opposition. "Cheering" is the opposite. Strategy: "hostilities" is another word for fighting between enemies; a hostile crowd is on the edge of that.`),
  rv(18, 3, `an *ambiguous* answer`, [`correct`, `lengthy`, `unclear`, `rude`], 2,
    `Ambiguous means open to more than one interpretation, so "unclear" is correct. "Lengthy" is tempting because long answers can be confusing, but a one-word answer can also be ambiguous. Strategy: the prefix ambi- means both (as in ambidextrous); an ambiguous answer could go both ways.`),
  rv(19, 3, `to *verify* the facts`, [`deny`, `collect`, `forget`, `confirm`], 3,
    `Verify means to check that something is true, so "confirm" is correct. "Collect" is the trap: gathering facts is a different step from checking them. Strategy: the root ver- means truth (as in "very" and "veritable").`),
  rv(20, 3, `a *frugal* shopper`, [`wasteful`, `thrifty`, `impatient`, `wealthy`], 1,
    `Frugal means careful with money and avoiding waste. "Wasteful" is the antonym trap. "Wealthy" is wrong because frugality describes behavior, not bank balance; rich people can be frugal too. Strategy: eliminate the opposite, then the unrelated choices.`),
  rv(21, 3, `a *tranquil* lake`, [`deep`, `polluted`, `calm`, `frozen`], 2,
    `Tranquil means calm and peaceful. "Frozen" is tempting because a frozen lake is still, but tranquil describes peacefulness, not temperature. Strategy: a "tranquilizer" is a drug that calms; apply the same idea to the lake.`),
  rv(22, 3, `to *exclude* a member`, [`welcome`, `elect`, `praise`, `shut out`], 3,
    `Exclude means to keep someone out or leave someone out. "Welcome" is the opposite and is a trap for anyone who confuses exclude with include. Strategy: ex- means out (exit), while in- means in (include); the prefix carries the meaning.`),
  rv(23, 3, `a *vivid* description`, [`vague`, `lengthy`, `false`, `lifelike`], 3,
    `Vivid means producing clear, strong images in the mind. "Vague" is the direct opposite. "Lengthy" is a trap because detailed descriptions can be long, but a vivid description can be a single sharp sentence. Strategy: the root viv- means life (survive, revive); a vivid description comes to life.`),
  rv(24, 3, `an *arrogant* leader`, [`conceited`, `humble`, `wise`, `elected`], 0,
    `Arrogant means having an exaggerated sense of one's own importance, so "conceited" is correct. "Humble" is the opposite. "Wise" is a trap because the student may assume leaders are wise, but the word is negative. Strategy: decide first whether the word has a positive or negative charge; arrogant is clearly negative.`),
  rv(25, 3, `to *mend* the fence`, [`paint`, `repair`, `remove`, `climb`], 1,
    `Mend means to repair something that is broken or torn. "Paint" is the trap because painting a fence is also maintenance, but mending specifically fixes damage. Strategy: think of "mending" a torn shirt; the word applies to fences in the same way.`),
  rv(26, 3, `a *plausible* excuse`, [`believable`, `ridiculous`, `lengthy`, `rehearsed`], 0,
    `Plausible means seeming reasonable or believable. "Rehearsed" is the trap because a practiced excuse might be plausible, but the word describes how convincing it sounds, not how it was prepared. "Ridiculous" is the antonym. Strategy: a plausible excuse is one that could "pass"; the sound of the word is a reminder.`),
  rv(27, 4, `a *meticulous* worker`, [`careless`, `exhausted`, `extremely careful`, `well paid`], 2,
    `Meticulous means paying extremely close attention to detail. "Careless" is the direct opposite. "Exhausted" is a trap for students who associate detail work with fatigue, but the word describes precision, not energy. Strategy: eliminate the antonym first; then pick the definition, not an effect.`),
  rv(28, 4, `an *affluent* neighborhood`, [`crowded`, `dangerous`, `historic`, `wealthy`], 3,
    `Affluent means having a great deal of money, so "wealthy" is correct. "Historic" is a trap because affluent neighborhoods are sometimes old, but age is not part of the meaning. Strategy: the root flu- means flow (fluid); money flows abundantly in an affluent area.`),
  rv(29, 4, `to *disparage* an opponent`, [`belittle`, `defeat`, `avoid`, `respect`], 0,
    `Disparage means to speak of someone in a belittling or critical way. "Defeat" is tempting because you might disparage an opponent during a contest, but the word is about words, not winning. "Respect" is the antonym. Strategy: dis- is a negative prefix; disparaging remarks put someone down.`),
  rv(30, 4, `a *benevolent* ruler`, [`harsh`, `kindly`, `ancient`, `powerful`], 1,
    `Benevolent means well-meaning and kind. "Powerful" is a trap because the noun "ruler" suggests power, but the adjective is about character. "Harsh" is the antonym. Strategy: bene- means good (benefit) and vol- means wish (volunteer); a benevolent person wishes others well.`),
  rv(31, 4, `an *ominous* silence`, [`peaceful`, `brief`, `threatening`, `awkward`], 2,
    `Ominous means suggesting that something bad is about to happen. "Peaceful" is the opposite feeling a silence can have, making it the trap for students who think silence is calm. Strategy: the word comes from "omen," a sign of the future; an ominous silence is a bad sign.`),
  rv(32, 4, `to *corroborate* a story`, [`invent`, `doubt`, `shorten`, `support`], 3,
    `Corroborate means to confirm or give support to a statement with additional evidence. "Doubt" is the opposite. "Invent" is a trap based on the idea of "making up a story," but corroborating is about backing up, not creating. Strategy: a corroborating witness agrees with the first witness.`),
  rv(33, 4, `a *pragmatic* decision`, [`hasty`, `emotional`, `practical`, `unpopular`], 2,
    `Pragmatic means dealing with things sensibly and realistically, so "practical" is correct. "Emotional" is the opposite approach. "Hasty" is a trap because quick decisions can seem businesslike, but pragmatism is about what works, not speed. Strategy: pragmatic and practical share the same root idea; use the sound to remember.`),
  rv(34, 4, `an *eloquent* speech`, [`boring`, `brief`, `angry`, `expressive`], 3,
    `Eloquent means fluent and persuasive in speaking or writing. "Angry" is a trap because passionate speeches can be angry, but eloquence is about skill with words. "Boring" is the opposite. Strategy: the root loqu- means speak (loquacious); eloquent is speaking well.`),
  rv(35, 4, `to *rescind* an order`, [`issue`, `cancel`, `obey`, `repeat`], 1,
    `Rescind means to officially cancel or take back. "Issue" is the opposite action and is the trap for students who guess that "order" goes with "issue." Strategy: the prefix re- (back) plus a root meaning cut; to rescind is to cut back an order.`),
  rv(36, 4, `a *superficial* wound`, [`deep`, `infected`, `on the surface`, `healed`], 2,
    `Superficial means existing only on the surface, not deep. "Deep" is the direct opposite. "Infected" is a trap because wounds can be infected, but the word says nothing about infection. Strategy: super- means above, and "superficial" contains "surface" in its meaning; a superficial person stays on the surface too.`),
  rv(37, 4, `an *indifferent* audience`, [`uninterested`, `enthusiastic`, `hostile`, `small`], 0,
    `Indifferent means having no particular interest or concern. "Hostile" is the trap: an indifferent audience does not care, while a hostile one actively dislikes you. "Enthusiastic" is the opposite. Strategy: an indifferent person sees no "difference" between options; nothing moves them.`),
  rv(38, 4, `to *alleviate* the pain`, [`cause`, `ease`, `ignore`, `describe`], 1,
    `Alleviate means to make something less severe, so "ease" is correct. "Cause" is the opposite. "Ignore" is a trap because ignoring pain and easing it both change your attention, but only alleviating reduces the pain itself. Strategy: the root lev- means light (as in elevator, levity); to alleviate is to lighten.`),
  rv(39, 4, `a *tenacious* competitor`, [`persistent`, `weak`, `friendly`, `famous`], 0,
    `Tenacious means holding on firmly and not giving up. "Famous" is a trap because tenacious athletes often become famous, but the word describes determination. "Weak" is close to an antonym. Strategy: the root ten- means hold (tenant, retain); a tenacious competitor holds on.`),
  rv(40, 4, `a *cursory* glance`, [`angry`, `careful`, `loving`, `hurried`], 3,
    `Cursory means hasty and not thorough. "Careful" is the direct opposite and is the trap for students who confuse cursory with "curious" or "careful." Strategy: the root curs- means run (cursor, excursion); a cursory glance runs over the page.`)
);

module.exports = { passages, questions };
