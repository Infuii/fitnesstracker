import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Dot,
} from "recharts";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSession } from "next-auth/react";

interface WeightRecord {
  date: string;
  weight: number;
}

const initialWeightRecords: WeightRecord[] = [
  { date: "2022-01-01", weight: 150 },
  { date: "2022-01-02", weight: 149 },
  { date: "2022-01-03", weight: 148 },
];

const Weight: React.FC = () => {
  const [weightRecords, setWeightRecords] = useState(initialWeightRecords);
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState<number | null>(null);

  useEffect(() => {
    async function fetchWeights() {
      const response = await fetch("/api/weight");
      if (!response.ok) {
        console.error(`Server responded with status: ${response.status}`);
        return;
      }
      const data = await response.json();
      setWeightRecords(data);
    }
    fetchWeights();
  }, []);

  const saveWeight = async () => {
    const response = await fetch("/api/weight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        date: new Date().toISOString(),
        weight,
      }),
    });

    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      return;
    }

    const data = await response.json();
    setWeightRecords([...weightRecords, data]);
    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setWeight(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="mb-8 text-4xl font-bold text-white">Weight Page</h1>

      <LineChart
        width={500}
        height={300}
        data={weightRecords}
        className="items-center justify-center"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          dot={<Dot r={5} fill="#8884d8" />}
        />
      </LineChart>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpen}
      >
        Add Weight
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add your weight</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Weight"
            type="number"
            fullWidth
            onChange={(e) => setWeight(parseFloat(e.target.value))}
          />
          <Button color="primary" onClick={saveWeight}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Weight;
