# API Responses

1. `POST /auth/register`

```json
{
  "user": {
    "role": "user",
    "isEmailVerified": false,
    "quizResponses": [],
    "subscribedQuizzes": [],
    "createdQuizzes": [],
    "name": "Calvin Scott",
    "email": "calvim.ben10@gmail.com",
    "id": "60be295b87a785233015194f"
  },
  "tokens": {
    "access": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGJlMjk1Yjg3YTc4NTIzMzAxNTE5NGYiLCJpYXQiOjE2MjMwNzUxNjMsImV4cCI6MTYyMzA3Njk2MywidHlwZSI6ImFjY2VzcyJ9.hNXWykPgrz6gNlWMfjYPdKtANFScMiA9ruaX-YAosRE",
      "expires": "2021-06-07T14:42:43.420Z"
    },
    "refresh": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGJlMjk1Yjg3YTc4NTIzMzAxNTE5NGYiLCJpYXQiOjE2MjMwNzUxNjMsImV4cCI6MTYyNTY2NzE2MywidHlwZSI6InJlZnJlc2gifQ.k_Y8rrpMEJkO_b6knt7AQrR6AwT6GDWU791UDWbKYUo",
      "expires": "2021-07-07T14:12:43.431Z"
    }
  }
}
```

2. `POST /auth/login`

```json
{
  "user": {
    "role": "admin",
    "isEmailVerified": false,
    "quizResponses": [],
    "subscribedQuizzes": [],
    "createdQuizzes": [],
    "name": "Calvin Scott",
    "email": "calvim.scott@gmail.com",
    "id": "60bd92206b7b5e27080d4df6"
  },
  "tokens": {
    "access": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGJkOTIyMDZiN2I1ZTI3MDgwZDRkZjYiLCJpYXQiOjE2MjMwNzUyMDEsImV4cCI6MTYyMzA3NzAwMSwidHlwZSI6ImFjY2VzcyJ9.f_EixAIpzR2gU8fNWnhpkrNvmqrE-Kl7PGSlqQP_W-Q",
      "expires": "2021-06-07T14:43:21.356Z"
    },
    "refresh": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGJkOTIyMDZiN2I1ZTI3MDgwZDRkZjYiLCJpYXQiOjE2MjMwNzUyMDEsImV4cCI6MTYyNTY2NzIwMSwidHlwZSI6InJlZnJlc2gifQ.AIEVN8c3MF1HA9sPO7HqaqLlKgrevkY0Esfq4t_nwg0",
      "expires": "2021-07-07T14:13:21.357Z"
    }
  }
}
```

3. `POST /auth/logout`

```

```

4. `POST /auth/refresh-tokens`

```json
{
  "access": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGJkOTIyMDZiN2I1ZTI3MDgwZDRkZjYiLCJpYXQiOjE2MjMwNzUzOTksImV4cCI6MTYyMzA3NzE5OSwidHlwZSI6ImFjY2VzcyJ9.M_sc_DdrY9lGa5D4R-lq5Gl2HOqHqf_aB-HCt5q5hKU",
    "expires": "2021-06-07T14:46:39.643Z"
  },
  "refresh": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGJkOTIyMDZiN2I1ZTI3MDgwZDRkZjYiLCJpYXQiOjE2MjMwNzUzOTksImV4cCI6MTYyNTY2NzM5OSwidHlwZSI6InJlZnJlc2gifQ.Qqz9SAiXBeroEZ6ydCwYuGjOmf1szZCUKXJe7PVIfvw",
    "expires": "2021-07-07T14:16:39.645Z"
  }
}
```

5. `POST /auth/forgot-password`

```json

```

6. `POST /auth/reset-password`

```json

```

7. `POST /auth/send-verification-email`

```json

```

8. `POST /auth/verify-email`

```json

```

9. `GET /users`

```json
{
  "results": [
    {
      "role": "user",
      "isEmailVerified": false,
      "quizResponses": ["60bdbebe1411122a100e9d03"],
      "subscribedQuizzes": ["60bd95923e4992098cd15e7d"],
      "createdQuizzes": ["60bdd43ef504cd1080627071", "60bd95923e4992098cd15e7d"],
      "name": "fake name",
      "email": "faker@example.com",
      "id": "60bc73357fbd90320884f1e6"
    },
    {
      "role": "user",
      "isEmailVerified": false,
      "quizResponses": [],
      "subscribedQuizzes": [],
      "createdQuizzes": [],
      "name": "fake name",
      "email": "fake@example.com",
      "id": "60bc887584a7f518cd2151f2"
    },
    {
      "role": "admin",
      "isEmailVerified": false,
      "quizResponses": [],
      "subscribedQuizzes": [],
      "createdQuizzes": [],
      "name": "fake name",
      "email": "tousif@example.com",
      "id": "60bc887d84a7f518cd2151f4"
    },
    {
      "role": "admin",
      "isEmailVerified": false,
      "quizResponses": [],
      "subscribedQuizzes": [],
      "createdQuizzes": [],
      "name": "Calvin Scott",
      "email": "calvim.scott@gmail.com",
      "id": "60bd92206b7b5e27080d4df6"
    },
    {
      "role": "user",
      "isEmailVerified": false,
      "quizResponses": [],
      "subscribedQuizzes": [],
      "createdQuizzes": [],
      "name": "Calvin Scott",
      "email": "calvim.ben@gmail.com",
      "id": "60bde027b2ade041707ff904"
    }
  ],
  "page": 1,
  "limit": 5,
  "totalPages": 2,
  "totalResults": 6
}
```

10. `POST /users`

```json
{
  "role": "admin",
  "isEmailVerified": false,
  "quizResponses": [],
  "subscribedQuizzes": [],
  "createdQuizzes": [],
  "name": "James",
  "email": "james@gmail.com",
  "id": "60be2be787a7852330151954"
}
```

11. `GET /users/:userId`

```json
{
  "role": "admin",
  "isEmailVerified": false,
  "quizResponses": [],
  "subscribedQuizzes": [],
  "createdQuizzes": [],
  "name": "James",
  "email": "james@gmail.com",
  "id": "60be2be787a7852330151954"
}
```

12. `PATCH /users/:userId`

```json
{
  "role": "admin",
  "isEmailVerified": false,
  "quizResponses": [],
  "subscribedQuizzes": [],
  "createdQuizzes": [],
  "name": "James William",
  "email": "james@gmail.com",
  "id": "60be2be787a7852330151954"
}
```

13. `DELETE /users/:userId`

```json

```

14. `POST /quizzes`

```json
{
  "isPublished": false,
  "isTest": false,
  "categories": [],
  "stages": [],
  "discussionThreads": [],
  "reviews": [],
  "hasAutoEvaluation": false,
  "name": "Web Development Fundamentals",
  "startTime": "2021-04-23T18:00:00.000Z",
  "duration": 50,
  "description": "This is a quiz to hone your skills.",
  "coverImage": "www.avatar.ui/50",
  "id": "60be2cf687a7852330151955"
}
```

15. `POST /quizzes/:quizId/stages`

```json
{
  "questions": [],
  "parent": "60bd982945ebfe31b0926b8a",
  "id": "60be2d1487a7852330151956"
}
```

16. `POST /quizzes/:quizId/reviews`

```json
{
  "user": "60bc73357fbd90320884f1e6",
  "rating": 5,
  "text": "Good",
  "id": "60be2d2d87a7852330151957"
}
```

17. `POST /quizzes/:quizId/discussion-threads`

```json
{
  "user": "60bc73357fbd90320884f1e6",
  "text": "What is a prototype?"
}
```

18. `POST /users/:userId/quizzes/:quizId/responses`

```json
{
  "quiz": "60bd95923e4992098cd15e7d",
  "stages": [],
  "id": "60be2d5387a7852330151958"
}
```

19. `POST /stages/:stageId/questions`

```json
{
  "title": "How big is earth?",
  "options": [],
  "id": "60be2d7b87a7852330151959"
}
```

20. `POST /users/:userId/questions/:questionId/responses`

```json
{
  "options": [],
  "text": "Very big.",
  "question": "60bdc55fa9c0553d0ca55136",
  "user": "60bc73357fbd90320884f1e6",
  "id": "60be2d8f87a785233015195a"
}
```

21. `POST /users/:userId/discussion-threads/:discussionThreadId/comments`

```json
{
  "text": "Nice",
  "user": "60bc73357fbd90320884f1e6",
  "id": "60be2dc287a785233015195b"
}
```

22. `POST /users/:userId/quizzes/:quizId/subscription/flip`

```json

```

23. `GET /users/:userId/quiz-responses`

```json
[
  {
    "quiz": "60bd95923e4992098cd15e7d",
    "stages": [],
    "id": "60bdbebe1411122a100e9d03"
  },
  {
    "quiz": "60bd95923e4992098cd15e7d",
    "stages": [],
    "id": "60be2d5387a7852330151958"
  }
]
```

24. `GET /users/:userId/quizzes/draft`

```json
[
  {
    "isPublished": false,
    "isTest": false,
    "categories": [],
    "stages": ["60bda269d04f71170c2de724", "60bda269d04f71170c2de725", "60be2d1487a7852330151956"],
    "discussionThreads": ["60bdae891bcc9948e077bfdf"],
    "reviews": [
      "60bdac3c0c53e0e3da803462",
      "60bdae781bcc9948e077bfde",
      "60bdaeca6ddef53eac1f66db",
      "60be2d2d87a7852330151957"
    ],
    "hasAutoEvaluation": false,
    "name": "New name",
    "startTime": "2021-04-23T18:00:00.000Z",
    "duration": 50,
    "description": "This is a quiz to hone your skills.",
    "coverImage": "www.avatar.ui/50",
    "id": "60bd95923e4992098cd15e7d"
  }
]
```

25. `GET /users/:userId/quizzes/published`

```json
[
  {
    "isPublished": true,
    "isTest": false,
    "categories": [],
    "stages": ["60bda269d04f71170c2de724", "60bda269d04f71170c2de725"],
    "discussionThreads": ["60bdae891bcc9948e077bfdf"],
    "reviews": ["60bdac3c0c53e0e3da803462", "60bdae781bcc9948e077bfde", "60bdaeca6ddef53eac1f66db"],
    "hasAutoEvaluation": false,
    "name": "New name",
    "startTime": "2021-04-23T18:00:00.000Z",
    "duration": 50,
    "description": "This is a quiz to hone your skills.",
    "coverImage": "www.avatar.ui/50",
    "id": "60bdd43ef504cd1080627071"
  }
]
```

26. `GET /discussion-threads/:discussionThreadId/comments`

```json
[
  {
    "text": "Nice",
    "user": "60bc73357fbd90320884f1e6",
    "id": "60bdcaec39d66d4874143570"
  },
  {
    "text": "Nice",
    "user": "60bc73357fbd90320884f1e6",
    "id": "60be2dc287a785233015195b"
  }
]
```

27. `GET /discussion-threads/:discussionThreadId`

```json
{
  "comments": ["60bdcaec39d66d4874143570", "60be2dc287a785233015195b"],
  "user": "60bc73357fbd90320884f1e6",
  "text": "What is a prototype?",
  "id": "60bdae891bcc9948e077bfdf"
}
```
