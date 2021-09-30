import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
const carouselContent = [
  {id: 0, city: "Granadero Baigorria", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/baigorria.jpg", description:"Al norte de Rosario, donde viven los viejos"},
  {id: 1, city: "Rosario", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/rosario.jpg", description:"La capital no oficial de Argentina, ciudad Juarez Argentina"},
  {id: 2, city: "Buenos Aires", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/bsas.jpg", description:"La capital de Argentina, donde Larreta pone y saca pisos"},
  {id: 3, city: "Ushuaia", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/ushuaia.jpg", description:"El pais de las maravillas naturales y electrodomesticos"},
  {id: 4, city: "Calafate", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/calafate.jpg", description:"Donde vive la Presidente de la Nación"},
  {id: 5, city: "Bariloche", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/bariloche.jpg", description:"Donde los pibes se van de joda, igual lindo paisaje"},
  {id: 6, city: "Pergamino", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/pergamino.jpg", description:"Entre Rosario y Buenos Aires"},
  {id: 7, city: "Mar del Plata", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/mardelplata.jpg", description:"Donde vas a tomar sol"},
  {id: 8, city: "Mar de Ajó", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/mardeajo.jpg", description:"El mar huele bastante bien, pese a su nombre"},
  {id: 9, city: "Puerto Madryn", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/madryn.jpg", description:"Donde se puede avistar ballenas"},
  {id: 10, city: "Villa Gesell", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/gesell.jpg", description:"Donde van los pibes en verano"},
  {id: 11, city: "Santa Fe", country:"Argentina", image: "https://mytinerary-budtke.herokuapp.com/assets/santafe.jpg", description:"La capital oficial de la provincia de Santa Fe"}
]

const {width: screenWidth} = Dimensions.get('window');

const myCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  // const goForward = () => {
  //   carouselRef.current.snapToNext();
  // };
  useEffect(() => {
    setEntries(carouselContent);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Image
          source={{uri: item.image}}
          style={styles.image}
        />
        <Text style={styles.city} numberOfLines={2}>
          {item.city}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        layout={'default'}
        autoplay={true}
        loop={true}
        loopClonesPerSide={12}
      />
    </View>
  );
};

export default myCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  city:{
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'black'
  }
});