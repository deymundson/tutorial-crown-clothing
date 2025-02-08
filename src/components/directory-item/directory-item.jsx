import "./directory-item.scss";

export const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;

  return (
    <div className="directory-item">
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
