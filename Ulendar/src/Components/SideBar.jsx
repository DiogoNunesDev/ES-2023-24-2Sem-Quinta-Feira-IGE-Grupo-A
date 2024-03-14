import React from 'react';
import "../styles/SideBar.css";
function SideBar() {
  
  // Handler function for button click
  const handleScheduleClick = () => {
    // Aqui você pode adicionar a lógica para abrir a nova janela com o horário
    console.log("O meu horário was clicked");
  };

  // Handler function for button click - "Alterar Aula"
  const handleClassChangeClick = () => {
    console.log("Alterar Aula was clicked");
    // Adicione a lógica aqui para o botão "Alterar Aula"
  };

  // Handler function for button click - "Alterar UC"
  const handleCourseChangeClick = () => {
    console.log("Alterar UC was clicked");
    // Adicione a lógica aqui para o botão "Alterar UC"
  };

  // Handler function for button click - "Consultar Salas"
  const handleRoomConsultClick = () => {
    console.log("Consultar Salas was clicked");
    // Adicione a lógica aqui para o botão "Consultar Salas"
  };


  return (
    <div  className="sidebar-container">
    <div className="sidebar-container-title">
      <h1 className="sidebar-title">ULendar</h1>
      <div style={{height:'1px', width:'100%', backgroundColor:'white'}}></div>
    </div>
    <div className="sidebar-container-buttons">
      {/* Botão "O meu horário" */}
      <button className="sidebar-button" onClick={handleScheduleClick}>O meu horário</button>
        {/* Botão "Alterar Aula" */}
        <button className="sidebar-button" onClick={handleClassChangeClick}>Alterar Aula</button>
        {/* Botão "Alterar UC" */}
        <button className="sidebar-button" onClick={handleCourseChangeClick}>Alterar UC</button>
        {/* Botão "Consultar Salas" */}
        <button className="sidebar-button" onClick={handleRoomConsultClick}>Consultar Salas</button>
    </div>
    <div className="sidebar-container-upload">
      <div style={{height:'1px', width:'100%', backgroundColor:'white', marginBottom:'20px'}}></div>
      <h1 className="sidebar-button">Upload horário</h1>
    </div>
    </div>
  )
}

export default SideBar
