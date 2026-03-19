import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const data = [
    { name: 'AI/ML', value: 145 },
    { name: 'Cloud', value: 98 },
    { name: 'Cybersec', value: 87 },
    { name: 'DevOps', value: 76 },
    { name: 'Data Sci', value: 65 },
];

const colors = ['#FF6B00', '#FF8533', '#FFA366', '#FFC299', '#FFE0CC'];

const SkillGrowthChart = () => {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 40,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-color)" opacity={0.5} />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-main)', fontSize: 12, fontWeight: 500 }}
                        width={80}
                    />
                    <Tooltip
                        cursor={{ fill: 'var(--primary-color)', fillOpacity: 0.1 }}
                        contentStyle={{
                            backgroundColor: 'var(--bg-white)',
                            borderColor: 'var(--border-color)',
                            borderRadius: '12px',
                            color: 'var(--text-main)',
                            boxShadow: 'var(--shadow-md)',
                            border: '1px solid var(--border-color)',
                            padding: '12px'
                        }}
                        itemStyle={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
                        labelStyle={{ color: 'var(--text-light)', marginBottom: '4px' }}
                        formatter={(value) => [`+${value}%`, 'Growth Rate']}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillGrowthChart;
