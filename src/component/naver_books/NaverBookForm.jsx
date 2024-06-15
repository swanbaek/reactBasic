import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState } from 'react';

export default function NaverBookForm({ onFind }) {
    const [search, setSearch] = useState('');
    const onClickHandler = (e) => {
        onFind(search);
        setSearch('');
    };
    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    };
    const onChangeHandler = (e) => {
        setSearch(e.target.value);
    };
    return (
        <>
            <Row>
                <Col md={9} className="offset-1">
                    <Form.Control
                        type="search"
                        name="search"
                        value={search}
                        onChange={onChangeHandler}
                        onKeyUp={onKeyUp}
                        placeholder="검색어를 입력하세요"
                    />
                </Col>
                <Col md={2}>
                    <Button onClick={onClickHandler}>검색</Button>
                </Col>
            </Row>
        </>
    );
}
