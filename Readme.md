# Blog Analytics and Search Tool

A Node.js and Express.js application that provides blog analytics and search functionality using data from a third-party blog API. This tool calculates statistics about the blogs, including the total number of blogs, the longest title, the number of blogs with "privacy" in the title, and provides a search feature to find blogs based on specific queries.

## Features
- Fetches blog data from a third-party API.
- Calculates and provides statistics about the blogs.
- Offers a search functionality to find blogs based on query parameters.
- Implements error handling for various scenarios.
- Caches analytics and search results to improve performance.

## Getting Started
Follow the instructions below to set up and run the project on your local machine.

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager) or yarn

### Installation
Clone the repository:

```shell
git clone https://github.com/akashroy1/subspace-blog-analysis
cd subspace-blog-analysis
```

Install the dependencies:

```bash
npm install
# or
yarn install
```
### Usage
1. Start the Express.js server:

```bash
npm start
# or
yarn start
```

2. The server will be running on http://localhost:3000 by default.

3. Use a tool like Postman or a web browser to access the API endpoints (see API Endpoints).

## API Endpoints
- `/api/blog-stats` (GET): Fetch blog statistics.
- `/api/blog-search` (GET): Search blogs based on query parameters.

### `/api/blog-stats`
Returns statistics about the blogs, including the total number of blogs, the title of the longest blog, the number of blogs with "privacy" in the title, and an array of unique blog titles.

```curl
curl -X GET http://localhost:3000/api/blog-stats -H "admin-secret: YOUR_SECRET"
```

### `/api/blog-search`
Accepts a query parameter, e.g., `/api/blog-search?query=privacy`.
Searches for blogs containing the specified query (case-insensitive) in their titles.
```curl
curl -X GET "http://localhost:3000/api/blog-search?query=privacy" -H "admin-secret: YOUR_SECRET"
```

## Error Handling
The project handles various types of errors, including network errors, data retrieval errors, validation errors, and more. Custom error messages are provided to improve user experience.

## Caching
The project utilizes Lodash's memoize function to cache analytics and search results for a certain period. This helps reduce server load and improves response times for repeated requests with the same data.

----------
Made with ❤️ by Akash Roy