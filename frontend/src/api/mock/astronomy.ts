import Content from "../../class/Content";
import DragAndDrop from "../../class/DragAndDrop";
import Info from "../../class/Info";
import Intro from "../../class/Intro";
import Matching from "../../class/Matching";
import MultipleChoice from "../../class/MultipleChoice";

// backend will aggregate all questions, info, and whatever else into an array like this
const AstronomyLessonContent: Content[] = [
  {
    id: "astronomy-intro-id",
    type: "intro",
    title: "Astronomy",
    content: [
      "Astronomy is the study of me celestial objects and phenomena, encompassing the structure of our solar system, the nature of stars and galaxies, and the processes that drive cosmic events. By exploring the Sun, planets, and other celestial bodies, we can build a solid foundation of astronomical knowledge.",
    ],
    fact: "One day on Venus is longer than one year on Venus. Venus takes about 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun.",
  } as Intro,
  {
    id: "astronomy-info-id",
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
    id: "astronomy-dnd-id",
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
    draggable: {
      "nuclear fusion": 2,
      helium: 1,
      asteroid: -1,
      oxygen: -1,
      hydrogen: 0,
    },
  } as DragAndDrop,
  {
    id: "astronomy-matching-id",
    type: "matching",
    terms: {
      "Spiral Galaxy": 0,
      "Elliptical Galaxy": 1,
      "Irregular Galaxy": 2,
      "Milky Way": 3,
    },
    definitions: {
      "A type of galaxy with no distinct shape, often chaotic in appearance.": 2,
      "A large spiral galaxy that contains our Solar System.": 3,

      "A galaxy that has a smooth, featureless light profile and is more three-dimensional in shape.": 1,
      "A galaxy characterized by a flat, rotating disk containing stars, gas, and dust.": 0,
    },
  } as Matching,
  {
    id: "astronomy-mc-id",
    type: "mc",
    question: 'Which planet is known as the "Red Planet"?',
    options: {
      Venus: false,
      Mars: true,
      Jupiter: false,
      Saturn: false,
    },
  } as MultipleChoice,
];

// mock data for astronomy lesson
export const AstronomyLesson: any = {
  id: "astronomy-lesson-id",
  name: "Astronomy Lesson",
  author: "some-user-id",
  lives: 3,
  livesLastZeroTime: new Date(2000, 0, 1), // placeholder data
  streakCount: 0,
  pageProgress: 0,
  highScore: 0,
  currentScore: 0,
  content: AstronomyLessonContent, 
};