
import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Pagination,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';
import { PresentationSummary } from '../../types/presentation';
import UserPresentationCard from './UserPresentationCard';
import PresentationFilters from '../presentations/PresentationFilters';

// Mock data for user presentations
const mockUserPresentations: PresentationSummary[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `My Presentation ${i + 1}: ${['Project Proposal', 'Team Update', 'Quarterly Review', 'Market Analysis', 'Product Demo'][i % 5]}`,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  thumbnailUrl: '/placeholder.svg',
  score: Math.floor(Math.random() * 50) + 50, // Score between 50-100
  isPublic: Math.random() > 0.5,
  tags: [
    { id: 1, name: 'Business' },
    { id: 2, name: 'Personal' },
    { id: 3, name: 'Interview' },
    { id: 4, name: 'Technical' },
    { id: 5, name: 'Sales' }
  ].slice(0, Math.floor(Math.random() * 3) + 1)
}));

const UserPresentations = () => {
  const [presentations, setPresentations] = useState<PresentationSummary[]>([]);
  const [filteredPresentations, setFilteredPresentations] = useState<PresentationSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [tagFilter, setTagFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [presentationToDelete, setPresentationToDelete] = useState<number | null>(null);
  const itemsPerPage = 6;

  const allTags = Array.from(
    new Set(
      mockUserPresentations.flatMap(p => p.tags.map(t => t.name))
    )
  );

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      setPresentations(mockUserPresentations);
      setFilteredPresentations(mockUserPresentations);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...presentations];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply tag filter
    if (tagFilter !== 'all') {
      result = result.filter(p => 
        p.tags.some(tag => tag.name === tagFilter)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'highest':
        result.sort((a, b) => b.score - a.score);
        break;
      case 'lowest':
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDeleteClick = (id: number) => {
    setPresentationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (presentationToDelete !== null) {
      // Filter out the deleted presentation
      const updatedPresentations = presentations.filter(
        p => p.id !== presentationToDelete
      );
      setPresentations(updatedPresentations);
    }
    setDeleteDialogOpen(false);
    setPresentationToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPresentationToDelete(null);
  };

  const handleTogglePublic = (id: number) => {
    // Update the isPublic status of the presentation
    const updatedPresentations = presentations.map(p => {
      if (p.id === id) {
        return { ...p, isPublic: !p.isPublic };
      }
      return p;
    });
    setPresentations(updatedPresentations);
  };

  // Get current page items
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPresentations.slice(indexOfFirstItem, indexOfLastItem);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your presentations...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        My Presentations
      </Typography>

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
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {filteredPresentations.length} presentations found
        </Typography>
        
        {filteredPresentations.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ my: 8, color: 'text.secondary' }}>
            No presentations found with the current filters.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {currentItems.map((presentation) => (
              <Grid item key={presentation.id} xs={12} sm={6}>
                <UserPresentationCard 
                  presentation={presentation}
                  formatDate={formatDate}
                  onDeleteClick={handleDeleteClick}
                  onTogglePublic={handleTogglePublic}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {filteredPresentations.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Pagination
            count={Math.ceil(filteredPresentations.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Delete Presentation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this presentation? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserPresentations;
