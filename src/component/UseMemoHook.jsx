import React, { useState, useMemo } from 'react';
/**
 * 
 useMemo 훅은 의존성 배열이 변경될 때만 메모이제이션된 함수가 다시 호출됩니다. 
 useMemo 훅은 성능 최적화를 위해 사용되며, 주로 비용이 많이 드는 
 계산을 메모이제이션하여 불필요한 재계산을 방지합니다.
 [참고: 메모이제이션이란? 함수의 반환값을 저장하여 동일한 입력값에 대해 
 함수가 반복적으로 호출되는 것을 방지하는 방법]
# useMemo 훅의 동작 원리

- 첫 번째 인수는 계산 결과를 반환하는 함수입니다.
- 두 번째 인수는 의존성 배열입니다.

의존성 배열의 값 중 하나라도 변경되면, useMemo 훅은 첫 번째 인수로 전달된 함수를 다시 실행하여 새로운 값을 계산합니다.
의존성 배열의 값이 변경되지 않으면, 이전에 계산된 값을 재사용
 */

const MyApp = () => {
    const [num, setNum] = useState('');
    const [list, setList] = useState([]); // 배열

    const onChangeNum = (e) => {
        let tmp = e.target.value;
        console.log('typeof tmp: ', typeof tmp);
        setNum(tmp);
    };

    const onClickAdd = (e) => {
        const tmpList = [...list, Number(num)]; // num을 숫자로 만들어서 추가한다.
        setList(tmpList);
        setNum('');
    };

    const getAvg = () => {
        console.log('평균값 계산 중....');
        let sum = 0;
        for (let i = 0; i < list.length; i++) {
            sum += list[i];
        }
        let avg = sum / list.length;
        return avg;
    };

    const avg = useMemo(() => {
        return getAvg();
    }, [list]);

    return (
        <div className="container py-5">
            <input type="text" name="num" id="num" value={num} placeholder="숫자를 입력하세요" onChange={onChangeNum} />
            <button className="btn btn-info my-3" onClick={onClickAdd}>
                등 록
            </button>
            <hr />
            {/* getAvg() 함수 내의 console.log()를 확인해보자
                input에 입력할때도 "평균값 계산 중..."이 출력되는 것을 확인할 수 있다.
                이를 해결하기 위해 useMemo 훅을 사용하여 list 배열이 변경될 때만 평균값을 계산하도록 할 수 있습니다. */}
            <h3 className="text-primary">평균값 : {!isNaN(avg) && avg}</h3>
            {/* useMemo() 훅을 이용하여 반환받은 avg를 이용할 경우에는 input에 입력할때는 로그가 출력되지 않고
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
