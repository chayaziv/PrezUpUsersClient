import { useSelector } from "react-redux";
import { UserType } from "../types/user";

// import { AppDispatch } from "../store/store";

const Home = () => {
  
  // const dispatch = useDispatch<AppDispatch>(); // יצירת dispatch
  const user = useSelector(
    (state: { currentUser: { user: UserType } }) => state.currentUser.user
  ); // גישה לנתוני המשתמש

// useEffect(() => {
//     dispatch( );
//   }, [dispatch]); // רק פעם אחת על טעינת הקומפוננטה


  return (
    <>
      <h1>Home</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Job Title: {user.jobTitle}</p>
          <p>Company: {user.company}</p>
          <p>Experience: {user.yearsOfExperience} years</p>
          {/* תוכל להוסיף עוד פרטים פה */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </>
  );
};

export default Home;

