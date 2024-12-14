import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { getMakes, IMake } from '@/shared/api/getMakes/getMakes';
import { getCarNameById } from '@/shared/lib/getCarNameById/getCarNameById';

const FilterPage = () => {
  const [makes, setMakes] = useState<IMake[]>([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMakes = await getMakes();
        setMakes(fetchedMakes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isFormValid = selectedMake && selectedYear;

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <div>
        <div>
          <h2>Filter Vehicles</h2>
          {loading ? (
            <div>Loading ...</div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="make"
                >
                  Vehicle Make
                </label>
                <select
                  id="make"
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                >
                  <option value="">Select Make</option>
                  {makes.map((make) => (
                    <option key={make.value} value={make.value}>
                      {make.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="year"
                >
                  Model Year
                </label>
                <input
                  type="number"
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  min="2010"
                  max={new Date().getFullYear()}
                />
              </div>

              <Link
                href={`/result/${selectedMake}/${selectedYear}?makeName=${getCarNameById(
                  makes,
                  selectedMake,
                )}`}
              >
                <button
                  disabled={!isFormValid}
                >
                  Next
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default FilterPage;
