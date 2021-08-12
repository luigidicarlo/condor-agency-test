import { useEffect, useState } from 'react';
import { CompleteList } from './CompleteList';
import { PendingList } from './PendingList';

export const App = () => {
  const rawData = localStorage.getItem('todos') || null;
  const [todos, setTodos] = useState(rawData ? JSON.parse(rawData) : []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <main className="p-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <PendingList todos={todos} setTodos={setTodos} />
          </div>
          <div className="col-xs-12 col-md-6">
            <CompleteList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </main>
  );
};
