# Group 14 - Mangoose

We're developing an innovative web application designed for students and learners to enhance their understanding of various subjects. Users can upload PDFs to create interactive and personalized lessons featuring true/false, fill-in-the-blank, and multiple-choice questions. The platform includes user authentication, progress tracking, and gamified elements like streaks and levels to make learning engaging and effective, as well as sharing lessons with other users.

Website url: https://project-14-resting-shark-frontend.onrender.com/

![Status](https://github.com/ubc-cpsc455-2024S/project-14_resting_shark/actions/workflows/main.yml/badge.svg)

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
- Customizable profile picture ✔️
- Community ✔️
- User stats ✔️
- Timer cooldown when lives are used up ✔️


## How tech from Units 1-5 are used in the project
1. HTML/CSS/JS
   - CSS was used to style our components so that they aligned with the UI design that we created beforehand on Figma via extensive UX research. Without CSS, we would not have been able to incorporate our UX research and UI designs into this project.
   - We tried to follow the best CSS practices, and inline CSS was only ever used when the CSS involved a variable inside of a TSX file.
   - Although we used TypeScript instead of JavaScript for this project (close enough), TypeScript was the programming language that allowed us to bring our project to life. We wrote a lot of helper functions in Typescript to help us on the frontend, created Typescript classes such as Lesson.ts and User.ts, and our entire backend was built using Typescript.

3. React and Redux
   - React allowed us to make reusable components, which was very helpful for components that repeated across the page such as our LessonCard component in our dashboard and explore.
   - React hooks were helpful because we had so many dynamic variables that kept changing, especially in our lesson flow: lives, streak, currentPage, whether the user has provided an answer to every question, etc. UseState was used a lot for dynamic variables, and useEffect was called a lot for functions that needed to run on mount, functions that ran on unmount, and updating things with dependencies. For example, one of our useEffects keeps track of whether our current page number has changed and updates our farthestPage variable if we've progressed past our previous farthest page. This lets us update the progress bar that displays the user's progress on the dashboard, so that our users can know much of each lesson they've done without needing to navigate into the lesson. These are some things that wouldn't have been so convenient to implement if we were using plain HTML with no access to React hooks.
   - In our lesson component, useContext was especially helpful since it allowed us to have global variables that all of our tiny components inside of the lesson could have access to. This was a lot easier than passing everything down as a prop in multiple different areas, especially since we had to keep track of many states (whether the current page a question, whether the user can progress past the question, etc).
   - Since our lesson is very interactive and we had so many components updating themselves constantly at different times, React's ability to only update parts of the DOM that changed made our user experience a lot smoother. With HTML, the entire page would've been updating itself too many times, slowing down the performance.
   - We used Redux to handle our Auth token, which we would normally do using a context. This made it easier to manage and access authentication tokens alongside other global state variables.
   - All of our dashboard lessons were kept track of using Redux as well, and so was most of the variables inside of each lesson. As mentioned above, we had a lot of everchanging variables to keep track of so redux helped us keep our states clean.

5. NodeJS/Express
   - the backend of this project is a RESTful API written using NodeJS and Express.
   - Express is very unpoinionated, so we could easily design and structure our code the way we want and not be forced to follow a predetermined framework
       - our code follows a Routers > Services structure, where all business logic is contained in the service layer to keep the router layer clean 
       - This made it so that our router layer acts like an interface for all the endpoints we have, with clear comments on each one
  - Express uses customizable middleware, allowing us to write our own authentication and authorization middleware which uses JWT based authentication. This was a very good exprerience for us as it allows us to understand the underlying principals of JWT based auth instead of relying on frameworks or third party sources.
  - Using NodeJS + Express in the backend rather than some other language + framework works very well for us since it allows us to write our entire project (both frontend and backend) in Typescript
  - NodeJS + Express is also very lightweight and does not require a lot of boilerplate code (in comparison to say SpringBoot), making it ideal for this project since it is on the smaller side and we could spin it up very quickly.

4. MongoDB
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

5.  Release Engineering
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

- We have integrated our application with OpenAI in order to generate lessons from pdfs provided by the user. A lesson is represented by a very complex and rigid JSON sttructure, that needs to follow our defined lesson interface exactly in order to be rendered properly on the frontend. This isn't just a simple call to the API, but we have complex logic on validation and parsing of the JSON structure returned by OpenAI, and made many design changes to our database and how we would query, fetch, and store a lesson in order to most effectively ensure a smooth user experience when generating lessons. For example, we first decided to store all our objects inside of a lesson as seperate documents (normalized), but found out that it would be incredibly difficult to get OpenAI to generate multiple objects while keeping context, or to perform extensive joins when trying to fetch a full lesson. We leveraged MongoDB's feature of allowing nested objects to introduce some redundancy into our storage format and store one full lesson per document, increasing both speed of storage and retrieval, requiring less parsing and validation, and resulting in better quality of generated answers.
- Our lessons are fully interactive, instead of just displaying data on a screen, we have answer correctness checking, progress checking, AI assistant helper, progress blocking (you can't progress to a new question if you dont finish an old one), lives and streaks, a stats graph to show lesson activity data, and a cooldown timer that locks you out of the lesson if you lose all your lives to encourage users to not randomly guess answers.
- We implemented our own authentication and authorization with JWT tokens. We also hash our passwords when storing in the DB for best security practices.

## Next Steps
We have a number of potential improvements and additional features that we would like to add to our project. 

If we continue to develop and work on this project we would consider adding functions and/or features like:
- Developing additional and extended question formats. There are so many subjects that learners may be interested in which they could benefit from by having more types of questions for example, having long text answers, diagram generation and labelling, or verbal/speech responses for users learning a new language.
- We would be interested in expanding the community aspect of our project by for example, being able to add friends and see their progress or collaborate on specific topics with friends.
- We may consider broadening and refining the content that users can upload or share to generate their lessons. For example, users may want to generate a lesson from an image, picture, article or existing webpage so we would like to be able to support this.
- We would also love to add features like being able to set up notifications to remind you to complete a certain number of lessons or practice a day, having cutomized recommendations for new lessons based on your previous topics/interests.

## Contributions

Maggie: I designed most of the UI, coded the lessons page and almost all of the lesson logic, developed the profile page and the profile customization feature, drew the profile picture images with Emma, coded the explore page, and contributed to frontend and backend integration. I implemented drag and drop for our fill-in-the-blank question, the ability for users to connect two components with an svg line and drag components to reorder them in the matching question, and the timer that locks users out of lessons upon losing all their lives. I also designed the database schema with Emma and pair programmed the dashboard with her. Finally, I set up CI/CD, deployed the frontend application, wrote a few frontend tests, and helped my team members with general questions and debugging.

Emma: I designed the database schema with Maggie as well as the backend structure, explained the design to the rest of the team with Maggie, helped team members with general questions and debugging their code whenever they requested my help, and pair programed with every team member. I wrote 20 out of the 23 endpoints we have for this project, including complex JSON object parsing and validation logic for openAI generated lessons, JWT based user authentication and authorizaion, and complex MongoDB aggregation pipelines to compute user lesson stats. For the frontend. I set up a mock server for easier development when the backend isnt ready yet, did some integration to hook up the frontend and backend, and wrote a few components on the dashboard page with Maggie.

Antonia: I primarily helped with developing the components and frontend for the landing, login and registration pages. I ensured there was proper validation for registering the users. I also helped with the profile editing page ensuring we had an update endpoint for the new information. 

Daichi: I created the MultipleChoice component, ensuring it followed the design prototype and project theme. I centralized and streamlined the correctness logic for each question type within the Lesson component. Collaborated with EH on lesson generation using the OpenAI API, including implementation of the UI and backend endpoint for the PDF-to-Text-to-Lesson process with the pdf-parse library. Implemented an AI Helper for virtual assistance using OpenAI's createChat method. Designed the UI for the completed lesson page and debugged the issue in the submission process.

## Prototypes
<img src="images/prototype.jpg" width="400px">


## Describe your topic/interest in about 150-200 words

We are interested in creating a tool for students and learners who want to develop and/or reinforce their understanding and knowledge of various subjects. This web application will allow users to generate interactive lessons from images or PDFs (provided by the user) to support their education and studies through personalized and engaging learning experiences.

The application will store data such as created lessons, user profile information, and progress metrics like streaks and leagues. A user can upload some educational materials in the form of images or PDFs and will receive personalized and gamified lessons on this subject/materials. Users will then be able to learn from these lessons through different question formats including true/false questions, fill in the blanks, multiple choice, and long answer questions. They will also be able to track their progress over time.

Depending on time constraints, other additional functionalities may include diagram-based questions, real-time multiplayer modes, and a community feature for discussion and lessons sharing which may further enhance the learning experience.

This project aims to be a comprehensive tool for learners to deepen their understanding of certain subject matters and retain information more effectively.

## Team Members

- Daichi Furukawa: Currently in my fourth year, studying Cognitive Systems - Computational Intelligence & Design (CS Stream)! A fun fact about me is that I can name any (or at least most...) dinosaur from a picture!
- Emma Huang: I'm a Computer Science student going into my 3rd year this fall, and I like playing piano and hiking!
- Maggie Weng: I'm going into my third year as a Computer Science student and I like ducks and digital art.
- Antonia Tykei: I am second degree BCS student and I absolutely love the outdoors and crafting!





