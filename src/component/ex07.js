
const styles={
    wrap:{
        margin:8,
        padding:8,
        display:'flex',
        flexFlow:'row no-wrap',
        border:'1px solid #ddd',
        borderRadius:16,
    },
    msgText:{
        color:'black',
        fontSize:16
    },
    image:{
        width:50,
        height:50,
        borderRadius:25,
    },
    imgWrap:{
        margin:8
    },
    contentWrap:{
        display:'flex',
        flexFlow:'column wrap',
        justifyContent:'center',
        marginLeft:8
    },
    nameTxt:{
        color:'#888',
        fontSize:16,
        fontWeight:'bold'
    },
    commentTxt:{
        color:'#000',
        fontSize:'1.2em'
    }
}
function Comment(props){

    const {name,title}=props;
    

    return (
        <div className="container py-4" style={styles.wrap}>
            <div style={styles.imgWrap}>
                <img style={styles.image} src="images/other.jpg" alt="aaa"></img>
            </div>
            <div style={styles.contentWrap}>
                <span style={styles.nameTxt}>{name} [24.05.23]</span>
                <span style={styles.commentTxt}>{title}</span>
            </div>

        </div>
    )
}
export default Comment;