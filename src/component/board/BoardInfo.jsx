import React, { useEffect, useState } from 'react';
//npm i --s react-icons
//https://react-icons.github.io/react-icons/#/
import axios from 'axios';
import {AiFillLike, AiFillDislike, AiFillFileAdd} from 'react-icons/ai'
import {FcLike} from 'react-icons/fc'
import {Link} from 'react-router-dom'

const BoardInfo = ({history, match}) => {
    //console.log('match.params=='+match.params)
    const {idx} =match.params;
    console.log('idx: '+idx);

    const [data, setData] = useState({})

    useEffect(()=>{
        callBoardInfo();
    },[])
    const callBoardInfo=()=>{
        let url="/react_board/boardView.jsp?idx="+idx;
        axios.get(url)
             .then((res)=>{
                //alert(res.data.title)
                setData(res.data);
             })
             .catch((err)=>{
                 alert('error: '+err.message)
             })
    }//-------------------------------

    const {title, content, name,filename,wdate, readnum} = data;

    return (
        <>
          
            {/* <BoardNav/> */}
            <div className="media border p-3 my-3">
          <img src="/images/icon1.png" alt="John Doe" className="mr-3 mt-3 rounded-circle" style={{width:'60px'}}></img>
          <div className="media-body">
            <h4>{title} <small><i>by {name}</i></small></h4>
            <p>{content}</p>
            <div>
                <AiFillFileAdd/>
                <Link to={`/FileDown?filename=${filename}`}>{filename}</Link></div>
            <i>[{wdate}]</i>
            <div className="text-center">
            <span className="badge badge-danger">{readnum}</span>    
            <AiFillLike style={{color:'green'}}/>
            <AiFillDislike style={{color:'green'}}/>
            <FcLike/>
            </div>
          </div>
          </div>
          <button  onClick={()=>{history.goBack()}}   className="btn btn-primary btn-block">목록으로 가기</button>    
        </>
    );
};

export default BoardInfo;