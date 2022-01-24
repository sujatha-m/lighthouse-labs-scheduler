import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
//import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import axios from "axios";
import { matchAppointments, getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const setDay = day => setState({...state, day});
 
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
}, [])

const appointmentObjects = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

const appointment = appointmentObjects.map((appointmentObject) => {
  const interview = getInterview(state, appointmentObject.interview)
  return (
    <Appointment {...appointmentObject} key={appointmentObject.id} interview={interview} interviewers={interviewers}/>
    )
});

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
