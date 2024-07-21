import { http, HttpResponse } from 'msw';
import { BASE_URL } from "../../constants/Config";


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

  // TODO: not yet complete, need to add fields to user in order to return all stats needed
    // USER INTERCEPTORS ----------------------------------------------------------------------------------------------------------
    http.get(BASE_URL + '/user/stats', () => {
      return HttpResponse.json({
        username: "Mock User",
      })
    }),

    http.delete(BASE_URL + '/user', () => {
      // do nothing
    }),


  // LESSON INTERCEPTORS ----------------------------------------------------------------------------------------------------------
  // fetch all lessons for the current user
  http.get(BASE_URL + '/lesson', () => {
    const lessons: any[] = [
      {
        id: "astronomy-lesson-id",
        name: "Astronomy",
        lives: 2,
        totalPages: 6,
        completedPages: 3,
      },
      {
        id: "ikea-lamp-id",
        name: "IKEA Lamp",
        lives: 1,
        totalPages: 12,
        completedPages: 3,
      },
      {
        id: "stating-waves-id",
        name: "Standing Waves",
        lives: 3,
        totalPages: 8,
        completedPages: 8,
      },
      {
        id: "bible-studies-id",
        name: "Bible Studies",
        lives: 2,
        totalPages: 7,
        completedPages: 4,
      },
      {
        id: "new-york-rat-id",
        name: "New York Rat",
        lives: 0,
        totalPages: 100,
        completedPages: 69,
      },
    ];

    return HttpResponse.json(lessons);
  }),

  // given a lesson id, get full content for that lesson
  http.get(BASE_URL + '/lesson/:id', () => {
    const lessonContent = [
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

    return HttpResponse.json({
      id: "astronomy-lesson-id",
      name: "Astronomy Lesson",
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
]
