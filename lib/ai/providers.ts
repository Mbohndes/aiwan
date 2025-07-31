import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { google } from '@ai-sdk/google'; // <-- Menggunakan Google
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        // Mengganti semua model ke Google Gemini
        'chat-model': google('models/gemini-1.5-flash-latest'),
        'chat-model-reasoning': wrapLanguageModel({
          model: google('models/gemini-1.5-pro-latest'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': google('models/gemini-1.5-flash-latest'),
        'artifact-model': google('models/gemini-1.5-flash-latest'),
      },
    });