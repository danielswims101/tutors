// SSAT Elementary Level (grades 3-4) reading bank and picture-style writing prompts.
// Exports { passages, questions, writingPrompts } per content/SCHEMA.md
// The real Elementary reading section uses short passages (about 100-300 words) with 4 questions each.
// All passages and poems here are original. wordCount values are computed from the text.
'use strict';

const passages = [];
const questions = [];

// ---------------------------------------------------------------------------
// LEVEL 1 PASSAGES (grade 3)
// ---------------------------------------------------------------------------

passages.push({
  id: 'rce-lost-mitten',
  test: 'ssat',
  level: 1,
  title: 'The Lost Mitten',
  genre: 'fiction',
  wordCount: 227,
  text: `Maya had two red mittens when she left the house. She had one red mitten when she got to the park.

"Oh no," she said. She looked in her pockets. She looked in her coat sleeves. She looked at the snowy ground all around her. The mitten was gone.

Her grandmother had knitted those mittens. Each one had a tiny white snowflake on the back. Maya felt a lump in her throat. How could she tell Grandma that she had lost one after only two days?

"Let's walk back the way we came," said her big brother, Leo. "Mittens don't just fly away."

They walked slowly along the path. Maya kept her eyes on the snow. She saw boot prints, a candy wrapper, and a squirrel's little tracks, but no red mitten.

Then a dog came trotting up the path. It was a brown dog with a wagging tail, and it held something in its mouth. Something red. Something with a tiny white snowflake on it.

"That's mine!" Maya laughed. The dog dropped the wet mitten at her feet and looked proud of itself.

Maya squeezed the water out of the mitten and tucked it in her pocket, deep down where it could not slip out again. "Good dog," she said, and she scratched it behind the ears. "You found it before I had to tell Grandma."`
});

questions.push(
  {
    id: 'rce-lost-mitten-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-lost-mitten',
    stem: `What is this story mostly about?`,
    choices: [`A girl loses a special mitten and gets it back in a surprising way.`, `A dog learns a new trick at the park.`, `A grandmother knits mittens for her grandchildren.`, `A brother and sister build a snowman.`, `A girl learns how to follow animal tracks.`],
    answer: 0,
    explanation: `The story begins with Maya losing a mitten, follows her search along the path, and ends when a dog brings it back. Choice A covers the whole story from start to finish. Choice C is tempting because Grandma knitted the mittens, but that is one detail that explains why the mitten matters, not what the story is about.`
  },
  {
    id: 'rce-lost-mitten-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 1, passageId: 'rce-lost-mitten',
    stem: `How could Maya tell that the mitten in the dog's mouth was hers?`,
    choices: [`It was still warm.`, `It had a tiny white snowflake on it.`, `It had her name written inside.`, `It was the same size as her other mitten.`, `Leo recognized it first.`],
    answer: 1,
    explanation: `Paragraph 3 says each mitten "had a tiny white snowflake on the back," and when the dog appears, it carries "something red. Something with a tiny white snowflake on it." That snowflake is how Maya knows the mitten is hers. Choice D sounds sensible, but the story never mentions size.`
  },
  {
    id: 'rce-lost-mitten-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-lost-mitten',
    stem: `Why does Maya feel "a lump in her throat"?`,
    choices: [`She is cold from the snow.`, `She is angry at Leo.`, `She is upset and afraid of disappointing her grandmother.`, `She is hungry after her walk.`, `She is afraid of the dog.`],
    answer: 2,
    explanation: `Right after the lump in her throat, Maya thinks, "How could she tell Grandma that she had lost one after only two days?" That worry shows she feels sad and nervous about letting her grandmother down. Choice A is tempting because it is snowy, but a lump in the throat is about feelings, not temperature.`
  },
  {
    id: 'rce-lost-mitten-q4', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rce-lost-mitten',
    stem: `In the story, the word "trotting" most nearly means`,
    choices: [`barking loudly`, `sleeping`, `hiding`, `moving at a quick, bouncy pace`, `digging in the snow`],
    answer: 3,
    explanation: `The dog "came trotting up the path" with a wagging tail and something in its mouth, so it is moving toward Maya. Trotting means moving quickly with light steps, like a jog. Choice A is tempting because dogs bark, but the sentence is about how the dog moves, not the sound it makes.`
  }
);

passages.push({
  id: 'rce-theo-volcano',
  test: 'ssat',
  level: 1,
  title: 'The Volcano That Would Not Erupt',
  genre: 'fiction',
  wordCount: 250,
  text: `Theo had worked on his volcano for a whole week. He had shaped the mountain out of clay. He had painted it brown and gray. He had even made tiny trees out of toothpicks and green paper.

Now it was Science Night. Families walked from table to table in the gym. Theo stood behind his volcano with a cup of vinegar in his hand. His stomach felt like it was full of bees.

"Ready?" asked Ms. Flores. A small crowd gathered. Theo poured the vinegar into the top of the mountain and stepped back.

Nothing happened.

He waited. The crowd waited. A little kid in the front row yawned. Theo's face got hot. He wanted to crawl under the table and stay there until summer.

Then his friend Priya leaned over and whispered, "Did you put the baking soda in?"

Theo froze. The baking soda. It was still in its box, sitting in his backpack. He had been so worried about the trees that he forgot the most important part.

"Hold on," he said. He grabbed the box, scooped a spoonful into the top of the volcano, and poured the vinegar again.

This time, orange foam bubbled up and poured down the sides of the mountain. It rushed past the tiny trees. The crowd clapped. The little kid in front jumped up and down.

Theo let out a long breath. His volcano had worked after all. It had just needed one more thing, and a good friend to remember it.`
});

questions.push(
  {
    id: 'rce-theo-volcano-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-theo-volcano',
    stem: `Which sentence best tells what the story is about?`,
    choices: [`A teacher shows a class how to make a volcano erupt with vinegar and baking soda.`, `A boy builds tiny trees out of toothpicks.`, `A little kid gets bored at Science Night.`, `A girl makes a volcano and wins a prize.`, `A boy's project fails at first, but a friend's reminder helps him fix it.`],
    answer: 4,
    explanation: `The story follows Theo from his careful work, to the moment nothing happens, to Priya's whisper and the successful eruption. Choice E captures that whole arc. Choice B is a true detail from the first paragraph, but the trees are not what the story is mostly about.`
  },
  {
    id: 'rce-theo-volcano-q2', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-theo-volcano',
    stem: `Why did Theo forget the baking soda?`,
    choices: [`He spent so much time on small details that he overlooked the main step.`, `Priya told him he did not need it.`, `Ms. Flores forgot to put it on the supply list.`, `He did not know what baking soda was.`, `The box was too heavy to carry.`],
    answer: 0,
    explanation: `The story says, "He had been so worried about the trees that he forgot the most important part." That sentence tells us his attention was on the decorations, not the part that makes the volcano work. Choice B is wrong because Priya is the one who reminds him about the baking soda.`
  },
  {
    id: 'rce-theo-volcano-q3', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 1, passageId: 'rce-theo-volcano',
    stem: `The author says Theo's stomach "felt like it was full of bees" to show that Theo was`,
    choices: [`hungry`, `nervous`, `sick with the flu`, `excited to eat honey`, `angry at the crowd`],
    answer: 1,
    explanation: `Theo is about to show his project to a crowd, and the buzzing, fluttery feeling of bees in the stomach is a way of describing nerves. Choice A is tempting because the sentence mentions his stomach, but nothing in the story says Theo wants food. When an author compares a feeling to something strange, ask what emotion fits the moment.`
  },
  {
    id: 'rce-theo-volcano-q4', test: 'ssat', section: 'reading', skill: 'detail', level: 1, passageId: 'rce-theo-volcano',
    stem: `What color was the foam that came out of the volcano?`,
    choices: [`green`, `brown`, `orange`, `gray`, `red`],
    answer: 2,
    explanation: `Near the end of the story, "orange foam bubbled up and poured down the sides of the mountain." Choices B and D describe the paint on the volcano itself, not the foam, which is the trap. For a detail question, go back to the exact sentence.`
  }
);

passages.push({
  id: 'rce-sams-first-lunch',
  test: 'ssat',
  level: 1,
  title: "Sam's First Lunch",
  genre: 'fiction',
  wordCount: 205,
  text: `Sam carried his lunch tray into the cafeteria and stopped. Every table was full of kids who already knew each other. They were laughing and trading snacks and talking all at once. Sam did not know a single name.

It was his first day at Pine Hill School. His family had moved from across the state, and his old friends were now three hundred miles away.

He found an empty seat at the end of a long table and sat down. He unwrapped his sandwich. He took a bite. It tasted like cardboard, even though it was the same turkey sandwich he ate every day.

"Is anyone sitting here?"

Sam looked up. A girl with two long braids stood next to him, holding a tray with a slice of pizza on it.

"No," Sam said.

"Good." She sat down. "I'm Rosa. You're in Mr. Chan's class, right? I saw you this morning. You answered the question about the planets."

"Yeah," Sam said. "Saturn is my favorite."

"Mine too!" Rosa said. "Because of the rings. Do you want to see the space poster in the library after lunch? It's huge."

Sam took another bite of his sandwich. This time it tasted like turkey.

"Sure," he said.`
});

questions.push(
  {
    id: 'rce-sams-first-lunch-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-sams-first-lunch',
    stem: `What is the main idea of this story?`,
    choices: [`Pizza is a popular lunch at Pine Hill School.`, `Sam's family moved three hundred miles away.`, `Saturn is the most interesting planet.`, `A new student feels alone until a friendly classmate joins him.`, `Mr. Chan's class is learning about the planets.`],
    answer: 3,
    explanation: `The story moves from Sam sitting alone and knowing no one, to Rosa sitting down and inviting him to the library. Choice D sums up that change. Choice B is a true fact from paragraph 2, but it only explains why Sam is new; it is not what the whole story is about.`
  },
  {
    id: 'rce-sams-first-lunch-q2', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-sams-first-lunch',
    stem: `Why does Sam's sandwich taste "like cardboard" at first and "like turkey" at the end?`,
    choices: [`He put the wrong filling in it.`, `The sandwich warmed up while he talked.`, `Rosa gave him some of her pizza.`, `He was too full to enjoy it at first.`, `His feelings changed from lonely to happy, and that changed how he enjoyed his food.`],
    answer: 4,
    explanation: `The story says it was "the same turkey sandwich he ate every day," so the sandwich itself did not change. What changed was Sam: at first he was alone and worried, and after Rosa talked with him he felt better. The author uses the taste of the sandwich to show Sam's mood.`
  },
  {
    id: 'rce-sams-first-lunch-q3', test: 'ssat', section: 'reading', skill: 'structure', level: 1, passageId: 'rce-sams-first-lunch',
    stem: `How does the author organize this story?`,
    choices: [`Events are told in the order they happen, from Sam entering the cafeteria to Rosa's invitation.`, `The story begins at the end of lunch and then goes back in time.`, `The author compares Sam's old school with his new one.`, `The author lists reasons why making friends is hard.`, `The story is told from Rosa's point of view.`],
    answer: 0,
    explanation: `The story starts with Sam walking into the cafeteria, follows him sitting down, then Rosa arriving, and ends with his second bite. That is time order. Choice C is tempting because the old school is mentioned, but it is only one sentence, not the way the whole story is built.`
  },
  {
    id: 'rce-sams-first-lunch-q4', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rce-sams-first-lunch',
    stem: `In the first paragraph, the word "trading" most nearly means`,
    choices: [`buying`, `swapping`, `hiding`, `eating`, `throwing`],
    answer: 1,
    explanation: `The kids are "trading snacks," which means giving one snack and getting another in return. Swapping is the closest meaning. Choice A is tempting because trading can involve money in other situations, but no one is paying for snacks in this cafeteria scene.`
  }
);

passages.push({
  id: 'rce-after-the-rain',
  test: 'ssat',
  level: 1,
  title: 'After the Rain',
  genre: 'poetry',
  wordCount: 103,
  text: `The rain has stopped. The clouds roll by.
A puddle sits beneath the sky.
It holds a piece of blue up high,
A bit of cloud, a bird, a tree,
And, when I lean in close, there's me.

My boots are red. My boots are tall.
Mom says to walk around it all.
But puddles are not made for that.
I count to three. I hold my hat.
I jump! The sky breaks into bits.
The bird, the tree, the cloud, it splits.
Then slowly, slowly, back it fits.
The puddle's whole. The sky is blue.
And now my socks are puddles too.`
});

questions.push(
  {
    id: 'rce-after-the-rain-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-after-the-rain',
    stem: `What is this poem mostly about?`,
    choices: [`A mother who buys her child new boots.`, `Why rain clouds move across the sky.`, `A child who enjoys jumping into a puddle that reflects the sky.`, `A bird that lands in a puddle.`, `How to stay dry on a rainy day.`],
    answer: 2,
    explanation: `The poem describes a puddle that shows the sky, the speaker's decision to jump in, and the fun of watching the reflection break and come back together. Choice C covers all of that. Choice E is the opposite of what happens, since the speaker ends up with wet socks.`
  },
  {
    id: 'rce-after-the-rain-q2', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-after-the-rain',
    stem: `What can the reader tell about the speaker from the lines "Mom says to walk around it all. / But puddles are not made for that."?`,
    choices: [`The speaker does not like the rain.`, `The speaker always does what Mom says.`, `The speaker is afraid of getting wet.`, `The speaker knows Mom wants the puddle left alone but jumps in anyway.`, `The speaker has lost the red boots.`],
    answer: 3,
    explanation: `Mom says to walk around the puddle, but the next lines say "puddles are not made for that," and the speaker jumps. That shows the speaker chooses fun over Mom's advice. Choice B is the opposite of what the poem shows.`
  },
  {
    id: 'rce-after-the-rain-q3', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 1, passageId: 'rce-after-the-rain',
    stem: `The feeling, or mood, of this poem is best described as`,
    choices: [`scared`, `angry`, `sleepy`, `sad`, `playful`],
    answer: 4,
    explanation: `The speaker counts to three, holds a hat, shouts "I jump!" and ends with the joke that the socks are "puddles too." These are the actions and words of someone having fun. Choice D is tempting because the sky "breaks," but it comes back together, and the speaker is not upset about it.`
  },
  {
    id: 'rce-after-the-rain-q4', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rce-after-the-rain',
    stem: `In the line "The bird, the tree, the cloud, it splits," the word "splits" means that the reflection`,
    choices: [`breaks apart into pieces`, `turns a different color`, `flies away`, `gets bigger`, `dries up`],
    answer: 0,
    explanation: `The line before says "The sky breaks into bits," and "splits" repeats that idea: the picture in the water breaks into pieces when the speaker jumps. Choice C is tempting because a bird is mentioned, but it is the reflection of the bird, not a real bird, that splits.`
  }
);

passages.push({
  id: 'rce-morning-at-the-pond',
  test: 'ssat',
  level: 1,
  title: 'Morning at the Pond',
  genre: 'poetry',
  wordCount: 94,
  text: `Before the sun is all the way up,
I creep down to the pond.
The grass is wet. My sneakers squeak.
The mist hangs just beyond.

A frog sits still upon a log.
I sit still on a stone.
We watch each other, frog and me,
Two statues, all alone.

A dragonfly zips past my nose.
A fish makes one small ring.
The frog blinks once. I blink right back.
Then neither of us moves a thing.

The sun climbs up. The mist goes thin.
The frog hops off. I head back in.`
});

questions.push(
  {
    id: 'rce-morning-at-the-pond-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-morning-at-the-pond',
    stem: `What is this poem mostly about?`,
    choices: [`How to catch a frog at a pond.`, `A quiet early-morning visit to a pond, shared with a frog.`, `Why mist forms over water.`, `A child who is afraid of dragonflies.`, `A fish that jumps out of the water.`],
    answer: 1,
    explanation: `Every stanza describes the speaker sitting quietly by the pond, watching the frog, and noticing small things until the sun rises. Choice B captures the whole poem. Choice A is wrong because the speaker never tries to catch the frog; they just watch each other.`
  },
  {
    id: 'rce-morning-at-the-pond-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 1, passageId: 'rce-morning-at-the-pond',
    stem: `Where does the frog sit?`,
    choices: [`on a stone`, `in the grass`, `on a log`, `on a lily pad`, `under the mist`],
    answer: 2,
    explanation: `The poem says, "A frog sits still upon a log." Choice A is the trap: the stone is where the speaker sits, not the frog. For detail questions, go back to the exact line.`
  },
  {
    id: 'rce-morning-at-the-pond-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-morning-at-the-pond',
    stem: `Why does the speaker most likely "creep" down to the pond?`,
    choices: [`The speaker is sneaking out without permission.`, `The speaker's sneakers are too tight.`, `The speaker is tired from waking up early.`, `The speaker does not want to scare the animals away.`, `The speaker is playing hide and seek.`],
    answer: 3,
    explanation: `The speaker creeps, sits "still," and stays "two statues" with the frog, which all show the speaker is trying to be quiet so the frog and other creatures stay. Choice A is tempting because creeping can mean sneaking, but nothing in the poem suggests the speaker is breaking a rule.`
  },
  {
    id: 'rce-morning-at-the-pond-q4', test: 'ssat', section: 'reading', skill: 'structure', level: 1, passageId: 'rce-morning-at-the-pond',
    stem: `How is the poem organized?`,
    choices: [`It gives a list of animals from biggest to smallest.`, `It asks a question and then answers it.`, `It tells the same event from the frog's point of view and then the speaker's.`, `It compares a pond in the morning to a pond at night.`, `It follows the speaker's visit in order, from arriving before sunrise to leaving after the sun comes up.`],
    answer: 4,
    explanation: `The first stanza begins "Before the sun is all the way up," and the last stanza begins "The sun climbs up," with the speaker heading home. The poem moves through the visit in time order. Choice A is wrong because the animals appear as the speaker notices them, not by size.`
  }
);

passages.push({
  id: 'rce-hummingbird',
  test: 'ssat',
  level: 1,
  title: 'The Tiny, Busy Hummingbird',
  genre: 'science',
  wordCount: 228,
  text: `A hummingbird is one of the smallest birds in the world. Some are so small that they weigh less than a penny. But do not let their size fool you. Hummingbirds are some of the hardest-working animals alive.

A hummingbird's wings beat very fast, sometimes more than fifty times in one second. That is faster than your eye can follow. The fast wings make a soft humming sound, which is how the bird got its name. Those speedy wings also let a hummingbird do something most birds cannot do. It can hover, which means it can stay in one spot in the air, like a tiny helicopter. It can even fly backward.

All of that flying takes a lot of energy. A hummingbird gets its energy from nectar, the sweet liquid inside flowers. It pokes its long, thin beak into a flower and laps up the nectar with its tongue. A hummingbird may visit hundreds of flowers in a single day. It also eats tiny insects for protein.

Because hummingbirds burn energy so quickly, they must eat often. If a hummingbird stops eating for too long, it runs out of fuel. At night, when it cannot find flowers, a hummingbird slows its heartbeat and breathing and goes into a deep sleep called torpor. This helps it save energy until morning, when it is time to get busy again.`
});

questions.push(
  {
    id: 'rce-hummingbird-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-hummingbird',
    stem: `What is the main idea of this passage?`,
    choices: [`Hummingbirds are tiny birds that fly in special ways and need lots of energy to do it.`, `Hummingbirds got their name from the sound of their wings.`, `Flowers make nectar so that birds will visit them.`, `Most birds cannot fly backward.`, `Hummingbirds sleep deeply at night.`],
    answer: 0,
    explanation: `The passage describes the hummingbird's size, its fast wings and special flying, the food that fuels all that flying, and how it saves energy at night. Choice A ties all of those paragraphs together. Choices B and E are each true, but each comes from only one paragraph.`
  },
  {
    id: 'rce-hummingbird-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 1, passageId: 'rce-hummingbird',
    stem: `According to the passage, why does a hummingbird eat insects?`,
    choices: [`to clean its beak`, `to get protein`, `to feed its babies`, `because flowers close at night`, `because insects are easy to catch while hovering`],
    answer: 1,
    explanation: `Paragraph 3 ends with, "It also eats tiny insects for protein." Choice E sounds reasonable and uses the word "hovering" from the passage, but the passage never gives that reason. Match the answer to the sentence in the text.`
  },
  {
    id: 'rce-hummingbird-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-hummingbird',
    stem: `Based on the passage, what would most likely happen if a hummingbird could not find any flowers for a whole day?`,
    choices: [`It would grow larger wings.`, `It would start flying backward.`, `It would run low on energy and be in danger.`, `It would hum more loudly.`, `It would learn to eat seeds instead.`],
    answer: 2,
    explanation: `Paragraph 4 says that if a hummingbird "stops eating for too long, it runs out of fuel," and that it burns energy very quickly. So a day without nectar would be serious. Choice E is tempting, but the passage only mentions nectar and insects as food, never seeds.`
  },
  {
    id: 'rce-hummingbird-q4', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 1, passageId: 'rce-hummingbird',
    stem: `In paragraph 2, the word "hover" means to`,
    choices: [`fly very high`, `land on a flower`, `flap slowly`, `stay in one place in the air`, `fall toward the ground`],
    answer: 3,
    explanation: `The passage gives the meaning right after the word: hover means "it can stay in one spot in the air, like a tiny helicopter." Choice B is tempting because hummingbirds visit flowers, but the point is that they do not land; they hover. When a passage defines a word for you, use that definition.`
  }
);

passages.push({
  id: 'rce-where-rain-comes-from',
  test: 'ssat',
  level: 1,
  title: 'Where Does Rain Come From?',
  genre: 'science',
  wordCount: 238,
  text: `Have you ever wondered where rain comes from? The water that falls on your umbrella has been on a long trip. In fact, it has probably fallen as rain many, many times before.

The trip starts with the sun. The sun warms the water in oceans, lakes, rivers, and even puddles. As the water warms, some of it turns into a gas called water vapor. The vapor is invisible, and it rises up into the air. This step is called evaporation.

High in the sky, the air is cold. The cold makes the water vapor change back into tiny drops of liquid water. The drops are so small and light that they float. Billions of them gather together, and that is what a cloud is. This step is called condensation.

Inside the cloud, the tiny drops bump into each other and join together. They grow bigger and bigger. At last the drops get too heavy to float. They fall to the ground as rain. If the air is very cold, they fall as snow instead. This step is called precipitation.

The rain runs into rivers and lakes and soaks into the ground. Then the sun warms it again, and the whole trip starts over. Scientists call this trip the water cycle. It has been going around and around for millions of years, which means the rain on your umbrella might once have been a drink for a dinosaur.`
});

questions.push(
  {
    id: 'rce-where-rain-comes-from-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-where-rain-comes-from',
    stem: `What is the passage mainly about?`,
    choices: [`Why umbrellas are useful on rainy days.`, `How snow is different from rain.`, `What dinosaurs used to drink.`, `Why the air is cold high in the sky.`, `How water moves in a cycle from the ground to the sky and back.`],
    answer: 4,
    explanation: `The passage walks through evaporation, condensation, and precipitation and then says "the whole trip starts over," naming it the water cycle. Choice E covers that whole process. Choice C is a fun detail in the last sentence, not the main idea.`
  },
  {
    id: 'rce-where-rain-comes-from-q2', test: 'ssat', section: 'reading', skill: 'structure', level: 1, passageId: 'rce-where-rain-comes-from',
    stem: `How is the passage organized?`,
    choices: [`It explains the steps of a process in the order they happen.`, `It compares rain to snow.`, `It lists problems that rain causes and ways to solve them.`, `It tells a story about one raindrop's day.`, `It gives an opinion and then reasons to support it.`],
    answer: 0,
    explanation: `The passage moves from the sun warming water (step 1) to clouds forming (step 2) to rain falling (step 3) and then back to the beginning. Each paragraph even names its step. Choice D is tempting because the passage calls it a "trip," but it is explaining a real process, not telling a story.`
  },
  {
    id: 'rce-where-rain-comes-from-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-where-rain-comes-from',
    stem: `Based on the passage, what would happen to a puddle on a hot, sunny day?`,
    choices: [`It would turn into a cloud right away.`, `Some of its water would evaporate into the air.`, `It would freeze.`, `It would get bigger.`, `It would soak up water vapor from the sky.`],
    answer: 1,
    explanation: `Paragraph 2 says the sun warms water in "oceans, lakes, rivers, and even puddles," and that warm water turns into vapor that rises. So the puddle would shrink as it evaporates. Choice A skips a step; the vapor must first rise and cool before a cloud forms.`
  },
  {
    id: 'rce-where-rain-comes-from-q4', test: 'ssat', section: 'reading', skill: 'detail', level: 1, passageId: 'rce-where-rain-comes-from',
    stem: `According to the passage, what makes water vapor turn back into tiny drops?`,
    choices: [`the heat of the sun`, `the wind`, `the cold air high in the sky`, `the weight of the cloud`, `bumping into other drops`],
    answer: 2,
    explanation: `Paragraph 3 says, "High in the sky, the air is cold. The cold makes the water vapor change back into tiny drops." Choice E describes what happens later, when drops join and grow heavy, not what turns vapor into drops. Choice A is the cause of evaporation, the opposite step.`
  }
);

passages.push({
  id: 'rce-bicycle-librarian',
  test: 'ssat',
  level: 1,
  title: 'Nell Parker, the Bicycle Librarian',
  genre: 'biography',
  wordCount: 247,
  text: `Nell Parker grew up in a small mountain town with no library. The nearest one was a two-hour ride away by wagon. Nell loved stories more than anything, but she owned only three books. She read each one so many times that the pages went soft.

When Nell was twelve, a traveling teacher gave her a book of folk tales. Nell decided then and there what she wanted to be. "Someday," she told her mother, "every kid in this valley will have more books than they can read."

Years later, Nell became the first librarian in her town. The library was just two shelves in the back of the post office. That did not stop her. Every Saturday, she filled two big baskets with books, strapped them to her bicycle, and pedaled up and down the dirt roads. She stopped at farms, at the schoolhouse, and at the mill. Children ran out to meet her. They called her the Book Lady.

Nell kept careful lists of who had borrowed which book. If a child wanted a book she did not have, she wrote to libraries in the city and asked for it. Sometimes it took a month to arrive. Nell delivered it anyway.

By the time Nell retired, the two shelves had grown into a real library building with a big window and a reading corner. Over the door, in gold letters, were the words she had said as a girl: More books than you can read.`
});

questions.push(
  {
    id: 'rce-bicycle-librarian-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 1, passageId: 'rce-bicycle-librarian',
    stem: `Which sentence best tells what this passage is about?`,
    choices: [`Nell Parker owned only three books as a child.`, `Riding a bicycle on dirt roads is hard work.`, `Post offices used to have libraries in the back.`, `A woman who loved books worked hard to bring them to every child in her town.`, `A traveling teacher gave Nell a book of folk tales.`],
    answer: 3,
    explanation: `The passage follows Nell from a girl with three books, to her promise, to her years of delivering books by bicycle, to the library that finally grew. Choice D sums up that whole life. Choices A and E are true details from the opening paragraphs, but they do not cover the passage as a whole.`
  },
  {
    id: 'rce-bicycle-librarian-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 1, passageId: 'rce-bicycle-librarian',
    stem: `What did Nell do when a child asked for a book she did not have?`,
    choices: [`She told the child to wait until the library building was finished.`, `She gave the child one of her own three books.`, `She rode to the city to buy it.`, `She asked the traveling teacher for it.`, `She wrote to libraries in the city to request it.`],
    answer: 4,
    explanation: `Paragraph 4 says, "If a child wanted a book she did not have, she wrote to libraries in the city and asked for it." Choice C is tempting because Nell rode a bicycle, but she wrote letters; she did not ride to the city. Check the exact sentence.`
  },
  {
    id: 'rce-bicycle-librarian-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 1, passageId: 'rce-bicycle-librarian',
    stem: `What can the reader tell about Nell from the fact that the pages of her three books "went soft"?`,
    choices: [`She read the same books over and over because they were all she had.`, `She did not take good care of her things.`, `The books were made of poor paper.`, `She left the books outside in the rain.`, `She did not enjoy reading very much.`],
    answer: 0,
    explanation: `The passage says Nell "read each one so many times that the pages went soft," right after saying she loved stories but owned only three books. Soft, worn pages come from being turned again and again. Choice B is the trap: the wear shows love for the books, not carelessness.`
  },
  {
    id: 'rce-bicycle-librarian-q4', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 1, passageId: 'rce-bicycle-librarian',
    stem: `Why does the author end the passage with the words over the library door?`,
    choices: [`To explain how to find the library.`, `To show that Nell kept the promise she made as a girl.`, `To describe what the building looked like.`, `To tell readers that the library was expensive to build.`, `To show that Nell liked gold letters.`],
    answer: 1,
    explanation: `In paragraph 2, young Nell says every kid "will have more books than they can read." The final sentence repeats those words over the door, showing that her childhood promise came true. Choice C is tempting because the sentence mentions the door and gold letters, but the author's point is the meaning of the words, not the decoration.`
  }
);

// ---------------------------------------------------------------------------
// LEVEL 2 PASSAGES (grade 4)
// ---------------------------------------------------------------------------

passages.push({
  id: 'rce-the-last-lap',
  test: 'ssat',
  level: 2,
  title: 'The Last Lap',
  genre: 'fiction',
  wordCount: 260,
  text: `Lena had trained for the Hillside Bike Race all summer. She knew every bump in the course. She knew exactly where to shift gears before the big hill. When the whistle blew, she shot off the starting line in second place.

By the last lap, she had pulled into first. Her legs burned, but she could see the finish banner flapping at the bottom of the hill. One more minute and the blue ribbon would be hers.

Then she heard it. A crash and a yelp from behind her.

Lena glanced back. A younger rider, a boy she did not know, lay tangled in his bike on the gravel. His front wheel was still spinning. No other riders were close. The race helpers were all waiting at the finish line, too far away to see.

Lena's hands tightened on the handlebars. The finish line was right there. If she stopped, she would lose. She had worked so hard.

She squeezed her brakes.

"Are you okay?" she asked, dropping her bike beside his. The boy's knee was scraped, and his eyes were wet, but he nodded. Lena helped him untangle his legs from the frame and waved both arms until a race helper finally looked up and started running toward them.

By the time Lena crossed the finish line, four riders had passed her. There was no blue ribbon. But as she rolled to a stop, the boy's mother ran over and hugged her so hard that Lena almost fell off her bike. And somehow that felt heavier than any ribbon.`
});

questions.push(
  {
    id: 'rce-the-last-lap-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rce-the-last-lap',
    stem: `Which sentence best states the main idea of the story?`,
    choices: [`Lena trained all summer for a bike race.`, `A younger rider crashed on the gravel during a race.`, `Lena gives up her chance to win in order to help a rider who has fallen.`, `Race helpers should stand closer to the course.`, `Lena wins the Hillside Bike Race and gets a blue ribbon.`],
    answer: 2,
    explanation: `The heart of the story is Lena's choice: she is about to win, hears the crash, and stops to help, even though it costs her the race. Choice C captures that. Choice E is wrong because four riders pass her and she does not get the ribbon, and choice B is only the event that sets up her decision.`
  },
  {
    id: 'rce-the-last-lap-q2', test: 'ssat', section: 'reading', skill: 'inference', level: 2, passageId: 'rce-the-last-lap',
    stem: `Why does the author write that the hug "felt heavier than any ribbon"?`,
    choices: [`The mother was very strong.`, `Lena was tired from the race.`, `The ribbon would have been small and light.`, `Lena feels that helping the boy mattered more than winning.`, `Lena wishes she had kept riding.`],
    answer: 3,
    explanation: `The story ends by comparing the hug to the ribbon Lena lost, and "heavier" here means more important or more meaningful. The sentence shows that Lena does not regret her choice. Choice E is the opposite of what the ending suggests, and choice A takes the word "heavier" too literally.`
  },
  {
    id: 'rce-the-last-lap-q3', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rce-the-last-lap',
    stem: `In the story, the word "tangled" most nearly means`,
    choices: [`riding fast`, `hidden`, `painted`, `sleeping`, `twisted up and stuck`],
    answer: 4,
    explanation: `The boy "lay tangled in his bike," and later Lena "helped him untangle his legs from the frame." That shows his legs were twisted up in the bike and he could not easily get free. Choice B is tempting because the boy is behind Lena, but tangled describes his body and bike, not whether she can see him.`
  },
  {
    id: 'rce-the-last-lap-q4', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 2, passageId: 'rce-the-last-lap',
    stem: `Why does the author put the sentence "She squeezed her brakes" in a paragraph all by itself?`,
    choices: [`To make the moment of Lena's decision stand out.`, `To explain how bicycle brakes work.`, `To show that Lena's bike was broken.`, `To describe the finish line.`, `To tell the reader that the race is over.`],
    answer: 0,
    explanation: `The paragraph before shows Lena's struggle: the finish line is right there, and stopping means losing. Putting "She squeezed her brakes" alone on its own line makes the reader pause and feel the weight of her choice. Choice B is wrong because the story is about Lena's feelings, not how brakes work.`
  }
);

passages.push({
  id: 'rce-box-in-the-attic',
  test: 'ssat',
  level: 2,
  title: 'The Box in the Attic',
  genre: 'fiction',
  wordCount: 235,
  text: `Jun did not want to spend Saturday helping Grandma clean out her attic. It was dusty and hot, and the boxes were heavy. But Grandma had promised dumplings for lunch, so he climbed the ladder and got to work.

Most of the boxes held old dishes and winter coats. Then Jun pulled the lid off a flat wooden box in the corner. Inside was a stack of drawings on yellowed paper. There were birds, dozens of them. A sparrow on a wire. A heron standing in water. An owl with every feather carefully shaded.

In the bottom corner of each drawing were two small letters: M.L.

"Grandma?" Jun called down the ladder. "Who is M.L.?"

There was a long pause. Then Grandma climbed up, slower than Jun had, and knelt beside the box. She touched the heron drawing with one finger.

"That's me," she said. "Mei Lin. Before I married your grandfather."

Jun stared at her. "You drew these? They're amazing. Why did you stop?"

Grandma was quiet for a moment. "Life got busy," she said. "There was the shop, and your mother, and then your uncle. I always meant to go back to it."

Jun looked at the owl, at the hundreds of tiny lines that made up its feathers. Then he looked at his grandmother's hands, which were wrinkled now but very steady.

"Grandma," he said, "after lunch, can we buy some paper?"`
});

questions.push(
  {
    id: 'rce-box-in-the-attic-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rce-box-in-the-attic',
    stem: `What is this story mostly about?`,
    choices: [`A boy who would rather do anything than clean a dusty attic.`, `A boy who learns that his grandmother was once a gifted artist.`, `A grandmother who makes dumplings for lunch.`, `Different kinds of birds that live near Grandma's house.`, `How to shade feathers in a drawing.`],
    answer: 1,
    explanation: `The story builds from the dull attic chore to the surprise of the drawings, to Grandma's story, to Jun asking to buy paper so she can start again. Choice B covers that whole arc. Choice A describes only the first paragraph, and choice C is a small detail used to get Jun up the ladder.`
  },
  {
    id: 'rce-box-in-the-attic-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 2, passageId: 'rce-box-in-the-attic',
    stem: `What did the letters M.L. stand for?`,
    choices: [`the name of a shop`, `the name of Jun's mother`, `Grandma's name before she was married`, `the name of the artist who taught Grandma`, `the name of the paper company`],
    answer: 2,
    explanation: `When Jun asks who M.L. is, Grandma says, "That's me. Mei Lin. Before I married your grandfather." Choice B is tempting because Jun's mother is mentioned, but she is one of the reasons Grandma got busy, not the artist.`
  },
  {
    id: 'rce-box-in-the-attic-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 2, passageId: 'rce-box-in-the-attic',
    stem: `Why does Jun ask to buy paper at the end of the story?`,
    choices: [`He wants to wrap the drawings to keep them safe.`, `He wants to draw birds himself.`, `He needs paper for a school project.`, `He wants Grandma to start drawing again.`, `He plans to sell the drawings.`],
    answer: 3,
    explanation: `Right before asking, Jun looks at the detailed owl and then at Grandma's hands, which are "very steady," and he has just heard that she "always meant to go back" to drawing. The paper is for her. Choice B is tempting because Jun admires the drawings, but nothing suggests he wants to draw; the story points to Grandma's unfinished wish.`
  },
  {
    id: 'rce-box-in-the-attic-q4', test: 'ssat', section: 'reading', skill: 'structure', level: 2, passageId: 'rce-box-in-the-attic',
    stem: `Which of the following best describes how the story changes from beginning to end?`,
    choices: [`It starts with a problem and ends with the same problem.`, `It moves from the attic to the shop.`, `It starts in the present and ends in the past.`, `It begins with Grandma's point of view and ends with Jun's.`, `It begins with a boring chore and ends with a discovery that brings Jun and Grandma closer.`],
    answer: 4,
    explanation: `The story opens with Jun not wanting to help and ends with him caring enough about Grandma's dream to ask for paper. That shift from dull chore to meaningful discovery is the story's shape. Choice C is wrong because the story stays in the present; Grandma only talks about the past.`
  }
);

passages.push({
  id: 'rce-holding-on',
  test: 'ssat',
  level: 2,
  title: 'Holding On',
  genre: 'poetry',
  wordCount: 164,
  text: `My kite is a fish on the end of a line,
tugging and tugging to make the sky mine.
The string is a hum in my fist, pulling tight.
The wind wants my kite, and the wind wants to fight.

I lean back. I dig in my heels in the sand.
The spool spins and burns in the palm of my hand.
The red tail is snapping. The sky is so wide.
My kite is a speck now. I'm along for the ride.

Dad says, "Let out more." I say, "No, I can't."
The wind grabs it harder. I pant and I pant.
Then something lets go, and I'm not sure it's me,
and the kite climbs up higher than ever, and free,

a dot, then a nothing, way out past the shore.
My hand is all empty. My arms are all sore.
I thought I would cry. But I grin, and I know:
some things you hold tight. Some things you let go.`
});

questions.push(
  {
    id: 'rce-holding-on-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rce-holding-on',
    stem: `What is this poem mostly about?`,
    choices: [`A fish that gets away from a fisherman.`, `How to fly a kite on a windy beach.`, `A father who teaches his child to be careful.`, `A child who is sad about losing a toy.`, `A child who struggles to hold a kite, loses it, and finds that letting go is okay.`],
    answer: 4,
    explanation: `The poem moves from the fight to hold the kite, to the moment "something lets go," to the surprising grin at the end. Choice E covers that full journey. Choice A is the trap: the fish is a comparison in the first line, not the poem's subject, and choice D misses the ending, where the speaker grins instead of crying.`
  },
  {
    id: 'rce-holding-on-q2', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rce-holding-on',
    stem: `In the line "My kite is a speck now," the word "speck" means`,
    choices: [`a bright color`, `a loud noise`, `a strong wind`, `a very tiny spot`, `a piece of string`],
    answer: 3,
    explanation: `The kite has climbed so high that it looks like "a speck," and a few lines later it becomes "a dot, then a nothing." A speck is a very small spot, like a crumb. Choice E is tempting because string is in the poem, but the line describes the kite itself, far away in the sky.`
  },
  {
    id: 'rce-holding-on-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 2, passageId: 'rce-holding-on',
    stem: `Which line gives the best clue that the speaker is getting tired?`,
    choices: [`"My kite is a fish on the end of a line"`, `"The red tail is snapping. The sky is so wide."`, `"The wind grabs it harder. I pant and I pant."`, `"a dot, then a nothing, way out past the shore."`, `"Dad says, 'Let out more.'"`],
    answer: 2,
    explanation: `Panting means breathing hard, which happens when someone has been working hard and is wearing out. The next stanza also says "My arms are all sore." Choice E shows Dad's advice, not the speaker's tiredness. For this kind of question, look for words that describe the body.`
  },
  {
    id: 'rce-holding-on-q4', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 2, passageId: 'rce-holding-on',
    stem: `Why does the poet compare the kite to a fish in the first line?`,
    choices: [`To show that the kite is wet from the ocean.`, `To show how hard the kite pulls and tugs against the string.`, `To explain that the speaker is fishing, not flying a kite.`, `To show that the kite is shaped like a fish.`, `To tell the reader that the speaker likes fish.`],
    answer: 1,
    explanation: `The first two lines say the kite is "tugging and tugging" like a fish on a fishing line, and the rest of the poem is about the fight to hold on. The comparison helps the reader feel that pull. Choice D is tempting, but the poem never describes the kite's shape, only its red tail and the way it pulls.`
  }
);

passages.push({
  id: 'rce-how-a-zipper-works',
  test: 'ssat',
  level: 2,
  title: 'How a Zipper Works',
  genre: 'science',
  wordCount: 271,
  text: `You probably use a zipper every day without thinking about it. It is on your jacket, your backpack, maybe even your pencil case. A zipper looks simple, but it is a clever little machine.

Look closely at a zipper and you will see two rows of tiny teeth. Each tooth has a small bump on top and a small hollow underneath. The teeth on one side are set slightly off from the teeth on the other side, like your fingers when you lace your hands together. When the zipper is closed, each tooth's bump fits into the hollow of a tooth across from it, and the two rows lock tight.

The part you pull is called the slider. Inside the slider is a Y-shaped channel. When you pull the slider up, the two rows of teeth enter the top of the Y as separate lines, get pushed together inside, and come out the bottom as one locked row. When you pull the slider down, the same thing happens in reverse. A small wedge inside the slider pries the teeth apart, and they come out as two separate rows again.

The reason a closed zipper does not pop open on its own is that the teeth can only be joined or separated at an angle. Pulling straight across on a closed zipper does almost nothing. Only the slider, which moves along the zipper at just the right angle, can open or close it.

The next time you zip up your coat, remember: you are operating a machine with hundreds of tiny moving parts, and every one of them is doing its job.`
});

questions.push(
  {
    id: 'rce-how-a-zipper-works-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rce-how-a-zipper-works',
    stem: `What is the main idea of this passage?`,
    choices: [`A zipper is a simple-looking but clever machine that uses teeth and a slider to lock and unlock.`, `Zippers are found on jackets, backpacks, and pencil cases.`, `The slider is the most important part of a zipper.`, `Pulling straight across a zipper will not open it.`, `People should take better care of their zippers.`],
    answer: 0,
    explanation: `The passage explains the teeth, how the slider joins and separates them, and why they stay locked. It opens by calling the zipper a clever little machine and closes by calling it a machine with hundreds of tiny moving parts. Choice A ties all of that together. Choice D is a true detail from just one paragraph. Choice C is never stated: the passage says only the slider can open or close the zipper, but it never calls the slider the most important part.`
  },
  {
    id: 'rce-how-a-zipper-works-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 2, passageId: 'rce-how-a-zipper-works',
    stem: `According to the passage, what is inside the slider?`,
    choices: [`two rows of teeth`, `a small spring`, `a tiny magnet`, `a row of hooks`, `a Y-shaped channel and a small wedge`],
    answer: 4,
    explanation: `Paragraph 3 says, "Inside the slider is a Y-shaped channel," and later mentions "a small wedge inside the slider" that pries the teeth apart. Choice A is the trap: the teeth pass through the slider, but they are part of the zipper, not inside the slider itself.`
  },
  {
    id: 'rce-how-a-zipper-works-q3', test: 'ssat', section: 'reading', skill: 'structure', level: 2, passageId: 'rce-how-a-zipper-works',
    stem: `What is the purpose of paragraph 2?`,
    choices: [`to explain why zippers sometimes get stuck`, `to tell where zippers are found`, `to describe what the slider does`, `to describe the teeth and how they fit together`, `to compare zippers to buttons`],
    answer: 3,
    explanation: `Paragraph 2 starts with "Look closely at a zipper and you will see two rows of tiny teeth" and goes on to explain the bumps and hollows and how they lock. Choice C describes paragraph 3, not paragraph 2. To answer a question about one paragraph, reread that paragraph alone.`
  },
  {
    id: 'rce-how-a-zipper-works-q4', test: 'ssat', section: 'reading', skill: 'inference', level: 2, passageId: 'rce-how-a-zipper-works',
    stem: `Based on the passage, what would most likely happen if the slider broke off a zipper?`,
    choices: [`The teeth would fall out.`, `The zipper would open by itself.`, `The zipper could not be opened or closed in the normal way.`, `The teeth would melt together.`, `The jacket would become waterproof.`],
    answer: 2,
    explanation: `Paragraph 4 says, "Only the slider, which moves along the zipper at just the right angle, can open or close it." Without the slider, the teeth would stay however they were. Choice B is the opposite of what the passage says, since the teeth lock and do not pop open on their own.`
  }
);

passages.push({
  id: 'rce-great-wall',
  test: 'ssat',
  level: 2,
  title: 'The Great Wall of China',
  genre: 'history',
  wordCount: 265,
  text: `Imagine a wall so long that it would take months to walk from one end to the other. The Great Wall of China is that wall. It winds across mountains, deserts, and grasslands in northern China for thousands of miles. It is one of the largest things that people have ever built.

The wall was not built all at once. More than two thousand years ago, the rulers of China worried about enemies who rode in from the north on horseback. They ordered walls to be built to keep those riders out. Over the centuries, different emperors added new sections, repaired old ones, and connected them together. The parts that tourists visit today were mostly built about five hundred years ago.

Building the wall was hard, dangerous work. In some places, workers used stone and brick. In others, they packed earth tightly between wooden frames. Soldiers, farmers, and prisoners all helped build it. Many of them lived at the wall for years.

The wall was more than just a barrier. Tall watchtowers were built along it, and guards stood in them to look for danger. If guards spotted enemies, they lit fires or sent up smoke. Guards in the next tower would see the signal and pass it on. In this way, a warning could travel hundreds of miles in a single day, faster than any horse.

Today, no one uses the Great Wall to keep enemies out. Instead, millions of people from around the world visit it every year to walk on its stones and imagine the workers and guards who once stood there.`
});

questions.push(
  {
    id: 'rce-great-wall-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rce-great-wall',
    stem: `What is the passage mainly about?`,
    choices: [`How tourists can visit the Great Wall today.`, `What the Great Wall is, why it was built, and how it was used.`, `How guards sent smoke signals.`, `Why enemies rode on horseback.`, `The different materials used to build walls.`],
    answer: 1,
    explanation: `The passage describes the wall's size, the reason it was built, the people who built it, the watchtowers and signals, and its use today. Choice B covers that whole range. Choices C and E are each the topic of just one paragraph.`
  },
  {
    id: 'rce-great-wall-q2', test: 'ssat', section: 'reading', skill: 'detail', level: 2, passageId: 'rce-great-wall',
    stem: `According to the passage, why did the rulers of China first order walls to be built?`,
    choices: [`to keep out enemies who rode in from the north`, `to give soldiers a place to live`, `to attract visitors from around the world`, `to mark the edge of the desert`, `to send smoke signals across the country`],
    answer: 0,
    explanation: `Paragraph 2 says the rulers "worried about enemies who rode in from the north on horseback" and "ordered walls to be built to keep those riders out." Choice E describes how the wall was used later, not why it was first built. Choice C describes today, not two thousand years ago.`
  },
  {
    id: 'rce-great-wall-q3', test: 'ssat', section: 'reading', skill: 'inference', level: 2, passageId: 'rce-great-wall',
    stem: `Why was the signal system of fire and smoke so useful?`,
    choices: [`It kept the guards warm at night.`, `It was a way to cook food on the wall.`, `It helped tourists find their way.`, `It showed the workers where to build next.`, `It let a warning travel much faster than a messenger on horseback could.`],
    answer: 4,
    explanation: `Paragraph 4 says a warning "could travel hundreds of miles in a single day, faster than any horse." A fast warning gave people time to get ready for an attack. Choice A is tempting because fires give warmth, but the passage says the fires were signals, not for comfort.`
  },
  {
    id: 'rce-great-wall-q4', test: 'ssat', section: 'reading', skill: 'vocab-in-context', level: 2, passageId: 'rce-great-wall',
    stem: `In paragraph 4, the word "barrier" most nearly means`,
    choices: [`a tower`, `a road`, `a signal`, `something that blocks the way`, `a kind of brick`],
    answer: 3,
    explanation: `The sentence says the wall "was more than just a barrier," and the earlier paragraphs explain that the wall was built to keep riders out. A barrier is something that blocks or stops movement. Choice A is tempting because the same paragraph talks about towers, but the towers are described as something extra, beyond the barrier.`
  }
);

passages.push({
  id: 'rce-jane-goodall',
  test: 'ssat',
  level: 2,
  title: 'Jane Goodall and the Chimpanzees',
  genre: 'biography',
  wordCount: 258,
  text: `When Jane Goodall was a little girl in England, she once disappeared for hours. Her family searched everywhere. At last she came out of a henhouse, covered in straw. She had been sitting quietly inside, waiting to see exactly how a hen lays an egg. Jane was four years old, and she was already doing what scientists do: watching patiently and asking questions.

Jane loved animals all her life. She dreamed of going to Africa to live among wild animals and write about them. In 1960, when she was twenty-six, she got her chance. She traveled to a forest in Tanzania to study chimpanzees.

At first, the chimpanzees ran away whenever they saw her. Jane did not give up. Every day she climbed to the same hill and sat quietly with her binoculars. After many months, the chimpanzees began to accept her. She gave them names instead of numbers, which most scientists at the time thought was strange.

One day she watched a chimpanzee she called David Greybeard pick a twig, strip off its leaves, and poke it into a termite mound. When he pulled it out, it was covered with termites, and he ate them. He had made a tool. Until then, most scientists believed that only humans made and used tools. Jane's discovery changed what people thought about animals, and about ourselves.

Jane Goodall spent many years in that forest. Later, she traveled all over the world, telling people what she had learned and asking them to protect wild animals and the forests they live in.`
});

questions.push(
  {
    id: 'rce-jane-goodall-q1', test: 'ssat', section: 'reading', skill: 'main-idea', level: 2, passageId: 'rce-jane-goodall',
    stem: `What is the passage mainly about?`,
    choices: [`How chimpanzees use twigs to catch termites.`, `Why Jane Goodall hid in a henhouse as a child.`, `How Jane Goodall's patience and curiosity led to an important discovery about chimpanzees.`, `Why scientists give animals numbers instead of names.`, `How to study animals using binoculars.`],
    answer: 2,
    explanation: `The passage starts with young Jane patiently watching a hen, follows her patient months in the forest, and leads to the discovery that chimpanzees make tools. Choice C connects all of those parts. Choice A is a true detail from paragraph 4, but it is the result of her work, not the whole passage.`
  },
  {
    id: 'rce-jane-goodall-q2', test: 'ssat', section: 'reading', skill: 'inference', level: 2, passageId: 'rce-jane-goodall',
    stem: `Why does the author begin the passage with the story about the henhouse?`,
    choices: [`to show that Jane was often in trouble as a child`, `to show that Jane had the patience of a scientist even when she was very young`, `to explain how hens lay eggs`, `to show that Jane's family did not pay attention to her`, `to tell the reader that Jane grew up on a farm`],
    answer: 1,
    explanation: `The paragraph ends by saying Jane "was already doing what scientists do: watching patiently and asking questions." The story is there to show that the patience she later used with the chimpanzees began in childhood. Choice A misreads the story; Jane was not being naughty, she was curious.`
  },
  {
    id: 'rce-jane-goodall-q3', test: 'ssat', section: 'reading', skill: 'tone-purpose', level: 2, passageId: 'rce-jane-goodall',
    stem: `How does the author seem to feel about Jane Goodall?`,
    choices: [`admiring`, `annoyed`, `worried`, `bored`, `confused`],
    answer: 0,
    explanation: `The author praises Jane for not giving up, points out that her discovery "changed what people thought about animals, and about ourselves," and ends with her work protecting wild animals. These choices show respect and admiration. Choice C is tempting because the family worried when Jane disappeared, but that is the family's feeling, not the author's.`
  },
  {
    id: 'rce-jane-goodall-q4', test: 'ssat', section: 'reading', skill: 'detail', level: 2, passageId: 'rce-jane-goodall',
    stem: `According to the passage, what did most scientists believe before Jane's discovery?`,
    choices: [`Chimpanzees could not be studied in the wild.`, `Chimpanzees ate only fruit.`, `Chimpanzees should be given names.`, `Termites were dangerous to chimpanzees.`, `Only humans made and used tools.`],
    answer: 4,
    explanation: `Paragraph 4 says, "Until then, most scientists believed that only humans made and used tools." Choice C is the opposite of the passage, which says scientists thought naming the chimpanzees was strange. Find the exact sentence before choosing.`
  }
);

// ---------------------------------------------------------------------------
// PICTURE-STYLE WRITING PROMPTS (SSAT Elementary writing sample, 15 minutes)
// The real test shows a picture. These "scene cards" stand in for it: an emoji
// scene plus a one- or two-sentence description of what the picture shows.
// ---------------------------------------------------------------------------

const PIC_PROMPT = 'Look at the picture. Write a story about what is happening. Give your story a beginning, a middle, and an end.';

const PIC_RUBRIC = [
  'Tells one complete story about the picture with a clear beginning, middle, and end.',
  'Names the characters and shows what they want or what problem they face.',
  'Explains the surprising detail in the picture instead of ignoring it.',
  'Uses sense words and a little dialogue so the reader can see and hear the scene.',
  'Uses capital letters, end marks, and mostly correct spelling.',
];

const pic = (n, scene, description, tips) => ({
  id: `wp-ssat-elem-pic-${String(n).padStart(2, '0')}`,
  test: 'ssat',
  level: 1,
  type: 'picture',
  minutes: 15,
  scene,
  prompt: PIC_PROMPT,
  description,
  tips,
  rubric: PIC_RUBRIC,
});

const writingPrompts = [
  pic(1, '🪁🌊💨',
    'A girl stands on a windy beach holding an empty spool of string while her red kite sails away over the waves. Far out on the water, a small fishing boat seems to be turning toward the kite.',
    [
      'Decide first: does the girl get her kite back, or does something even better happen?',
      'Give the girl a name and tell why the kite matters to her.',
      'Use wind words: whoosh, flap, tug, roar.',
      'End with how the girl feels at the end, whether or not she gets her kite back.',
    ]),
  pic(2, '🤖🧁💰',
    'A shiny robot stands behind a bake-sale table piled with cupcakes, holding a sign that says 50 CENTS. A long line of kids is waiting, and one cupcake in the middle of the table is glowing.',
    [
      'Ask yourself: who built this robot, and why is it selling cupcakes?',
      'The glowing cupcake is your surprise. Decide what happens when someone bites it.',
      'Let the robot talk. What does a robot sound like when it says thank you?',
      'Make the ending solve the mystery of the glowing cupcake.',
    ]),
  pic(3, '🐕🔑🚪',
    'A muddy dog trots up the porch steps with an old brass key in its mouth. Behind it, the garden gate hangs open, and at the bottom of the big oak tree there is a tiny locked door.',
    [
      'Start with the moment someone notices the key in the dog\'s mouth.',
      'Decide what is behind the tiny door before you write the middle.',
      'Give the dog a name and a personality. Is it brave, silly, or sneaky?',
      'Finish by telling what the key opens and what the character does next.',
    ]),
  pic(4, '🧒🚪✨',
    'A boy in pajamas stands in a dark hallway in front of a closed door. Golden light is pouring out through the keyhole, and a soft humming sound seems to be coming from the other side.',
    [
      'Begin with what woke the boy up and what he hears.',
      'Describe the light and the sound with your senses before he opens the door.',
      'Decide if what he finds is funny, magical, or a big surprise, and stick with it.',
      'Make the ending show whether he tells anyone what he saw.',
    ]),
  pic(5, '❄️🏠🎁',
    'A family looks out their front window at a yard buried in snow. In the middle of the yard sits a large box wrapped in blue paper, with footprints leading up to it but none leading away.',
    [
      'The footprints with no way back are the mystery. Plan an answer before you write.',
      'Choose one family member to be your main character and tell the story through them.',
      'Use cold words: crunch, shiver, puff of breath, icy.',
      'End with what is inside the box and how the family feels about it.',
    ]),
  pic(6, '🐉📚💨',
    'A tiny green dragon, no bigger than a kitten, sits on a stack of books in a quiet library, reading. A librarian is peeking around the shelf with wide eyes, and one page of the book is smoking a little.',
    [
      'Decide who sees the dragon first: the librarian or a kid who is also in the library.',
      'What does the dragon want? A book, a friend, a place to hide?',
      'The smoking page is a problem. Show how your characters deal with it.',
      'End with where the dragon is at closing time.',
    ]),
  pic(7, '🐧🎒🚌',
    'A penguin wearing a backpack sits in the back seat of a yellow school bus. The other kids are turned around staring, and the penguin is holding a lunch bag with a fish tail sticking out of it.',
    [
      'Start with the bus driver or a kid noticing something unusual.',
      'Give the penguin a reason for riding the bus. Is it lost, or is it the new student?',
      'Add dialogue: what do the kids say, and what does the penguin do back?',
      'End with what happens when the bus reaches school.',
    ]),
  pic(8, '🏕️🦉🔦',
    'Two kids sit inside a tent at night with one flashlight between them. Outside, a huge owl is perched on the tent pole, and something small is scratching at the zipper.',
    [
      'Name both kids and make one brave and one nervous.',
      'Use night sounds: hoot, rustle, scratch, crackle.',
      'Decide what is scratching before you write, so the middle makes sense.',
      'End the story in the morning, when the kids can see what really happened.',
    ]),
  pic(9, '🌧️☂️🐸',
    'On a rainy sidewalk, a frog the size of a cat stands at a bus stop holding a tiny yellow umbrella. A girl with a much bigger umbrella looks down at it, and the frog is holding a bus ticket.',
    [
      'Start with the girl noticing the frog and what she thinks at first.',
      'Where is the frog going? Give it a goal and let the girl help or follow.',
      'Use rain words: drip, splash, patter, puddle.',
      'End with what happens when the bus pulls up.',
    ]),
  pic(10, '🚀🌕🍕',
    'A cardboard rocket sits in a backyard at night. A boy wearing a bike helmet is climbing in with a pizza box, and the moon looks very bright and very, very close.',
    [
      'Decide if the rocket really flies or if this is pretend. Either way can be a great story.',
      'Who is the pizza for? That answer can be your whole plot.',
      'Describe what the boy sees out the rocket window.',
      'End with the boy back on the ground, and tell what changed.',
    ]),
  pic(11, '🏊🐙🏆',
    'At a swim meet, the swimmers are lined up on the blocks, and in lane three there is an octopus wearing a swim cap and goggles. The starter is raising the whistle, and the crowd has gone silent.',
    [
      'Pick your main character: a swimmer in the next lane, the coach, or the octopus itself.',
      'Think about what eight arms can do in a race, and what rules might get broken.',
      'Use race words: splash, kick, lunge, touch the wall.',
      'End with the results of the race and how everyone feels about them.',
    ]),
  pic(12, '🌳🪜📝',
    'A treehouse sits high in an old oak tree, but the rope ladder has been pulled up. From the ground, a girl can see a hand she does not recognize waving a folded note out of the treehouse window.',
    [
      'Start with the girl arriving and realizing something is different.',
      'Decide who is in the treehouse and what the note says before writing the middle.',
      'Show how the girl gets up, or gets the stranger down, step by step.',
      'End with the two characters either becoming friends or solving a problem together.',
    ]),
];

module.exports = { passages, questions, writingPrompts };
