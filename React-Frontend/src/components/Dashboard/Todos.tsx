import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../styles/todos.css';

import Todo from './Todo';

type myTask = {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  tags: [string];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  hideAllDoneTasks: boolean;
};

// type myMainData = {
//   success: boolean;
//   tasks: myTask[];
//   nbHits: number;
//   user: string;
//   hideAllDoneTasks: boolean;
// };
type myMainData = {
  success: boolean;
  tasks: myTask[];
  nbHits: number;
  user: string;
  areAllTodosHidden: boolean;
};
type myData = {
  success: boolean;
  tasks: myTask[];
  nbHits: number;
  user: string;
  hideAllDoneTasks: boolean;
};
type Props = {
  openEdit: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  hideTodos: boolean;
  setId: React.Dispatch<React.SetStateAction<string>>;
  data: myMainData;
  setData: React.Dispatch<React.SetStateAction<myMainData | null>>;
};

const Todos: React.FC<Props> = ({
  openEdit,
  hideTodos,
  setId,
  data,
  setData,
}) => {
  console.log(data);

  return (
    <div className="TodosContainer">
      <div className="bottom">
        {data.tasks.map((item: myTask) => (
          <Todo
            key={item._id.toString()}
            id={item._id.toString()}
            openEdit={openEdit}
            text={item.description}
            hideTodos={hideTodos}
            title={item.title}
            tags={item.tags}
            setId={setId}
            taskIsDone={item.isDone}
            hideAllDoneTasks={item.hideAllDoneTasks}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
