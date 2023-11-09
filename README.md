# Convex + TypeScript + ESLint + Vite + React + Clerk + Tailwind + shadcn/ui

This template provides a minimal setup to get Convex working, with TypeScript,
ESLint and React using [Vite](https://vitejs.dev/). It uses [Clerk](https://clerk.dev/) for user authentication.

Start by editing `convex/myFunctions.ts` and interact with your React app.

See Convex docs at https://docs.convex.dev/home

## Setting up

```
npm create convex@latest -t react-vite-clerk-shadcn
```

Then:

1. Follow steps 1 to 3 in the [Clerk onboarding guide](https://docs.convex.dev/auth/clerk#get-started)
2. Paste the Issuer URL as `CLERK_JWT_ISSUER_DOMAIN` to your dev deployment environment variable settings on the Convex dashboard (see [docs](https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances))
3. Paste your publishable key as `VITE_CLERK_PUBLISHABLE_KEY="<your publishable key>"` to the `.env.local` file in this directory.

If you want to sync Clerk user data via webhooks, check out this [example repo](https://github.com/thomasballinger/convex-clerk-users-table/).

**Inspiration**
We're developing a web application designed to simplify event planning among groups of friends. We've all been there, hearing phrases like 'What's the plan?' or 'What are we doing this weekend?' But often, even if a plan is made, it doesn't materialize. That's where our solution comes in. Our mission is to transform those ideas 'x,' 'y,' and 'z' into reality, ensuring that what's discussed actually becomes an unforgettable experience.

**What it does**
Our application is a user-friendly platform that simplifies the process of organizing and coordinating events among friends or groups. Users can create and join groups, and within these groups, each member has the ability to input their availabilities and propose potential plans or activities they'd like to pursue.

The magic happens when our app takes this input and performs its scheduling wizardry. It crunches the data and, with the goal of maximizing participation and satisfaction, identifies the most suitable day and time for the proposed plans. This means no more endless back-and-forth discussions and "What's the plan?" messages. Our application streamlines the decision-making process, making it easy for groups to quickly agree on a concrete schedule that works best for everyone involved. It transforms vague intentions into concrete, achievable events, fostering stronger social connections and ensuring that those exciting ideas truly come to fruition.

**How we built it**
Interactive Integration: This web-based interactive application has been crafted utilizing the React framework and TypeScript. It seamlessly incorporates a suite of libraries and Application Programming Interfaces (APIs), including Clerk, Convex, and Tailwind CSS, to provide robust user authentication, efficient data storage on a cloud-based database, and sophisticated styling for the user interface components.

Environment: To manage user authentication, we implemented Clerk within our project. While Clerk proved to be a valuable choice, we encountered some setbacks when navigating outdated documentation. Ensuring that every team member had their environment properly configured became a priority and led to a temporary delay in our workflow.

Understanding Data Handling: Understanding how Convex tables its data and efficiently manages information was another hurdle we had to overcome. Convex's data model differs from traditional databases, and adapting our data handling strategies to match this model required careful consideration and experimentation.

Function Storage: Storing functions and code as data within Convex was a new concept for our team. We had to reevaluate our usual code organization and design to effectively utilize this feature while ensuring our codebase remained maintainable and organized.

**What's next for What's Plots**
Next Steps: What's Plots' forthcoming strategic initiatives encompass the deployment of AI-driven event recommendations. Our intent is to leverage advanced AI algorithms to offer personalized event suggestions rooted in users' geographical context and preferences. Furthermore, we are committed to the integration of a seamless payment system that empowers users to procure tickets for paid events through our platform, facilitating swift transactions. Additionally, Plots is poised to forge alliances with prominent calendars like Google Calendar and Outlook, enabling users to seamlessly export and archive their plans beyond our ecosystem. These pivotal undertakings epitomize our unwavering commitment to enhancing the Plots experience for our discerning clientele.
