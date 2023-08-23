import { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "@/Auth";

interface AddTaskProps {}

const AddTask: React.FC<AddTaskProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  const { currentUser } = useAuth();

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    const collectionRef = collection(db, "todos");
    await addDoc(collectionRef, {
      Name: newTaskName,
      Description: newTaskDescription,
      timestamp: serverTimestamp(),
      email: currentUser?.email,
      taskCompleted: false,
    });
    setNewTaskName("");
    setNewTaskDescription("");
    setShowModal(false);
  };
  return (
    <div className="flex justify-center">
      <button
        className="w-1/2 bg-blue-400 flex justify-center items-center rounded-md p-3 gap-1"
        onClick={() => setShowModal(true)}
      >
        Add Task
        <AiOutlinePlus size={20} />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Add new task</h3>
            <div>
              <input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                type="text"
                placeholder="Type here the Name of the Task"
                className=" bg-gray-200 w-3/4 h-10 p-5 rounded-md my-5"
              />
              <input
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                type="text"
                placeholder=" Add the Description"
                className=" bg-gray-200 w-3/4 h-10 p-5 rounded-md my-5"
              />
            </div>
            <button
              type="submit"
              className="p-3 bg-green-500 rounded-md w-1/2 h-15 my-10 align-middle"
            >
              Add
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddTask;
