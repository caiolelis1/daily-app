import DailyTaskItem from "./DailyTaskItem";

interface Task {
  nome: string;
  initialChecked: boolean;
  count: number;
  initialCount: number;
}

const tasks: Task[] = [
  { nome: "Tomar remédio", initialChecked: false, count: 1, initialCount: 0 },
  { nome: "Escovar dentes", initialChecked: false, count: 3, initialCount: 0 },
];

const DailyTasksList = () => {
  return (
    <div className="p-8 flex flex-col gap-6">
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
