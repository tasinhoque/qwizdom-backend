const { Router } = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const quizRouter = require('./quiz');
const categoryRouter = require('./category');
const commentRouter = require('./comment');
const discussionThreadRouter = require('./discussionThread');
const questionRouter = require('./question');
const questionResponseRouter = require('./questionResponse');
const quizResponseRouter = require('./quizResponse');
const reviewRouter = require('./review');
const stageRouter = require('./stage');
const notificationRouter = require('./notification');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/quizzes', quizRouter);
router.use('/categories', categoryRouter);
router.use('/comments', commentRouter);
router.use('/discussion-threads', discussionThreadRouter);
router.use('/questions', questionRouter);
router.use('/question-responses', questionResponseRouter);
router.use('/quiz-responses', quizResponseRouter);
router.use('/reviews', reviewRouter);
router.use('/stages', stageRouter);
router.use('/notifications', notificationRouter);

module.exports = router;
