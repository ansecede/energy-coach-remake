import React from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { screenHeight, screenWidth } from '../utils/Dimensions';

const ReportScreen = () => {
  const chartConfig = {
    backgroundGradientFrom: '#57c4ea',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => 'rgba(26, 255, 146, ' + opacity + ')',
    labelColor: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.7,
    useShadowColorFromDataset: false, // optional
    propsForVerticalLabels: { fontWeight: 'bold' },
  };

  const dataRandom = {
    labels: ['MO', 'TU', 'WE', 'TH', 'FR'],
    legend: ['Cold', 'Neutral', 'Hot'],
    data: [
      [60, 60, 60],
      [30, 30, 60],
      [30, 30, 60],
      [30, 30, 60],
      [30, 30, 60],
    ],
    // color: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
    barColors: ['#359afb', '#a4b0be', '#ea8535'],
  };

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
      {dataRandom.data.length > 0 && (
        <StackedBarChart
          data={dataRandom}
          width={screenWidth}
          height={screenHeight - 200}
          chartConfig={chartConfig}
          withHorizontalLabels={false}
          style={{
            marginVertical: 10,
          }}
        />
      )}
    </View>
  );
};

export default ReportScreen;
