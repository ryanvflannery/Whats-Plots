# What's Plots

**What's Plots** is a web application designed to simplify event planning and coordination among groups of friends. If you've ever found yourself stuck in endless back-and-forths about what to do and when to do it, this app is here to help. By transforming vague plans into concrete, achievable events, What's Plots makes sure your social ideas become memorable experiences.

## Features

- **Group Event Planning:** Create and join groups, and within each group, members can input their availabilities and suggest potential activities.
- **Automated Scheduling:** The app analyzes the group's input to determine the best possible time for an event, maximizing participation and minimizing conflicts.
- **Streamlined Decision-Making:** Say goodbye to endless "What's the plan?" messages. What's Plots makes it easy for groups to quickly agree on a schedule that works for everyone.
- **Strengthening Social Connections:** By ensuring that plans are not just discussed but actually happen, What's Plots fosters stronger bonds within your social circle.

## How It Works

1. **Create a Group:** Start by creating a group with your friends or colleagues.
2. **Input Availability:** Each group member can input their availability and suggest activities they'd like to do.
3. **Automated Scheduling:** The app processes the inputs to find the most suitable day and time for the proposed activities.
4. **Finalize Plans:** Once the app suggests the best schedule, the group can quickly agree and lock in the plan.

## Technology Stack

- **Frontend:** React with TypeScript for a dynamic and responsive user interface.
- **Backend:** Convex for efficient data management and cloud-based storage.
- **User Authentication:** Clerk for seamless and secure user authentication.
- **Styling:** Tailwind CSS for modern and responsive design.

## Challenges We Overcame

- **Learning Curve with Convex:** We adapted to Convex's unique approach to data management, which required a deep understanding of its libraries and components.
- **Environment Setup:** Configuring Clerk for user authentication presented challenges, especially with outdated documentation, but we ensured a smooth setup for the team.
- **Data Handling:** Understanding Convex's data model and storing functions as data required careful consideration and experimentation.

## Accomplishments

- **Leveraging Convex's Power:** We successfully harnessed Convex's innovative data management to drive the app's functionality.
- **Seamless User Authentication:** Integrating Clerk enhanced the security and user experience of our platform.
- **Team Growth:** Our primarily beginner team overcame significant challenges, mastering new tools and techniques along the way.

## Future Plans

- **AI-Driven Event Recommendations:** We plan to implement AI algorithms to provide personalized event suggestions based on users' locations and preferences.
- **Payment Integration:** We'll integrate a payment system for purchasing tickets to paid events directly through the platform.
- **Calendar Syncing:** Future updates will include syncing with popular calendars like Google Calendar and Outlook, allowing users to export and archive their plans.

## Getting Started

To get started with What's Plots, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/whats-plots.git
   ```
2. Install dependencies:
   ```bash
   cd whats-plots
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

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
Interactive Integration: This web-based interactive application has been crafted utilizing the React framework and TypeScript. It seamlessly incorporates a suite of libraries and Application Programming Interfaces (APIs), including Clerk, Convex, and Tailwind CSS, to provide extensive user authentication, efficient data storage on a cloud-based database, and sophisticated styling for the user interface components.

Environment: To manage user authentication, we implemented Clerk within our project. While Clerk proved to be a valuable choice, we encountered some setbacks when navigating outdated documentation. Ensuring that every team member had their environment properly configured became a priority and led to a temporary delay in our workflow.

Understanding Data Handling: Understanding how Convex tables its data and efficiently manages information was another hurdle we had to overcome. Convex's data model differs from traditional databases, and adapting our data handling strategies to match this model required careful consideration and experimentation.

Function Storage: Storing functions and code as data within Convex was a new concept for our team. We had to reevaluate our usual code organization and design to effectively utilize this feature while ensuring our codebase remained maintainable and organized.

**What's next for What's Plots**
Next Steps: What's Plots' forthcoming strategic initiatives encompass the deployment of AI-driven event recommendations. Our intent is to leverage advanced AI algorithms to offer personalized event suggestions rooted in users' geographical context and preferences. Furthermore, we are committed to the integration of a seamless payment system that empowers users to procure tickets for paid events through our platform, facilitating swift transactions. Additionally, Plots is poised to forge alliances with prominent calendars like Google Calendar and Outlook, enabling users to seamlessly export and archive their plans beyond our ecosystem. These pivotal undertakings epitomize our unwavering commitment to enhancing the Plots experience for our discerning clientele.

