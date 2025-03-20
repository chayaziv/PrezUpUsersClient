import { TextField, Box, Typography, Chip } from "@mui/material";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  tags,
  setTags,
}: SearchBarProps) => {
  return (
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
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => console.log("Tag clicked:", tag)} // פונקציה להוסיף בהמשך
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchBar;
