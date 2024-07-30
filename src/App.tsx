import React, { useState, useEffect } from 'react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

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

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCity === '' || customer.city === selectedCity)
  );

  const cities = Array.from(new Set(customers.map(customer => customer.city)));

  return (
    <div>
      <h1>Customer List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">Select city</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <ul>
        {filteredCustomers.map(customer => (
          <li key={customer.id}>
            {customer.firstName} {customer.lastName} - {customer.city} - {new Date(customer.birthDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
