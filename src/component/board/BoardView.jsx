import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';
import { AiFillHeart, AiFillDislike } from 'react-icons/ai';

const BoardView = () => {
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState({ writer: '', memo: '' });
    const [editingReply, setEditingReply] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    const getBoard = async () => {
        try {
            const board = await axios.get(`/boardView/${id}`);
            setBoard(board.data[0]);
        } catch (err) {
            alert('err: ' + err.message);
        }
    };

    const getReplies = async () => {
        try {
            const response = await axios.get(`/boards/${id}/replies`);
            setReplies(response.data);
        } catch (err) {
            console.error('Error fetching replies:', err);
        }
    };

    useEffect(() => {
        getBoard();
        getReplies();
    }, []);

    const onDelete = async () => {
        if (window.confirm(id + '번 게시글을 삭제하시겠습니까?')) {
            await axios.get(`/boardDel/${id}`);
            navigate('/board2');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReply({ ...newReply, [name]: value });
    };

    const addReply = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/boards/${id}/replies`, newReply);
            setNewReply({ writer: '', memo: '' });
            getReplies();
        } catch (err) {
            console.error('댓글 추가 Error ', err);
        }
    };

    const deleteReply = async (replyId) => {
        try {
            await axios.delete(`/replies/${replyId}`);
            getReplies();
        } catch (err) {
            console.error('댓글 삭제 Error', err);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingReply({ ...editingReply, [name]: value });
    };

    const startEditingReply = (reply) => {
        setEditingReply(reply);
        setShowEditModal(true);
    };

    const updateReply = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/replies/${editingReply.num}`, editingReply);
            setShowEditModal(false);
            setEditingReply(null);
            getReplies();
        } catch (err) {
            console.error('댓글 수정 Error ', err);
        }
    };

    return (
        <div className="board-view">
            <Row className="my-5">
                <Col className="px-5">
                    <h1 className="my-5 text-center">Board View [No. {id}]</h1>
                    <div className="text-end my-2">
                        <Link to={`/boardEdit/${id}`}>
                            <Button className="btn mx-2">수정</Button>
                        </Link>
                        <Button className="btn" variant="danger" onClick={onDelete}>
                            삭제
                        </Button>
                    </div>
                    <Card>
                        <Card.Body>
                            <h5>
                                [{board.id}] {board.title}
                            </h5>
                            <hr />
                            <div className="cArea">
                                {board.content}
                                <br />
                                <AiFillHeart style={{ color: 'hotpink' }} />
                                <AiFillDislike style={{ color: 'green' }} />
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            Created on {board.wdate} by {board.name}
                        </Card.Footer>
                    </Card>

                    <Button className="btn mt-4" variant="secondary" onClick={() => navigate('/board2')}>
                        {' '}
                        Board List전체출력{' '}
                    </Button>

                    <h2 className="mt-5">댓글영역</h2>
                    <ul className="list-group">
                        {replies.map((reply) => (
                            <li
                                key={reply.num}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{reply.writer}:</strong> {reply.memo}
                                    <br />
                                    <small>{reply.reg_date}</small>
                                </div>
                                <div>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="mx-1"
                                        onClick={() => startEditingReply(reply)}
                                    >
                                        댓글Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => deleteReply(reply.num)}>
                                        댓글Delete
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h3 className="mt-4"> 댓글추가 </h3>
                    <Form onSubmit={addReply}>
                        <Form.Group className="mb-3">
                            <Form.Label>작성자</Form.Label>
                            <Form.Control
                                type="text"
                                name="writer"
                                value={newReply.writer}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>댓글</Form.Label>
                            <Form.Control
                                type="text"
                                name="memo"
                                value={newReply.memo}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit">댓글추가버튼</Button>
                    </Form>
                </Col>
            </Row>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title> 댓글수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateReply}>
                        <Form.Group className="mb-3">
                            <Form.Label>작성자</Form.Label>
                            <Form.Control
                                type="text"
                                name="writer"
                                value={editingReply?.writer || ''}
                                onChange={handleEditInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>댓글</Form.Label>
                            <Form.Control
                                type="text"
                                name="memo"
                                value={editingReply?.memo || ''}
                                onChange={handleEditInputChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit"> 댓글수정버튼</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BoardView;
