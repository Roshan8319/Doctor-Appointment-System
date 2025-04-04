import React from 'react';

const LabTest = () => {
  const labTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      description: 'Measures different components of your blood',
      price: 500,
    },
    {
      id: 2,
      name: 'Blood Sugar Test',
      description: 'Measures your blood sugar levels',
      price: 300,
    },
    {
      id: 3,
      name: 'Lipid Profile',
      description: 'Measures your cholesterol levels',
      price: 400,
    },
    // Add more lab tests here
  ];

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Lab Tests</h1>
      <ul className="list-none mb-4">
        {labTests.map((labTest) => (
          <li key={labTest.id} className="flex justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{labTest.name}</h2>
              <p className="text-gray-600">{labTest.description}</p>
            </div>
            <div>
              <p className="text-lg font-bold">₹{labTest.price}</p>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => console.log(`Book ${labTest.name} test`)}
              >
                Book Now
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabTest;