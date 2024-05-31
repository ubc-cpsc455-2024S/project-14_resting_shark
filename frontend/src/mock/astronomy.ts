import {
  Content,
  DragAndDrop,
  Info,
  Intro,
  Matching,
  MultipleChoice,
} from "../class/Content";

// mock data for astronomy lesson
export const AstronomyLesson: Content[] = [
  {
    type: "intro",
    title: "Astronomy",
    content: [
      "Astronomy is the study of celestial objects and phenomena, encompassing the structure of our solar system, the nature of stars and galaxies, and the processes that drive cosmic events. By exploring the Sun, planets, and other celestial bodies, we can build a solid foundation of astronomical knowledge.",
    ],
    fact: "One day on Venus is longer than one year on Venus. Venus takes about 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun.",
  } as Intro,
  {
    type: "info",
    title: "The Sun",
    content: [
      "The Sun is the center of our solar system and is primarily composed of hydrogen and helium.",
      "It produces energy through a process called nuclear fusion, where hydrogen nuclei combine to form helium, releasing immense amounts of energy in the process.",
      "This energy is what makes the Sun shine and provides light and heat to our solar system.",
    ],
    fact: "The Sun accounts for about 99.86% of the total mass of the solar system!",
  } as Info,
  {
    type: "dnd",
    content: [
      "The Sun is primarily composed of ",
      0,
      " and ",
      1,
      ". The energy produced by the Sun comes from a process called ",
      2,
      ".",
    ],
    draggable: new Map([
      ["nuclear fusion", 2],
      ["helium", 1],
      ["asteroid", -1],
      ["oxygen", -1],
      ["hydrogen", 0],
    ]),
  } as DragAndDrop,
  {
    type: "matching",
    terms: new Map([
      ["Spiral Galaxy", 0],
      ["Elliptical Galaxy", 1],
      ["Irregular Galaxy", 2],
      ["Milky Way", 3],
    ]),
    definitions: new Map([
      [
        "A type of galaxy with no distinct shape, often chaotic in appearance.",
        2,
      ],
      ["A large spiral galaxy that contains our Solar System.", 3],
      [
        "A galaxy that has a smooth, featureless light profile and is more three-dimensional in shape.",
        1,
      ],
      [
        "A galaxy characterized by a flat, rotating disk containing stars, gas, and dust.",
        0,
      ],
    ]),
  } as Matching,
  {
    type: "mc",
    question: 'Which planet is known as the "Red Planet"?',
    options: new Map([
      ["Venus", false],
      ["Mars", true],
      ["Jupiter", false],
      ["Saturn", false],
    ]),
  } as MultipleChoice,
];
