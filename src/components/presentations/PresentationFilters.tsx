
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  wrapperStyles,
  titleBoxStyles,
  titleIconStyles,
  titleTextStyles,
  selectStyles,
  searchBarStyles,
} from "@/styles/filtersStyle";

const Title = () => (
  <Box sx={titleBoxStyles}>
    <FilterListIcon sx={titleIconStyles} />
    <Typography variant="h6" sx={titleTextStyles}>
      Filter Presentations
    </Typography>
  </Box>
);

const SortBy = ({ sortBy, handleSortChange }) => (
  <Grid item xs={12} sm={6} md={3}>
    <FormControl fullWidth>
      <InputLabel id="sort-by-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by"
        value={sortBy}
        label="Sort By"
        onChange={handleSortChange}
        sx={selectStyles}
      >
        <MenuItem value="recent">Most Recent</MenuItem>
        <MenuItem value="oldest">Oldest First</MenuItem>
        <MenuItem value="highest">Highest Score</MenuItem>
        <MenuItem value="lowest">Lowest Score</MenuItem>
      </Select>
    </FormControl>
  </Grid>
);

const TagFilter = ({ tagFilter, allTags, handleTagFilterChange }) => (
  <Grid item xs={12} sm={6} md={3}>
    <FormControl fullWidth>
      <InputLabel id="tag-filter-label">Filter by Tag</InputLabel>
      <Select
        labelId="tag-filter-label"
        id="tag-filter"
        value={tagFilter}
        label="Filter by Tag"
        onChange={handleTagFilterChange}
        sx={selectStyles}
      >
        <MenuItem value="all">All Tags</MenuItem>
        {allTags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

const SearchBar = ({ searchTerm, handleSearchChange }) => (
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      placeholder="Search presentations by title or tags"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={searchBarStyles}
    />
  </Grid>
);

const Wrapper = ({ children }) => (
  <Paper elevation={0} sx={wrapperStyles}>
    {children}
  </Paper>
);

interface PresentationFiltersProps {
  searchTerm: string;
  sortBy: string;
  tagFilter: string;
  allTags: string[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
  handleTagFilterChange: (event: SelectChangeEvent<string>) => void;
}

const PresentationFilters = ({
  searchTerm,
  sortBy,
  tagFilter,
  allTags,
  handleSearchChange,
  handleSortChange,
  handleTagFilterChange,
}: PresentationFiltersProps) => {
  return (
    <Wrapper>
      <Title />
      <Grid container spacing={2}>
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <TagFilter
          tagFilter={tagFilter}
          allTags={allTags}
          handleTagFilterChange={handleTagFilterChange}
        />
        <SortBy sortBy={sortBy} handleSortChange={handleSortChange} />
      </Grid>
    </Wrapper>
  );
};

export default PresentationFilters;