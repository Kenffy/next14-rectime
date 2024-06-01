import CustomTable from "./CustomTable";

interface DayViewProps {
  date: Date;
}

const DayView = ({ date }: DayViewProps) => {
  return (
    <div>
      <CustomTable days={[date]} />
    </div>
  );
};

export default DayView;
