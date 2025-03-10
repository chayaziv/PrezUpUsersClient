import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to="/record">Record</Link>
      <Link to="/signIn">Sign In</Link>
      <Link to="/signUp">Sign Up</Link>
    </>
  );
};

export default Home;
