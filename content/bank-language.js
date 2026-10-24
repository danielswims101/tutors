// HSPT Language bank: punctuation, capitalization, usage, spelling, composition
// plus writing prompts for SSAT / ISEE / HSPT-style practice.
// Follows content/SCHEMA.md.

const PUN_STEM = "Choose the sentence that contains an error in punctuation, or select 'No mistakes'.";
const CAP_STEM = "Choose the sentence that contains an error in capitalization, or select 'No mistakes'.";
const USE_STEM = "Choose the sentence that contains an error in usage, or select 'No mistakes'.";
const SPL_STEM = "Choose the sentence that contains a spelling error, or select 'No mistakes'.";

const pad = (n) => String(n).padStart(3, '0');

// Builds a standard three-sentence + 'No mistakes' item.
function mk(prefix, label, skill, stemText, n, level, sentences, answer, explanation) {
  return {
    id: `hspt-${prefix}-${pad(n)}`,
    test: 'hspt',
    section: 'language',
    skill,
    level,
    stem: `${label} set ${n} — ${stemText}`,
    choices: [...sentences, 'No mistakes'],
    answer,
    explanation,
  };
}

const P = (n, level, s, a, e) => mk('pun', 'Punctuation', 'punctuation', PUN_STEM, n, level, s, a, e);
const C = (n, level, s, a, e) => mk('cap', 'Capitalization', 'capitalization', CAP_STEM, n, level, s, a, e);
const U = (n, level, s, a, e) => mk('use', 'Usage', 'usage', USE_STEM, n, level, s, a, e);
const S = (n, level, s, a, e) => mk('spl', 'Spelling', 'spelling', SPL_STEM, n, level, s, a, e);

// ---------------------------------------------------------------------------
// PUNCTUATION (50)
// ---------------------------------------------------------------------------
const punctuation = [
  P(1, 2, [
    `We packed sandwiches, apples, and juice for the picnic.`,
    `The dog wagged its tail when it saw me.`,
    `Did you remember to lock the door.`,
  ], 2, `End-mark rule: a direct question must end with a question mark, so "Did you remember to lock the door?" needs one. The series in the first sentence is punctuated correctly with commas. The trap is "its tail" in the second sentence; "its" is the possessive and takes no apostrophe, so that sentence is fine.`),

  P(2, 2, [
    `Running late for the bus Maria forgot her lunch on the counter.`,
    `The teacher said, "Please open your books to page ten."`,
    `I can't believe we won the championship!`,
  ], 0, `Introductory-phrase rule: a participial phrase that opens a sentence must be followed by a comma: "Running late for the bus, Maria forgot her lunch." Without the comma the reader briefly reads "the bus Maria" as one unit. The dialogue sentence correctly uses a comma after "said" and keeps the period inside the quotation marks, and the exclamation point is appropriate for strong feeling.`),

  P(3, 2, [
    `Its going to rain this afternoon, so bring an umbrella.`,
    `The cat licked its paws after dinner.`,
    `We visited Boston, Massachusetts, last summer.`,
  ], 0, `Its/it's rule: "it's" is always the contraction of "it is" or "it has," while "its" is possessive. The first sentence means "It is going to rain," so it needs the apostrophe. The second sentence is the possessive and is correct without one. The third sentence correctly places a comma both before and after the state name.`),

  P(4, 2, [
    `The students' lockers were cleaned over the weekend.`,
    `Jamals backpack was left on the bus.`,
    `Please pass the salt, pepper, and butter.`,
  ], 1, `Possessive rule: a singular noun shows ownership with an apostrophe plus s, so it must be "Jamal's backpack." The first sentence is a correct plural possessive (lockers belonging to many students), which is the trap for students who think every apostrophe after s is wrong. The series in the third sentence is punctuated correctly.`),

  P(5, 2, [
    `Although it was cold, we went swimming anyway.`,
    `The children's coats hung by the door.`,
    `Wow, that was a close game!`,
  ], 3, `All three sentences are correct. An introductory dependent clause ("Although it was cold") is followed by a comma; "children" is an irregular plural, so its possessive is "children's"; and an interjection like "Wow" is set off by a comma. The trap is "children's," which looks odd to students who expect the apostrophe after the s, but that form only applies to plurals that already end in s.`),

  P(6, 2, [
    `I wanted to go to the park but it started to rain.`,
    `She finished her homework and then watched a movie.`,
    `Is anyone sitting here?`,
  ], 0, `Compound-sentence rule: when a coordinating conjunction (and, but, or, so) joins two independent clauses, put a comma before it: "I wanted to go to the park, but it started to rain." The trap is the second sentence, which has one subject with two verbs (a compound predicate), so no comma is needed before "and." The question is correctly punctuated.`),

  P(7, 2, [
    `"Where are you going" asked Dad.`,
    `Mom asked, "Have you fed the dog?"`,
    `"I'll be home by six," I promised.`,
  ], 0, `Dialogue rule: a quoted question keeps its question mark inside the closing quotation marks even when a speaker tag follows: "Where are you going?" asked Dad. The first sentence has no end punctuation inside the quotation at all. The other two sentences correctly place the question mark and the comma inside the quotation marks.`),

  P(8, 2, [
    `For breakfast I ate eggs toast, and orange juice.`,
    `The movie, which lasted three hours, was worth every minute.`,
    `Can you help me carry these boxes?`,
  ], 0, `Series rule: separate every item in a list of three or more with commas: "eggs, toast, and orange juice." The first sentence is missing the comma between "eggs" and "toast." The second sentence correctly sets off a nonessential "which" clause with a pair of commas, and the third is a correctly punctuated question.`),

  P(9, 3, [
    `The rain stopped; the sun came out.`,
    `I studied all night; however, I still felt nervous.`,
    `Because the bus was late; we missed the first class.`,
  ], 2, `Semicolon rule: a semicolon joins two independent clauses, each of which could stand alone. "Because the bus was late" is a dependent clause, so it needs a comma, not a semicolon. The first two sentences use the semicolon correctly, including the pattern "independent clause; however, independent clause," which many students wrongly suspect.`),

  P(10, 3, [
    `You will need three things: a pencil, paper, and a calculator.`,
    `The ingredients are: flour, sugar, and eggs.`,
    `The meeting starts at 3:30 p.m.`,
  ], 1, `Colon rule: a colon introducing a list must follow a complete sentence. "The ingredients are" is not complete, because the verb "are" is waiting for its complement, so the colon wrongly splits the verb from the list. The first sentence is complete before the colon ("You will need three things"), and the colon in "3:30" is standard for time.`),

  P(11, 3, [
    `Mr. Lopez, our science teacher, won the award.`,
    `The poet Robert Frost wrote about rural New England.`,
    `Our neighbor's dog a huge golden retriever, loves to swim.`,
  ], 2, `Appositive rule: a nonessential appositive is set off by a pair of commas, one before and one after: "Our neighbor's dog, a huge golden retriever, loves to swim." The third sentence has only the closing comma. The trap is the second sentence, where "Robert Frost" is an essential appositive that identifies which poet, so it correctly takes no commas.`),

  P(12, 3, [
    `When the bell rang, the students rushed into the hallway.`,
    `"Don't forget your permission slip," Ms. Chen reminded us.`,
    `The twins' birthday party is on Saturday.`,
  ], 3, `All three sentences are correct. An introductory clause takes a comma; a quotation followed by a speaker tag ends with a comma inside the quotation marks; and the plural possessive of "twins" is "twins'." The trap is the contraction "Don't," which is correctly punctuated with the apostrophe where the letter o was removed.`),

  P(13, 3, [
    `She adopted a six-year-old beagle from the shelter.`,
    `The well known author signed copies of her book.`,
    `He is twenty-one years old today.`,
  ], 1, `Hyphen rule: hyphenate a compound adjective when it comes before the noun it modifies, so it should be "the well-known author." Compare "the author is well known," where no hyphen is needed after the noun. The first sentence correctly hyphenates "six-year-old" before "beagle," and compound numbers from twenty-one to ninety-nine always take a hyphen.`),

  P(14, 3, [
    `Theyre coming over after the game.`,
    `You're the first person to finish the puzzle.`,
    `We haven't seen the new exhibit yet.`,
  ], 0, `Contraction rule: an apostrophe marks the spot where letters are dropped, so "they are" becomes "they're." The first sentence omits the apostrophe entirely. "You're" (you are) and "haven't" (have not) are both correct. Trap: students sometimes flag "You're" because they confuse it with the possessive "your," but here "you are the first person" is the intended meaning.`),

  P(15, 3, [
    `I love this song, it reminds me of summer.`,
    `I love this song because it reminds me of summer.`,
    `I love this song; it reminds me of summer.`,
  ], 0, `Comma-splice rule: two independent clauses cannot be joined by a comma alone. "I love this song, it reminds me of summer" is a comma splice. Fix it with a semicolon (third sentence), a subordinating conjunction such as "because" (second sentence), or a comma plus a coordinating conjunction. The HSPT tests this error often because it looks natural when read aloud.`),

  P(16, 3, [
    `"The test is tomorrow," she said, "so study tonight."`,
    `He shouted, "Watch out for the ice"!`,
    `"Who left the window open?" Grandpa asked.`,
  ], 1, `Quotation-mark rule: when the quoted words themselves form an exclamation or question, the end mark goes inside the closing quotation marks: "Watch out for the ice!" The exclamation point in the second sentence is outside. The first sentence shows a correctly punctuated split quotation, and the third correctly keeps the question mark inside the quotation.`),

  P(17, 3, [
    `The womens' restroom is down the hall.`,
    `The boys' team practices on Tuesdays.`,
    `Charles's essay won first prize.`,
  ], 0, `Irregular-plural possessive rule: "women" is already plural, so its possessive is "women's," not "womens'." Only plurals that end in s (like "boys") take the apostrophe after the s. The trap is "Charles's," which is correct: a singular name ending in s still takes apostrophe-s to show possession.`),

  P(18, 3, [
    `Yes, I will be there by noon.`,
    `The team captain, who is also class president, gave a speech.`,
    `First, preheat the oven; then, mix the batter.`,
  ], 3, `All three sentences are correct. "Yes" at the start of a sentence is set off by a comma; a nonessential "who" clause takes a pair of commas; and a semicolon correctly joins two independent clauses with the transition "then." The trap is the third sentence, where some students expect a comma or nothing before "then," but a semicolon is the correct joiner.`),

  P(19, 3, [
    `The students who finished early, were allowed to read.`,
    `The students who finished early were allowed to read.`,
    `The students, exhausted after the test, were allowed to read.`,
  ], 0, `Subject-verb rule: never place a single comma between a subject and its verb. "The students who finished early" is the complete subject (the "who" clause is essential), so the comma before "were" is wrong. The third sentence is correct because the interrupting phrase is enclosed in a pair of commas, not a single one.`),

  P(20, 3, [
    `She was born on July 4, 2011, in Austin, Texas.`,
    `Send the package to 42 Elm Street Portland, Oregon.`,
    `On Friday, we will leave for camp.`,
  ], 1, `Address rule: separate the parts of an address with commas: "42 Elm Street, Portland, Oregon." The second sentence has no comma between the street and the city. The first sentence correctly places commas after the day, after the year, and between city and state. A short introductory phrase like "On Friday" may take a comma, so the third sentence is fine.`),

  P(21, 3, [
    `The answer, of course, is forty-two.`,
    `Of course, the answer is forty-two.`,
    `The answer is, of course, forty-two.`,
  ], 3, `All three sentences are correct. "Of course" is a parenthetical interrupter: when it opens the sentence it is followed by one comma, and when it sits in the middle it is enclosed by a pair of commas. The trap is the hyphen in "forty-two," which is required for compound numbers between twenty-one and ninety-nine.`),

  P(22, 4, [
    `The tour stops in Paris, France; Rome, Italy; and Madrid, Spain.`,
    `The committee includes Ms. Park, the treasurer; Mr. Diaz, the secretary; and Mrs. Lee, the chair.`,
    `I packed a jacket, it might get cold at night.`,
  ], 2, `Comma-splice rule: "I packed a jacket, it might get cold at night" joins two independent clauses with only a comma. It needs a semicolon, a period, or "because." The first two sentences are the trap: when list items already contain commas, semicolons correctly separate the items, so those sentences are right even though semicolons appear in a list.`),

  P(23, 4, [
    `She has visited: Chicago, Denver, and Seattle.`,
    `She has visited three cities: Chicago, Denver, and Seattle.`,
    `Remember this: practice makes progress.`,
  ], 0, `Colon rule: the words before a colon must form a complete sentence. "She has visited" is incomplete without its object, so the colon illegally separates the verb from the list. Adding "three cities" (second sentence) makes the clause complete. The third sentence correctly uses a colon to introduce an explanation after a complete statement.`),

  P(24, 4, [
    `The Smith's are hosting the block party this year.`,
    `The Smiths' house is at the end of the street.`,
    `The Smiths are hosting the block party this year.`,
  ], 0, `Plural rule: a plain plural never takes an apostrophe. "The Smiths are hosting" means more than one Smith, so no apostrophe belongs there. The second sentence is a correct plural possessive (the house belonging to the Smiths). Trap: students often think a family name "needs" an apostrophe; it needs one only when showing ownership.`),

  P(25, 4, [
    `Having finished the marathon, she collapsed, exhausted but proud.`,
    `"If it rains," Coach said, "we'll practice in the gym."`,
    `The recipe calls for two cups of flour, one egg, and a pinch of salt.`,
  ], 3, `All three sentences are correct. The first uses a comma after an introductory participial phrase and another to set off a trailing descriptive phrase. The second is a correctly punctuated interrupted quotation with commas inside the quotation marks. The third is a properly punctuated series. The trap is the second sentence, where the lowercase "we'll" after the speaker tag is correct because the quotation continues the same sentence.`),

  P(26, 4, [
    `The book that I borrowed from you is on the desk.`,
    `The book, which I borrowed from you, is on the desk.`,
    `My laptop which is only a year old, already needs repairs.`,
  ], 2, `Nonessential-clause rule: a "which" clause that adds extra information is set off by a pair of commas: "My laptop, which is only a year old, already needs repairs." The third sentence is missing the opening comma. The first sentence correctly uses "that" with no commas for an essential clause, and the second correctly uses commas around a nonessential "which" clause.`),

  P(27, 4, [
    `Did she really say, "I quit"?`,
    `She asked, "Are we there yet?"`,
    `The sign read "No Parking".`,
  ], 2, `American-style rule: periods and commas always go inside closing quotation marks, so it should be "No Parking." The question mark is different: it goes inside when the quotation is the question (second sentence) and outside when the whole sentence is the question but the quoted words are not (first sentence). Both of those are correct.`),

  P(28, 4, [
    `Emma, please close the door.`,
    `Please close the door Emma.`,
    `Oh, I didn't see you there.`,
  ], 1, `Direct-address rule: a name used to address someone is set off with a comma: "Please close the door, Emma." The second sentence has no comma, so "the door Emma" reads as a single noun phrase. The first sentence correctly places the comma after the name at the start, and the interjection "Oh" is correctly followed by a comma.`),

  P(29, 4, [
    `The ex-mayor attended the ceremony.`,
    `Her mother-in-law baked the cake.`,
    `We need a twenty four hour notice to cancel.`,
  ], 2, `Hyphen rule: a multi-word number or measurement used as an adjective before a noun is hyphenated: "a twenty-four-hour notice." Both the compound number and the attachment to "hour" need hyphens. The prefix "ex-" is always hyphenated, and "mother-in-law" is a standard hyphenated compound noun.`),

  P(30, 4, [
    `What a beautiful morning it is!`,
    `I wonder whether it will snow tonight?`,
    `Please tell me what time the show begins.`,
  ], 1, `Indirect-question rule: a sentence that reports a question rather than asking it is a statement and ends with a period: "I wonder whether it will snow tonight." The third sentence is the same pattern and is correctly punctuated. The first sentence is an exclamation, so the exclamation point is right. Trap: the word "whether" makes students reach for a question mark.`),

  P(31, 4, [
    `Unless the storm passes, the game will be postponed.`,
    `The Hendersons' cabin, nestled in the pines, has no electricity.`,
    `It's been a long day; let's order pizza.`,
  ], 3, `All three sentences are correct. An introductory "unless" clause takes a comma; the plural possessive "Hendersons'" is right for a family name, and the descriptive phrase is set off with a pair of commas; and the semicolon joins two independent clauses. The trap is "It's been," which is the contraction of "it has been" and therefore needs the apostrophe.`),

  P(32, 4, [
    `The road was icy, therefore, school was canceled.`,
    `The road was icy; therefore, school was canceled.`,
    `The road was icy, so school was canceled.`,
  ], 0, `Conjunctive-adverb rule: words like "therefore," "however," and "consequently" cannot join two independent clauses with commas alone; doing so creates a comma splice. Use a semicolon before the conjunctive adverb and a comma after it (second sentence). The third sentence is correct because "so" is a coordinating conjunction, which does join clauses with a comma.`),

  P(33, 5, [
    `She wore a bright, red scarf.`,
    `It was a long, tiring day.`,
    `He drove an old green truck.`,
  ], 0, `Coordinate-adjective rule: use a comma between two adjectives only if they independently modify the noun (you could insert "and" or reverse them). "Long and tiring day" works, so the comma in the second sentence is correct. "Bright and red scarf" does not work, because "bright" modifies "red," not "scarf," so the first sentence should be "bright red scarf." "Old green truck" is also cumulative and correctly has no comma.`),

  P(34, 5, [
    `Jake and Maria's project won first place.`,
    `Jake's and Maria's lockers are next to each other.`,
    `Everyone's opinion matters at the meeting.`,
  ], 3, `All three sentences are correct. Joint-possession rule: when two people own one thing together, only the last name takes the apostrophe ("Jake and Maria's project"). When each owns something separately, both names take an apostrophe ("Jake's and Maria's lockers"). Indefinite pronouns such as "everyone" form the possessive with apostrophe-s. The trap is thinking one of the first two must be wrong because they look inconsistent.`),

  P(35, 5, [
    `Who wrote "The Road Not Taken"?`,
    `"Why did you leave early?" she asked.`,
    `He asked whether I had read "The Gift of the Magi?"`,
  ], 2, `Indirect-question rule: "He asked whether I had read..." reports a question, so the sentence is a statement and should end with a period, placed inside the quotation marks: "The Gift of the Magi." The first sentence is a true question whose quoted title is not a question, so the question mark correctly sits outside the quotation marks; the second quotes a question directly, so the mark correctly sits inside.`),

  P(36, 5, [
    `Some people prefer tea; others, coffee.`,
    `We hiked for six hours; and we were exhausted.`,
    `Bring your passport; otherwise, you will not be allowed to board.`,
  ], 1, `Semicolon rule: a semicolon replaces a coordinating conjunction; it does not sit beside one. "We hiked for six hours, and we were exhausted" (comma) or "We hiked for six hours; we were exhausted" (semicolon) are both correct, but "; and" is not. The first sentence correctly uses a semicolon with an elliptical second clause, and the third correctly pairs a semicolon with the conjunctive adverb "otherwise."`),

  P(37, 3, [
    `Whose jacket is this?`,
    `Who's responsible for the mess?`,
    `The committee made it's decision last night.`,
  ], 2, `Its/it's rule: "it's" means "it is," and "The committee made it is decision" makes no sense, so the possessive "its" is needed. The first two sentences are the trap: "whose" is the possessive and "who's" is the contraction of "who is," and each is used correctly.`),

  P(38, 3, [
    `I bought apples, and oranges.`,
    `I bought apples and oranges.`,
    `I bought apples, oranges, and bananas.`,
  ], 0, `Series rule: commas separate items in a list of three or more. With only two items joined by "and," no comma is used, so "apples, and oranges" is wrong. The third sentence correctly uses commas (including the serial comma) for three items. Trap: students who have learned to put a comma before "and" apply the rule even when there is no series.`),

  P(39, 4, [
    `At the end of the steep trail, we found a waterfall.`,
    `In 2019 my family moved to Denver.`,
    `After the final whistle blew the fans stormed the field.`,
  ], 2, `Introductory-clause rule: a dependent clause that opens a sentence must be followed by a comma. Without it, "After the final whistle blew the fans" momentarily reads as if the whistle blew the fans. The first sentence correctly uses a comma after a long introductory phrase; the second is fine because a very short introductory phrase ("In 2019") may go without a comma.`),

  P(40, 2, [
    `Don't touch the stove; it's still hot.`,
    `Sarah's little brother collects seashells.`,
    `Are we leaving at noon or at one?`,
  ], 3, `All three sentences are correct. The semicolon joins two complete thoughts; "Sarah's" is a correct singular possessive; and the question ends with a question mark. The trap is "it's still hot," which correctly uses the contraction for "it is."`),

  P(41, 3, [
    `"Let's eat Grandma," Tommy said.`,
    `"Let's eat, Grandma," Tommy said.`,
    `Tommy said that he was hungry.`,
  ], 0, `Direct-address rule: a comma must separate the person being spoken to from the rest of the sentence. Without it, "Let's eat Grandma" says Grandma is the meal. The second sentence inserts the needed comma, and the third is an indirect quotation that correctly uses no quotation marks or comma.`),

  P(42, 4, [
    `The package arrived on Tuesday, not Monday.`,
    `She was tired but happy.`,
    `He wanted to apologize, but, couldn't find the words.`,
  ], 2, `Compound-predicate rule: when one subject has two verbs joined by "but," no comma is needed at all, and a comma never follows the conjunction directly. The correct form is "He wanted to apologize but couldn't find the words." The first sentence correctly uses a comma before a contrasting element ("not Monday"), and the second joins two adjectives with "but" and needs no comma.`),

  P(43, 2, [
    `I wouldn't do that if I were you.`,
    `She did'nt see the sign.`,
    `Let's go to the movies.`,
  ], 1, `Contraction rule: the apostrophe goes exactly where the letters are removed. "Did not" loses the o in "not," so the form is "didn't," not "did'nt." "Wouldn't" and "Let's" (let us) are both correctly formed.`),

  P(44, 3, [
    `Dear Aunt Sue,`,
    `Thank you for the birthday gift, Aunt Sue.`,
    `Sincerely Ben`,
  ], 2, `Letter rule: the closing of a letter is followed by a comma, and the name goes on the next line: "Sincerely, Ben." The greeting of a friendly letter also takes a comma, so the first choice is correct. The second sentence correctly uses a comma for direct address.`),

  P(45, 4, [
    `However, the museum was closed.`,
    `The museum, however, was closed.`,
    `The museum however was closed.`,
  ], 2, `Interrupter rule: "however" used as a transition is set off by commas; when it falls in the middle of a sentence it needs a pair. The third sentence has none. The first correctly follows an opening "However" with a comma, and the second correctly encloses it.`),

  P(46, 5, [
    `Students who forget their homework will lose points.`,
    `My grandmother, who turns ninety next week, still gardens daily.`,
    `People, who litter, should be fined.`,
  ], 2, `Essential-clause rule: a "who" clause that limits which people are meant is essential and takes no commas. "People, who litter, should be fined" wrongly treats the clause as extra information, which makes the sentence claim that all people litter and should be fined. The second sentence is correctly nonessential because "my grandmother" already identifies the person.`),

  P(47, 3, [
    `The company announced its plans to expand overseas.`,
    `It's been years since the last eruption.`,
    `The storm lost its strength by morning.`,
  ], 3, `All three sentences are correct. "Its plans" and "its strength" are possessives and take no apostrophe; "It's been" is the contraction of "it has been" and needs one. Test each case by substituting "it is" or "it has": if the substitution makes sense, the apostrophe belongs.`),

  P(48, 5, [
    `She gave a highly-anticipated speech.`,
    `The newly renovated gym opens Monday.`,
    `The state-of-the-art lab impressed the visitors.`,
  ], 0, `Hyphen exception: an adverb ending in -ly is never hyphenated to the adjective it modifies, so it must be "highly anticipated speech." The -ly ending already signals that the word modifies the next word, so no hyphen is needed to prevent misreading. "Newly renovated" correctly omits the hyphen, and "state-of-the-art" is a correctly hyphenated compound adjective before a noun.`),

  P(49, 2, [
    `Please sit down and open your notebooks.`,
    `How many pages are left?`,
    `Stop that right now`,
  ], 2, `End-mark rule: every sentence needs a terminal mark. "Stop that right now" is a command and should end with a period or, for urgency, an exclamation point. The polite request in the first sentence correctly ends with a period, and the question correctly ends with a question mark.`),

  P(50, 4, [
    `To be honest, I never expected to win.`,
    `The jury's verdict, announced at noon, surprised everyone.`,
    `Whenever my aunt visits, she brings her famous lemon bars.`,
  ], 3, `All three sentences are correct. An introductory phrase ("To be honest") takes a comma; a nonessential participial phrase ("announced at noon") is enclosed by commas; and an introductory "whenever" clause is followed by a comma. The trap is "jury's," a correct singular possessive even though a jury is made up of many people.`),
];

// ---------------------------------------------------------------------------
// CAPITALIZATION (30)
// ---------------------------------------------------------------------------
const capitalization = [
  C(1, 2, [
    `We visited the grand canyon last summer.`,
    `My favorite subject is math.`,
    `Aunt Rosa lives in Chicago.`,
  ], 0, `Proper-noun rule: the name of a specific place is capitalized, so it must be "the Grand Canyon." A general subject like "math" stays lowercase, which is the trap for students who capitalize every school subject. "Aunt Rosa" is correct because the family title is attached to a name.`),

  C(2, 2, [
    `In the Spring, the cherry trees bloom.`,
    `Next Monday is Memorial Day.`,
    `She speaks Spanish and English.`,
  ], 0, `Seasons rule: spring, summer, fall, and winter are common nouns and stay lowercase. Days of the week, holidays, and languages are proper nouns and are capitalized, so the other two sentences are correct. Trap: because months and days are capitalized, students assume seasons are too.`),

  C(3, 2, [
    `I asked Mom if I could stay up late.`,
    `My mom said no.`,
    `I told dad about the game.`,
  ], 2, `Family-title rule: capitalize a family word when it is used as a name ("I told Dad"), but not when it follows a possessive like "my" ("my mom"). Test it by swapping in a real name: "I told Steve" works, so "Dad" is a name here. The second sentence correctly leaves "mom" lowercase after "my."`),

  C(4, 2, [
    `Have you read Charlotte's Web?`,
    `The Pacific Ocean is the largest ocean.`,
    `Our team plays the Tigers on Friday.`,
  ], 3, `All three sentences are correct. Book titles capitalize the main words; "Pacific Ocean" is a specific named body of water, while the second "ocean" is a common noun; and a team name like "the Tigers" is a proper noun. The trap is the second "ocean," which students may think should match the first.`),

  C(5, 2, [
    `The president of the united states lives in the White House.`,
    `The mayor spoke to the reporters.`,
    `We studied the Civil War in history class.`,
  ], 0, `Country-name rule: "United States" is the proper name of a nation and is always capitalized. The sentence also correctly capitalizes "White House," a specific building. "The mayor" without a name is a common noun, and "Civil War" is a named historical event, so those sentences are correct.`),

  C(6, 2, [
    `my cousin plays the piano.`,
    `Thanksgiving is my favorite holiday.`,
    `Dr. Patel is a dentist.`,
  ], 0, `First-word rule: the first word of every sentence is capitalized, so "My cousin" is required. Holidays like "Thanksgiving" and titles attached to names like "Dr. Patel" are also capitalized, and the other two sentences handle them correctly.`),

  C(7, 3, [
    `Drive north for two miles, then turn left.`,
    `Many families moved to the West in the 1800s.`,
    `The sun rises in the East.`,
  ], 2, `Direction rule: a compass direction is lowercase when it tells which way to go ("rises in the east"), but capitalized when it names a region ("the West" as a part of the country). The third sentence describes a direction, not a region, so "east" should be lowercase. The trap is the second sentence, where "the West" correctly names a region.`),

  C(8, 3, [
    `I am taking Algebra I and French this year.`,
    `She wants to study Biology in college.`,
    `He is enrolled in Spanish and chemistry.`,
  ], 1, `School-subject rule: general subjects (biology, chemistry, history) are lowercase; languages (French, Spanish) and specific numbered course titles ("Algebra I") are capitalized. "Study biology" refers to the general subject, so it should be lowercase. The trap is "Algebra I," which looks like a subject but is a formal course name.`),

  C(9, 3, [
    `The Declaration of Independence was signed in 1776.`,
    `The treaty of Paris ended the war.`,
    `The Renaissance began in Italy.`,
  ], 1, `Historical-document rule: the full name of a treaty, document, or era is capitalized, so it must be "the Treaty of Paris." Small words like "of" stay lowercase inside the name, as in "Declaration of Independence." Named periods such as "the Renaissance" are also capitalized.`),

  C(10, 3, [
    `She bought a new pair of Nike sneakers.`,
    `My dad drives a ford truck.`,
    `We ate lunch at a local diner.`,
  ], 1, `Brand-name rule: a company or brand name is a proper noun and is capitalized ("Ford truck"), even though the product it names (truck) is lowercase. "Nike sneakers" follows the same pattern correctly. "A local diner" names no specific business, so it stays lowercase.`),

  C(11, 3, [
    `Grandma Jones taught me to knit.`,
    `The Mississippi River flows into the Gulf of Mexico.`,
    `In January, we celebrate Martin Luther King Jr. Day.`,
  ], 3, `All three sentences are correct. A family title attached to a name ("Grandma Jones") is capitalized; "River" and "Gulf" are capitalized because they are part of specific place names; and a month and a holiday are both proper nouns. The trap is "Gulf of Mexico," where "of" correctly stays lowercase.`),

  C(12, 3, [
    `I enjoyed reading The Lion, the Witch and the Wardrobe.`,
    `We sang "the star-spangled banner" before the game.`,
    `Her essay was titled "A Summer to Remember."`,
  ], 1, `Title rule: capitalize the first word and all major words in a title, so it should be "The Star-Spangled Banner." Short articles and conjunctions ("the," "and") inside a title stay lowercase unless they come first, which is why "The Lion, the Witch and the Wardrobe" is correct. The third sentence also follows the rule, with "to" correctly lowercase.`),

  C(13, 3, [
    `She asked, "where is the library?"`,
    `"The bus is late," he grumbled.`,
    `"If you hurry," said Mia, "you can still catch it."`,
  ], 0, `Quotation rule: the first word of a direct quotation is capitalized because it begins the speaker's sentence: "Where is the library?" The third sentence is the trap: "you" is lowercase because the quotation continues a sentence that was interrupted by the speaker tag, not a new sentence.`),

  C(14, 4, [
    `The senator from Ohio voted against the bill.`,
    `Senator Brooks voted against the bill.`,
    `We met the Governor at the parade.`,
  ], 2, `Title rule: an official title is capitalized only when it directly precedes a name ("Senator Brooks") or replaces the name in direct address. Used with "the" and no name, it is a common noun: "the governor." The first sentence correctly keeps "senator" lowercase for the same reason.`),

  C(15, 3, [
    `Many muslims fast during Ramadan.`,
    `The Italian restaurant serves fresh pasta.`,
    `She is studying Buddhism and Christianity.`,
  ], 0, `Religion rule: the names of religions and their followers are proper nouns, so "Muslims" must be capitalized, just as "Ramadan" is in the same sentence. Nationalities used as adjectives ("Italian") are also capitalized, and religion names like "Buddhism" and "Christianity" follow the same rule.`),

  C(16, 3, [
    `The Empire State Building is in New York City.`,
    `We crossed the Golden Gate Bridge at sunset.`,
    `The hospital is on Maple street.`,
  ], 2, `Street-name rule: "Street," "Avenue," and "Road" are capitalized when they are part of a specific name, so it must be "Maple Street." Likewise "Building" and "Bridge" are capitalized in the first two sentences because they belong to the proper names. Trap: students capitalize "Maple" but forget the second half of the name.`),

  C(17, 3, [
    `Uncle Ray grilled burgers on the Fourth of July.`,
    `The students learned about the Great Depression.`,
    `I have band practice on Wednesday afternoons.`,
  ], 3, `All three sentences are correct. "Uncle Ray" pairs a family title with a name; "Fourth of July" is a holiday; "Great Depression" is a named historical period; and "Wednesday" is a day of the week. The trap is "band practice," which is a common activity and correctly stays lowercase.`),

  C(18, 4, [
    `The Earth orbits the Sun once a year.`,
    `Farmers till the earth each spring.`,
    `Jupiter is the largest Planet.`,
  ], 2, `Astronomy rule: the names of planets and stars are proper nouns, but the word "planet" itself is a common noun and stays lowercase. "Earth" and "Sun" are capitalized when they name the astronomical bodies (first sentence) and lowercase when "earth" means soil (second sentence), so those sentences are correct.`),

  C(19, 4, [
    `My history teacher, Mrs. Alvarez, assigned a project.`,
    `We read about the middle ages.`,
    `The Boston Tea Party took place in 1773.`,
  ], 1, `Historical-era rule: named periods of history are capitalized, so it must be "the Middle Ages." Named events like "the Boston Tea Party" follow the same rule. The first sentence correctly keeps "history teacher" lowercase (a general subject plus a job) while capitalizing the title and name "Mrs. Alvarez."`),

  C(20, 4, [
    `Did Grandpa fix the fence?`,
    `My Grandpa fixed the fence.`,
    `Grandpa Lou fixed the fence.`,
  ], 1, `Family-title rule: after a possessive word such as "my," "your," or "our," a family title is a common noun and stays lowercase: "my grandpa." Standing alone as a name ("Did Grandpa fix") or attached to a name ("Grandpa Lou"), it is capitalized. Trap: the same word changes form depending only on the word before it.`),

  C(21, 4, [
    `She grew up in the Midwest.`,
    `Turn south at the next light.`,
    `The Southwest is known for its deserts.`,
  ], 3, `All three sentences are correct. "The Midwest" and "the Southwest" name regions of the country and are capitalized; "turn south" gives a direction and is lowercase. The trap is choosing between the two regional names, but both are right. Ask whether the word answers "which way?" (lowercase) or "which place?" (capital).`),

  C(22, 4, [
    `He attends Lincoln High School.`,
    `She goes to a high school across town.`,
    `The high school's Principal retired.`,
  ], 2, `Job-title rule: "principal" used without a name is a common noun and should be lowercase. "Lincoln High School" is capitalized because it is a specific school's name, while "a high school across town" is generic and correctly lowercase. Trap: students capitalize important-sounding jobs regardless of how they are used.`),

  C(23, 4, [
    `After World War II, many soldiers attended college.`,
    `The French Revolution began in 1789.`,
    `We took a ferry across Lake Michigan.`,
  ], 3, `All three sentences are correct. Wars and revolutions with specific names ("World War II," "French Revolution") are capitalized, and "Lake" is capitalized as part of the name "Lake Michigan." The trap is "college," which is lowercase because no specific college is named.`),

  C(24, 5, [
    `The doctor said, "Take two tablets daily."`,
    `The doctor said that I should take two tablets daily.`,
    `"Take two tablets," the doctor said, "Every morning."`,
  ], 2, `Interrupted-quotation rule: when a speaker tag splits one sentence of dialogue, the second part continues that sentence and begins with a lowercase letter: "Take two tablets," the doctor said, "every morning." The first sentence correctly capitalizes the start of a quotation, and the second is an indirect quotation that needs no capital.`),

  C(25, 3, [
    `I am taking French, history, and geometry.`,
    `I am taking english, history, and geometry.`,
    `I am taking three classes this semester.`,
  ], 1, `Language rule: "English" is always capitalized because it is the name of a language, even when it is a school subject. General subjects like "history" and "geometry" stay lowercase. The first sentence shows the correct mix with "French," which is the key pattern the HSPT tests: capitalize the language, not the ordinary subjects.`),

  C(26, 5, [
    `The Ohio River forms the state's southern border.`,
    `Several rivers in the region flood every spring.`,
    `The river Thames flows through London.`,
  ], 2, `Proper-name rule: when a geographic word is part of the official name, it is capitalized no matter where it appears, so it must be "the River Thames," just as "Ohio River" is capitalized. The second sentence uses "rivers" generically and is correctly lowercase. Trap: students assume "river" is only capitalized when it comes after the name.`),

  C(27, 5, [
    `The Nobel Prize in Literature was awarded to a poet.`,
    `The band played jazz and blues all night.`,
    `I went to the dentist on Tuesday, February 3.`,
  ], 3, `All three sentences are correct. "Nobel Prize in Literature" is the official name of an award, so all its main words are capitalized; music genres like "jazz" and "blues" are common nouns; and "Tuesday" and "February" are proper nouns. The trap is "Literature," which is capitalized only because it is part of the award's name.`),

  C(28, 5, [
    `The Supreme Court ruled on the case in June.`,
    `The court will hear arguments next month.`,
    `The Justices wrote separate opinions.`,
  ], 2, `Title rule: "justice" is capitalized only before a name ("Justice Sotomayor"); as a plural common noun it is lowercase: "the justices." "Supreme Court" is the name of a specific institution, so it is capitalized, while "the court" in the second sentence is a shortened common reference and correctly lowercase.`),

  C(29, 5, [
    `Shakespeare's plays are still performed worldwide.`,
    `The scientist won a Pulitzer prize for her book.`,
    `The Eiffel Tower attracts millions of tourists.`,
  ], 1, `Award-name rule: the full name of an award is a proper noun, so both words of "Pulitzer Prize" are capitalized. Trap: students capitalize the unusual word and leave the ordinary word lowercase, but "Prize" is part of the name. "Eiffel Tower" is treated the same way, with "Tower" capitalized.`),

  C(30, 2, [
    `Is christmas on a Thursday this year?`,
    `My birthday is in October.`,
    `We watched fireworks on New Year's Eve.`,
  ], 0, `Holiday rule: holidays are proper nouns and are capitalized, so it must be "Christmas." Months and days ("October," "Thursday") and multi-word holidays ("New Year's Eve") follow the same rule. Trap: "birthday" is a common noun and is correctly lowercase.`),
];

// ---------------------------------------------------------------------------
// USAGE (60)
// ---------------------------------------------------------------------------
const usage = [
  U(1, 2, [
    `My sister runs faster than I do.`,
    `The dogs barks at every passing car.`,
    `The children are playing outside.`,
  ], 1, `Subject-verb agreement: a plural subject takes a plural verb, so "The dogs bark." In the present tense, the verb ending in -s goes with singular subjects ("the dog barks"), not plural ones. The trap is "than I do," which is correct because "I do" is a clause with its own subject.`),

  U(2, 2, [
    `We never go anywhere on weekends.`,
    `She can hardly wait for summer.`,
    `I don't have no money for the movie.`,
  ], 2, `Double-negative rule: "don't" and "no" are both negatives, and two negatives in one clause cancel each other. The sentence should read "I don't have any money." The second sentence is the trap: "hardly" is a negative word, but "can hardly" uses only one negative, so it is correct.`),

  U(3, 2, [
    `She brought her lunch from home.`,
    `They swam across the lake.`,
    `He has went to the store twice today.`,
  ], 2, `Irregular-verb rule: after "has," "have," or "had," use the past participle, and the participle of "go" is "gone": "He has gone." "Went" is the simple past and never follows a helping verb. "Brought" and "swam" are the correct simple-past forms.`),

  U(4, 2, [
    `Me and Jake are going to the game.`,
    `Give the tickets to Jake and me.`,
    `Jake and I are going to the game.`,
  ], 0, `Pronoun-case rule: a pronoun that is part of the subject must be in the subject form, so "Jake and I are going." Test it by dropping the other person: "Me am going" is clearly wrong. The second sentence is correct because "me" is the object of the preposition "to."`),

  U(5, 2, [
    `Each of the players has a uniform.`,
    `The teacher gave us too much homework.`,
    `Where did you put the keys?`,
  ], 3, `All three sentences are correct. "Each" is a singular pronoun, so "has" agrees with it even though "players" sits in between; "us" is the correct object pronoun after "gave"; and the question has normal word order. The trap is "Each of the players has," which sounds plural because of "players."`),

  U(6, 2, [
    `Of the two routes, the first is shorter.`,
    `This is the most tallest building in town.`,
    `Ava is the youngest of five children.`,
  ], 1, `Superlative rule: form a superlative one way, not two. "Tallest" already means "most tall," so "most tallest" is a double superlative. Use "the tallest building." The first sentence correctly uses the comparative "shorter" for two items, and the third correctly uses the superlative for five.`),

  U(7, 2, [
    `Tomorrow we will walk to the park.`,
    `Yesterday we walk to the park.`,
    `Right now we are walking to the park.`,
  ], 1, `Verb-tense rule: the time word must match the verb tense. "Yesterday" requires the past tense: "Yesterday we walked." The other sentences correctly pair "tomorrow" with the future "will walk" and "right now" with the present progressive "are walking."`),

  U(8, 2, [
    `She has a beautiful voice.`,
    `She sings beautifully.`,
    `She sings beautiful.`,
  ], 2, `Adjective-vs-adverb rule: a word that describes how an action is done must be an adverb. "Sings" is an action verb, so it needs "beautifully." "Beautiful" is an adjective and can only describe a noun, as it correctly does in "beautiful voice."`),

  U(9, 2, [
    `The test was hard.`,
    `Because the test was hard.`,
    `Although it was hard, I passed the test.`,
  ], 1, `Fragment rule: a group of words beginning with a subordinating conjunction ("because," "although," "when") is a dependent clause and cannot stand alone. "Because the test was hard" leaves the reader asking "what happened?" The third sentence is correct because the dependent clause is attached to an independent one.`),

  U(10, 2, [
    `He did well on the quiz.`,
    `He is a good student.`,
    `He did good on the quiz.`,
  ], 2, `Good/well rule: "good" is an adjective that describes nouns; "well" is an adverb that describes how an action is done. "Did" is an action verb, so it needs "well." The second sentence is correct because "good" describes the noun "student."`),

  U(11, 2, [
    `She and I finished first.`,
    `There are three cookies left.`,
    `Did you see them at the park?`,
  ], 3, `All three sentences are correct. "She and I" is the subject form; "are" agrees with the plural subject "cookies" (in a "there" sentence the subject comes after the verb); and "them" is the object of "see." The trap is "She and I," which students sometimes change to "Her and me."`),

  U(12, 3, [
    `The box of crayons are on the shelf.`,
    `The crayons in the box are new.`,
    `One of the crayons is broken.`,
  ], 0, `Agreement rule: the verb agrees with the subject, not with a noun inside a prepositional phrase. The subject is "box," so it must be "The box of crayons is on the shelf." Cross out "of crayons" to see it. The second sentence has the plural subject "crayons," and the third has the singular subject "One," so both are correct.`),

  U(13, 3, [
    `Lay down and rest for a while.`,
    `Lay the book on the table.`,
    `The cat lies in the sun all afternoon.`,
  ], 0, `Lie/lay rule: "lie" means to recline and takes no object; "lay" means to put something down and needs an object. "Lay down and rest" has no object, so it must be "Lie down." The second sentence is correct because "lay" has the object "the book," and the third correctly uses "lies" for reclining.`),

  U(14, 3, [
    `There was less noise than usual.`,
    `There were less people at the game tonight.`,
    `We have fewer tickets than we need.`,
  ], 1, `Fewer/less rule: use "fewer" for things you can count (people, tickets) and "less" for amounts you cannot count (noise, water, time). "People" can be counted, so it should be "fewer people." The first sentence correctly uses "less" with the uncountable "noise."`),

  U(15, 3, [
    `Who is going to the dance?`,
    `Whom did you invite?`,
    `To who should I address the letter?`,
  ], 2, `Who/whom rule: "who" is a subject and "whom" is an object. After a preposition such as "to," the object form is required: "To whom should I address the letter?" Quick test: if the answer would be "him," use "whom." In the second sentence, "you invited him," so "whom" is correct there too.`),

  U(16, 3, [
    `Split the pizza among the three of you.`,
    `The secret stayed between Jen and me.`,
    `Divide the candy between all five kids.`,
  ], 2, `Between/among rule: use "between" for two people or things and "among" for three or more. "Five kids" calls for "among." The second sentence is the trap: "between Jen and me" is correct both because there are two people and because "me" is the right object form after a preposition.`),

  U(17, 3, [
    `Each of the boys brought his own glove.`,
    `Neither of the girls remembered their lines.`,
    `All of the students finished their projects.`,
  ], 1, `Pronoun-agreement rule: "neither" is singular, so the pronoun referring back to it must be singular: "Neither of the girls remembered her lines." Standardized tests follow this traditional rule and treat "their" with a singular antecedent as an error. "Each" in the first sentence is correctly matched with "his," and "all of the students" is plural, so "their" is correct there.`),

  U(18, 3, [
    `Whom did the coach choose as captain?`,
    `Either the twins or their mother is driving.`,
    `The jury has reached its verdict.`,
  ], 3, `All three sentences are correct. "Whom" is the object of "choose" (the coach chose him); with "either...or," the verb agrees with the nearer subject, "mother," so "is" is right; and a collective noun acting as one unit ("the jury") is singular and takes "has" and "its." The trap is "twins...is," but the nearer-subject rule governs.`),

  U(19, 3, [
    `The sun raises at six tomorrow.`,
    `Please raise your hand.`,
    `Prices rise every year.`,
  ], 0, `Rise/raise rule: "rise" means to go up on its own and takes no object; "raise" means to lift something and needs an object. The sun goes up by itself, so it must be "The sun rises." The second sentence correctly uses "raise" with the object "your hand."`),

  U(20, 3, [
    `The movie was so long that I fell asleep.`,
    `The movie was long I fell asleep.`,
    `The movie was long, and I fell asleep.`,
  ], 1, `Run-on rule: two complete thoughts cannot be jammed together with nothing between them. "The movie was long I fell asleep" is a fused sentence. Fix it with a comma plus a conjunction (third sentence), a semicolon, or a subordinating structure like "so...that" (first sentence).`),

  U(21, 3, [
    `She served cookies to the children on paper plates.`,
    `Covered in chocolate, Ben ate the strawberries.`,
    `Ben ate the strawberries covered in chocolate.`,
  ], 1, `Misplaced-modifier rule: a descriptive phrase attaches to the nearest noun. In "Covered in chocolate, Ben ate the strawberries," the phrase describes Ben, which is not the intended meaning. Moving it next to "strawberries" (third sentence) fixes it. The first sentence is clear because "on paper plates" sensibly describes how the cookies were served.`),

  U(22, 3, [
    `She opened the door and sees a package.`,
    `She opened the door and saw a package.`,
    `She opens the door and sees a package.`,
  ], 0, `Tense-consistency rule: verbs in the same sentence should stay in the same tense unless the time actually changes. "Opened...sees" shifts from past to present for no reason. Both all-past (second sentence) and all-present (third sentence) versions are correct.`),

  U(23, 3, [
    `I have drank three glasses of water.`,
    `I drank three glasses of water.`,
    `I have drunk three glasses of water.`,
  ], 0, `Irregular-verb rule: drink, drank, drunk. The simple past is "drank," and the past participle used after "have" is "drunk." "Have drank" mixes the forms. The second and third sentences each use one form correctly.`),

  U(24, 3, [
    `Of the two sisters, Kim is the oldest.`,
    `Kim is older than her sister.`,
    `Kim is the oldest of the four sisters.`,
  ], 0, `Comparative/superlative rule: use the comparative (-er or "more") for two items and the superlative (-est or "most") for three or more. With only two sisters, it must be "Kim is the older." The third sentence correctly uses "oldest" for four sisters.`),

  U(25, 3, [
    `The committee meets on the first Monday of each month.`,
    `He ran more quickly than anyone expected.`,
    `If I were you, I would apologize.`,
  ], 3, `All three sentences are correct. "Committee" is a collective noun acting as one unit, so "meets" is right; "more quickly" is the proper comparative adverb; and "If I were you" uses the subjunctive "were" for a situation contrary to fact. The trap is "were" with the singular "I," which is required in this hypothetical.`),

  U(26, 3, [
    `This is a secret between you and I.`,
    `Between you and me, the play was boring.`,
    `The coach praised him and me.`,
  ], 0, `Pronoun-case rule: a preposition takes an object pronoun, so it must be "between you and me." "Between you and I" is a hypercorrection that sounds formal but is wrong. The third sentence correctly uses "him and me" as objects of "praised"; test by dropping one: "praised me," not "praised I."`),

  U(27, 3, [
    `Maria and her brother walks to school.`,
    `Maria or her brother walks to school.`,
    `Maria and her brother walk to school.`,
  ], 0, `Compound-subject rule: two subjects joined by "and" make a plural subject and take a plural verb: "Maria and her brother walk." The trap is the second sentence: subjects joined by "or" take a verb that agrees with the nearer subject ("her brother walks"), so it is correct.`),

  U(28, 3, [
    `He answered the question quick.`,
    `He gave a quick answer.`,
    `He answered the question quickly.`,
  ], 0, `Adverb rule: a word describing how an action is done must be an adverb, so it must be "answered quickly." "Quick" is an adjective and may only modify a noun, as it correctly does in "a quick answer."`),

  U(29, 3, [
    `Their going to the beach tomorrow.`,
    `They're going to the beach tomorrow.`,
    `Their beach house is for sale.`,
  ], 0, `Their/they're rule: "their" is possessive and "they're" is the contraction of "they are." The first sentence means "They are going," so it needs "they're." The third sentence correctly uses the possessive to show whose beach house it is.`),

  U(30, 4, [
    `Please return the forms to Mr. Diaz or myself.`,
    `I baked the cake myself.`,
    `She taught herself to play guitar.`,
  ], 0, `Reflexive-pronoun rule: "myself," "herself," and similar forms can be used only when the subject is doing something to or for itself, or for emphasis. "Return the forms to Mr. Diaz or me" needs the plain object pronoun because "I" is not the subject. The second sentence uses "myself" correctly for emphasis, and the third uses "herself" as a true reflexive.`),

  U(31, 4, [
    `Neither the players nor the coach was late.`,
    `She did well on the exam despite feeling ill.`,
    `The number of applicants has doubled.`,
  ], 3, `All three sentences are correct. With "neither...nor," the verb agrees with the nearer subject ("coach was"); "well" is the right adverb after "did"; and "the number of" is singular and takes "has." The trap is "the number of applicants has," which sounds plural, but "a number of" is plural while "the number of" is singular.`),

  U(32, 4, [
    `Everybody in the stands were cheering.`,
    `Everybody in the stands was cheering.`,
    `All of the fans were cheering.`,
  ], 0, `Indefinite-pronoun rule: "everybody," "everyone," "somebody," and "nobody" are singular and take singular verbs: "Everybody was cheering." The phrase "in the stands" does not change the subject. "All of the fans" is plural because "all" takes its number from "fans," so "were" is correct there.`),

  U(33, 4, [
    `Set the groceries on the counter.`,
    `Come sit by me.`,
    `The vase has set on that shelf for years.`,
  ], 2, `Sit/set rule: "sit" means to rest in place and takes no object; "set" means to place something and needs an object. The vase is resting, with no object, so the past participle of "sit" is required: "has sat." The first sentence correctly uses "set" with the object "the groceries."`),

  U(34, 4, [
    `After studying all night, the exam seemed easy.`,
    `After studying all night, I found the exam easy.`,
    `The exam seemed easy after I studied all night.`,
  ], 0, `Dangling-modifier rule: an introductory phrase must describe the subject that follows it. In the first sentence, "After studying all night" illogically describes "the exam," as if the exam studied. The second sentence supplies the real subject ("I"), and the third rewrites the phrase as a full clause with its own subject.`),

  U(35, 4, [
    `The player whom scored the goal is my cousin.`,
    `The player who scored the goal is my cousin.`,
    `The player whom we cheered for is my cousin.`,
  ], 0, `Who/whom rule: look only at the clause the pronoun belongs to. In "___ scored the goal," the pronoun is the subject, so it must be "who." In the third sentence, "we cheered for ___," the pronoun is the object of "for," so "whom" is correct. Trap: do not let the main sentence's structure distract you from the clause.`),

  U(36, 4, [
    `By the time we arrived, the show already started.`,
    `By the time we arrived, the show had already started.`,
    `When we arrived, the show started.`,
  ], 0, `Past-perfect rule: when one past action happened before another past action, the earlier one takes "had" plus the past participle. "By the time we arrived" signals that the show's start came first, so it must be "had already started." The third sentence is correct because it describes the two events happening at the same moment.`),

  U(37, 4, [
    `This puzzle is more easier than the last one.`,
    `This puzzle is easier than the last one.`,
    `This is the easiest puzzle in the book.`,
  ], 0, `Double-comparative rule: use either "-er" or "more," never both. "Easier" already means "more easy," so "more easier" is wrong. The second sentence is the correct comparative, and the third correctly uses the superlative "easiest" when comparing with all the puzzles in the book.`),

  U(38, 4, [
    `Whoever finishes first wins the prize.`,
    `The novel, along with its sequels, is on the list.`,
    `Lying on the beach, we watched the clouds drift by.`,
  ], 3, `All three sentences are correct. "Whoever" is the subject of "finishes," so the subject form is right; phrases such as "along with" do not make a subject plural, so "novel...is" agrees; and "Lying" is the correct participle of "lie" (to recline), properly describing "we." The trap is "along with its sequels," which tempts students to use "are."`),

  U(39, 4, [
    `There is many reasons to recycle.`,
    `There are many reasons to recycle.`,
    `Here is the reason we recycle.`,
  ], 0, `Inverted-subject rule: in sentences beginning with "there" or "here," the real subject comes after the verb. "Reasons" is plural, so the verb must be "are." The third sentence is correct because its subject, "the reason," is singular.`),

  U(40, 4, [
    `The woman which lives next door is a nurse.`,
    `The woman who lives next door is a nurse.`,
    `The house that is next door is for sale.`,
  ], 0, `Relative-pronoun rule: use "who" for people and "which" or "that" for things. "The woman which" is wrong because "which" cannot refer to a person. The third sentence correctly uses "that" for a house.`),

  U(41, 4, [
    `I could of finished sooner.`,
    `I could have finished sooner.`,
    `I should have started earlier.`,
  ], 0, `Could-have rule: "could of" is a mishearing of the contraction "could've," which stands for "could have." "Of" is a preposition and can never follow a helping verb. The same applies to "should have," "would have," and "might have."`),

  U(42, 4, [
    `She likes hiking, swimming, and to bike.`,
    `She likes hiking, swimming, and biking.`,
    `She likes to hike, swim, and bike.`,
  ], 0, `Parallel-structure rule: items in a series must share the same grammatical form. "Hiking, swimming, and to bike" mixes -ing nouns with an infinitive. Use all -ing forms (second sentence) or all infinitives (third sentence); both are correct.`),

  U(43, 4, [
    `Yesterday I laid on the couch all afternoon.`,
    `Yesterday I lay on the couch all afternoon.`,
    `I have lain on this couch many times.`,
  ], 0, `Lie/lay rule, past tense: the past of "lie" (to recline) is "lay," and its participle is "lain." "Laid" is the past of "lay" (to place) and requires an object. "I laid on the couch" has no object, so it must be "I lay." Trap: the confusing overlap, where "lay" is both the present of one verb and the past of the other.`),

  U(44, 4, [
    `Fewer students than expected signed up for the trip.`,
    `The teacher, as well as the students, was surprised.`,
    `Whom should we thank for the gift?`,
  ], 3, `All three sentences are correct. "Fewer" is right for countable students; "as well as" does not make the subject plural, so "teacher...was" agrees; and "whom" is the object of "thank" (we should thank him). The trap is the second sentence, which sounds like it should take "were."`),

  U(45, 4, [
    `The soup tastes deliciously.`,
    `The soup tastes delicious.`,
    `She tasted the soup carefully.`,
  ], 0, `Linking-verb rule: after a linking verb such as "tastes," "feels," "seems," or "looks," use an adjective that describes the subject: "The soup tastes delicious." "Deliciously" would describe the act of tasting, which the soup is not doing. In the third sentence, "tasted" is an action verb, so the adverb "carefully" is correct.`),

  U(46, 4, [
    `The new rule will affect everyone.`,
    `The weather affected our plans.`,
    `The weather had an effect on our plans.`,
  ], 3, `All three sentences are correct. "Affect" is almost always the verb meaning to influence, and "effect" is almost always the noun meaning a result. The first two sentences need a verb, so "affect/affected" is right; the third needs a noun after "an," so "effect" is right.`),

  U(47, 5, [
    `If I was taller, I would play center.`,
    `If I were taller, I would play center.`,
    `I wish I were taller.`,
  ], 0, `Subjunctive rule: for a wish or an "if" condition that is contrary to fact, use "were" with every subject, including "I" and "he." The speaker is not taller, so it must be "If I were taller." The third sentence correctly uses "were" after "wish." Trap: "I was" is correct only for a real past event, as in "If I was late, I apologize."`),

  U(48, 5, [
    `She is the candidate who I think will win.`,
    `She is the candidate whom I think will win.`,
    `She is the candidate whom I support.`,
  ], 1, `Who/whom with an interrupting phrase: ignore "I think" and look at the clause "___ will win." The pronoun is the subject of "will win," so it must be "who." The third sentence is correct because the pronoun is the object of "support." Trap: "I think" makes students assume the pronoun is an object.`),

  U(49, 5, [
    `He is one of the students who has won the award.`,
    `He is one of the students who have won the award.`,
    `He is the only one of the students who has won the award.`,
  ], 0, `Relative-clause agreement: "who" takes its number from its antecedent. In "one of the students who...," the antecedent is "students" (several students have won), so the verb must be "have." The third sentence is the famous exception: "the only one of...who" refers to the single person, so "has" is correct there.`),

  U(50, 5, [
    `Neither of the answers is correct.`,
    `A number of students were absent.`,
    `Hardly anyone noticed the mistake.`,
  ], 3, `All three sentences are correct. "Neither" is singular, so "is" is right; "a number of" means "several" and is plural, so "were" is right; and "hardly anyone" contains only one negative. The trap is the contrast between "a number of" (plural) and "the number of" (singular).`),

  U(51, 5, [
    `Us students deserve a longer lunch.`,
    `We students deserve a longer lunch.`,
    `The principal met with us students.`,
  ], 0, `Pronoun-with-appositive rule: when a pronoun is followed by a noun that renames it, choose the case the pronoun would have alone. "Us deserve a longer lunch" is wrong, so it must be "We students." In the third sentence, "met with us" is correct, so "us students" is right there.`),

  U(52, 5, [
    `No one in the class works harder than she.`,
    `He is as tall as I am.`,
    `The award went to whomever worked hardest.`,
  ], 2, `Whoever/whomever rule: the pronoun's case comes from its role inside its own clause, not from the preposition before the clause. In "___ worked hardest," the pronoun is the subject, so it must be "whoever," even though the whole clause is the object of "to." The first sentence is correct in formal usage because "than she [does]" has an implied verb.`),

  U(53, 3, [
    `The glass had broke before I touched it.`,
    `The glass broke before I touched it.`,
    `The glass had been broken before I touched it.`,
  ], 0, `Irregular-verb rule: break, broke, broken. After "had," use the past participle "broken," so it must be "had broken." "Broke" is only the simple past, as used correctly in the second sentence.`),

  U(54, 3, [
    `The students waiting outside the office for the bell to ring.`,
    `The students waited outside the office for the bell to ring.`,
    `Waiting outside the office, the students listened for the bell.`,
  ], 0, `Fragment rule: an -ing form alone cannot be the main verb of a sentence. "The students waiting outside the office" has a subject but no complete verb, so it is a fragment. Changing "waiting" to "waited" (second sentence) or adding a main verb like "listened" (third sentence) fixes it.`),

  U(55, 4, [
    `Either the coach or the players is responsible.`,
    `Either the players or the coach is responsible.`,
    `Either the coach or the players are responsible.`,
  ], 0, `Either/or agreement rule: the verb agrees with the subject closer to it. In the first sentence, the nearer subject is "players," so the verb must be "are." The second sentence correctly uses "is" because "coach" is nearer, and the third correctly uses "are" because "players" is nearer.`),

  U(56, 3, [
    `Can you borrow me a pencil?`,
    `Can you lend me a pencil?`,
    `May I borrow a pencil?`,
  ], 0, `Borrow/lend rule: you "borrow" something from someone and "lend" something to someone. The speaker wants the other person to give the pencil, so the verb must be "lend." The third sentence correctly uses "borrow" because the speaker is the one receiving.`),

  U(57, 4, [
    `A large amount of people attended.`,
    `A large number of people attended.`,
    `A large amount of rain fell.`,
  ], 0, `Amount/number rule: like "less" and "fewer," "amount" goes with things that cannot be counted and "number" with things that can. "People" are countable, so it must be "a large number of people." "Rain" cannot be counted, so "amount of rain" in the third sentence is correct.`),

  U(58, 2, [
    `I seen that movie twice.`,
    `I have seen that movie twice.`,
    `I saw that movie twice.`,
  ], 0, `Irregular-verb rule: see, saw, seen. "Seen" is a past participle and must follow a helping verb such as "have." By itself, the past tense is "saw." Both "have seen" and "saw" are correct.`),

  U(59, 3, [
    `She has fewer absences than anyone else.`,
    `The puppy chased its tail in circles.`,
    `Carlos and I will present first.`,
  ], 3, `All three sentences are correct. "Fewer" is right for countable absences; "its" is the possessive; and "Carlos and I" is the subject form. The trap is "Carlos and I," which some students wrongly change to "Carlos and me," but dropping "Carlos" shows "I will present" is right.`),

  U(60, 2, [
    `We went to the museum yesterday.`,
    `My brother is taller than I am.`,
    `She doesn't like spinach.`,
  ], 3, `All three sentences are correct. "Went" is the simple past used with "yesterday"; "than I am" uses the subject pronoun with its verb; and "doesn't" agrees with the singular subject "she." The trap is "doesn't," which students sometimes confuse with the plural form "don't."`),
];

// ---------------------------------------------------------------------------
// SPELLING (25)
// ---------------------------------------------------------------------------
const spelling = [
  S(1, 2, [
    `I recieved a letter from my pen pal.`,
    `We will probably leave at noon.`,
    `The library closes at eight.`,
  ], 0, `"I before e except after c": the correct spelling is "received," with the e before the i because the pair follows a c. "Probably" and "library" are both spelled correctly; students often drop the middle syllable and write "probly" or "libary," so check that every syllable is present.`),

  S(2, 2, [
    `My favorite month is February.`,
    `She was suprised by the party.`,
    `He is a very good athlete.`,
  ], 1, `The word is "surprised," with an r after the u: sur-prised. Speakers often swallow the first r, so the misspelling "suprised" is common. "February" (with its silent-sounding r) and "athlete" (two syllables, not "ath-e-lete") are both correct.`),

  S(3, 2, [
    `Please separate the recycling from the trash.`,
    `Are you comming to the game tomorrow?`,
    `Our neighbor has a new puppy.`,
  ], 1, `Doubling rule: "come" ends in silent e, so you drop the e and add -ing without doubling the m: "coming." Doubling applies to short-vowel words like "run/running," not to words ending in silent e. "Separate" (there is "a rat" in the middle) and "neighbor" (ei after a hard g sound) are correct.`),

  S(4, 2, [
    `I believe the store opens at nine.`,
    `We finally finished the puzzle.`,
    `Her writing has improved this year.`,
  ], 3, `All three words are spelled correctly. "Believe" follows "i before e"; "finally" keeps both l's because "final" plus "-ly" adds a second l; and "writing" drops the silent e from "write" before -ing without doubling the t. The trap is "writing," which students confuse with "written" (double t).`),

  S(5, 2, [
    `Wensday is the middle of the week.`,
    `I usually eat cereal for breakfast.`,
    `The weather is pleasant today.`,
  ], 0, `"Wednesday" contains a silent d: Wed-nes-day. Saying the word in three syllables as you spell it keeps the d in place. "Usually" (usual + ly, with the double l) and "pleasant" (ea, not just e) are both correct.`),

  S(6, 2, [
    `Thank you for the beautiful gift.`,
    `He is to tired to finish his homework.`,
    `We are truly grateful for your help.`,
  ], 1, `Homophone rule: "too" with two o's means "excessively" or "also," while "to" is the preposition or infinitive marker. "Too tired" means "excessively tired," so the double-o spelling is required. "Truly" (no e, unlike "true") and "grateful" (not "greatful") are correct.`),

  S(7, 3, [
    `The goverment passed a new law.`,
    `She is an independent thinker.`,
    `It is necessary to wear a helmet.`,
  ], 0, `"Government" contains the word "govern" plus "-ment," so the n must stay: govern-ment. The n is barely heard in speech, which is why it disappears in writing. "Independent" (ends in -ent) and "necessary" (one c, two s's; remember "one collar, two sleeves") are correct.`),

  S(8, 3, [
    `The drummer kept a steady rhythm.`,
    `The magician made the coin disappear.`,
    `That is a wierd noise.`,
  ], 2, `"Weird" is one of the famous exceptions to "i before e": it is spelled w-e-i-r-d. The trap is applying the rule too broadly. "Rhythm" (no vowels except y) and "disappear" (dis + appear, one s and two p's) are correct.`),

  S(9, 3, [
    `We must protect the environment.`,
    `They had a long arguement about the rules.`,
    `The meeting begins at noon.`,
  ], 1, `Silent-e exception: "argue" drops its e before "-ment," giving "argument." This breaks the usual pattern (as in "amusement"), so it must be memorized. "Environment" keeps its n (environ-ment), and "begins" has a single n because no suffix starting with a vowel is added.`),

  S(10, 3, [
    `It was an embarassing moment.`,
    `A birthday is a special occasion.`,
    `Mark the date on the calendar.`,
  ], 0, `"Embarrassing" has two r's and two s's: em-bar-rass-ing. The trap is dropping one of the doubled letters. "Occasion" (two c's, one s) and "calendar" (ends in -ar, not -er) are correct.`),

  S(11, 3, [
    `I definitely want to see that movie.`,
    `She will succeed if she keeps practicing.`,
    `The restaurant serves breakfast all day.`,
  ], 3, `All three words are spelled correctly. "Definitely" contains "finite" (de-finite-ly) and has no a; "succeed" has double c and double e; and "restaurant" keeps the "au" even though it is barely pronounced. The trap is "definitely," which is one of the most commonly misspelled words in English.`),

  S(12, 3, [
    `The hotel can accomodate two hundred guests.`,
    `We ate at a fancy restaurant.`,
    `The beginning of the story is slow.`,
  ], 0, `"Accommodate" has two c's and two m's; the memory trick is that the word is big enough to accommodate both pairs. "Beginning" correctly doubles the n because "begin" ends in a stressed short vowel plus a single consonant.`),

  S(13, 3, [
    `Please check your work carefully.`,
    `Lightning struck the old oak tree.`,
    `The ceremony was held at the cemetary.`,
  ], 2, `"Cemetery" is spelled with three e's and no a: cem-e-ter-y. The -ary ending is a common trap because of words like "library." "Lightning" (the weather) has no e, unlike "lightening" (making lighter), and "carefully" keeps both l's.`),

  S(14, 3, [
    `Her knowledge of history is impressive.`,
    `It is a privilege to meet you.`,
    `Can you garantee the delivery date?`,
  ], 2, `"Guarantee" begins with "gua-," keeping the silent u after the g, just as in "guard." The trap is spelling it the way it sounds. "Knowledge" (with its silent k and d) and "privilege" (ends in -ege, with no d) are both correct.`),

  S(15, 3, [
    `I would recomend this book to anyone.`,
    `The committee meets on Tuesdays.`,
    `Our business is growing.`,
  ], 0, `"Recommend" is re + commend, so it has one c and two m's. Students often reverse this to "reccomend" or drop an m entirely. "Committee" (double m, double t, double e) and "business" (busi-ness, with the i) are correct.`),

  S(16, 3, [
    `The mischievous puppy chewed my shoe.`,
    `His height surprised the coach.`,
    `Please write your address clearly.`,
  ], 3, `All three words are spelled correctly. "Mischievous" has only three syllables (mis-chie-vous) and no extra i before -ous; "height" uses "ei," breaking the usual pattern; and "address" has double d and double s. The trap is "mischievous," which is often mispronounced and then misspelled as "mischievious."`),

  S(17, 4, [
    `He is a man of good judgment.`,
    `The two roads run parallel to each other.`,
    `Her perseverence paid off.`,
  ], 2, `"Perseverance" ends in -ance, not -ence; it comes from "persevere" plus "-ance," like "endurance." The -ence/-ance choice must be memorized word by word. "Judgment" (the standard American spelling, without an e after the g) and "parallel" (one r, double l, then single l) are correct.`),

  S(18, 4, [
    `Please fill out this questionnaire.`,
    `His pronounciation of the word was wrong.`,
    `The company hopes to acquire a rival.`,
  ], 1, `"Pronunciation" drops the second o found in "pronounce": pro-nun-ci-a-tion. The trap is building the noun directly from the verb. "Questionnaire" (double n) and "acquire" (with the c before q, as in "acquaint") are correct.`),

  S(19, 4, [
    `A guilty conscience kept him awake.`,
    `She spoke with great confidence.`,
    `The change was barely noticable.`,
  ], 2, `Soft-c rule: "notice" keeps its silent e before "-able" so the c continues to sound like s: "noticeable." Without the e, the c would sound like k. The same rule produces "changeable" and "manageable." "Conscience" (con + science) and "confidence" are correct.`),

  S(20, 4, [
    `The car needs regular maintainance.`,
    `It was a strange occurrence.`,
    `She doubted the existence of ghosts.`,
  ], 0, `"Maintenance" is spelled main-te-nance, not "maintain" plus "-ance"; the middle vowel changes to e. The trap is assuming the noun keeps the verb's spelling. "Occurrence" (double c, double r, -ence) and "existence" (-ence, not -ance) are correct.`),

  S(21, 4, [
    `The vacuum cleaner is in the closet.`,
    `He is familiar with the neighborhood.`,
    `She obtained her driver's license last week.`,
  ], 3, `All three words are spelled correctly. "Vacuum" has one c and two u's; "familiar" has one l; and "license" in American English ends in -se with a c in the middle. The trap is "vacuum," which students often spell with a double c.`),

  S(22, 4, [
    `Please respond immediately.`,
    `The play was a tremendous sucess.`,
    `She wrote a sincere apology.`,
  ], 1, `"Success" has double c and double s: suc-cess. Dropping either pair is a common error. "Immediately" (double m, then -ately) and "sincere" (one c, ending in -ere) are correct.`),

  S(23, 5, [
    `The soldiers showed great camaraderie.`,
    `The bureaucracy slowed the process.`,
    `Her liason with the press was effective.`,
  ], 2, `"Liaison" has an i on both sides of the a: li-ai-son. The word comes from French, and the trap is dropping the second i because it is not clearly heard. "Camaraderie" (cam-a-ra-de-rie) and "bureaucracy" (bureau + cracy) are correct despite their unusual vowel strings.`),

  S(24, 5, [
    `The committee reached a concensus.`,
    `The millennium began with celebrations.`,
    `The entrepreneur launched a startup.`,
  ], 0, `"Consensus" is spelled with an s in the middle: con-sen-sus. It is related to "consent," not to "census," which is the trap. "Millennium" (double l, double n) and "entrepreneur" (entre-pre-neur) are correct.`),

  S(25, 5, [
    `The lieutenant saluted the colonel.`,
    `We walked through the picturesque village.`,
    `The conscientious student reviewed every answer.`,
  ], 3, `All three words are spelled correctly. "Lieutenant" keeps the French "lieu"; "colonel" is pronounced "kernel" but spelled with an l; "picturesque" ends in -esque; and "conscientious" contains "conscien-" like "conscience." The trap is "colonel," whose spelling and pronunciation do not match at all.`),
];

// ---------------------------------------------------------------------------
// COMPOSITION (25)
// ---------------------------------------------------------------------------
const cmp = (n, level, stem, choices, answer, explanation) => ({
  id: `hspt-cmp-${pad(n)}`,
  test: 'hspt',
  section: 'language',
  skill: 'composition',
  level,
  stem,
  choices,
  answer,
  explanation,
});

const JOIN = 'Choose the best word or words to join the thoughts together.';
const CLEAR = 'Which of these expresses the idea most clearly?';
const NOTBELONG = 'Which sentence does NOT belong in the paragraph?';

const composition = [
  cmp(1, 2, `${JOIN}\nI forgot my umbrella; ______, I got soaked on the way home.`,
    ['however', 'as a result', 'for instance', 'otherwise'], 1,
    `Transition rule: pick the connector that names the logical relationship. Getting soaked is the consequence of forgetting the umbrella, so a cause-and-effect transition ("as a result") fits. "However" signals contrast, "for instance" introduces an example, and "otherwise" means "if not," none of which matches the relationship between these two thoughts.`),

  cmp(2, 2, `${JOIN}\nThe trail was steep and rocky; ______, the view from the summit made the climb worthwhile.`,
    ['however', 'therefore', 'for example', 'meanwhile'], 0,
    `Transition rule: the second thought pushes against the first (hard climb, but worth it), so a contrast word is needed: "however." "Therefore" would wrongly claim the view was caused by the difficulty, and "for example" and "meanwhile" (which marks simultaneous time) do not express contrast.`),

  cmp(3, 3, `${JOIN}\nMany animals are active at night. ______, owls hunt in the dark.`,
    ['Therefore', 'In contrast', 'For example', 'Nevertheless'], 2,
    `Transition rule: the second sentence gives a specific case of the general statement in the first, so an example transition is needed: "For example." "Therefore" implies a conclusion drawn from evidence, and "In contrast" and "Nevertheless" both signal opposition, which is not present.`),

  cmp(4, 3, `${JOIN}\nThe band played on the stage; ______, the crowd danced in the field below.`,
    ['in conclusion', 'meanwhile', 'otherwise', 'for instance'], 1,
    `Transition rule: two actions happening at the same time are joined by a time transition such as "meanwhile." "In conclusion" wraps up an argument, "otherwise" introduces an alternative outcome, and "for instance" introduces an example; none describes simultaneous events.`),

  cmp(5, 3, `${JOIN}\nYou must finish your chores; ______, you may not go to the party.`,
    ['otherwise', 'similarly', 'furthermore', 'likewise'], 0,
    `Transition rule: "otherwise" means "if that does not happen," which exactly connects a requirement to its penalty. "Similarly" and "likewise" signal that the second idea resembles the first, and "furthermore" adds a supporting point; none expresses a condition.`),

  cmp(6, 4, `${JOIN}\nThe museum's new wing is impressive; ______, it was built entirely with donated funds.`,
    ['on the other hand', 'consequently', 'moreover', 'in spite of this'], 2,
    `Transition rule: the second thought adds a further point in favor of the wing, so an addition transition ("moreover") fits. "On the other hand" and "in spite of this" signal contrast, and "consequently" would wrongly claim the donations resulted from the wing being impressive.`),

  cmp(7, 4, `${JOIN}\nCats are independent and need little attention; dogs, ______, require daily walks and companionship.`,
    ['similarly', 'in addition', 'on the other hand', 'as a result'], 2,
    `Transition rule: the sentence contrasts two animals, so a contrast transition ("on the other hand") is needed in the middle of the second clause. "Similarly" and "in addition" claim the two ideas agree, and "as a result" claims the dogs' needs are caused by the cats' independence, which is illogical.`),

  cmp(8, 5, `${JOIN}\nThe committee reviewed every application carefully; ______, a few errors slipped through.`,
    ['accordingly', 'nonetheless', 'hence', 'in other words'], 1,
    `Transition rule: errors slipping through despite careful review is an unexpected result, so a concession transition ("nonetheless") is required. "Accordingly" and "hence" both mean "as a result," which would wrongly say that care caused the errors, and "in other words" restates rather than contrasts.`),

  cmp(9, 2, `${JOIN}\nFirst, crack the eggs into the bowl. ______, whisk them until they are smooth.`,
    ['Finally', 'Next', 'In contrast', 'Because'], 1,
    `Sequence rule: directions use time-order transitions, and after "First" the natural next step is "Next" (or "Then"). "Finally" marks the last step, but whisking is clearly not the end of a recipe. "In contrast" signals opposition, and "Because" would make the sentence a fragment.`),

  cmp(10, 2, `Which of these sentences best fits under the topic "How to care for a pet goldfish"?`,
    [`Goldfish come in many colors and sizes.`,
     `Change about a quarter of the tank's water every week.`,
     `My cousin has a cat named Pepper.`,
     `Fish were kept as pets in ancient China.`], 1,
    `Topic-fit rule: the sentence must support the specific topic, which is about caring for the fish. Only the water-changing instruction tells how to care for a goldfish. The trap is the first sentence, which is about goldfish but describes their appearance rather than their care; the others drift to cats and to history.`),

  cmp(11, 3, `Which of these sentences best fits under the topic "The benefits of a later school start time"?`,
    [`Many high schools begin classes before 8:00 a.m.`,
     `Students who sleep more tend to earn higher grades and have fewer car accidents.`,
     `Some students take the bus, while others walk.`,
     `The school cafeteria serves breakfast until 7:45.`], 1,
    `Topic-fit rule: the topic asks for benefits, so the right sentence must name a positive result of starting later. Better grades and fewer accidents from more sleep do exactly that. The trap is the first sentence, which is related background about start times but states no benefit; the other two are off topic.`),

  cmp(12, 3, `Which of these sentences best fits under the topic "The history of the bicycle"?`,
    [`Bicycle helmets should be worn on every ride.`,
     `The first pedal-powered bicycle appeared in the 1860s.`,
     `Mountain bikes have thick tires for rough trails.`,
     `My neighbor rides her bike to work every day.`], 1,
    `Topic-fit rule: a history topic calls for a fact about the past, so the sentence dating the first pedal-powered bicycle fits. The other choices are all about bicycles, which is the trap, but they discuss safety advice, present-day equipment, and a personal anecdote rather than history.`),

  cmp(13, 4, `Which of these sentences best fits under the topic "Why the city should build more bike lanes"?`,
    [`Bike lanes are painted with a special green color in some cities.`,
     `Cities with protected bike lanes report fewer collisions between cars and cyclists.`,
     `Bicycles were invented in Europe in the nineteenth century.`,
     `Many people enjoy riding bikes on the weekend.`], 1,
    `Persuasive-support rule: a "why we should" topic needs a reason or piece of evidence. The safety statistic gives a concrete reason for building lanes. The first sentence is the trap because it mentions bike lanes but only describes their color, which does not argue for building more; the others are off-topic history and preference.`),

  cmp(14, 4, `Which of these sentences best fits under the topic "How honeybees communicate"?`,
    [`Honey is sweeter than most sugar substitutes.`,
     `A bee returning to the hive performs a "waggle dance" that tells others where to find flowers.`,
     `Beekeepers wear protective suits when they collect honey.`,
     `Bees are insects with six legs and four wings.`], 1,
    `Topic-fit rule: the topic is communication, so the sentence must describe how bees send information. The waggle dance is a communication method. The last sentence is the trap: it is a fact about bees, but about their body, not their communication. The others concern honey and beekeepers.`),

  cmp(15, 5, `Which of these sentences best fits under the topic "The effects of the printing press on European society"?`,
    [`Johannes Gutenberg was born in Mainz, Germany.`,
     `Books in the Middle Ages were copied by hand in monasteries.`,
     `Because printed books were cheap and plentiful, literacy spread beyond the clergy and nobility.`,
     `Modern printers use lasers instead of movable type.`], 2,
    `Topic-fit rule: the topic asks specifically for effects, so the sentence must state a change the press caused. The spread of literacy is such an effect. The second sentence is the strongest trap: it is relevant background about life before the press, but it describes a cause, not an effect. The inventor's birthplace and modern printers are off topic.`),

  cmp(16, 2, `${NOTBELONG}\n(1) Our class planted a vegetable garden behind the school. (2) We grew tomatoes, beans, and peppers. (3) My favorite video game came out last week. (4) In June, we harvested the vegetables for the cafeteria.`,
    ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'], 2,
    `Unity rule: every sentence in a paragraph must support the main idea, here the class garden. Sentence 3 is about a video game and has nothing to do with the garden. Sentences 2 and 4 both give details about what was grown and what happened to the harvest, so they belong.`),

  cmp(17, 3, `${NOTBELONG}\n(1) The Great Wall of China stretches for thousands of miles. (2) It was built over many centuries to protect against invaders. (3) China is also famous for its giant pandas. (4) Today, millions of tourists walk along its ancient stones each year.`,
    ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'], 2,
    `Unity rule: the paragraph is about the Great Wall, and Sentence 3 switches to pandas. The trap is that pandas are also connected to China, but the paragraph's topic is the Wall, not China in general. Sentence 4 belongs because "its ancient stones" still refers to the Wall.`),

  cmp(18, 3, `${NOTBELONG}\n(1) Volcanoes form where molten rock rises through cracks in Earth's crust. (2) When pressure builds, the volcano may erupt, sending ash and lava into the air. (3) Earthquakes can also cause great damage to cities. (4) Over time, layers of hardened lava build the volcano's cone shape.`,
    ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'], 2,
    `Unity rule: the paragraph explains how volcanoes form and erupt. Sentence 3 shifts to earthquakes, a different natural disaster. The trap is that earthquakes and volcanoes are both geology topics, but a paragraph needs one controlling idea, and Sentence 4 shows the paragraph is still about the volcano's shape.`),

  cmp(19, 4, `${NOTBELONG}\n(1) Marie Curie was the first person to win two Nobel Prizes. (2) She discovered the elements polonium and radium. (3) Many scientists today work in large laboratories funded by universities. (4) Curie's research on radioactivity changed the field of physics.`,
    ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'], 2,
    `Unity rule: the paragraph is about Marie Curie's achievements. Sentence 3 is a general statement about modern scientists and never mentions Curie. The trap is that it sounds scientific and serious, but relevance is about the topic, not the tone. Sentences 2 and 4 both describe her specific accomplishments.`),

  cmp(20, 4, `${NOTBELONG}\n(1) Recycling aluminum cans saves a remarkable amount of energy. (2) Producing a can from recycled metal uses about five percent of the energy needed to make one from raw ore. (3) Aluminum is also used to build airplanes because it is light and strong. (4) That savings is why many cities now collect cans separately from other trash.`,
    ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'], 2,
    `Unity rule: the controlling idea is the energy saved by recycling cans. Sentence 3 is about aluminum in airplanes, which concerns the metal's properties, not recycling. The trap is the shared word "aluminum." Sentence 4 belongs because "That savings" points directly back to the energy figure in Sentence 2.`),

  cmp(21, 5, `${NOTBELONG}\n(1) The Roman aqueducts carried fresh water to cities across the empire. (2) Engineers built them with a gentle, steady slope so water flowed by gravity alone. (3) Some aqueducts stretched more than fifty miles from mountain springs to urban fountains. (4) Roman roads were so well built that some are still in use today.`,
    ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'], 3,
    `Unity rule: the paragraph's topic is Roman aqueducts specifically, and Sentences 2 and 3 develop that topic with details about slope and length. Sentence 4 switches to roads. The trap is that roads and aqueducts are both examples of Roman engineering, so the sentence feels related, but a paragraph about aqueducts cannot absorb a sentence that never mentions them.`),

  cmp(22, 2, `Clarity set 1 — ${CLEAR}`,
    [`Walking to school, the rain soaked my backpack.`,
     `My backpack got soaked by the rain while walking to school.`,
     `While I was walking to school, the rain soaked my backpack.`,
     `The rain, while walking to school, soaked my backpack.`], 2,
    `Clarity rule: a modifying phrase must clearly attach to the person doing the action. Only the third version names the walker ("I") in a full clause. The first and fourth make the rain do the walking, and the second makes the backpack walk; those are dangling or misplaced modifiers, a favorite HSPT trap.`),

  cmp(23, 3, `Clarity set 2 — ${CLEAR}`,
    [`The teacher handed the essays back to the students that were graded.`,
     `The teacher handed back to the students the essays that were graded.`,
     `The teacher handed the graded essays back to the students.`,
     `Graded, the teacher handed the essays back to the students.`], 2,
    `Clarity rule: place a modifier next to the word it describes. "Graded" describes the essays, and only the third version puts it there. The first suggests the students were graded, the fourth suggests the teacher was graded, and the second is correct in meaning but awkwardly separates the verb from its object.`),

  cmp(24, 4, `Clarity set 3 — ${CLEAR}`,
    [`Due to the fact that it was raining, the game was canceled by the officials.`,
     `Because of rain, the officials canceled the game.`,
     `The officials, due to the fact of rain, canceled the game.`,
     `The game, because it was raining, was canceled by officials who were there.`], 1,
    `Concision rule: the clearest sentence uses the fewest words that preserve the meaning and puts the actor in the subject position. "Because of rain, the officials canceled the game" is direct and active. "Due to the fact that" is a wordy substitute for "because," and the passive constructions in the other versions bury the people who acted.`),

  cmp(25, 5, `Clarity set 4 — ${CLEAR}`,
    [`Although the experiment failed, the scientists learned valuable lessons from it, which were many.`,
     `The experiment failed; the scientists learned many valuable lessons from it, although.`,
     `Although the experiment failed, the scientists learned many valuable lessons from it.`,
     `The scientists, although the experiment failed, from it learned many valuable lessons.`], 2,
    `Clarity rule: subordinate the lesser idea with a well-placed conjunction and keep modifiers next to the words they describe. The third version does that cleanly. The first tacks on a clumsy "which were many"; the second strands "although" at the end, where it modifies nothing; and the fourth scatters the phrases so the reader must reassemble the sentence.`),
];

// ---------------------------------------------------------------------------
// WRITING PROMPTS (36)
// ---------------------------------------------------------------------------
const wp = (id, test, level, type, prompt, minutes, tips, rubric) => ({ id, test, level, type, prompt, minutes, tips, rubric });

const SSAT_ELEM_TIPS = [
  'Read the story starter twice, then decide on one problem your character will face and how it ends before you write a word.',
  'Give your main character a name and one clear wish or worry so the reader cares what happens.',
  'Use your five senses: tell what the character sees, hears, smells, or touches in at least two places.',
  'Save the last three minutes to reread and fix capital letters, end marks, and any word that looks wrong.',
];
const SSAT_ELEM_RUBRIC = [
  'Continues naturally from the given first sentence and tells one complete story with a beginning, middle, and end.',
  'Includes a clear problem or goal and shows how it is resolved.',
  'Uses specific, sensory details and some dialogue rather than only summary.',
  'Sentences are complete and varied in length; capitalization and end punctuation are correct.',
  'Handwriting or typing is legible and the response is organized in paragraphs.',
];

const SSAT_MID_TIPS = [
  'Spend three minutes planning: who is the narrator, what goes wrong, what changes by the end?',
  'Start close to the action. Do not spend a paragraph waking up and eating breakfast.',
  'Show feelings through actions and dialogue instead of announcing them ("she was scared").',
  'Choose one moment to slow down and describe in detail; that is where the story earns its ending.',
  'Leave two minutes to proofread for run-ons, comma splices, and shifting verb tenses.',
];
const SSAT_MID_RUBRIC = [
  'Responds directly to the prompt and develops a single, focused narrative with a clear arc.',
  'Creates a believable narrator or character whose choices drive the plot.',
  'Uses vivid, precise language, sensory detail, and purposeful dialogue.',
  'Varies sentence structure and controls pacing (slows down at the key moment).',
  'Demonstrates command of grammar, usage, and punctuation with few or no errors.',
  'Ends with a resolution or realization that feels earned rather than abrupt.',
];

const SSAT_UP_CREATIVE_TIPS = [
  'Decide in the first two minutes whether the prompt works better as a realistic story or something imaginative, and commit.',
  'Build the story around one decision your character must make; tension comes from the choice, not from explosions.',
  'Open with a concrete image or line of dialogue, not with background information.',
  'Use specific nouns and strong verbs; cut adverbs that repeat what the verb already says.',
  'Reserve the final two minutes to check tense consistency and paragraph breaks.',
];
const SSAT_UP_PERSUASIVE_TIPS = [
  'Take a clear position in your first paragraph and name the two or three reasons you will develop.',
  'Support each reason with a specific example: a personal experience, a historical event, a book, or a current issue.',
  'Address the strongest objection to your view and explain why your position still holds.',
  'Use transitions (moreover, however, consequently) to make the logic visible to the reader.',
  'Conclude by showing why the question matters beyond your own life.',
];
const SSAT_UP_CREATIVE_RUBRIC = [
  'Interprets the prompt thoughtfully and sustains a focused, original narrative.',
  'Develops character and conflict with depth; the resolution follows from the character\'s choices.',
  'Controls tone and pacing deliberately; detail is selective and purposeful.',
  'Uses sophisticated, precise vocabulary and varied syntax without sounding forced.',
  'Displays strong command of conventions; errors, if any, do not distract.',
];
const SSAT_UP_PERSUASIVE_RUBRIC = [
  'States a clear, arguable thesis and maintains it throughout.',
  'Supports the thesis with well-chosen, specific evidence from experience, reading, or observation.',
  'Organizes reasons logically with effective transitions between paragraphs.',
  'Acknowledges and responds to a counterargument.',
  'Writes in a confident, mature voice with precise diction and varied sentence structure.',
  'Demonstrates control of grammar, usage, and mechanics.',
];

const ISEE_LOWER_TIPS = [
  'Answer the question directly in your first sentence so the reader knows your main idea right away.',
  'Pick two or three reasons or examples and give each one its own paragraph.',
  'Use real details from your own life: names, places, and exactly what happened.',
  'Finish with a sentence that tells why your answer matters to you.',
];
const ISEE_LOWER_RUBRIC = [
  'Clearly answers the question asked and stays on topic the whole way through.',
  'Gives specific reasons or examples, each developed with detail.',
  'Organizes ideas into paragraphs with a beginning, middle, and end.',
  'Uses complete sentences with correct capitalization, punctuation, and spelling.',
  'Shows the writer\'s own voice and genuine thinking.',
];
const ISEE_MID_TIPS = [
  'Take two minutes to outline: thesis, three supporting points, conclusion. Schools read this essay to see how you think.',
  'Be specific. "My coach taught me discipline" is weak; the morning she made you redo a drill in the rain is strong.',
  'Use one paragraph per main idea and begin each with a topic sentence.',
  'Vary your sentence openings; do not begin every sentence with "I."',
  'Save three minutes to proofread for agreement, tense, and apostrophes.',
];
const ISEE_MID_RUBRIC = [
  'Presents a clear thesis that directly answers the prompt.',
  'Develops each supporting point with concrete, personal, or observed detail.',
  'Organizes paragraphs logically with topic sentences and smooth transitions.',
  'Maintains a consistent, appropriate voice for an admissions reader.',
  'Uses varied sentence structure and precise word choice.',
  'Demonstrates strong control of grammar and mechanics.',
];
const ISEE_UP_TIPS = [
  'Treat the prompt as a question about your values; the best essays reveal how you reason, not just what you prefer.',
  'Choose depth over breadth: one well-developed example beats three shallow ones.',
  'Consider the other side briefly to show intellectual honesty, then explain why your view stands.',
  'Write a conclusion that extends the idea rather than repeating the introduction.',
  'Proofread for parallel structure, pronoun agreement, and comma splices.',
];
const ISEE_UP_RUBRIC = [
  'Articulates a nuanced, clearly stated position in response to the prompt.',
  'Supports the position with specific, well-analyzed examples and explains their significance.',
  'Demonstrates reflective thinking, including awareness of complexity or counterpoints.',
  'Organizes the essay purposefully with effective transitions and a conclusion that adds insight.',
  'Employs mature, precise diction and varied syntax; avoids cliché.',
  'Exhibits near-flawless command of grammar, usage, and punctuation.',
];

const HSPT_TIPS = [
  'State your position in one clear sentence at the end of your introduction.',
  'Give two or three reasons, each with a specific example, and put each in its own paragraph.',
  'Anticipate one objection and answer it in a sentence or two.',
  'Use transitions such as "first," "in addition," and "however" to guide the reader.',
  'Spend the last two minutes checking subject-verb agreement, pronouns, and end punctuation.',
];
const HSPT_RUBRIC = [
  'Takes a clear, consistent position on the issue.',
  'Supports the position with specific reasons and concrete examples.',
  'Organizes the argument into logical paragraphs with transitions.',
  'Addresses a counterargument fairly.',
  'Uses correct grammar, usage, spelling, and punctuation, reflecting the skills tested in the HSPT Language section.',
];

const writingPrompts = [
  // SSAT Elementary (6)
  wp('wp-ssat-elem-01', 'ssat', 1, 'creative', 'Write a story that begins: The door at the end of the hall had never been opened before.', 15, SSAT_ELEM_TIPS, SSAT_ELEM_RUBRIC),
  wp('wp-ssat-elem-02', 'ssat', 1, 'creative', 'Write a story that begins: When I opened my lunchbox, something inside it moved.', 15, SSAT_ELEM_TIPS, SSAT_ELEM_RUBRIC),
  wp('wp-ssat-elem-03', 'ssat', 1, 'creative', 'Look at this picture in your mind: a small boat tied to a dock at sunrise, with a backpack sitting in it. Write a story about who left the backpack and what happens next.', 15, SSAT_ELEM_TIPS, SSAT_ELEM_RUBRIC),
  wp('wp-ssat-elem-04', 'ssat', 2, 'creative', 'Write a story that begins: The snow had covered everything except one set of footprints.', 15, SSAT_ELEM_TIPS, SSAT_ELEM_RUBRIC),
  wp('wp-ssat-elem-05', 'ssat', 2, 'creative', 'Write a story that begins: Nobody believed me when I said the garden gnome had changed places during the night.', 15, SSAT_ELEM_TIPS, SSAT_ELEM_RUBRIC),
  wp('wp-ssat-elem-06', 'ssat', 2, 'creative', 'Imagine a picture of a crowded school bus with one empty seat and a wrapped package sitting on it. Write a story about the package.', 15, SSAT_ELEM_TIPS, SSAT_ELEM_RUBRIC),

  // SSAT Middle (4)
  wp('wp-ssat-mid-01', 'ssat', 3, 'creative', 'Write a story that begins: I had exactly one hour to fix what I had broken.', 25, SSAT_MID_TIPS, SSAT_MID_RUBRIC),
  wp('wp-ssat-mid-02', 'ssat', 3, 'creative', 'Write a story that begins: The map my grandfather left me did not show any place I recognized.', 25, SSAT_MID_TIPS, SSAT_MID_RUBRIC),
  wp('wp-ssat-mid-03', 'ssat', 3, 'creative', 'Write a story that ends with the sentence: And that was the last time I ever took the shortcut.', 25, SSAT_MID_TIPS, SSAT_MID_RUBRIC),
  wp('wp-ssat-mid-04', 'ssat', 3, 'creative', 'Write a story that begins: Everyone in town knew the lighthouse keeper, but no one had ever seen her face.', 25, SSAT_MID_TIPS, SSAT_MID_RUBRIC),

  // SSAT Upper (4): the real test offers a creative/persuasive pair; practice both.
  wp('wp-ssat-up-01', 'ssat', 4, 'creative', 'Write a story that begins: It was the kind of silence that meant something had already happened.', 25, SSAT_UP_CREATIVE_TIPS, SSAT_UP_CREATIVE_RUBRIC),
  wp('wp-ssat-up-02', 'ssat', 4, 'persuasive', 'Is it more important to be well liked or to be respected? Support your position with reasons and examples from your experience, reading, or observations.', 25, SSAT_UP_PERSUASIVE_TIPS, SSAT_UP_PERSUASIVE_RUBRIC),
  wp('wp-ssat-up-03', 'ssat', 5, 'creative', 'Write a story that begins: She had rehearsed the apology so many times that, when the moment came, she said something else entirely.', 25, SSAT_UP_CREATIVE_TIPS, SSAT_UP_CREATIVE_RUBRIC),
  wp('wp-ssat-up-04', 'ssat', 5, 'persuasive', 'Some people believe that failure teaches more than success. Do you agree or disagree? Support your position with specific examples.', 25, SSAT_UP_PERSUASIVE_TIPS, SSAT_UP_PERSUASIVE_RUBRIC),

  // ISEE Lower (4)
  wp('wp-isee-low-01', 'isee', 1, 'essay', 'If you could change one rule at your school, what would it be and why?', 30, ISEE_LOWER_TIPS, ISEE_LOWER_RUBRIC),
  wp('wp-isee-low-02', 'isee', 1, 'essay', 'Describe a time you helped someone. What did you do, and how did it make you feel?', 30, ISEE_LOWER_TIPS, ISEE_LOWER_RUBRIC),
  wp('wp-isee-low-03', 'isee', 2, 'essay', 'What is one thing you are proud of learning how to do? Explain how you learned it and why it matters to you.', 30, ISEE_LOWER_TIPS, ISEE_LOWER_RUBRIC),
  wp('wp-isee-low-04', 'isee', 2, 'essay', 'If you could spend a day with any animal, which would you choose and what would you do together?', 30, ISEE_LOWER_TIPS, ISEE_LOWER_RUBRIC),

  // ISEE Middle (4)
  wp('wp-isee-mid-01', 'isee', 3, 'essay', 'Describe a person who has had a positive influence on your life. What specifically did this person do, and how have you changed because of it?', 30, ISEE_MID_TIPS, ISEE_MID_RUBRIC),
  wp('wp-isee-mid-02', 'isee', 3, 'essay', 'If you could add one class to your school\'s schedule that is not currently offered, what would it be? Explain why students would benefit.', 30, ISEE_MID_TIPS, ISEE_MID_RUBRIC),
  wp('wp-isee-mid-03', 'isee', 3, 'essay', 'Think about a time you had to work with someone whose ideas were very different from yours. What happened, and what did you learn?', 30, ISEE_MID_TIPS, ISEE_MID_RUBRIC),
  wp('wp-isee-mid-04', 'isee', 3, 'essay', 'What is one problem in your community that you would like to help solve? Describe the problem and what you would do about it.', 30, ISEE_MID_TIPS, ISEE_MID_RUBRIC),

  // ISEE Upper (4)
  wp('wp-isee-up-01', 'isee', 4, 'essay', 'Many schools require students to complete community service hours. Do you think service should be required or voluntary? Explain your reasoning.', 30, ISEE_UP_TIPS, ISEE_UP_RUBRIC),
  wp('wp-isee-up-02', 'isee', 4, 'essay', 'Describe a belief or opinion you once held strongly and later changed. What caused you to reconsider, and what did the experience teach you about how you think?', 30, ISEE_UP_TIPS, ISEE_UP_RUBRIC),
  wp('wp-isee-up-03', 'isee', 5, 'essay', 'Some people say that technology brings people closer together; others say it pushes them apart. Based on your own experience, which view is more accurate, and why?', 30, ISEE_UP_TIPS, ISEE_UP_RUBRIC),
  wp('wp-isee-up-04', 'isee', 5, 'essay', 'What does it mean to be a good leader? Use a specific example from history, literature, or your own life to support your definition.', 30, ISEE_UP_TIPS, ISEE_UP_RUBRIC),

  // HSPT-style persuasive practice (10). The HSPT has no essay; these build the
  // argument and conventions skills behind the Language section.
  wp('wp-hspt-01', 'hspt', 3, 'persuasive', 'Should students be allowed to use cell phones during the school day? Take a position and support it with reasons and examples.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-02', 'hspt', 3, 'persuasive', 'Your school is considering replacing letter grades with written comments from teachers. Argue for or against this change.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-03', 'hspt', 3, 'persuasive', 'Should all students be required to participate in a team sport or physical activity after school? Explain your position.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-04', 'hspt', 3, 'persuasive', 'Some people believe homework should be limited to thirty minutes per night. Do you agree or disagree? Support your answer.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-05', 'hspt', 3, 'persuasive', 'Should schools require students to wear uniforms? Take a clear position and defend it.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-06', 'hspt', 3, 'persuasive', 'Your principal is deciding whether to start the school day one hour later. Write a letter persuading the principal to accept or reject the plan.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-07', 'hspt', 3, 'persuasive', 'Is it better to be an expert in one subject or to know a little about many subjects? Argue for one view.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-08', 'hspt', 3, 'persuasive', 'Should students have a say in choosing the books they read for English class? Explain and support your position.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-09', 'hspt', 3, 'persuasive', 'Many towns are banning single-use plastic bags. Should your town do the same? Take a position and give reasons.', 20, HSPT_TIPS, HSPT_RUBRIC),
  wp('wp-hspt-10', 'hspt', 3, 'persuasive', 'Should middle school students be required to learn a second language? Argue for or against the requirement.', 20, HSPT_TIPS, HSPT_RUBRIC),
];

const questions = [...punctuation, ...capitalization, ...usage, ...spelling, ...composition];

module.exports = { questions, writingPrompts };
