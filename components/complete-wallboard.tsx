import React, { useState, useEffect, useRef } from 'react';

const WallboardDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const agentTableRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const scrollInterval = setInterval(() => {
      if (agentTableRef.current) {
        const { scrollHeight, clientHeight } = agentTableRef.current;
        if (scrollHeight > clientHeight) {
          if (scrollPosition >= scrollHeight - clientHeight) {
            setScrollPosition(0);
          } else {
            setScrollPosition(prev => prev + clientHeight);
          }
        }
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(scrollInterval);
    };
  }, [scrollPosition]);

  useEffect(() => {
    if (agentTableRef.current) {
      agentTableRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Combined skills data with both aggregate and individual skills
  const [skills] = useState([
    // Aggregate skills (displayed with highlighting)
    {
      name: 'GBL',
      avail: 2,
      aux: 2,
      busy: 1,
      queue: 0,
      longest: '00:00',
      calls: 207,
      aban: 6,
      svl: 85,
      answered: '82.9%',
      abandoned: '2.2%',
      callback: '0/19',
      isAggregate: true
    },
    {
      name: 'GOBIZ',
      avail: 2,
      aux: 5,
      busy: 2,
      queue: 0,
      longest: '00:00',
      calls: 22,
      aban: 0,
      svl: 87,
      answered: '90.9%',
      abandoned: '0.0%',
      callback: '0/0',
      isAggregate: true
    },
    {
      name: 'TN',
      avail: 4,
      aux: 7,
      busy: 1,
      queue: 0,
      longest: '00:00',
      calls: 27,
      aban: 1,
      svl: 83,
      answered: '86.2%',
      abandoned: '3.5%',
      callback: '0/1',
      isAggregate: true
    },
    {
      name: 'eLIT',
      avail: 2,
      aux: 2,
      busy: 1,
      queue: 0,
      longest: '00:00',
      calls: 229,
      aban: 5,
      svl: 82.9,
      answered: '82.9%',
      abandoned: '2.2%',
      callback: '0/19' ,
      isAggregate: true
    },
    {
      name: 'INTEREQ',
      avail: 1,
      aux: 1,
      busy: 0,
      queue: 0,
      longest: '00:00',
      calls: 22,
      aban: 0,
      svl: 90.9,
      answered: '90.9%',
      abandoned: '0.0%',
      callback: '0/0',
      isAggregate: true
    },
    {
      name: 'PSS-INLIS',
      avail: 1,
      aux: 2,
      busy: 0,
      queue: 0,
      longest: '00:00',
      calls: 29,
      aban: 1,
      svl: 86.2,
      answered: '86.2%',
      abandoned: '3.5%',
      callback: '0/1',
      isAggregate: true
    },
    {
      name: 'P & A',
      avail: 1,
      aux: 2,
      busy: 0,
      queue: 0,
      longest: '00:00',
      calls: 29,
      aban: 1,
      svl: 86.2,
      answered: '86.2%',
      abandoned: '3.5%',
      callback: '0/1',
      isAggregate: true
    },
    {
      name: 'CUST ADM',
      avail: 1,
      aux: 2,
      busy: 0,
      queue: 0,
      longest: '00:00',
      calls: 29,
      aban: 1,
      svl: 86.2,
      answered: '86.2%',
      abandoned: '3.5%',
      callback: '0/1',
      isAggregate: true
    },
    {
      name: 'LNET3',
      avail: 1,
      aux: 2,
      busy: 0,
      queue: 0,
      longest: '00:00',
      calls: 29,
      aban: 1,
      svl: 86.2,
      answered: '86.2%',
      abandoned: '3.5%',
      callback: '0/1',
      isAggregate: true
    },
    {
      name: 'CUSTOMS',
      avail: 1,
      aux: 2,
      busy: 0,
      queue: 0,
      longest: '00:00',
      calls: 29,
      aban: 1,
      svl: 86.2,
      answered: '86.2%',
      abandoned: '3.5%',
      callback: '0/1',
      isAggregate: true
    },
    // Add the rest of your individual skills here...
  ]);

  // Agent data
  const [agents] = useState([
    { name: 'Selina', state: 'ACD', duration: '4:33' },
    { name: 'Alonza', state: 'ACD', duration: '3:31' },
    { name: 'KahCheong1', state: 'ACD', duration: '1:10' },
    { name: 'Kevin', state: 'ACD', duration: '0:53' },
    { name: 'Raidah', state: 'ACD', duration: '0:16' },
    { name: 'Jeremy', state: 'ACW', duration: '2:57' },
    { name: 'Jane', state: 'ACW', duration: '1:41' },
    { name: 'Agent 1', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 2', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 3', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 4', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 5', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 6', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 7', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 8', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 9', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 10', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 11', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 12', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 13', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 14', state: 'AVAIL', duration: '76:14' },
    
    
    // Add the rest of your agents here...
  ]);

  // Get color based on SLA value
  const getSLAColor = (value) => {
    if (value >= 85) return 'bg-green-500';
    if (value >= 80) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Contact Center Wallboard</h1>
        <div className="text-4xl font-bold text-blue-400">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg bg-blue-600 p-4 shadow-lg">
          <div className="text-2xl font-bold text-white">
            {skills.reduce((sum, skill) => sum + skill.avail, 0)}
          </div>
          <div className="text-sm text-white opacity-90">Available Agents</div>
        </div>
        <div className="rounded-lg bg-yellow-500 p-4 shadow-lg">
          <div className="text-2xl font-bold text-white">
            {skills.reduce((sum, skill) => sum + skill.busy, 0)}
          </div>
          <div className="text-sm text-white opacity-90">Busy Agents</div>
        </div>
        <div className="rounded-lg bg-purple-600 p-4 shadow-lg">
          <div className="text-2xl font-bold text-white">
            {skills.reduce((sum, skill) => sum + skill.queue, 0)}
          </div>
          <div className="text-sm text-white opacity-90">Calls in Queue</div>
        </div>
        <div className="rounded-lg bg-green-600 p-4 shadow-lg">
          <div className="text-2xl font-bold text-white">
            {skills.reduce((sum, skill) => sum + skill.calls, 0)}
          </div>
          <div className="text-sm text-white opacity-90">Total Calls Today</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Combined Skills Table */}
        <div className="col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">Skill</th>
                <th className="p-3">AVAIL</th>
                <th className="p-3">AUX</th>
                <th className="p-3">BUSY</th>
                <th className="p-3">QUEUE</th>
                <th className="p-3">LONGEST</th>
                <th className="p-3">CALLS</th>
                <th className="p-3">ABAN</th>
                <th className="p-3">%SVL</th>
                <th className="p-3">Ans'd</th>
                <th className="p-3">Aban'd</th>
                <th className="p-3">CallBack</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index} className={`border-b border-gray-700 ${skill.isAggregate ? 'font-medium' : ''}`}>
                  <td className={`p-3 text-left ${skill.isAggregate ? 'bg-blue-500' : ''}`}>{skill.name}</td>
                  <td className={`p-3 text-center ${skill.isAggregate ? 'bg-green-500' : ''}`}>{skill.avail}</td>
                  <td className="p-3 text-center">{skill.aux}</td>
                  <td className="p-3 text-center">{skill.busy}</td>
                  <td className="p-3 text-center">{skill.queue}</td>
                  <td className={`p-3 text-center ${skill.isAggregate ? 'bg-blue-500' : ''}`}>{skill.longest}</td>
                  <td className="p-3 text-center">{skill.calls}</td>
                  <td className="p-3 text-center">{skill.aban}</td>
                  <td className={`p-3 text-center ${getSLAColor(skill.svl)}`}>{skill.svl}%</td>
                  <td className="p-3 text-center">{skill.answered}</td>
                  <td className="p-3 text-center">{skill.abandoned}</td>
                  <td className="p-3 text-center">{skill.callback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Agent Status Table */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div 
            ref={agentTableRef}
            className="overflow-y-auto h-96 transition-all duration-1000 ease-in-out"
          >
            <table className="w-full text-sm text-white">
              <thead className="bg-gray-700 sticky top-0">
                <tr>
                  <th className="p-3 text-left">Agent</th>
                  <th className="p-3">State</th>
                  <th className="p-3">Duration</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-3">{agent.name}</td>
                    <td className={`p-3 text-center ${
                      agent.state === 'AVAIL' ? 'text-green-400' :
                      agent.state === 'ACD' ? 'text-blue-400' :
                      agent.state === 'ACW' ? 'text-yellow-400' :
                      agent.state === 'AUX' ? 'text-purple-400' :
                      agent.state === 'RING' ? 'text-orange-400' :
                      'text-gray-400'
                    }`}>{agent.state}</td>
                    <td className="p-3 text-center">{agent.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallboardDashboard;