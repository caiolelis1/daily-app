import DailyTaskItem from "./DailyTaskItem";

interface Task {
  nome: string;
  initialChecked: boolean;
}

const tasks: Task[] = [
  { nome: "Tomar remédio", initialChecked: false },
  { nome: "Escovar dentes", initialChecked: false },
];

const DailyTasksList = () => {
  return (
    <div>
      <h2 className="font-semibold text-4xl text-center">Tarefas diárias</h2>
      <ul>
        {tasks.map((task) => (
          <DailyTaskItem key={task.nome} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default DailyTasksList;
