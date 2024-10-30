const HeadLine = ({ title, slogan }) => {
  return (
    <div className="d-flex flex-column mt-5">
      <h1 className="text-center w-100 display-1">{title}</h1>
      <p className="text-center fs-5 text-white mt-3">{slogan}</p>
    </div>
  );
};

export default HeadLine;
