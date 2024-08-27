import type { Metadata } from "next";
import { Header } from "./components/userComponents/Header";
import { Form } from "./components/userComponents/Form";
import Image from "next/image";

export default function IndexPage() {
  return (<>
    <Header />
    <Form />
    </>
  );
}

export const metadata: Metadata = {
  title: "Get an Alma Assessment",
};
