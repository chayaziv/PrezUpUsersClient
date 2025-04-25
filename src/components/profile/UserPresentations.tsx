import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "@/store/store";
import {
  fetchMyPresentations,
  deletePresentation,
  clearError,
  
} from "@/store/slices/myPresentations";
import {
  Typography,
  Box,
  Grid,
  Pagination,
 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
 
} from "@mui/material";

import UserPresentationCard from "./UserPresentationCard";
import { PresentationType } from "@/types/presentation";
import { useSnackbar } from "@/hooks/useSnackbar";
import { clear } from "console";

const Title = () => (
  <Typography
    variant="h4"
    component="h2"
    color="primary"
    gutterBottom
    sx={{ fontWeight: "bold", mb: 4 }}
  >
    My Presentations
  </Typography>
);

const Presentations = ({
  currentItems,
  formatDate,
  length,
  handleDeleteClick,
  handleTogglePublic,
}) => (
  <Box sx={{ mb: 4 }}>
    {length === 0 ? (
      <Typography
        variant="h6"
        align="center"
        sx={{ my: 8, color: "text.secondary" }}
      >
        No presentations found.
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
);

const ConfirmDialog = ({
  deleteDialogOpen,
  handleCancelDelete,
  handleConfirmDelete,
}) => (
  <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
    <DialogTitle>Delete Presentation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this presentation? This action cannot be
        undone.
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
);

const PagingationControl = ({ length, page, handlePageChange, itemsPerPage }) =>
  length > itemsPerPage && (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <Pagination
        count={Math.ceil(length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="large"
      />
    </Box>
  );

const UserPresentations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: presentations = [],
    loading = false,
    error = null,
  } = useSelector((state: StoreType) => state.myPresentations);
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [presentationToDelete, setPresentationToDelete] = useState<
    number | null
  >(null);

  const { showSnackbar } = useSnackbar();

  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchMyPresentations());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch, showSnackbar]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDeleteClick = (id: number) => {
    setPresentationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (presentationToDelete !== null) {
      await dispatch(deletePresentation(presentationToDelete));
      if (deletePresentation.fulfilled.match(presentationToDelete)) {
        showSnackbar("המצגת נמחקה בהצלחה", "success");
      } else {
        showSnackbar("אירעה שגיאה בעת ניסיון המחיקה", "error");
      }
    }
    setDeleteDialogOpen(false);
    setPresentationToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPresentationToDelete(null);
  };

  const handleTogglePublic = (id: number) => {
    // TODO: Implement toggle public functionality with API
    console.log("Toggle public for presentation:", id);
  };

  // Get current page items
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = presentations.slice(indexOfFirstItem, indexOfLastItem);

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
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your presentations...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Title />

      <Presentations
        currentItems={currentItems}
        formatDate={formatDate}
        length={presentations.length}
        handleDeleteClick={handleDeleteClick}
        handleTogglePublic={handleTogglePublic}
      />

      <PagingationControl
        length={presentations.length}
        page={page}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />

      <ConfirmDialog
        deleteDialogOpen={deleteDialogOpen}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Box>
  );
};

export default UserPresentations;
