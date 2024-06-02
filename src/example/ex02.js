
// 함수형 컴포넌트에서 부모 컴포넌트로부터 받은 props를 받으려면 
//매개변수로 props를 사용하면 된다. 
// 함수형 컴포넌트의 인자로 props를 받아와서 사용할 수 있다.
const MyComp=(props)=>{
    const {mycolor,mybgcolor, mytxt}=props;
    let mystyle={
        color:mycolor,
        backgroundColor:mybgcolor,
        padding:'1em',
        margin:'1em'
    }
    return(
        <>
            <h2 style={mystyle}>MyComp 함수형 자식 컴포넌트 : {mytxt}</h2>            
            <hr/>
        </>
    )
}
export default MyComp;