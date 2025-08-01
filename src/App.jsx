import "./App.css";
import ToDo from "./components/ToDo.jsx";
import SpotifyEmbedded from "./components/SpotifyEmbedded.jsx";
import GoogleCalendarEmbedded from "./components/GoogleCalendarEmbedded.jsx";

function App() {

  return (
    <div>
        <ToDo/>
        <SpotifyEmbedded/>
        <GoogleCalendarEmbedded/>
    </div>
  );
}

export default App;
