
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
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

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
  handleTagFilterChange
}: PresentationFiltersProps) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2.5, 
        mb: 4, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.06)',
        background: '#FFFFFF'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
          Filter Presentations
        </Typography>
      </Box>
      
      <Grid container spacing={2}>
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
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="tag-filter-label">Filter by Tag</InputLabel>
            <Select
              labelId="tag-filter-label"
              id="tag-filter"
              value={tagFilter}
              label="Filter by Tag"
              onChange={handleTagFilterChange}
              sx={{ borderRadius: 1.5 }}
            >
              <MenuItem value="all">All Tags</MenuItem>
              {allTags.map(tag => (
                <MenuItem key={tag} value={tag}>{tag}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
              sx={{ borderRadius: 1.5 }}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="highest">Highest Score</MenuItem>
              <MenuItem value="lowest">Lowest Score</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PresentationFilters;
