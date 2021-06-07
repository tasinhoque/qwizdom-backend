# API Endpoints

## User Routes

- GET /users/:userId/quiz-responses
- GET /users/:userId/quizzes/subscribed
- GET /users/:userId/quizzes/draft
- GET /users/:userId/quizzes/published

### Quiz Routes

- POST /users/:userId/quizzes/:quizId/subscription/flip

#### Quiz Response Routes

- [x] POST /users/:userId/quizzes/:quizId/responses (Corresponding leaderboard will be updated/created)
- [ ] GET /users/:userId/quizzes/:quizId/responses

## Question Response Routes

- [ ] POST /users/:userId/questions/:questionId/responses

### Notification Routes

- GET /users/notifications

## Quiz Routes

- GET /quizzes/:quizId
- GET /quizzes/:quizId/average-rating
- GET /quizzes/:quizId/participants/count
- GET /quizzes
- GET /quizzes/search (query: q)
- [x] POST /quizzes
- PATCH /quizzes/:quizId
- DELETE /quizzes/:quizId
- POST /quizzes/:quizId/publish

### Stage Routes

- [x] POST /quizzes/:quizId/stages

### Question Routes

- GET /quizzes/:quizId/stages/:stageId/questions

### Leaderboard Routes

- GET /quizzes/:quizId/leaderboard

### Review Routes

- GET /quizzes/:quizId/reviews
- [x] POST /quizzes/:quizId/reviews

### Discussion Thread Routes

- GET /quizzes/:quizId/discussion-threads
- [x] POST /quizzes/:quizId/discussion-threads

## Stage Routes

- GET /stages/:stageId
- PATCH /stages/:stageId
- DELETE /stages/:stageId

### Question Routes

- [ ] POST /stages/:stageId/questions

## Question Routes

- GET /questions/:questionId
- PATCH /questions/:questionId
- DELETE /questions/:questionId

### Question Response Routes

- GET /questions/:questionId/responses

## Discussion Thread Routes

- GET /discussion-threads/:discussionThreadId
- DELETE /discussion-threads/:discussionThreadId
- PATCH /discussion-threads/:discussionThreadId

### Comment Routes

- [ ] POST /discussion-threads/:discussionThreadId/comments
- GET /discussion-threads/:discussionThreadId/comments

## Comment Routes

- GET /comments/:commentId
- PATCH /comments/:commentId
- DELETE /comments/:commentId

## Review Routes

- GET /reviews/:reviewId
- PATCH /reviews/:reviewId
- DELETE /reviews/:reviewId

## Question Response Routes

- GET /question-responses/:questionResponseId
- PATCH /question-responses/:questionResponseId
- DELETE /question-responses/:questionResponseId

## Quiz Response Routes

- GET /quiz-responses/:quizResponseId
- PATCH /quiz-responses/:quizResponseId
- DELETE /quiz-responses/:quizResponseId

## Category Routes

- POST /categories
- GET /categories
- GET /categories/:categoryId
- PATCH /categories/:categoryId
- DELETE /categories/:categoryId
