import {
  ActivityIndicator,
  ActivityIndicatorBase,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
//navigate
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import api from '../../Services/API Services/api_service';
import {Product} from './Model/homeModel';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({route, navigation}: HomeProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      try {
        const res = await api.get('/products');
        console.log(res);
        setProducts(res.data.products);
        console.log('--------ProductData', products);
        console.log('--------Response', res.data.products);
      } catch (err) {
        console.error('Error fetching product :', err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'#007bff'} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id!.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image
                source={{uri: item.images![0]}}
                style={{width: 100, height: 100}}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}></FlatList>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
});
