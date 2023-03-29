import React, { useEffect, useState } from 'react';
import '../../styles/dashboard.css';
import illustration from '../../assets/illustration2.png';
import axios from 'axios';

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

type myProps = {
  hideDoneTodos: () => void;
  setData: React.Dispatch<React.SetStateAction<myMainData | null>>;
  data: myMainData | null;
  hideTodos: boolean;
};
type myData = {
  areAllTodosHidden: boolean;
};

const Navigation: React.FC<myProps> = ({
  hideDoneTodos,
  setData,
  data,
  hideTodos,
}) => {
  const [myData, setMyData] = useState<myData | null>(null);
  const [mySelection, setMySelection] = useState<string>('');
  const selectGroup = () => {};

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        let response = await axios.get(
          'http://localhost:3000/api/v1/dashboard',
          {
            headers,
          }
        );
        setMyData(response.data);
        console.log(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [hideTodos]);

  useEffect(() => {
    const filterData = async () => {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.get(
        'http://localhost:3000/api/v1/dashboard/search',
        {
          params: {
            q: mySelection,
          },
          headers,
        }
      );
      setData(response.data);
    };
    filterData();
  }, [mySelection]);

  let style1 = {
    backgroundColor: mySelection === 'Work' ? '#d7d7d5' : 'white',
  };
  let style2 = {
    backgroundColor: mySelection === 'Study' ? '#d7d7d5' : 'white',
  };
  let style3 = {
    backgroundColor: mySelection === 'Entertainment' ? '#d7d7d5' : 'white',
  };
  let style4 = {
    backgroundColor: mySelection === 'Family' ? '#d7d7d5' : 'white',
  };

  console.log(mySelection);
  return (
    <div className="nav">
      <div className="tags">
        <div
          className="work group"
          onClick={() => setMySelection('Work')}
          style={style1}
        >
          <div className="work-circle circle"></div>
          <p className="work-text text">Work</p>
        </div>
        <div
          className="study group"
          onClick={() => setMySelection('Study')}
          style={style2}
        >
          <div className="study-circle circle"></div>
          <p className="study-text text">Study</p>
        </div>
        <div
          className="entertainment group"
          onClick={() => setMySelection('Entertainment')}
          style={style3}
        >
          <div className="entertainment-circle circle"></div>
          <p className="entertainment-text text">Entertainment</p>
        </div>
        <div
          className="family group"
          onClick={() => setMySelection('Family')}
          style={style4}
        >
          <div className="family-circle circle"></div>
          <p className="family-text text">Family</p>
        </div>
      </div>
      <div className="done">
        <div className="checkDone">
          <input
            className="checkbox"
            type="checkbox"
            name="check"
            id="checkbox"
            checked={myData?.areAllTodosHidden ? true : false}
            onChange={() => hideDoneTodos()}
          />
          <p className="hide">Hide Done Tasks</p>
        </div>
      </div>
      <div className="illustration">
        <img className="illustration2" src={illustration} alt="illustration" />
      </div>
    </div>
  );
};

export default Navigation;
