import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function ReplyEditForm(props) {
    const { showEditModal, setShowEditModal, updateReply, editingReply, handleEditInputChange } = props;
    return (
        <div>
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
}
