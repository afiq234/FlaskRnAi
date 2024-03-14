import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Homescreen() {

  const [data, setData] = useState();
  const [Sl, setSl] = useState(0);
  const [Sw, setSw] = useState(0);
  const [Pl, setPl] = useState(0);
  const [Pw, setPw] = useState(0);

  const saveData = async () => {
    const url = `http://localhost:5000/predict`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        Accept: 'application/json',
        body: JSON.stringify({Sl, Sw, Pl, Pw}), // Pass an object with properties
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Data is added successfully:', result);
        setData(result);
      } else {
        console.error(
          'Error fetching data from the server:',
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    saveData(); // Call the function
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <SafeAreaView className="flex-1 p-5 bg-white ">
      <View className=" flex-col">
        <View>
          <Text className="font-bold text-sky-700 text-center text-2xl">
            Beta Sypnapse Ai Project
          </Text>
        </View>
        <View className="m-3">
          <View className="rounded-2xl bg-gray-200 p-1 h-30 m-3">
            <TextInput
              placeholder="Sepal length"
              value={Sl.toString()}
              onChangeText={text => setSl(text)}
            />
          </View>
          <View className="rounded-2xl bg-gray-200 p-1 h-30 m-3">
            <TextInput
              placeholder="Sepal width"
              value={Sw.toString()}
              onChangeText={text => setSw(text)}
            />
          </View>
          <View className="rounded-2xl bg-gray-200 p-1 h-30 m-3">
            <TextInput
              placeholder="Petal length"
              value={Pl.toString()}
              onChangeText={text => setPl(text)}
            />
          </View>
          <View className="rounded-2xl bg-gray-200 p-1 h-30 m-3">
            <TextInput
              placeholder="Petal width"
              value={Pw.toString()}
              onChangeText={text => setPw(text)}
            />
          </View>
          <TouchableOpacity onPress={saveData}>
            <View className="rounded-2xl bg-blue-400 w-48 h-12 self-center items-center p-3 m-3">
              <Text className=" text-slate-50 text-sm">Identify the data</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text className="self-center">
            The result will be : {data}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}