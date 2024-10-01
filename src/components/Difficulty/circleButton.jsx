export default function CircleButton({themify_icon, onHandleClick, children}){
  return(
    <button className="circle-button" onClick={onHandleClick}>
      <i className={themify_icon}></i>
      {children}
    </button>
  )
}