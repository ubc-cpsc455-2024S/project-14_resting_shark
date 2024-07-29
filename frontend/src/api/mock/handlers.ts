import { http, HttpResponse } from "msw";
import { BASE_URL } from "../../constants/Config";

export const handlers = [
  // Intercept "GET http://localhost:3000/test requests...
  http.get(BASE_URL + "/test", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      data: "Successful http request",
    });
  }),

  // AUTH INTERCEPTORS ----------------------------------------------------------------------------------------------------------
  http.post(BASE_URL + "/auth/login", () => {
    return HttpResponse.json({
      token: "mock-server-token",
    });
  }),

  http.post(BASE_URL + "/auth/register", () => {
    return HttpResponse.json({
      token: "mock-server-token",
    });
  }),


  // USER INTERCEPTORS ----------------------------------------------------------------------------------------------------------
  // given two iso date strings, will return all user information and the number of lessons completed for each day within the range in an array.
  http.post(BASE_URL + "/user/stats", () => {
    return HttpResponse.json({
      "_id": "mock-user",
      "name": "mock-user",
      "email": "mock-user@gmail.com",
      "username": "mock-user",
      "password": "sfkjldsfd",
      "createdAt": "2024-07-21T18:02:37.715Z",
      "updatedAt": "2024-07-21T18:02:37.715Z",
      "__v": 0,
      "totalExp": 38276,
      "dailyStreakCount": 0,
      "longestStreak": 0,
      "completedLessonsByDay": [
          {
              "date": "2024-07-21",
              "count": 0
          },
          {
              "date": "2024-07-22",
              "count": 0
          },
          {
              "date": "2024-07-23",
              "count": 0
          },
          {
              "date": "2024-07-24",
              "count": 0
          },
          {
              "date": "2024-07-25",
              "count": 0
          },
          {
              "date": "2024-07-26",
              "count": 0
          },
          {
              "date": "2024-07-27",
              "count": 1
          },
          {
              "date": "2024-07-28",
              "count": 0
          },
          {
              "date": "2024-07-29",
              "count": 3
          },
          {
              "date": "2024-07-30",
              "count": 0
          }
      ]
  });
  }),

  http.delete(BASE_URL + "/user", () => {
    // do nothing
  }),

  // update user's non pesonal info
  http.patch(BASE_URL + '/user', () => {
    // do nothing
  }),

  // LESSON HISTORY INTERCEPTORS:
  // creates a record of the given user completing a lesson (call this whenever a user completes a lesson)
  http.post(BASE_URL + "/lessonHistory/:id", () => {
    const result = {
      "userId": "mock",
      "lessonId": "66a70bf3fc91dfc28e56b075",
      "timestamp": "2024-07-29T03:26:43.839Z"
    };

    return HttpResponse.json(result);
  }),

  // LESSON INTERCEPTORS ----------------------------------------------------------------------------------------------------------
  // fetch all lessons for the current user
  http.get(BASE_URL + "/lesson", () => {
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
  http.get(BASE_URL + "/lesson/:id", () => {
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

  // generate mock response from the HelperAI.
  http.post(BASE_URL + "/lesson/api/chat", () => {
    return HttpResponse.json({
      reply: "This is a mock response from HelperAI.",
    });
  }),

  // deletes a lesson
  http.delete(BASE_URL + "/lesson/:id", () => {
    // empty
  }),


  /*
  updates an entire lesson, any fields provided will be updates. If a non existing field is provided, it will be silently ignored
  Reauest params:
    - id: the id of the lesson
  */
  http.patch(BASE_URL + "/lesson/:id", () => {
    // empty
  }),

  // gets current lesson of the day
  http.get(BASE_URL + "/lesson/lessonOfTheDay", () => {
    return HttpResponse.json({
      "_id": "fake_id",
      "name": "Relational Databases",
      "author": "669d7879973aa7e790841c4a",
      "instanceOwner": "mock_user",
      "lives": 3,
      "streakCount": 0,
      "pageProgress": -1,
      "highScore": 0,
      "currentScore": 0,
      "content": [
          {
              "id": "ae4cc318-1a05-40c6-a964-6ea9e0662f7c",
              "type": "intro",
              "title": "Relational Databases",
              "content": [
                  "A relational database (RDB) is a database based on the relational model of data, as proposed by E. F. Codd in 1970.",
                  "A database management system used to maintain relational databases is called a relational database management system (RDBMS).",
                  "Many relational database systems are equipped with the option of using SQL (Structured Query Language) for querying and updating the database."
              ],
              "fact": "The term 'relational' in relational databases refers to how data is organized and accessed in the form of relations (tables)."
          },
          {
              "id": "06e1d288-ee2f-4953-9924-ff973ce46f8f",
              "type": "info",
              "title": "History of Relational Databases",
              "content": [
                  "The concept of relational databases was defined by E. F. Codd at IBM in 1970.",
                  "Codd introduced the term relational in his research paper 'A Relational Model of Data for Large Shared Data Banks.'",
                  "Although Codd established 12 rules for relational databases, no commercial implementations conform to all of these rules."
              ],
              "fact": "The first system sold as an RDBMS was Multics Relational Data Store, released in June 1976."
          },
          {
              "id": "b8490ca4-7e56-4dac-b6e6-bb9c73153405",
              "type": "dnd",
              "content": [
                  "The relational database is based on the ",
                  0,
                  " model of data. The first RDBMS was ",
                  1,
                  ". By using ",
                  2,
                  ", users can query and manipulate the data."
              ],
              "draggable": {
                  "relational": 0,
                  "SQL": 2,
                  "Multics Relational Data Store": 1,
                  "NoSQL": -1,
                  "XML": -1
              }
          },
          {
              "id": "29810a2a-56ec-446f-b5ab-d19f6c6ac3b9",
              "type": "matching",
              "terms": {
                  "IBM Db2": 0,
                  "Oracle": 1,
                  "Ingres": 2,
                  "SAP Sybase ASE": 3
              },
              "definitions": {
                  "A widely used relational database management system developed in 1979 by Relational Software.": 1,
                  "A database management system developed by IBM.": 0,
                  "An RDBMS released in 1980 and known for its performance.": 2,
                  "Another RDBMS used for enterprise applications, developed by Sybase.": 3
              }
          },
          {
              "id": "9d4a7363-1611-4e5e-9bfb-8f86b716b24f",
              "type": "mc",
              "question": "Who introduced the concept of the relational model for databases?",
              "options": {
                  "Alan Turing": false,
                  "E. F. Codd": true,
                  "Charles Babbage": false,
                  "Bill Gates": false
              }
          }
      ],
      "__v": 0
  });
  }),

  // gets all original (not copies) lessons that do not belong to the current user
  http.get("/lesson/all", () => {
    return HttpResponse.json([
      {
        "_id": "66a4a945a453e0b6ebd50051",
        "name": "Explore lesson 1"
    },
    {
        "_id": "66a5601504e49048593d5820",
        "name": "Explore lesson 2"
    },
    {
        "_id": "66a562d404e49048593d582a",
        "name": "Explore lesson 3"
    },
    {
        "_id": "66a70758dabe31f8c14f51db",
        "name": "Explore Lesson 4"
    }
    ]);
  }),

  // PROFILE INTERCEPTORS
  // get configs for profile
  http.get(BASE_URL + 'user/profile/all', () => {
    return HttpResponse.json({
      "_id": "66a7446e4f2e540b8eab06e9",
      "bgColors": [
          "#FF0000",
          "#008080"
      ],
      "baseImages": [
          "./images/goose.png"
      ],
      "accessories": [
          "./images/mango.png"
      ],
      "heldItems": [
          ".images/knife.png"
      ]
    });
  }),
];
