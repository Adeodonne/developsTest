import axios from 'axios';

export const getModelsNyMakeIdAndYear = async (makeId: string, year: string) => {
  try {
    return (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)).data;
  } catch (error) {
    throw new Error('Error fetching vehicle makes: ' + (error as Error).message);
  }
};
