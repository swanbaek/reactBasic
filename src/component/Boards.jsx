import React from 'react';
import { useSearchParams } from 'react-router-dom';
//useSearchParams 는 URL의 쿼리문자열을 읽고 수정하는데 사용된다.
const Boards = () => {

    //?boards?id=11&page=2&size=10   ===> query string
    const [params] = useSearchParams();
    console.log(params.size);

    const search = [...params];//사본 배열을 이용해 출력해보면
    console.log(search);
    /*search를 콜솔에 출력하면 아래와 같다
    0: ['id','11']
    1: ['page','2']
    2: ['size','10']
    */
    return (
        <div className='py-5'>
            {search.map((s,i )=> (
                <h3 key={i}>{s[0]} : {s[1]}</h3>
            ))}
            <hr></hr>
            <h3>id: {params.get('id')}</h3>
            <h3>page: {params.get('page')}</h3>
            <h3>size: {params.get('size')}</h3>
            {/* useSearchParams 훅에서 params는 URLSearchParams 객체를 반환하며, 
            이 객체의 메서드인 get을 사용하여 개별 파라미터 값을 가져올 수 있다. 
            그러나, search 배열은 단순히 URLSearchParams 객체를 스프레드 연산자로 
            배열로 변환한 것이기 때문에 URLSearchParams 객체의 메서드를 사용할 수 없다. 
            search.get('id') [x] => 이것은 안됨
            params.get('id') [o] 
            */}
        </div>
    );
};
export default Boards;