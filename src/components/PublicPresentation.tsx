import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store/store";
import { fetchPublicPresentations } from "../store/PublicPresentationsSlice";
import { PresentationType } from "../types/presentation";
import { CircularProgress, Box, Container, Grid, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import PresentationCard from "./PresentationCard";

const PublicPresentations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const presentations = useSelector(
    (state: { publicPresentations: { list: PresentationType[] } }) =>
      state.publicPresentations.list
  );
  const loading = useSelector(
    (state: { publicPresentations: { loading: boolean } }) =>
      state.publicPresentations.loading
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState<string[]>([
    "speech",
    "music",
    "comedy",
    "education",
    "technology",
  ]);

  useEffect(() => {
    dispatch(fetchPublicPresentations());
  }, [dispatch]);

  // פילטרציה לפי שם ותגיות
  const filteredPresentations = presentations.filter((presentation) => {
    const matchesTitle = presentation.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // const matchesTags = tags.every(tag => presentation.tags.includes(tag)); // אם יש חפיפות עם תגיות
    const matchesTags = true; // אם אין חפיפות עם תגיות
    return matchesTitle && matchesTags;
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        Public Presentations
      </Typography>
      <Box sx={{ marginTop: 4 }}>
        {/* חיפוש ותגיות */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tags={tags}
          setTags={setTags}
        />

        {/* הצגת פרזנטציות */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredPresentations.map((presentation) => (
              <Grid item xs={12} sm={6} md={4} key={presentation.id}>
                <PresentationCard presentation={presentation} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default PublicPresentations;
