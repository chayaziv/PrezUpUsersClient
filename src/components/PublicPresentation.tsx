import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { PresentationType } from "../types/presentation";

import PresentationCard from "./PresentationCard";

import { AppDispatch } from "../store/store";
import { fetchPublicPresentations } from "../store/PublicPresentationsSlice";

const PublicPresentations = () => {
  const dispatch = useDispatch<AppDispatch>(); // יצירת dispatch
  const presentations = useSelector(
    (state: { publicPresentations: { list: PresentationType[] } }) =>
      state.publicPresentations.list
  );
  const loading = useSelector(
    (state: { publicPresentations: { loading: boolean } }) =>
      state.publicPresentations.loading
  );

  // קריאה לפעולה אסינכרונית בעת טעינת הקומפוננטה
  useEffect(() => {
    dispatch(fetchPublicPresentations());
  }, [dispatch]); // רק פעם אחת על טעינת הקומפוננטה

  return (
    <div>
      <h2>Public Presentations</h2>
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

export default PublicPresentations;
