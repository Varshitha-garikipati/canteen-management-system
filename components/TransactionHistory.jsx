import React from 'react';
import { OrderStatus } from '../types';

const TransactionHistory = ({ transactions, onUpdateStatus, title = 'Order & Kitchen Pipeline' }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No records found.</p>
        <p className="text-gray-300 text-xs mt-2 uppercase tracking-tight">Data will appear here as orders are processed.</p>
      </div>
    );
  }

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case OrderStatus.NEW: return 'bg-amber-100 text-amber-700 border-amber-200';
      case OrderStatus.PREPARING: return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case OrderStatus.READY: return 'bg-emerald-100 text-emerald-700 border-emerald-200 ring-2 ring-emerald-50';
      case OrderStatus.COMPLETED: return 'bg-gray-100 text-gray-700 border-gray-200';
      case OrderStatus.CANCELLED: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressWidth = (status) => {
    switch (status) {
      case OrderStatus.NEW: return '20%';
      case OrderStatus.PREPARING: return '50%';
      case OrderStatus.READY: return '85%';
      case OrderStatus.COMPLETED: return '100%';
      case OrderStatus.CANCELLED: return '0%';
      default: return '0%';
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center">
          <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          {title}
        </h3>
        <span className="text-[10px] font-black bg-white border border-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">
          Real-time updates active
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Token ID</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Details</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kitchen Stage</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Update</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Bill Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map((tx) => {
              const dt = formatDateTime(tx.timestamp);
              return (
                <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-[11px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-lg uppercase tracking-tighter">
                      #{tx.id.slice(-6)}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <p className="text-sm font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors">{tx.itemName}</p>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="text-[9px] font-black uppercase text-gray-400">{dt.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">{dt.time}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 min-w-[160px]">
                    <div className="flex flex-col space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tighter text-gray-400">
                            <span>{tx.status === OrderStatus.CANCELLED ? 'Void' : 'Progress'}</span>
                            <span>{tx.status === OrderStatus.COMPLETED ? '100%' : tx.status === OrderStatus.READY ? '85%' : ''}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-1000 ${tx.status === OrderStatus.CANCELLED ? 'bg-rose-400' : 'bg-primary-500'}`}
                                style={{ width: getProgressWidth(tx.status) }}
                            />
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <select 
                      value={tx.status} 
                      onChange={(e) => onUpdateStatus(tx.id, e.target.value)}
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border shadow-sm outline-none cursor-pointer transition-all focus:ring-4 focus:ring-primary-100 ${getStatusColor(tx.status)}`}
                    >
                      {Object.values(OrderStatus).map(status => (
                        <option key={status} value={status} className="bg-white text-gray-700">{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-sm font-black text-gray-900">₹{tx.price.toLocaleString('en-IN')}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
