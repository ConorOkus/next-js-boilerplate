interface Props {
  title: string;
}

function Heading(props: Props) {
  return <h1>{props.title}</h1>;
}

export default Heading;
