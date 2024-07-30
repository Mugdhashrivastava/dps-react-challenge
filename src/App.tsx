
import React, { useState } from 'react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  return (
    <div>
      <h1>Customer List</h1>
     
    </div>
  );
};

export default App;
