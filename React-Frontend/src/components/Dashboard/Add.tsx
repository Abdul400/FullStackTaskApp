import axios from 'axios';
import React, { Children, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/addMenu.css';

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
  addNewTodo: () => void;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<myMainData | null>>;
};

const Add: React.FC<Props> = ({ addNewTodo, setShowAdd, setData }) => {
  const [selectedTags, setSelectedTags] = useState<(string | null)[]>([]);
  const [tags, setTags] = useState([
    { tag: 'Work', isSelected: false },
    { tag: 'Study', isSelected: false },
    { tag: 'Entertainment', isSelected: false },
    { tag: 'Family', isSelected: false },
  ]);
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const chosenTags = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const tag = (e.target as HTMLDivElement).textContent;

    //update tags array
    if (selectedTags.includes(tag)) {
      setTags((prevState) => {
        return prevState.map((item) =>
          item.tag === tag ? { ...item, isSelected: false } : item
        );
      });
      setSelectedTags((prevState) => prevState.filter((item) => item !== tag));
    } else {
      setTags((prevState) => {
        return prevState.map((item) => {
          console.log(item.tag, tag);
          if (item.tag === tag) {
            return { ...item, isSelected: true };
          } else {
            return item;
          }
        });
      });
      setSelectedTags((prevState) => [...prevState, tag]);
    }
  };

  //function for setting background color
  // const setBackgroundColor = () => {
  //   for (let i = 0; i < tags.length; i++) {
  //     if (selectedTags.includes(tags[i].tag) && tags[i].isSelected === true) {
  //       return '#d7d7d5';
  //     } else {
  //       return 'white';
  //     }
  //   }
  // };
  const handleClick = async () => {
    if (titleInput.current!.value === '') {
      toast.error('cannot provide an empty title value!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }

    if (descriptionInput.current!.value === '') {
      toast.error('cannot provide an empty description value!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    if (selectedTags.length === 0) {
      toast.error('please select some tags to continue', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      try {
        let finalData = {
          title: titleInput.current!.value,
          description: descriptionInput.current!.value,
          tags: selectedTags,
        };
        const token = localStorage.getItem('userToken');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        await axios.post(
          'https://full-stack-task-app.vercel.app/api/v1/dashboard',
          finalData,
          {
            headers,
          }
        );

        let response = await axios.get(
          'https://full-stack-task-app.vercel.app/api/v1/dashboard',
          { headers }
        );
        setData(response.data);
        setShowAdd(false);
        toast.success('Item added successfully', {
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
    }
  };

  let style1 = {
    backgroundColor: tags[0].isSelected ? '#d7d7d5' : 'white',
  };
  let style2 = {
    backgroundColor: tags[1].isSelected ? '#d7d7d5' : 'white',
  };
  let style3 = {
    backgroundColor: tags[2].isSelected ? '#d7d7d5' : 'white',
  };
  let style4 = {
    backgroundColor: tags[3].isSelected ? '#d7d7d5' : 'white',
  };

  return (
    <div className="editPopup">
      <div className="buttons-container">
        <p onClick={() => addNewTodo()} className="cancel">
          Cancel
        </p>
        <button className="addEdit" onClick={() => handleClick()}>
          Add
        </button>
      </div>
      <h2 className="title editTitle">Title</h2>
      <input
        type="text"
        className="editInput"
        placeholder="add a title..."
        ref={titleInput}
      />
      <h2 className="title description">Description</h2>
      <textarea
        name="description"
        id="description"
        className="descriptionArea"
        placeholder="add a description..."
        ref={descriptionInput}
      ></textarea>
      <h2 className="tagsHeader title">Tags</h2>
      <div className="tags-container2">
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => chosenTags(e)}
          className="work group group1"
          style={style1}
        >
          <div className="work-circle circle circle1"></div>
          <p className="work-text text">Work</p>
        </div>
        <div
          className="study group group1"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => chosenTags(e)}
          style={style2}
        >
          <div className="study-circle circle circle1"></div>
          <p className="study-text text">Study</p>
        </div>
        <div
          className="entertainment group group1"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => chosenTags(e)}
          style={style3}
        >
          <div className="entertainment-circle circle circle1"></div>
          <p className="entertainment-text text">Entertainment</p>
        </div>
        <div
          className="family group group1"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => chosenTags(e)}
          style={style4}
        >
          <div className="family-circle circle circle1"></div>
          <p className="family-text text">Family</p>
        </div>
      </div>
    </div>
  );
};

export default Add;
