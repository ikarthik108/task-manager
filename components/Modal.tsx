interface ModelProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModelProps> = ({ onClose, children }) => {
  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className=" flex absolute top-0 left-0 w-full h-full justify-center items-center bg-slate-300 rounded-md p-14">
      <div className=" w-500 h-600 ">
        <div className="bg-white h-full w-full rounded-md p-15">
          <div className="flex justify-end text-2xl p-5">
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          <div className=" pt-10 ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
