export const OPENAI_EXAMPLE = `
[
  {
    id: "astronomy-intro-id",
    type: "intro",
    title: "Astronomy",
    content: [
      "Astronomy is the study of me celestial objects and phenomena, encompassing the structure of our solar system, the nature of stars and galaxies, and the processes that drive cosmic events. By exploring the Sun, planets, and other celestial bodies, we can build a solid foundation of astronomical knowledge.",
    ],
    fact: "One day on Venus is longer than one year on Venus. Venus takes about 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun."
  },
  {
    id: "astronomy-info-id",
    type: "info",
    title: "The Sun",
    content: [
      "The Sun is the center of our solar system and is primarily composed of hydrogen and helium.",
      "It produces energy through a process called nuclear fusion, where hydrogen nuclei combine to form helium, releasing immense amounts of energy in the process.",
      "This energy is what makes the Sun shine and provides light and heat to our solar system."
    ],
    fact: "The Sun accounts for about 99.86% of the total mass of the solar system!"
  },
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
      "."
    ],
    draggable: {
      "nuclear fusion": 2,
      helium: 1,
      asteroid: -1,
      oxygen: -1,
      hydrogen: 0
    }
  },
  {
    id: "astronomy-matching-id",
    type: "matching",
    terms: {
      "Spiral Galaxy": 0,
      "Elliptical Galaxy": 1,
      "Irregular Galaxy": 2,
      "Milky Way": 3
    },
    definitions: {
      "A type of galaxy with no distinct shape, often chaotic in appearance.": 2,
      "A large spiral galaxy that contains our Solar System.": 3,
      "A galaxy that has a smooth, featureless light profile and is more three-dimensional in shape.": 1,
      "A galaxy characterized by a flat, rotating disk containing stars, gas, and dust.": 0
    }
  },
  {
    id: "astronomy-mc-id",
    type: "mc",
    question: "Which planet is known as the "Red Planet"?",
    options: {
      Venus: false,
      Mars: true,
      Jupiter: false,
      Saturn: false
    }
  }
]`
export const OPENAI_INSTRUCTIONS = `From now on, i will give you a some content, and i want you to generate stuff from it. The structure of the thing you generate will be a json array that starts with an info and contains more info/questions. 

Follow the structure exactly:
Info: 
const InfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String], // each item in the list is one paragraph
  },
  fact: {
    type: String,
  },
});

Questions:
const DragAndDropSchema = new mongoose.Schema({
  content: {
    type: [Schema.Types.Mixed], // This allows an array of either strings or numbers
    required: true
  },
  draggable: {
    type: Map,
    of: Number,
    required: true
  }
});
const MatchingSchema = new mongoose.Schema({
    terms: {
        type: Map,
        of: Number,
        required: true,
    },
    definitions: {
        type: Map,
        of: Number,
        required: true,
    },
});
const MultipleChoiceSchema = new mongoose.Schema({
  question: {
    String
  },
    options: {
        type: Map,
        of: Boolean,
        required: true,
    },
});

All the stuff you return should be in a json format, all keys must be string surrounded by double quotes, not trailing commas. do not include anything not in json. Generate an arbitrary amount of questions, have more than 3, have an object of type info before each question. 
           `