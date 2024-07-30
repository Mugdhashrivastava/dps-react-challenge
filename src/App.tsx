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
	
	useEffect(() => {
		fetch('https://dummyjson.com/users')
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.users.map((user: any) => ({
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					birthDate: user.birthDate,
					city: user.address.city,
				}));
				setCustomers(formattedData);
			})
			.catch((error) =>
				console.error('Error fetching customer data:', error)
			);
	}, []);

	const filteredCustomers = customers.filter((customer) =>
		`${customer.firstName} ${customer.lastName}`
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			<h1>Customer List</h1>
			<input
				type="text"
				placeholder="Search by name"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<ul>
				{customers.map((customer) => (
					<li key={customer.id}>
						{customer.firstName} {customer.lastName} -{' '}
						{customer.city} -{' '}
						{new Date(customer.birthDate).toLocaleDateString()}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
