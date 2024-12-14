import axios from 'axios';

export interface IMake {
  value: string;
  label: string;
}

interface APIResponse {
  Results: Array<{
    MakeId: string;
    MakeName: string;
  }>;
}

export const getMakes = async () => {
  try {
    const response = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`);
    return response.data.Results.map(make => ({ value: make.MakeId, label: make.MakeName }));
  } catch (error) {
    throw new Error('Error fetching vehicle makes: ' + (error as Error).message);
  }
};
