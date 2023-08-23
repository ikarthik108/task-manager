import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Task from "./Task";
import { useAuth } from "@/Auth";

const TaskList: React.FC<{}> = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const q = query(
      collectionRef,
      where("email", "==", currentUser?.email),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  return (
    <div>
      {tasks && tasks.length > 0 && (
        <table className=" my-10 mx-auto w-600 border-1 border-collapse border-black border-solid bg-slate-300">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                id={task.id}
                index={index + 1}
                name={task.Name}
                description={task.Description}
                timestamp={task.timestamp}
                status={task.taskCompleted}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
