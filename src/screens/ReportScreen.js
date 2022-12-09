import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { screenHeight, screenWidth } from '../utils/Dimensions';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { fsdb } from '../config/firebase';
import { AuthContext } from '../utils/AuthContext';

const ReportScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [votes, setVotes] = useState([]);

  const chartConfig = {
    backgroundGradientFrom: '#57c4ea',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
    labelColor: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.7,
    useShadowColorFromDataset: false, // optional
    propsForVerticalLabels: { fontWeight: 'bold' },
  };

  useEffect(() => {
    const comfortVotesRef = collection(fsdb, 'Comfort');
    const q = query(comfortVotesRef, orderBy('date', 'desc'), limit(1));
    const unsub = onSnapshot(q, querySnapshot => {
      console.log('snapshot', querySnapshot);
      querySnapshot.forEach(doc => {
        let items = doc.data();
        setVotes([items.cold, items.neutral, items.warm]);
      });
    });

    return () => unsub;
  }, []);

  const dataRandom = {
    labels: ['Cold', 'Neutral', 'Warm'],
    datasets: [
      {
        data: votes,
        colors: [
          (opacity = 1) => '#359afb',
          (opacity = 1) => '#a4b0be',
          (opacity = 1) => '#ea8535',
        ],
      },
    ],
  };

  function Loading() {
    return (
      <View
        style={{
          backgroundColor: '#ffff',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderWidth: 2,
            height: '8%',
            aspectRatio: 6 / 1,
            borderColor: '#52ADEB',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Cargando tabla...
          </Text>
        </View>
      </View>
    );
  }

  function Loaded() {
    return (
      <View
        style={{
          backgroundColor: '#ffff',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderWidth: 2,
            height: '8%',
            aspectRatio: 6 / 1,
            borderColor: '#52ADEB',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Cantidad de votos
          </Text>
        </View>
        {dataRandom.datasets[0].data.length > 0 && (
          <BarChart
            data={dataRandom}
            width={screenWidth}
            height={screenHeight - 200}
            chartConfig={chartConfig}
            withHorizontalLabels={false}
            withCustomBarColorFromData={true}
            flatColor={true}
            showValuesOnTopOfBars={true}
            fromZero={true}
            style={{
              marginVertical: 10,
            }}
          />
        )}
      </View>
    );
  }

  if (votes.length != 0) {
    return <Loaded />;
  }

  return <Loading />;
};

export default ReportScreen;
