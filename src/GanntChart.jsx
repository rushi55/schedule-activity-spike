import React from "react";
import { FrappeGantt,ViewMode } from 'frappe-gantt-react'

const tasks = [
  {
    id: "Task 1",
    name: "Compaction",
    start: "2021-06-15",
    end: "2021-06-20",
    progress: 50
  },
  {
    id: "Task 2",
    name: "Footings",
    start: "2021-06-22",
    end: "2021-06-25",
    dependencies: "Task 1",
  },
  {
    id: "Task 2",
    name: "Underground",
    start: "2021-06-16",
    end: "2021-06-21",
    progress: 20,
    dependencies: "",
  },
]

export const GanntChart = () => {
  return (
    <div>
      <FrappeGantt
        tasks={tasks}
        viewMode={ViewMode.Day}
        onClick={(task) => console.log(task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
      />
    </div>
  );
};
