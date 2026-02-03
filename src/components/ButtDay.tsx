import { Dropdown, DropdownButton } from "react-bootstrap";
import type { DayOption, ButtDayProps } from "../types/weather";

function ButtDay({ selected, onSelect }: ButtDayProps) {
  const labelMap: Record<DayOption, string> = {
    today: "today",
    tomorrow: "tomorrow",
    after: "day after tomorrow",
  };

  return (
    <DropdownButton
      id="button-day"
      title={selected ? labelMap[selected] : "Date"}
    >
      <Dropdown.Item onClick={() => onSelect("today")}>
        today
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect("tomorrow")}>
        tomorrow
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect("after")}>
        day after tomorrow
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default ButtDay;
