import React, { useState, useMemo } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import NaverBookForm from './NaverBookForm';
import NaverBookCard from './NaverBookCard';
import axios from 'axios';

export default function NaverBookApp() {
    const [query, setQuery] = useState('');
    const [bookList, setBookList] = useState([]);
    const [total, setTotal] = useState('');
    const [start, setStart] = useState(1); //네이버에 요청 보낼때 사용할 start 데이터
    const [currentPage, setCurrentPage] = useState(1); //현재 보여줄 페이지 번호
    const [pageCount, setPageCount] = useState(1); //총 페이지수 =>total과 pageSize로 연산하여 구한다
    const [pageRangeStart, setPageRangeStart] = useState(1); //페이징 블럭 처리에서 사용할 데이터
    const pageSize = 12;

    const pageHandler = async (page) => {
        let tmpStart = (page - 1) * pageSize + 1;
        await setStart(tmpStart);
        setCurrentPage(page);
        fetchData(query, tmpStart);
    };

    const getPageNavi = useMemo(() => {
        let cnt = Math.ceil(total / pageSize);
        setPageCount(cnt);
        let navi = [];
        let end = Math.min(pageRangeStart + 9, cnt);
        //페이징 블럭을 10개단위로 처리할 예정
        //총 페이지 수(cnt)가 10보다 작으면 페이지수(cnt)값을 end로,
        //총 페이지수(cnt)가 10개를 넘어가면 pageRangeStart+9 값을 end로 설정한다.

        for (let i = pageRangeStart; i <= end; i++) {
            navi.push(
                <Button
                    className="xs mx-1"
                    key={i}
                    onClick={() => pageHandler(i)}
                    variant={i === currentPage ? 'primary' : 'outline-primary'}
                >
                    {i}
                </Button>
            );
        }
        if (cnt > end) {
            navi.push(
                <Button
                    className="xs mx-1"
                    key="next"
                    onClick={() => {
                        setPageRangeStart(end + 1);
                        pageHandler(end + 1);
                    }}
                >
                    Next
                </Button>
            );
        }
        if (pageRangeStart > 1) {
            //pageRangeStart가 1보다 큰 경우(가령 Next를 누르면 11이 됨==> 이 경우는 이전 페이징 블럭이 있단 얘기)
            //navi배열 맨 앞에 이전(Prev) 버튼을 끼워 넣는다.
            navi.unshift(
                <Button
                    className="xs mx-1"
                    key="prev"
                    onClick={() => {
                        setPageRangeStart(pageRangeStart - 10);
                        pageHandler(pageRangeStart - 10);
                    }}
                >
                    Prev
                </Button>
            );
        }
        return navi;
    }, [total, pageRangeStart, currentPage]);

    const onFind = async (value) => {
        await setQuery(value);
        setPageRangeStart(1); // Reset page range start when a new search is made
        fetchData(value, 1);
    };

    const fetchData = async (value, start) => {
        let url = `/api/books?query=${value}&start=${start}`;
        console.log(start, '====', url);
        await axios
            .get(url)
            .then((res) => {
                console.log(JSON.stringify(res));
                setTotal(res.data.total);
                setBookList(res.data.items);
                // setStart(start + pageSize);
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    alert('더이상 데이터가 없습니다.');
                }
            });
    };

    return (
        <Container>
            <h1 className="text-success text-center my-5">Naver Books</h1>
            <NaverBookForm onFind={onFind} />
            {total > 0 && (
                <Row className="mt-4">
                    <Col md={10} className="mx-auto">
                        <h3>
                            검색어 :<span className="text-primary mx-2">{query}</span>
                            <span className="text-danger mx-2">{total}개</span>
                        </h3>
                    </Col>
                </Row>
            )}
            <Row className="mt-4">
                {start > total + pageSize && query && (
                    <div className="alert alert-danger">
                        <h3>더이상 없습니다</h3>
                        <Button
                            variant="success"
                            onClick={async () => {
                                await setStart(1);
                                onFind(query);
                            }}
                        >
                            처음으로..
                        </Button>
                    </div>
                )}
                {bookList &&
                    bookList.map((book, i) => (
                        <Col key={i} md={3} className="mx-auto">
                            <NaverBookCard key={book.isbn} {...book} />
                        </Col>
                    ))}
            </Row>
            <Row>
                <Col xs={12} sm={10} className="my-3 mx-auto">
                    {pageCount > 1 && getPageNavi}
                </Col>
            </Row>
        </Container>
    );
}
