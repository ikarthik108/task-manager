import { deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FormEventHandler, useState } from "react";
import { db } from "../firebase";
import Modal from "./Modal";

interface TaskProps {
  id: string;
  index: number;
  name: string;
  description: string;
  timestamp: string;
  status: boolean;
}

const Task: React.FC<TaskProps> = ({
  id,
  index,
  name,
  description,
  timestamp,
  status,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editTaskName, setEditTaskName] = useState<string>(name);
  const [editTaskDescription, setEditTaskDescription] =
    useState<string>(description);
  const [checked, setChecked] = useState(status);
  const deleteTask = async (id: string) => {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
  };

  const editTaskFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "todos", id);
    const updatedTask = {
      Name: editTaskName,
      Description: editTaskDescription,
      timestamp: serverTimestamp(),
    };
    updateDoc(docRef, updatedTask);
    setEditTaskName("");
    setEditTaskDescription("");
    setShowModal(false);
  };

  const changeTaskStatus = (e: any) => {
    setChecked(e.target.checked);
    const docRef = doc(db, "todos", id);
    const updatedStatus = {
      taskCompleted: e.target.checked,
    };
    updateDoc(docRef, updatedStatus);
  };

  return (
    <tr>
      <td className="p-5 text-center">{name}</td>
      <td className="p-5 text-center">{description}</td>
      <td className="p-5 text-center">{timestamp}</td>
      <td className=" flex p-5 text-center gap-5">
        <button onClick={() => setShowModal(true)}>
          <FiEdit className="text-blue-500" size={20} />
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <form onSubmit={editTaskFormSubmit} className="text-center">
              <h3 className="font-bold text-lg">Edit Task</h3>
              <div>
                <input
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  type="text"
                  placeholder="Type here the Name of the Task"
                  className=" bg-gray-200 w-3/4 h-10 p-5 rounded-md my-5 "
                />
                <input
                  value={editTaskDescription}
                  onChange={(e) => setEditTaskDescription(e.target.value)}
                  type="text"
                  placeholder=" Add the Description"
                  className=" bg-gray-200 w-3/4 h-10 p-5 rounded-md my-5"
                />
              </div>
              <button
                type="submit"
                className="p-3 bg-green-500 rounded-md w-1/2 h-15 my-10 align-middle"
              >
                Save
              </button>
            </form>
          </Modal>
        )}
        <button onClick={(e) => deleteTask(id)}>
          <FiTrash2 className="text-red-500" size={20} />
        </button>
      </td>
      <td>
        <input
          type="checkbox"
          className="p-5 text-center w-20"
          checked={checked}
          onChange={(e) => changeTaskStatus(e)}
        />
      </td>
    </tr>
  );
};

export default Task;
