import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { useTheme } from "@mui/material/styles";

// Mock data for user metrics
const userMetrics = [
  { name: "Clarity", value: 78, average: 62 },
  { name: "Fluency", value: 85, average: 68 },
  { name: "Confidence", value: 72, average: 59 },
  { name: "Engagement", value: 68, average: 64 },
  { name: "Speech Style", value: 81, average: 67 },
];

// Mock data for time series metrics
const timeSeriesData = [
  {
    name: "Jan",
    clarity: 65,
    fluency: 70,
    confidence: 62,
    engagement: 58,
    speechStyle: 60,
  },
  {
    name: "Feb",
    clarity: 68,
    fluency: 72,
    confidence: 65,
    engagement: 60,
    speechStyle: 65,
  },
  {
    name: "Mar",
    clarity: 70,
    fluency: 75,
    confidence: 68,
    engagement: 63,
    speechStyle: 68,
  },
  {
    name: "Apr",
    clarity: 72,
    fluency: 78,
    confidence: 70,
    engagement: 65,
    speechStyle: 70,
  },
  {
    name: "May",
    clarity: 75,
    fluency: 82,
    confidence: 71,
    engagement: 67,
    speechStyle: 73,
  },
  {
    name: "Jun",
    clarity: 78,
    fluency: 85,
    confidence: 72,
    engagement: 68,
    speechStyle: 81,
  },
];

// Mock data for presentation comparison
const presentationsData = [
  { id: 1, name: "Project Proposal", score: 78 },
  { id: 2, name: "Sales Pitch", score: 85 },
  { id: 3, name: "Product Demo", score: 72 },
  { id: 4, name: "Team Update", score: 68 },
  { id: 5, name: "Conference Talk", score: 81 },
];

// Mock data for category distribution
const categoryDistribution = [
  { name: "Business", value: 35 },
  { name: "Technical", value: 25 },
  { name: "Sales", value: 15 },
  { name: "Education", value: 15 },
  { name: "Other", value: 10 },
];

const COLORS = ["#2E5077", "#4A6D8C", "#E63946", "#F48C99", "#C01E2E"];

const Comparisons = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("6months");
  const [metricType, setMetricType] = useState("all");

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value);
  };

  const handleMetricTypeChange = (event: SelectChangeEvent<string>) => {
    setMetricType(event.target.value);
  };

  const filterMetricsByType = (metrics: typeof userMetrics) => {
    if (metricType === "all") return metrics;
    return metrics.filter(
      (metric) => metric.name.toLowerCase() === metricType.toLowerCase()
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading comparison data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Performance Comparisons
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        sx={{ mb: 4 }}
      >
        Compare your presentation metrics against averages and track your
        improvement over time.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="time-range-label">Time Range</InputLabel>
              <Select
                labelId="time-range-label"
                id="time-range"
                value={timeRange}
                label="Time Range"
                onChange={handleTimeRangeChange}
              >
                <MenuItem value="1month">Last Month</MenuItem>
                <MenuItem value="3months">Last 3 Months</MenuItem>
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="1year">Last Year</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="metric-type-label">Metric Type</InputLabel>
              <Select
                labelId="metric-type-label"
                id="metric-type"
                value={metricType}
                label="Metric Type"
                onChange={handleMetricTypeChange}
              >
                <MenuItem value="all">All Metrics</MenuItem>
                <MenuItem value="clarity">Clarity</MenuItem>
                <MenuItem value="fluency">Fluency</MenuItem>
                <MenuItem value="confidence">Confidence</MenuItem>
                <MenuItem value="engagement">Engagement</MenuItem>
                <MenuItem value="speechStyle">Speech Style</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {/* Metric Comparison Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Metrics vs. Average
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filterMetricsByType(userMetrics)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, ""]}
                      labelStyle={{ color: "#2E5077" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Your Score"
                      fill="#2E5077"
                      barSize={35}
                    />
                    <Bar
                      dataKey="average"
                      name="Average Score"
                      fill="#E63946"
                      barSize={35}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Radar Chart for Skill Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills Distribution
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={filterMetricsByType(userMetrics)}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Your Score"
                      dataKey="value"
                      stroke="#2E5077"
                      fill="#2E5077"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Average Score"
                      dataKey="average"
                      stroke="#E63946"
                      fill="#E63946"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart for Progress Over Time */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress Over Time
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="clarity"
                      name="Clarity"
                      stroke={theme.palette.custom.chart.blue1}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="fluency"
                      name="Fluency"
                      stroke={theme.palette.custom.chart.blue2}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="confidence"
                      name="Confidence"
                      stroke={theme.palette.custom.chart.red1}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      name="Engagement"
                      stroke={theme.palette.custom.chart.pink}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="speechStyle"
                      name="Speech Style"
                      stroke="#C01E2E"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Presentation Scores Comparison */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Presentation Scores
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={presentationsData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Bar
                      dataKey="score"
                      name="Score"
                      fill="#4A6D8C"
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Presentation Categories
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              theme.palette.custom.chart.blue1,
                              theme.palette.custom.chart.blue2,
                              theme.palette.custom.chart.red1,
                              theme.palette.custom.chart.pink,
                              theme.palette.custom.chart.red2,
                            ][index % 5]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Comparisons;
