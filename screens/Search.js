import React,{useState}from 'react';
import { View,Text,Image} from 'react-native';
import { TextInput,Button,Card,Title } from 'react-native-paper';
import { Header } from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Search = ({navigation}) => {
  const [city,setCity] = useState('');
const [cities,setCities] =useState({
    name:"",
    temp:"",
    humidity:"",
    desc:"",
    icon:""

});

const fetchCities = (text) =>{
    setCity(text);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=6f69111ddfc454f0d4a64903e6e1eb25`)
    .then(item=>item.json())
    .then(cityData=>
        {
        setCities({
            name:cityData.name,
            temp:cityData.main.temp,
            humidity:cityData.main.humidity,
            desc:cityData.weather[0].description,
            icon:cityData.weather[0].icon,
        });
   
    
         
    })
    .catch(err=>{});
}
const btnClick = async () => {
    await AsyncStorage.setItem("newcity",city);
    navigation.navigate("Home",{city:city});

}


  return (
  
    <View style={{flex:1}}>
        <Header name="Search Screen"/>
       <TextInput 
       label="city name" 
       theme={{
           colors:{
               primary:"#00aaff"
           }
       }}
       value={city}
       onChangeText={(text)=>fetchCities(text)}
       />
        <Button icon="content-save" mode="contained" onPress={() => btnClick()}  
        theme={{
           colors:{
               primary:"#00aaff"
           }
       }}
       style={{margin:20}}
       >
    <Text style={{color:"white"}}>Save Changes</Text>
  </Button>
  <View style={{alignItems:"center"}}>
            
            <Title style={{color:"#00aaff",marginTop:30,fontSize:30}}>{cities.name}</Title>
            <Image style={{width:120,height:120}} source={{uri:"http://openweathermap.org/img/w/"+cities.icon+".png"}}/>
        </View>
        <Card style={{margin:5,padding:12}}>
            <Title style={{color:"#00aaff"}}>Temperature - {cities.temp}</Title>
        </Card>
        <Card style={{margin:5,padding:12}}>
            <Title style={{color:"#00aaff"}}>Humidity - {cities.humidity}</Title>
        </Card>
        <Card style={{margin:5,padding:12}}>
            <Title style={{color:"#00aaff"}}>Description - {cities.desc}</Title>
        </Card>
    </View>
  );
};