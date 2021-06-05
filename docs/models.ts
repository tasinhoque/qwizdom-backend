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
  quiz: Types.ObjectId;
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
  name: string;
  startTime: Date;
  duration: number;
  isPublished: boolean;
  isTest: boolean;
  categories: Types.ObjectId[];
  stages: Types.ObjectId[];
  discussionThreads: Types.ObjectId[];
  isManual: boolean;
  description: string;
  coverImage: string;
  totalMarks: number;
}

export interface Notification {
  text: string;
  buttonText: string;

  // link for the button
  link: string;
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
  marks: number;
}

export interface Leaderboard {
  quiz: Types.ObjectId;
  participants: {
    id: Types.ObjectId;
    rank: number;
    marks: number;
  }[];
}
