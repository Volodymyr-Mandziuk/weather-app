import { Dropdown, DropdownButton } from "react-bootstrap";

interface ButtDegProps {
  unit: "C" | "F" | null;
  onChange: (unit: "C" | "F") => void;
}

function ButtDeg({unit, onChange }: ButtDegProps) {
const title = unit ? `º${unit}` : "ºC or ºF";
  return (
    <DropdownButton id="button-degree" title={title}>
      <Dropdown.Item onClick={() => onChange("C")}>
        ºC
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onChange("F")}>
        ºF
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default ButtDeg;
