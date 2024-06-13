import React, { useState, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import TodoListItem from './TodoListItem';
import './TodoList.css';
import { BiListCheck, BiSearch } from 'react-icons/bi';

export default function TodoList({ todo, onDelete, onChangeDone }) {
    const [search, setSearch] = useState('');

    const searchHandler = (e) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === ''
            ? todo
            : todo.filter((item, i) => {
                  //return item.content.indexOf(search) !== -1;
                  return item.content.toLowerCase().includes(search.toLowerCase());
              });
    };
    //useMemo훅: 특정 계산 결과를 메모이제이션 하고 재 계산을 방지하기 위해 사용한다
    const aggregate = useMemo(() => {
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return { totalCount, doneCount, notDoneCount };
    }, [todo]);
    /**
     * aggregate는 useMemo 훅을 사용하여 메모이제이션된 값이기 때문에
     * 함수가 아니다. 함수 호출 형태가 아니라 값으로 사용해야 한다.
     *
     */
    const { totalCount, doneCount, notDoneCount } = aggregate;
    //구조분해 할당을 통해 접근

    return (
        <div className="TodoList">
            <h4 className="text-primary">
                TodoList <BiListCheck />{' '}
            </h4>
            <Row>
                <Col xs={12} sm={8} md={8}>
                    <div className="alert alert-success my-4">
                        <div>총 개수 : {totalCount}</div>
                        <div>완료된 일: {doneCount}</div>
                        <div>해야 할 일: {notDoneCount}</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} md={8}>
                    <input
                        name="search"
                        value={search}
                        className="inputSearch form-control"
                        placeholder="검색어를 입력하세요"
                        onChange={searchHandler}
                    />
                </Col>
                <Col xs={12} sm={3} md={3}>
                    <Button onClick={searchHandler}>
                        <BiSearch />
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4 py-3">
                <Col xs={12} sm={10} md={10}>
                    {
                        getSearchResult().map((it) => (
                            <TodoListItem
                                key={it.id}
                                {...it}
                                onDelete={onDelete}
                                onChangeDone={onChangeDone}
                            ></TodoListItem>
                        ))
                        /**<TodoListItem key={doit.id}  {... doit} ></TodoListItem> 이렇게 하면 아래와 동일하게 된다.
           객체의 모든 속성을 풀어해쳐서 props로 전달하는 방법이다.
        <TodoItem key={it.id} id={it.id} content={it.content}  isDone={it.isDone}  onUpdate={onUpdate} onDelete={onDelete}/>  */
                    }
                </Col>
            </Row>
        </div>
    );
}
