
import React, { useState,useEffect } from 'react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
    useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          birthDate: user.birthDate,
          city: user.address.city,
        }));
        setCustomers(formattedData);
      })
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  
  return (
    <div>
      <h1>Customer List</h1>
     
    </div>
  );
};

export default App;
