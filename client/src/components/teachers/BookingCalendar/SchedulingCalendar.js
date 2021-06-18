import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import {
  setAvailableTime,
  getCurrentAvailableTime,
} from '../../../actions/teachingScheduleForTeacher'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Spinner from '../../ui/Spinner'
import SaveIcon from '@material-ui/icons/Save'
import { connect } from 'react-redux'

const SchedulingCalendar = ({
  setAvailableTime,
  getCurrentAvailableTime,
  teachingScheduleForTeacher: { loading, availableTime },
}) => {
  const [calendarEvents, setCalendarEvents] = useState([])

  const history = useHistory()

  const calendarComponentRef = React.createRef()

  const handleEventClick = (eventInfo) => {
    const foundEvent = calendarEvents.find((event) => {
      return event.id === eventInfo.event.id
    })

    setCalendarEvents((calendarEvents) => [
      ...calendarEvents.filter((event) => event.id !== foundEvent.id),
    ])
  }

  const handleEventMouseEnter = (mouseEnterInfo) => {
    const eventElement = mouseEnterInfo.el
    eventElement.style.cursor = 'pointer'
  }

  const handleDateClick = (arg) => {
    const endDate = moment(arg.date).add(30, 'minutes')

    const id = uuidv4()

    setCalendarEvents((prevState) => [
      ...prevState,
      {
        title: 'Available Time',
        start: arg.date,
        end: endDate.toDate(),
        id,
      },
    ])
  }

  const handleSubmit = () => {
    setAvailableTime(calendarEvents)
    history.push('/teachers/dashboard')
  }

  useEffect(() => {
    if (availableTime.length === 0) getCurrentAvailableTime()

    if (!loading && availableTime.length > 0) setCalendarEvents(availableTime)
  }, [getCurrentAvailableTime, availableTime, loading])

  if (loading) {
    return <Spinner />
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="container"
      spacing={2}
    >
      <Grid item>
        <Typography
          variant="h5"
          style={{ fontWeight: '600', textAlign: 'center' }}
        >
          SET AVAILABLE TIME FOR TEACHING
        </Typography>
      </Grid>

      <Grid item container justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <MyButton component={Link} to="/teachers/dashboard">
            <ArrowBackIcon />
            &nbsp;Back
          </MyButton>
        </Grid>
        <Grid item>
          <MyButton onClick={handleSubmit}>
            <SaveIcon />
            &nbsp;Save
          </MyButton>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant="body1">
          * Click the calendar to set available time for teaching.
        </Typography>
      </Grid>
      <Grid item style={{ backgroundColor: 'white', padding: '1em' }}>
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
          dateClick={handleDateClick}
          ref={calendarComponentRef}
          slotLabelInterval="00:30"
          allDaySlot={false}
          eventClick={handleEventClick}
          eventMouseEnter={handleEventMouseEnter}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  teachingScheduleForTeacher: state.teachingScheduleForTeacher,
})

export default connect(mapStateToProps, {
  setAvailableTime,
  getCurrentAvailableTime,
})(SchedulingCalendar)
