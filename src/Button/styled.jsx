import styled,{css} from "styled-components";
import { darken, lighten } from "polished";

const ColorStyles = css`
    ${({theme,color}) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        /* background: #339af0; */
        background: ${lighten(0.1, "#228be6")};
      }
      &:active {
        /* background: #1c7ed6; */
        background: ${darken(0.1, "#228be6")};
      }
    `;
  }}
`;

export const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;

  /* 색상 */
  /* background: #228be6; */
  ${ColorStyles}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;
