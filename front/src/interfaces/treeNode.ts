export interface TreeNodeComponentProps {
  node: TreeNode;
  onAdd: (parentId: string) => void;
  onUpdateText: (nodeId: string, text: string) => void;
  //TODO: adicionar onRemove
}
export interface DictionaryItem {
  [key: string]: DictionaryItem;
}

export interface TreeNode {
  id: string;
  text: string;
  children: TreeNode[];
}
