import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import viLocale from 'date-fns/locale/vi'

const ShowTeacherAvailableTimeCalendar = ({ calendarEvents }) => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '2em' }}>
      <FullCalendar
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek timeGridDay',
        }}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          momentPlugin,
        ]}
        titleFormat="dddd, D MMMM, YYYY"
        events={calendarEvents}
        slotLabelInterval="00:30"
        allDaySlot={false}
        locale={viLocale}
      />
    </div>
  )
}

export default ShowTeacherAvailableTimeCalendar
