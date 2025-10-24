export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the past tense of 'go'?",
    options: ["Goed", "Went", "Gone", "Going"],
    correctAnswer: 1,
    explanation: "'Went' is the correct past tense of 'go'. English has many irregular verbs where the past tense doesn't follow the standard '-ed' pattern.",
  },
  {
    id: 2,
    question: "Which word is a synonym for 'happy'?",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    correctAnswer: 2,
    explanation: "'Joyful' is a synonym for 'happy', both expressing a positive emotional state of contentment and pleasure.",
  },
  {
    id: 3,
    question: "What is the plural of 'child'?",
    options: ["Childs", "Children", "Childes", "Childrens"],
    correctAnswer: 1,
    explanation: "'Children' is the correct irregular plural form of 'child'. It doesn't follow the standard rule of adding 's' or 'es'.",
  },
  {
    id: 4,
    question: "Which sentence is grammatically correct?",
    options: [
      "She don't like pizza",
      "She doesn't likes pizza",
      "She doesn't like pizza",
      "She not like pizza"
    ],
    correctAnswer: 2,
    explanation: "'She doesn't like pizza' is correct. With third-person singular subjects (he, she, it), use 'doesn't' + base verb form.",
  },
  {
    id: 5,
    question: "What does the idiom 'break the ice' mean?",
    options: [
      "To literally break ice",
      "To start a conversation",
      "To make someone angry",
      "To end a relationship"
    ],
    correctAnswer: 1,
    explanation: "'Break the ice' means to initiate conversation in a social setting, especially when people feel awkward or uncomfortable.",
  },
  {
    id: 6,
    question: "Which word is an adjective?",
    options: ["Quickly", "Beautiful", "Running", "Happiness"],
    correctAnswer: 1,
    explanation: "'Beautiful' is an adjective that describes nouns. 'Quickly' is an adverb, 'Running' is a verb/gerund, and 'Happiness' is a noun.",
  },
  {
    id: 7,
    question: "What is the comparative form of 'good'?",
    options: ["Gooder", "More good", "Better", "Best"],
    correctAnswer: 2,
    explanation: "'Better' is the comparative form of 'good', and 'best' is the superlative. 'Good' is an irregular adjective.",
  },
  {
    id: 8,
    question: "Which sentence uses the correct article?",
    options: [
      "I saw a elephant",
      "I saw an elephant",
      "I saw the elephants",
      "I saw elephant"
    ],
    correctAnswer: 1,
    explanation: "Use 'an' before words starting with vowel sounds. 'Elephant' starts with 'e', so we use 'an elephant'.",
  },
  {
    id: 9,
    question: "What is the meaning of 'procrastinate'?",
    options: [
      "To work quickly",
      "To delay or postpone",
      "To celebrate",
      "To organize"
    ],
    correctAnswer: 1,
    explanation: "'Procrastinate' means to delay or postpone tasks, often unnecessarily, until later or to the last minute.",
  },
  {
    id: 10,
    question: "Which word completes the sentence: 'I have ___ finished my homework'?",
    options: ["Yet", "Already", "Still", "Never"],
    correctAnswer: 1,
    explanation: "'Already' is correct for completed actions in the present perfect tense. 'Yet' is used in negative sentences or questions.",
  },
];
