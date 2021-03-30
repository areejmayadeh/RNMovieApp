import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import {
    getMovieDetails,
    getMovieCredits,
} from '../api';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            credits: [],
        }
    }
    
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        getMovieDetails({ movie_id: 644583 }).then((res) => {
            if (res.status == 200) {
                this.setState({ data: res.data });
            }
        });
        getMovieCredits({ movie_id: 644583}).then((res) => {
            console.log(res)
            if (res.status == 200) {
                this.setState({ credits: res.data.cast });
            }
        });
    }

    render() {
        let { data, credits } = this.state;
        return (
            <ScrollView style={styles.container}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
                    }}
                />
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.rate}>{`${(data.vote_average) * 10}%`}</Text>
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.overViewTitle}>Overview</Text>
                    <Text style={styles.overViewText}>{data.overview}</Text>
                </View>
                {data.genres && data.genres.length > 0 ?
                    <>
                        <Text style={[styles.overViewTitle, {marginTop: 10}]}>Genres</Text>
                        <View style={styles.tagsContainer}>
                            {data.genres.map((genre) => <Tag tag={genre.name} />)}
                        </View>
                    </>
                : null}
                {credits.length > 0 ? 
                    <>
                        <Text style={[styles.overViewTitle, {marginTop: 10}]}>Credits</Text>
                        <FlatList
                            horizontal={true}
                            data={credits}
                            renderItem={(item) =>
                                <Credit credit={item} />
                            }
                        />
                    </>                
                : null}
            </ScrollView>
        );
    }
}
export default MovieDetails;

const Tag = (props) => {
    let { tag } = props;
    return tag.length > 0 ?
        <View style={styles.tagContainer}>
            <Text style={styles.tagName}>{tag}</Text>
        </View>
        : null
}

const Credit = (props) => {
    let { credit } = props;
    return (
        <View style={styles.creditContainer}>
            <Image 
                style={styles.creditImage} 
                source={{ uri: `https://image.tmdb.org/t/p/w500/${credit.item.profile_path}`}}
            />
            <Text style={styles.creditText}>{credit.item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white'
    },
    image: {
        width: 180,
        height: 250,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: 10
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6
    },
    tagContainer: {
        borderWidth: 1,
        borderRadius: 30,
        padding: 8,
        backgroundColor: '#d5d5d5',
        borderColor: '#d5d5d5',
        marginRight: 10,
        marginBottom: 6
    },
    tagName: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    rate: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6fda5a',
        alignSelf: 'center',
    },
    creditContainer: {
        marginRight: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    creditImage: {
        width: 70, 
        height: 70, 
        borderRadius: 70, 
        marginBottom: 10
    },
    creditText: {
        fontWeight: '500', 
        fontSize: 14
    },
    overViewTitle: {
        fontWeight: 'bold', 
        fontSize: 18, 
        lineHeight: 40,
    },
    overViewText: {
        fontSize: 16,
    },
});