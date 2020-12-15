import Heading from "../components/Heading";
import Link from "next/link";
import Box from "../components/Box";

export default function About() {
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Box>
        <Heading title="About" />
      </Box>
    </>
  );
}
