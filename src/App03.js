import HisComp from './component/ex03_1';
import HerComp from './component/ex03_3';
function App() {
    return (
        <div className="container py-5">
            <h1>함수형 App -state사용</h1>
            <hr />
            <HerComp />
            <HisComp />
        </div>
    );
}
export default App;
