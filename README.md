# Group 14 - Mangoose

We're developing an innovative web application designed for students and learners to enhance their understanding of various subjects. Users can upload PDFs to create interactive and personalized lessons featuring true/false, fill-in-the-blank, and multiple-choice questions. The platform includes user authentication, progress tracking, and gamified elements like streaks and levels to make learning engaging and effective, as well as sharing lessons with other users.

![Status](https://github.com/ubc-cpsc455-2024S/project-14_resting_shark/actions/workflows/main.yml/badge.svg)

## Describe your topic/interest in about 150-200 words

We are interested in creating a tool for students and learners who want to develop and/or reinforce their understanding and knowledge of various subjects. This web application will allow users to generate interactive lessons from images or PDFs (provided by the user) to support their education and studies through personalized and engaging learning experiences.

The application will store data such as created lessons, user profile information, and progress metrics like streaks and leagues. A user can upload some educational materials in the form of images or PDFs and will receive personalized and gamified lessons on this subject/materials. Users will then be able to learn from these lessons through different question formats including true/false questions, fill in the blanks, multiple choice, and long answer questions. They will also be able to track their progress over time.

Depending on time constraints, other additional functionalities may include diagram-based questions, real-time multiplayer modes, and a community feature for discussion and lessons sharing which may further enhance the learning experience.

This project aims to be a comprehensive tool for learners to deepen their understanding of certain subject matters and retain information more effectively.

## Project task requirements:
### 3-5 minimal requirements
- Working lesson with: ✔️
  - True/false ✔️
  - Fill in the blank ✔️
  - Multiple choice/select all that applies ✔️
- User authentication and Profile ✔️
- Streaks/Leagues (reward system of some kind) ✔️
- User levels and exp ✔️
- Home page/Menu ✔️
### 3-7 “standard” requirements
- Lesson of the day ✔️
- Hints/Explanations ✔️
- Lives ✔️
- Progress tracking ✔️
### 2-3 stretch requirements
- customizable profile picture ✔️
- Community ✔️
- User stats ✔️
- Timer cooldown when lives are used up ✔️


## How tech from Units 1-5 are used in the project
1. HTML/CSS/JS

2. React and Redux

3. NodeJS/Express
   - the backend of this project is a RESTful API written using NodeJS and Express.
   - Express is very unpoinionated, so we could easily design and structure our code the way we want and not be forced to follow a predetermined framework
       - our code follows a Routers > Services structure, where all business logic is contained in the service layer to keep the router layer clean 
       - This made it so that our router layer acts like an interface for all the endpoints we have, with clear comments on each one
  - Express uses customizable middleware, allowing us to write our own authentication and authorization middleware which uses JWT based authentication. This was a very good exprerience for us as it allows us to understand the underlying principals of JWT based auth instead of relying on frameworks or third party sources.
  - Using NodeJS + Express in the backend rather than some other language + framework works very well for us since it allows us to write our entire project (both frontend and backend) in Typescript
  - NodeJS + Express is also very lightweight and does not require a lot of boilerplate code (in comparison to say SpringBoot), making it ideal for this project since it is on the smaller side and we could spin it up very quickly.

5. MongoDB
   - We store all of our User, Lesson, Configuration, Questions, and Profile data inside of the database.
   - This makes it not only so that information can be persisted, but also offers extremely powerful querying capabilities.
         - For example, We have a LessonHistory collection that stores a record with a timestamp every time a user completes a lesson. This allows us to do a varietly of features on the frontend like:
             - display stats on how many lessons the user has completed and at what time
             - lesson streaks
             - avg lessons completed per day over a set time period
             - whether a certain lessons has been completed before or not
             - etc
   - We used Mongoose, and all of our models are defined within the models folder, and we utilized domain driven design when thinking of any endpoints we want to write in the backend.
   - MongoDB offers JSON querying, which is very suitable for us since we are using Typescipt backend
   - Mongo's aggregation pipelines are easier to debug as the steps happen sequentially so you can look at the result of each step and see if it is correct, compared to SQL which does not excecute its querys "top-down".
   - MondoDB allows nested document structure unlike SQL, which was crucial to our application. We generate complex json objects using chatgpt and are able to store the entire json object into MongoDB instead of having split up the nested components like what we would have to do with a relational database. This saves us both from having to parse the returned JSON and take it apart, save multiple records, manage relationships, and best of all we dont have to perform very complex and expensive joins when fetching a full lesson.

7. Release Engineering
   - We have CI Github action running frontend tests to ensure merged code is of good quality
   - we protected the main branch to prevent any direct pushes and occasionally do code reviews to ensure code quality and that everyone has a good understanding of all parts of the codebase
   - We have an internal team guide for project contributions:
       1. ensure new code does not break anything by performing extensive testing
       2. merge main into your branch and resolve conflicts
       3. test again to make sure code is good quality
       4. run eslint
       5. make a PR and request a review if necessary
    - We deployed our project using Render


## Above and Beyond Functionality

## Next Steps

## Contributions

Emma: I designed the database schema with Maggie as well as the backend structure. I wrote 21 out of the 24 endpoints we have for this project, including complex JSON object parsing and validation logic for openAI generated lessons, JWT based user authentication and authorizaion, and complex MongoDB aggregation pipelines to compute user lesson stats. For the frontend. I set up a mock server for easier development when the backend isnt ready yet, did some integration to hook up the frontend and backend, and wrote a few components on the dashboard page with Maggie.


## Prototypes
<img src="images/prototype.jpg" width="400px">



## Team Members

- Daichi Furukawa: Currently in my fourth year, studying Cognitive Systems - Computational Intelligence & Design (CS Stream)! A fun fact about me is that I can name any (or at least most...) dinosaur from a picture!
- Emma Huang: I'm a Computer Science student going into my 3rd year this fall, and I like playing piano and hiking!
- Maggie Weng: I'm going into my third year as a Computer Science student and I like ducks and digital art.
- Antonia Tykei: I am second degree BCS student and I absolutely love the outdoors and crafting!





