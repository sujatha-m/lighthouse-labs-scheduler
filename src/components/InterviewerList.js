import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

const classNames = require("classnames");

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{interviewers}</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
