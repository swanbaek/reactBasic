import React, { useState, useEffect } from 'react';
import MyTable from '../table/MyTable'
import MyTableRow from '../table/MyTableRow'
import MyTableColumn from '../table/MyTableColumn'
import axios from 'axios'
import {Link} from 'react-router-dom'
const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
    useEffect(()=>{
       //setTimeout(callBoardList,1000)
       callBoardList();
    },[])

    const callBoardList=()=>{
        let url="/boardList";
        axios.get(url)
             .then((res)=>{
                //alert(res.data);
                setBoardList(res.data);
             })
             .catch((err)=>{
                 alert('error: '+err.message)
             })
    }

    return (
        <div>
            <h1 className="text-center text-secondary mt-5">Board List</h1>     
            <MyTable headerNames={['글번호','제목','글쓴이','작성일']}>
            {
                (!boardList)?'':
                boardList.map((board, i)=>{
                    return (
                        <MyTableRow key={i}>
                            <MyTableColumn>{board.id}</MyTableColumn>
                            <MyTableColumn>
                              <Link to={`/boardView/${board.id}`}>{board.title}</Link>
                            </MyTableColumn>
                            <MyTableColumn>{board.name}</MyTableColumn>
                            <MyTableColumn>{board.wdate}</MyTableColumn>
                        </MyTableRow>
                    )
                })
            }
            </MyTable>
        </div>
    );
};

export default BoardList;