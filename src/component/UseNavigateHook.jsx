import React  from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyComponent() {
  
  const navigate=useNavigate()
  

  const handleClick = () => {
    // current 속성을 사용하여 input 요소에 접근
    navigate('/boards?id=1&page=1&size=5')
  };
  const handleClick2=()=>{
    window.location.href='/users/100'
  }

  return (
    <div className="container py-5">
      <button onClick={handleClick} className="btn btn-success">Go to Board</button>
      <button onClick={handleClick2} className="btn btn-warning">Go to Home</button>
    </div>
  );
}