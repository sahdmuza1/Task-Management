import { useState } from "react";
import { 
  Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Grid, MenuItem, Box, Chip 
} from "@mui/material";
import Sidebarr from "../components/Sidebarr";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";

const Leads = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Websouq", client: "Nahas", budget: 10000, date: "2025-02-20", status: "Pending" },
    { id: 2, name: "Admin Panel", client: "Risham", budget: 20000, date: "2025-03-15", status: "On Progress" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", client: "", budget: "", date: "", status: "Pending" });
  const [isEditing, setIsEditing] = useState(false);

  // Open modal for new project
  const openModal = () => {
    setFormData({ id: null, name: "", client: "", budget: "", date: "", status: "Pending" });
    setIsEditing(false);
    setModalOpen(true);
  };

  // Open modal for editing project
  const handleEdit = (project) => {
    setFormData(project);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setFormData({ id: null, name: "", client: "", budget: "", date: "", status: "Pending" });
  };

  // Handle form submission for adding/updating project
  const handleSubmit = () => {
    if (isEditing) {
      // Update project
      setProjects((prevProjects) =>
        prevProjects.map((proj) => (proj.id === formData.id ? formData : proj))
      );
    } else {
      // Add new project
      setProjects([...projects, { id: Date.now(), ...formData }]);
    }
    closeModal();
  };

  // Handle project deletion
  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebarr />
      </div>

      <div className="flex-1 bg-white overflow-y-auto">
        <Navbar />

        <Box p={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            Project Monitoring
          </Typography>

          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Client: {project.client}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Budget: ₹{project.budget.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {project.date}
                    </Typography>
                    <Chip
                      label={project.status}
                      sx={{
                        mt: 1.5,
                        fontWeight: "bold",
                        backgroundColor:
                          project.status === "Finished" ? "#4CAF50" :
                          project.status === "On Progress" ? "#2196F3" : "#FF9800",
                        color: "white"
                      }}
                    />
                  </CardContent>
                  <Box display="flex" justifyContent="space-between" mt={2} px={2}>
                    <FaEdit 
                      fontSize={20} 
                      className="text-yellow-400 cursor-pointer" 
                      onClick={() => handleEdit(project)} 
                    />
                    <FaTrash 
                      fontSize={20} 
                      className="text-red-600 cursor-pointer" 
                      onClick={() => handleDelete(project.id)} 
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Add Project Button */}
          <Box mt={4}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={openModal}>
              + Add Project
            </button>
          </Box>

          {/* Add/Edit Project Modal */}
          <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
              {isEditing ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <TextField 
                  label="Project Name" 
                  fullWidth 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                />
                <TextField 
                  label="Client" 
                  fullWidth 
                  value={formData.client} 
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })} 
                />
                <TextField 
                  label="Budget" 
                  fullWidth 
                  type="number" 
                  value={formData.budget} 
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })} 
                />
                <TextField 
                  label="Date" 
                  fullWidth 
                  type="date" 
                  InputLabelProps={{ shrink: true }} 
                  value={formData.date} 
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                />
                <TextField 
                  select 
                  label="Status" 
                  fullWidth 
                  value={formData.status} 
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="On Progress">On Progress</MenuItem>
                  <MenuItem value="Finished">Finished</MenuItem>
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500" 
                onClick={handleSubmit}
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button 
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600" 
                onClick={closeModal}
              >
                Cancel
              </button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
};

export default Leads;
