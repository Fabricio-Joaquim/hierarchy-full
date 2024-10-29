import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DictionaryItem, TreeNode } from "./interfaces/treeNode";

export const useTreeNode = () => {
  const [tree, setTree] = useState<TreeNode>({
    id: "root",
    text: "Root",
    children: [],
  });

  const addNode = (parentId: string) => {
    const newNode: TreeNode = {
      id: uuidv4(),
      text: "",
      children: [],
    };

    setTree((prevTree) => {
      const updateNodes = (node: TreeNode): TreeNode => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...node.children, newNode],
          };
        }
        return {
          ...node,
          children: node.children.map(updateNodes),
        };
      };
      return updateNodes(prevTree);
    });
  };

  const removeNode = (nodeId: string): TreeNode | any => {
    //remover node e se ele tiver filhos, remover todos os filhos, se ele tiver pai, remover ele do pai realizando uma função recursiva
    const depth = 0;
    const verifyItem = (node: TreeNode, depth: number): any => {
      if (node.id === nodeId) {
        setTree((prevTree) => {
          const updateNodes = (node: TreeNode): TreeNode => {
            return { ...node, children: [] };
          };
          return updateNodes(prevTree);
        });
      }
      return node.children.map((child) => verifyItem(child, depth + 1));
    };
    setTree(verifyItem(tree, depth + 1));
  };

  const updateNodeText = (nodeId: string, text: string) => {
    setTree((prevTree) => {
      const updateNodes = (node: TreeNode): TreeNode => {
        if (node.id === nodeId) {
          return { ...node, text };
        }
        return {
          ...node,
          children: node.children.map(updateNodes),
        };
      };
      return updateNodes(prevTree);
    });
  };

  const convertToJSON = (node: TreeNode): DictionaryItem => {
    if (node.children.length === 0) {
      return {};
    }

    const result: DictionaryItem = {};
    node.children.forEach((child) => {
      result[child.text] = convertToJSON(child);
    });
    return result;
  };

  const handleSave = () => {
    const jsonData = convertToJSON(tree);
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hierarchy.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setTree({
      id: "root",
      text: "Root",
      children: [],
    });
  };

  return { tree, addNode, updateNodeText, handleSave, handleClear, removeNode };
};
