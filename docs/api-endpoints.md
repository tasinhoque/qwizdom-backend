# API Endpoints

## Quiz Routes

- [x] POST /quizzes/:quizId/subscription/flip
- [x] GET /quizzes/subscribed
- [x] GET /quizzes/draft
- [x] GET /quizzes/published
- [x] GET /quizzes/:quizId
- [x] GET /quizzes/:quizId/average-rating
- [x] GET /quizzes/:quizId/participants/count
- [x] GET /quizzes
- [x] GET /quizzes/search (query: q)
- [x] POST /quizzes
- [x] PATCH /quizzes/:quizId/complete
- DELETE /quizzes/:quizId

### Stage Routes

- [x] POST /quizzes/:quizId/stages

### Question Routes

- GET /quizzes/:quizId/stages/:stageId/questions

### Leaderboard Routes

- [x] GET /quizzes/:quizId/leaderboard

### Review Routes

- [x] GET /quizzes/:quizId/reviews
- [x] POST /quizzes/:quizId/reviews

### Discussion Thread Routes

- [x] GET /quizzes/:quizId/discussion-threads
- [x] POST /quizzes/:quizId/discussion-threads

### Quiz Response Routes

- [x] GET /quizzes/:quizId/responses

## Stage Routes

- GET /stages/:stageId
- PATCH /stages/:stageId
- DELETE /stages/:stageId

### Question Routes

- [x] POST /stages/:stageId/questions

## Question Routes

- GET /questions/:questionId
- PATCH /questions/:questionId
- POST /questions/:questionId/image
- DELETE /questions/:questionId

### Question Response Routes

- GET /questions/:questionId/responses
- [x] POST /questions/:questionId/responses

## Discussion Thread Routes

- [x] GET /discussion-threads/:discussionThreadId
- [x] DELETE /discussion-threads/:discussionThreadId
- [x] PATCH /discussion-threads/:discussionThreadId

### Comment Routes

- [x] GET /discussion-threads/:discussionThreadId/comments
- [x] POST /discussion-threads/:discussionThreadId/comments

## Comment Routes

- [x] PATCH /comments/:commentId
- [x] DELETE /comments/:commentId

## Review Routes

- GET /reviews/:reviewId
- PATCH /reviews/:reviewId
- DELETE /reviews/:reviewId

## Question Response Routes

- GET /question-responses/:questionResponseId
- PATCH /question-responses/:questionResponseId
- DELETE /question-responses/:questionResponseId

## Quiz Response Routes

- [x] POST /quizzes/:quizId/responses (Corresponding leaderboard will be updated/created)
- [x] GET /quiz-responses
- GET /quiz-responses/:quizResponseId
- PATCH /quiz-responses/:quizResponseId
- DELETE /quiz-responses/:quizResponseId

## Category Routes

- POST /categories
- GET /categories
- GET /categories/:categoryId
- PATCH /categories/:categoryId
- DELETE /categories/:categoryId

## Notification Routes

- GET /notifications
