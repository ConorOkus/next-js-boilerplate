import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const StyledBox = styled.div`
  background: ${(props) => props.theme.colors.main};
`;

export default function Box(props: Props) {
  return <StyledBox>{props.children}</StyledBox>;
}
