import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Pagination,
  CircularProgress,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchPublicPresentations } from "../../store/slices/PublicPresentationsSlice";
import PresentationCard from "../../components/presentations/PresentationCard";
import PresentationFilters from "../../components/presentations/PresentationFilters";
import { PresentationType } from "@/types/presentation";

const AllPresentations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: presentations, loading } = useSelector(
    (state: RootState) => state.publicPresentations
  );
  const [filteredPresentations, setFilteredPresentations] = useState<
    PresentationType[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [tagFilter, setTagFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchPublicPresentations());
  }, [dispatch]);

  const allTags = Array.from(
    new Set(presentations.flatMap((p) => p.tags.map((t) => t.name)))
  );

  useEffect(() => {
    let result = [...presentations];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply tag filter
    if (tagFilter !== "all") {
      result = result.filter((p) =>
        p.tags.some((tag) => tag.name === tagFilter)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "highest":
        result.sort((a, b) => b.score - a.score);
        break;
      case "lowest":
        result.sort((a, b) => a.score - b.score);
        break;
      default:
        break;
    }

    setFilteredPresentations(result);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, sortBy, tagFilter, presentations]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleTagFilterChange = (event: SelectChangeEvent<string>) => {
    setTagFilter(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Get current page items
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPresentations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading presentations...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Header />

      <Box sx={{ mb: 4 }}>
        <PresentationFilters
          searchTerm={searchTerm}
          sortBy={sortBy}
          tagFilter={tagFilter}
          allTags={allTags}
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          handleTagFilterChange={handleTagFilterChange}
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <CountFound count={filteredPresentations.length} />

        {filteredPresentations.length === 0 ? (
          <NotFoundMessage />
        ) : (
          <Presentations currentItems={currentItems} formatDate={formatDate} />
        )}
      </Box>

      {filteredPresentations.length > itemsPerPage && (
        <PaginationControl
          count={filteredPresentations.length}
          page={page}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
      )}
    </Container>
  );
};

export default AllPresentations;

const Header = () => (
  <Typography
    variant="h3"
    component="h1"
    color="primary"
    gutterBottom
    sx={{ fontWeight: "bold", mb: 4 }}
  >
    All Presentations
  </Typography>
);

const CountFound = ({ count }) => (
  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
    {count} presentations found
  </Typography>
);

const NotFoundMessage = () => (
  <Typography
    variant="h6"
    align="center"
    sx={{ my: 8, color: "text.secondary" }}
  >
    No presentations found with the current filters.
  </Typography>
);

const Presentations = ({ currentItems, formatDate }) => (
  <Grid container spacing={3}>
    {currentItems.map((presentation) => (
      <Grid item key={presentation.id} xs={12} sm={6} md={4}>
        <PresentationCard presentation={presentation} formatDate={formatDate} />
      </Grid>
    ))}
  </Grid>
);

const PaginationControl = ({ count, page, onPageChange, itemsPerPage }) => (
  <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
    <Pagination
      count={Math.ceil(count / itemsPerPage)}
      page={page}
      onChange={onPageChange}
      color="primary"
      size="large"
    />
  </Box>
);
