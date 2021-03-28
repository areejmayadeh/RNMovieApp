//644583
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { 
  getMovieDetails,
} from '../api';
class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    }
  }


  componentDidMount() {
    this.fetchData();

  }

  fetchData = () => {
    let { isLoading } = this.state;
    getMovieDetails({ movie_id : 644583}).then((res) => {
        console.log(res.data)
        if(res.status == 200) {
            this.setState({ data: res.data});
        }
    })
  }



  render() {
    let { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
           <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
            }}
          />
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.rate}>{`${(data.vote_average) * 10}%`}</Text>
          <View style={{marginVertical: 10}}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, lineHeight: 0.1}}>Overview</Text>
              <Text>{data.overview}</Text>
          </View>
      </SafeAreaView>
    );
  }
}

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 16
  },
  card: {
    backgroundColor: '#f9c2ff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  tabContainer: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#d5d5d5',
    borderColor: '#d5d5d5',
    marginRight: 5,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center'
  },
  tabName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  tabNameSelected: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 180,
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: 10
  },
  releaseDate: {
    fontSize: 14,
    color: '#6f6f6e',
    marginVertical: 12
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6
  },
  tagContainer: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 4,
    backgroundColor: '#d5d5d5',
    borderColor: '#d5d5d5',
    marginRight: 5,
    marginBottom: 6
  },
  tagName: {
    fontSize: 12
  },
  rate: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6fda5a',
    alignSelf: 'center',
  },

});