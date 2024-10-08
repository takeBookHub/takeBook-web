import Navigation from "../components/Navigation";
import Content from "../components/Content";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col lg:flex-row-reverse">
      <Content />
      <Navigation />
    </div>
  );
}
