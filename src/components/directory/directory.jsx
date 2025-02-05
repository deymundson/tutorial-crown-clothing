import { Category } from "../category";

import "./directory.scss";

export const Directory = ({ categories }) => {
  return (
    <div className="directory">
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};
