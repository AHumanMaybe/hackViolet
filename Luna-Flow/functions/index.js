import * as functions from 'firebase-functions';
import { Configuration, OpenAIApi } from 'openai';

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const chatWithGPT = functions.https.onCall(async (data, context) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Or another suitable model
      prompt: data.prompt,
      max_tokens: 100,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError('internal', 'Error calling ChatGPT');
  }
});