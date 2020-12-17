import styled from "styled-components";

const StyledPostBody = styled.div`
  p {
    color: ${(props) => props.theme.colors.main};
  }
`;

export function PostBody({ content }) {
  return (
    <div>
      <StyledPostBody dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
