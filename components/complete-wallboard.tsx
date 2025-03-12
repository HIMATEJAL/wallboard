import React, { useState, useEffect, useRef } from 'react';

const WallboardDashboard = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSkillPage, setCurrentSkillPage] = useState(0);
  const AGENTS_PER_PAGE = 10;
  const SKILLS_PER_PAGE = 7;

  // Add state priority mapping with proper type
  const statePriority: StatePriority = {
    'ACD': 1,
    'ACW': 2,
    'AVAIL': 3,
    'COFFEE BREAK': 4,
    'LUNCH BREAK': 5,
    'TEA BREAK': 6,
    'BATHROOM BREAK': 7
  };

  // Move state declarations before the useEffect
  const [agents] = useState<Agent[]>([
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
    { name: 'Agent 5', state: 'COFFEE BREAK', duration: '76:14' },
    { name: 'Agent 6', state: 'LUNCH BREAK', duration: '76:14' },
    { name: 'Agent 7', state: 'TEA BREAK', duration: '76:14' },
    { name: 'Agent 8', state: 'BATHROOM BREAK', duration: '76:14' },
    { name: 'Agent 9', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 10', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 11', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 12', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 13', state: 'AVAIL', duration: '76:14' },
    { name: 'Agent 14', state: 'AVAIL', duration: '76:14' },
    
    
    // Add the rest of your agents here...
  ]);

  // Update the skills data to include the new fields
  const [skills] = useState<Skill[]>([
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
      mtdSl: '87.5%',
      mtdAbn: '2.0%',
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
      mtdSl: '90.9%',
      mtdAbn: '0.0%',
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
      mtdSl: '86.2%',
      mtdAbn: '3.5%',
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
      mtdSl: '82.9%',
      mtdAbn: '2.2%',
      callback: '0/19',
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
      mtdSl: '90.9%',
      mtdAbn: '0.0%',
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
      mtdSl: '86.2%',
      mtdAbn: '3.5%',
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
      mtdSl: '86.2%',
      mtdAbn: '3.5%',
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
      mtdSl: '86.2%',
      mtdAbn: '3.5%',
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
      mtdSl: '86.2%',
      mtdAbn: '3.5%',
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
      mtdSl: '86.2%',
      mtdAbn: '3.5%',
      callback: '0/1',
      isAggregate: true
    },
    // Add the rest of your individual skills here...
  ]);

  // Sort function for agents
  const sortAgents = (agents: Agent[]) => {
    return [...agents].sort((a, b) => {
      const priorityA = statePriority[a.state] || 999;
      const priorityB = statePriority[b.state] || 999;
      return priorityA - priorityB;
    });
  };

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const agentPageTransitionInterval = setInterval(() => {
      const totalAgentPages = Math.ceil(agents.length / AGENTS_PER_PAGE);
      setCurrentPage(current => (current + 1) % totalAgentPages);
    }, 5000);

    const skillPageTransitionInterval = setInterval(() => {
      const totalSkillPages = Math.ceil(skills.length / SKILLS_PER_PAGE);
      setCurrentSkillPage(current => (current + 1) % totalSkillPages);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(agentPageTransitionInterval);
      clearInterval(skillPageTransitionInterval);
    };
  }, [agents.length, skills.length, AGENTS_PER_PAGE, SKILLS_PER_PAGE]);

  // Calculate which agents to show based on current page
  const displayedAgents = sortAgents(agents).slice(
    currentPage * AGENTS_PER_PAGE,
    (currentPage + 1) * AGENTS_PER_PAGE
  );

  // Calculate which skills to show based on current page
  const displayedSkills = skills.slice(
    currentSkillPage * SKILLS_PER_PAGE,
    (currentSkillPage + 1) * SKILLS_PER_PAGE
  );

  // Get color based on SLA value
  const getSLAColor = (value) => {
    if (value >= 85) return 'bg-green-100 text-green-700';
    if (value >= 80) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  // Add threshold functions
  const getAvailColor = (value) => {
    if (value >= 5) return 'bg-green-100 text-green-700';
    if (value >= 3) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  const getLongestWaitColor = (timeString) => {
    // Convert time string (mm:ss) to seconds
    const [minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = (minutes * 60) + seconds;
    
    if (totalSeconds <= 30) return 'bg-green-100 text-green-700';
    if (totalSeconds <= 60) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header with further reduced size */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-800">Contact Centre Wallboard</h1>
        <div className="text-right">
          {currentTime && (
            <>
              <div className="text-base font-bold text-gray-600">
                {new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }).format(currentTime)}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {currentTime.toLocaleTimeString('en-GB')}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards - Reduced font size and added two more boxes */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        <div className="rounded-lg bg-blue-100 border-2 border-blue-500 p-4 shadow-md">
          <div className="text-2xl font-extrabold text-blue-700">
            {skills.reduce((sum, skill) => sum + skill.avail, 0)}
          </div>
          <div className="text-base font-semibold text-blue-600">Available Agents</div>
        </div>
        <div className="rounded-lg bg-yellow-100 border-2 border-yellow-400 p-4 shadow-md">
          <div className="text-2xl font-extrabold text-yellow-700">
            {skills.reduce((sum, skill) => sum + skill.busy, 0)}
          </div>
          <div className="text-base font-semibold text-yellow-600">Busy Agents</div>
        </div>
        <div className="rounded-lg bg-purple-100 border-2 border-purple-400 p-4 shadow-md">
          <div className="text-2xl font-extrabold text-purple-700">
            {skills.reduce((sum, skill) => sum + skill.queue, 0)}
          </div>
          <div className="text-base font-semibold text-purple-600">Calls in Queue</div>
        </div>
        <div className="rounded-lg bg-green-100 border-2 border-green-400 p-4 shadow-md">
          <div className="text-2xl font-extrabold text-green-700">
            {skills.reduce((sum, skill) => sum + skill.calls, 0)}
          </div>
          <div className="text-base font-semibold text-green-600">Total Calls Today</div>
        </div>
        <div className="rounded-lg bg-red-100 border-2 border-red-400 p-4 shadow-md">
          <div className="text-2xl font-extrabold text-red-700">
            {agents.filter(agent => agent.state === 'AUX').length}
          </div>
          <div className="text-base font-semibold text-red-600">Agents on Break</div>
        </div>
        <div className="rounded-lg bg-gray-100 border-2 border-gray-400 p-4 shadow-md">
          <div className="text-2xl font-extrabold text-gray-700">
            {/* Placeholder value - replace with actual data */}
            {12}
          </div>
          <div className="text-base font-semibold text-gray-600">Agents Offline</div>
        </div>
        <div className="rounded-lg bg-indigo-100 border-2 border-indigo-400 p-4 shadow-md">
          <div className="text-2xl font-extrabold text-indigo-700">
            {/* Placeholder value - replace with actual data */}
            {8}
          </div>
          <div className="text-base font-semibold text-indigo-600">CB/Email + Livechat</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Combined Skills Table */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="h-[600px]">
            <table className="w-full text-base text-gray-800">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left font-extrabold text-gray-700 text-base">Skill</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">AVAIL</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">AUX</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">BUSY</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">QUEUE</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">LONGEST</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">CALLS</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">%SVL</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">MTD SL</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">MTD ABN</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">Aban'd</th>
                  <th className="p-2 font-extrabold text-gray-700 text-base">CallBack</th>
                </tr>
              </thead>
              <tbody className="transition-all duration-500">
                {displayedSkills.map((skill, index) => (
                  <tr key={index} className={`border-b border-gray-200 ${skill.isAggregate ? 'font-bold text-xl bg-blue-50' : 'font-medium text-lg'} h-[80px]`}>
                    <td className={`p-3 text-left ${skill.isAggregate ? 'text-blue-700' : 'text-gray-700'}`}>{skill.name}</td>
                    <td className={`p-3 text-center ${getAvailColor(skill.avail)}`}>{skill.avail}</td>
                    <td className="p-3 text-center text-gray-700">{skill.aux}</td>
                    <td className="p-3 text-center text-gray-700">{skill.busy}</td>
                    <td className="p-3 text-center text-gray-700">{skill.queue}</td>
                    <td className={`p-3 text-center ${getLongestWaitColor(skill.longest)}`}>{skill.longest}</td>
                    <td className="p-3 text-center text-gray-700">{skill.calls}</td>
                    <td className={`p-3 text-center ${getSLAColor(skill.svl)}`}>{skill.svl}%</td>
                    <td className="p-3 text-center text-gray-700">{skill.mtdSl || '0.0%'}</td>
                    <td className="p-3 text-center text-gray-700">{skill.mtdAbn || '0.0%'}</td>
                    <td className="p-3 text-center text-gray-700">{skill.abandoned}</td>
                    <td className="p-3 text-center text-gray-700">{skill.callback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agent Status Table with increased font size */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="h-[600px]">
            <table className="w-full text-base text-gray-800">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 text-left font-extrabold text-gray-700 text-xl">Agent</th>
                  <th className="p-3 font-extrabold text-gray-700 text-xl">State</th>
                  <th className="p-3 font-extrabold text-gray-700 text-xl">Duration</th>
                </tr>
              </thead>
              <tbody className="transition-all duration-500">
                {displayedAgents.map((agent, index) => (
                  <tr key={index} className="border-b border-gray-200 text-xl font-medium hover:bg-gray-50 h-[55px]">
                    <td className="p-3 text-gray-700">{agent.name}</td>
                    <td className={`p-3 text-center font-bold ${
                      agent.state === 'AVAIL' ? 'text-green-600' :
                      agent.state === 'ACD' ? 'text-blue-600' :
                      agent.state === 'ACW' ? 'text-yellow-600' :
                      agent.state === 'AUX' ? 'text-purple-600' :
                      agent.state === 'RING' ? 'text-orange-600' :
                      agent.state.includes('BREAK') ? 'text-red-600' :
                      'text-gray-600'
                    }`}>{agent.state}</td>
                    <td className="p-3 text-center text-gray-700">{agent.duration}</td>
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