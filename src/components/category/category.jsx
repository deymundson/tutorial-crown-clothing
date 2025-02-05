import "./category.scss";

export const Category = ({ category }) => {
  const { title, imageUrl } = category;

  return (
    <div className="category">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};
