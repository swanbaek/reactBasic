import React from 'react';

const MyTable = (props) => {
    const {headerNames, children} =props
    return (
        <table className="table table-striped mt-5">
            <thead>
                <tr>{
                   headerNames.map((item,i)=>{
                       return (
                           <th key={i}>{item}</th>
                       )
                   })
                } 
                </tr>    
            </thead>    
            <tbody>
                {
                    children
                }
            </tbody>
        </table>
    );
}; 

export default MyTable;