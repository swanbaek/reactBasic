import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function ReplyForm({ addReply }) {
    const [newReply, setNewReply] = useState({ writer: '', memo: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReply({ ...newReply, [name]: value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        addReply(newReply);
    };
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>작성자</Form.Label>
                <Form.Control type="text" name="writer" value={newReply.writer} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>댓글</Form.Label>
                <Form.Control type="text" name="memo" value={newReply.memo} onChange={handleInputChange} required />
            </Form.Group>
            <Button type="submit">댓글추가버튼</Button>
        </Form>
    );
}
