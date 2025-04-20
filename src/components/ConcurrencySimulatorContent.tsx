import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaPlus, FaMinus } from 'react-icons/fa';

interface Process {
  id: number;
  name: string;
  state: 'ready' | 'running' | 'blocked' | 'terminated';
  priority: number;
  burstTime: number;
  remainingTime: number;
  waitingTime: number;
  turnaroundTime: number;
  color: string;
}

const ConcurrencySimulatorContent: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [quantum, setQuantum] = useState(2);
  const [currentTime, setCurrentTime] = useState(0);
  const [algorithm, setAlgorithm] = useState<'fcfs' | 'sjf' | 'rr' | 'priority'>('fcfs');
  const [nextProcessId, setNextProcessId] = useState(1);

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
  ];

  const addProcess = () => {
    if (processes.length >= 8) return;

    const newProcess: Process = {
      id: nextProcessId,
      name: `P${nextProcessId}`,
      state: 'ready',
      priority: Math.floor(Math.random() * 10) + 1,
      burstTime: Math.floor(Math.random() * 10) + 1,
      remainingTime: Math.floor(Math.random() * 10) + 1,
      waitingTime: 0,
      turnaroundTime: 0,
      color: colors[processes.length % colors.length],
    };

    setProcesses([...processes, newProcess]);
    setNextProcessId(nextProcessId + 1);
  };

  const removeProcess = () => {
    if (processes.length > 0) {
      const newProcesses = [...processes];
      newProcesses.pop();
      setProcesses(newProcesses);
    }
  };

  const resetSimulation = () => {
    setProcesses(processes.map(p => ({
      ...p,
      state: 'ready',
      remainingTime: p.burstTime,
      waitingTime: 0,
      turnaroundTime: 0,
    })));
    setCurrentTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(time => time + 1);
        setProcesses(currentProcesses => {
          const newProcesses = [...currentProcesses];
          let updated = false;

          switch (algorithm) {
            case 'fcfs':
              {
                const runningProcess = newProcesses.find(p => p.state === 'running');
                if (!runningProcess) {
                  const nextProcess = newProcesses.find(p => p.state === 'ready');
                  if (nextProcess) {
                    nextProcess.state = 'running';
                    updated = true;
                  }
                } else {
                  runningProcess.remainingTime--;
                  if (runningProcess.remainingTime <= 0) {
                    runningProcess.state = 'terminated';
                    runningProcess.turnaroundTime = currentTime + 1;
                    updated = true;
                  }
                }
              }
              break;

            case 'sjf':
              {
                const runningProcess = newProcesses.find(p => p.state === 'running');
                if (!runningProcess) {
                  const readyProcesses = newProcesses.filter(p => p.state === 'ready');
                  if (readyProcesses.length > 0) {
                    const shortestJob = readyProcesses.reduce((prev, curr) =>
                      prev.remainingTime < curr.remainingTime ? prev : curr
                    );
                    shortestJob.state = 'running';
                    updated = true;
                  }
                } else {
                  runningProcess.remainingTime--;
                  if (runningProcess.remainingTime <= 0) {
                    runningProcess.state = 'terminated';
                    runningProcess.turnaroundTime = currentTime + 1;
                    updated = true;
                  }
                }
              }
              break;

            case 'rr':
              {
                const runningProcess = newProcesses.find(p => p.state === 'running');
                if (!runningProcess) {
                  const nextProcess = newProcesses.find(p => p.state === 'ready');
                  if (nextProcess) {
                    nextProcess.state = 'running';
                    updated = true;
                  }
                } else {
                  runningProcess.remainingTime--;
                  if (runningProcess.remainingTime <= 0) {
                    runningProcess.state = 'terminated';
                    runningProcess.turnaroundTime = currentTime + 1;
                    updated = true;
                  } else if (currentTime % quantum === 0) {
                    runningProcess.state = 'ready';
                    const nextProcess = newProcesses.find(p => p.state === 'ready' && p.id !== runningProcess.id);
                    if (nextProcess) {
                      nextProcess.state = 'running';
                      updated = true;
                    } else {
                      runningProcess.state = 'running';
                    }
                  }
                }
              }
              break;

            case 'priority':
              {
                const runningProcess = newProcesses.find(p => p.state === 'running');
                if (!runningProcess) {
                  const readyProcesses = newProcesses.filter(p => p.state === 'ready');
                  if (readyProcesses.length > 0) {
                    const highestPriority = readyProcesses.reduce((prev, curr) =>
                      prev.priority > curr.priority ? prev : curr
                    );
                    highestPriority.state = 'running';
                    updated = true;
                  }
                } else {
                  runningProcess.remainingTime--;
                  if (runningProcess.remainingTime <= 0) {
                    runningProcess.state = 'terminated';
                    runningProcess.turnaroundTime = currentTime + 1;
                    updated = true;
                  }
                }
              }
              break;
          }

          newProcesses.forEach(p => {
            if (p.state === 'ready') {
              p.waitingTime++;
            }
          });

          return updated ? newProcesses : currentProcesses;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, algorithm, quantum, currentTime]);

  const allTerminated = processes.every(p => p.state === 'terminated');
  if (allTerminated && isRunning) {
    setIsRunning(false);
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={allTerminated}
              className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {isRunning ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={resetSimulation}
              className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              <FaStop />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={addProcess}
              disabled={processes.length >= 8}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
            >
              <FaPlus />
            </button>
            <button
              onClick={removeProcess}
              disabled={processes.length === 0}
              className="p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50"
            >
              <FaMinus />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as typeof algorithm)}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          >
            <option value="fcfs">First Come First Served</option>
            <option value="sjf">Shortest Job First</option>
            <option value="rr">Round Robin</option>
            <option value="priority">Priority</option>
          </select>
          {algorithm === 'rr' && (
            <div className="flex items-center space-x-2">
              <label>Quantum:</label>
              <input
                type="number"
                value={quantum}
                onChange={(e) => setQuantum(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                min="1"
              />
            </div>
          )}
          <div className="ml-auto">
            Time: {currentTime}s
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Process Queue</h3>
            <div className="space-y-2">
              {processes.map((process) => (
                <div
                  key={process.id}
                  className={`p-4 rounded-lg ${process.color} text-white`}
                >
                  <div className="flex items-center justify-between">
                    <span>{process.name}</span>
                    <span>{process.state}</span>
                  </div>
                  <div className="text-sm mt-2">
                    <div>Priority: {process.priority}</div>
                    <div>Remaining: {process.remainingTime}s</div>
                    <div>Waiting: {process.waitingTime}s</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Process</th>
                  <th className="pb-2">Turnaround</th>
                  <th className="pb-2">Waiting</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process) => (
                  <tr key={process.id}>
                    <td className="py-1">{process.name}</td>
                    <td className="py-1">{process.turnaroundTime}s</td>
                    <td className="py-1">{process.waitingTime}s</td>
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

export default ConcurrencySimulatorContent; 