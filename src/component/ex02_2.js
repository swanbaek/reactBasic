const YourComp = ({ name, email, age }) => {
    const bgcolor = '#ace';

    return (
        <fragment>
            <div style={{ backgroundColor: bgcolor, padding: 5, margin: 5 }}>
                <h3>Name: {name}</h3>
                <h3>Email: {email}</h3>
                <h3>Age: {age}</h3>
            </div>
        </fragment>
    );
};
YourComp.defaultProps = {
    name: 'David',
    email: '',
    age: 1,
};
export default YourComp;
