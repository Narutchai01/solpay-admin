import React from 'react';

const mockTransactions = [
  { id: '1', date: '2023-10-01', txId: 'TX123456789', type: 'Deposit', amountUsdt: '1000.00', feeUsdt: '1.00', amountThb: '35000.00', status: 'Success' },
  { id: '2', date: '2023-10-02', txId: 'TX987654321', type: 'Withdrawal', amountUsdt: '500.00', feeUsdt: '0.50', amountThb: '17500.00', status: 'Success' },
  { id: '3', date: '2023-10-03', txId: 'TX456123789', type: 'Deposit', amountUsdt: '2000.00', feeUsdt: '2.00', amountThb: '70000.00', status: 'Failed' },
  { id: '4', date: '2023-10-04', txId: 'TX789456123', type: 'Deposit', amountUsdt: '1500.00', feeUsdt: '1.50', amountThb: '52500.00', status: 'Success' },
  { id: '5', date: '2023-10-05', txId: 'TX321654987', type: 'Withdrawal', amountUsdt: '300.00', feeUsdt: '0.30', amountThb: '10500.00', status: 'Success' },
];

export const TransactionTable: React.FC = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#55418eff] text-white">
            <th className="py-4 px-6 font-semibold text-sm">Date</th>
            <th className="py-4 px-6 font-semibold text-sm">Transaction ID</th>
            <th className="py-4 px-6 font-semibold text-sm">Type</th>
            <th className="py-4 px-6 font-semibold text-sm">Amount (USDT)</th>
            <th className="py-4 px-6 font-semibold text-sm">Fee (USDT)</th>
            <th className="py-4 px-6 font-semibold text-sm">Amount (THB)</th>
            <th className="py-4 px-6 font-semibold text-sm">Status</th>
            <th className="py-4 px-6 font-semibold text-sm text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mockTransactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6 text-sm text-gray-600">{tx.date}</td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900">{tx.txId}</td>
              <td className="py-4 px-6 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  tx.type === 'Deposit' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {tx.type}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900 font-medium">{tx.amountUsdt}</td>
              <td className="py-4 px-6 text-sm text-gray-600">{tx.feeUsdt}</td>
              <td className="py-4 px-6 text-sm text-gray-900 font-medium">{tx.amountThb}</td>
              <td className="py-4 px-6 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  tx.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tx.status}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-center">
                <button className="text-purple-600 hover:text-purple-800 font-semibold transition-colors underline">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
