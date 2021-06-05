import { Types } from 'mongoose';

export interface User {
  name: string;
  email: string;
}

export interface Participant {
  user: Types.ObjectId;

  // QuizResponse
  finishedQuizzes: Types.ObjectId[];

  // Quiz
  subscribedQuizzes: Types.ObjectId[];
}

export interface QuizResponse {
  stages: {
    stageId: Types.ObjectId;
    responses: Types.ObjectId[];
  }[];
}

export interface Questioner {
  user: Types.ObjectId;
  quizzes: Types.ObjectId[];
}

export interface Quiz {
  startTime: Date;
  duration: number;
  isPublished: boolean;
  isTest: boolean;
  categories: Types.ObjectId[];
  stages: Types.ObjectId[];
}

export interface Stage {
  parent: Types.ObjectId;
  questions: Types.ObjectId[];
}

export interface Category {
  backgroundImage: string;
  name: string;
}

export interface DiscussionThread {
  user: Types.ObjectId;
  quiz: Types.ObjectId;
  text: string;
  comments: Types.ObjectId[];
}

export interface Comment {
  user: Types.ObjectId;
  text: string;
}

export interface Review {
  user: Types.ObjectId;
  quiz: Types.ObjectId;
  rating: number;
  text: string;
}

export interface Question {
  serial: number;
  totalMarks: number;
  difficulty: number;

  // when the type is fillInTheGaps, we'll look for backtick
  title: string;

  image: string;
  options: {
    // applicable even when type is trueOrFalse
    isAnswer: boolean;

    text: string;
    image: string;
  }[];
  answer: string;
  isObjective: boolean;
  canUploadFile: boolean;
  type: 'mcq' | 'checkbox' | 'fileUpload' | 'text' | 'fillInTheGaps' | 'trueOrFalse';
}

export interface Response {
  user: Types.ObjectId;
  question: Types.ObjectId;
  text: string;
  options: number[];
  file: string;
}

export interface Leaderboard {
  totalScore: number;
  participants: {
    id: Types.ObjectId;
    rank: number;
    score: number;
  }[];
}
