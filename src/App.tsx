import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

type Customer = {
	id: number;
	firstName: string;
	lastName: string;
	birthDate: string;
	city: string;
  };
  
const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [highlightOldest, setHighlightOldest] = useState(false);

  
  const latestQuery = useRef(searchQuery);

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

  const handleDebouncedQuery = debounce((query) => {
    setSearchQuery(query);
  }, 1000);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    latestQuery.current = e.target.value;
    handleDebouncedQuery(latestQuery.current);
  };

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCity === '' || customer.city === selectedCity)
  );

  const cities = Array.from(new Set(customers.map(customer => customer.city)));

  const getOldestCustomerInCity = (city: string) => {
    return customers
      .filter(customer => customer.city === city)
      .reduce((oldest, customer) => {
        return new Date(customer.birthDate) < new Date(oldest.birthDate) ? customer : oldest;
      }, customers[0]);
  };

  return (
    <div>
      <h1>Customer List</h1>
      <input
        type="text"
        placeholder="Search by name"
        onChange={handleSearchChange}
      />
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">Select city</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <label>
        <input
          type="checkbox"
          checked={highlightOldest}
          onChange={() => setHighlightOldest(!highlightOldest)}
        />
        Highlight oldest per city
      </label>
      <ul>
        {filteredCustomers.map(customer => {
          const isOldest = highlightOldest && getOldestCustomerInCity(customer.city).id === customer.id;
          return (
            <li
              key={customer.id}
              style={{
                backgroundColor: isOldest ? 'lightblue' : 'transparent',
              }}
            >
              {customer.firstName} {customer.lastName} - {customer.city} - {new Date(customer.birthDate).toLocaleDateString()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
