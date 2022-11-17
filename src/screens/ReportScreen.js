import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { screenWidth } from '../utils/Dimensions';

const ReportScreen = () => {
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#ffff',
    backgroundGradientTo: '#ffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
    labelColor: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const dataRandom = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
        color: (opacity = 1) => 'rgba(0, 0, 0, ' + opacity + ')',
      },
    ],
    legend: ['Consumption'],
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
      <Text
        style={{
          padding: 25,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '90%',
          fontWeight: 'bold',
          height: '10%',
          borderWidth: 2,
          borderColor: '#52ADEB',
          borderRadius: 15,
          margin: 10,
          fontSize: 16,
        }}>
        Tabla de Consumo en edificio
      </Text>
      {dataRandom.datasets[0].data.length > 0 && (
        <LineChart
          data={dataRandom}
          width={screenWidth}
          height={220}
          yAxisSuffix=" Kw"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      <Text
        style={{
          padding: 25,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '90%',
          fontWeight: 'bold',
          height: '10%',
          borderWidth: 2,
          borderColor: '#52ADEB',
          borderRadius: 15,
          margin: 10,
          fontSize: 16,
        }}>
        Tabla de Consumo de AC
      </Text>
      {dataRandom.datasets[0].data.length > 0 && (
        <LineChart
          data={dataRandom}
          width={screenWidth}
          height={220}
          yAxisSuffix=" Kw"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            backgroundColor: '#ffff',
            marginVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
    </View>
  );
};

export default ReportScreen;
