import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Workspace from "./components/workspace/workspace";

function App() {
  return (
    <div className="background">
      <div className="wrapper">
        <Header />
        <Workspace />
        <Footer />
      </div>
    </div>
  );
}

export default App;
