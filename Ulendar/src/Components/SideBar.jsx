import "../styles/SideBar.css";
function SideBar() {

  return (
    <div  className="sidebar-container">
    <div className="sidebar-container-title">
      <h1 className="sidebar-title">ULendar</h1>
      <div style={{height:'1px', width:'100%', backgroundColor:'white'}}></div>
    </div>
    <div className="sidebar-container-buttons">
      <h1 className="sidebar-button">O meu horário</h1>
      <h1 className="sidebar-button"> Alterar aula</h1>
      <h1 className="sidebar-button">Alterar UC</h1>
      <h1 className="sidebar-button">Consultar salas</h1>
    </div>
    <div className="sidebar-container-upload">
      <div style={{height:'1px', width:'100%', backgroundColor:'white', marginBottom:'20px'}}></div>
      <h1 className="sidebar-button">Upload horário</h1>
    </div>
    </div>
  )
}

export default SideBar
