import React,{useEffect, useState} from 'react'
import { Container,Alert,Image } from 'react-bootstrap'
import axios from 'axios'
export default function OpenWeather() {

    // const [lat, setLat] = useState(''); //위도
    // const [long, setLong] = useState('');//경도
    const [location, setLocation]=useState({lat:null, long:null});

    const [timezone, setTimezone]=useState('');
    const [temp, setTemp] = useState('');//온도
    const [desc, setDesc] = useState('');    
    const [icon, setIcon] = useState('');
    const [isReady, setReady]= useState(false);
    const [error, setError]=useState(null)
    useEffect(()=>{ //useEffect안의 콜백함수에는 async를 사용 못한다. 따라서 콜백함수 안에서 함수를 새로 정의하고, 그 안에서 호출
        const fetchLocationAndWeather= async ()=>{
            try{
                await getCurrentLocation();//현재 사용자 위치 정보 가져오기
            }catch(err){
                setError(err.message)
            }
          
        }
        fetchLocationAndWeather();//함수 호출
    },[])

    //현재 위도 경도 가져오기
    const getCurrentLocation=()=>{
        //navigator객체: 브라우저의 다양한 정보를 갖는 객체.window객체의 속성임
        //navigator 객체의 geolocation 속성:  Geolocation API를 통해 사용자의 현재 위치 정보를 가져오는 기능을 제공합니다. 
        // 이를 통해 웹 애플리케이션은 사용자의 위치를 기반으로 한 서비스를 제공할 수 있
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showErr)
            //navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

        }else{
            setError('Geolocation이 지원되지 않는 브라우저입니다')
        }

    }
    const showPosition=(position)=>{ //현재 사용자 위치정보가 인수로 들어온다
        console.log('position: ',position)
        if(position){
            setLocation({lat:position.coords.latitude, long:position.coords.longitude});
            setError(null)
        }
    }
    const showErr=(err)=>{
        setError('Geolocation이 지원되지 않는 브라우저입니다');
    }

    useEffect(() => {
        if (location.lat && location.long) {
            // console.log('here===============1. ')
            fetchWeather();
        }
        // console.log('here===============2. '+location.lat)
    }, [location]);

    const fetchWeather=()=>{
        // console.log('here===============3. '+location.lat)
        const url=`https://api.openweathermap.org/data/2.8/onecall?lat=${location.lat}&lon=${location.long}&exclude=hourly,daily,minutely&appid=0e71dc20533deb344272192657097c18`;
        //const url_=`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=0e71dc20533deb344272192657097c18`;
        console.log("url: ",url)//url출력해서 postman으로 테스트 해보기
        axios.get(url)
        .then((response=>{
            console.log(response)
            const {timezone}=response.data;
            const {temp}=response.data.current;
            console.log('temp: ',temp) //켈빈
            const {description, icon}=response.data.current.weather[0];

            setTimezone(timezone);
            /*절대온도(kelvin)는 온도의 SI 단위이다. 켈빈은 절대 온도를 측정하기 때문에, 
            0 K은 절대 영도(이상 기체의 부피가 0이 되는 온도)이며, 섭씨 0도는 273.15 K에 해당한다. 
            상대온도의 단위로는 섭씨도와 같다. 켈빈 경의 이름을 땄으며, 기호는 K다. */
            const celsiusTemp = temp - 273.15; // 켈빈을 섭씨로 변환
            setTemp(celsiusTemp.toFixed(2));             
            setDesc(description);
            setIcon(icon);
            setReady(true);
        }))
        .catch((err)=>{
            setError(err.message)
        })

    }

  return (
    <Container className="py-5">
        <h1>오늘의 날씨</h1>
        <br/>
        <h2>현재 나의 위치</h2>
        {
            location.lat&&location.long && 
            (<Alert variant='primary'>
                <h4>Latitude: {location.lat}</h4>
                <h4>Longitude: {location.long}</h4>
            </Alert>)
        }
        {
            isReady&& (
                <Alert variant='warning'>
                    <h4>Timezone: {timezone}</h4>
                    <h4>Temparature: {temp}</h4>
                    <h4>Description: {desc}</h4>
                    <Image src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></Image>
                </Alert>
            )
        }
        {error&&<Alert variant='danger'>Error: {error}</Alert>}        
    </Container>
  )
}
