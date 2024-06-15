import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function NaverBookCard(props) {
    const { isbn, title, link, image, author, discount, pubdate } = props;
    let title_ellipsis = title;
    let len = 25;
    if (title.length > len) {
        title_ellipsis = title.substring(0, len) + '...';
    }
    return (
        <Card>
            <Link to={link}>
                <Card.Img src={image}></Card.Img>
            </Link>
            <Card.Body>
                <Card.Title>
                    <Link to={link}>{title_ellipsis}</Link>
                </Card.Title>
                <Card.Text>
                    <div>가격: {discount} 원 </div>
                    <div>저자: {author}</div>
                    <div>출판일:{pubdate}</div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
