import "./App.css";
import ToDo from "./components/ToDo.jsx";
import GoogleCalendarEmbedded from "./components/GoogleCalendarEmbedded.jsx";
import SoundcloudEmbedded from "./components/SoundcloudEmbedded.jsx";

function App() {

  return (
    <div>
        <ToDo/>
        <SoundcloudEmbedded/>
        <GoogleCalendarEmbedded/>
    </div>
  );
}

export default App;
