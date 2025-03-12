import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { PresentationType } from "../types/presentation";
import { FaChartBar, FaChartLine } from "react-icons/fa";

const PresentationComparison: React.FC = () => {
  const myPresentations = useSelector((state: any) => state.myPresentations.list);
  const publicPresentations = useSelector((state: any) => state.publicPresentations.list);

  const metrics = ["clarity", "fluency", "confidence", "engagement", "speechStyle"];

  const calculateAverage = (presentations: PresentationType[], key: keyof PresentationType) => {
    if (presentations.length === 0) return 0;
    return (
      presentations.reduce((sum, p) => sum + (p[key] as number), 0) / presentations.length
    );
  };

  const chartData = metrics.map((metric) => ({
    name: metric,
    MyPresentations: calculateAverage(myPresentations, metric as keyof PresentationType),
    PublicPresentations: calculateAverage(publicPresentations, metric as keyof PresentationType),
  }));

  return (
    <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3, background: "#f5f5f5" }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          <FaChartLine style={{ marginRight: 8, color: "#3f51b5" }} /> Comparison of Presentation Metrics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#555" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="MyPresentations" fill="#3f51b5" name="My Presentations" />
                <Bar dataKey="PublicPresentations" fill="#f50057" name="Public Presentations" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#555" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="MyPresentations" stroke="#3f51b5" strokeWidth={3} name="My Presentations" />
                <Line type="monotone" dataKey="PublicPresentations" stroke="#f50057" strokeWidth={3} name="Public Presentations" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12}>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart outerRadius={150} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis domain={[0, 10]} />
                <Radar name="My Presentations" dataKey="MyPresentations" stroke="#3f51b5" fill="#3f51b5" fillOpacity={0.6} />
                <Radar name="Public Presentations" dataKey="PublicPresentations" stroke="#f50057" fill="#f50057" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PresentationComparison;
