import React, { useEffect, useState } from 'react';
import BoardForm from './BoardForm'
import BoardInfo from './BoardInfo'
import {Link, useLocation} from 'react-router-dom'
import BoardList from './BoardList';
import BoardNav from './BoardNav';

// import axios from 'axios';
import axios from '../../lib/axiosCreate'

const BoardApp = () => {

    const [mode, setMode] =useState('list')
    const location =useLocation();
    useEffect(()=>{
        
    },[mode])

    //파일업로드 하지 않는 경우
    const handleWrite= async(form)=>{
       // alert(form.title)
        await axios.post('/boardWrite', form)
                    .then(res=>{
                        if(res.data.result=='ok'){
                            alert('글 등록 성공 목록으로 갑니다');
                            setMode('list')
                        }else{
                            alert('글 등록 실패')
                        }
                    })
                    .catch(err=>{
                        alert('error: '+err.message)
                        console.log(err)
                    })
    }

    const handleWrite2=(data)=>{
        //alert(data.title)
        //axios로 비동기 요청을 백엔드 쪽에 보내자.
        //주의사항: method => post , 'Content-Type':'multipart/form-data'를 기술해야 함
        const {title,name, content,filename} = data;

        let url="/react_board/boardWrite.jsp";
        let fdata=new FormData();
        fdata.append('title', title);
        fdata.append('name', name);
        fdata.append('content', content);
        fdata.append('filename', filename);
        //파일 업로드시에는 FormData객체를 활용하면 쉽게 전송가능
        axios.post(url, fdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res)=>{
            //alert(res.data.result);
            if(parseInt(res.data.result)>0){
                alert('글쓰기 처리 완료했어요. 목록으로 갑니다.');
                setMode('list');
            }
        })
        .catch((err)=>{
            alert('error: '+err.message)
        })
    }
    const handleMode=(data)=>{
        setMode(data)
    }
    return (
        <div>            
            <BoardNav items={['List','Write']} onMode={handleMode}/>
            { 
                (mode==='list')&& <BoardList onMode={handleMode}></BoardList>
            }
            {
                (mode==='write')&&<BoardForm onWrite={handleWrite}  onMode={handleMode}></BoardForm>
            }
            {
                (mode==='info')&&<BoardInfo></BoardInfo>
            }
        </div>
    );
};

export default BoardApp;