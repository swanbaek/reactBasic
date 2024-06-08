import React, { useState, useMemo } from 'react';

const MyApp = () => {
    const [num, setNum] = useState('');
    const [list, setList] = useState([]); //배열
    const onChangeNum = (e) => {
        let tmp = e.target.value;
        console.log('typeof tmp: ', typeof tmp);
        setNum(tmp);
    };
    const onClickAdd = (e) => {
        const tmpList = [...list, Number(num)]; //num을 숫자로 만들어서 추가한다.
        setList(tmpList);
        setNum('');
    };
    const getAvg = (array) => {
        console.log('평균값 계산 중....');
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        let avg = sum / array.length;
        return avg;
    };
    const avg = useMemo(() => {
        return getAvg(list);
    }, [list]);

    return (
        <div className="container py-5">
            <input type="text" name="num" id="num" value={num} placeholder="숫자를 입력하세요" onChange={onChangeNum} />
            <button className="btn btn-info my-3" onClick={onClickAdd}>
                등 록
            </button>
            <hr />
            {/* <h3 className="text-danger">평균값: {getAvg(list)} </h3> */}
            {/* 이 코드에는 몇 가지 개선할 수 있는 점과 문제점이 있습니다. 주된 문제는 getAvg 함수가 
            매번 렌더링될 때마다 호출되어 불필요한 계산이 발생한다는 것입니다. ===>getAvg()함수 내의 console.log()를 확인해보자
            input에 입력할때도 "평균값 계산중..."이 출력되는 것을 확인할 수 있다.
            이를 해결하기 위해 useMemo 훅을 사용하여 list 배열이 변경될 때만 평균값을 계산하도록 할 수 있습니다. */}

            <h3 className="text-primary">평균값 : {!isNaN(avg) && avg}</h3>
            {/* 반면 useMemo()훅을 이용하여 반환받은 avg를 이용할 경우에는 input에 입력할때는 로그가 출력되지 않고
            등록 버튼을 클릭했을때 => list에 새 숫자가 추가되면서 "평균값 계산 중" 로그가 나오는 것을 확인할 수 있다. */}
            <ul>
                {list.map((val, i) => (
                    <li key={i} style={{ listStyle: 'none' }}>
                        <h3>{val}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default MyApp;
