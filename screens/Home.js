import React,{useState,useEffect}from 'react';


import { View,Text,Image} from 'react-native';
import { TextInput,Button,Card,Title } from 'react-native-paper';
import { Header } from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home =(props) =>{
    const [info,setInfo] =useState({
        name:"",
        temp:"",
        humidity:"",
        desc:"",
        icon:""

    })
    useEffect(()=>{
        getweather()
    },[])
    const getweather =async () =>{
        let MyCity = await AsyncStorage.getItem("newcity");
        if(!MyCity){
            const {city} = props.route.params;
            MyCity = city

        }
      
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&appid=6f69111ddfc454f0d4a64903e6e1eb25&units=metric`)
        .then(data=>data.json())
        .then(results=>{
            setInfo({
                name:results.name,
                temp:results.main.temp,
                humidity:results.main.humidity,
                desc:results.weather[0].description,
                icon:results.weather[0].icon,

            })
        })
        .catch(err=>{
            alert(err.message)
        })

    }
    if(props.route.params.city != "london"){
        getweather()
    }
    return(
        <View style={{flex:1}}>
            <Header name="Weather App"/>
        <View style={{alignItems:"center"}}>
            
            <Title style={{color:"#00aaff",marginTop:30,fontSize:30}}>{info.name}</Title>
            <Image style={{width:120,height:120}} source={{uri:"http://openweathermap.org/img/w/"+info.icon+".png"}}/>
        </View>
        <Card style={{margin:5,padding:12}}>
            <Title style={{color:"#00aaff"}}>Temperature - {info.temp}</Title>
        </Card>
        <Card style={{margin:5,padding:12}}>
            <Title style={{color:"#00aaff"}}>Humidity - {info.humidity}</Title>
        </Card>
        <Card style={{margin:5,padding:12}}>
            <Title style={{color:"#00aaff"}}>Description - {info.desc}</Title>
        </Card>
        </View>
    )
}

export default Home;