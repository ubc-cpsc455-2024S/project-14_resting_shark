import { Content, DragAndDrop, Info, Intro } from "../class/Content";

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
    draggable: ["nuclear fusion", "helium", "asteroid", "oxygen", "hydrogen"],
  } as DragAndDrop,
];
