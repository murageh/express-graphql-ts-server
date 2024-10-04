# Access Afya Backend

This repository contains the backend code for the Access Afya Health Analytics Dashboard. It provides a GraphQL API to fetch and manage data related to key metrics, incidents, staff performance, and other relevant information for the dashboard.

> **Note:** This project is part of the Access Afya Health Analytics Dashboard (Proof of Concept), which is a full-stack web application that provides insights into key metrics and performance indicators for Access Afya health facilities. The frontend code for the dashboard example is available [here](https://github.com/murageh/react-vite-ts-health-analytics-dashboard).

## Features

* **GraphQL API:** Exposes a GraphQL API for efficient data querying and manipulation.
* **Data Management:** Handles data storage and retrieval using TypeORM and SQLite.
* **Filtering and Sorting:** Supports filtering and sorting data based on various criteria.
* **Data Aggregation:** Aggregates data for line charts based on different periods (day, week, month).
* **Seeding:** Includes a seed script to populate the database with sample data.

## Technologies Used

* Node.js
* TypeScript
* Express.js
* GraphQL
* TypeORM
* SQLite
* Moment.js

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/murageh/express-graphql-ts-server.git
    cd express-graphql-ts-server
    ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
   
3. **Build the project**

   ```bash
   npm run build
   ```
   
4. **Run the server:**

   ```bash
    npm start
    ```
   
5. **Open the GraphQL Playground:**

   Navigate to `http://localhost:4000/graphql` in your browser to access the GraphQL Playground.

6. **Seed the database:**

   Run the seed script to populate the database with sample data:

   ```bash
   npm run seed
   ```
   
7. **Run the tests:**

   ```bash
    npm test
    ```
   
 > Important to note that the tests are not yet implemented

## API Endpoints

The GraphQL API is available at /graphql. You can use a GraphQL client like Insomnia or GraphiQL to interact with the API.

## Queries:

The following queries are available:

* **keyMetrics:** Fetches an array of key metrics.
* **incidents:** Fetches a list of incidents, optionally filtered by incident type and date range.
* **footFallData:** Fetches footfall data with labels, optionally filtered by date range and aggregated by period.
* **patientSatisfactionData:** Fetches patient satisfaction data with labels, optionally filtered by date range and aggregated by period.
* **revenueData:** Fetches revenue data with labels, optionally filtered by date range and aggregated by period.
* **staffMembers:** Fetches a list of staff members, optionally sorted by a specific field.

## Mutations:

The following mutations are available:

* **createIncident:** Creates a new incident.
* **createStaffMember:** Creates a new staff member.

## Project Structure

The project structure is as follows:

* `src/` Contains the backend TypeScript code.
  * `data/` Contains data-related files and subdirectories.
    * `entities/` Contains TypeORM entities for database tables.
    * `seed.ts` Contains the seed script to populate the database with sample data.
    * `graphql/` Contains GraphQL schema, resolvers, and utility functions.
  * `index.ts` Contains the server setup code.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

   
## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.
