import { createContext, useContext, useState } from 'react';
import './styles.css';

// ThemeContext 객체를 생성하고, 기본값을 'light'로 설정함
const ThemeContext = createContext('light');

const App = () => {
    // theme를 저장하기 위한 state를 생성하여 초깃값을 'light'로 설정함
    const [theme, setTheme] = useState('light');
    return (
        <div className="container py-5 text-center">
            {/* ThemeContext를 구독하고 있는 하위 레벨의 컴포넌트들에게 value값을 전달함 */}
            <ThemeContext.Provider value={theme}>
                <Box text="Hello, React!">테마를 변경해 봅시다!</Box>
            </ThemeContext.Provider>
            <button
                className="btn btn-secondary"
                onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
            >
                테마 변경하기
            </button>
        </div>
    );
};

const Box = ({ text, children }) => {
    //ThemeContext를 theme라는 이름으로 구독함
    const theme = useContext(ThemeContext);
    const className = 'box-' + theme;
    return (
        <section className={className}>
            <h1>{text}</h1>
            {children}
        </section>
    );
};

export default App;
