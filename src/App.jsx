import "./App.css";
import ToDo from "./components/ToDo.jsx";
import GoogleCalendarEmbedded from "./components/GoogleCalendarEmbedded.jsx";
import SoundcloudEmbedded from "./components/SoundcloudEmbedded.jsx";
import Title from "./components/Title.jsx";

function App() {

    return (
        <div>
            <Title/>
            <ToDo/>
            <SoundcloudEmbedded/>
            <GoogleCalendarEmbedded/>
        </div>
    );
}

export default App;
