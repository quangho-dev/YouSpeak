import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAvailableTime,
  getCurrentAvailableTime,
} from '../../../actions/teachingScheduleForTeacher'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Spinner from '../../ui/Spinner'
import SaveIcon from '@material-ui/icons/Save'

const SchedulingCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([])

  const dispatch = useDispatch()

  const teachingScheduleForTeacher = useSelector(
    (state) => state.teachingScheduleForTeacher
  )
  const { loading, availableTime } = teachingScheduleForTeacher

  const id = uuidv4()

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

  const handleSubmit = async () => {
    dispatch(setAvailableTime(calendarEvents))
  }

  useEffect(() => {
    if (!availableTime[0]) {
      dispatch(getCurrentAvailableTime())
    } else {
      setCalendarEvents(availableTime)
    }
  }, [dispatch, availableTime, loading])

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

export default SchedulingCalendar
