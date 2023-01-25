import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/notesActions";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import faker from "faker";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

function Profile(props, { history, search }, week) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { notes } = noteList;

  const labels = [];
  useEffect(() => {
    const fetchSamplings = async () => {
      if (notes) {
        setChartData({
          labels: [...notes.map((val) => val.name)],
          datasets: [
            {
              label: "Students Score",
              borderWidth: 1.5,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderColor: "rgba(255,255,255,0.7)",
              hoverBackgroundColor: "rgba(0,0,0,0.8)",
              barThickness: "15",
              data: [
                ...notes.map(
                  (val) =>
                  parseInt(val[`w${props.week}profile`])                  
                ),
              ],
            },
          ],
        });
      }
    };
    fetchSamplings();
  }, [notes]);

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  return (
    <>
      <Chart type={props.type} data={chartData} />
    </>
  );
}

export default Profile;