import React from "react";
import { useTreeNode } from "./useTreeNode";
import { TreeNodeComponent } from "./components/Tree";

const HierarchyEditor: React.FC = () => {
  const { tree, addNode, updateNodeText, handleSave, handleClear } =
    useTreeNode();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Editor de Hierarquia</h1>
      <TreeNodeComponent
        node={tree}
        onAdd={addNode}
        onUpdateText={updateNodeText}
      />
      <section className="flex gap-2">
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Salvar JSON
        </button>
        <button
          onClick={handleClear}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Limpar
        </button>
      </section>
    </div>
  );
};

export default HierarchyEditor;
