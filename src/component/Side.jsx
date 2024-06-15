import React from 'react';
import { Stack, Button, ListGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function Side() {
    const navigate = useNavigate();

    const moveLoc = (url) => {
        navigate(url);
    };
    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            {/* <Link to='/'>Home</Link>   */}
            <Button as={Link} to="/" variant="primary">
                Home
            </Button>
            {/* <Button variant="secondary" onClick={()=>{
        moveLoc('/comp1')
      }}>MyComp1</Button> */}
            <Button
                variant="secondary"
                onClick={() => {
                    moveLoc('/board2');
                }}
            >
                BoardApp
            </Button>
            <hr />
            <ListGroup>
                <ListGroup.Item as={Link} to="/event1">
                    Event처리1
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/event2">
                    Event처리2
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook1">
                    useEffect훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook2">
                    useEffect훅-Timer
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook3">
                    useRef훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook4">
                    useNavigate훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook5">
                    useMemo훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook6">
                    useCallback훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/memo1">
                    React.memo
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/memo2">
                    React.memo
                </ListGroup.Item>

                <ListGroup.Item as={Link} to="/todo">
                    To Do
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/ajax1/1">
                    Rest Api1
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/ajax2?page=1&per_page=6">
                    Rest Api2
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/ajax3">
                    오늘 날씨
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/ajax4">
                    Naver 도서 검색
                </ListGroup.Item>
            </ListGroup>
        </Stack>
    );
}
