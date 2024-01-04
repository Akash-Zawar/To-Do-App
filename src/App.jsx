import Header from "./Components/Header/Header";
import InputForm from "./Components/Input Component/Input";

function App() {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <Header />
      </div>

      <div className="flex flex-row justify-center py-4">
        <InputForm />
      </div>
    </div>
  );
}

export default App;
