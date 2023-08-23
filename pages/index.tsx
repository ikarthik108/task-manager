import { Inter } from "next/font/google";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import { auth } from "@/firebase";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const signOut = () => {
    auth.signOut();
  };
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">
          {`Personal Task Manager`}
        </h1>
      </div>
      <div className="text-center my-5 flex flex-col gap-4">
        <AddTask />
      </div>
      <TaskList />
      <div className="flex justify-center">
        <button
          onClick={() => signOut()}
          className="w-1/4 bg-lime-400 flex justify-center items-center rounded-md p-3"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
