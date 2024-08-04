import { areaElementClasses, LineChart } from "@mui/x-charts";
import s from "./LessonsGraph.module.css";
import DateSelect from "./dropdown/DateSelect";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { userApi } from "../../../../api/userApi";
import StatDisplay from "./stat/StatDisplay";
import * as React from "react";

export default function LessonsGraph() {
  const token = useAppSelector((state) => state.auth.jwtToken);
  const otherSetting = {
    height: 300,
    grid: { horizontal: true },
  };
  const [lessonData, setLessonData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [statData, setStatData] = useState([
    { num: 0, label: "Min. Complete", change: -1 },
    { num: 0, label: "Avg. Complete", change: 0 },
    { num: 0, label: "Max. Complete", change: 1 },
  ]);
  const weekData = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const [interval, setInterval] = useState("");

  // get lesson activity (lesson Data) and set states
  useEffect(() => {
    async function fetchData() {
      try {
        // TODOL "This week" is hardcoded
        const dateRange = getDateRange("This week");
        const profileData = await userApi.getProfileData(token, dateRange.startDate.toISOString(), dateRange.endDate.toISOString());
        const activityArray = profileData.completedLessonsByDay.map((item: any) => item.count);
        setLessonData(activityArray);
        
        setStatData([
          { num: Math.min(...activityArray), label: "Min. Complete", change: -1 },
          { num: Math.round(activityArray.reduce((acc: number, val: number) => acc + val, 0) / activityArray.length), label: "Avg. Complete", change: 0 },
          { num: Math.max(...activityArray), label: "Max. Complete", change: 1 },
        ]);

        const startDateDisplayString = Intl.DateTimeFormat('en-US', {month: "long", day: "numeric"}).format(dateRange.startDate);
        const endDateDisplayString = Intl.DateTimeFormat('en-US', {month: "long", day: "numeric"}).format(dateRange.endDate);
        setInterval(startDateDisplayString + " - " + endDateDisplayString);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchData();
  }, [token]);

  function getDateRange(period: string) {
    const currentDate = new Date();
    let startDate = new Date();
  
    switch (period) {
      case 'This week':
        startDate.setDate(currentDate.getDate() - 6);
        break;
      case 'Last week':
        currentDate.setDate(currentDate.getDate() - 7);
        startDate.setDate(currentDate.getDate() - 13);
        break;
      default:
        throw new Error("Invalid period specified. Use 'This week' or 'Last week'");
    }
  
    return {
      startDate: startDate,
      endDate: currentDate,
    };
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Lessons Completed</h1>
        <DateSelect interval={interval} setInterval={setInterval} />
      </div>
      <div className={s.statDisplayContainer}>
        {statData.map((item) => (
          <StatDisplay num={item.num} label={item.label} change={item.change} />
        ))}
      </div>
      <LineChart
        xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6] }]}
        series={[{ data: lessonData, area: true, color: "#4369EE" }]}
        {...otherSetting}
        bottomAxis={null}
        sx={{
          [`& .${areaElementClasses.root}`]: {
            fill: "rgba(67, 105, 238, 0.2)",
          },
        }}
      />
      <div className={s.weekContainer}>
        {weekData.map((item) => (
          <span className={s.weekLabel}>{item}</span>
        ))}
      </div>
    </div>
  );
}
