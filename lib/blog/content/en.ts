// English post content. Same slugs and structure as content/id.ts.

import type { PostContent } from "../types";

const en: Record<string, PostContent> = {
  "your-code-works-but-can-it-scale": {
    title: "Your Code Works. But Can It Scale?",
    excerpt:
      "The app runs fine locally, then the users show up. The first step to scalability is usually much simpler than microservices: find the bottleneck, measure, then fix.",
    intro: [
      {
        type: "p",
        text: "The app runs smoothly in the local environment. The API responds quickly. Then the number of users grows.",
      },
      {
        type: "p",
        text: "Response times start to climb. Database queries get slower. Some requests time out.",
      },
      {
        type: "p",
        text: "Scalability doesn't mean you have to jump straight to microservices, Kubernetes, or complex infrastructure. Often, the first steps are much simpler:",
      },
      {
        type: "list",
        items: [
          "Identify the bottleneck.",
          "Optimize database access.",
          "Use caching wisely.",
          "Choose the right scaling strategy.",
          "Measure performance.",
        ],
      },
      {
        type: "p",
        text: "The most important thing: don't optimize on assumptions alone. Measure first, find the bottleneck, fix it, then verify the result.",
      },
    ],
    sections: [
      {
        kicker: "The Scalability Problem",
        heading: "It works in development. Then traffic grows.",
        blocks: [
          {
            type: "p",
            text: "An application that runs smoothly under light load can run into trouble as the load grows. An app that serves 10 users isn't necessarily ready for 10,000.",
          },
          {
            type: "list",
            items: [
              "Response times keep rising.",
              "The database starts to struggle.",
              "Requests time out.",
              "Users run into errors.",
            ],
          },
          {
            type: "quote",
            text: "More users don't just mean more requests. They expose your system's bottlenecks.",
          },
        ],
      },
      {
        kicker: "Find the Bottleneck",
        heading: "Your server might not be the problem",
        blocks: [
          {
            type: "p",
            text: "When an application slows down, adding servers isn't always the first fix. Find out where the time is actually going.",
          },
          {
            type: "cards",
            items: [
              { title: "API / Application", text: "High CPU, blocking operations, or slow processing." },
              { title: "Database", text: "Expensive queries, missing indexes, or an exhausted connection pool." },
              { title: "External Services", text: "Slow or failing third-party APIs." },
            ],
          },
          { type: "quote", text: "Measure first. Optimize the actual bottleneck." },
        ],
      },
      {
        kicker: "Database Performance",
        heading: "One bad query can slow everything down",
        blocks: [
          { type: "p", text: "An example query that looks up a user by email:" },
          {
            type: "code",
            label: "Without an appropriate index",
            tone: "bad",
            lang: "sql",
            code: "SELECT *\nFROM users\nWHERE email = 'user@example.com';",
          },
          {
            type: "p",
            text: "On a large table, the database may have to scan many rows if there's no suitable index.",
          },
          {
            type: "code",
            label: "With an appropriate index",
            tone: "good",
            lang: "sql",
            code: "CREATE INDEX idx_users_email\nON users(email);",
          },
          {
            type: "p",
            text: "An index can speed up matching lookups, but the benefit depends on the query, the data distribution, and the query plan.",
          },
          {
            type: "note",
            text: "Indexes cost extra storage and slow down writes. Verify the impact with EXPLAIN or EXPLAIN ANALYZE.",
          },
          { type: "quote", text: "Scaling starts with understanding your data access patterns." },
        ],
      },
      {
        kicker: "Caching",
        heading: "Stop repeating expensive work",
        blocks: [
          {
            type: "p",
            text: "If the same data is read often and doesn't change much, caching can cut down repeated work. The flow is simple:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "A client request comes in.",
              "Look it up in the cache.",
              "Cache hit: return the data from the cache.",
              "Cache miss: query the database, then store the result in the cache.",
            ],
          },
          {
            type: "p",
            text: "Caching can reduce database load and speed up response times for the right workloads. But it also brings challenges: stale data, invalidation, and consistency.",
          },
          { type: "quote", text: "Faster reads are useful only when the data remains correct." },
        ],
      },
      {
        kicker: "Scaling Strategies",
        heading: "Scale up or scale out?",
        blocks: [
          {
            type: "cards",
            items: [
              {
                title: "Vertical scaling (scale up)",
                text: "Add CPU, RAM, or capacity to a single machine. Simpler, but a single machine still has a ceiling.",
              },
              {
                title: "Horizontal scaling (scale out)",
                text: "Run multiple application instances behind a load balancer. It can raise capacity, but needs care around state, coordination, and the database.",
              },
            ],
          },
          {
            type: "p",
            text: "No strategy is always best. The choice depends on traffic patterns, cost, system limits, availability needs, and operational complexity.",
          },
        ],
      },
      {
        kicker: "Test Before You Scale",
        heading: "Don't guess. Load test.",
        blocks: [
          {
            type: "p",
            text: "Before claiming your application is ready for many users, test how it behaves under realistic load. Watch metrics such as:",
          },
          {
            type: "cards",
            items: [
              { title: "Latency", text: "p95 and p99 response times." },
              { title: "Throughput", text: "Requests successfully processed per second." },
              { title: "Error rate", text: "The percentage of failed requests." },
              { title: "Resource usage", text: "CPU, memory, and database connections." },
            ],
          },
          {
            type: "p",
            text: "Start with a load test, find the bottleneck, fix it, then test again.",
          },
          {
            type: "quote",
            text: "A system is only as scalable as its measured capacity and its weakest bottleneck.",
          },
        ],
      },
    ],
    takeaway: {
      heading: "Build for today's needs. Prepare for tomorrow's growth.",
      blocks: [
        {
          type: "p",
          text: "You don't have to jump straight to microservices, Kubernetes, or a complex architecture. Start with the right foundations:",
        },
        {
          type: "list",
          items: [
            "Write efficient queries.",
            "Measure system performance.",
            "Use caching where it fits.",
            "Test capacity before traffic grows.",
            "Scale on evidence, not assumptions.",
          ],
        },
        {
          type: "quote",
          text: "Scalability is not about handling infinite traffic. It's about growing without losing control.",
        },
      ],
    },
    closingQuestion: "What's the first bottleneck you'd investigate when an API starts to slow down?",
  },

  "clean-code-is-about-clarity": {
    title: "Clean Code Is Not About Making Code Look Pretty",
    excerpt:
      "Tidy code is nice to look at, but that's only the beginning. Clean code is about clarity, not cosmetics: easy to understand, change, test, and maintain.",
    intro: [
      {
        type: "p",
        text: "Tidy code is pleasant to look at, but that's only the beginning. Have you ever read code that looked neat and was still hard to understand?",
      },
      {
        type: "list",
        items: [
          "Maybe the variable names are too abstract.",
          "Maybe one function takes on too many responsibilities.",
          "Or maybe the same business logic is scattered across the application.",
        ],
      },
      {
        type: "p",
        text: "That's where clean code becomes more than aesthetics. Clean code helps us write software that is easier to:",
      },
      {
        type: "cards",
        items: [
          { title: "Read", text: "Understood without guesswork." },
          { title: "Change", text: "Modified without unnecessary side effects." },
          { title: "Test", text: "Verified in a more focused way." },
          { title: "Maintain", text: "Looked after over the long term." },
        ],
      },
    ],
    sections: [
      {
        kicker: "The Misconception",
        heading: "Clean code ≠ pretty code",
        blocks: [
          { type: "p", text: "Many developers think clean code means:" },
          {
            type: "list",
            items: [
              "Neat indentation.",
              "Consistent formatting.",
              "No overly long lines of code.",
            ],
          },
          {
            type: "p",
            text: "Those things do help, but formatting alone doesn't make code clean. Code can look neat and still be hard to understand, full of duplication, and risky to change.",
          },
        ],
      },
      {
        kicker: "Readability",
        heading: "Code is read more often than it is written",
        blocks: [
          {
            type: "p",
            text: "Developers don't only write code. They also have to read it, understand it, debug it, and change existing code.",
          },
          {
            type: "code",
            label: "Before · Unclear",
            tone: "bad",
            lang: "ts",
            code: "const d = 86400000;\nconst x = users.filter(\n  u => u.a && u.l < Date.now() - d\n);",
          },
          {
            type: "code",
            label: "After · More expressive",
            tone: "good",
            lang: "ts",
            code: "const ONE_DAY_MS = 86_400_000;\n\nconst dormantUsers = users.filter(\n  user =>\n    user.isActive &&\n    user.lastLoginAt <\n      Date.now() - ONE_DAY_MS\n);",
          },
          {
            type: "note",
            text: "An illustrative example: clear variable names help the reader grasp the intent of the code without guessing what each abbreviation means.",
          },
        ],
      },
      {
        kicker: "Meaningful Names",
        heading: "Good names reduce mental effort",
        blocks: [
          { type: "p", text: "Compare the two examples below." },
          {
            type: "code",
            label: "Not ideal",
            tone: "bad",
            lang: "ts",
            code: "function calc(p: number, q: number) {\n  return p * q;\n}",
          },
          {
            type: "code",
            label: "Clearer",
            tone: "good",
            lang: "ts",
            code: "function calculateTotalPrice(\n  unitPrice: number,\n  quantity: number\n) {\n  return unitPrice * quantity;\n}",
          },
          { type: "quote", text: "The goal is not longer names. It's clearer intent." },
          {
            type: "p",
            text: "A good name explains what the code is meant to do, not just its data type or the steps it takes.",
          },
        ],
      },
      {
        kicker: "Single Responsibility",
        heading: "One function, one clear responsibility",
        blocks: [
          {
            type: "p",
            text: "A function that does too many things is harder to understand, test, and fix.",
          },
          {
            type: "code",
            label: "Too many responsibilities",
            tone: "bad",
            lang: "ts",
            code: 'async function registerUser(input: RegisterInput) {\n  if (!input.email.includes("@")) throw new Error();\n  const user = await db.users.insert(input);\n  await mailer.send(user.email, "Welcome!");\n  return user;\n}',
          },
          {
            type: "code",
            label: "Clearer orchestration",
            tone: "good",
            lang: "ts",
            code: "async function registerUser(input: RegisterInput) {\n  const validatedInput = validateInput(input);\n  const user = await createUser(validatedInput);\n  await sendWelcomeEmail(user);\n  return user;\n}",
          },
          {
            type: "p",
            text: "Splitting responsibilities into meaningful functions can make the flow clearer. But small functions aren't a goal in themselves: every extra abstraction must genuinely improve clarity.",
          },
        ],
      },
      {
        kicker: "Duplication",
        heading: "Duplication makes change expensive",
        blocks: [
          {
            type: "p",
            text: "When the same business logic is spread across many places, a small change can require many fixes. Say the premium-customer discount rule is copied into three different functions. When the rule changes, one implementation can get left behind and produce inconsistent behavior.",
          },
          { type: "p", text: "Principles to keep in mind:" },
          {
            type: "list",
            items: [
              "Avoid duplicating the same business logic.",
              "Extract a shared function when there really is a shared rule or behavior.",
              "Don't create an abstraction just because two pieces of code look alike.",
            ],
          },
          { type: "quote", text: "Good abstraction reduces duplication without hiding intent." },
        ],
      },
      {
        kicker: "Maintainability",
        heading: "Clean code makes change safer",
        blocks: [
          {
            type: "p",
            text: "Code that's easy to understand is easier to evolve as requirements change. Some of its traits:",
          },
          {
            type: "list",
            items: [
              "Names and structure reflect the business logic.",
              "Every function has a clear purpose.",
              "Errors are handled explicitly.",
              "Tests verify the important behavior.",
              "Abstractions are no more complicated than the problem.",
            ],
          },
          {
            type: "p",
            text: "Clean code doesn't mean code that never changes. It helps changes happen with more controlled risk.",
          },
        ],
      },
    ],
    takeaway: {
      heading: "Clean code is about clarity, not cosmetics.",
      blocks: [
        {
          type: "p",
          text: "Good code isn't just code that looks neat. Good code helps the next developer understand:",
        },
        {
          type: "list",
          items: ["What does this code do?", "Why does it exist?", "How can I change it safely?"],
        },
        { type: "quote", text: "Write code for the next person who has to read it." },
      ],
    },
    closingQuestion:
      "Which clean code habit has had the biggest impact on the quality of the software you build?",
  },

  "production-ready-software": {
    title: "Your Code Works. But Is It Production-Ready?",
    excerpt:
      "Working software and production-ready software are not the same thing. Five aspects set them apart: error handling, data validation, security, testing & observability, and maintainability.",
    intro: [
      {
        type: "p",
        text: "Code that runs well isn't necessarily ready for production.",
      },
      {
        type: "p",
        text: "The feature works and there are no errors, but real-world software faces conditions far more complex than your local environment. That's where the difference between working software and production-ready software starts to show.",
      },
      { type: "p", text: "Five aspects to pay attention to:" },
      {
        type: "list",
        items: [
          "Error Handling",
          "Data Validation & Integrity",
          "Security",
          "Testing & Observability",
          "Maintainability",
        ],
      },
    ],
    sections: [
      {
        kicker: "The Misconception",
        heading: "“It works on my laptop.”",
        blocks: [
          {
            type: "p",
            text: "A successful demo only proves that one execution path works under particular conditions. It doesn't prove the application will behave correctly in the real world.",
          },
          {
            type: "list",
            items: [
              "What if the API fails to respond?",
              "What if a user enters invalid data?",
              "What if there's a security hole?",
              "What if the application has to handle thousands of requests at once?",
            ],
          },
        ],
      },
      {
        kicker: "Error Handling",
        heading: "What happens when something fails?",
        blocks: [
          {
            type: "p",
            text: "Failure is unavoidable. Handle it safely and predictably.",
          },
          {
            type: "code",
            label: "Fragile implementation",
            tone: "bad",
            lang: "ts",
            code: "const user = await fetchUser(id);\nconst profile = await fetchProfile(user.id);\nreturn profile;",
          },
          {
            type: "code",
            label: "More robust implementation",
            tone: "good",
            lang: "ts",
            code: 'try {\n  const user = await fetchUser(id);\n  const profile = await fetchProfile(user.id);\n  return profile;\n} catch (error) {\n  logger.error("Failed to fetch profile",\n    { userId: id, error });\n  throw new ProfileUnavailableError();\n}',
          },
        ],
      },
      {
        kicker: "Data Validation & Integrity",
        heading: "What happens when the input is invalid?",
        blocks: [
          {
            type: "p",
            text: "Validate input and enforce business rules at your system's boundaries.",
          },
          {
            type: "code",
            lang: "ts",
            code: 'import { z } from "zod";\n\nconst UserSchema = z.object({\n  email: z.string().email(),\n  age: z.number().int().min(18),\n});\n\nconst result = UserSchema.safeParse(req.body);\nif (!result.success) {\n  return res.status(400).json({\n    error: "Invalid request data",\n  });\n}',
          },
          {
            type: "note",
            text: "Also use database constraints to protect data integrity.",
          },
        ],
      },
      {
        kicker: "Security",
        heading: "What happens when someone abuses the system?",
        blocks: [
          {
            type: "p",
            text: "An application can work correctly and still leak sensitive data or allow unauthorized operations.",
          },
          {
            type: "cards",
            items: [
              { title: "Authorization", text: "Authentication ≠ authorization. Verify access to every resource." },
              { title: "Input handling", text: "Use parameterized queries and safe output encoding." },
              { title: "Credential management", text: "Keep API keys and credentials out of source control and logs." },
              { title: "Abuse prevention", text: "Apply rate limits and resource controls where needed." },
            ],
          },
        ],
      },
      {
        kicker: "Testing & Observability",
        heading: "How do we know the system is running reliably?",
        blocks: [
          {
            type: "p",
            text: "Testing prevents regressions. Observability helps you understand what's happening in production.",
          },
          {
            type: "cards",
            items: [
              {
                title: "Testing",
                text: "Before and during deployment.",
                points: [
                  "Unit tests for individual logic",
                  "Integration tests for how components interact",
                  "End-to-end tests for critical workflows",
                  "Failure-path tests for error scenarios",
                ],
              },
              {
                title: "Observability",
                text: "In production.",
                points: [
                  "Logs: what happened?",
                  "Metrics: how is the system behaving?",
                  "Traces: where does a request spend its time?",
                ],
              },
            ],
          },
        ],
      },
      {
        kicker: "Maintainability",
        heading: "Can another developer change your code safely?",
        blocks: [
          { type: "p", text: "Software keeps evolving after its first release." },
          {
            type: "cards",
            items: [
              { title: "Clear structure", text: "Responsibilities are easy to identify." },
              { title: "Explicit contracts", text: "Functions and modules behave predictably." },
              { title: "Meaningful tests", text: "Important behavior is protected from regressions." },
              {
                title: "Useful documentation",
                text: "Design decisions and trade-offs that the code doesn't show are explained.",
              },
              { title: "Controlled complexity", text: "Every abstraction has a reason." },
            ],
          },
        ],
      },
    ],
    takeaway: {
      heading: "Production-ready is a set of practices. Not a single checkbox.",
      blocks: [
        {
          type: "p",
          text: "Reliable software is built from carefully considered decisions: error handling, data integrity, security, testing, observability, and maintainability.",
        },
      ],
    },
    closingQuestion:
      "Which aspect do you think developers overlook most often when building for production?",
  },
};

export default en;
