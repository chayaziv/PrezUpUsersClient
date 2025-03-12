import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { PresentationType } from "../types/presentation";

import PresentationCard from "./PresentationCard";
import { fetchMyPresentations } from "../store/myPresentations";
import { AppDispatch } from "../store/store";

const MyPresentations = () => {
  const dispatch = useDispatch<AppDispatch>(); // יצירת dispatch
  const presentations = useSelector(
    (state: { myPresentations: { list: PresentationType[] } }) =>
      state.myPresentations.list
  );
  const loading = useSelector(
    (state: { myPresentations: { loading: boolean } }) =>
      state.myPresentations.loading
  );

  // קריאה לפעולה אסינכרונית בעת טעינת הקומפוננטה
  useEffect(() => {
    dispatch(fetchMyPresentations());
  }, [dispatch]); // רק פעם אחת על טעינת הקומפוננטה

  return (
    <div>
      <h2>My Presentations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        presentations.map((presentation) => (
          <PresentationCard key={presentation.id} presentation={presentation} />
        ))
      )}
    </div>
  );
};

export default MyPresentations;
