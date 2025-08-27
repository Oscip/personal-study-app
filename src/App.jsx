import ToDo from "./components/ToDo.jsx";
import GoogleCalendarEmbedded from "./components/GoogleCalendarEmbedded.jsx";
import SoundcloudEmbedded from "./components/SoundcloudEmbedded.jsx";
import Title from "./components/Title.jsx";
import FilterTasks from "./components/FilterTasks.jsx";
import React, {useState} from "react";


function App() {
    const [filter, setFilter] = useState({completed: null, category: "All"});

    const filterValue = ({completed, category}) => {
        setFilter({completed, category});
    }

    return (
        <div>
            <Title/>
            <div className="body-replacement">
                <FilterTasks filterValue={filterValue}/>
                <ToDo filterValue={filter}/>
                <SoundcloudEmbedded/>
                <GoogleCalendarEmbedded/>
            </div>
        </div>
    );
}

export default App;
