import React, { useState, useEffect, useRef } from 'react';

// Define the missing types
type StatePriority = {
  [key: string]: number;
};

type Agent = {
  name: string;
  state: string;
  duration: string;
};

type Skill = {
  name: string;
  avail: number;
  aux: number;
  busy: number;
  queue: number;
  longest: string;
  calls: number;
  aban?: number;
  svl: number;
  answered: string;
  abandoned: string;
  mtdSl?: string;
  mtdAbn?: string;
  callback: string;
  isAggregate?: boolean;
};

const WallboardDashboard = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSkillPage, setCurrentSkillPage] = useState(0);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [summary, setSummary] = useState({
    TotalAUXagents:0,
    TotalAgentsAvailable:0,
    TotalAgentsBusy: 0,
    TotalAgentsOffline:0,
    "TotalCallback/Email + Chat": 0,
    TotalCallsInQueue: 0,
    TotalCallsHandledToday: 0
    
  });
  const AGENTS_PER_PAGE = 9;
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

 
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/hello'); 
      const data = await response.json();


      if (data.Summary) {
        setSummary(data.Summary);
      }

      
      const extractedAgents: Agent[] = data.AgentStatus.map((agent: any) => ({
        name: agent.Username,
        state: agent.StatusName,
        duration: agent.TimeInStatus,
      }));
  
      
      const extractedSkills: Skill[] = data.QueuesData.map((queue: any) => {
        const getMetricValue = (name: string) => {
          const metric = queue.RTKPIMetrics.find((m: any) => m.Metric.Name === name);
          return metric ? metric.Metric.Value : 0;
        };
        const getMstdl = (name: string) => {
          const metric = queue.Month_to_date.find((m: any) => m.Metric.Name == name);
          return metric ? metric.Metric.Value : 0;
        };
  
        return {
          name: queue.QueueName,
          avail: queue.AgentMetrics.find((m: any) => m.Metric.Name === 'AGENTS_AVAILABLE')?.Metric.Value || 0,
          aux: queue.AgentMetrics.find((m: any) => m.Metric.Name === 'AGENTS_NON_PRODUCTIVE')?.Metric.Value || 0,
          busy: queue.AgentMetrics.find((m: any) => m.Metric.Name === 'AGENTS_ON_CALL')?.Metric.Value || 0,
          queue: queue.AgentMetrics.find((m: any) => m.Metric.Name === 'CONTACTS_IN_QUEUE')?.Metric.Value || 0,
          longest: getMetricValue('MAX_QUEUED_TIME').toString(),
          calls: getMetricValue('CONTACTS_HANDLED'),
          aban: getMetricValue('CONTACTS_ABANDONED'),
          svl: getMetricValue('SERVICE_LEVEL').toFixed(2),
          answered: getMetricValue('AGENT_ANSWER_RATE').toFixed(2) + '%',
          abandoned: getMetricValue('ABANDONMENT_RATE').toFixed(2) + '%',
          callback: getMetricValue('SUM_RETRY_CALLBACK_ATTEMPTS').toString(),
          mtdSl: getMstdl('SERVICE_LEVEL'),
          mtdAbn:getMstdl('ABANDONMENT_RATE')
          
        };
      });
  
      setAgents(extractedAgents);
      setSkills(extractedSkills);
    };
  
    fetchData();
  }, []);

  


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

  // Get color based on available agents
  const getAvailColor = (value: number) => {
    if (value >= 5) return 'bg-green-100 text-green-700';
    if (value >= 2) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  // Get color based on longest wait time
  const getLongestWaitColor = (value: string) => {
    const minutes = parseInt(value.split(':')[0]);
    if (minutes < 2) return 'bg-green-100 text-green-700';
    if (minutes < 5) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  // Get color based on SLA value
  const getSLAColor = (value: number) => {
    if (value >= 85) return 'bg-green-100 text-green-700';
    if (value >= 80) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header with reduced size */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-800">Contact Centre Wallboard</h1>
        <div className="text-right">
          {currentTime && (
            <>
              <div className="text-lg font-bold text-gray-600">
                {new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }).format(currentTime)}
              </div>
              <div className="text-4xl font-bold text-blue-600">
                {currentTime.toLocaleTimeString('en-GB')}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards - Increased font size by 25% */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        <div className="rounded-lg bg-blue-100 border-2 border-blue-500 p-4 shadow-md">
          <div className="text-3xl font-extrabold text-blue-700">
            {summary.TotalAgentsAvailable}
          </div>
          <div className="text-lg font-semibold text-blue-600">Available</div>
        </div>
        <div className="rounded-lg bg-yellow-100 border-2 border-yellow-400 p-4 shadow-md">
          <div className="text-3xl font-extrabold text-yellow-700">
            {summary.TotalAgentsBusy}
          </div>
          <div className="text-lg font-semibold text-yellow-600">Busy</div>
        </div>
        <div className="rounded-lg bg-purple-100 border-2 border-purple-400 p-4 shadow-md">
          <div className="text-3xl font-extrabold text-purple-700">
           {summary.TotalCallsInQueue}
          </div>
          <div className="text-lg font-semibold text-purple-600">Queue</div>
        </div>
        <div className="rounded-lg bg-green-100 border-2 border-green-400 p-4 shadow-md">
          <div className="text-3xl font-extrabold text-green-700">
            {summary.TotalCallsHandledToday}
          </div>
          <div className="text-lg font-semibold text-green-600">Total Calls</div>
        </div>
        <div className="rounded-lg bg-red-100 border-2 border-red-400 p-4 shadow-md">
          <div className="text-3xl font-extrabold text-red-700">
            {summary.TotalAUXagents}
          </div>
          <div className="text-lg font-semibold text-red-600">Break</div>
        </div>
        <div className="rounded-lg bg-gray-100 border-2 border-gray-400 p-4 shadow-md">
          <div className="text-3xl font-extrabold text-gray-700">
            {summary.TotalAgentsOffline}
          </div>
          <div className="text-lg font-semibold text-gray-600">Offline</div>
        </div>
        <div className="rounded-lg bg-indigo-100 border-2 border-indigo-400 p-4 shadow-md">
          <div className="text-3xl font-extrabold text-indigo-700">
            {summary['TotalCallback/Email + Chat']}
          </div>
          <div className="text-lg font-semibold text-indigo-600">CB/Email/LC</div>
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
                  <th className="p-2 text-left font-extrabold text-gray-700 text-lg">Skill</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">AVAIL</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">AUX</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">BUSY</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">QUEUE</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">WAIT</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">CALLS</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">CB</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">%SVL</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">%M-SL</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">%M-ABN</th>
                  <th className="p-2 font-extrabold text-gray-700 text-lg">%ABN</th>
                </tr>
              </thead>
              <tbody className="transition-all duration-500">
                {displayedSkills.map((skill, index) => (
                  <tr key={index} className={`border-b border-gray-200 ${skill.isAggregate ? 'font-bold bg-blue-50' : 'font-medium'} h-[80px]`}>
                    <td className={`p-3 text-left ${skill.isAggregate ? 'text-blue-700 text-2xl' : 'text-gray-700 text-xl'}`}>{skill.name}</td>
                    <td className={`p-3 text-center ${getAvailColor(skill.avail)} ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>{skill.avail}</td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>{skill.aux}</td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>{skill.busy}</td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>{skill.queue}</td>
                    <td className={`p-3 text-center ${getLongestWaitColor(skill.longest)} ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>{skill.longest}</td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>{skill.calls}</td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>{skill.callback}</td>
                    <td className={`p-3 text-center ${getSLAColor(skill.svl)} ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>
                      {skill.svl}
                    </td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>
                      {skill.mtdSl ? skill.mtdSl.replace('%', '') : '0.0'}
                    </td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>
                      {skill.mtdAbn ? skill.mtdAbn.replace('%', '') : '0.0'}
                    </td>
                    <td className={`p-3 text-center text-gray-700 ${skill.isAggregate ? 'text-3xl' : 'text-2xl'}`}>
                      {skill.abandoned ? skill.abandoned.replace('%', '') : '0.0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agent Status Table */}
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
                  <tr key={index} className="border-b border-gray-200 text-2xl font-medium hover:bg-gray-50 h-[62px]">
                    <td className="p-3 text-gray-700 font-bold">{agent.name}</td>
                    <td className={`p-3 text-center font-bold ${
                      agent.state === 'AVAIL' ? 'text-green-600' :
                      agent.state === 'ACD' ? 'text-blue-600' :
                      agent.state === 'ACW' ? 'text-yellow-600' :
                      agent.state === 'AUX' ? 'text-purple-600' :
                      agent.state === 'RING' ? 'text-orange-600' :
                      agent.state.includes('BREAK') ? 'text-red-600' :
                      'text-gray-600'
                    }`}>{agent.state}</td>
                    <td className="p-3 text-center text-gray-700 font-bold">{agent.duration}</td>
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