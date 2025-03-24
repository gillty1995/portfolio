export const projectsData = [
    {
      id: 1,
      title: "RSVPMe: Easy Event Planning",
      description:
        "Ever struggled to keep track of who’s coming to your events? RSVPMe makes event planning effortless by allowing users to create, manage, and track RSVPs—all in one place. Whether it’s a small gathering or a large party, RSVPMe ensures smooth coordination with built-in location services and real-time updates. ",
      backgroundImage: "/images/rsvpme-image.png",  
      links: {
        "Live Site": "https://rsvpme.hec.to/",
        "Frontend Repository": "https://github.com/gillty1995/rsvpme",
        "Backend Repository": "https://github.com/gillty1995/rsvpme_api",
      },
      frontendFramework: `
      <p><strong>RSVPMe’s frontend</strong> was built with <strong>React, TypeScript, and TailwindCSS</strong>, offering a fast, <strong>component-based</strong> experience that works seamlessly across all devices.</p>
      <h4 class="font-semibold">Technologies Used:</h4>
      <ul>
        <li><strong>React & TypeScript</strong> – Ensures a dynamic and type-safe UI.</li>
        <li><strong>TailwindCSS</strong> – Provides a sleek, responsive design.</li>
        <li><strong>Framer Motion</strong> – Adds smooth animations and interactions.</li>
        <li><strong>Google Maps API</strong> – Enables location selection and event directions.</li>
      </ul>
    `,
    backendFramework: `
    <p><strong>RSVPMe’s backend</strong> is built with <strong>Node.js, Express, and TypeScript</strong>, ensuring a <strong>scalable, high-performance API</strong> for handling event creation, authentication, and user management.</p>
    <h4 class="font-semibold">Technologies Used:</h4>
    <ul>
      <li><strong>Node.js & Express</strong> – API development with RESTful principles.</li>
      <li><strong>MongoDB</strong> – Stores event data, user profiles, and RSVPs.</li>
      <li><strong>Auth0</strong> – Handles secure authentication.</li>
      <li><strong>Nodemailer</strong> – Enables email communication for RSVP confirmations.</li>
      <li><strong>AWS EC2, PM2, & Nginx</strong> – Deployment, process management, and reverse proxy configuration.</li>
    </ul>
  `,
      challengesFaced:
       "One of the biggest challenges I faced was learning how to implement Auth0 for authentication, as I typically use JWT for user verification. Auth0 introduced a different approach to handling authentication, requiring me to understand how it manages user sessions, tokens, and API authorization. Initially, figuring out how to retrieve and manage user data across the frontend and backend was a bit of a learning curve. However, once I grasped the Auth0 flow—including login, logout, and token verification—it became much easier to integrate seamlessly into my application! ",
       futureImprovements: `
      <p>Here are several ideas for enhancing RSVPMe to make event planning even more user-friendly:</p>
      <ul>
        <li><strong>Improved Sharing Options</strong> – Expanding sharing features to allow users to easily send RSVPs via <strong>social media, SMS, and direct links</strong>, further streamlining the invitation process.</li>
        <li><strong>Customizable RSVP Formats</strong> – Giving users the ability to <strong>personalize</strong> the design and layout of their RSVP messages, ensuring they align with their event’s theme and branding.</li>
        <li><strong>Calendar Integrations</strong> – Implementing <strong>Google Calendar and Apple Calendar integrations</strong>, allowing users to <strong>add events directly to their calendars</strong> with a single click, ensuring better organization and reminders.</li>
      </ul>
    `,
      finalThoughts:
        "RSVPMe is a modern event planning solution, eliminating unnecessary complexity while making event coordination seamless. If you love hassle-free planning, give it a try! ",
      videoUrl: "/videos/rsvpme-video.mp4",
      details: `
      <p><strong>RSVPMe</strong> was built to make event planning <strong>easy, clutter-free, and intuitive</strong>. Users can:</p>
      <ul>
        <li>✅ <strong>Create and manage events</strong> with a few clicks.</li>
        <li>📍 <strong>Select event locations</strong> using Google Maps integration.</li>
        <li>🔔 <strong>Send and track RSVPs</strong> to see who’s attending.</li>
        <li>📧 <strong>Stay connected</strong> with attendees via built-in messaging.</li>
        <li>🔐 <strong>Secure authentication</strong> powered by Auth0.</li>
      </ul>
      <p>With a sleek, interactive UI and powerful backend architecture, RSVPMe makes event coordination a breeze!</p>
    `,
    },
    {
      id: 2,
      title: "Futbol Scores",
      description: "A football-themed web application that allows users to search for teams, view live games, and save their favorite matches. It integrates RapidAPI’s Football API to display real-time data. Users can create accounts, log in, and manage saved games.",
      backgroundImage: "/images/futbolscores-image.png", 
      links: {
        "Live Site": "https://www.futbolsc.fr.to/",
        "Frontend Repository": "https://github.com/gillty1995/futbol-scores-frontend",
        "Backend Repository": "https://github.com/gillty1995/futbol-scores-backend",
      },
      frontendFramework: `<p>Developed the frontend of my football scores website using <strong>React</strong> to create a dynamic and responsive interface. I organized the codebase into modular components for easy management, using <strong>React Router</strong> to handle page navigation. API requests were made with <strong>Axios</strong> to both the backend and RapidAPI’s Football API to fetch and display real-time football data.</p>
      
      <p>Global state was managed with <strong>Context APIs</strong> (AuthContext and CurrentUserContext) to store user authentication and session data. CSS Modules ensured maintainable and scoped component styling. I also implemented <strong>localStorage</strong> to persist user sessions by saving JWT tokens across reloads. Error handling mechanisms provided feedback for failed logins or searches, ensuring a smooth user experience.</p>
      
      <p>Each route is protected to ensure only authenticated users can access features like viewing or saving favorite games. This frontend integrates seamlessly with the backend, enabling a personalized experience for football fans.</p>
      
      <h4><strong>Technologies Used:</strong></h4>
      <ul>
        <li><strong>React</strong> – Used for building the dynamic and responsive user interface.</li>
        <li><strong>React Router</strong> – Handles navigation between different pages.</li>
        <li><strong>Axios</strong> – For making API requests to the backend and RapidAPI’s Football API.</li>
        <li><strong>Context APIs</strong> – Manages global state, including user authentication and session data.</li>
        <li><strong>CSS Modules</strong> – Provides scoped and maintainable styling for components.</li>
        <li><strong>localStorage</strong> – Saves JWT tokens to persist user sessions across page reloads.</li>
      </ul>
      
      <p>This project follows the basic <strong>MERN stack</strong> architecture, with a <strong>React</strong> frontend and a <strong>JavaScript</strong> backend. It integrates with the <strong>football-api</strong> to retrieve live and upcoming fixtures for soccer teams.</p>`,
      backendFramework: `<p>The backend for <strong>Futbol Scores</strong> was built using <strong>Node.js</strong> and <strong>Express.js</strong> to handle user authentication, game management, and interactions with a <strong>MongoDB</strong> database. Below is a detailed breakdown:</p>

      <h4><strong>Technologies Used:</strong></h4>
      <ul>
        <li><strong>Node.js</strong>: Provides a server-side runtime environment.</li>
        <li><strong>Express.js</strong>: Framework for building RESTful APIs.</li>
        <li><strong>MongoDB</strong>: Stores user profiles and saved matches.</li>
        <li><strong>Mongoose</strong>: Handles database interactions with an easy-to-use schema model.</li>
        <li><strong>Celebrate</strong>: Validates request data to ensure consistency.</li>
        <li><strong>CORS</strong>: Allows the frontend to make requests to the backend.</li>
        <li><strong>dotenv</strong>: Manages environment variables securely.</li>
        <li><strong>PM2</strong>: Ensures smooth deployment by managing server processes.</li>
      </ul>`,
      challengesFaced: "One of the biggest challenges was implementing the game modal consistently across different sections without making the code complex or cluttered. I aimed to keep the logic clear and reusable to ensure the modal could work seamlessly throughout the site, whether for live matches or saved games.",
      futureImprovements: "I plan to add a notification feature that emails users before their saved games begin. Additionally, I’d like to introduce a standings or statistics modal accessible from the game modal, providing more in-depth team data such as performance metrics and league standings.",
      finalThoughts: "One of my favorite projects I've worked on to date. I love being able to keep track of my favorite teams and check on the scores live no matter where I am. If you're a soccer fan like me then check it out!",
      videoUrl: "/videos/futbolscores-video.mp4",
      details: "I’m a big soccer fan, so I’m constantly checking different websites and apps to see live scores or the time of an upcoming game. In my experience using the available apps out in the current market is that they’re very cluttered, albeit with useful data, but unnecessary to what I was looking to experience. I just want to know the score and know when the next game is. So I made a clean, simple to use, aesthetic application that users can use to look up their favorite teams, stay up to date on upcoming games, save games to their personal account, and even see the live scores. I also added a Live Now section that displays all the live games going on around the world so people can discover new teams.",
    },
    {      
    id: 3,
    title: "Practibot: Music Chatbot",
    description: "Ever wanted a music tutor at your fingertips? 🎶 Practibot is here to help you learn and improve your music skills with the power of AI! Designed for musicians and aspiring learners alike, Practibot offers detailed guidance on music theory, composition, and practice techniques through a conversational, user-friendly chatbot.",
    backgroundImage: "/images/practibot-image.png", 
    links: {
      "Live Site": "https://practibot.hec.to/",
      "Frontend Repository": "https://github.com/gillty1995/practibot-frontend",
      "Backend Repository": "https://github.com/gillty1995/practibot-backend",
    },
    frontendFramework: `<p>Practibot’s frontend provides an intuitive, responsive interface, ensuring that users can interact with the chatbot effortlessly. Built with <strong>React</strong> and <strong>Typescript</strong>, the frontend prioritizes usability and responsiveness.</p>

    <h4><strong>Technologies Used:</strong></h4>
    <ul>
      <li><strong>React</strong>: For a dynamic, component-based architecture.</li>
      <li><strong>Typescript</strong>: Ensures type safety and better code quality.</li>
      <li><strong>TailwindCSS</strong>: Provides sleek, responsive designs with minimal effort.</li>
    </ul>`,
    backendFramework: `<p>Practibot’s backend is built with <strong>Python</strong> and <strong>FastAPI</strong>, leveraging asynchronous programming for efficient handling of user queries.</p>

    <h4><strong>Technologies Used:</strong></h4>
    <ul>
      <li><strong>Python</strong>: For logic, asynchronous processing, and integrations.</li>
      <li><strong>FastAPI</strong>: To build a scalable, high-performance API for the chatbot.</li>
      <li><strong>OpenAI GPT-4</strong>: Powers the chatbot’s intelligent and interactive responses.</li>
      <li><strong>Pytest</strong>: Used to write unit tests and ensure backend reliability.</li>
    </ul>`,
    challengesFaced: "As this was my first project with Python, I had to quickly adapt to its syntax and ecosystem. Learning FastAPI was an exciting challenge, and it provided invaluable insights into asynchronous programming. Also formatting custom tablature required precise string manipulation and error handling, which was both challenging and rewarding.",
    futureImprovements: `
    <ul>
      <li><strong>Expanded Instrument Support</strong>: Adding support for piano, violin, and other instruments to widen Practibot’s audience.</li>
      <li><strong>Audio Feedback</strong>: Introducing text-to-speech capabilities to provide audio responses for improved accessibility.</li>
      <li><strong>Advanced Music Theory Tools</strong>: Including functionalities like key modulation suggestions and rhythm pattern generation.</li>
    </ul>`,
    finalThoughts: "This project was a perfect blend of my love for music and software development. Practibot stands as a testament to my ability to learn new technologies and integrate them into meaningful, real-world applications. If you’re curious about AI, music, or both, check it out! 🎶",
    videoUrl: "/videos/practibot-video.mp4",
    details: `<p><strong>Practibot</strong> combines my passion for music and software engineering to provide a unique platform for learning music. Users can interact with the chatbot to get:</p>

    <ul>
      <li>🎵 <strong>Detailed explanations of music theory concepts.</strong></li>
      <li>🎸 <strong>Guitar and bass tablature for custom chord progressions.</strong></li>
      <li>🤖 <strong>Real-time responses powered by OpenAI’s GPT-4, making learning intuitive and engaging.</strong></li>
    </ul>
    
    <p>With its sleek interface and intelligent backend, Practibot makes music learning accessible to everyone, whether you’re a seasoned musician or just starting out.</p>
    `,
    },
    {
    id: 4,
    title: "FutbolRules: GenAI Soccer Assistant",
    description: "What the heck is an offside rule? What makes a foul a foul? 🤷‍♂️ FutbolRules will help you get accurate, real-time answers to any question about soccer rules using Generative AI. It’s a user-friendly platform where users can input their queries, and the AI-powered backend responds with detailed answers, helping users better understand the intricacies of the game.",
    backgroundImage: "/images/futbolrules-image.png", 
    links: {
       "Live Site": "https://futbolrules.hec.to/",
       "Frontend Repository": "https://github.com/gillty1995/genai-soccer-assistant",
       "Backend Repository": "https://github.com/gillty1995/genai-soccer-assistant-backend",
    },
    frontendFramework: `<p>The frontend is developed using <strong>React</strong> and <strong>Vite</strong>, providing a dynamic, interactive interface where users can ask questions and get real-time responses. I used <strong>TailwindCSS</strong> for styling to ensure a responsive, mobile-friendly layout. Here’s an overview of how I built the frontend:</p>

    <h4><strong>Technologies Used:</strong></h4>
    <ul>
      <li><strong>React</strong>: Frontend framework for building interactive UIs.</li>
      <li><strong>Vite</strong>: Fast build tool for quicker development iterations.</li>
      <li><strong>TailwindCSS</strong>: Utility-first CSS framework for responsive design.</li>
    </ul>`,
    backendFramework: `<p>The backend for <strong>GenAI Soccer Assistant</strong> is built using <strong>Node.js</strong> and <strong>Express.js</strong>, with integration to OpenAI’s GPT-4 model. The app provides secure endpoints for handling user queries. Here’s how I built it:</p>

    <h4><strong>Technologies Used:</strong></h4>
    <ul>
      <li><strong>Node.js</strong>: Server-side JavaScript runtime.</li>
      <li><strong>Express.js</strong>: Lightweight framework for building RESTful APIs.</li>
      <li><strong>OpenAI GPT-4</strong>: AI model used to generate responses to soccer rule questions.</li>
      <li><strong>Joi</strong>: For input validation to ensure clean and correct data.</li>
      <li><strong>Winston</strong>: Logging requests and errors for debugging and monitoring.</li>
      <li><strong>express-rate-limit</strong>: Prevents brute-force attacks by limiting the rate of incoming requests.</li>
      <li><strong>Helmet</strong>: For securing HTTP headers.</li>
    </ul>`,
    challengesFaced: "A challenge I faced during this project was integrating the AI and ensuring it returned meaningful and accurate answers. Additionally, setting up the correct Nginx configuration for deployment took some time, and I had to troubleshoot several issues to get everything running smoothly in a production environment.",
    futureImprovements: `
    <ul>
      <li><strong>Real-Time Updates</strong>: I’m curious if I can integrate the app with live data to answer questions about ongoing matches or current events in soccer.</li>
      <li><strong>Multi-language Support</strong>: I’d like to add a language option to cater to soccer enthusiasts from different regions.</li>
    </ul>`,
    finalThoughts: "I’m curious if I can integrate the app with live data to answer questions about ongoing matches or current events in soccer. I’d also like to add a language option to cater to soccer enthusiasts from different regions.",
    videoUrl: "/videos/futbolrules-video.mp4",
    details: `<p><strong>GenAI Soccer Assistant</strong>, a tool that leverages the power of Generative AI to answer any question about soccer rules in real-time.</p>

    <p>This app allows users to submit soccer-related questions, and the backend, powered by OpenAI’s GPT-4, generates immediate and accurate responses. The clean interface ensures a user-friendly experience, whether you’re looking up a rule for fun or need to clarify an official decision.</p>
    
    <p>I took this project as an opportunity to learn how to deploy a web application using AWS Cloud.</p>
    
    <h4><strong>Cloud Technologies Used:</strong></h4>
    <ul>
      <li><strong>Amazon EC2 (Elastic Compute Cloud)</strong>: I provisioned virtual servers using EC2 to host the application and handle traffic.</li>
      <li><strong>Firewall Settings</strong>: I configured firewall rules to ensure secure communication between the web server and the internet, ensuring only the necessary ports were open.</li>
      <li><strong>Ubuntu Server</strong>: I used an Ubuntu server for hosting the application, adding additional experience to my skillset with Linux-based environments for deployment.</li>
      <li><strong>Security Groups</strong>: Managed security groups on EC2 to control access and restrict traffic based on IP addresses and ports.</li>
    </ul>`,
    },
  ];