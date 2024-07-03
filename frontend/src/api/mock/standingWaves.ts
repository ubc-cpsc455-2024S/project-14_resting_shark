import Content from "../../class/Content";
import DragAndDrop from "../../class/DragAndDrop";
import Info from "../../class/Info";
import Intro from "../../class/Intro";
import Matching from "../../class/Matching";
import MultipleChoice from "../../class/MultipleChoice";

const StandingWavesLessonContent: Content[] = [
  {
    id: "standingwaves-intro-id",
    type: "intro",
    title: "Standing Waves",
    content: [
      "Standing waves are a phenomenon that occurs when two waves of the same frequency and amplitude travel in opposite directions and interfere with each other. They are characterized by nodes, where the wave amplitude is always zero, and antinodes, where the wave amplitude reaches its maximum value.",
    ],
    fact: "Standing waves are also known as stationary waves because the nodes and antinodes appear to be stationary, rather than traveling through the medium.",
  } as Intro,
  {
    id: "standingwaves-info-id",
    type: "info",
    title: "Formation of Standing Waves",
    content: [
      "Standing waves form when two waves of the same frequency and amplitude interfere constructively and destructively. This can happen in a variety of settings, such as on a string, in an air column, or on the surface of a liquid.",
      "Nodes are points where the two waves cancel each other out completely, resulting in no displacement.",
      "Antinodes are points where the waves reinforce each other, resulting in maximum displacement.",
    ],
    fact: "The distance between two consecutive nodes or antinodes is equal to half the wavelength of the waves.",
  } as Info,
  {
    id: "standingwaves-dnd-id",
    type: "dnd",
    content: [
      "Standing waves occur due to the interference of two waves traveling in ",
      0,
      " directions with the same ",
      1,
      " and amplitude. The points of no displacement are called ",
      2,
      ", and the points of maximum displacement are called ",
      3,
      ".",
    ],
    draggable: {
      frequency: 1,
      nodes: 2,
      opposite: 0,
      antinodes: 3,
      phase: -1,
      same: -1,
    },
  } as DragAndDrop,
  {
    id: "standingwaves-matching-id",
    type: "matching",
    terms: {
      "Node": 0,
      "Antinode": 1,
      "Wavelength": 2,
      "Frequency": 3,
    },
    definitions: {
      "The distance between two consecutive nodes or antinodes in a standing wave.": 2,
      "The number of oscillations per unit time.": 3,
      "A point in a standing wave where the wave has maximum amplitude.": 1,
      "A point in a standing wave where the wave has zero amplitude.": 0,
    },
  } as Matching,
  {
    id: "standingwaves-mc-id",
    type: "mc",
    question: "In a standing wave, what is the point called where the wave has zero amplitude?",
    options: {
      Antinode: false,
      Crest: false,
      Node: true,
      Trough: false,
    },
  } as MultipleChoice,
];

// mock data for standing waves lesson
export const StandingWavesLesson: any = {
  id: "standingwaves-lesson-id",
  name: "Standing Waves Lesson",
  author: "some-user-id",
  lives: 3,
  livesLastZeroTime: new Date(2000, 0, 1), // placeholder data
  streakCount: 0,
  pageProgress: 0,
  highScore: 0,
  currentScore: 0,
  content: StandingWavesLessonContent,
};
