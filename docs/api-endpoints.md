# API Endpoints

## User Routes

- GET /users/finished-quizzes
- GET /users/subscribed-quizzes
- POST /users/quizzes/:quizId/flip-subscribe
- GET /users/responses/:quizId
- GET /users/draft-quizzes
- GET /users/published-quizzes
- GET /users/:userId/published-quizzes
- GET /users/notifications

## Quiz Routes

- GET /quizzes/:quizId
- GET /quizzes/:quizId/average-rating
- GET /quizzes/:quizId/participant-count
- GET /quizzes
- GET /quizzes/search (query: q)
- POST /quizzes
- PATCH /quizzes/:quizId
- DELETE /quizzes/:quizId
- POST /quizzes/:quizId/publish

### Stage

- POST /quizzes/:quizId/stages
- DELETE /quizzes/:quizId/stages/:stageId
- POST /quizzes/:quizId/stages/:stageId/questions

### Question

- GET /quizzes/:quizId/stages/:stageId/questions
- POST /quizzes/:quizId/stages/:stageId/questions
- PATCH /quizzes/:quizId/stages/:stageId/questions/:questionId

### Leaderboard

- GET /quizzes/:quizId/leaderboard

### Review Routes

- GET /quizzes/:quizId/reviews
- POST /quizzes/:quizId/reviews

### Discussion Thread

- GET /quizzes/:quizId/discussion-threads

### Response

- GET /responses/:responseId
- POST /quizzes/:quizId/stages/:stageId/question/:questionId/responses
- POST /quizzes/:quizId/stages/:stageId/responses
- POST /quizzes/:quizId/responses

## Question Routes

- GET /question/:questionId
- DELETE /question/:questionId
- PATCH /questions/:questionId

## Discussion Thread Routes

- GET /discussion-threads/:discussionThreadId
- POST /discussion-threads
- PATCH /discussion-threads
- DELETE /discussion-threads/:discussionThreadId
- POST /discussion-threads/:discussionThreadId/comments
- GET /discussion-threads/:discussionThreadId/comments
- PATCH /discussion-threads/:discussionThreadId/comments/:commentId
- DELETE /discussion-threads/:discussionThreadId/comments/:commentId

## Response Routes

- PATCH /responses/:responseId
- DELETE /responses/:responseId

## Review Routes

- PATCH /reviews/:reviewId
- DELETE /reviews/:reviewId
