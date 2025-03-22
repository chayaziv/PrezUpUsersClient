import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store/store";
import { fetchPublicPresentations } from "../store/PublicPresentationsSlice";
import { PresentationType } from "../types/presentation";
import {
  CircularProgress,
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import PresentationCard from "./PresentationCard";
import { TagType } from "../types/tag";
import { fetchTags } from "../store/tagsSlice";

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
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  useEffect(() => {
    dispatch(fetchPublicPresentations());
    dispatch(fetchTags());
  }, [dispatch]);

  const tags=useSelector((state: { tags: { list: TagType[] } }) => state.tags.list);
  // פונקציה לשינוי מצב התגיות
  const handleTagClick = (tag: TagType) => {
    console.log("Is tag selected?", selectedTags.some((t) => t.id === tag.id));
  
    setSelectedTags((prev) => {
      // אם התגית כבר נבחרה (בהשוואת id), הסר אותה, אחרת הוסף אותה
      const newSelectedTags = prev.some((t) => t.id === tag.id)
        ? prev.filter((selectedTag) => selectedTag.id !== tag.id)
        : [...prev, tag];
      
      console.log("Updated selectedTags:", newSelectedTags);
      return newSelectedTags;
    });
  };
  // פילטרציה לפי שם ותגיות
  const filteredPresentations = presentations.filter((presentation) => {
    const matchesTitle = presentation.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
      const matchesTags =
      selectedTags.length === 0 ||
      presentation.tags.some((tag) => selectedTags.some((selectedTag) => selectedTag.id === tag.id));
     // אם אין חפיפות עם תגיות
    return matchesTitle && matchesTags;
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        Public Presentations
      </Typography>
      <Box sx={{ marginTop: 4 }}>
        {/* חיפוש ותגיות */}
        <Box sx={{ marginBottom: 4 }}>
          {/* שדה חיפוש */}
          <TextField
            label="Search by title"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: 3 }}
          />

          {/* רשימת תגיות */}

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                variant="outlined"
                
                sx={{
                  cursor: "pointer",
                  borderColor: selectedTags.some((selectedTag) => selectedTag.id === tag.id) ? "secondary.main" : "primary.main", // שינוי צבע הגבול
                }}
                onClick={() => handleTagClick(tag)} // פונקציה להוסיף בהמשך
              />
            ))}
          </Box>
        </Box>

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
