import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
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

type Props = {
  openEdit: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  editData: myData;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setData: React.Dispatch<React.SetStateAction<myMainData | null>>;
};
const Edit: React.FC<Props> = ({
  openEdit,
  editData,
  setShowEdit,
  id,
  setData,
}) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.value = editData.myTitle || '';
    }
    if (descriptionInput.current) {
      descriptionInput.current.value = editData.myDescription || '';
    }
  }, [editData]);

  const [selectedTags, setSelectedTags] = useState<(string | null)[]>([]);
  const [tags, setTags] = useState([
    { tag: 'Work', isSelected: false },
    { tag: 'Study', isSelected: false },
    { tag: 'Entertainment', isSelected: false },
    { tag: 'Family', isSelected: false },
  ]);
  const chosenTags = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const tag = (e.target as HTMLDivElement).textContent;
    if (selectedTags.includes(tag)) {
      setTags((prevState) => {
        return prevState.map((item) =>
          item.tag === tag ? { ...item, isSelected: false } : item
        );
      });
      setSelectedTags((prevState) => prevState.filter((item) => item !== tag));
    } else {
      setTags((prevState) => {
        return prevState.map((item) =>
          item.tag === tag ? { ...item, isSelected: true } : item
        );
      });
      setSelectedTags((prevState) => [...prevState, tag]);
    }
  };
  const handleClick = async () => {
    if (titleInput.current!.value === '') {
      console.log('hellooo');
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
      let finalData = {
        title: titleInput.current!.value,
        description: descriptionInput.current!.value,
        tags: selectedTags,
      };
      console.log(finalData);
      const token = localStorage.getItem('userToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      await axios.patch(
        `https://full-stack-task-app.vercel.app/api/v1/dashboard/${id}`,
        finalData,
        { headers }
      );
      let response = await axios.get(
        'https://full-stack-task-app.vercel.app/api/v1/dashboard',
        {
          headers,
        }
      );
      setData(response.data);
      setShowEdit(false);
      toast.success('Item updated successfully', {
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
        <p
          onClick={(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) =>
            openEdit(e)
          }
          className="cancel"
        >
          Cancel
        </p>
        <button className="addEdit" onClick={() => handleClick()}>
          Edit
        </button>
      </div>
      <h2 className="title editTitle">Title</h2>
      <input
        ref={titleInput}
        type="text"
        className="editInput"
        placeholder="add a title..."
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
          className="work group group1"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => chosenTags(e)}
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

export default Edit;
