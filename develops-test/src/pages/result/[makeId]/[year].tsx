import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getModelsNyMakeIdAndYear } from '@/shared/api/getModelsByMakeIdAndYear/getModelsNyMakeIdAndYear';

interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
}

interface ResultPageProps {
  models: VehicleModel[];
  error?: string;
}

const ResultPage = ({ models, error }: ResultPageProps) => {
  const router = useRouter();
  const { year, makeName } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (models.length > 0 || error) {
      setLoading(false);
    }
  }, [models, error]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Models for {makeName} in {year}
      </h1>
      {models.length > 0 ? (
        <ul className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
          {models.map((model) => (
            <li key={model.Model_ID} className="p-2 border-b last:border-b-0">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for this make and year.</p>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { makeId: '443', year: '2020' } },
  ];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { makeId, year } = context.params!;

  try {
    const data = await getModelsNyMakeIdAndYear(makeId as string, year as string);

    if (!data.Results || data.Results.length === 0) {
      return {
        props: {
          models: [],
          error: 'No models found for this make and year.',
        },
      };
    }

    return {
      props: {
        models: data.Results,
      },
    };
  } catch (error) {
    return {
      props: {
        models: [],
        error: 'Failed to fetch data. Please try again later.',
      },
    };
  }
};

export default ResultPage;
