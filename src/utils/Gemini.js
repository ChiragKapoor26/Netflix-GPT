import { GoogleGenAI } from "@google/genai";
import { GEMINI_API} from "./constants";
const ai = new GoogleGenAI({
  apiKey : GEMINI_API,
});
export default ai;