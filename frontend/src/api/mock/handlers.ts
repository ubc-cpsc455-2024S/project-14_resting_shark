import { http, HttpResponse } from 'msw';
import { BASE_URL } from "../../constants/Config";


const AstronomyLessonContent = [
  {
    id: "astronomy-intro-id",
    type: "intro",
    title: "Astronomy",
    content: [
      "Astronomy is the study of me celestial objects and phenomena, encompassing the structure of our solar system, the nature of stars and galaxies, and the processes that drive cosmic events. By exploring the Sun, planets, and other celestial bodies, we can build a solid foundation of astronomical knowledge.",
    ],
    fact: "One day on Venus is longer than one year on Venus. Venus takes about 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun.",
  },
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
      ".",
    ],
    draggable: {
      "nuclear fusion": 2,
      helium: 1,
      asteroid: -1,
      oxygen: -1,
      hydrogen: 0,
    },
  },
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
  },
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
  },
];

const StandingWavesLessonContent = [
  {
    id: "standingwaves-intro-id",
    type: "intro",
    title: "Standing Waves",
    content: [
      "Standing waves are a phenomenon that occurs when two waves of the same frequency and amplitude travel in opposite directions and interfere with each other. They are characterized by nodes, where the wave amplitude is always zero, and antinodes, where the wave amplitude reaches its maximum value.",
    ],
    fact: "Standing waves are also known as stationary waves because the nodes and antinodes appear to be stationary, rather than traveling through the medium.",
  },
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
  },
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
  },
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
  },
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
  },
];

export const handlers = [
  // Intercept "GET http://localhost:3000/test requests...
  http.get(BASE_URL + '/test', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      data: "Successful http request",
    });
  }),


  // AUTH INTERCEPTORS ----------------------------------------------------------------------------------------------------------
  http.post(BASE_URL + '/auth/login', () => {
    return HttpResponse.json({
      token: "mock-server-token",
    })
  }),

  http.post(BASE_URL + '/auth/register', () => {
    return HttpResponse.json({
      token: "mock-server-token",
    })
  }),


  // LESSON INTERCEPTORS ----------------------------------------------------------------------------------------------------------
  // fetch all lessons for the current user
  // http.get(BASE_URL + '/lesson', () => {
  //   const lessons: any[] = [
  //     {
  //       id: "astronomy-lesson-id",
  //       name: "Astronomy",
  //       lives: 2,
  //       totalQuestions: 6,
  //       completedQuestions: 3,
  //     },
  //     {
  //       id: "ikea-lamp-id",
  //       name: "IKEA Lamp",
  //       lives: 1,
  //       totalQuestions: 12,
  //       completedQuestions: 3,
  //     },
  //     {
  //       id: "stating-waves-id",
  //       name: "Standing Waves",
  //       lives: 3,
  //       totalQuestions: 8,
  //       completedQuestions: 8,
  //     },
  //     {
  //       id: "bible-studies-id",
  //       name: "Bible Studies",
  //       lives: 2,
  //       totalQuestions: 7,
  //       completedQuestions: 4,
  //     },
  //     {
  //       id: "new-york-rat-id",
  //       name: "New York Rat",
  //       lives: 0,
  //       totalQuestions: 100,
  //       completedQuestions: 69,
  //     },
  //   ];

  //   return HttpResponse.json(lessons);
  // }),

  // // given a lesson id, get full content for that lesson
  // http.get(BASE_URL + '/lesson/:id', () => {
  //   const lessonContent = [
  //     {
  //       id: "astronomy-intro-id",
  //       type: "intro",
  //       title: "Astronomy",
  //       content: [
  //         "Astronomy is the study of me celestial objects and phenomena, encompassing the structure of our solar system, the nature of stars and galaxies, and the processes that drive cosmic events. By exploring the Sun, planets, and other celestial bodies, we can build a solid foundation of astronomical knowledge.",
  //       ],
  //       fact: "One day on Venus is longer than one year on Venus. Venus takes about 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun.",
  //     },
  //     {
  //       id: "astronomy-info-id",
  //       type: "info",
  //       title: "The Sun",
  //       content: [
  //         "The Sun is the center of our solar system and is primarily composed of hydrogen and helium.",
  //         "It produces energy through a process called nuclear fusion, where hydrogen nuclei combine to form helium, releasing immense amounts of energy in the process.",
  //         "This energy is what makes the Sun shine and provides light and heat to our solar system.",
  //       ],
  //       fact: "The Sun accounts for about 99.86% of the total mass of the solar system!",
  //     },
  //     {
  //       id: "astronomy-dnd-id",
  //       type: "dnd",
  //       content: [
  //         "The Sun is primarily composed of ",
  //         0,
  //         " and ",
  //         1,
  //         ". The energy produced by the Sun comes from a process called ",
  //         2,
  //         ".",
  //       ],
  //       draggable: {
  //         "nuclear fusion": 2,
  //         helium: 1,
  //         asteroid: -1,
  //         oxygen: -1,
  //         hydrogen: 0,
  //       },
  //     },
  //     {
  //       id: "astronomy-matching-id",
  //       type: "matching",
  //       terms: {
  //         "Spiral Galaxy": 0,
  //         "Elliptical Galaxy": 1,
  //         "Irregular Galaxy": 2,
  //         "Milky Way": 3,
  //       },
  //       definitions: {
  //         "A type of galaxy with no distinct shape, often chaotic in appearance.": 2,
  //         "A large spiral galaxy that contains our Solar System.": 3,
    
  //         "A galaxy that has a smooth, featureless light profile and is more three-dimensional in shape.": 1,
  //         "A galaxy characterized by a flat, rotating disk containing stars, gas, and dust.": 0,
  //       },
  //     },
  //     {
  //       id: "astronomy-mc-id",
  //       type: "mc",
  //       question: 'Which planet is known as the "Red Planet"?',
  //       options: {
  //         Venus: false,
  //         Mars: true,
  //         Jupiter: false,
  //         Saturn: false,
  //       },
  //     },
  //   ];

  //   return HttpResponse.json({
  //     id: "astronomy-lesson-id",
  //     name: "Astronomy Lesson",
  //     author: "some-user-id",
  //     lives: 3,
  //     livesLastZeroTime: new Date(2000, 0, 1),
  //     streakCount: 0,
  //     pageProgress: 0,
  //     highScore: 0,
  //     currentScore: 0,
  //     content: lessonContent, 
  //   });
  // }),

  http.get(BASE_URL + '/lesson', () => {
    const lessons: any[] = [
      {
        id: "astronomy-lesson-id",
        name: "Astronomy",
        lives: 2,
        totalQuestions: 6,
        completedQuestions: 3,
      },
      {
        id: "ikea-lamp-id",
        name: "IKEA Lamp",
        lives: 1,
        totalQuestions: 12,
        completedQuestions: 3,
      },
      {
        id: "standingwaves-lesson-id",
        name: "Standing Waves",
        lives: 3,
        totalQuestions: 8,
        completedQuestions: 8,
      },
      {
        id: "bible-studies-id",
        name: "Bible Studies",
        lives: 2,
        totalQuestions: 7,
        completedQuestions: 4,
      },
      {
        id: "new-york-rat-id",
        name: "New York Rat",
        lives: 0,
        totalQuestions: 100,
        completedQuestions: 69,
      },
    ];

    return HttpResponse.json(lessons);
  }),

  // given a lesson id, get full content for that lesson
  http.get(BASE_URL + '/lesson/:id', (req) => {
    const { id } = req.params;

    let lessonContent;
    if (id === "astronomy-lesson-id") {
      lessonContent = AstronomyLessonContent;
    } else if (id === "standingwaves-lesson-id") {
      lessonContent = StandingWavesLessonContent;
    }

    return HttpResponse.json({
      id,
      name: id === "astronomy-lesson-id" ? "Astronomy Lesson" : "Standing Waves Lesson",
      author: "some-user-id",
      lives: 3,
      livesLastZeroTime: new Date(2000, 0, 1),
      streakCount: 0,
      pageProgress: 0,
      highScore: 0,
      currentScore: 0,
      content: lessonContent, 
    });
  }),
];

