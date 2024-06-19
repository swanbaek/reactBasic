import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../lib/axiosCreate';
import { Link } from 'react-router-dom';
import { Table, Button, Badge, Pagination } from 'react-bootstrap';

const BoardList = ({ onMode }) => {
    const [boardList, setBoardList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // 현재 보여줄 페이지
    const [pageCount, setPageCount] = useState(1); // 총 페이지 수
    const [pageRangeStart, setPageRangeStart] = useState(1); //페이징 블럭 처리에서 사용할 데이터
    const display = 5;

    useEffect(() => {
        const fetchData = async () => {
            await getTotalCount();
            await callBoardList(0);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setPageCount(Math.ceil(totalCount / display));
    }, [totalCount]);

    const pageHandler = async (page) => {
        const offset = (page - 1) * display;
        // alert(offset);
        setCurrentPage(page);
        callBoardList(offset);
    };

    const getPageNavi = useMemo(() => {
        let navi = [];
        let end = Math.min(pageRangeStart + 4, pageCount); //페이징 블럭을 5개 단위로
        for (let i = pageRangeStart; i <= end; i++) {
            navi.push(
                <Pagination.Item key={i} onClick={() => pageHandler(i)} active={currentPage === i}>
                    {i}
                </Pagination.Item>
            );
        }
        if (pageCount > end) {
            navi.push(
                <Pagination.Item
                    key="next"
                    onClick={() => {
                        setPageRangeStart(end + 1);
                        pageHandler(end + 1);
                    }}
                >
                    Next
                </Pagination.Item>
            );
        }
        if (pageRangeStart > 1) {
            navi.unshift(
                <Pagination.Item
                    key="prev"
                    onClick={() => {
                        setPageRangeStart(pageRangeStart - 5);
                        pageHandler(pageRangeStart - 1);
                    }}
                >
                    Prev
                </Pagination.Item>
            );
        }

        return navi;
    }, [pageCount, currentPage]);

    const callBoardList = (offset) => {
        if (!offset) offset = 0;
        let url = `/boardList?offset=${offset}`;
        axios
            .get(url)
            .then((res) => {
                setBoardList(res.data);
            })
            .catch((err) => {
                alert('error: ' + err.message);
            });
    };

    const getTotalCount = () => {
        axios
            .get('/boardTotalCount')
            .then((res) => {
                setTotalCount(res.data.totalCount);
            })
            .catch((err) => {
                alert('error: ' + err.message);
            });
    };

    //  if (boardList.length > 0) {
    return (
        <div className="board-list">
            <h1 className="text-center my-5">Board List</h1>
            <div className="text-right">총 게시글 수: {totalCount}</div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.length > 0 &&
                        boardList.map((boards) => (
                            <tr key={boards.id}>
                                <td>{boards.id}</td>
                                <td>
                                    <Link to={`/board2/${boards.id}`}>{boards.title}</Link> &nbsp;&nbsp;
                                    {boards.replyCount > 0 && <Badge bg="secondary">{boards.replyCount}</Badge>}
                                </td>
                                <td>{boards.name}</td>
                                <td>{boards.wdate}</td>
                            </tr>
                        ))}
                    {boardList.length === 0 && (
                        <tr>
                            <td colspan="4">데이터가 없습니다</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <Pagination>{getPageNavi}</Pagination>
            </div>

            <Button className="mx-2 btnWrite" onClick={() => onMode('write')}>
                작성하기
            </Button>
        </div>
    );
    // } else {
    //     return null;
    // }
};

export default BoardList;
