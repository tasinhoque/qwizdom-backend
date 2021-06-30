# API Endpoints

## Quiz Routes

- [x] POST /quizzes/:quizId/subscription/flip
- [x] GET /quizzes/subscribed
- [x] GET /quizzes/draft
- [x] GET /quizzes/published
- GET /quizzes/:quizId
- GET /quizzes/:quizId/average-rating
- GET /quizzes/:quizId/participants/count
- GET /quizzes
- GET /quizzes/search (query: q)
- [x] POST /quizzes

- POST /quizzes/complete

Request Body:

```json
{
  "quizId": "60c8b649b1163904e4f9d6da",
  "stages": [
    [
      {
        "questionType": "mcq"
      },
      {
        "type": "checkbox"
      }
    ]
  ]
}
```

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

### Quiz Response Routes

- GET /quizzes/:quizId/responses

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
- DELETE /discussion-threads/:discussionThreadId
- PATCH /discussion-threads/:discussionThreadId

### Comment Routes

- [ ] GET /discussion-threads/:discussionThreadId/comments
- [x] POST /discussion-threads/:discussionThreadId/comments

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

# JSON

```json
{
  "stageResponses": [
    {
      "stage": "60db05cfc67d1f67c4d19dbe",
      "responses": [
        {
          "questionId": "60db05d0c67d1f67c4d19dc0",
          "options": [1]
        }
      ]
    }
  ]
}
```
