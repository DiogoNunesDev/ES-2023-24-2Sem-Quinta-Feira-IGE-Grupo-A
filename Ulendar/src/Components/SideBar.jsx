import React from "react";
import "../styles/SideBar.css";
import FileUploader from "./FileUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChalkboardUser,
  faGraduationCap,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { NavLink } from "react-router-dom";
function SideBar() {


  const btnStyle = {
    paddingLeft: 25,
    display: "flex",
    gap: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  };

  return (
    <div className="container">
      <div className="sidebarDiv">
        <div className="titleDiv">
          <h1 className="title">Ulendar</h1>
        </div>
        <div className="buttonsDiv">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "btnActive" : "btn"
            }
          >
            <Button
              text={
                <div style={btnStyle}>
                  <FontAwesomeIcon icon={faCalendarDays} />O meu horário
                </div>
              }
            />
          </NavLink>
          <NavLink
            to="/alterarAula"
            className={({ isActive }) =>
              isActive ? "btnActive" : "btn"
            }
          >
            <Button
              text={
                <div style={btnStyle}>
                  <FontAwesomeIcon icon={faChalkboardUser} />
                  Alterar aula
                </div>
              }
            />
          </NavLink>
          <NavLink
            to="/alterarUC"
            className={({ isActive }) =>
              isActive ? "btnActive" : "btn"
            }
          >
            <Button
              route="/"
              text={
                <div style={btnStyle}>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  Alterar UC
                </div>
              }
            />
          </NavLink>
          <NavLink
            to="/consultarSalas"
            className={({ isActive }) =>
              isActive ? "btnActive" : "btn"
            }
          >
            <Button
              route="/"
              text={
                <div style={btnStyle}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  Consultar salas
                </div>
              }
            />
          </NavLink>
        </div>
        <div className="sidebarUploadDiv" />
        <FileUploader />
      </div>
    </div>
  );
}

export default SideBar;
