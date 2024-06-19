import React from 'react';
import { Button } from 'react-bootstrap';

export default function ReplyList({ replies, startEditingReply, deleteReply }) {
    return (
        <div>
            <ul className="list-group">
                {replies.map((reply) => (
                    <li key={reply.num} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{reply.writer}:</strong> {reply.memo}
                            <br />
                            <small>{reply.reg_date}</small>
                        </div>
                        <div>
                            <Button variant="info" size="sm" className="mx-1" onClick={() => startEditingReply(reply)}>
                                댓글Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => deleteReply(reply.num)}>
                                댓글Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
