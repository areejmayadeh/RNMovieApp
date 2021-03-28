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
  getPopular, 
  getMoviesGenres,
  getUpcomingMovies,
  getTopRatedMovies,
} from '../api';
class MoviesList extends React.Component {
  static navigationOptions = {
    headerTitle: 'Movies',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      genres: [],
      selectedType: 'Upcoming',
      page: 1,
      tabs: ['Upcoming', 'Popular', 'Top Rated'],
      isLoading: false,
    }
  }


  componentDidMount() {
    this.getGenres()
    this.fetchData(this.state.selectedType);

  }

  fetchData = (item) => {
    let { isLoading } = this.state;
    this.setState({ isLoading: true});

    if(item == 'Popular') {
      getPopular({
        'page': 1
      }).then((response) => {
        this.setState({ isLoading: false});
        if(response.data && response.data.results) {
          this.setState({
            data: response.data.results
          });
        }
      });
    } else if(item == 'Upcoming') {
      getUpcomingMovies({
        'page': 1
      }).then((response) => {
        this.setState({ isLoading: false});
        if(response.data && response.data.results) {
          this.setState({
            data: response.data.results
          });
        }
      });
    } else if(item == 'Top Rated') {
      getTopRatedMovies({
        'page': 1
      }).then((response) => {
        this.setState({ isLoading: false});
        if(response.data && response.data.results) {
          this.setState({
            data: response.data.results
          });
        }
      });
    }
  }

  getGenres = () => {
    getMoviesGenres({}).then((res) => {
      if(res.data && res.data.genres) {
        this.setState({
          genres: res.data.genres
        });
      }
    });
  }

  fetchMore = (page) => {
    this.setState({ page: page + 1 })
  }

  render() {
    let { data , tabs, selectedType} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {data.length > 0 ?
          <FlatList
            ListHeaderComponent={
            <>
             <Text style={{    marginHorizontal: 20, fontSize: 32, fontWeight: 'bold', marginBottom: 10}}>Movies</Text>
             <View style={{flexDirection: 'row', marginHorizontal: 16, justifyContent: 'space-between'}}> 
        { tabs.map((item) => {
            return (
                <TouchableOpacity 
                  style={[styles.tabContainer,selectedType == item ? {borderColor : '#6fda5a', backgroundColor: '#6fda5a'} : {}]}
                  onPress={() => {
                    this.setState({ selectedType: item});
                    this.fetchData(item)
                  }}
                >
                  <Text style={selectedType == item ? styles.tabNameSelected : styles.tabName}>{item}</Text>
                </TouchableOpacity>
           
            )
          }) 

        }
           </View>
           
            </>
            }
            data={data}
            initialNumToRender={4}
            renderItem={(item) =>
              <Item item={item.item} genres={this.state.genres} />
            }
            keyExtractor={(item, index) => item.id}
          />
          : <ActivityIndicator size={'large'}/>}
      </SafeAreaView>
    );
  }
}

export default MoviesList;


const Tag = (props) => {
  let { genres, id } = props;
  let tagDetails = (genres || []).filter((item) => item.id == id);
  return tagDetails.length > 0 ?
    <View style={styles.tagContainer}>
      <Text style={styles.tagName}>{tagDetails[0].name}</Text>
    </View>
    : null
}

const Item = (props) => {
  console.log(props.item)
  let genres = props.genres;
  let details = props.item;
  return (
    <View style={styles.card}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${details.poster_path}`,
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.title]} numberOfLines={2}>{details.title}</Text>
          <Text style={styles.releaseDate}>{details.release_date}</Text>
          {details.genre_ids.length > 0 ?
            <View style={styles.tagsContainer}>
              {details.genre_ids.map((genre) => <Tag id={genre} genres={genres} />)}
            </View>
            : null}
        </View>
        <Text style={styles.rate}>{`${(details.vote_average) * 10}%`}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
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
    width: 120,
    height: 180
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6fda5a',
    alignSelf: 'flex-end',
    alignContent: 'flex-end'
  },

});