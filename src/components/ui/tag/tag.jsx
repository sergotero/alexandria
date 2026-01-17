import "./tag.css";

function Tag({ children }) {
  return (
    <span className="Tag" style={{backgroundColor: "#772B8C"}}>{ children }</span>
  );
}

export default Tag;