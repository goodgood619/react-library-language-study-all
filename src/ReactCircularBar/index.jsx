import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RCBarContainer } from "./styled";

const CircularProgressbarExample = () => {
  return (
    <RCBarContainer>
      <CircularProgressbar value={66} text={`${66}%`} />
      <CircularProgressbar value={88} text={`${88}%`} />
    </RCBarContainer>
  );
};

export default CircularProgressbarExample;
