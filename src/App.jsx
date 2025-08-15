import "./App.css";
import ToDo from "./components/ToDo.jsx";
import GoogleCalendarEmbedded from "./components/GoogleCalendarEmbedded.jsx";
import SoundcloudEmbedded from "./components/SoundcloudEmbedded.jsx";
import Title from "./components/Title.jsx";
import FilterTasks from "./components/FilterTasks.jsx";

function App() {

    return (
        <div>
            <Title/>
            <div className="body-replacement">
                <FilterTasks/>
                <ToDo/>
                <SoundcloudEmbedded/>
                <GoogleCalendarEmbedded/>
            </div>

        </div>
    );
}

export default App;
