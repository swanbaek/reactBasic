import React, { useState, useMemo } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import NaverBookForm from './NaverBookForm';
import NaverBookCard from './NaverBookCard';
import axios from 'axios';

export default function NaverBookApp() {
    const [query, setQuery] = useState('');
    const [bookList, setBookList] = useState([]);
    const [total, setTotal] = useState('');
    const [start, setStart] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [pageRangeStart, setPageRangeStart] = useState(1);
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
        await axios.get(url).then((res) => {
            console.log(JSON.stringify(res));
            setTotal(res.data.total);
            setBookList(res.data.items);
            setStart(start + pageSize);
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
                    bookList.map((book) => (
                        <Col key={book.isbn} md={3} className="mx-auto">
                            <NaverBookCard {...book} />
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
