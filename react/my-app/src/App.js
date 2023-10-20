import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import axios from 'axios';

const endpoint = 'http://localhost:4000/graphql';

const columns = [
  {
    name: 'Record Owner',
    selector: 'Record_Owner',
  },
  {
    name: 'Client Name',
    selector: 'Client_Name',
  },
  {
    name: 'Status Old',
    selector: 'Status_Old',
  },
];
// const data1 = [
//   { id: 1, name: 'Alice', age: 28, city: 'New York' },
//   { id: 2, name: 'Bob', age: 35, city: 'Los Angeles' },
//   { id: 3, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 4, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 5, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 6, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 7, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 8, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 9, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 10, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 11, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 12, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 13, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 14, name: 'Charlie', age: 22, city: 'Chicago' },
//   { id: 15, name: 'Charlie', age: 22, city: 'Chicago' },
//   // Add more data as needed
// ];
const StyledDataTable = styled(DataTable)`
  // Add your custom styles here
`;

const DataTableWithPagination = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data using a POST request
    const fetchData = async () => {
      const query = `
        {
          users {
            Record_Owner
            Client_Name
            Status_Old
          }
        }
      `;

      try {
        const response = await axios.post(endpoint, {
          query,
        });
        setData(response.data.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledDataTable
      title="Order Data"
      columns={columns}
      data={data}
      pagination
      paginationPerPage={10}
      highlightOnHover
      responsive
    />
  );
};

export default DataTableWithPagination;
