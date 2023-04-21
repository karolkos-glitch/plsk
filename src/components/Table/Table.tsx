import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

interface Person {
  greeting?: string;
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}
const defaultData: Person[] = [
  {
    greeting: 'Siema',
    id: '1234',
    firstName: 'Karol',
    lastName: 'Kosek',
    age: 24,
  },
  {
    greeting: 'Elo',
    id: '3456',
    firstName: 'Kornel',
    lastName: 'Makuszynski',
    age: 40,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.display({
    id: 'greeting',
    cell: (info) => (
      <button onClick={() => alert(info.row.getValue('id'))}>
        Alert {info.row.original.greeting}
      </button>
    ),
  }),
  columnHelper.accessor('id', {
    id: 'id',
    cell: (info) => info.renderValue(),
    header: 'ID',
  }),
  columnHelper.accessor('firstName', {
    id: 'firstName',
    cell: (info) => info.renderValue(),
    header: 'FIRST NAME',
  }),
  columnHelper.accessor('lastName', {
    id: 'lastName',
    cell: (info) => info.renderValue(),
    header: 'LAST NAME',
  }),
  columnHelper.accessor('age', {
    id: 'age',
    cell: (info) => info.renderValue(),
    header: 'AGE',
  }),
];
const Table = () => {
  const [data] = useState([...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default Table;
