import "cally";
import './styles_calendar/calendar_info_style.css';

export default function Calendar_info() {
    return (
        <>
            <calendar-multi  
            months="2" 
            id="container" 
            value="2025-01-10 2025-02-10 2025-06-10"
            min="2025-01-01"
            max="2025-12-31">
                <p slot="heading">2025</p>
                <div class="calendars" >
                    <calendar-month id="first-calendar"></calendar-month>
                    <calendar-month offset="1" id="second-calendar"></calendar-month>
                </div>
            </calendar-multi>
        </>
    )
}