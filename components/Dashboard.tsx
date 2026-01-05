
import React, { useMemo } from 'react';
import { MenuItem, FoodCategory, Transaction, OrderStatus } from '../types';

interface DashboardProps {
    items: MenuItem[];
    transactions?: Transaction[];
}

const CATEGORY_TOKENS: Record<string, string> = {
    [FoodCategory.APPETIZER]: 'APP',
    [FoodCategory.MAIN_COURSE]: 'MNC',
    [FoodCategory.DESSERT]: 'DST',
    [FoodCategory.BEVERAGE]: 'BVG',
    [FoodCategory.SNACK]: 'SNK',
};

const Dashboard: React.FC<DashboardProps> = ({ items, transactions = [] }) => {
    const totalItems = items.length;
    const availableItems = items.filter(item => item.isAvailable).length;
    const availabilityRate = totalItems > 0 ? (availableItems / totalItems) * 100 : 0;

    const orderStatusSummary = useMemo(() => {
        const counts = {
            [OrderStatus.NEW]: 0,
            [OrderStatus.PREPARING]: 0,
            [OrderStatus.READY]: 0,
            [OrderStatus.COMPLETED]: 0,
            [OrderStatus.CANCELLED]: 0,
        };
        transactions.forEach(tx => {
            if (counts[tx.status] !== undefined) counts[tx.status]++;
        });
        return counts;
    }, [transactions]);

    const categoryStats = useMemo(() => {
        const stats = Object.values(FoodCategory).reduce((acc, category) => {
            acc[category] = { count: 0, availableCount: 0 };
            return acc;
        }, {} as Record<FoodCategory, { count: number, availableCount: number }>);

        items.forEach(item => {
            if (stats[item.category]) {
                stats[item.category].count++;
                if (item.isAvailable) {
                    stats[item.category].availableCount++;
                }
            }
        });

        const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

        return Object.entries(stats)
            .map(([name, stat], index) => {
                const availability = stat.count > 0 ? (stat.availableCount / stat.count) : 0;
                let statusLabel = 'SOLD OUT';
                let statusColor = 'bg-rose-500';
                
                if (availability === 1) {
                    statusLabel = 'ACCEPTING';
                    statusColor = 'bg-emerald-500';
                } else if (availability > 0) {
                    statusLabel = 'LIMITED';
                    statusColor = 'bg-amber-500';
                }

                return { 
                    name, 
                    tokenCode: CATEGORY_TOKENS[name] || 'GEN',
                    value: stat.count, 
                    availableCount: stat.availableCount,
                    color: colors[index % colors.length],
                    percentage: totalItems > 0 ? ((stat.count / totalItems) * 100).toFixed(1) : '0',
                    statusLabel,
                    statusColor
                };
            })
            .filter(d => d.value > 0);
    }, [items, totalItems]);

    const StatCard = ({ title, value, icon, subtext, trend }: { title: string; value: string | number; icon: React.ReactNode; subtext?: string; trend?: { label: string, color: string, bg: string } }) => (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5 transition-all hover:shadow-xl hover:border-primary-100 group">
            <div className={`p-4 rounded-2xl group-hover:scale-110 transition-transform ${trend ? trend.bg : 'bg-primary-50'} ${trend ? trend.color : 'text-primary-600'}`}>
                {icon}
            </div>
            <div className="flex-grow">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline space-x-1">
                        <p className="text-2xl font-black text-gray-900">{value}</p>
                        {subtext && <span className="text-[10px] text-gray-400 font-bold uppercase">{subtext}</span>}
                    </div>
                    {trend && (
                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter ${trend.bg} ${trend.color}`}>
                            {trend.label}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h2>
                    <p className="text-gray-500 text-sm mt-1">Real-time overview of orders and inventory</p>
                </div>
                <div className="hidden sm:flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Live System</span>
                </div>
            </div>
            
            {/* Order Pipeline Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                    { label: 'New Orders', status: OrderStatus.NEW, color: 'text-amber-600', bg: 'bg-amber-50', icon: '✨' },
                    { label: 'Preparing', status: OrderStatus.PREPARING, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '🍳' },
                    { label: 'Ready to Serve', status: OrderStatus.READY, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '🍽️' },
                    { label: 'Completed', status: OrderStatus.COMPLETED, color: 'text-gray-600', bg: 'bg-gray-50', icon: '✅' },
                    { label: 'Cancelled', status: OrderStatus.CANCELLED, color: 'text-rose-600', bg: 'bg-rose-50', icon: '❌' },
                ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-3xl border border-gray-100 shadow-sm ${item.bg} flex flex-col items-center justify-center text-center transition-transform hover:scale-105`}>
                        <div className="text-lg mb-1">{item.icon}</div>
                        <span className={`text-2xl font-black ${item.color}`}>{orderStatusSummary[item.status]}</span>
                        <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${item.color}`}>{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col space-y-8">
                {/* Statistics Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StatCard 
                        title="Inventory Items" 
                        value={totalItems} 
                        icon={<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} 
                        subtext="Stock"
                    />
                    <StatCard 
                        title="Stock Health" 
                        value={`${availabilityRate.toFixed(0)}%`} 
                        icon={<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} 
                        trend={{ label: `${availableItems} Live`, color: 'text-emerald-500', bg: 'bg-emerald-50' }}
                    />
                </div>

                {/* Category Stock Progress Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-8">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Category Stock Status
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                        {categoryStats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.name}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black text-white ${stat.statusColor}`}>
                                            {stat.statusLabel}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400">{stat.availableCount}/{stat.value}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="h-full transition-all duration-700" style={{ width: `${(stat.availableCount/stat.value)*100}%`, backgroundColor: stat.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
