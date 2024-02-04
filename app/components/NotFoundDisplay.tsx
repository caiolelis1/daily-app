interface NotFoundDisplayProps {}

const NotFoundDisplay = ({}: NotFoundDisplayProps) => {
  return (
    <div className="flex items-center justify-center w-full ">
      <span>Nenhuma transação encontrada.</span>
    </div>
  );
};

export default NotFoundDisplay;
