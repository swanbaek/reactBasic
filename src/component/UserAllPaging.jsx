import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
export default function UserAll() {
//   const [params] = useSearchParams(); //페이징 처리시 이는 사용하지 않는다.
  const [userList, setUserList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]=useState(false)
  const size=3;
  const getAllUsers = async (page, perPage) => {
    const url = `http://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=5`;
    try {
      setLoading(true)  
      const response = await fetch(url, {
        method: 'GET',
      });
      const data = await response.json();
      
      if (!data) {
        alert('데이터가 없습니다');
        return;
      }
      setLoading(false);
      const arr = [...data.data];
      setUserList(arr);
      setTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (error) {
      alert('error: ' + error.message);
    }
  };

  useEffect(() => {
    getAllUsers(1, size); // 페이지 기본값 설정 (첫 페이지, 페이지 당 5개 아이템)
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getAllUsers(page, size); // 페이지 변경 시 해당 페이지의 데이터 가져오기
  };

  return (
    <div>
      <h1>All Users</h1>
      <ul className="list-group">
        {loading&& 
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
        {userList &&
          userList.map((user, i) => (
            <li key={user.id} className="list-group-item my-3 p-3">
              <img src={user.avatar} alt={user.id} className="mx-3"></img>
              {user.first_name} {user.last_name} [{user.email}]
            </li>
          ))}
      </ul>
      <div>
        {/* Array(totalPages)==> 총 페이지수 크기를 갖는 빈 배열이 생성된다
        예를 들어, Array(5)는 길이가 5인 배열을 생성합니다. 이 배열은 인덱스 0부터 4까지의 요소를 가지며, 모든 요소는 undefined로 초기화한다
        이 배열은 [undefined, undefined, undefined, undefined, undefined]와 같이 초기화됩니다. 
        이후 .keys() 메서드를 호출하여 배열의 각 요소에 대한 이터레이터를 생성할 수 있다. keys()를 이용해 인덱스 번호를 얻어오고
        스프레드 연산자료 [0,1,2,3,4] 식의 배열 사본을 만든 뒤 map()함수를 이용해 page를 출력한다. 
         */}
        <Pagination  className='justify-content-center'>
          {[...Array(totalPages).keys()].map((page) => ( //keys()로 추출하면 index번호            
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}