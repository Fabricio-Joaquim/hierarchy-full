import { useState } from "react";
import { Input } from "./components/Input";

const App = () => {
  const [valueInput, setValueInput] = useState("");

  return (
    <div className="text-center selection:bg-indigo-900 min-h-screen bg-indigo-100 gap-9 flex flex-col">
      <Input label="Name" value={valueInput} onChange={setValueInput} />
    </div>
  );
};

export default App;
