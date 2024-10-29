import { TreeNodeComponentProps } from "@/interfaces/treeNode";
import { Input } from "../Input";

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  onAdd,
  onUpdateText,
}: TreeNodeComponentProps) => {
  return (
    <div className="ml-4 border-l-2 pl-4 my-2">
      {node.id !== "root" && (
        <Input
          label="Texto"
          value={node.text}
          change={(value) => onUpdateText(node.id, value)}
          placeholder="Digite um texto"
        />
      )}
      <button
        onClick={() => onAdd(node.id)}
        className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
      >
        +
      </button>
      <div className="ml-4">
        {node.children.map((child) => (
          <TreeNodeComponent
            key={child.id}
            node={child}
            onAdd={onAdd}
            onUpdateText={onUpdateText}
          />
        ))}
      </div>
    </div>
  );
};

export { TreeNodeComponent };
