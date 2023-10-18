import axios from 'axios';
import { apiURL } from '../util/constants';

export async function updateSurveyOptionValue(selectedOption) {
  try {
    return await axios.post(
      `${apiURL}option/${selectedOption}`
    );
  } catch (error) {
    console.error('POST request failed. Error:', error);
  }
}
