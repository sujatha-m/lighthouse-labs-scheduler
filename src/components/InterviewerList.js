import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewerObj => {
    return (
      <InterviewerListItem 
        key={interviewerObj.id}
        name={interviewerObj.interviewer}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.value}
        setInterviewer={(event) => props.onChange(interviewerObj.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{interviewers}</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
