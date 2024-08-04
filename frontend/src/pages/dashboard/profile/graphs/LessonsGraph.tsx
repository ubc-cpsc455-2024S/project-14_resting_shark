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
  const [selection, setSelection] = useState("This week");
  const [lessonData, setLessonData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [interval, setInterval] = useState("");
  const [statData, setStatData] = useState([
    { num: 0, label: "Min. Complete", change: -1 },
    { num: 0, label: "Avg. Complete", change: 0 },
    { num: 0, label: "Max. Complete", change: 1 },
  ]);
  const defaultWeekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [weekData, setWeekData] = useState(defaultWeekDays);

  // get lesson activity (lesson Data) and set states
  useEffect(() => {
    async function fetchData() {
      try {
        const dateRange = getDateRange(selection);
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

        const today = new Date().getDay();
        let shiftedWeekdays = defaultWeekDays.slice(today).concat(defaultWeekDays.slice(0, today + 1));
        shiftedWeekdays = shiftedWeekdays.slice(defaultWeekDays.slice(0, today + 1).length);
        setWeekData(shiftedWeekdays);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    fetchData();
  }, [token, selection]);

  function getDateRange(period: string) {
    let currentDate = new Date();
    let startDate = new Date();
    let endDate = new Date();
  
    switch (period) {
      case 'This week':
        startDate.setDate(currentDate.getDate() - 6);
        break;
      case 'Last week':
        startDate.setDate(currentDate.getDate() - 13);
        endDate.setDate(currentDate.getDate() - 7);
        break;
      case 'Last last week':
          startDate.setDate(currentDate.getDate() - 19);
          endDate.setDate(currentDate.getDate() - 13);
        break;
      default:
        throw new Error("Invalid period specified. Use 'This week' or 'Last week' or 'Last last week'");
    }
  
    return {
      startDate: startDate,
      endDate: endDate,
    };
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Lessons Completed</h1>
        <DateSelect interval={interval} setInterval={setInterval} selection={selection} setSelection={setSelection} />
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
