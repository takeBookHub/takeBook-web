import Navigation from "../components/Navigation";
import Content from "../components/Content";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row-reverse">
      <Content />
      <Navigation />
    </div>
  );
}
