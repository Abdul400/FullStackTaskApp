import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Todos from './Todos';
import '../../styles/dashboard.css';
import add from '../../assets/plus.png';
import Add from '../Dashboard/Add';
import Edit from './Edit';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

type myData = {
  myTitle: string | null | undefined;
  myDescription: string | null | undefined;
  myTags: string[];
};

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

const MainDashboard: React.FC = () => {
  const navigate = useNavigate();
  const myLocation = useLocation();
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<myData>({
    myTitle: '',
    myDescription: '',
    myTags: [],
  });
  const [hideTodos, setHideTodos] = useState<boolean>(false);
  const [data, setData] = useState<myMainData | null>(null);

  const addNewTodo = () => setShowAdd(!showAdd);

  const openEdit = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (e.currentTarget.textContent === 'Edit...') {
      let id = e.currentTarget.parentElement?.parentElement?.id;
      const token = localStorage.getItem('userToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      async function getItem() {
        let response = await axios.get(
          `https://full-stack-task-app.vercel.app/api/v1/dashboard/${id}`,
          {
            headers,
          }
        );
        let title = response.data.task.title;
        let description = response.data.task.description;
        let tags = response.data.task.tags;
        setEditData({
          myTitle: title,
          myDescription: description,
          myTags: tags,
        });
      }
      getItem();
    }
    setShowEdit((prevState: React.SetStateAction<boolean>) => !prevState);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('userToken');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        let response = await axios.get(
          'https://full-stack-task-app.vercel.app/api/v1/dashboard',
          {
            headers,
          }
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const hideDoneTodos = () => {
    setHideTodos(!hideTodos);
    const patchData = async () => {
      const token = localStorage.getItem('userToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      await axios.patch(
        `https://full-stack-task-app.vercel.app/api/v1/dashboard`,
        { hideAllDoneTasks: hideTodos },
        { headers }
      );
      let response = await axios.get(
        'https://full-stack-task-app.vercel.app/api/v1/dashboard',
        {
          headers,
        }
      );

      setData(response.data);
    };
    patchData();
  };

  if (myLocation.pathname === '/dashboard') {
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Not authorized to access this resource!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    }
  }
  const getTime = () => {
    let time = new Date().getHours();
    console.log(time);
    let myTime = '';
    if (time >= 17 && time < 24) {
      myTime = 'Evening';
    } else if (time >= 0 && time < 12) {
      myTime = 'Morning';
    } else {
      myTime = 'Afternoon';
    }
    return myTime;
  };
  getTime();

  const signOut = () => {
    localStorage.clear();
    setTimeout(() => navigate('/signin'), 2000);
  };
  const getUser = () => {
    let user: any = localStorage.getItem('user');
    let capitalizedStr =
      user.replace(/^\w/, (c: any) => c.toUpperCase()) || undefined;
    return capitalizedStr || undefined;
  };
  return (
    <div className="DashboardContainer">
      <ToastContainer />
      <h2 className="header1">todo</h2>
      <h2 className="welcome">
        <span className="bold">{`Good ${getTime()} ${getUser()} `}</span>
      </h2>
      <button className="signOut" onClick={signOut}>
        SignOut
      </button>
      <img
        className="add"
        onClick={() => addNewTodo()}
        src={add}
        alt="add todo"
      />
      <div className="left-nav">
        <Navigation
          hideDoneTodos={hideDoneTodos}
          hideTodos={hideTodos}
          setData={setData}
          data={data}
        />
      </div>
      <div className="right-todos">
        {data && (
          <Todos
            openEdit={openEdit}
            data={data}
            hideTodos={hideTodos}
            setId={setId}
            setData={setData}
          />
        )}
      </div>
      {(showAdd || showEdit) && <div className="overlay"></div>}
      {showAdd && (
        <Add
          addNewTodo={addNewTodo}
          setShowAdd={setShowAdd}
          setData={setData}
        />
      )}
      {showEdit && (
        <Edit
          id={id}
          editData={editData}
          openEdit={openEdit}
          setShowEdit={setShowEdit}
          setData={setData}
        />
      )}
    </div>
  );
};

export default MainDashboard;
