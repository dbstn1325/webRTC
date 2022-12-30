import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  console.log(location.pathname);
  return <div>Not Found</div>;
};

export default NotFound;
