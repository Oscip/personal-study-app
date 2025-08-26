export default function GoogleCalendarEmbedded() {
    const calendarUrl = import.meta.env.VITE_GOOGLE_CALENDAR_URL;

    return (
        <div className="calendar-container">
            <iframe
                src={calendarUrl}
                width="95%"
                height="600"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
}
