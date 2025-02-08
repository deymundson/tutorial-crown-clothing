import { DirectoryItem } from "../directory-item";

import "./directory.scss";

export const Directory = ({ categories }) => {
  return (
    <div className="directory">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
