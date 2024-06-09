export function JsxEx2() {
    return (
        <fragment>
            <lable htmlFor="name">이름 : </lable>
            <input id="name" name="name" className="form-control" placeholder="이름을 입력하세요" />
        </fragment>
    );
}
export function MyComponent() {
    return (
        <>
            <h3 className="text-primary">Hello JsxEx3</h3>
        </>
    );
} 
