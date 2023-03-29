import React, { useState, useRef, useEffect } from 'react';
import '../../styles/todos.css';
import menuImg from '../../assets/menu.png';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

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
type myMainData = {
  success: boolean;
  tasks: myTask[];
  nbHits: number;
  user: string;
  areAllTodosHidden: boolean;
};

type Props = {
  text: string;
  openEdit: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  hideTodos: boolean;
  title: string;
  tags: [string];
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  taskIsDone: boolean;
  hideAllDoneTasks: boolean;
  setData: React.Dispatch<React.SetStateAction<myMainData | null>>;
};

const Todo: React.FC<Props> = ({
  text,
  openEdit,
  hideTodos,
  title,
  tags,
  id,
  setId,
  taskIsDone,
  hideAllDoneTasks,
  setData,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const showMenuFunc = () => {
    setShowMenu((prevState: React.SetStateAction<boolean>) => !prevState);
  };

  const closeEditor = (e: any) => {
    openEdit(e);
    setId(e.currentTarget.parentNode!.parentElement!.id);
    setShowMenu((prevState: React.SetStateAction<boolean>) => !prevState);
  };
  const style = {
    display: taskIsDone && hideAllDoneTasks ? 'none' : 'block',
  };

  const deleteTodo = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`http://localhost:3000/api/v1/dashboard/${id}`, {
        headers,
      });
      let response = await axios.get('http://localhost:3000/api/v1/dashboard', {
        headers,
      });

      setData(response.data);
      setShowMenu(false);
      toast.error('Item deleted successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const finishItem = async () => {
    console.log(taskIsDone);
    console.log('testsetseatestewateaste');
    if (taskIsDone === false) {
      console.log('do');
      setIsDone(true);
      const token = localStorage.getItem('userToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      let finalData = {
        title: title,
        description: text,
        tags: tags,
        isDone: true,
      };
      await axios.patch(
        `http://localhost:3000/api/v1/dashboard/${id}`,
        finalData,
        {
          headers,
        }
      );
      let response = await axios.get('http://localhost:3000/api/v1/dashboard', {
        headers,
      });

      setData(response.data);
    }

    if (taskIsDone === true) {
      console.log('undoing....');
      setIsDone(false);
      const token = localStorage.getItem('userToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      let finalData = {
        title: title,
        description: text,
        tags: tags,
        isDone: false,
      };
      await axios.patch(
        `http://localhost:3000/api/v1/dashboard/${id}`,
        finalData,
        {
          headers,
        }
      );
      let response = await axios.get('http://localhost:3000/api/v1/dashboard', {
        headers,
      });

      setData(response.data);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        id={id}
        style={style}
        className="todoItem"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="primary-inner-container">
          <div className="title-container">
            <h3 className={taskIsDone ? 'strike-through title' : 'title'}>
              {title}
            </h3>
            <img
              onClick={showMenuFunc}
              className="editMenu"
              src={menuImg}
              alt="menu"
            />
          </div>
          <div className="task-text-container">
            <p className={taskIsDone ? 'strike-through todoText' : 'todoText'}>
              {text}
            </p>
          </div>
          <div className="tags-container">
            <div className="task-tags">
              {tags.map((tag: string) => {
                if (tag === 'Work') {
                  return <div className="work-circle circle"></div>;
                }
                if (tag === 'Family') {
                  return <div className="family-circle circle"></div>;
                }
                if (tag === 'Study') {
                  return <div className="study-circle circle"></div>;
                }
                if (tag === 'Entertainment') {
                  return <div className="entertainment-circle circle"></div>;
                }
              })}
              {/* <div className="work-circle circle"></div>
              <div className="study-circle circle"></div>
              <div className="entertainment-circle circle"></div>
              <div className="family-circle circle"></div> */}
            </div>
            <div className="mark-done">
              <input
                className="checkboxItem"
                type="checkbox"
                name="check"
                id="checkbox"
                onChange={() => finishItem()}
                checked={taskIsDone}
              />
              <p className="checkItem">Done</p>
            </div>
          </div>
        </div>
        {showMenu && (
          <div className="editMenu-container">
            <p
              onClick={(e: React.MouseEvent) => closeEditor(e)}
              className="edit"
            >
              Edit...
            </p>
            <div className="center"></div>
            <p className="delete" onClick={() => deleteTodo()}>
              Delete
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Todo;
