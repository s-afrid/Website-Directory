import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper to determine device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
};

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logVisit = useCallback(async () => {
    const deviceType = getDeviceType();
    try {
      await fetch('/api/analytics/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceType })
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      const formattedData = data.map(d => ({
        name: new Date(d.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
        dateKey: d.date,
        'Total Views': d.totalViews || 0,
        'Desktop': d.desktop || 0,
        'Mobile': d.mobile || 0,
        'Tablet': d.tablet || 0
      }));
      setAnalyticsData(formattedData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch analytics');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    logVisit();
    fetchAnalytics();
  }, [logVisit, fetchAnalytics]);

  const totalViews = useMemo(() => analyticsData.reduce((sum, d) => sum + d['Total Views'], 0), [analyticsData]);

  const calculateGrowth = (data) => {
    if (data.length < 14) return { change: 0, percent: 0 };
    const last7 = data.slice(-7).reduce((sum, d) => sum + d['Total Views'], 0);
    const prev7 = data.slice(-14,-7).reduce((sum, d) => sum + d['Total Views'], 0);
    if(prev7 === 0) return { change: last7, percent: last7>0?100:0};
    const change = last7-prev7;
    const percent = ((change/prev7)*100).toFixed(1);
    return { change, percent };
  }

  const { change, percent } = useMemo(()=>calculateGrowth(analyticsData),[analyticsData]);
  const isPositiveGrowth = change >= 0;

  if(loading) return <div className="p-4">Loading...</div>;
  if(error) return <div className="p-4">Error: {error}</div>;

  return (
    <div className="flex flex-col w-full h-full overflow-auto p-4 bg-gray-100">
      {/* Total Views */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Total Website Views: {totalViews}</h1>
        <p className={`${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
          {isPositiveGrowth ? `+${change} (${percent}%)` : `${change} (${percent}%)`} this week
        </p>
      </div>

      {/* Line Chart */}
      <div className="w-full h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData} margin={{top:5,right:20,left:10,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0"/>
            <XAxis dataKey="name" tick={{ fontSize:12, fill:'#777' }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize:12, fill:'#777' }} axisLine={false} tickLine={false}/>
            <Tooltip />
            <Line type="monotone" dataKey="Total Views" stroke="#6366f1" strokeWidth={3} dot={{ r:4, stroke:'#4f46e5', fill:'#fff' }} activeDot={{ r:6, stroke:'#4f46e5', fill:'#fff' }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Device Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {['Desktop','Mobile','Tablet'].map((device,index)=>{
          const views = analyticsData.reduce((sum,d)=>sum+(d[device]||0),0);
          const percentage = totalViews>0 ? ((views/totalViews)*100).toFixed(1):0;
          const color = ['#6366f1','#10b981','#f59e0b'][index];
          return (
            <div key={device} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <span>{device} Views</span>
                <span style={{color}}>{percentage}%</span>
              </div>
              <p className="text-2xl font-bold">{views}</p>
              <div className="h-1.5 w-full bg-gray-300 rounded-full mt-2">
                <div style={{width:`${percentage}%`, backgroundColor:color}} className="h-1.5 rounded-full"></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
